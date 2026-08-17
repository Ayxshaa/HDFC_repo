import { SHORTENER_API_URL } from './constants.js';

/**
 * Asks the backend to shorten a URL for sharing.
 * @param {string} url
 * @returns {Promise<string>} the short URL, or the original url if shortening failed
 */
export async function shortenLink(url) {
  try {
    const response = await fetch(`${SHORTENER_API_URL}/api/shorten`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) return url;

    const { shortUrl } = await response.json();
    return shortUrl || url;
  } catch {
    return url;
  }
}
