#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface ContentAnalysis {
  title: string;
  slug: string;
  wordCount: number;
  keywordDensity: { [keyword: string]: number };
  readabilityScore: number;
  seoScore: number;
  issues: string[];
  suggestions: string[];
  headings: string[];
  internalLinks: number;
  externalLinks: number;
  images: number;
}

interface ContentOptimizationResult {
  overallScore: number;
  contentAnalysis: ContentAnalysis[];
  recommendations: string[];
}

class ContentOptimizer {
  private targetKeywords = [
    'landing page oluşturucu',
    'açılış sayfası',
    'proje sayfası',
    'girişimci araçları',
    'lead toplama',
    'mvp oluşturma',
    'proje validasyonu',
    'müşteri adayı',
    'startup araçları',
    'landing page builder'
  ];

  async analyzeContent(): Promise<ContentOptimizationResult> {
    console.log('📝 Analyzing content for SEO optimization...\n');

    const blogDir = path.join(process.cwd(), 'content/blog');
    const analyses: ContentAnalysis[] = [];

    if (!fs.existsSync(blogDir)) {
      console.log('❌ Blog directory not found');
      return {
        overallScore: 0,
        contentAnalysis: [],
        recommendations: ['Create content/blog directory with markdown files']
      };
    }

    const blogFiles = fs.readdirSync(blogDir).filter(file => file.endsWith('.md'));

    for (const file of blogFiles) {
      const filePath = path.join(blogDir, file);
      const analysis = await this.analyzeBlogPost(filePath);
      analyses.push(analysis);
    }

    const overallScore = this.calculateOverallScore(analyses);
    const recommendations = this.generateRecommendations(analyses);

    return {
      overallScore,
      contentAnalysis: analyses,
      recommendations
    };
  }

  private async analyzeBlogPost(filePath: string): Promise<ContentAnalysis> {
    const content = fs.readFileSync(filePath, 'utf8');
    const { data, content: body } = matter(content);

    const title = data.title || 'Untitled';
    const slug = data.slug || path.basename(filePath, '.md');

    // Word count
    const wordCount = this.countWords(body);

    // Keyword analysis
    const keywordDensity = this.analyzeKeywordDensity(body);

    // Readability score (simplified)
    const readabilityScore = this.calculateReadabilityScore(body);

    // SEO Score
    const seoScore = this.calculateSEOscore(data, body, keywordDensity);

    // Content issues
    const issues = this.identifyIssues(data, body, wordCount, keywordDensity);

    // Suggestions
    const suggestions = this.generateSuggestions(issues, data, body);

    // Headings analysis
    const headings = this.extractHeadings(body);

    // Link analysis
    const { internalLinks, externalLinks } = this.analyzeLinks(body);

    // Image count
    const images = this.countImages(body);

    return {
      title,
      slug,
      wordCount,
      keywordDensity,
      readabilityScore,
      seoScore,
      issues,
      suggestions,
      headings,
      internalLinks,
      externalLinks,
      images
    };
  }

  private countWords(text: string): number {
    return text.trim().split(/\s+/).length;
  }

  private analyzeKeywordDensity(text: string): { [keyword: string]: number } {
    const density: { [keyword: string]: number } = {};
    const words = text.toLowerCase().split(/\s+/);
    const totalWords = words.length;

    this.targetKeywords.forEach(keyword => {
      const count = (text.toLowerCase().match(new RegExp(keyword.toLowerCase(), 'g')) || []).length;
      if (count > 0) {
        density[keyword] = (count / totalWords) * 100;
      }
    });

    return density;
  }

  private calculateReadabilityScore(text: string): number {
    // Simplified readability score based on sentence length and word complexity
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const words = text.split(/\s+/);
    const avgSentenceLength = words.length / sentences.length;

    // Lower sentence length = higher readability
    const sentenceScore = Math.max(0, 100 - (avgSentenceLength - 15) * 2);

    // Word complexity (simplified)
    const complexWords = words.filter(word => word.length > 6).length;
    const complexityScore = Math.max(0, 100 - (complexWords / words.length) * 200);

    return Math.round((sentenceScore + complexityScore) / 2);
  }

