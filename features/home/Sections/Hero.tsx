import { useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { LayoutTextFlip } from '@/components/ui/layout-text-flip';
import Button from '@/components/atoms/Button';
import MotionFade from '@/components/molecules/FramerMotion/MotionFade';
import React, { useEffect } from 'react';
import useAPI from '@/Hooks/useAPI';
import { HeroStats } from '@/data';
import Loading from '@/components/atoms/Loading';
import { PATHS } from '@/data/paths';

const Hero = () => {
  const { scrollY } = useScroll();

  const progress = useTransform(scrollY, [0, 800], [0, 1]);
  const yTitle = useTransform(progress, [0, 1], [0, 160]);
  const yButton = useTransform(progress, [0, 1], [0, 100]);

  // Hooks to fetch settings and products data
  const {
    get: getSettings,
    data: settingsData,
    isLoading: settingsLoading,
    error: settingsError,
  } = useAPI('settings');

  const { get: getProducts, data: productsData } = useAPI('products');

  const freeShippingMin = settingsData?.[0]?.free_shipping_min ?? 300;

  const avg = productsData?.length
    ? productsData.reduce((sum, p) => sum + (p.rating_avg ?? 0), 0) /
      productsData.length
    : 0;

  const avgRating = Number(avg.toFixed(1));

  useEffect(() => {
    getSettings();
    getProducts();
  }, [getSettings, getProducts]);

  return (
    <section
      className="relative min-h-screen w-full overflow-hidden bg-background"
      aria-label="Hero section"
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-transparent z-10" />

      {/* Hero image */}
      <div className="absolute inset-0">
        <Image
          src="/assets/hero-fashion.png"
          alt="Fashion model wearing premium streetwear"
          fill
          className="object-cover object-center"
          priority
          quality={85}
          sizes="100vw"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 flex min-h-screen items-center">
        <div className="mx-auto w-full max-w-7xl px-6 py-30 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
            {/* Text content */}
            <div className="flex flex-col justify-center">
              {/* Badge */}
              <MotionFade className="mb-6" y={yTitle}>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#088178]/30 bg-[#08817915] px-4 py-2 text-sm font-medium tracking-wide text-foreground">
                  <span className="h-2 w-2 rounded-full bg-(--forth-color) animate-pulse" />
                  New Collection 2026
                </span>
              </MotionFade>

              {/* Headline */}
              <MotionFade
                className="font-extrabold text-(--forth-color)"
                y={yTitle}
              >
                <LayoutTextFlip
                  text="Hikayat Al-Noon "
                  words={['Collection', 'Style', 'Fashion', 'Vibe']}
                />
              </MotionFade>

              {/* Subheadline */}
              <MotionFade
                className="text-lg sm:text-xl text-(--seconde-color) leading-relaxed mt-8"
                y={yTitle}
              >
                Modern fashion designed for simplicity, comfort, and timeless
                style.
              </MotionFade>

              {/* CTAs */}
              <MotionFade
                className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
                y={yButton}
              >
                <Button
                  ariaLabel="Shop now and browse all products"
                  otherClassName="group flex items-center gap-3 rounded-full px-8 text-base font-semibold text-background transition-all hover:shadow-xl hover:scale-105"
                  iconClassName="h-5 w-5"
                  Icon={ShoppingBag}
                  href={PATHS.SHOP.ROOT}
                >
                  Shop Now
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                  ariaLabel="Explore summer t-shirts collection"
                  variant="outline"
                  otherClassName="border-(--forth-color)! text-(--forth-color)! hover:text-white! w-fit!"
                  href={{
                    pathname: PATHS.SHOP.ROOT,
                    query: { category: 'tshirts_summer' },
                  }}
                >
                  Explore Collection
                </Button>
              </MotionFade>

              {/* Stats */}
              <MotionFade
                className="mt-16 flex items-center gap-8 border-t border-border/50 pt-8"
                y={yButton}
              >
                {HeroStats(avgRating).map((item, index) => (
                  <React.Fragment key={index}>
                    <div className={item.className || ''}>
                      <p className="text-xl font-bold text-foreground">
                        {item.title}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {item.subtitle}
                      </p>
                    </div>

                    {index !== HeroStats(avgRating).length - 1 && (
                      <div className="h-12 w-px bg-border/50 hidden sm:block" />
                    )}
                  </React.Fragment>
                ))}
              </MotionFade>
            </div>

            {/* Right side - decorative elements for larger screens */}
            <div className="hidden lg:flex lg:items-center lg:justify-end">
              {/* Floating cards */}
              <div className="relative">
                <div className="absolute -right-4 top-20 rounded-2xl bg-card/80 p-4 shadow-2xl backdrop-blur-sm border border-border/50 animate-float">
                  <p className="text-xs font-medium text-muted-foreground">
                    Trending Now
                  </p>
                  <p className="mt-1 font-semibold text-foreground">
                    Luxury Essentials
                  </p>
                </div>
                <div className="absolute -left-8 bottom-32 rounded-2xl bg-card/80 p-4 shadow-2xl backdrop-blur-sm border border-border/50 animate-float-delayed">
                  <p className="text-xs font-medium text-muted-foreground">
                    Free Shipping
                  </p>
                  <div className="mt-1 font-semibold text-foreground">
                    Orders over{' '}
                    {settingsData &&
                      (settingsLoading ? (
                        <Loading
                          showText={false}
                          spinnerSize={20}
                          otherClassName="bg-transparent! p-0!"
                        />
                      ) : settingsError ? (
                        <span className="text-muted-foreground text-sm">
                          $300+
                        </span>
                      ) : (
                        `$${freeShippingMin}`
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
          Scroll
        </span>
        <div className="h-12 w-px bg-gradient-to-b from-muted-foreground to-transparent animate-pulse" />
      </div>
    </section>
  );
};

export default Hero;
