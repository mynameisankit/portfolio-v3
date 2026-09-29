'use client';
import { useState } from 'react';
import { Text } from '@/app/_components/localization/Text';
import { HobbyPhoto } from '@/app/_components/projects/HobbyPhoto';
import { Button } from '@/app/_components/ui/Button';
import type { PortfolioContent } from '@/data/portfolio/content';
import { cn } from '@/lib/utils';
import { ProjectCard } from './ProjectCard';
import { StandardProjectCard } from './StandardProjectCard';
import { useProjectExpansion } from './useProjectExpansion';

export function ProjectCanvas({ content }: { content: PortfolioContent }) {
  const { boardRef, lastTrigger, open, changeView } = useProjectExpansion();
  const [isAligned, setAligned] = useState(false);

  return (
    <section
      id="projects"
      className="project-section pt-6 px-0 pb-0"
      aria-labelledby="project-heading"
      onKeyDown={(event) => {
        if (event.key === 'Escape' && open) {
          event.preventDefault();
          void changeView(null).then(() => lastTrigger.current?.focus());
        }
      }}
    >
      <div className="section-heading flex justify-between items-center gap-5 my-0 mx-[5%] py-[25px] px-0 [border-top:1px_solid_var(--border)]">
        <h2
          className="text-[27px] tracking-[-0.7px] font-medium min-[2560px]:text-[30px]"
          id="project-heading"
        >
          <Text>Selected work</Text>
        </h2>
        <span className="eyebrow font-mono text-[12px] leading-[1.6] tracking-[1.2px] uppercase text-muted-foreground min-[2560px]:text-[14px]">
          <Text>Explore the projects</Text>
        </span>
      </div>
      <div
        ref={boardRef}
        className={cn(
          'project-board relative grid items-start gap-x-12 gap-y-8 px-[7%] pt-[26px] pb-5 [background-image:radial-gradient(var(--border)_1px,transparent_1px)] bg-size-[24px_24px] max-[721px]:grid-cols-1 max-[721px]:gap-7 max-[721px]:py-5',
          open ? 'focused grid-cols-1' : 'grid-cols-[1.2fr_1fr]',
          isAligned ? 'aligned [--tilt:0deg]' : '[--tilt:-2deg]',
        )}
      >
        {content.projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            isExpanded={open === project.id}
            isHidden={!!open && open !== project.id}
            onToggle={(event) => {
              lastTrigger.current = event.currentTarget;
              void changeView(open === project.id ? null : project.id);
            }}
          />
        ))}
        <HobbyPhoto hobbies={content.hobbies} isHidden={!!open} />
        <aside
          className="hobby-note [&[hidden]]:hidden! col-start-1 row-start-2 max-w-90 py-[25px] px-[18px] [&_>_span]:font-mono [&_>_span]:text-[12px] [&_>_span]:text-muted-foreground max-[721px]:col-auto max-[721px]:row-auto max-[721px]:mt-0 max-[721px]:order-4 max-[721px]:py-2 max-[721px]:px-0"
          hidden={!!open}
        >
          <h3 className="eyebrow font-mono text-[12px] leading-[1.6] tracking-[1.2px] uppercase text-muted-foreground">
            <Text>Outside work</Text>
          </h3>
          <p className="text-[34px] leading-[1.35] tracking-[-0.5px] my-4 mx-0 min-[2560px]:text-[36px]">
            <Text>Video games. Running.</Text>
            <br />
            <Text>Hiking. Motorcycling.</Text>
          </p>
          <span>
            <Text>Click the photo to browse.</Text>
          </span>
        </aside>
      </div>
      {!!content.additionalProjects.length && (
        <div className="additional-projects border-t border-border px-[7%] py-10">
          <div className="mb-6 flex items-center justify-between gap-5">
            <h3 className="text-[25px] tracking-[-0.7px] font-medium">
              <Text>More work</Text>
            </h3>
            <span className="font-mono text-[12px] uppercase tracking-[1.2px] text-muted-foreground">
              <Text>From the archive</Text>
            </span>
          </div>
          <div className="grid grid-cols-2 gap-6 max-[721px]:grid-cols-1">
            {content.additionalProjects.map((project) => (
              <StandardProjectCard key={project.source} project={project} />
            ))}
          </div>
        </div>
      )}
      <div className="canvas-footer flex justify-between items-center gap-5 py-6 px-[5%] [&_.button]:text-[13px]">
        <span className="eyebrow font-mono text-[12px] leading-[1.6] tracking-[1.2px] uppercase text-muted-foreground">
          <Text>Selected work + outside work</Text>
        </span>
        <Button
          variant="canvas"
          size="canvas"
          className="button text-[13px]"
          onClick={() => setAligned(!isAligned)}
          aria-pressed={isAligned}
        >
          <Text>{isAligned ? 'Scatter the canvas' : 'Align the canvas'}</Text>
        </Button>
      </div>
    </section>
  );
}
