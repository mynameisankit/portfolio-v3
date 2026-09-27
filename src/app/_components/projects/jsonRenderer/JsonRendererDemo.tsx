'use client';
import '@mynameisankit/react-json-renderer/style.css';
import { useState } from 'react';
import { Text } from '@/app/_components/localization/Text';
import { rendererData, rendererTheme } from './rendererConfig';
import { useRendererWidth } from './useRendererWidth';
import JSONRenderer from '@mynameisankit/react-json-renderer';

export function JsonRendererDemo() {
  const { ref, width } = useRendererWidth();
  const [shouldShowLineNumbers, setShouldShowLineNumbers] = useState(false);
  const [shouldQuoteKeys, setShouldQuoteKeys] = useState(true);

  return (
    <div className="json-demo-wrap py-3 px-4 group-[.expanded]/project:p-4">
      <div className="json-demo-controls flex flex-wrap gap-[15px] mb-[15px] text-muted-foreground [font:12px/1.5_Arial,_sans-serif]">
        <label className="flex items-center gap-[5px] min-h-[30px]">
          <input
            className="[accent-color:var(--primary)]"
            type="checkbox"
            checked={shouldShowLineNumbers}
            onChange={(event) => setShouldShowLineNumbers(event.target.checked)}
          />
          <Text>Line numbers</Text>
        </label>
        <label className="flex items-center gap-[5px] min-h-[30px]">
          <input
            className="[accent-color:var(--primary)]"
            type="checkbox"
            checked={shouldQuoteKeys}
            onChange={(event) => setShouldQuoteKeys(event.target.checked)}
          />
          <Text>Quoted keys</Text>
        </label>
      </div>
      <div
        ref={ref}
        className="json-demo-renderer w-full min-w-0 min-h-[270px] font-mono text-[14px] leading-[1.8]"
        role="region"
        aria-label="React JSON Renderer interactive demo"
      >
        {width > 0 && (
          <JSONRenderer
            json={rendererData}
            width={width}
            height={270}
            rowHeight={27}
            shouldShowLineNumber={shouldShowLineNumbers}
            shouldRemoveQuotesFromKeys={!shouldQuoteKeys}
            theme={rendererTheme}
          />
        )}
      </div>
    </div>
  );
}
