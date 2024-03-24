'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import Banner, { BannerData } from './Banner';

export type Form = {
  from: string;
  subject: string;
  message: string;
} | HTMLFormElement

const DEFAULT_DATA = { 
  from: '', 
  subject: '', 
  message: '' 
}

export async function sendContactEmail(form: Form) {
  // Nextjs app 폴더 내 api로 post 요청
  const response = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(form),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || '서버 요청에 실패함');
  }
  
  return data;
}

export default function ContactForm() {
  const [form, setForm] = useState<Form>(DEFAULT_DATA);
  const [banner, setBanner] = useState<BannerData | null>(null);
  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendContactEmail(form)
      .then(() => {
        setBanner({
          message: '메일을 성공적으로 보냈습니다',
          state: 'success',
        });
        setForm(DEFAULT_DATA);
      })
      .catch(() => {
        setBanner({
          message: '메일 전송에 실패했습니다. 다시 시도해 주세요.',
          state: 'error'
        });
      })
      .finally(() => {
        setTimeout(() => {
          setBanner(null);
        }, 3000)
      })
  }
  return <section className='w-full max-w-md'>
  { banner && <Banner banner={banner} />}
    <form 
      onSubmit={onSubmit} 
      className='w-full flex flex-col gap-2 my-4 p-4 bg-slate-700 rounded-xl text-white'
    >
      <label 
        htmlFor='from'
        className='font-semibold'
      >
        Your Email
      </label>
      <input 
        type='email' 
        id='from' 
        name='from' 
        required 
        autoFocus 
        value={form.from} 
        onChange={onChange}  
        className='text-black p-2'
      />
      <label 
        htmlFor='subject'
        className='font-semibold'
      >
        Subject
      </label>
      <input 
        type='text' 
        id='subject' 
        name='subject' 
        required
        value={form.subject} 
        onChange={onChange}
        className='text-black p-2'
      />
      <label 
        htmlFor='message'
        className='font-semibold'
      >
        Message
      </label>
      <textarea 
        rows={10}
        id='message' 
        name='message' 
        required
        value={form.message} 
        onChange={onChange}
        className='text-black p-2'
      />
      <button
        className='text-black bg-yellow-300 font-bold hover:bg-yellow-400'
      >Submit</button>
    </form>
  </section>;
}