  private calculateSEOscore(data: any, body: string, keywordDensity: { [keyword: string]: number }): number {
    let score = 0;

    // Title optimization (30 points)
    if (data.title && data.title.length >= 30 && data.title.length <= 60) score += 15;
    if (data.title && this.containsTargetKeyword(data.title)) score += 15;

    // Meta description (20 points)
    if (data.seo?.description && data.seo.description.length >= 120 && data.seo.description.length <= 160) score += 10;
    if (data.seo?.description && this.containsTargetKeyword(data.seo.description)) score += 10;

    // Content length (20 points)
    if (body.length >= 1500) score += 10;
    if (body.length >= 2500) score += 10;

    // Keyword usage (20 points)
    const keywordCount = Object.keys(keywordDensity).length;
    if (keywordCount > 0) score += 10;
    if (keywordCount >= 3) score += 10;

    // Headings (10 points)
    const headings = this.extractHeadings(body);
    if (headings.length >= 5) score += 5;
    if (headings.some(h => this.containsTargetKeyword(h))) score += 5;

    return Math.min(100, score);
  }

  private identifyIssues(data: any, body: string, wordCount: number, keywordDensity: { [keyword: string]: number }): string[] {
    const issues: string[] = [];

    // Title issues
    if (!data.title) issues.push('Missing title');
    else if (data.title.length < 30) issues.push('Title too short (< 30 characters)');
    else if (data.title.length > 60) issues.push('Title too long (> 60 characters)');

    // Meta description issues
    if (!data.seo?.description) issues.push('Missing meta description');
    else if (data.seo.description.length < 120) issues.push('Meta description too short (< 120 characters)');
    else if (data.seo.description.length > 160) issues.push('Meta description too long (> 160 characters)');

    // Content issues
    if (wordCount < 500) issues.push('Content too short (< 500 words)');
    if (wordCount > 3000) issues.push('Content very long (> 3000 words) - consider splitting');

    // Keyword issues
    const keywordOveruse = Object.values(keywordDensity).some(density => density > 3.0);
    if (keywordOveruse) issues.push('Keyword stuffing detected (> 3% density)');

    // Structure issues
    const headings = this.extractHeadings(body);
    if (headings.length < 3) issues.push('Insufficient headings (use H2, H3 for structure)');

    // Link issues
    const { internalLinks, externalLinks } = this.analyzeLinks(body);
    if (internalLinks < 2) issues.push('Few internal links (< 2)');
    if (externalLinks > 5) issues.push('Too many external links (> 5)');

    return issues;
  }

  private generateSuggestions(issues: string[], data: any, body: string): string[] {
    const suggestions: string[] = [];

    if (issues.includes('Missing title') || issues.includes('Title too short')) {
      suggestions.push('Add compelling title with target keyword (30-60 characters)');
    }

    if (issues.includes('Missing meta description') || issues.includes('Meta description too short')) {
      suggestions.push('Write meta description with call-to-action and keyword (120-160 characters)');
    }

    if (issues.includes('Content too short')) {
      suggestions.push('Expand content with more detailed explanations and examples');
    }

    if (issues.includes('Keyword stuffing detected')) {
      suggestions.push('Reduce keyword density, use synonyms and related terms');
    }

    if (issues.includes('Insufficient headings')) {
      suggestions.push('Add H2 and H3 headings to improve content structure and SEO');
    }

    if (issues.includes('Few internal links')) {
      suggestions.push('Add 2-3 internal links to related content on your site');
    }

    // General suggestions
    suggestions.push('Add relevant images with alt text for better engagement');
    suggestions.push('Include bullet points and numbered lists for scannability');
    suggestions.push('Add call-to-action at the end of the article');

    return suggestions;
  }

  private extractHeadings(text: string): string[] {
    const headingRegex = /^#{1,6}\s+(.+)$/gm;
    const headings: string[] = [];
    let match;

    while ((match = headingRegex.exec(text)) !== null) {
      headings.push(match[1].trim());
    }

    return headings;
  }

