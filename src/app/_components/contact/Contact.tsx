import Link from '@/app/_components/localization/Link';
import { Text } from '@/app/_components/localization/Text';
import type { PortfolioContent } from '@/data/portfolio/content';
import { ContactForm } from './ContactForm';

export function Contact({ content }: { content: PortfolioContent }) {
  return (
    <section
      id="contact"
      className="contact my-0 mx-[5%] py-12 px-0 grid justify-between gap-12 items-start [border-top:1px_solid_var(--border)] max-[721px]:items-start max-[721px]:flex-col grid-cols-[minmax(0,_1fr)_minmax(0,_1.4fr)] max-[761px]:grid-cols-1 max-[761px]:gap-5"
      aria-labelledby="contact-title"
    >
      <div className="contact-heading [&_>_p:not(.eyebrow)]:max-w-[350px] [&_>_p:not(.eyebrow)]:text-muted-foreground [&_>_p:not(.eyebrow)]:mb-6">
        <p className="eyebrow font-mono text-[12px] leading-[1.6] tracking-[1.2px] uppercase text-muted-foreground">
          <Text>Contact</Text>
        </p>
        <h2 className="text-[38px] tracking-[-1.7px] font-medium my-4 mx-0" id="contact-title">
          <Text>Get in touch.</Text>
        </h2>
        <p>
          <Text>Have a role, a project, or something to discuss? Send me a message.</Text>
        </p>
        <Link
          className="text-[15px] [border-bottom:1px_solid_var(--primary)] pb-[5px]"
          href={content.github}
          target="_blank"
          rel="noreferrer"
        >
          <Text>Find me on GitHub ↗</Text>
        </Link>
      </div>
      <ContactForm />
    </section>
  );
}
