import { MetadataRoute } from 'next'
import { APP_URL } from '~/lib/config'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default rules for all crawlers
      {
        userAgent: '*',
        allow: [
          '/',
          '/pricing',
          '/login',
          '/onboarding',
          '/showcase',
          '/blog',
          '/kategori/',
          '/llms.txt',
        ],
        disallow: [
          '/dashboard/',
          '/api/',
          '/admin/',
          '/_next/',
          '/auth/',
          '/payment-success',
          '/payment-fail',
          '/success',
          '/private/',
          '/admin/',
          '/search?',
          '/checkout/',
          '*.json$',
        ],
      },
      // OpenAI GPTBot - Allow access to core content and llms.txt
      {
        userAgent: 'GPTBot',
        allow: [
          '/',
          '/pricing',
          '/blog/',
          '/showcase',
          '/llms.txt',
        ],
        disallow: [
          '/dashboard/',
          '/api/',
          '/auth/',
          '/private/',
          '/search?',
        ],
      },
      // ChatGPT User Agent
      {
        userAgent: 'ChatGPT-User',
        allow: [
          '/',
          '/pricing',
          '/blog/',
          '/showcase',
          '/llms.txt',
        ],
        disallow: [
          '/dashboard/',
          '/api/',
          '/auth/',
          '/private/',
          '/search?',
        ],
      },
      // Anthropic Claude
      {
        userAgent: 'Claude-Web',
        allow: [
          '/',
          '/pricing',
          '/blog/',
          '/showcase',
          '/llms.txt',
        ],
        disallow: [
          '/dashboard/',
          '/api/',
          '/auth/',
          '/private/',
          '/search?',
        ],
      },
      // Perplexity AI
      {
        userAgent: 'PerplexityBot',
        allow: [
          '/',
          '/pricing',
          '/blog/',
          '/showcase',
          '/llms.txt',
        ],
        disallow: [
          '/dashboard/',
          '/api/',
          '/auth/',
          '/private/',
          '/search?',
        ],
      },
      // Google Gemini/Bard
      {
        userAgent: 'Gemini/1.0',
        allow: [
          '/',
          '/pricing',
          '/blog/',
          '/showcase',
          '/llms.txt',
        ],
        disallow: [
          '/dashboard/',
          '/api/',
          '/auth/',
          '/private/',
        ],
      },
      // Microsoft Bing AI
      {
        userAgent: 'MicrosoftPreview/1.0',
        allow: [
          '/',
          '/pricing',
          '/blog/',
          '/showcase',
          '/llms.txt',
        ],
        disallow: [
          '/dashboard/',
          '/api/',
          '/auth/',
          '/private/',
        ],
      },
      // Grok AI (xAI)
      {
        userAgent: 'Grok/1.0',
        allow: [
          '/',
          '/pricing',
          '/blog/',
          '/showcase',
          '/llms.txt',
        ],
        disallow: [
          '/dashboard/',
          '/api/',
          '/auth/',
          '/private/',
        ],
      },
      // Common AI crawlers
      {
        userAgent: 'AI2Bot',
        allow: [
          '/',
          '/pricing',
          '/blog/',
          '/llms.txt',
        ],
        disallow: [
          '/dashboard/',
          '/api/',
          '/auth/',
          '/private/',
        ],
      },
      {
        userAgent: 'CCBot',
        allow: [
          '/',
          '/pricing',
          '/blog/',
          '/llms.txt',
        ],
        disallow: [
          '/dashboard/',
          '/api/',
          '/auth/',
          '/private/',
        ],
      },
      // Social media crawlers
      {
        userAgent: 'facebookexternalhit',
        allow: [
          '/',
          '/blog/',
          '/',
          '/showcase',
        ],
        disallow: [
          '/dashboard/',
          '/api/',
          '/auth/',
          '/private/',
        ],
      },
      {
        userAgent: 'Twitterbot',
        allow: [
          '/',
          '/blog/',
          '/',
          '/showcase',
        ],
        disallow: [
          '/dashboard/',
          '/api/',
          '/auth/',
          '/private/',
        ],
      },
      {
        userAgent: 'LinkedInBot',
        allow: [
          '/',
          '/blog/',
          '/',
          '/pricing',
        ],
        disallow: [
          '/dashboard/',
          '/api/',
          '/auth/',
          '/private/',
        ],
      },
    ],
    sitemap: `${APP_URL}/sitemap.xml`,
    host: APP_URL,
  }
} 