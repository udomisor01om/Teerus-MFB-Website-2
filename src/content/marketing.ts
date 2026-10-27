import type { Product, Testimonial } from "./types";

const figmaSource =
  "https://www.figma.com/design/W1wYewAKixvMwC1acUsq20/Teerus-MFB-Marketing";
type ProductCard = Product & { image: string; phone?: boolean };

export const products: ProductCard[] = [
  {
    name: "Savings",
    description: "Grow your money, even while you sleep.",
    image: "savings-phone.webp",
    phone: true,
  },
  {
    name: "Fixed deposits",
    description: "Lock it away and earn more.",
    image: "fixed-deposit-customer.webp",
  },
  {
    name: "Regular accounts",
    description: "Savings and transaction accounts for everyday banking.",
    image: "regular-phone.webp",
    phone: true,
  },
  {
    name: "Salary accounts",
    description: "Manage your income and expenses in one place.",
    image: "salary-account-customer.webp",
  },
  {
    name: "Esusu",
    description: "Save with others and take money when your cycle comes up.",
    image: "images/Esusu Mobile Screen.png",
    phone: true,
  },
  {
    name: "Teerus card",
    description: "Pay at shops, POS and ATMs. Freeze or set limits in the app.",
    image: "teerus-card-customer.webp",
  },
].map((product, index) => ({
  ...product,
  id: `product-${index + 1}`,
  audience: "both",
  source: `${figmaSource}?node-id=5263-46232`,
  approved: false,
}));
export const loans = [
  {
    name: "Payday loans",
    description:
      "Cover urgent bills or emergencies before your next salary arrives. Apply in the app and repay when you get paid.",
  },
  {
    name: "Micro loans",
    description:
      "Working capital to keep your shop open and cash flowing. Buy stock, pay suppliers and cover daily costs with ease.",
  },
  {
    name: "Retail loans",
    description:
      "Flexible personal loans with repayment options that fit how you earn, so you can spread the cost of what matters.",
  },
  {
    name: "SME financing",
    description:
      "Won an order but short on cash to deliver it? We fund the supply and you get paid when your client pays you.",
  },
  {
    name: "Micro loans",
    description:
      "Small loans for school fees, rent or a family need. Borrow what you need and repay in amounts that fit your budget.",
  },
  {
    name: "Inventory financing",
    description:
      "Stock up before the busy season and never turn a customer away. We fund the goods and you repay as you sell.",
  },
];
export const testimonials: (Testimonial & { image: string })[] = [
  {
    name: "Femi Oluwatosin",
    image: "customer-femi.png",
    quote:
      "With Teerus MFB, I can pay bills from my phone. It saves me time and fits right into my busy day.",
  },
  {
    name: "Tolu Adewale",
    image: "customer-tolu.png",
    quote:
      "I use Teerus MFB to keep track of my spending. Having everything in one app makes managing my money easier.",
  },
  {
    name: "Yemi Tominsin",
    image: "customer-yemi.png",
    quote:
      "Teerus MFB makes everyday banking simple. I can send money and check my balance without visiting a branch.",
  },
].map((testimonial, index) => ({
  ...testimonial,
  id: `testimonial-${index + 1}`,
  attribution: "",
  source: `${figmaSource}?node-id=5263-46069`,
  approved: false,
}));
export const individualAccounts = [
  {
    name: "Regular accounts",
    description:
      "Savings and transaction accounts for everyday banking. Open one in the app in minutes.",
    image: "images/earn-joy.webp",
  },
  {
    name: "Salary accounts",
    description:
      "Get paid straight into Teerus and manage your income and expenses in one place.",
    image: "images/earn-cash.webp",
  },
  {
    name: "Savings",
    description:
      "Grow your money, even while you sleep. Save towards rent, school fees or your next big plan.",
    image: "images/earn-overview.webp",
  },
  {
    name: "Fixed deposits",
    description:
      "Lock your money away for a set time and earn more. The longer and bigger, the better.",
    image: "images/earn-confidence.webp",
  },
];
export const businessAccounts = [
  {
    name: "Current accounts",
    description:
      "Simple everyday banking for your business. Send, receive and manage funds from one account.",
    image: "business-current-customer.png",
  },
  {
    name: "Corporate salary accounts",
    description:
      "Pay staff on time with automated payroll and secure deposits, at low maintenance fees.",
    image: "business-payroll-account.png",
  },
  {
    name: "Pay in one transfer",
    description:
      "Pay vendors, suppliers and employees in a single transfer and save hours every month.",
    image: "business-transfer.png",
  },
  {
    name: "Virtual accounts",
    description:
      "Give each customer or sales channel its own account number, so reconciling is easy.",
    image: "virtual-account-customer.png",
  },
];
export const values = [
  [
    "Integrity",
    "We act with honesty, openness and accountability.",
    "value-integrity.svg",
  ],
  [
    "Customer focus",
    "Our customers are at the heart of every decision.",
    "value-customer.svg",
  ],
  [
    "Innovation",
    "We keep finding better ways to serve you.",
    "value-innovation.svg",
  ],
  [
    "Empowerment",
    "We help individuals and businesses grow and stand on their own.",
    "value-empowerment.svg",
  ],
  [
    "Inclusiveness",
    "Financial services for everyone, especially those who are often left out.",
    "value-inclusiveness.svg",
  ],
];
export const team = [
  [
    "Chukwuemeka o. Osondu",
    "Managing Director/CEO",
    "team-chukwuemeka-osondu.png",
  ],
  [
    "Esang U. Ekarika",
    "Head, Risk Management & Internal Control",
    "team-esang-ekarika.png",
  ],
  ["Daniel Tunji-Adekanye", "IT Lead", "team-daniel-adekanye.png"],
  ["Nwamaka Chukwudebe", "Head of Operations", "team-nwamaka-chukwudebe.png"],
  ["Adebisi Ilo", "Relationship Officer", "team-adebisi-ilo.png"],
  ["Ayeni Felicia", "Relationship Officer", "team-ayeni-felicia.png"],
  ["Okereafor Amarachi", "Teller", "team-okereafor-amarachi.png"],
];
