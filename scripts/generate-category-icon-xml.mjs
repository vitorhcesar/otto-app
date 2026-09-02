import fs from 'node:fs';
import path from 'node:path';

const dir = path.resolve('assets/images/activities/categories');
const outPath = path.resolve(
  'src/presentation/components/ui/activities-category-icon-xml.ts',
);

const files = fs.readdirSync(dir).filter((file) => file.endsWith('.svg')).sort();
const entries = files.map((file) => {
  const id = file.replace('.svg', '').replace(/[^a-z0-9]/gi, '_');
  const xml = fs
    .readFileSync(path.join(dir, file), 'utf8')
    .replace(/\r\n/g, '\n')
    .replace(/ preserveAspectRatio="none"/g, '')
    .replace(/ style="display: block;"/g, '')
    .replace(/clip0_[0-9_]+/g, `clip_${id}`)
    .trim();

  return [file.replace('.svg', ''), xml];
});

const body = entries
  .map(([key, xml]) => `  ${JSON.stringify(key)}: ${JSON.stringify(xml)}`)
  .join(',\n');

const source = `/** Figma-exported SVG markup for category icons. */

export const CATEGORY_ICON_XML: Record<string, string> = {
${body}
};
`;

fs.writeFileSync(outPath, source);
console.log(`wrote ${entries.length} icons to ${outPath}`);
