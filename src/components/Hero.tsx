import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Hero() {
  return (
    <section className='text-center'>
      <Image
        src="/images/profile.jpg"
        width={200}
        height={200}
        className='rounded-full mx-auto'
        alt="Picture of the author"
        priority
      />
      <h2 className='text-3xl font-bold mt-2'>{"Hi, I'm Bis"}</h2>
      <h3 className='text-xl font-semibold'>Full-stack Eingineer</h3>
      <p>꿈을 코딩하는 사람, 드림코더 비스</p>
      <button className='bg-yellow-500 font-bold rounded-xl px-4 py-1 mt-2'>
        <Link href='/contact'>
          Contact Me
        </Link>
      </button>
    </section>
  );
}

