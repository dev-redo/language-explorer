import { API_URI } from './constants.js';
import { apiPath } from './path.js';

const cache = JSON.parse(window.localStorage.getItem('cache')) ?? {};

export const request = async ({ keyword, reqConfig }) => {
  const { url, method, headers, body } = reqConfig;
  if (cache?.[keyword]) {
    console.log('cached!', url);
    return cache[keyword];
  }

  try {
    const res = await fetch(url, {
      method: method || 'GET',
      headers: headers || {},
      body: body ? JSON.stringify(body) : null,
    });
    if (!res.ok) {
      throw new Error('Failed to request data');
    }
    const payload = await res.json();
    cache[keyword] = payload;
    window.localStorage.setItem('cache', JSON.stringify(cache));
    return payload;
  } catch (err) {
    alert(`Failed to request data by this error: ${err}`);
  }
};

export const fetchLanguages = async (keyword) =>
  request({
    keyword,
    reqConfig: { url: apiPath(API_URI, keyword) },
  });
