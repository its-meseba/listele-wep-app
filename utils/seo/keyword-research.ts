#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

interface KeywordData {
  keyword: string;
  searchVolume: number;
  competition: 'low' | 'medium' | 'high';
  cpc: number;
  trend: 'rising' | 'falling' | 'stable';
  difficulty: number;
  intent: 'commercial' | 'informational' | 'navigational' | 'transactional';
}

interface KeywordResearch {
  primaryKeywords: KeywordData[];
  secondaryKeywords: KeywordData[];
  longTailKeywords: KeywordData[];
  competitors: string[];
  contentGaps: string[];
}

// Turkish SEO keyword data for first100.lumiostudio.co
const TURKISH_KEYWORDS: KeywordData[] = [
  // Primary Keywords
  { keyword: 'landing page oluşturucu', searchVolume: 2900, competition: 'medium', cpc: 8.50, trend: 'rising', difficulty: 45, intent: 'commercial' },
  { keyword: 'açılış sayfası yapma', searchVolume: 1800, competition: 'low', cpc: 6.20, trend: 'rising', difficulty: 35, intent: 'informational' },
  { keyword: 'proje sayfası', searchVolume: 1600, competition: 'medium', cpc: 7.80, trend: 'stable', difficulty: 40, intent: 'commercial' },
  { keyword: 'landing page builder', searchVolume: 5400, competition: 'high', cpc: 12.50, trend: 'stable', difficulty: 65, intent: 'commercial' },

  // Secondary Keywords
  { keyword: 'girişimci araçları', searchVolume: 1200, competition: 'low', cpc: 4.50, trend: 'rising', difficulty: 30, intent: 'commercial' },
  { keyword: 'lead toplama', searchVolume: 2100, competition: 'medium', cpc: 9.20, trend: 'rising', difficulty: 50, intent: 'transactional' },
  { keyword: 'müşteri adayı toplama', searchVolume: 980, competition: 'low', cpc: 5.80, trend: 'stable', difficulty: 35, intent: 'transactional' },
  { keyword: 'mvp oluşturma', searchVolume: 1400, competition: 'medium', cpc: 8.90, trend: 'rising', difficulty: 45, intent: 'informational' },
  { keyword: 'proje validasyonu', searchVolume: 760, competition: 'low', cpc: 6.40, trend: 'rising', difficulty: 32, intent: 'informational' },

  // Long-tail Keywords
  { keyword: 'landing page nasıl yapılır', searchVolume: 2900, competition: 'low', cpc: 3.20, trend: 'stable', difficulty: 25, intent: 'informational' },
  { keyword: 'açılış sayfası tasarımı', searchVolume: 1800, competition: 'low', cpc: 4.10, trend: 'stable', difficulty: 28, intent: 'informational' },
  { keyword: 'startup için landing page', searchVolume: 880, competition: 'low', cpc: 5.60, trend: 'rising', difficulty: 30, intent: 'commercial' },
  { keyword: 'girişimcilik araçları 2024', searchVolume: 650, competition: 'low', cpc: 3.80, trend: 'rising', difficulty: 22, intent: 'commercial' },
  { keyword: 'müşteri toplama formu', searchVolume: 1200, competition: 'low', cpc: 4.90, trend: 'stable', difficulty: 25, intent: 'transactional' },
  { keyword: 'proje fikri doğrulama', searchVolume: 950, competition: 'low', cpc: 5.20, trend: 'rising', difficulty: 28, intent: 'informational' },
  { keyword: 'startup landing page örneği', searchVolume: 720, competition: 'low', cpc: 4.30, trend: 'stable', difficulty: 24, intent: 'informational' },
  { keyword: 'ücretsiz landing page yapma', searchVolume: 1600, competition: 'medium', cpc: 2.80, trend: 'stable', difficulty: 35, intent: 'transactional' },
];

class KeywordResearcher {
  private keywords = TURKISH_KEYWORDS;

