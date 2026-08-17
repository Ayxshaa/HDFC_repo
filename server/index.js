import express from 'express';
import cors from 'cors';
import { nanoid } from 'nanoid';

import { findCodeByUrl, saveLink, getLink } from './store.js';

const PORT = process.env.PORT || 3001;
const PUBLIC_BASE_URL =
  process.env.PUBLIC_BASE_URL ||
  process.env.RENDER_EXTERNAL_URL ||
  (process.env.RAILWAY_PUBLIC_DOMAIN && `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`) ||
  `http://localhost:${PORT}`;
const CODE_LENGTH = 7;

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.post('/api/shorten', (req, res) => {
  const { url } = req.body ?? {};

  if (typeof url !== 'string' || !url.trim()) {
    return res.status(400).json({ error: 'url is required' });
  }

  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return res.status(400).json({ error: 'url is invalid' });
  }
  if (!/^https?:$/.test(parsed.protocol)) {
    return res.status(400).json({ error: 'url must be http or https' });
  }

  const existingCode = findCodeByUrl(url);
  const code = existingCode ?? nanoid(CODE_LENGTH);
  if (!existingCode) saveLink(code, url);

  res.json({ code, shortUrl: `${PUBLIC_BASE_URL}/${code}` });
});

app.get('/:code', (req, res) => {
  const link = getLink(req.params.code);
  if (!link) return res.status(404).send('Short link not found.');
  res.redirect(302, link.url);
});

app.listen(PORT, () => {
  console.log(`Shortener API listening on http://localhost:${PORT}`);
});
