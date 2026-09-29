import Image from 'next/image';
import Link from '@/app/_components/localization/Link';
import { Text } from '@/app/_components/localization/Text';
import type { PortfolioContent } from '@/data/portfolio/content';
import { ArrowUpRight } from 'lucide-react';

export function StandardProjectCard({
  project,
}: {
  project: PortfolioContent['additionalProjects'][number];
}) {
  return (
    <article className="overflow-hidden rounded-xl border border-border bg-card shadow-[0_15px_28px_#0003]">
      <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
        <Image
          className="object-cover"
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 721px) 86vw, 360px"
        />
      </div>
      <div className="p-6">
        <h3 className="text-[25px] leading-[1.2] tracking-[-0.7px] font-medium">{project.title}</h3>
        <p className="mt-3 text-[16px] leading-[1.7] text-muted-foreground">
          <Text>{project.description}</Text>
        </p>
        <Link
          className="mt-5 inline-flex items-center gap-2 border-b border-current pb-1 text-[15px] text-primary"
          href={project.source}
          preview={{ title: project.title, description: project.description, image: project.image }}
          target="_blank"
          rel="noreferrer"
        >
          <Text>Read the source</Text>
          <ArrowUpRight size={17} />
        </Link>
      </div>
    </article>
  );
}
