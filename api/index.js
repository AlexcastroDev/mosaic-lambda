import { VercelHandler } from '../handlers/vercel';
import handler from '../handlers/handler';

export default async function handler(req, res) {
  handler(req, res, VercelHandler);
}