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
  }),
});

// Export a `collections` object to register your new 'blog' collection
export const collections = {
  blog: blogCollection,
};