import sharp from 'sharp';

async function fetchImage(url) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch image from ${url}: ${response.statusText}`);
    }
    const buffer = await response.arrayBuffer();
    return Buffer.from(buffer);
  }
  
export async function createMosaic({ urls, columns = 2, size = 200 }) {
    const imageBuffers = await Promise.all(urls.map(url => fetchImage(url)));
    const rows = Math.ceil(imageBuffers.length / columns);
  
    const compositeArray = [];
    let x = 0;
    let y = 0;
  
    for (let i = 0; i < imageBuffers.length; i++) {
      const resizedImageBuffer = await sharp(imageBuffers[i])
        .resize(size, size, {
          fit: 'cover',
          position: 'center',
        })
        .toBuffer();
  
      compositeArray.push({
        input: resizedImageBuffer,
        top: y,
        left: x,
      });
  
      x += size;
      if ((i + 1) % columns === 0) {
        x = 0;
        y += size;
      }
    }
  
    const mosaicWidth = columns * size;
    const mosaicHeight = rows * size;
  
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
      .toBuffer();
  
    return mosaicImage;
}