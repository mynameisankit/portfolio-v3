'use client';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import type { MouseEventHandler } from 'react';

import { Button } from '@/components/ui/button';
import Link from '@/features/localization/link';
import { Text } from '@/features/localization/text';
import type { PortfolioContent } from '@/features/portfolio/content';

import { JsonRendererDemo } from './json-renderer-demo';
import { LifeDemo } from './life-demo';
type ProjectCardProps = {
  project: PortfolioContent['projects'][number];
  index: number;
  expanded: boolean;
  hidden: boolean;
  onToggle: MouseEventHandler<HTMLButtonElement>;
};
export function ProjectCard({ project, index, expanded, hidden, onToggle }: ProjectCardProps) {
  return (
    <article
      data-project={project.id}
      className={`project-object ${project.id}-project${expanded ? ' expanded' : ''}`}
      hidden={hidden}
    >
      <div className="object-header">
        <h3>
          <span className="project-number">0{index + 1} / </span>
          {project.name}
        </h3>
        <Button
          variant="ghost"
          className="open-project"
          aria-expanded={expanded}
          aria-controls={`${project.id}-detail`}
          onClick={onToggle}
        >
          {expanded ? (
            <>
              <ArrowLeft size={15} />
              <Text>{'Back to canvas'}</Text>
            </>
          ) : (
            <>
              <Text>{'Open'}</Text>
              <ArrowUpRight size={16} />
            </>
          )}
        </Button>
      </div>
      {project.id === 'json' ? <JsonRendererDemo /> : <LifeDemo />}
      <div className="object-footer">
        <span>{<Text>{project.category}</Text>}</span>
        <span>{<Text>{project.id === 'json' ? 'useJsonLines' : 'Rewrite planned'}</Text>}</span>
      </div>
      <div id={`${project.id}-detail`} className="project-detail" hidden={!expanded}>
        <h2>{project.name}</h2>
        <p>{<Text>{project.description}</Text>}</p>
        {project.source && (
          <Link
            className="text-link"
            href={project.source}
            preview={{ title: project.name, description: project.description }}
            target="_blank"
            rel="noreferrer"
          >
            <Text>{'Read the source'}</Text>
            <ArrowUpRight size={17} />
          </Link>
        )}
        {project.id === 'json' && (
          <p className="detail-note">
            <Text>
              {'The live demo uses the original useJsonLines hook with a custom presentation.'}
            </Text>
          </p>
        )}
      </div>
    </article>
  );
}
