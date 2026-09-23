import type { PortfolioContent } from '@/features/portfolio/content';
export function Experience({ content }: { content: PortfolioContent }) {
  return (
    <section id="experience" className="experience" aria-labelledby="experience-title">
      <div className="experience-heading">
        <span className="eyebrow">Experience</span>
        <h2 id="experience-title">{content.company}</h2>
        <p className="experience-role">{content.role}</p>
        <p className="experience-summary">
          Frontend ownership across Cloud Workloads and the shared platform.
        </p>
      </div>
      <div className="experience-work">
        {content.experience.map((area, index) => (
          <article className="experience-item" key={area.title}>
            <span className="experience-number">0{index + 1}</span>
            <div>
              <h3>{area.title}</h3>
              {area.description && <p>{area.description}</p>}
              {!!area.bullets.length && (
                <ul>
                  {area.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