  private analyzeLinks(text: string): { internalLinks: number; externalLinks: number } {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let internalLinks = 0;
    let externalLinks = 0;
    let match;

    while ((match = linkRegex.exec(text)) !== null) {
      const url = match[2];
      if (url.startsWith('http') && !url.includes('listelee.io')) {
        externalLinks++;
      } else if (url.includes('listelee.io') || !url.startsWith('http')) {
        internalLinks++;
      }
    }

    return { internalLinks, externalLinks };
  }

  private countImages(text: string): number {
    const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
    return (text.match(imageRegex) || []).length;
  }

  private containsTargetKeyword(text: string): boolean {
    return this.targetKeywords.some(keyword =>
      text.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  private calculateOverallScore(analyses: ContentAnalysis[]): number {
    if (analyses.length === 0) return 0;

    const totalScore = analyses.reduce((sum, analysis) => sum + analysis.seoScore, 0);
    return Math.round(totalScore / analyses.length);
  }

  private generateRecommendations(analyses: ContentAnalysis[]): string[] {
    const recommendations: string[] = [];
    const totalPosts = analyses.length;

    // Content volume recommendations
    if (totalPosts < 10) {
      recommendations.push('📝 Create more content - aim for 20+ articles for better SEO coverage');
    }

    // Quality recommendations
    const lowQualityPosts = analyses.filter(a => a.seoScore < 50).length;
    if (lowQualityPosts > totalPosts * 0.3) {
      recommendations.push('🎯 Improve content quality - optimize titles, meta descriptions, and keyword usage');
    }

    // Keyword optimization
    const postsWithKeywords = analyses.filter(a => Object.keys(a.keywordDensity).length > 0).length;
    if (postsWithKeywords < totalPosts * 0.7) {
      recommendations.push('🔍 Optimize for target keywords - include primary and secondary keywords naturally');
    }

    // Content length
    const shortPosts = analyses.filter(a => a.wordCount < 1000).length;
    if (shortPosts > totalPosts * 0.5) {
      recommendations.push('📏 Create longer, comprehensive content (1500+ words) for better rankings');
    }

    // Structure recommendations
    const wellStructuredPosts = analyses.filter(a => a.headings.length >= 5).length;
    if (wellStructuredPosts < totalPosts * 0.6) {
      recommendations.push('🏗️ Improve content structure with proper headings hierarchy');
    }

    return recommendations;
  }
}

// CLI interface
async function main() {
  const optimizer = new ContentOptimizer();
  const result = await optimizer.analyzeContent();

  console.log('📊 Content Optimization Results');
  console.log('==============================');
  console.log(`Overall SEO Score: ${result.overallScore}/100`);
  console.log(`Total Posts Analyzed: ${result.contentAnalysis.length}\n`);

  result.contentAnalysis.forEach((analysis, index) => {
    console.log(`${index + 1}. "${analysis.title}"`);
    console.log(`   📏 Word Count: ${analysis.wordCount}`);
    console.log(`   🎯 SEO Score: ${analysis.seoScore}/100`);
    console.log(`   📖 Readability: ${analysis.readabilityScore}/100`);

    if (Object.keys(analysis.keywordDensity).length > 0) {
      console.log(`   🔍 Keywords Found: ${Object.keys(analysis.keywordDensity).join(', ')}`);
    }

    if (analysis.issues.length > 0) {
      console.log(`   ⚠️ Issues: ${analysis.issues.join(', ')}`);
    }

    if (analysis.suggestions.length > 0) {
      console.log(`   💡 Suggestions: ${analysis.suggestions.slice(0, 2).join(', ')}`);
    }

    console.log('');
  });

  console.log('🎯 Key Recommendations:');
  result.recommendations.forEach((rec, index) => {
    console.log(`${index + 1}. ${rec}`);
  });

  // Save detailed results
  const outputPath = path.join(process.cwd(), 'content-optimization-results.json');
  fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));
  console.log(`\n📄 Detailed results saved to: ${outputPath}`);
}

if (require.main === module) {
  main().catch(console.error);
}

export { ContentOptimizer, type ContentAnalysis, type ContentOptimizationResult };
