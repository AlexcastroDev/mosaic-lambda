import { BaseHandler } from './base.js';
import { createMosaic } from '../lib/mosaic-builder.js';

export default async function handler(req, res, handler) {
    const server = new BaseHandler(req, res, handler)
    
    try {
    const { urls, size, columns, limit } = req.query;
    
    if (!urls) {
      return server.reply(400, { error: 'Missing or invalid URLs' })
    }

    const sanitized_urls = urls.split(',').filter(Boolean)
    const sanitazed_limit = parseInt(limit, 10) || sanitized_urls.length;
    const urlArray = sanitized_urls.slice(0, sanitazed_limit);

    if (urlArray.length === 0) {
      return server.reply(400, { error: 'No URLs provided' })
    }

    const mosaicImage = await createMosaic({
      urls: urlArray,
      columns: 2,
      size: size ? parseInt(size, 10) : 200,
      columns: columns ? parseInt(columns, 10) : sanitazed_limit,
    });

    server.type('image/png');
    server.reply(200, mosaicImage);
  } catch (err) {
    console.error('Error creating mosaic:', err);
    server.reply(500, { error: err.message });
  }
}