#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

// SEO Audit Script for first100.lumiostudio.co
interface SEOIssue {
  type: 'error' | 'warning' | 'info';
  category: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  url?: string;
  suggestion: string;
}

interface SEOAuditResult {
  score: number;
  issues: SEOIssue[];
  recommendations: string[];
}

class SEOAudit {
  private issues: SEOIssue[] = [];
  private baseUrl = 'https://first100.lumiostudio.co';

  async runAudit(): Promise<SEOAuditResult> {
    console.log('🚀 Starting SEO Audit for first100.lumiostudio.co...\n');

    await this.checkMetaTags();
    await this.checkContentQuality();
    await this.checkTechnicalSEO();
    await this.checkPerformance();
    await this.checkMobileOptimization();
    await this.checkInternalLinking();
    await this.checkSchemaMarkup();

    const score = this.calculateScore();
    const recommendations = this.generateRecommendations();

    return {
      score,
      issues: this.issues,
      recommendations
    };
  }

  private async checkMetaTags() {
    console.log('📋 Checking meta tags...');

    // Check if metadata.ts exists and has proper structure
    const metadataPath = path.join(process.cwd(), 'src/app/metadata.ts');
    if (!fs.existsSync(metadataPath)) {
      this.addIssue('error', 'Meta Tags', 'Missing metadata.ts file', 'Meta tags are crucial for SEO', 'high', undefined, 'Create src/app/metadata.ts with proper title, description, and Open Graph tags');
      return;
    }

    // Check for essential meta tags
    const metadata = require(metadataPath);
    if (!metadata.metadata?.title) {
      this.addIssue('error', 'Meta Tags', 'Missing title tag', 'Title tag is essential for search rankings', 'high', undefined, 'Add title tag with 50-60 characters including target keywords');
    }

    if (!metadata.metadata?.description) {
      this.addIssue('error', 'Meta Tags', 'Missing meta description', 'Meta description improves click-through rates', 'high', undefined, 'Add meta description with 150-160 characters summarizing page value proposition');
    }

    if (!metadata.metadata?.openGraph) {
      this.addIssue('warning', 'Meta Tags', 'Missing Open Graph tags', 'Open Graph tags improve social media sharing', 'medium', undefined, 'Add Open Graph title, description, image, and URL tags');
    }
  }

  private async checkContentQuality() {
    console.log('📝 Checking content quality...');

    // Check blog content
    const blogDir = path.join(process.cwd(), 'content/blog');
    if (!fs.existsSync(blogDir)) {
      this.addIssue('error', 'Content', 'No blog content found', 'Blog content is crucial for SEO and authority', 'high', undefined, 'Create content/blog directory with regular, high-quality articles');
      return;
    }

    const blogPosts = fs.readdirSync(blogDir).filter(file => file.endsWith('.md'));
    if (blogPosts.length < 10) {
      this.addIssue('warning', 'Content', 'Limited blog content', 'More content improves search rankings and authority', 'medium', undefined, 'Aim for at least 20 blog posts covering your niche topics');
    }

    // Check for keyword optimization in existing content
    blogPosts.forEach(post => {
      const content = fs.readFileSync(path.join(blogDir, post), 'utf8');
      if (content.length < 1500) {
        this.addIssue('warning', 'Content', `Short blog post: ${post}`, 'Longer content tends to rank better', 'low', `/blog/${post.replace('.md', '')}`, 'Expand content to 1500+ words with comprehensive information');
      }
    });
  }

  private async checkTechnicalSEO() {
    console.log('🔧 Checking technical SEO...');

    // Check robots.txt
    const robotsPath = path.join(process.cwd(), 'public/robots.txt');
    if (!fs.existsSync(robotsPath)) {
      this.addIssue('error', 'Technical', 'Missing robots.txt', 'Robots.txt guides search engine crawlers', 'high', undefined, 'Create public/robots.txt with proper crawling instructions');
    }

    // Check sitemap
    const sitemapPath = path.join(process.cwd(), 'public/sitemap.xml');
    if (!fs.existsSync(sitemapPath)) {
      this.addIssue('error', 'Technical', 'Missing sitemap.xml', 'Sitemap helps search engines discover pages', 'high', undefined, 'Generate XML sitemap and submit to Google Search Console');
    }

    // Check for structured data
    const layoutPath = path.join(process.cwd(), 'src/app/layout.tsx');
    if (fs.existsSync(layoutPath)) {
      const layout = fs.readFileSync(layoutPath, 'utf8');
      if (!layout.includes('application/ld+json')) {
        this.addIssue('warning', 'Technical', 'Missing structured data', 'Structured data enhances search result appearance', 'medium', undefined, 'Add JSON-LD structured data for organization and website schema');
      }
    }
  }

  private async checkPerformance() {
    console.log('⚡ Checking performance...');

    // Check for image optimization
    const publicDir = path.join(process.cwd(), 'public');
    const images = this.getAllFiles(publicDir, ['.jpg', '.jpeg', '.png', '.webp']);
    if (images.length === 0) {
      this.addIssue('info', 'Performance', 'No images found in public directory', 'Images can improve engagement but need optimization', 'low', undefined, 'Consider adding optimized images (WebP format, compressed)');
    }

    // Check for lazy loading
    this.addIssue('info', 'Performance', 'Consider implementing lazy loading', 'Lazy loading improves page load speed', 'medium', undefined, 'Add loading="lazy" to images below the fold');

    // Check bundle size
    this.addIssue('info', 'Performance', 'Monitor bundle size', 'Large bundles can hurt Core Web Vitals', 'medium', undefined, 'Use next/bundle-analyzer to monitor and optimize bundle size');
  }

