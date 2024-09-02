import stream from 'gm';
import { createReadStream } from 'fs';
import { parse } from 'url';
import { randomUUID } from 'crypto';

const gm = stream.subClass({ imageMagick: true });

function createMosaic(urls, outputFilePath) {
    return new Promise((resolve, reject) => {
        const gmInstance = gm();

        urls.forEach(url => {
            gmInstance.montage(url);
        });

        gmInstance
            .geometry('+0+0') // Adjust images without spaces
            .tile(`${Math.ceil(Math.sqrt(urls.length))}x`) // Configure number of columns
            .write(outputFilePath, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(outputFilePath);
                }
            });
    });
}

export default async function handler(req, res) {
    try {
        const queryObject = parse(req.url, true).query;
        const urls = queryObject.urls ? queryObject.urls.split(',') : [];

        if (!urls || urls.length === 0) {
            return res.status(400).json({ error: 'Invalid or missing URLs' });
        }

        const outputFilePath = `/tmp/${randomUUID()}.png`;

        await createMosaic(urls, outputFilePath);
        res.setHeader('Content-Type', 'image/png');

        const readStream = createReadStream(outputFilePath);
        readStream.pipe(res);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Failed to create and return mosaic' });
    }
}
