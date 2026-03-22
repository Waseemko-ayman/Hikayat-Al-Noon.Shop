'use client';
import BlogCard from '@/components/atoms/BlogCard';
import Container from '@/components/atoms/Container';
import Layer from '@/components/atoms/Layer';
import AnimatedWrapper from '@/components/molecules/FramerMotion/AnimatedWrapper';
import { NEVER_READ } from '@/data';
import React from 'react';

interface NeverReadProps {
  id: number;
  src: string;
  imgTitle: string;
  title: string;
  description: string;
  beforeContent: string;
}

const NeverRead = () => {
  return (
    <Layer otherClassName="pt-[100px]">
      <Container>
        {NEVER_READ.map(
          ({
            id,
            src,
            imgTitle,
            title,
            description,
            beforeContent,
          }: NeverReadProps) => (
            <AnimatedWrapper key={id}>
              <BlogCard
                imgSrc={src}
                imgTitle={imgTitle}
                title={title}
                description={description}
                beforeContent={beforeContent}
                otherClassNameBox={id !== NEVER_READ.length ? 'mb-[100px]' : ''}
              />
            </AnimatedWrapper>
          ),
        )}
      </Container>
    </Layer>
  );
};

export default NeverRead;
