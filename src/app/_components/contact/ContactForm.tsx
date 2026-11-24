'use client';
import { Text } from '@/app/_components/localization/Text';
import { useCopy } from '@/app/_components/localization/useCopy';
import { Button } from '@/app/_components/ui/Button';
import { useContactForm } from './useContactForm';

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5000;
const MESSAGE_ROWS = 5;

export function ContactForm() {
  const { submit, status, feedback } = useContactForm();
  const copy = useCopy();
  const submitLabel = copy(
    { idle: 'Send message', sending: 'Sending…', success: 'Message sent ✓', error: 'Send message' }[
      status
    ],
  );

  return (
    <form className="contact-form" onSubmit={submit} aria-busy={status === 'sending'}>
      <div className="contact-fields grid gap-2">
        <label className="text-[14px] mt-3" htmlFor="contact-name">
          <Text>Your name</Text>
        </label>
        <input
          className="w-full min-w-0 bg-card border border-input text-foreground rounded-md p-3 [font:inherit] focus-visible:[outline:2px_solid_var(--primary)] focus-visible:[outline-offset:3px]"
          id="contact-name"
          name="name"
          autoComplete="name"
          required
          maxLength={MAX_NAME_LENGTH}
          disabled={status === 'sending'}
        />
        <label className="text-[14px] mt-3" htmlFor="contact-email">
          <Text>Email (optional, for a reply)</Text>
        </label>
        <input
          className="w-full min-w-0 bg-card border border-input text-foreground rounded-md p-3 [font:inherit] focus-visible:[outline:2px_solid_var(--primary)] focus-visible:[outline-offset:3px]"
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          maxLength={MAX_EMAIL_LENGTH}
          disabled={status === 'sending'}
        />
        <label className="text-[14px] mt-3" htmlFor="contact-message">
          <Text>Message</Text>
        </label>
        <textarea
          className="w-full min-w-0 bg-card border border-input text-foreground rounded-md p-3 [font:inherit] resize-y min-h-35 focus-visible:[outline:2px_solid_var(--primary)] focus-visible:[outline-offset:3px]"
          id="contact-message"
          name="message"
          required
          maxLength={MAX_MESSAGE_LENGTH}
          rows={MESSAGE_ROWS}
          disabled={status === 'sending'}
        />
      </div>
      <p className="contact-privacy text-[12px] text-muted-foreground my-4 mx-0">
        <Text>Your message is sent through EmailJS to my inbox.</Text>
      </p>
      <Button type="submit" size="lg" disabled={status === 'sending'}>
        {submitLabel} {status !== 'success' && <span aria-hidden="true">↗</span>}
      </Button>
      <p
        className="contact-feedback min-h-[26px] mt-[14px] text-[14px] [&[data-status='success']]:text-primary [&[data-status='error']]:text-foreground [&[data-status='error']]:[border-left:3px_solid_var(--primary)] [&[data-status='error']]:pl-[10px]"
        role="status"
        aria-live="polite"
        data-status={status}
      >
        {copy(feedback)}
      </p>
    </form>
  );
}
