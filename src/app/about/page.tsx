import AboutMe from '@/components/AboutMe';
import Hero from '@/components/Hero';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "About me",
  description: "비스 커리어 소개",
};

export default function AboutPage() {
  return (
    <>
      <Hero />
      <AboutMe />
    </>
  );
}

