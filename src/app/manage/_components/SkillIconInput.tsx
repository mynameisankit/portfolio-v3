import { useState } from 'react';
import * as brands from 'react-icons/si';
import { skillIcons } from '../../_components/skills/skillIcons';
import { Button, Card, Flex, Grid, Stack, Text, TextInput } from '@sanity/ui';
import { Search } from 'lucide-react';
import { set, type StringInputProps, unset } from 'sanity';

const ICONS_PER_PAGE = 40;
const ICON_PREFIX_LENGTH = 'Si'.length;
const ICON_SIZE = 22;
const FIELD_SPACING = 3;
const TILE_SPACING = 2;
const GRID_LAYOUT = { gridTemplateColumns: 'repeat(auto-fill, minmax(44px, 1fr))' };
const icons = Object.entries(brands);

export function SkillIconInput({
  value,
  onChange,
  readOnly: isReadOnly,
  elementProps,
}: StringInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(ICONS_PER_PAGE);
  const normalizedQuery = query.trim().toLowerCase();
  const matches = icons.filter(([name]) =>
    name.slice(ICON_PREFIX_LENGTH).toLowerCase().includes(normalizedQuery),
  );
  const iconName = value ?? '';
  const SelectedIcon = brands[iconName as keyof typeof brands] ?? skillIcons[iconName];
  const resultCount = `${matches.length.toLocaleString()} icons`;
  const label = value?.replace(/^Si/, '') ?? 'Choose icon';
  const resultsId = `${elementProps.id}-icon-options`;

  return (
    <Stack gap={FIELD_SPACING}>
      <Flex gap={TILE_SPACING} align="center">
        <Button
          {...elementProps}
          type="button"
          mode="ghost"
          icon={SelectedIcon}
          text={label}
          aria-expanded={isOpen}
          aria-controls={resultsId}
          disabled={isReadOnly}
          onClick={() => {
            setIsOpen(!isOpen);
            setQuery('');
            setLimit(ICONS_PER_PAGE);
          }}
        />
        {value && !isReadOnly ? (
          <Button
            type="button"
            mode="bleed"
            text="Clear"
            aria-label="Clear selected icon"
            onClick={() => onChange(unset())}
          />
        ) : null}
      </Flex>
      <div id={resultsId} hidden={!isOpen || isReadOnly}>
        <Card border radius={TILE_SPACING} padding={FIELD_SPACING}>
          <Stack gap={FIELD_SPACING}>
            <TextInput
              icon={Search}
              aria-label="Search technology icons"
              placeholder="Search technology icons"
              value={query}
              onChange={(event) => {
                setQuery(event.currentTarget.value);
                setLimit(ICONS_PER_PAGE);
              }}
            />
            <Text size={1} muted aria-live="polite">
              {matches.length ? resultCount : 'No matching icons'}
            </Text>
            <Grid gap={1} style={GRID_LAYOUT}>
              {isOpen &&
                matches.slice(0, limit).map(([name, Icon]) => (
                  <Button
                    key={name}
                    type="button"
                    mode="ghost"
                    tone={value === name ? 'primary' : 'default'}
                    selected={value === name}
                    aria-pressed={value === name}
                    title={name.slice(ICON_PREFIX_LENGTH)}
                    aria-label={name.slice(ICON_PREFIX_LENGTH)}
                    onClick={() => {
                      onChange(set(name));
                      setIsOpen(false);
                      document.getElementById(elementProps.id)?.focus();
                    }}
                  >
                    <Icon size={ICON_SIZE} aria-hidden="true" />
                  </Button>
                ))}
            </Grid>
            {matches.length > limit ? (
              <Button
                type="button"
                mode="ghost"
                text="Show more icons"
                onClick={() => setLimit(limit + ICONS_PER_PAGE)}
              />
            ) : null}
          </Stack>
        </Card>
      </div>
    </Stack>
  );
}
