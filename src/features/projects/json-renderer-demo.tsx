'use client';
import { useEffect, useRef, useState } from 'react';
export function JsonRendererDemo() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(250);
  useEffect(() => {
    const receive = (event: MessageEvent) => {
      if (
        event.origin !== window.location.origin ||
        event.source !== iframeRef.current?.contentWindow
      ) {
        return;
      }
      if (event.data?.type === 'json-demo-height' && Number.isFinite(event.data.height)) {
        setHeight(Math.max(210, Math.min(720, event.data.height)));
      }
    };
    window.addEventListener('message', receive);
    return () => window.removeEventListener('message', receive);
  }, []);
  return (
    <div className="json-demo-wrap">
      <iframe
        ref={iframeRef}
        src="/demos/json-renderer/index.html"
        title="React JSON Renderer interactive demo"
        style={{ height }}
      />
    </div>
  );
}
