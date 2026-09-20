import repositoryPosts from '@/content/blog/posts.json'

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  author?: string
  category?: string
  featuredImage?: string
  images?: { src: string; alt: string }[]
  primaryKeyword?: string
  secondaryKeywords?: string[]
  publicationWeek?: string
}

// Importing the content includes every article in the deployment bundle.
// WordPress settings cannot replace or hide repository-managed articles.
export async function getBlogPosts(): Promise<BlogPost[]> {
  return [...repositoryPosts].sort((a, b) => b.date.localeCompare(a.date))
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  return (await getBlogPosts()).find((post) => post.slug === slug) ?? null
}