  private async checkMobileOptimization() {
    console.log('📱 Checking mobile optimization...');

    // Check for responsive design
    const globalsPath = path.join(process.cwd(), 'src/app/globals.css');
    if (fs.existsSync(globalsPath)) {
      const css = fs.readFileSync(globalsPath, 'utf8');
      if (!css.includes('@media') && !css.includes('responsive')) {
        this.addIssue('warning', 'Mobile', 'Limited responsive design', 'Mobile-first design is crucial for SEO', 'medium', undefined, 'Ensure all components are fully responsive with mobile-first CSS');
      }
    }
  }

  private async checkInternalLinking() {
    console.log('🔗 Checking internal linking...');

    // Check for navigation structure
    this.addIssue('info', 'Internal Linking', 'Review internal linking structure', 'Good internal linking improves crawlability', 'low', undefined, 'Ensure all important pages are linked from navigation and footer');
  }

  private async checkSchemaMarkup() {
    console.log('🏷️ Checking schema markup...');

    // Check for schema markup in components
    const structuredDataPath = path.join(process.cwd(), 'src/components/structured-data.tsx');
    if (!fs.existsSync(structuredDataPath)) {
      this.addIssue('warning', 'Schema', 'Missing structured data components', 'Schema markup enhances search results', 'medium', undefined, 'Create structured data components for articles, products, and organization');
    }
  }

  private addIssue(type: SEOIssue['type'], category: string, title: string, description: string, impact: SEOIssue['impact'], url?: string, suggestion?: string) {
    this.issues.push({
      type,
      category,
      title,
      description,
      impact,
      url,
      suggestion: suggestion || 'Herhangi bir öneri yok'
    });
  }

  private calculateScore(): number {
    const weights = { error: 10, warning: 5, info: 1 };
    const totalPenalty = this.issues.reduce((sum, issue) => sum + weights[issue.type], 0);
    return Math.max(0, 100 - totalPenalty);
  }

  private generateRecommendations(): string[] {
    const recommendations: string[] = [];

    const errorCount = this.issues.filter(i => i.type === 'error').length;
    const warningCount = this.issues.filter(i => i.type === 'warning').length;

    if (errorCount > 0) {
      recommendations.push('🚨 Fix critical errors first - these have major SEO impact');
    }

    if (warningCount > 0) {
      recommendations.push('⚠️ Address warnings to improve SEO performance');
    }

    recommendations.push('📈 Focus on content creation - publish 2-3 high-quality articles per week');
    recommendations.push('🔍 Implement local SEO for Turkish market targeting');
    recommendations.push('📊 Set up Google Analytics and Search Console for monitoring');
    recommendations.push('🔗 Build quality backlinks through guest posting and partnerships');
    recommendations.push('📱 Optimize for Core Web Vitals (LCP, FID, CLS)');
    recommendations.push('🎯 Create pillar content around main keywords');
    recommendations.push('📧 Start email newsletter for better engagement');
    recommendations.push('🤝 Partner with complementary businesses for cross-promotion');

    return recommendations;
  }

  private getAllFiles(dirPath: string, extensions: string[]): string[] {
    const files: string[] = [];

    function traverseDirectory(currentPath: string) {
      const items = fs.readdirSync(currentPath);

      items.forEach(item => {
        const fullPath = path.join(currentPath, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          traverseDirectory(fullPath);
        } else if (extensions.some(ext => item.toLowerCase().endsWith(ext))) {
          files.push(fullPath);
        }
      });
    }

    traverseDirectory(dirPath);
    return files;
  }
}

// CLI interface
async function main() {
  const auditor = new SEOAudit();
  const result = await auditor.runAudit();

  console.log('\n📊 SEO Audit Results');
  console.log('==================');
  console.log(`Overall SEO Score: ${result.score}/100`);

  console.log('\n🔍 Issues Found:');
  result.issues.forEach((issue, index) => {
    const icon = issue.type === 'error' ? '❌' : issue.type === 'warning' ? '⚠️' : 'ℹ️';
    console.log(`${index + 1}. ${icon} [${issue.category}] ${issue.title}`);
    console.log(`   Impact: ${issue.impact.toUpperCase()}`);
    console.log(`   ${issue.description}`);
    if (issue.url) console.log(`   URL: ${issue.url}`);
    console.log(`   💡 ${issue.suggestion}\n`);
  });

  console.log('🎯 Recommendations:');
  result.recommendations.forEach((rec, index) => {
    console.log(`${index + 1}. ${rec}`);
  });

  // Save results to file
  const outputPath = path.join(process.cwd(), 'seo-audit-results.json');
  fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));
  console.log(`\n📄 Detailed results saved to: ${outputPath}`);
}

if (require.main === module) {
  main().catch(console.error);
}

export { SEOAudit, type SEOAuditResult, type SEOIssue };
