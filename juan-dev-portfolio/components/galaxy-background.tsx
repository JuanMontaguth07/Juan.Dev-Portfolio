"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  driftX: number;
  driftY: number;
  /** -1 (cool/blue) .. 1 (warm/amber) tint bias, for multi-hue variety. */
  warmth: number;
  /** Near-layer bright stars get a soft glow halo behind them. */
  glow: boolean;
  /** Timestamp (ms) until which this star shows a bright sparkle glint. */
  sparkleUntil: number;
};

type Dust = {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  color: readonly [number, number, number];
  driftX: number;
  driftY: number;
  twinklePhase: number;
  twinkleSpeed: number;
};

type ShootingStar = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
};

type Planet = {
  x: number;
  y: number;
  radius: number;
  driftX: number;
  base: readonly [number, number, number];
  light: readonly [number, number, number];
  ring: string | null;
  life: number;
  maxLife: number;
};

type DistantGalaxy = {
  x: number;
  y: number;
  radius: number;
  /** Squash applied to the face-on disc to fake its tilt (1 = face-on). */
  ratio: number;
  tilt: number;
  rotation: number;
  rotationSpeed: number;
  /** Face-on galaxy baked once; the loop only rotates and blits it. */
  bitmap: HTMLCanvasElement;
};

type Cloud = {
  x: number;
  y: number;
  speed: number;
  baseAlpha: number;
  /** Pre-rendered puff shape — baked once so drawing is a single cheap
   * drawImage instead of ~6 canvas gradients recomputed every frame. */
  bitmap: HTMLCanvasElement;
  drawWidth: number;
  drawHeight: number;
  anchorX: number;
  anchorY: number;
};

type Bird = {
  x: number;
  y: number;
  vx: number;
  flapPhase: number;
  scale: number;
  life: number;
  maxLife: number;
};

// Three depth layers for a parallax sense of scale: far stars are small,
// dim and slow; near stars are bigger, brighter and drift faster.
const LAYERS = [
  { speed: 0.4, size: [0.3, 0.7] as const, alpha: [0.2, 0.5] as const, share: 0.5 },
  { speed: 0.85, size: [0.6, 1.2] as const, alpha: [0.35, 0.7] as const, share: 0.35 },
  { speed: 1.5, size: [1.1, 2] as const, alpha: [0.55, 0.95] as const, share: 0.15 },
];

const BAND_ANGLE = -0.36;
const BAND_SHARE = 0.4;

// Comets cycle through a small palette instead of always matching the
// theme's star color — white, blue, yellow, green and purple.
const COMET_COLORS: ReadonlyArray<readonly [number, number, number]> = [
  [255, 255, 255],
  [96, 165, 250],
  [253, 224, 71],
  [74, 222, 128],
  [192, 132, 252],
];

// Fine cosmic dust: many small, dim, colored motes distinct from stars.
const DUST_COLORS: ReadonlyArray<readonly [number, number, number]> = [
  [139, 92, 246],
  [56, 189, 248],
  [251, 191, 36],
  [244, 114, 182],
  [255, 255, 255],
];

const PLANET_PALETTES: ReadonlyArray<{
  base: readonly [number, number, number];
  light: readonly [number, number, number];
  ring: string | null;
}> = [
  { base: [88, 58, 170], light: [186, 150, 255], ring: "rgba(196, 181, 253, 0.4)" },
  { base: [36, 84, 168], light: [120, 180, 255], ring: "rgba(147, 197, 253, 0.35)" },
  { base: [176, 88, 40], light: [255, 176, 112], ring: null },
  { base: [28, 132, 118], light: [110, 224, 200], ring: null },
  { base: [64, 66, 94], light: [156, 158, 184], ring: "rgba(203, 213, 225, 0.3)" },
];

// Three distant galaxies, anchored at fixed relative positions so they
// stay put (proportionally) across resizes rather than re-randomizing.
const GALAXY_LAYOUT: ReadonlyArray<{
  xRatio: number;
  yRatio: number;
  tilt: number;
  ratio: number;
  arms: number;
  windings: number;
  core: readonly [number, number, number];
  arm: readonly [number, number, number];
}> = [
  { xRatio: 0.86, yRatio: 0.14, tilt: -0.5, ratio: 0.42, arms: 2, windings: 0.95, core: [233, 213, 255], arm: [96, 165, 250] },
  { xRatio: 0.09, yRatio: 0.74, tilt: 0.42, ratio: 0.5, arms: 3, windings: 0.7, core: [186, 246, 253], arm: [244, 114, 182] },
  { xRatio: 0.58, yRatio: 0.9, tilt: -0.22, ratio: 0.3, arms: 2, windings: 1.15, core: [254, 243, 176], arm: [251, 146, 60] },
];

// Flowing aurora curtains near the top of the night sky — drawn as many
// thin vertical gradient strips whose top edge undulates on a sine wave,
// blended additively so overlapping bands glow like real auroral light.
const AURORA_BANDS: ReadonlyArray<{
  colorTop: readonly [number, number, number];
  colorMid: readonly [number, number, number];
  baseY: number;
  amplitude: number;
  freq: number;
  speed: number;
  heightRatio: number;
}> = [
  { colorTop: [16, 185, 129], colorMid: [56, 189, 248], baseY: 0.05, amplitude: 34, freq: 0.006, speed: 0.00035, heightRatio: 0.34 },
  { colorTop: [139, 92, 246], colorMid: [59, 130, 246], baseY: 0.09, amplitude: 46, freq: 0.0045, speed: 0.00028, heightRatio: 0.4 },
];

