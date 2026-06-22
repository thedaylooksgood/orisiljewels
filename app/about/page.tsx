import React from 'react';
import { Metadata } from 'next';
import { AboutHero } from '@/components/about/AboutHero';
import { OurStory } from '@/components/about/OurStory';
import { EssenceOfOrisil } from '@/components/about/EssenceOfOrisil';
import { StoryTimeline } from '@/components/about/StoryTimeline';
import { Craftsmanship } from '@/components/about/Craftsmanship';
import { AboutExtraSections } from '@/components/about/AboutExtraSections';

export const metadata: Metadata = {
  title: 'About Us | Orisil Jewels',
  description: 'Learn about Orisil Jewels, 40 years of trust crafted into every piece.',
};

export default function AboutPage() {
  return (
    <div className="w-full bg-white">
      <AboutHero />
      <OurStory />
      <EssenceOfOrisil />
      <StoryTimeline />
      <Craftsmanship />
      <AboutExtraSections />
    </div>
  );
}
