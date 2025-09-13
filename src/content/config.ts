// src/content/config.ts
import { defineCollection, z } from 'astro:content';

// Define a new collection named 'blog'
const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.preprocess((arg) => {
      if (typeof arg === 'string') {
        return new Date(arg + 'Z');
      }
      return arg;
    }, z.date()),
    thumbnail: z.string().optional(),
    rating: z.number().min(1).max(5),
		featured_cta: z.string().optional(),
  }),
});

// The new collection for your unique website pages
const pagesCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(), // Make fields optional if they don't appear on every page
    hero_image: z.string().optional(),
		main_menu: z.boolean().optional(),
		order: z.number().nullable().optional(),
		top_components: z.array(z.string()).optional(),
		bottom_components: z.array(z.string()).optional(),
		features: z.array(z.string()).optional(),
  }).passthrough(),
});

const productsCollection = defineCollection({
  schema: z.object({
    name: z.string(),
    slogan: z.string().optional(),
		price: z.number().nullable().optional(),
		discounted_price: z.number().nullable().optional(),
		rating: z.number().nullable().optional(),
		number_of_ratings: z.number().nullable().optional(),
		status: z.string(),
		order: z.number().nullable().optional(),
    image1: z.string(),
		image2: z.string().optional(),
		image3: z.string().optional(),
		image4: z.string().optional(),
		image5: z.string().optional(),
		features: z.array(z.string()).optional(),
		checkout_link: z.string().nullable().optional(),
  }),
});

// The new collection for your unique website pages
const componentsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
		name: z.string(),
  }),
});

// Define what a "feature" looks like
const featuresCollection = defineCollection({
  schema: z.object({
    name: z.string(),
    icon: z.string().nullable().optional(),
		custom_icon: z.string().nullable().optional(),
  }),
});

const supportArticlesCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.preprocess((arg) => {
      if (typeof arg === 'string') {
        return new Date(arg + 'Z');
      }
      return arg;
    }, z.date()),
    thumbnail: z.string().optional(),
		related_articles: z.array(z.string().optional()),
		featured: z.boolean(),
		abstract: z.string(),
		category: z.string(),
  }),
});

// Define what a "feature" looks like
const supportCategoriesCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    label: z.string(),
		abstract: z.string(),
  }),
});

const homePagArticlesCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    name: z.string(),
		link: z.string(),
		image: z.string(),
		order: z.number(),
  }),
});

const roadMapCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    name: z.string(),
		date: z.string(),
		done: z.boolean(),
  }),
});

const faqCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    question: z.string(),
		order: z.number(),
  }),
});

// Export a `collections` object to register your new 'blog' collection
export const collections = {
  blog: blogCollection,
	pages: pagesCollection,
	components: componentsCollection,
	products: productsCollection,
	features: featuresCollection,
	support_articles: supportArticlesCollection,
	support_categories: supportCategoriesCollection,
	home_page_articles: homePagArticlesCollection,
	road_map: roadMapCollection,
	faq: faqCollection,
};
