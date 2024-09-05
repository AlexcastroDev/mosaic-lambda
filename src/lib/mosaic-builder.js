import sharp from 'sharp'

export function extractUrls(urlString) {
  if (Array.isArray(urlString)) return urlString
  if (!urlString || typeof urlString !== 'string') return []

  // Check if the string contains '?urls=' or '/?urls='
  if (urlString.includes('?urls=')) {
    // Extract the query parameters after '?'
    const queryParams = urlString.split('?')[1];
    // Split by &urls= to handle multiple query parameters correctly
    const urls = queryParams.split('&urls=').map(url => decodeURIComponent(url));
    return urls;
  } else {
    // If no query params, split by commas to handle multiple plain URLs
    const urls = urlString.split(',');
    return urls.map(url => url.trim());
  }
}

async function fetchImage(url) {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to fetch image from ${url}: ${response.statusText}`)
  }
  const buffer = await response.arrayBuffer()
  return Buffer.from(buffer)
}

export async function createMosaic({ urls, columns = 2, size = 200 }) {
  const imageBuffers = await Promise.all(urls.map((url) => fetchImage(url)))
  const rows = Math.ceil(imageBuffers.length / columns)

  const compositeArray = []
  let x = 0
  let y = 0

  for (let i = 0; i < imageBuffers.length; i++) {
    const resizedImageBuffer = await sharp(imageBuffers[i])
      .resize(size, size, {
        fit: 'cover',
        position: 'center',
      })
      .toBuffer()

    compositeArray.push({
      input: resizedImageBuffer,
      top: y,
      left: x,
    })

    x += size
    if ((i + 1) % columns === 0) {
      x = 0
      y += size
    }
  }

  const mosaicWidth = columns * size
  const mosaicHeight = rows * size

  const mosaicImage = await sharp({
    create: {
      width: mosaicWidth,
      height: mosaicHeight,
      channels: 3,
      background: { r: 255, g: 255, b: 255 },
    },
  })
    .composite(compositeArray)
    .toFormat('png')
    .toBuffer()

  return mosaicImage
}