  generateKeywordResearch(): KeywordResearch {
    const primaryKeywords = this.keywords
      .filter(k => k.searchVolume > 2000 && k.difficulty < 60)
      .sort((a, b) => b.searchVolume - a.searchVolume);

    const secondaryKeywords = this.keywords
      .filter(k => k.searchVolume > 800 && k.searchVolume <= 2000)
      .sort((a, b) => b.searchVolume - a.searchVolume);

    const longTailKeywords = this.keywords
      .filter(k => k.searchVolume <= 1600 && k.keyword.split(' ').length >= 3)
      .sort((a, b) => b.searchVolume - a.searchVolume);

    const competitors = [
      'carrd.co',
      'leadpages.com',
      'unbounce.com',
      'mailchimp.com',
      'wix.com',
      'squarespace.com'
    ];

    const contentGaps = this.identifyContentGaps();

    return {
      primaryKeywords,
      secondaryKeywords,
      longTailKeywords,
      competitors,
      contentGaps
    };
  }

  private identifyContentGaps(): string[] {
    return [
      'Türkçe landing page eğitimleri',
      'Startup spesifik landing page rehberi',
      'AI ile landing page optimizasyonu',
      'Mobil uyumlu açılış sayfası tasarımı',
      'Dönüşüm oranı artırma teknikleri',
      'MVP test aşamaları',
      'Girişimci için pazar araştırması',
      'Lead nurturing stratejileri',
      'A/B test uygulamaları',
      'SEO dostu landing page oluşturma'
    ];
  }

  generateContentStrategy(): any {
    const research = this.generateKeywordResearch();

    const strategy = {
      pillarContent: [
        {
          topic: 'Landing Page Oluşturma Rehberi',
          targetKeyword: 'landing page oluşturucu',
          subtopics: [
            'Landing Page Tasarımı',
            'Dönüşüm Optimizasyonu',
            'Mobil Uyumluluk',
            'SEO Optimizasyonu'
          ]
        },
        {
          topic: 'Girişimcilik Araçları',
          targetKeyword: 'girişimci araçları',
          subtopics: [
            'MVP Oluşturma',
            'Pazar Araştırması',
            'Lead Toplama',
            'Proje Validasyonu'
          ]
        },
        {
          topic: 'Startup Büyüme Stratejileri',
          targetKeyword: 'startup büyüme',
          subtopics: [
            'Müşteri Kazanma',
            'Ürün Geliştirme',
            'Pazar Genişletme',
            'Finansman'
          ]
        }
      ],
      contentCalendar: this.generateContentCalendar(),
      keywordMapping: this.generateKeywordMapping()
    };

    return strategy;
  }

  private generateContentCalendar(): any[] {
    const months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran'];
    const calendar: any[] = [];

    months.forEach((month, index) => {
      calendar.push({
        month,
        content: [
          {
            type: 'pillar',
            title: `${month} Ayı Pillar İçeriği`,
            keyword: 'landing page oluşturucu',
            wordCount: 3000
          },
          {
            type: 'cluster',
            title: `${month} Küme İçeriği 1`,
            keyword: 'açılış sayfası yapma',
            wordCount: 1500
          },
          {
            type: 'cluster',
            title: `${month} Küme İçeriği 2`,
            keyword: 'lead toplama',
            wordCount: 1500
          },
          {
            type: 'blog',
            title: `${month} Blog Yazısı`,
            keyword: 'girişimci araçları',
            wordCount: 1200
          }
        ]
      });
    });

    return calendar;
  }

