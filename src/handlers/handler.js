import { BaseHandler } from './base.js'
import { createMosaic, extractUrls } from '../lib/mosaic-builder.js'
import {
  ERROR_URLS_MISSING,
  ERROR_INVALID_MEMBER,
} from '../exceptions/errors.js'

export async function handler(req, res, handler) {
  const server = new BaseHandler(req, res, handler)
  const { urls, size, columns, limit } = req.query

  // ==============
  // Number fields
  // ==============
  const keys = ['size', 'columns', 'limit']
  const params = [size, columns, limit]
  let error = false

  for (const [index, key] of keys.entries()) {
    const param = params[index]
    if (param !== undefined && isNaN(Number(param))) {
      server.reply(422, { error: ERROR_INVALID_MEMBER, attribute: key })
      error = true
      break
    }
  }

  if (error) return

  // ==============
  // URLs
  // ==============
  
  try {
    const sanitized_urls = extractUrls(urls).filter(Boolean)
    const sanitazed_limit = parseInt(limit, 10) || sanitized_urls.length
    const urlArray = sanitized_urls.slice(0, sanitazed_limit)
    if (!urlArray.length) {
      server.reply(400, { error: ERROR_URLS_MISSING })
      return
    }
    const sanitazed_size = parseInt(size, 10) || 200
    const sanitazed_columns = parseInt(columns, 10) || sanitazed_limit
    const mosaicImage = await createMosaic({
      urls: urlArray,
      size: sanitazed_size,
      columns: sanitazed_columns,
    })

    server.type('image/png')
    server.reply(200, mosaicImage)
  } catch (err) {
    server.reply(500, { error: err.message })
  }
}
