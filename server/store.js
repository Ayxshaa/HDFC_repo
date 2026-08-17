import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, 'data');
const DATA_FILE = join(DATA_DIR, 'links.json');

function load() {
  if (!existsSync(DATA_FILE)) return {};
  try {
    return JSON.parse(readFileSync(DATA_FILE, 'utf-8'));
  } catch { 
    return {};
  }
}

function persist(links) {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(DATA_FILE, JSON.stringify(links, null, 2));
}

const links = load();

/** Finds an existing short code for a URL, if one was already issued. */
export function findCodeByUrl(url) {
  return Object.keys(links).find((code) => links[code].url === url) ?? null;
}

export function saveLink(code, url) {
  links[code] = { url, createdAt: new Date().toISOString() };
  persist(links);
}

export function getLink(code) {
  return links[code] ?? null;
}
