'use client';
import type { MouseEventHandler } from 'react';
import Link from '@/app/_components/localization/Link';
import { Text } from '@/app/_components/localization/Text';
import { Button } from '@/app/_components/ui/Button';
import type { PortfolioContent } from '@/data/portfolio/content';
import { cn } from '@/lib/utils';
import { LifeDemo } from './gameOfLife/LifeDemo';
import { JsonRendererDemo } from './jsonRenderer/JsonRendererDemo';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

type ProjectCardProps = {
  project: PortfolioContent['projects'][number];
  index: number;
  isExpanded: boolean;
  isHidden: boolean;
  onToggle: MouseEventHandler<HTMLButtonElement>;
};
export function ProjectCard({ project, index, isExpanded, isHidden, onToggle }: ProjectCardProps) {
  const collapsedLayout =
    project.id === 'json'
      ? 'col-start-1 row-start-1 [transform:rotate(var(--tilt))] max-[721px]:col-auto max-[721px]:row-auto max-[721px]:order-1'
      : 'col-start-2 row-start-2 -mt-5 [transform:rotate(calc(var(--tilt)*-0.65))] max-[721px]:col-auto max-[721px]:row-auto max-[721px]:mt-0 max-[721px]:order-2';

  return (
    <article
      data-project={project.id}
      className={cn(
        'project-object group/project relative min-w-0 rounded-[9px] border border-border shadow-[0_15px_28px_#0003] [&[hidden]]:hidden!',
        project.id === 'json'
          ? 'json-project bg-card text-foreground z-2'
          : 'life-project bg-primary text-primary-foreground',
        isExpanded
          ? 'expanded col-start-1 row-start-1 m-0 transform-none order-0'
          : collapsedLayout,
      )}
      hidden={isHidden}
    >
      <div className="object-header flex justify-between items-center gap-3 py-[13px] px-4 [border-bottom:1px_solid_color-mix(in_srgb,_currentColor_20%,_transparent)]">
        <h3 className="font-mono text-[12px] leading-[1.6] uppercase tracking-[0.3px]">
          <span className="project-number opacity-65">0{index + 1} / </span>
          {project.name}
        </h3>
        <Button
          variant="ghost"
          className={cn(
            'open-project inline-flex min-h-10 items-center gap-[7px] border-0 bg-transparent px-0 py-[7px] text-[13px] font-normal whitespace-nowrap has-[>svg]:px-0',
            project.id === 'json' ? 'text-primary' : 'text-inherit',
          )}
          aria-expanded={isExpanded}
          aria-controls={`${project.id}-detail`}
          onClick={onToggle}
        >
          {isExpanded && (
            <>
              <ArrowLeft size={15} />
              <Text>Back to canvas</Text>
            </>
          )}
          {!isExpanded && (
            <>
              <Text>Open</Text>
              <ArrowUpRight size={16} />
            </>
          )}
        </Button>
      </div>
      {project.id === 'json' && <JsonRendererDemo />}
      {project.id !== 'json' && <LifeDemo />}
      <div
        className={cn(
          'object-footer flex flex-wrap justify-between gap-3 border-t border-current/20 px-4 py-3 font-mono text-[12px] leading-[1.5]',
          project.id === 'json' && 'text-muted-foreground',
        )}
      >
        <span>
          <Text>{project.category}</Text>
        </span>
        <span>
          <Text>{project.id === 'json' ? 'useJsonLines' : 'Rewrite planned'}</Text>
        </span>
      </div>
      <div
        id={`${project.id}-detail`}
        className="project-detail [&[hidden]]:hidden! p-[26px] [border-top:1px_solid_color-mix(in_srgb,_currentColor_20%,_transparent)] [&_.detail-note]:text-[13px] [&_.detail-note]:opacity-70"
        hidden={!isExpanded}
      >
        <h2 className="text-[30px] leading-[1.2] tracking-[-1px] font-medium">{project.name}</h2>
        <p className="text-[16px] leading-[1.7] max-w-[650px] my-[14px] mx-0">
          <Text>{project.description}</Text>
        </p>
        {project.source && (
          <Link
            className="text-link inline-flex items-center gap-[10px] [border-bottom:1px_solid_currentColor] pb-[3px] mt-[6px] text-[15px]"
            href={project.source}
            preview={{ title: project.name, description: project.description }}
            target="_blank"
            rel="noreferrer"
          >
            <Text>Read the source</Text>
            <ArrowUpRight size={17} />
          </Link>
        )}
        {project.id === 'json' && (
          <p className="detail-note text-[16px] leading-[1.7] max-w-[650px] my-[14px] mx-0">
            <Text>The live demo uses the published React JSON Renderer component.</Text>
          </p>
        )}
      </div>
    </article>
  );
}
