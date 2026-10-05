'use client';

import { type SVGProps, useLayoutEffect, useRef } from 'react';
import { useCopy } from '@/app/_components/localization/useCopy';
import {
  ILLUSTRATION_HORIZONTAL_INSET,
  ILLUSTRATION_VIEWBOX_WIDTH,
} from '@/config/experienceConfig';
import { fitSvgText } from './fitSvgText.utils';

type IllustrationTextProps = Omit<SVGProps<SVGTextElement>, 'children'> & {
  children: string;
  maxWidth?: number;
};

export function IllustrationText({ children, maxWidth, ...props }: IllustrationTextProps) {
  const copy = useCopy();
  const text = copy(children);
  const textRef = useRef<SVGTextElement>(null);
  const availableWidth =
    maxWidth ?? ILLUSTRATION_VIEWBOX_WIDTH - ILLUSTRATION_HORIZONTAL_INSET - Number(props.x ?? 0);

  useLayoutEffect(() => {
    const state = { isMounted: true };
    const fitText = () => {
      if (state.isMounted && textRef.current) {
        fitSvgText(textRef.current, availableWidth);
      }
    };

    fitText();
    void document.fonts.ready.then(fitText);

    return () => {
      state.isMounted = false;
    };
  }, [availableWidth, text]);

  return (
    <text {...props} ref={textRef} lengthAdjust="spacingAndGlyphs">
      {text}
    </text>
  );
}
