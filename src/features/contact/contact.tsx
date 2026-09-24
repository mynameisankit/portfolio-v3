import './contact.css';

import Link from '@/features/localization/link';
import { Text } from '@/features/localization/text';
import type { PortfolioContent } from '@/features/portfolio/content';

import { ContactForm } from './contact-form';

export function Contact({ content }: { content: PortfolioContent }) {
  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="contact-heading">
        <p className="eyebrow">
          <Text>{'Contact'}</Text>
        </p>
        <h2 id="contact-title">
          <Text>{'Get in touch.'}</Text>
        </h2>
        <p>
          <Text>{'Have a role, a project, or something to discuss? Send me a message.'}</Text>
        </p>
        <Link href={content.github} target="_blank" rel="noreferrer">
          <Text>{'Find me on GitHub ↗'}</Text>
        </Link>
      </div>
      <ContactForm />
    </section>
  );
}
