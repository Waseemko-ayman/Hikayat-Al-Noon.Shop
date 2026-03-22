'use client';
import Container from '@/components/atoms/Container';
import Layer from '@/components/atoms/Layer';
import MainTitle from '@/components/atoms/MainTitle';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import InfoListSection from '@/components/molecules/InfoListSection';
import { Button } from '@/components/molecules/MovingBorders';
import { PrivacyPolicyContent } from '@/data';
import { Shield } from 'lucide-react';

const PrivacyPolicyPage = () => {
  return (
    <Layer otherClassName="bg-muted/30">
      <Container>
        <div className="mx-auto max-w-4xl space-y-8">
          {/* Header */}
          <MainTitle
            title="Privacy Policy"
            description="We respect your privacy and are committed to protecting your
              personal information."
            Icon={Shield}
          />

          {/* Intro */}
          <AnimatedWrapper>
            <Button>
              <p className="leading-relaxed p-5 max-md:items-center text-start">
                This Privacy Policy explains how we collect, use, and protect
                your information when you use our website and services.
              </p>
            </Button>
          </AnimatedWrapper>

          {/* Sections */}
          {PrivacyPolicyContent.map((card) => (
            <InfoListSection
              key={card.id}
              Icon={card.Icon}
              title={card.title}
              description={card.description}
              items={card.items}
              link={card.link}
            />
          ))}
        </div>
      </Container>
    </Layer>
  );
};

export default PrivacyPolicyPage;
