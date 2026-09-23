import type { PortfolioContent } from '@/features/portfolio/content';
export function Contact({ content }: { content: PortfolioContent }) {
  return (
    <section className="contact" aria-labelledby="contact-title">
      <h2 id="contact-title">Get in touch.</h2>
      <a href={content.github} target="_blank" rel="noreferrer">
        Find me on GitHub ↗
      </a>
    </section>
  );
}
