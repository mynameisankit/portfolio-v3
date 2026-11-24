import { useState } from 'react';
import * as brands from 'react-icons/si';
import { set, type StringInputProps, unset } from 'sanity';

const ICONS_PER_PAGE = 40;
const ICON_PREFIX_LENGTH = 2;
const ICON_GRID_GAP = 4;
const ICON_PREVIEW_SIZE = 24;

const icons = Object.entries(brands);

export function SkillIconInput({
  value,
  onChange,
  readOnly: isReadOnly,
  elementProps,
}: StringInputProps) {
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(ICONS_PER_PAGE);
  const matches = icons.filter(([name]) =>
    name.slice(ICON_PREFIX_LENGTH).toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <fieldset disabled={isReadOnly}>
      <legend>Technology icon</legend>
      <input
        {...elementProps}
        type="search"
        aria-label="Search Simple Icons"
        placeholder="Search Simple Icons"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setLimit(ICONS_PER_PAGE);
        }}
      />
      <p>{value ?? 'No icon selected'}</p>
      {value && (
        <button type="button" onClick={() => onChange(unset())}>
          Clear selection
        </button>
      )}
      <p>{matches.length} matches</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: ICON_GRID_GAP }}>
        {matches.slice(0, limit).map(([name, Icon]) => (
          <button
            key={name}
            type="button"
            title={name.slice(ICON_PREFIX_LENGTH)}
            aria-label={name.slice(ICON_PREFIX_LENGTH)}
            aria-pressed={value === name}
            onClick={() => onChange(set(name))}
          >
            <Icon size={ICON_PREVIEW_SIZE} aria-hidden="true" />
          </button>
        ))}
      </div>
      {matches.length > limit && (
        <button type="button" onClick={() => setLimit(limit + ICONS_PER_PAGE)}>
          Show more icons
        </button>
      )}
    </fieldset>
  );
}
