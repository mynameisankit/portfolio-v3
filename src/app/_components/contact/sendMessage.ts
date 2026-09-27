import { emailConfig } from '@/config/emailConfig';
import emailjs from '@emailjs/browser';

export type ContactMessage = { name: string; message: string; email: string };

export async function sendContactMessage({ name, message, email }: ContactMessage) {
  return emailjs.send(
    emailConfig.serviceId,
    emailConfig.templateId,
    {
      name,
      from_name: name,
      firstName: name,
      lastName: '',
      subject: 'Message from ankitkumar.fyi',
      message,
      eMail: email,
      email,
      reply_to: email,
    },
    {
      publicKey: emailConfig.publicKey,
      limitRate: { id: 'portfolio-contact', throttle: 30000 },
    },
  );
}
