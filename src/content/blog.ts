/** Preview content adapter. Replace these functions with CMS queries when ready. */
export const blogCategories = [
  "All stories",
  "Money & everyday life",
  "For business",
  "Inside Teerus",
  "Product stories",
] as const;
export type BlogCategory = Exclude<
  (typeof blogCategories)[number],
  "All stories"
>;
export interface BlogSection {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
  quote?: string;
}
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  date: string;
  readMinutes: number;
  author: string;
  image: string;
  imageAlt: string;
  featured?: boolean;
  sections: BlogSection[];
}
const seeds: Omit<BlogPost, "author" | "sections" | "readMinutes">[] = [
  {
    slug: "small-steps-bigger-dreams",
    title: "Small steps. Bigger dreams. A little progress, every day.",
    excerpt:
      "The everyday moments, people and possibilities behind a new way to think about your money.",
    category: "Money & everyday life",
    date: "2026-10-27",
    image: "/assets/home-market-woman-about.webp",
    imageAlt: "A woman holding cash and smiling",
    featured: true,
  },
  {
    slug: "room-for-your-next-big-idea",
    title: "Make room for your next big business idea.",
    excerpt:
      "A look at the small routines behind busy shops, growing teams and ambitious plans.",
    category: "For business",
    date: "2026-10-26",
    image: "/assets/business-current-customer-sme.webp",
    imageAlt: "Small business owner at work",
  },
  {
    slug: "banking-with-a-human-side",
    title: "Banking has a human side. Meet ours.",
    excerpt:
      "A glimpse of the people and shared purpose at the heart of Teerus.",
    category: "Inside Teerus",
    date: "2026-10-25",
    image: "/assets/about-team-group-about.webp",
    imageAlt: "Members of the Teerus team",
  },
  {
    slug: "everyday-banking-in-your-pocket",
    title: "A little less running around. A little more living.",
    excerpt:
      "Exploring the everyday moments that inspire our mobile banking experience.",
    category: "Product stories",
    date: "2026-10-24",
    image: "/assets/regular-phone.webp",
    imageAlt: "Preview of the Teerus mobile app",
  },
  {
    slug: "a-place-for-your-plans",
    title: "Every plan deserves a place to begin.",
    excerpt:
      "Big dreams often begin with something small: a conversation, a notebook, a first step.",
    category: "Money & everyday life",
    date: "2026-10-23",
    image: "/assets/fixed-deposit-customer.webp",
    imageAlt: "A customer looking ahead",
  },
  {
    slug: "behind-every-open-shop",
    title: "Behind every open shop is a story worth telling.",
    excerpt:
      "Celebrating the everyday energy of local businesses and the communities around them.",
    category: "For business",
    date: "2026-10-22",
    image: "/assets/sme-hero-market-women.webp",
    imageAlt: "Two women working together at a market",
  },
  {
    slug: "closer-to-our-community",
    title: "Closer to the community. Closer to you.",
    excerpt:
      "A preview of the local stories, conversations and connections we hope to share here.",
    category: "Inside Teerus",
    date: "2026-10-21",
    image: "/assets/business-current-customer-about.webp",
    imageAlt: "A member of the local business community",
  },
  {
    slug: "your-day-your-way",
    title: "Your day. Your plans. Your way to bank.",
    excerpt:
      "A first look at the ideas that shape a simpler everyday banking experience.",
    category: "Product stories",
    date: "2026-10-20",
    image: "/assets/teerus-card-customer.webp",
    imageAlt: "Customer holding a Teerus card",
  },
  {
    slug: "dreams-we-build-together",
    title: "Some dreams are better built together.",
    excerpt:
      "The people who cheer us on, share our ideas and help us keep moving.",
    category: "Money & everyday life",
    date: "2026-10-19",
    image: "/assets/investment-customer-about.webp",
    imageAlt: "Customer sharing an everyday moment",
  },
];
const posts: BlogPost[] = seeds.map((post) => ({
  ...post,
  author: "Teerus editorial",
  readMinutes: 2,
  sections: [
    {
      id: "the-everyday-start",
      title: "It starts with the everyday",
      paragraphs: [
        post.excerpt,
        "This is a sample story created to preview the Teerus blog. It shows how an introduction, supporting paragraphs and photographs will come together when our editorial stories are ready.",
        "Picture an ordinary morning: a shop opening its doors, a new idea written down, or a conversation about what comes next. These are the kinds of moments this space will explore.",
      ],
    },
    {
      id: "a-closer-look",
      title:
        post.category === "For business"
          ? "Behind the business"
          : "A closer look at the story",
      paragraphs: [
        "There is more to every story than the headline. This section is a place for the context, voices and details that make a story useful and worth spending time with.",
        "The finished article will bring those details to life with reviewed information and real experiences. For now, this sample text demonstrates the reading experience without announcing a product, offer or customer outcome.",
      ],
      quote: "Everyday stories. New possibilities.",
    },
    {
      id: "what-to-expect",
      title: "More stories to come",
      paragraphs: [
        "We look forward to sharing more about everyday life, local business and the people behind Teerus. Here is a preview of the kinds of stories you will find:",
      ],
      bullets: [
        "Conversations with people in our community.",
        "A look behind the scenes at Teerus.",
        "Stories about the ideas that shape everyday banking.",
      ],
    },
    {
      id: "keep-exploring",
      title: "Keep exploring",
      paragraphs: [
        "Browse the related stories below or return to the blog to explore another topic. All articles in this preview use sample content; approved editorial copy will replace it before publication.",
      ],
    },
  ],
}));
export function getBlogPosts() {
  return posts;
}
export function getBlogPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}
export function formatBlogDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}
export function filterBlogPosts(
  posts: BlogPost[],
  category: string,
  query: string,
) {
  const search = query.trim().toLocaleLowerCase();
  return posts.filter(
    (post) =>
      (category === "All stories" || post.category === category) &&
      `${post.title} ${post.excerpt} ${post.category}`
        .toLocaleLowerCase()
        .includes(search),
  );
}
