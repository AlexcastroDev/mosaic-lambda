import { app } from '@azure/functions'
import { extractUrls, createMosaic } from '../lib/mosaic-builder.js'
import {
  ERROR_INVALID_MEMBER,
  ERROR_URLS_MISSING,
} from '../exceptions/errors.js'

app.http('api', {
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: async (request, context) => {
    // ==============
    // temporary duplication of the code
    // ==============
    const urls = request.query.get('urls')
    const size = request.query.get('size')
    const columns = request.query.get('columns')
    const limit = request.query.get('limit')

    const keys = ['size', 'columns', 'limit']
    const params = [size, columns, limit]

    for (const [index, key] of keys.entries()) {
      const param = params[index]
      if (param !== undefined && isNaN(Number(param))) {
        error = true
        return {
          status: 422,
          jsonBody: {
            error: ERROR_INVALID_MEMBER,
          },
          attribute: key,
        }
      }
    }

    try {
      const sanitized_urls = extractUrls(urls).filter(Boolean)
      const sanitazed_limit = parseInt(limit, 10) || sanitized_urls.length
      const urlArray = sanitized_urls.slice(0, sanitazed_limit)
      if (!urlArray.length) {
        return {
          status: 400,
          jsonBody: {
            error: ERROR_URLS_MISSING,
          },
        }
      }
      const sanitazed_size = parseInt(size, 10) || 200
      const sanitazed_columns = parseInt(columns, 10) || sanitazed_limit
      const mosaicImage = await createMosaic({
        urls: urlArray,
        size: sanitazed_size,
        columns: sanitazed_columns,
      })

      return {
        status: 200,
        headers: {
          'Content-Type': 'image/png',
          'Content-Length': mosaicImage.length,
        },
        body: mosaicImage,
      }
    } catch (err) {
      return {
        status: 500,
        jsonBody: {
          error: err.message,
        },
      }
    }
  },
})
