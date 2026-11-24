'use client';
import { type FormEvent, useEffect, useRef, useState } from 'react';
import { sendContactMessage } from './sendMessage.utils';

const FEEDBACK_TIMEOUT_MS = 2400;
const TOO_MANY_REQUESTS_STATUS = 429;

export enum ContactFormStatus {
  Idle = 'idle',
  Sending = 'sending',
  Success = 'success',
  Error = 'error',
}

export function useContactForm() {
  const pending = useRef(false);
  const resetTimer = useRef<number | undefined>(undefined);
  const [status, setStatus] = useState<ContactFormStatus>(ContactFormStatus.Idle);
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
      setStatus(ContactFormStatus.Error);
      setFeedback('Please enter your name and message.');
      form
        .querySelector<HTMLInputElement | HTMLTextAreaElement>(
          !name ? '[name="name"]' : '[name="message"]',
        )
        ?.focus();

      return;
    }
    pending.current = true;
    setStatus(ContactFormStatus.Sending);
    setFeedback('Sending your message…');
    try {
      await sendContactMessage({ name, message, email });
      setStatus(ContactFormStatus.Success);
      setFeedback('Message sent. Thanks for getting in touch!');
      form.reset();
      resetTimer.current = window.setTimeout(() => {
        setStatus(ContactFormStatus.Idle);
        setFeedback('');
      }, FEEDBACK_TIMEOUT_MS);
    } catch (error: unknown) {
      setStatus(ContactFormStatus.Error);
      const isRateLimited =
        typeof error === 'object' &&
        error !== null &&
        'status' in error &&
        error.status === TOO_MANY_REQUESTS_STATUS;
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
