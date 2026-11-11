import { PATHS, type AppPath } from '@/navigation/paths'

export type BlogCategory =
  | 'Software Development'
  | 'Artificial Intelligence'
  | 'Personal Reflections'

export interface BlogPost {
  id: string
  path: AppPath
  title: string
  excerpt: string
  category: BlogCategory
  imageUrl: string
  imageAlt: string
}

export const BLOGS: readonly BlogPost[] = [
  {
    id: 'learning-to-building',
    path: PATHS.BLOG_SOFTWARE,
    title: 'From Learning to Building: My Journey in Software Development',
    excerpt:
      'A reflection on my transition from learning programming concepts to building practical software solutions through Refactory and real-world client projects.',
    category: 'Software Development',
    imageUrl:
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1000&q=85',
    imageAlt: 'Laptop with a code editor open on a wooden desk',
  },
  {
    id: 'ai-beyond-hype',
    path: PATHS.BLOG_AI,
    title: 'Exploring AI Beyond the Hype: Building Technology That Solves Real Problems',
    excerpt:
      'My exploration of artificial intelligence, working with AI models, experimenting with intelligent systems and thinking about how AI can address real challenges in Africa.',
    category: 'Artificial Intelligence',
    imageUrl:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=85',
    imageAlt: 'Illuminated server racks in a data center',
  },
  {
    id: 'beyond-code',
    path: PATHS.BLOG_PURPOSE,
    title: 'Beyond Code: Leadership, Collaboration and Building With Purpose',
    excerpt:
      'Lessons from leading a team during an international Japanese company internship, collaborating on technology projects and discovering that software engineering involves much more than writing code.',
    category: 'Personal Reflections',
    imageUrl:
      'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1000&q=85',
    imageAlt: 'Colleagues collaborating around a table',
  },
] as const
