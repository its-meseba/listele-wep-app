"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Home } from 'lucide-react';
import Link from 'next/link';
import { Button } from '~/components/ui/button';

function SuccessPageContent() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [checkoutData, setCheckoutData] = useState<any>(null);

  useEffect(() => {
    const checkoutId = searchParams.get('checkout_id');

    if (checkoutId) {
      // Here you could verify the payment with Polar if needed
      setCheckoutData({ checkoutId });
      setIsLoading(false);
    } else {
      // Handle case where checkout_id is not provided
      setCheckoutData({ checkoutId: null });
      setIsLoading(false);
    }
  }, [searchParams]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Ödemeniz doğrulanıyor...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-950 py-20">
      <div className="mx-auto max-w-2xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-green-100 dark:bg-green-900"
          >
            <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-400" />
          </motion.div>

          {/* Success Message */}
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-4">
            Ödeme Başarılı! 🎉
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-lg mx-auto">
            Tebrikler! listelee.lumiostudio.co lifetime lisansınız aktif edildi. Artık tüm premium özelliklere sınırsız erişiminiz var.
          </p>

          {/* Plan Details */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 mb-8"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Premium Özellikleriniz Aktif
            </h3>
            <div className="space-y-3 text-left">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">Lifetime Erişim</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">3 Proje Limiti</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">Öncelikli Destek</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">İleri Analitik</span>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/dashboard">
              <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
                Dashboard'a Git
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 font-semibold">
                <Home className="mr-2 h-5 w-5" />
                Ana Sayfa
              </Button>
            </Link>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 text-sm text-gray-500 dark:text-gray-400"
          >
            <p>
              Sorularınız mı var?{' '}
              <a
                href="mailto:support@listelee.lumiostudio.co"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                support@listelee.lumiostudio.co
              </a>{' '}
              adresinden bize ulaşabilirsiniz.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Ödemeniz doğrulanıyor...</p>
        </div>
      </div>
    }>
      <SuccessPageContent />
    </Suspense>
  );
}
