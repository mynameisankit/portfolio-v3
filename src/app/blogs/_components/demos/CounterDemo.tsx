'use client';

import { useState } from 'react';

export function CounterDemo() {
  const [count, setCount] = useState(0);

  return (
    <section
      aria-label="Interactive counter demo"
      className="my-7 rounded-md border border-border bg-card p-6"
    >
      <p role="status" aria-live="polite">
        Count: {count}
      </p>
      <div className="mt-4 flex gap-3">
        <button
          type="button"
          className="rounded-md border border-border px-4 py-2"
          onClick={() => setCount(count + 1)}
        >
          Increment
        </button>
        <button
          type="button"
          className="rounded-md border border-border px-4 py-2"
          onClick={() => setCount(0)}
        >
          Reset
        </button>
      </div>
    </section>
  );
}
