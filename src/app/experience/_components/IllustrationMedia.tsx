import { Fragment } from 'react';
import Image from 'next/image';
import { ConditionalRenderer } from '@/app/_components/ui/ConditionalRenderer';
import type { EngineeringWork } from '@/data/experience/engineeringContent';
import { AuthenticationIllustration } from './AuthenticationIllustration';
import { ComponentLibraryIllustration } from './ComponentLibraryIllustration';
import { HierarchyIllustration } from './HierarchyIllustration';
import { ImportsIllustration } from './ImportsIllustration';
import { LocalizationIllustration } from './LocalizationIllustration';
import { SchemaIllustration } from './SchemaIllustration';

const illustrationComponents = {
  hierarchy: HierarchyIllustration,
  components: ComponentLibraryIllustration,
  authentication: AuthenticationIllustration,
  imports: ImportsIllustration,
  localization: LocalizationIllustration,
  schema: SchemaIllustration,
  none: Fragment,
};

export function IllustrationMedia({ work }: { work: EngineeringWork }) {
  const Illustration = illustrationComponents[work.illustration];
  if (!work.illustrationUrl) {
    return <Illustration />;
  }

  return (
    <>
      <Image
        src={work.illustrationUrl}
        width={600}
        height={330}
        alt=""
        aria-hidden="true"
        unoptimized
        className="h-auto w-full motion-reduce:hidden"
      />
      <div className="hidden motion-reduce:block">
        <ConditionalRenderer shouldRender={!!work.staticIllustrationUrl}>
          <Image
            src={work.staticIllustrationUrl ?? ''}
            width={600}
            height={330}
            alt=""
            aria-hidden="true"
            unoptimized
            className="h-auto w-full"
          />
        </ConditionalRenderer>
        <ConditionalRenderer shouldRender={!work.staticIllustrationUrl}>
          <Illustration />
        </ConditionalRenderer>
      </div>
    </>
  );
}
