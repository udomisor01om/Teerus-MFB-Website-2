import { siteConfig } from "./site";
export const bankStructuredData = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "BankOrCreditUnion",
  name: siteConfig.name,
  url: siteConfig.canonicalOrigin,
  telephone: "+2349012411411",
  email: "info@teerusbank.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "No 53, Itire Road",
    addressLocality: "Surulere, Lagos",
    addressCountry: "NG",
  },
}).replace(/</g, "\\u003c");