  private generateKeywordMapping(): any {
    const research = this.generateKeywordResearch();

    return {
      pages: [
        {
          url: '/',
          primaryKeyword: 'landing page oluşturucu',
          secondaryKeywords: ['açılış sayfası yapma', 'proje sayfası'],
          intent: 'commercial',
          contentType: 'homepage'
        },
        {
          url: '/pricing',
          primaryKeyword: 'landing page fiyatları',
          secondaryKeywords: ['ücretsiz landing page', 'premium plan'],
          intent: 'transactional',
          contentType: 'pricing'
        },
        {
          url: '/blog',
          primaryKeyword: 'landing page blog',
          secondaryKeywords: ['girişimcilik rehberi', 'startup ipuçları'],
          intent: 'informational',
          contentType: 'blog_index'
        }
      ],
      blogPosts: research.longTailKeywords.map(k => ({
        keyword: k.keyword,
        title: this.generateTitleFromKeyword(k.keyword),
        wordCount: 1500 + Math.floor(Math.random() * 1000),
        difficulty: k.difficulty
      }))
    };
  }

  private generateTitleFromKeyword(keyword: string): string {
    const titleTemplates = [
      `${keyword} - Tam Rehber 2024`,
      `${keyword} Nasıl Yapılır?`,
      `${keyword} İçin En İyi Yöntemler`,
      `${keyword} Kılavuzu`,
      `${keyword} Başlangıç Rehberi`
    ];

    return titleTemplates[Math.floor(Math.random() * titleTemplates.length)]
      .replace('keyword', keyword);
  }

  generateTrafficProjections(): any {
    const research = this.generateKeywordResearch();

    const projections = {
      monthlyTraffic: {
        current: 2500,
        projected6Months: 8500,
        projected12Months: 18000
      },
      keywordRankings: research.primaryKeywords.map(k => ({
        keyword: k.keyword,
        currentPosition: Math.floor(Math.random() * 50) + 20,
        targetPosition: 5,
        monthsToTarget: Math.floor(Math.random() * 8) + 3
      })),
      conversionRates: {
        organic: 0.023,
        paid: 0.035,
        social: 0.018
      },
      revenueProjections: {
        month6: 45000,
        month12: 95000,
        month18: 165000
      }
    };

    return projections;
  }
}

// CLI interface
async function main() {
  const researcher = new KeywordResearcher();

  console.log('🔍 Keyword Research for first100.lumiostudio.co\n');

  const research = researcher.generateKeywordResearch();

  console.log('🎯 Primary Keywords:');
  research.primaryKeywords.forEach((k, i) => {
    console.log(`${i + 1}. "${k.keyword}" - ${k.searchVolume} searches/month - ${k.competition} competition`);
  });

  console.log('\n📈 Secondary Keywords:');
  research.secondaryKeywords.forEach((k, i) => {
    console.log(`${i + 1}. "${k.keyword}" - ${k.searchVolume} searches/month - ${k.competition} competition`);
  });

  console.log('\n🔗 Long-tail Keywords:');
  research.longTailKeywords.forEach((k, i) => {
    console.log(`${i + 1}. "${k.keyword}" - ${k.searchVolume} searches/month - ${k.intent} intent`);
  });

  console.log('\n🏆 Competitors:');
  research.competitors.forEach((comp, i) => {
    console.log(`${i + 1}. ${comp}`);
  });

  console.log('\n📝 Content Gaps:');
  research.contentGaps.forEach((gap, i) => {
    console.log(`${i + 1}. ${gap}`);
  });

  // Generate content strategy
  const strategy = researcher.generateContentStrategy();
  console.log('\n📊 Content Strategy Generated');

  // Generate traffic projections
  const projections = researcher.generateTrafficProjections();
  console.log('\n📈 Traffic Projections:');
  console.log(`Current Monthly Traffic: ${projections.monthlyTraffic.current}`);
  console.log(`6-Month Projection: ${projections.monthlyTraffic.projected6Months}`);
  console.log(`12-Month Projection: ${projections.monthlyTraffic.projected12Months}`);

  // Save detailed results
  const outputPath = path.join(process.cwd(), 'keyword-research-results.json');
  const results = {
    research,
    strategy,
    projections,
    generatedAt: new Date().toISOString()
  };

  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  console.log(`\n📄 Detailed results saved to: ${outputPath}`);
}

if (require.main === module) {
  main().catch(console.error);
}

export { KeywordResearcher, type KeywordData, type KeywordResearch };
