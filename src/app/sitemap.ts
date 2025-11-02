import { MetadataRoute } from 'next'
import { APP_URL } from '~/lib/config'
import { getPublicProjects } from '~/lib/firestore'
import { getAllBlogPosts } from '~/lib/blog'

// Define categories for SEO category pages
const CATEGORIES = [
  'e-commerce',
  'saas', 
  'local-business',
  'consulting',
  'education',
  'health',
  'technology',
  'food',
  'fashion',
  'travel'
];

// Static pages with optimized SEO settings
const STATIC_PAGES = [
    {
      url: APP_URL,
    changeFrequency: 'weekly' as const,
    priority: 1.0,
    },
    {
      url: `${APP_URL}/pricing`,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
    },
    {
      url: `${APP_URL}/showcase`,
    changeFrequency: 'daily' as const,
    priority: 0.8,
    },
    {
      url: `${APP_URL}/blog`,
    changeFrequency: 'daily' as const,
    priority: 0.8,
  },
  {
    url: `${APP_URL}/onboarding`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
    },
    {
      url: `${APP_URL}/login`,
    changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
    url: `${APP_URL}/success`,
    changeFrequency: 'yearly' as const,
    priority: 0.4,
  },
  {
    url: `${APP_URL}/payment-success`,
    changeFrequency: 'yearly' as const,
    priority: 0.2,
  },
  {
    url: `${APP_URL}/payment-fail`,
    changeFrequency: 'yearly' as const,
    priority: 0.2,
    },
  ];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Static pages with current timestamp
  const staticPages: MetadataRoute.Sitemap = STATIC_PAGES.map(page => ({
    ...page,
    lastModified: now,
  }));

  // Add category pages for SEO
  const categoryPages: MetadataRoute.Sitemap = CATEGORIES.map((category) => ({
    url: `${APP_URL}/kategori/${category}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Add dynamic project pages and blog posts
  try {
    const [publicProjects, blogPosts] = await Promise.all([
      getPublicProjects(),
      getAllBlogPosts(true)
    ]);

    // Process project pages with enhanced priority calculation
    const projectPages: MetadataRoute.Sitemap = publicProjects
      .filter(project => project.slug) // Ensure project has a slug
      .map((project) => {
        let lastModified = now;

        // Determine lastModified from various timestamp sources
      if (project.updatedAt) {
        if (typeof project.updatedAt === 'object' && 'seconds' in project.updatedAt) {
          lastModified = new Date(project.updatedAt.seconds * 1000);
        } else if (typeof project.updatedAt === 'number') {
            lastModified = new Date(project.updatedAt);
          } else if (typeof project.updatedAt === 'string') {
          lastModified = new Date(project.updatedAt);
        }
      } else if (project.createdAt) {
        if (typeof project.createdAt === 'object' && 'seconds' in project.createdAt) {
          lastModified = new Date(project.createdAt.seconds * 1000);
        } else if (typeof project.createdAt === 'number') {
          lastModified = new Date(project.createdAt);
          } else if (typeof project.createdAt === 'string') {
            lastModified = new Date(project.createdAt);
        }
      }
      
        // Enhanced priority calculation based on multiple factors
        let priority = 0.6; // Base priority for projects
        let changeFrequency: 'daily' | 'weekly' | 'monthly' = 'weekly';

        const totalSignups = project.stats?.totalSignups || 0;
        const totalVisits = project.stats?.totalVisits || 0;
        const isPublished = project.status === 'published';

        // Priority based on performance metrics
        if (totalSignups > 100) {
          priority = 0.9;
          changeFrequency = 'daily';
        } else if (totalSignups > 50) {
          priority = 0.8;
          changeFrequency = 'weekly';
        } else if (totalSignups > 10) {
          priority = 0.7;
          changeFrequency = 'weekly';
        } else if (totalVisits > 100) {
          priority = 0.7;
          changeFrequency = 'weekly';
        } else if (isPublished) {
          priority = 0.6;
          changeFrequency = 'monthly';
        }

        // Boost priority for newer projects (within last 30 days)
        const daysSinceModified = (now.getTime() - lastModified.getTime()) / (1000 * 60 * 60 * 24);
        if (daysSinceModified < 30) {
          priority = Math.min(priority + 0.1, 0.9);
      }
      
      return {
        url: `${APP_URL}/${project.slug}`,
        lastModified,
          changeFrequency,
        priority,
      };
    });

    // Process blog post pages with enhanced metadata
    const blogPages: MetadataRoute.Sitemap = blogPosts
      .filter(post => post.slug) // Ensure post has a slug
      .map((post) => {
        let lastModified = now;
      
      if (post.updatedAt) {
        lastModified = new Date(post.updatedAt);
        } else if (post.publishedAt) {
          lastModified = new Date(post.publishedAt);
        }

        // Priority based on post age and content type
        let priority = 0.7; // Base priority for blog posts
        let changeFrequency: 'weekly' | 'monthly' = 'monthly';

        const daysSincePublished = (now.getTime() - lastModified.getTime()) / (1000 * 60 * 60 * 24);

        // Recent posts get higher priority
        if (daysSincePublished < 7) {
          priority = 0.8;
          changeFrequency = 'weekly';
        } else if (daysSincePublished < 30) {
          priority = 0.75;
          changeFrequency = 'weekly';
        } else if (daysSincePublished < 90) {
          priority = 0.7;
          changeFrequency = 'weekly';
        } else {
          priority = 0.6;
          changeFrequency = 'monthly';
        }

        // Featured or popular posts get higher priority (if we had view counts)
        // For now, we'll assume all published posts are important
      
      return {
        url: `${APP_URL}/blog/${post.slug}`,
        lastModified,
          changeFrequency,
          priority,
      };
    });
    
    // Combine all pages and sort by priority (highest first) for better SEO
    const allPages = [...staticPages, ...categoryPages, ...projectPages, ...blogPages]
      .sort((a, b) => (b.priority || 0) - (a.priority || 0));

    return allPages;
  } catch (error) {
    console.error('Error fetching dynamic content for sitemap:', error);
    // Return static content if dynamic fetch fails
    return [...staticPages, ...categoryPages];
  }
} 