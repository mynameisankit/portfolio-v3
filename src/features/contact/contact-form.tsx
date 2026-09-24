'use client';
import { Button } from '@/components/ui/button';
import { Text, useCopy } from '@/features/localization/text';

import { useContactForm } from './use-contact-form';

export function ContactForm() {
  const { submit, status, feedback } = useContactForm();
  const copy = useCopy();
  return (
    <form className="contact-form" onSubmit={submit} aria-busy={status === 'sending'}>
      <div className="contact-fields">
        <label htmlFor="contact-name">
          <Text>{'Your name'}</Text>
        </label>
        <input
          id="contact-name"
          name="name"
          autoComplete="name"
          required
          maxLength={100}
          disabled={status === 'sending'}
        />
        <label htmlFor="contact-email">
          <Text>{'Email (optional, for a reply)'}</Text>
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          maxLength={254}
          disabled={status === 'sending'}
        />
        <label htmlFor="contact-message">
          <Text>{'Message'}</Text>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          maxLength={5000}
          rows={5}
          disabled={status === 'sending'}
        />
      </div>
      <p className="contact-privacy">
        <Text>{'Your message is sent through EmailJS to my inbox.'}</Text>
      </p>
      <Button type="submit" size="lg" disabled={status === 'sending'}>
        {copy(status === 'sending' ? 'Sending…' : 'Send message')} <span aria-hidden="true">↗</span>
      </Button>
      <p className="contact-feedback" role="status" aria-live="polite" data-status={status}>
        {copy(feedback)}
      </p>
    </form>
  );
}
