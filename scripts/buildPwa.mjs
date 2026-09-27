import { cp, mkdir, readFile } from 'node:fs/promises';
import sharp from 'sharp';

await mkdir('public/icons', { recursive: true });
const icon = await readFile('public/favicon.svg');
await Promise.all(
  [192, 512, 180].map((size) => {
    const iconName = `icon-${size}`;

    return sharp(icon)
      .resize(size, size)
      .png()
      .toFile(`public/icons/${size === 180 ? 'apple-touch-icon' : iconName}.png`);
  }),
);
const inset = await sharp(icon).resize(320, 320).png().toBuffer();
await sharp({ create: { width: 512, height: 512, channels: 4, background: '#15121e' } })
  .composite([{ input: inset, gravity: 'centre' }])
  .png()
  .toFile('public/icons/maskable-512.png');
await cp('src/pwa/assets', 'public', { recursive: true });
