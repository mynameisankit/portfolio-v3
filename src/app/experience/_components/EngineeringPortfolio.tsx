import { Text } from '@/app/_components/localization/Text';
import { ConditionalRenderer } from '@/app/_components/ui/ConditionalRenderer';
import type { CareerEntry } from '@/data/experience/model';
import type { ExperiencePageContent } from '@/data/experience/pageSchema';
import { cn } from '@/lib/className.utils';
import { CareerOverview } from './CareerOverview';
import { EngineeringCompanySection } from './EngineeringCompanySection';

export function EngineeringPortfolio({
  content,
  career,
}: {
  content: ExperiencePageContent;
  career: readonly CareerEntry[];
}) {
  const sectionIds = [
    { id: 'engineering-rubrik', hasWork: content.works.length > 0 },
    { id: 'engineering-tekion', hasWork: content.tekionWorks.length > 0 },
  ]
    .filter((section) => section.hasWork)
    .map((section) => section.id);

  return (
    <div className="mx-[5%] pb-12">
      <div
        className={cn(
          'grid items-start gap-10 pt-14 sm:pt-20 min-[2560px]:gap-14',
          career.length > 0 &&
            'min-[1280px]:grid-cols-[200px_minmax(0,1fr)] min-[1800px]:grid-cols-[220px_minmax(0,1fr)] min-[2560px]:grid-cols-[240px_minmax(0,1fr)]',
        )}
      >
        <CareerOverview career={career} heading={content.careerHeading} sectionIds={sectionIds} />
        <div className="min-w-0">
          <EngineeringCompanySection
            heading={content.selectedWorkHeading}
            id="engineering-rubrik"
            works={content.works}
          />
          <EngineeringCompanySection
            heading={content.tekionHeading}
            id="engineering-tekion"
            works={content.tekionWorks}
          />
        </div>
      </div>
      <ConditionalRenderer shouldRender={!!content.designParagraphs.length}>
        <section aria-labelledby="design-decisions-title" className="border-t border-border py-12">
          <p className="font-mono text-xs uppercase tracking-wider text-primary">
            <Text>{content.designHeading}</Text>
          </p>
          <div className="mt-4 grid gap-7 lg:grid-cols-[1fr_1.5fr]">
            <h2
              id="design-decisions-title"
              className="text-3xl font-medium leading-tight tracking-tight"
            >
              <Text>{content.designTitle[0]}</Text>
              <br />
              <Text>{content.designTitle[1]}</Text>
            </h2>
            <div className="space-y-4 text-[15px] leading-relaxed text-muted-foreground min-[2560px]:text-lg">
              {content.designParagraphs.map((paragraph) => (
                <p key={paragraph}>
                  <Text>{paragraph}</Text>
                </p>
              ))}
            </div>
          </div>
        </section>
      </ConditionalRenderer>
      <ConditionalRenderer shouldRender={!!content.alongsideParagraphs.length}>
        <section aria-labelledby="alongside-work-title" className="border-t border-border pt-12">
          <h2 id="alongside-work-title" className="text-2xl font-medium tracking-tight">
            <Text>{content.alongsideHeading}</Text>
          </h2>
          {content.alongsideParagraphs.map((paragraph) => (
            <p key={paragraph} className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
              <Text>{paragraph}</Text>
            </p>
          ))}
        </section>
      </ConditionalRenderer>
    </div>
  );
}
