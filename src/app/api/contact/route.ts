// /app/api/contact.route.ts
import nodemailer from 'nodemailer';
import * as yup from 'yup'; 
import { Form } from '@/components/ContactForm';
import * as dotenv from 'dotenv';
dotenv.config()

const bodySchema = yup.object().shape({
  from: yup.string().email().required(),
  subject: yup.string().required(),
  message: yup.string().required(),
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.AUTH_USER,
    pass: process.env.AUTH_PASS,
  },
});

export async function sendEmail({ from, subject, message }: Form) {
  const mailData = {
    from: from,
    to: process.env.AUTH_USER,
    subject: `[BLOG] ${subject}`,
    //	html 옵션 또는 text 옵션 둘중 하나만 사용해야함
    text: `${message} from ${from}`,

    //	attachments 옵션으로 첨부파일도 전송 가능함
    //	attachments : [첨부파일]
  };
  
  return transporter.sendMail(mailData);
}

export async function POST(req: Request) {
  const body = await req.json();
  if(!bodySchema.isValidSync(body)){
    return new Response(JSON.stringify({ message: '메일 전송에 실패함!'}), { status: 400 });
  }
  return sendEmail(body)
    .then(
      () => 
        new Response(JSON.stringify({ message: '메일을 성공적으로 보냈음'}), {
        status: 200
      })
    ).catch(error => {
      console.error(error);
      return new Response(JSON.stringify({ message: '메일 전송에 실패함!'}), {
        status: 500
      });
    })
}