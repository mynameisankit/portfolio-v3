'use client';
import { type FormEvent, useRef, useState } from 'react';

import { sendContactMessage } from './send-message';

export function useContactForm() {
  const pending = useRef(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current) {
      return;
    }
    const form = event.currentTarget;
    const values = new FormData(form);
    const name = String(values.get('name') ?? '').trim();
    const message = String(values.get('message') ?? '').trim();
    const email = String(values.get('email') ?? '').trim();
    if (!name || !message) {
      setStatus('error');
      setFeedback('Please enter your name and message.');
      form
        .querySelector<HTMLInputElement | HTMLTextAreaElement>(
          !name ? '[name="name"]' : '[name="message"]',
        )
        ?.focus();
      return;
    }
    pending.current = true;
    setStatus('sending');
    setFeedback('Sending your message…');
    try {
      await sendContactMessage({ name, message, email });
      setStatus('success');
      setFeedback('Message sent. Thanks for getting in touch!');
      form.reset();
    } catch (error: unknown) {
      setStatus('error');
      const rateLimited =
        typeof error === 'object' && error !== null && 'status' in error && error.status === 429;
      setFeedback(
        rateLimited
          ? 'Please wait 30 seconds before sending another message.'
          : 'Your message could not be sent. Please try again.',
      );
    } finally {
      pending.current = false;
    }
  }
  return { submit, status, feedback };
}
