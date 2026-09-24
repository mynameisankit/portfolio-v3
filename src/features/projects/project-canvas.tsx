'use client';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { HobbyPhoto } from '@/features/hobbies/hobby-photo';
import { Text } from '@/features/localization/text';
import type { PortfolioContent } from '@/features/portfolio/content';

import { ProjectCard } from './project-card';
import { useProjectExpansion } from './use-project-expansion';
export function ProjectCanvas({ content }: { content: PortfolioContent }) {
  const { boardRef, lastTrigger, open, changeView } = useProjectExpansion();
  const [aligned, setAligned] = useState(false);

  return (
    <section
      id="projects"
      className="project-section"
      aria-labelledby="project-heading"
      onKeyDown={(event) => {
        if (event.key === 'Escape' && open) {
          event.preventDefault();
          void changeView(null).then(() => lastTrigger.current?.focus());
        }
      }}
    >
      <div className="section-heading">
        <h2 id="project-heading">
          <Text>{'Selected work'}</Text>
        </h2>
        <span className="eyebrow">
          <Text>{'Explore the projects'}</Text>
        </span>
      </div>
      <div
        ref={boardRef}
        className={`project-board${open ? ' focused' : ''}${aligned ? ' aligned' : ''}`}
      >
        {content.projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            expanded={open === project.id}
            hidden={!!open && open !== project.id}
            onToggle={(event) => {
              lastTrigger.current = event.currentTarget;
              void changeView(open === project.id ? null : project.id);
            }}
          />
        ))}
        <HobbyPhoto hobbies={content.hobbies} hidden={!!open} />
        <aside className="hobby-note" hidden={!!open}>
          <h3 className="eyebrow">
            <Text>{'Outside work'}</Text>
          </h3>
          <p>
            <Text>{'Video games. Running.'}</Text>
            <br />
            <Text>{'Hiking. Motorcycling.'}</Text>
          </p>
          <span>
            <Text>{'Click the photo to browse.'}</Text>
          </span>
        </aside>
      </div>
      <div className="canvas-footer">
        <span className="eyebrow">
          <Text>{'Selected work + outside work'}</Text>
        </span>
        <Button
          variant="ghost"
          className="button"
          onClick={() => setAligned(!aligned)}
          aria-pressed={aligned}
        >
          {<Text>{aligned ? 'Scatter the canvas' : 'Align the canvas'}</Text>}
        </Button>
      </div>
    </section>
  );
}