// Cloud depth layers for the light-mode "paradise sky" — far clouds are
// small, pale and slow; near clouds are bigger, brighter and drift faster.
const CLOUD_LAYERS = [
  { speed: 0.04, scale: [0.45, 0.7] as const, alpha: [0.28, 0.42] as const, y: [0.04, 0.22] as const, count: 3 },
  { speed: 0.08, scale: [0.75, 1.1] as const, alpha: [0.42, 0.6] as const, y: [0.14, 0.38] as const, count: 3 },
  { speed: 0.13, scale: [1.1, 1.55] as const, alpha: [0.58, 0.8] as const, y: [0.28, 0.52] as const, count: 3 },
];

// Warm floating light motes for the light-mode sky — pollen/dust glinting
// in the sunlight, distinct from the cool-toned cosmic dust used at night.
const LIGHT_MOTE_COLORS: ReadonlyArray<readonly [number, number, number]> = [
  [255, 221, 150],
  [255, 244, 214],
  [255, 255, 255],
  [253, 224, 71],
];

const RAINBOW_COLORS: ReadonlyArray<readonly [number, number, number]> = [
  [239, 68, 68],
  [249, 115, 22],
  [250, 204, 21],
  [74, 222, 128],
  [56, 189, 248],
  [99, 102, 241],
  [192, 132, 252],
];

function tintChannel(value: number, delta: number) {
  return Math.max(0, Math.min(255, Math.round(value + delta)));
}

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function makePuffs(baseRadius: number) {
  const puffs: { dx: number; dy: number; r: number }[] = [];
  const n = 5 + Math.floor(Math.random() * 3);
  for (let i = 0; i < n; i++) {
    const t = n === 1 ? 0.5 : i / (n - 1);
    const dx = (t - 0.5) * baseRadius * 2.6;
    const dy =
      -Math.sin(t * Math.PI) * baseRadius * 0.55 +
      (Math.random() - 0.5) * baseRadius * 0.15;
    const r = baseRadius * (0.55 + Math.random() * 0.45) * (1 - Math.abs(t - 0.5) * 0.4);
    puffs.push({ dx, dy, r });
  }
  return puffs;
}

/**
 * Paints one face-on spiral galaxy to an offscreen bitmap: a soft halo, glowing
 * arms, thousands of tiny stars scattered along logarithmic-ish spirals
 * (denser and bluer toward the arms, warmer toward the core) and a bright
 * bulge. Done once per resize; the loop just rotates and draws the bitmap.
 */
