import { useState } from 'react';

import { JsonLine } from './json-line';
import useJsonLines from './upstream/organisms/jsonRenderer/hooks/useJsonLines/useJsonLines';
import { useFrameHeight } from './use-frame-height';
const data = {
  name: 'Ankit Kumar',
  work: { company: 'Rubrik', focus: 'Frontend' },
  projects: ['React JSON Renderer', "Conway's Game of Life"],
};
export function JsonDemo() {
  const { lines, handleToggleLineCollapse } = useJsonLines(data);
  const [numbers, setNumbers] = useState(false);
  const [quotes, setQuotes] = useState(true);
  const ref = useFrameHeight();

  return (
    <div ref={ref}>
      <div className="controls">
        <label>
          <input type="checkbox" checked={numbers} onChange={(e) => setNumbers(e.target.checked)} />
          Line numbers
        </label>
        <label>
          <input type="checkbox" checked={quotes} onChange={(e) => setQuotes(e.target.checked)} />
          Quoted keys
        </label>
      </div>
      <div className="json-lines">
        {lines.map((line, index) => (
          <JsonLine
            key={line.getKey()}
            line={line}
            index={index}
            numbers={numbers}
            quotes={quotes}
            onToggle={() => handleToggleLineCollapse(index)}
          />
        ))}
      </div>
    </div>
  );
}
