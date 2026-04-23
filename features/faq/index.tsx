'use client';

import Button from '@/components/atoms/Button';
import Container from '@/components/atoms/Container';
import Layer from '@/components/atoms/Layer';
import CardWrapper from '@/components/Template/CardWrapper';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { PATHS } from '@/data/paths';
import { useSupabaseQuery } from '@/Hooks/useSupabaseQuery';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import SupportContactCard from './SupportContactCard';
import { faqCategories } from '@/data';
import FAQSkeleton from '@/components/Skeletons/FAQSkeleton';
import ErrorFetching from '@/components/molecules/ErrorFetching';
import EmptyState from '@/components/molecules/EmptyState';
import { Inbox } from 'lucide-react';

const FAQPage = () => {
  const [activeCategory, setActiveCategory] = useState('orders');

  // Supabase Hook
  const { data, isLoading, error } = useSupabaseQuery('faqs', {
    category: activeCategory,
  });

  const items = data?.data;

  return (
    <Layer otherClassName="bg-muted/30 pt-[160px] md:pt-40">
      <Container>
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:pb-20 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
              Frequently Asked Questions
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Find answers to common questions about orders, payments, shipping,
              returns, and more. Can&apos;t find what you&apos;re looking for?
              Contact our support team.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-2 mt-7 px-4 sm:px-0">
          {faqCategories.map((category) => (
            <Button
              key={category.id}
              variant="outline"
              handleClick={() => setActiveCategory(category.id)}
              otherClassName={cn(
                'px-4 sm:px-5 py-2 rounded-full! text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                activeCategory === category.id
                  ? 'bg-(--forth-color)! text-white shadow-sm'
                  : 'bg-card text-foreground border! border-border! hover:bg-muted',
              )}
            >
              {category.label}
            </Button>
          ))}
        </div>

        <div className="mt-8">
          <Accordion type="single" collapsible className="w-full">
            {isLoading ? (
              <FAQSkeleton />
            ) : error ? (
              <ErrorFetching error={error} />
            ) : (
              <Accordion type="single" collapsible className="w-full space-y-3">
                {items?.map((item, index) => (
                  <CardWrapper
                    key={index}
                    withFlex={false}
                    otherClassName="w-full"
                    contentClassName="p-0!"
                  >
                    <AccordionItem
                      value={`item-${index}`}
                      className="w-full px-4 sm:px-8"
                    >
                      <AccordionTrigger className="text-left text-sm sm:text-base font-medium py-4 sm:py-6 hover:no-underline group">
                        <span className="group-hover:text-muted-foreground transition-colors pr-4">
                          {item.question}
                        </span>
                      </AccordionTrigger>

                      <AccordionContent className="text-muted-foreground text-sm sm:text-base leading-relaxed pb-5 sm:pb-6 border-none!">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </CardWrapper>
                ))}
              </Accordion>
            )}
          </Accordion>
        </div>

        {!isLoading && items?.length === 0 && (
          <EmptyState
            imageSrc="empty-faq.png"
            messageText="No FAQs found"
            description="There are no questions in this category yet. Try another category or contact support."
            Icon={Inbox}
            buttonText="Contact Support"
            buttonHref={PATHS.CONTACT}
          />
        )}

        <SupportContactCard
          title="Still have questions?"
          description="Our support team is here to help. Reach out and we'll get back to you as soon as possible."
          buttonLabel="Email Support"
          href={PATHS.CONTACT}
        />
      </Container>
    </Layer>
  );
};

export default FAQPage;
