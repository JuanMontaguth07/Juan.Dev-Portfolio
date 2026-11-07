import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  redirects() {
    return [
      // "Hardware Marketplace" was merged into Kova Studio (slug hardware-store).
      {
        source: "/:locale(es|en|pt|de)/projects/hardware-marketplace",
        destination: "/:locale/projects/hardware-store",
        permanent: true,
      },
      {
        source: "/projects/hardware-marketplace",
        destination: "/projects/hardware-store",
        permanent: true,
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
