import type useJsonLines from './upstream/organisms/jsonRenderer/hooks/useJsonLines/useJsonLines';
type JsonLineProps = {
  line: ReturnType<typeof useJsonLines>['lines'][number];
  index: number;
  numbers: boolean;
  quotes: boolean;
  onToggle: () => void;
};
export function JsonLine({ line, index, numbers, quotes, onToggle }: JsonLineProps) {
  const type = line.getDataType();
  const complex = type === 'OBJECT' || type === 'ARRAY';
  const name = line.getName();
  const expanded = line.isExpanded();
  const primitive = type === 'STRING' ? JSON.stringify(line.getValue()) : String(line.getValue());
  const value = complex ? String(line.getValue()) + (expanded ? '' : ' …') : primitive;
  return (
    <div className="json-line" key={line.getKey()}>
      {numbers && <span className="line-number">{line.getLineNumber() ?? index + 1}</span>}
      <div className="line-content" style={{ paddingLeft: Math.max(0, line.getDepth() - 1) * 17 }}>
        {complex ? (
          <button
            aria-label={(expanded ? 'Collapse ' : 'Expand ') + (name ?? 'root object')}
            aria-expanded={expanded}
            onClick={onToggle}
          >
            {expanded ? '▾' : '▸'}
          </button>
        ) : (
          <span className="spacer" />
        )}
        {name !== undefined && (
          <span className="key">{quotes ? JSON.stringify(name) : name}: </span>
        )}
        <span className={type === 'STRING' ? 'string' : 'value'}>{value}</span>
        {!complex && !line.isLast() && <span>,</span>}
      </div>
    </div>
  );
}
