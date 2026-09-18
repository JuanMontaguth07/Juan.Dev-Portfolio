# Juan.Dev — Portafolio personal

Portafolio de **Juan Diego Montaguth Rodríguez**, tecnólogo en Análisis y Desarrollo de Software (SENA, Cúcuta, Colombia). Un sitio multilenguaje con un fondo animado que cambia según el tema: una galaxia con cometas y auroras en modo oscuro, y un cielo con nubes, sol, arcoíris y pradera en modo claro.

## Características

- **4 idiomas**: español, inglés, portugués y alemán (`next-intl`).
- **Modo claro y oscuro** con escenas de fondo distintas, dibujadas en `<canvas>` y optimizadas para no perder fluidez.
- **Secciones**: inicio, sobre mí, habilidades (con barras de nivel), proyectos (con filtros y página de detalle) y contacto.
- **Formulario de contacto real**: envía los mensajes a mi correo mediante [Resend](https://resend.com).
- **Descarga de CV** en PDF.
- **Responsive**, con animaciones de [Framer Motion](https://www.framer.com/motion/) que respetan `prefers-reduced-motion`.

## Tecnologías

| Área | Herramientas |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Estilos | Tailwind CSS v4 |
| Animación | Framer Motion, Canvas 2D |
| Internacionalización | next-intl |
| Tema | next-themes |
| Íconos | lucide-react, simple-icons |
| Correo | Resend |

## Estructura

```
app/
  [locale]/          Páginas y layout (una por idioma)
  api/contact/       Ruta que envía el formulario por correo
components/          Secciones y piezas de interfaz
data/                Proyectos y habilidades
messages/            Traducciones (es, en, pt, de)
lib/                 Configuración del sitio y utilidades
public/              Imágenes y cv.pdf
```

## Ejecutarlo en local

Requisitos: Node.js 20 o superior.

```bash
git clone <url-del-repositorio>
cd juan-dev-portfolio
npm install
cp .env.example .env.local   # en Windows: copy .env.example .env.local
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). Redirige automáticamente al idioma por defecto.

## Variables de entorno

| Variable | Descripción |
| --- | --- |
| `RESEND_API_KEY` | API key de Resend para enviar el formulario de contacto. Se crea gratis en [resend.com](https://resend.com) → API Keys. |

Sin esta variable el sitio funciona normalmente; solo el formulario de contacto devuelve un error. **Nunca subas `.env.local` al repositorio** (ya está en `.gitignore`).

> Con la cuenta gratuita de Resend y el remitente `onboarding@resend.dev`, los correos solo se pueden enviar a la dirección con la que se registró la cuenta. Para enviar a otros destinatarios hay que verificar un dominio propio.

## Scripts

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Compilación de producción |
| `npm run start` | Sirve la compilación de producción |
| `npm run lint` | Revisa el código con ESLint |

## Personalizar el contenido

- **Datos de contacto**: `lib/site-config.ts`.
- **Proyectos**: `data/projects.ts` (datos y estado) y `messages/*.json` → `ProjectData` (textos por idioma).
- **Habilidades y niveles**: `data/skills.ts`.
- **CV**: reemplaza `public/cv.pdf`.

## Despliegue

Se despliega en [Vercel](https://vercel.com). Si el repositorio contiene esta carpeta dentro de otra, configura **Root Directory** como `juan-dev-portfolio` y agrega `RESEND_API_KEY` en *Settings → Environment Variables*.

## Contacto

- Correo: juandiegomontaguth@gmail.com
- GitHub: [JuanMontaguth07](https://github.com/JuanMontaguth07)
- LinkedIn: [Juan Diego Montaguth Rodríguez](https://www.linkedin.com/in/juan-diego-montaguth-rodriguez-673078405)
