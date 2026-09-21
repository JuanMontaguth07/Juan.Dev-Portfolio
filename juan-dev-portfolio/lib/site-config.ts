/** Single source of truth for personal contact links. */
export const siteConfig = {
  /** Public origin; used for canonical URLs, the sitemap and social previews. */
  url: "https://juandevportfolio.vercel.app",
  email: "juandiegomontaguth@gmail.com",
  github: "https://github.com/JuanMontaguth07",
  linkedin:
    "https://www.linkedin.com/in/juan-diego-montaguth-rodriguez-673078405",
  whatsapp: "https://wa.me/573249330828",
  /** Status badges shown in the hero; flip a flag to hide one. */
  availability: { freelance: true, contract: true },
  // Opens Gmail's web composer directly; a mailto: link would launch
  // whatever desktop mail client is the OS default (e.g. Outlook).
  gmailCompose:
    "https://mail.google.com/mail/?view=cm&fs=1&to=juandiegomontaguth@gmail.com",
};
