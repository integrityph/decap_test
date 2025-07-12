// src/content/config.ts
import { defineCollection, z } from 'astro:content';

// Define a new collection named 'blog'
const blogCollection = defineCollection({
  // The 'schema' defines the frontmatter of your Markdown files
  schema: z.object({
    // title: z.string() -> A direct mapping from the 'string' widget
    title: z.string(),
    
    // date: z.date() -> Astro recognizes datetime widgets and converts them to JavaScript Date objects
    date: z.preprocess((arg) => {
      // 1. Check if the argument is a string
      if (typeof arg === 'string') {
        // 2. Append 'Z' to make it a valid UTC timestamp and parse it
        return new Date(arg + 'Z');
      }
      // 3. If it's already a Date object or something else, pass it through
      return arg;
    }, z.date()), // 4. Finally, validate that the result is a valid date

    
    // thumbnail: z.string() -> The 'image' widget stores the path to the image as a string
    // You can also use z.optional() if an image isn't always required
    thumbnail: z.string().optional(),
    
    // rating: z.number() -> A direct mapping from the 'number' widget
    // You can even add validation to match your scale!
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
		order: z.number().optional(),
  }).passthrough(),
});

// The new collection for your unique website pages
const productsCollection = defineCollection({
  schema: z.object({
    name: z.string(),
    slogan: z.string().optional(),
		price: z.number().nullable().optional(),
		discounted_price: z.number().nullable().optional(),
		rating: z.number().nullable().optional(),
		number_of_ratings: z.number().nullable().optional(),
		status: z.string(),
    image1: z.string(),
		image2: z.string().optional(),
		image3: z.string().optional(),
		image4: z.string().optional(),
		image5: z.string().optional(),
  }),
});

// The new collection for your unique website pages
const componentsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    heading: z.string(),
    button_text: z.string(),
		shopify_url: z.string(),
  }),
});

// Export a `collections` object to register your new 'blog' collection
export const collections = {
  blog: blogCollection,
	pages: pagesCollection,
	components: componentsCollection,
	products: productsCollection,
};
