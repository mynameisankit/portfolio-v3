'use client';
import { type FormEvent, useEffect, useRef, useState } from 'react';
import { sendContactMessage } from './sendMessage.utils';

export function useContactForm() {
  const pending = useRef(false);
  const resetTimer = useRef<number | undefined>(undefined);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  useEffect(
    () => () => {
      window.clearTimeout(resetTimer.current);
    },
    [],
  );

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
      resetTimer.current = window.setTimeout(() => {
        setStatus('idle');
        setFeedback('');
      }, 2400);
    } catch (error: unknown) {
      setStatus('error');
      const isRateLimited =
        typeof error === 'object' && error !== null && 'status' in error && error.status === 429;
      setFeedback(
        isRateLimited
          ? 'Please wait 30 seconds before sending another message.'
          : 'Your message could not be sent. Please try again.',
      );
    } finally {
      pending.current = false;
    }
  }

  return { submit, status, feedback };
}