function renderGalaxyBitmap(
  radius: number,
  {
    arms,
    windings,
    core,
    arm,
  }: {
    arms: number;
    windings: number;
    core: readonly [number, number, number];
    arm: readonly [number, number, number];
  },
  density: number,
) {
  const size = Math.ceil(radius * 2);
  const bitmap = document.createElement("canvas");
  bitmap.width = size;
  bitmap.height = size;
  const b = bitmap.getContext("2d")!;
  const cx = size / 2;
  const cy = size / 2;
  const [cr, cg, cb] = core;
  const [ar, ag, ab] = arm;

  const spiral = (armIndex: number, t: number) => {
    const angle = (armIndex / arms) * Math.PI * 2 + t * windings * Math.PI * 2;
    const r = radius * (0.05 + 0.93 * t);
    return { x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r, angle };
  };

  const halo = b.createRadialGradient(cx, cy, 0, cx, cy, radius);
  halo.addColorStop(0, `rgba(${cr}, ${cg}, ${cb}, 0.26)`);
  halo.addColorStop(0.3, `rgba(${ar}, ${ag}, ${ab}, 0.12)`);
  halo.addColorStop(1, `rgba(${ar}, ${ag}, ${ab}, 0)`);
  b.fillStyle = halo;
  b.beginPath();
  b.arc(cx, cy, radius, 0, Math.PI * 2);
  b.fill();

  // Soft, tapering glow along each arm.
  b.lineCap = "round";
  const segments = 64;
  for (let a = 0; a < arms; a++) {
    for (const pass of [
      { width: radius * 0.14, alpha: 0.05 },
      { width: radius * 0.06, alpha: 0.09 },
    ]) {
      for (let i = 0; i < segments; i++) {
        const t0 = i / segments;
        const p0 = spiral(a, t0);
        const p1 = spiral(a, (i + 1) / segments);
        b.strokeStyle = `rgba(${ar}, ${ag}, ${ab}, ${pass.alpha * (1 - t0 * 0.85)})`;
        b.lineWidth = pass.width * (1 - t0 * 0.5);
        b.beginPath();
        b.moveTo(p0.x, p0.y);
        b.lineTo(p1.x, p1.y);
        b.stroke();
      }
    }
  }

  // Stars: clustered on the arms, with a scatter that grows outward.
  const perArm = Math.round(radius * 2.4 * density);
  for (let a = 0; a < arms; a++) {
    for (let k = 0; k < perArm; k++) {
      const t = Math.pow(Math.random(), 0.85);
      const p = spiral(a, t);
      const spread = radius * (0.02 + 0.1 * t);
      const off =
        ((Math.random() + Math.random() + Math.random()) / 3 - 0.5) * 2 * spread;
      const x = p.x + Math.cos(p.angle + Math.PI / 2) * off;
      const y = p.y + Math.sin(p.angle + Math.PI / 2) * off;

      const bright = Math.random() < 0.05;
      const r = Math.round(cr + (ar - cr) * t);
      const g = Math.round(cg + (ag - cg) * t);
      const bl = Math.round(cb + (ab - cb) * t);
      const alpha = (0.25 + Math.random() * 0.55) * (1 - 0.55 * t);
      const starSize = bright ? 1.1 + Math.random() * 0.9 : 0.35 + Math.random() * 0.75;

      if (bright) {
        const glow = b.createRadialGradient(x, y, 0, x, y, starSize * 4);
        glow.addColorStop(0, `rgba(${r}, ${g}, ${bl}, ${alpha * 0.5})`);
        glow.addColorStop(1, `rgba(${r}, ${g}, ${bl}, 0)`);
        b.fillStyle = glow;
        b.beginPath();
        b.arc(x, y, starSize * 4, 0, Math.PI * 2);
        b.fill();
      }
      b.fillStyle = `rgba(${r}, ${g}, ${bl}, ${Math.min(1, alpha + (bright ? 0.3 : 0))})`;
      b.beginPath();
      b.arc(x, y, starSize, 0, Math.PI * 2);
      b.fill();
    }
  }

  // A few field stars filling the disc between the arms.
  for (let k = 0; k < Math.round(radius * 0.9 * density); k++) {
    const angle = Math.random() * Math.PI * 2;
    const r = radius * Math.pow(Math.random(), 0.7) * 0.95;
    b.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${0.1 + Math.random() * 0.2})`;
    b.beginPath();
    b.arc(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r, 0.35 + Math.random() * 0.4, 0, Math.PI * 2);
    b.fill();
  }

  // Bulge and nucleus.
  const bulge = b.createRadialGradient(cx, cy, 0, cx, cy, radius * 0.24);
  bulge.addColorStop(0, `rgba(255, 250, 235, 0.9)`);
  bulge.addColorStop(0.18, `rgba(${cr}, ${cg}, ${cb}, 0.55)`);
  bulge.addColorStop(1, `rgba(${cr}, ${cg}, ${cb}, 0)`);
  b.fillStyle = bulge;
  b.beginPath();
  b.arc(cx, cy, radius * 0.24, 0, Math.PI * 2);
  b.fill();

  return bitmap;
}

/** Bakes a cloud's puffs to an offscreen bitmap once, so the animation
 * loop only ever has to blit an image instead of rebuilding gradients. */
function renderCloudBitmap(
  puffs: ReadonlyArray<{ dx: number; dy: number; r: number }>,
) {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const p of puffs) {
    minX = Math.min(minX, p.dx - p.r);
    maxX = Math.max(maxX, p.dx + p.r);
    minY = Math.min(minY, p.dy - p.r * 1.2);
    maxY = Math.max(maxY, p.dy + p.r);
  }

  const width = Math.max(1, Math.ceil(maxX - minX));
  const height = Math.max(1, Math.ceil(maxY - minY));
  const anchorX = -minX;
  const anchorY = -minY;

  const bitmap = document.createElement("canvas");
  bitmap.width = width;
  bitmap.height = height;
  const bctx = bitmap.getContext("2d")!;

  for (const p of puffs) {
    const cx = p.dx + anchorX;
    const cy = p.dy + anchorY;

    // A faint cool-toned shadow beneath each puff, offset slightly down,
    // gives the cloud a sense of volume — cheap to bake in once, would
    // have doubled the per-frame gradient count if drawn live.
    const shadow = bctx.createRadialGradient(
      cx,
      cy + p.r * 0.3,
      p.r * 0.2,
      cx,
      cy + p.r * 0.3,
      p.r * 1.05,
    );
    shadow.addColorStop(0, "rgba(148, 180, 214, 0.22)");
    shadow.addColorStop(1, "rgba(148, 180, 214, 0)");
    bctx.beginPath();
    bctx.fillStyle = shadow;
    bctx.arc(cx, cy + p.r * 0.3, p.r * 1.05, 0, Math.PI * 2);
    bctx.fill();

    const grad = bctx.createRadialGradient(
      cx,
      cy - p.r * 0.15,
      p.r * 0.1,
      cx,
      cy,
      p.r,
    );
    grad.addColorStop(0, "rgba(255, 255, 255, 0.97)");
    grad.addColorStop(0.7, "rgba(255, 250, 240, 0.75)");
    grad.addColorStop(1, "rgba(255, 250, 240, 0)");
    bctx.beginPath();
    bctx.fillStyle = grad;
    bctx.arc(cx, cy, p.r, 0, Math.PI * 2);
    bctx.fill();
  }

  return { bitmap, width, height, anchorX, anchorY };
}

export function GalaxyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    // Phones get a lighter scene: the sky is soft anyway, so full-density
    // pixels, 60fps and the full particle count are wasted main-thread time.
    const isSmall = window.matchMedia("(max-width: 767px)").matches;
    const dpr = isSmall ? 1 : Math.min(window.devicePixelRatio || 1, 2);
    const minFrameGap = isSmall ? 33 : 0;
    let lastFrameAt = 0;
    let stars: Star[] = [];
    let dust: Dust[] = [];
    let galaxies: DistantGalaxy[] = [];
    let shootingStars: ShootingStar[] = [];
    let planet: Planet | null = null;
    let clouds: Cloud[] = [];
    let birds: Bird[] = [];
    let motes: Dust[] = [];
    const auroraPhases = AURORA_BANDS.map(() => Math.random() * Math.PI * 2);
    let sunRayPhase = 0;
    let frame = 0;

    // getComputedStyle forces a style recalculation, so it must not run on
    // every animation frame — only when the theme actually flips.
    let cachedIsDark: boolean | null = null;
    let starColorCache: readonly [number, number, number] = [255, 255, 255];
    let starMaxAlphaCache = 0.95;

    function refreshNightCssCache() {
      const style = getComputedStyle(canvas!);
      const baseColorRaw = style.getPropertyValue("--star-color").trim();
      const parsedMaxAlpha = parseFloat(
        style.getPropertyValue("--star-max-alpha"),
      );
      starMaxAlphaCache = Number.isFinite(parsedMaxAlpha) ? parsedMaxAlpha : 0.95;
      const parsedRgb = (baseColorRaw || "255, 255, 255")
        .split(",")
        .map((v) => parseFloat(v));
      starColorCache = parsedRgb.every(Number.isFinite)
        ? (parsedRgb as [number, number, number])
        : [255, 255, 255];
    }

    let lastShot = performance.now();
    let nextShotDelay = 3500 + Math.random() * 4500;
    let lastSparkle = performance.now();
    let nextSparkleDelay = 1200 + Math.random() * 1800;
    let lastPlanetAt = performance.now();
    let nextPlanetDelay = 10000 + Math.random() * 12000;
    let lastBirds = performance.now();
    let nextBirdDelay = 9000 + Math.random() * 12000;
    let lastBurstAt = performance.now();
    let nextBurstDelay = 70000 + Math.random() * 90000;
    let burstRemaining = 0;

    function seedStars() {
      const total = Math.max(isSmall ? 70 : 110, Math.min(260, Math.floor((width * height) / 8000)));
      const bandCos = Math.cos(BAND_ANGLE);
      const bandSin = Math.sin(BAND_ANGLE);
      const next: Star[] = [];

      for (let layerIndex = 0; layerIndex < LAYERS.length; layerIndex++) {
        const layer = LAYERS[layerIndex];
        const count = Math.round(total * layer.share);

        for (let i = 0; i < count; i++) {
          let x: number;
          let y: number;

          if (Math.random() < BAND_SHARE) {
            // Cluster along a soft diagonal band (a "milky way" arm): a
            // point along the band line plus a roughly gaussian spread
            // perpendicular to it (sum of three randoms approximates a
            // bell curve cheaply, no need for a real gaussian sampler).
            const along = Math.random() * (width + height) - height * 0.3;
            const spread =
              ((Math.random() + Math.random() + Math.random()) / 3 - 0.5) *
              height *
              0.6;
            x = along * bandCos - spread * bandSin;
            y = along * bandSin + spread * bandCos + height * 0.15;
          } else {
            x = Math.random() * width;
            y = Math.random() * height;
          }

          if (x < -20 || x > width + 20 || y < -20 || y > height + 20) {
            x = Math.random() * width;
            y = Math.random() * height;
          }

          const [minSize, maxSize] = layer.size;
          const [minAlpha, maxAlpha] = layer.alpha;

          next.push({
            x,
            y,
            radius: minSize + Math.random() * (maxSize - minSize),
            baseAlpha: minAlpha + Math.random() * (maxAlpha - minAlpha),
            twinkleSpeed: Math.random() * 0.016 + 0.005,
            twinklePhase: Math.random() * Math.PI * 2,
            driftX: (Math.random() - 0.5) * 0.025 * layer.speed,
            driftY: (Math.random() - 0.5) * 0.018 * layer.speed,
            warmth: (Math.random() - 0.5) * 2,
            glow: layerIndex === LAYERS.length - 1 && Math.random() < 0.5,
            sparkleUntil: 0,
          });
        }
      }

      stars = next;
    }

    function seedDust() {
      const count = Math.max(isSmall ? 60 : 120, Math.min(300, Math.floor((width * height) / 4200)));
      const next: Dust[] = [];
      for (let i = 0; i < count; i++) {
        next.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 0.5 + 0.15,
          baseAlpha: Math.random() * 0.18 + 0.06,
          color: DUST_COLORS[Math.floor(Math.random() * DUST_COLORS.length)],
          driftX: (Math.random() - 0.5) * 0.012,
          driftY: (Math.random() - 0.5) * 0.009,
          twinklePhase: Math.random() * Math.PI * 2,
          twinkleSpeed: Math.random() * 0.008 + 0.002,
        });
      }
      dust = next;
    }

    function seedGalaxies() {
      galaxies = GALAXY_LAYOUT.map((layout, i) => {
        const radius = Math.max(160, width * 0.18);
        return {
          x: width * layout.xRatio,
          y: height * layout.yRatio,
          radius,
          ratio: layout.ratio,
          tilt: layout.tilt,
          rotation: i * 1.6,
          rotationSpeed: 0.00012 + i * 0.00004,
          bitmap: renderGalaxyBitmap(radius, layout, isSmall ? 0.6 : 1),
        };
      });
    }

    function seedClouds() {
      const next: Cloud[] = [];
      for (const layer of CLOUD_LAYERS) {
        for (let i = 0; i < layer.count; i++) {
          const scale = randomBetween(layer.scale[0], layer.scale[1]);
          const baseRadius = 46 * scale;
          const { bitmap, width: bw, height: bh, anchorX, anchorY } =
            renderCloudBitmap(makePuffs(baseRadius));
          next.push({
            x: Math.random() * (width + 300) - 150,
            y: height * randomBetween(layer.y[0], layer.y[1]),
            speed: layer.speed,
            baseAlpha: randomBetween(layer.alpha[0], layer.alpha[1]),
            bitmap,
            drawWidth: bw,
            drawHeight: bh,
            anchorX,
            anchorY,
          });
        }
      }
      clouds = next;
    }

    function seedMotes() {
      const count = Math.max(25, Math.min(55, Math.floor((width * height) / 22000)));
      const next: Dust[] = [];
      for (let i = 0; i < count; i++) {
        next.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.1 + 0.4,
          baseAlpha: Math.random() * 0.35 + 0.15,
          color:
            LIGHT_MOTE_COLORS[Math.floor(Math.random() * LIGHT_MOTE_COLORS.length)],
          driftX: (Math.random() - 0.5) * 0.05,
          driftY: -Math.random() * 0.04 - 0.01,
          twinklePhase: Math.random() * Math.PI * 2,
          twinkleSpeed: Math.random() * 0.01 + 0.003,
        });
      }
      motes = next;
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedStars();
      seedDust();
      seedGalaxies();
      seedClouds();
      seedMotes();
    }

    resize();
    window.addEventListener("resize", resize);

    function spawnShootingStar() {
      const fromLeft = Math.random() > 0.5;
      const startX = fromLeft ? -20 : width + 20;
      const startY = Math.random() * height * 0.5;
      const speed = 7 + Math.random() * 4;
      const angle = Math.PI / 7;
      const [r, g, b] =
        COMET_COLORS[Math.floor(Math.random() * COMET_COLORS.length)];
      shootingStars.push({
        x: startX,
        y: startY,
        vx: (fromLeft ? 1 : -1) * Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 55,
        color: `${r}, ${g}, ${b}`,
      });
    }

    function spawnPlanet() {
      const palette =
        PLANET_PALETTES[Math.floor(Math.random() * PLANET_PALETTES.length)];
      const fromLeft = Math.random() > 0.5;
      const radius = randomBetween(26, 54);
      planet = {
        x: fromLeft ? -radius * 0.4 : width + radius * 0.4,
        y: height * randomBetween(0.08, 0.4),
        radius,
        driftX: (fromLeft ? 1 : -1) * randomBetween(0.05, 0.11),
        base: palette.base,
        light: palette.light,
        ring: palette.ring && Math.random() < 0.6 ? palette.ring : null,
        life: 0,
        maxLife: randomBetween(1800, 3200),
      };
    }

    function spawnBirdFlock() {
      const fromLeft = Math.random() > 0.5;
      const count = 2 + Math.floor(Math.random() * 3);
      const baseY = height * randomBetween(0.1, 0.3);
      const baseVx = (fromLeft ? 1 : -1) * randomBetween(0.7, 1.2);
      for (let i = 0; i < count; i++) {
        birds.push({
          x: (fromLeft ? -30 : width + 30) - (fromLeft ? 1 : -1) * i * 26,
          y: baseY + (Math.random() - 0.5) * 30,
          vx: baseVx,
          flapPhase: Math.random() * Math.PI * 2,
          scale: randomBetween(0.7, 1.1),
          life: 0,
          maxLife: (width + 200) / Math.abs(baseVx),
        });
      }
    }

    function drawSparkle(x: number, y: number, size: number, alpha: number) {
      ctx!.save();
      ctx!.globalAlpha = alpha;
      ctx!.strokeStyle = "rgba(255, 255, 255, 1)";
      ctx!.lineWidth = 1;
      ctx!.beginPath();
      ctx!.moveTo(x - size, y);
      ctx!.lineTo(x + size, y);
      ctx!.moveTo(x, y - size);
      ctx!.lineTo(x, y + size);
      ctx!.stroke();
      ctx!.restore();
    }

    function drawPlanet(p: Planet) {
      const progress = p.life / p.maxLife;
      const fadeIn = Math.min(1, progress / 0.08);
      const fadeOut = Math.min(1, (1 - progress) / 0.12);
      const opacity = Math.max(0, Math.min(fadeIn, fadeOut));
      if (opacity <= 0) return;

      const [br, bg, bb] = p.base;
      const [lr, lg, lb] = p.light;

      if (p.ring) {
        ctx!.save();
        ctx!.globalAlpha = opacity;
        ctx!.translate(p.x, p.y);
        ctx!.rotate(-0.34);
        ctx!.scale(1, 0.32);
        ctx!.beginPath();
        ctx!.arc(0, 0, p.radius * 1.9, 0, Math.PI * 2);
        ctx!.strokeStyle = p.ring;
        ctx!.lineWidth = p.radius * 0.22;
        ctx!.stroke();
        ctx!.restore();
      }

      const shade = ctx!.createRadialGradient(
        p.x - p.radius * 0.35,
        p.y - p.radius * 0.35,
        p.radius * 0.1,
        p.x,
        p.y,
        p.radius,
      );
      shade.addColorStop(0, `rgba(${lr}, ${lg}, ${lb}, ${opacity})`);
      shade.addColorStop(1, `rgba(${br}, ${bg}, ${bb}, ${opacity})`);
      ctx!.beginPath();
      ctx!.fillStyle = shade;
      ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx!.fill();

      const glow = ctx!.createRadialGradient(
        p.x,
        p.y,
        p.radius,
        p.x,
        p.y,
        p.radius * 2.2,
      );
      glow.addColorStop(0, `rgba(${lr}, ${lg}, ${lb}, ${opacity * 0.18})`);
      glow.addColorStop(1, `rgba(${lr}, ${lg}, ${lb}, 0)`);
      ctx!.beginPath();
      ctx!.fillStyle = glow;
      ctx!.arc(p.x, p.y, p.radius * 2.2, 0, Math.PI * 2);
      ctx!.fill();
    }

    function drawGalaxy(g: DistantGalaxy) {
      if (!reduceMotion) g.rotation += g.rotationSpeed;

      ctx!.save();
      ctx!.translate(g.x, g.y);
      ctx!.rotate(g.tilt);
      ctx!.scale(1, g.ratio);
      ctx!.rotate(g.rotation);
      ctx!.globalAlpha = 0.9;
      ctx!.drawImage(g.bitmap, -g.radius, -g.radius);
      ctx!.restore();
    }

    function drawSun(phase: number) {
      const sx = width * 0.82;
      const sy = height * 0.15;

      ctx!.save();
      ctx!.translate(sx, sy);
      ctx!.rotate(phase);
      const rayCount = 10;
      for (let i = 0; i < rayCount; i++) {
        const angle = (i / rayCount) * Math.PI * 2;
        const len = 230 + (i % 3) * 40;
        const rayGrad = ctx!.createLinearGradient(
          0,
          0,
          Math.cos(angle) * len,
          Math.sin(angle) * len,
        );
        rayGrad.addColorStop(0, "rgba(255, 244, 214, 0.16)");
        rayGrad.addColorStop(1, "rgba(255, 244, 214, 0)");
        ctx!.strokeStyle = rayGrad;
        ctx!.lineWidth = 24;
        ctx!.beginPath();
        ctx!.moveTo(0, 0);
        ctx!.lineTo(Math.cos(angle) * len, Math.sin(angle) * len);
        ctx!.stroke();
      }
      ctx!.restore();

      const outer = ctx!.createRadialGradient(sx, sy, 0, sx, sy, 230);
      outer.addColorStop(0, "rgba(255, 244, 214, 0.55)");
      outer.addColorStop(0.4, "rgba(255, 221, 150, 0.22)");
      outer.addColorStop(1, "rgba(255, 221, 150, 0)");
      ctx!.beginPath();
      ctx!.fillStyle = outer;
      ctx!.arc(sx, sy, 230, 0, Math.PI * 2);
      ctx!.fill();

      const core = ctx!.createRadialGradient(sx, sy, 0, sx, sy, 48);
      core.addColorStop(0, "rgba(255, 255, 255, 0.95)");
      core.addColorStop(0.6, "rgba(255, 246, 220, 0.75)");
      core.addColorStop(1, "rgba(255, 244, 214, 0)");
      ctx!.beginPath();
      ctx!.fillStyle = core;
      ctx!.arc(sx, sy, 48, 0, Math.PI * 2);
      ctx!.fill();
    }

    function drawRainbow(now: number) {
      const cx = width * 0.04;
      const cy = height * 1.05;
      const baseRadius = Math.min(width, height) * 0.55;
      const bandWidth = Math.max(6, Math.min(width, height) * 0.014);
      const pulse = 0.4 + 0.35 * ((Math.sin(now * 0.00015) + 1) / 2);

      ctx!.save();
      ctx!.lineCap = "round";
      RAINBOW_COLORS.forEach(([r, g, b], i) => {
        ctx!.beginPath();
        ctx!.strokeStyle = `rgba(${r}, ${g}, ${b}, ${0.22 * pulse})`;
        ctx!.lineWidth = bandWidth;
        ctx!.arc(
          cx,
          cy,
          baseRadius - i * bandWidth,
          -Math.PI * 0.58,
          Math.PI * 0.02,
        );
        ctx!.stroke();
      });
      ctx!.restore();
    }

    function drawCloud(c: Cloud) {
      ctx!.save();
      ctx!.globalAlpha = c.baseAlpha;
      ctx!.drawImage(c.bitmap, c.x - c.anchorX, c.y - c.anchorY);
      ctx!.restore();
    }

    function drawBird(b: Bird) {
      const flap = Math.sin(b.flapPhase) * 5 * b.scale;
      ctx!.save();
      ctx!.translate(b.x, b.y);
      ctx!.strokeStyle = "rgba(71, 85, 105, 0.5)";
      ctx!.lineWidth = 1.6 * b.scale;
      ctx!.lineCap = "round";
      ctx!.beginPath();
      ctx!.moveTo(-8 * b.scale, 0);
      ctx!.quadraticCurveTo(-3 * b.scale, -flap, 0, 0);
      ctx!.quadraticCurveTo(3 * b.scale, -flap, 8 * b.scale, 0);
      ctx!.stroke();
      ctx!.restore();
    }

    function drawAurora(
      band: (typeof AURORA_BANDS)[number],
      phase: number,
    ) {
      const [tr, tg, tb] = band.colorTop;
      const [mr, mg, mb] = band.colorMid;
      const step = 30;
      const curtainHeight = height * band.heightRatio;

      ctx!.save();
      ctx!.globalCompositeOperation = "lighter";
      for (let x = -20; x <= width + 20; x += step) {
        const wave =
          Math.sin(x * band.freq + phase) * band.amplitude +
          Math.sin(x * band.freq * 2.3 + phase * 1.7) * band.amplitude * 0.35;
        const topY = height * band.baseY + wave;
        const grad = ctx!.createLinearGradient(x, topY, x, topY + curtainHeight);
        grad.addColorStop(0, `rgba(${tr}, ${tg}, ${tb}, 0)`);
        grad.addColorStop(0.35, `rgba(${tr}, ${tg}, ${tb}, 0.12)`);
        grad.addColorStop(0.7, `rgba(${mr}, ${mg}, ${mb}, 0.06)`);
        grad.addColorStop(1, `rgba(${mr}, ${mg}, ${mb}, 0)`);
        ctx!.fillStyle = grad;
        ctx!.fillRect(x, topY, step + 1, curtainHeight);
      }
      ctx!.restore();
    }

    function drawNightSky(now: number) {
      const [baseR, baseG, baseB] = starColorCache;
      const maxAlpha = starMaxAlphaCache;

      for (const galaxy of galaxies) {
        drawGalaxy(galaxy);
      }

      AURORA_BANDS.forEach((band, i) => {
        if (!reduceMotion) auroraPhases[i] += band.speed * 16;
        drawAurora(band, auroraPhases[i]);
      });

      for (const d of dust) {
        d.twinklePhase += d.twinkleSpeed;
        const shimmer = (Math.sin(d.twinklePhase) + 1) / 2;
        const alpha = d.baseAlpha * (0.5 + shimmer * 0.5) * maxAlpha;

        if (!reduceMotion) {
          d.x += d.driftX;
          d.y += d.driftY;
          if (d.x < -5) d.x = width + 5;
          if (d.x > width + 5) d.x = -5;
          if (d.y < -5) d.y = height + 5;
          if (d.y > height + 5) d.y = -5;
        }

        const [r, g, b] = d.color;
        ctx!.beginPath();
        ctx!.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx!.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
        ctx!.fill();
      }

      if (planet) {
        planet.life += 1;
        if (!reduceMotion) planet.x += planet.driftX;
        if (planet.life >= planet.maxLife) {
          planet = null;
          lastPlanetAt = now;
          nextPlanetDelay = 45000 + Math.random() * 55000;
        }
      } else if (!reduceMotion && now - lastPlanetAt > nextPlanetDelay) {
        spawnPlanet();
      }

      if (!reduceMotion && now - lastSparkle > nextSparkleDelay) {
        lastSparkle = now;
        nextSparkleDelay = 900 + Math.random() * 1600;
        const candidate = stars[Math.floor(Math.random() * stars.length)];
        if (candidate) candidate.sparkleUntil = now + 650;
      }

      for (const star of stars) {
        star.twinklePhase += star.twinkleSpeed;
        const twinkle = (Math.sin(star.twinklePhase) + 1) / 2;
        const alpha = star.baseAlpha * (0.35 + twinkle * 0.65) * maxAlpha;

        if (!reduceMotion) {
          star.x += star.driftX;
          star.y += star.driftY;
          if (star.x < -5) star.x = width + 5;
          if (star.x > width + 5) star.x = -5;
          if (star.y < -5) star.y = height + 5;
          if (star.y > height + 5) star.y = -5;
        }

        const r = tintChannel(baseR, star.warmth * 28);
        const g = tintChannel(baseG, -Math.abs(star.warmth) * 10);
        const b = tintChannel(baseB, -star.warmth * 28);
        const color = `${r}, ${g}, ${b}`;

        if (star.glow) {
          const haloRadius = star.radius * 5;
          const halo = ctx!.createRadialGradient(
            star.x,
            star.y,
            0,
            star.x,
            star.y,
            haloRadius,
          );
          halo.addColorStop(0, `rgba(${color}, ${alpha * 0.35})`);
          halo.addColorStop(1, `rgba(${color}, 0)`);
          ctx!.fillStyle = halo;
          ctx!.beginPath();
          ctx!.arc(star.x, star.y, haloRadius, 0, Math.PI * 2);
          ctx!.fill();
        }

        ctx!.beginPath();
        ctx!.fillStyle = `rgba(${color}, ${alpha})`;
        ctx!.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx!.fill();

        if (star.sparkleUntil > now) {
          const remaining = (star.sparkleUntil - now) / 650;
          drawSparkle(star.x, star.y, star.radius * 3.4 + 2, remaining);
        }
      }

      if (planet) {
        drawPlanet(planet);
      }

      if (!reduceMotion) {
        if (burstRemaining <= 0 && now - lastBurstAt > nextBurstDelay) {
          burstRemaining = 4 + Math.floor(Math.random() * 3);
          lastBurstAt = now;
          nextBurstDelay = 70000 + Math.random() * 90000;
        }

        if (now - lastShot > nextShotDelay) {
          lastShot = now;
          if (burstRemaining > 0) {
            burstRemaining -= 1;
            nextShotDelay = 150 + Math.random() * 220;
          } else {
            nextShotDelay = 4500 + Math.random() * 6500;
          }
          spawnShootingStar();
        }

        shootingStars = shootingStars.filter((s) => s.life < s.maxLife);
        for (const s of shootingStars) {
          s.life += 1;
          s.x += s.vx;
          s.y += s.vy;
          const progress = s.life / s.maxLife;
          const alpha = Math.sin(progress * Math.PI);
          const gradient = ctx!.createLinearGradient(
            s.x,
            s.y,
            s.x - s.vx * 6,
            s.y - s.vy * 6,
          );
          gradient.addColorStop(0, `rgba(${s.color}, ${alpha})`);
          gradient.addColorStop(1, `rgba(${s.color}, 0)`);
          ctx!.strokeStyle = gradient;
          ctx!.lineWidth = 1.5;
          ctx!.beginPath();
          ctx!.moveTo(s.x, s.y);
          ctx!.lineTo(s.x - s.vx * 6, s.y - s.vy * 6);
          ctx!.stroke();
        }
      }
    }

    function drawParadiseSky(now: number) {
      if (!reduceMotion) sunRayPhase += 0.0006;
      drawSun(sunRayPhase);
      drawRainbow(now);

      for (const m of motes) {
        m.twinklePhase += m.twinkleSpeed;
        const shimmer = (Math.sin(m.twinklePhase) + 1) / 2;
        const alpha = m.baseAlpha * (0.5 + shimmer * 0.5);

        if (!reduceMotion) {
          m.x += m.driftX;
          m.y += m.driftY;
          if (m.x < -5) m.x = width + 5;
          if (m.x > width + 5) m.x = -5;
          if (m.y < -5) m.y = height + 5;
        }

        const [r, g, b] = m.color;
        ctx!.beginPath();
        ctx!.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx!.arc(m.x, m.y, m.radius, 0, Math.PI * 2);
        ctx!.fill();
      }

      for (const c of clouds) {
        if (!reduceMotion) {
          c.x += c.speed;
          if (c.x - c.anchorX > width + 60) c.x = -c.drawWidth + c.anchorX - 60;
        }
        drawCloud(c);
      }

      if (!reduceMotion) {
        birds = birds.filter((b) => b.life < b.maxLife);
        for (const b of birds) {
          b.life += 1;
          b.x += b.vx;
          b.flapPhase += 0.16;
        }
        if (now - lastBirds > nextBirdDelay) {
          lastBirds = now;
          nextBirdDelay = 9000 + Math.random() * 12000;
          spawnBirdFlock();
        }
      }
      for (const b of birds) {
        drawBird(b);
      }
    }

    function draw(now: number) {
      if (minFrameGap && now - lastFrameAt < minFrameGap) {
        frame = requestAnimationFrame(draw);
        return;
      }
      lastFrameAt = now;

      ctx!.clearRect(0, 0, width, height);

      // A single bad frame (e.g. a transient CSS custom-property read
      // during a theme swap) must never permanently kill the loop — the
      // next requestAnimationFrame still has to fire.
      try {
        const isDark = document.documentElement.classList.contains("dark");
        if (isDark !== cachedIsDark) {
          cachedIsDark = isDark;
          if (isDark) refreshNightCssCache();
        }
        if (isDark) {
          drawNightSky(now);
        } else {
          drawParadiseSky(now);
        }
      } catch (err) {
        console.error("GalaxyBackground draw error", err);
      }

      if (!reduceMotion) {
        frame = requestAnimationFrame(draw);
      }
    }

    // The canvas is decorative, so it waits until the page has loaded and
    // hydrated: drawing during load competed with the content for the main
    // thread (and the intro splash hides the sky for the first moments anyway).
    let started = false;
    const startTimer = window.setTimeout(() => {
      started = true;
      frame = requestAnimationFrame(draw);
    }, 1200);

    function handleVisibility() {
      if (!started) return;
      if (document.hidden) {
        cancelAnimationFrame(frame);
      } else if (!reduceMotion) {
        frame = requestAnimationFrame(draw);
      }
    }
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.clearTimeout(startTimer);
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <div className="galaxy-layer" aria-hidden="true">
      <div className="nebula-blob nebula-a" />
      <div className="nebula-blob nebula-b" />
      <div className="nebula-blob nebula-c" />
      <div className="nebula-blob nebula-core" />
      <canvas ref={canvasRef} className="galaxy-canvas" />
      <div className="galaxy-horizon" />
      <div className="galaxy-vignette" />
      <div className="meadow-wrap">
        <div className="meadow-hill meadow-hill-far" />
        <div className="meadow-hill meadow-hill-back" />
        <div className="meadow-hill meadow-hill-mid" />
        <div className="meadow-hill meadow-hill-front" />
      </div>
    </div>
  );
}
