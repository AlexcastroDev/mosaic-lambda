import { VercelHandler } from '../handlers/vercel';
import lambda from '../handlers/handler';

export default async function handler(req, res) {
  lambda(req, res, VercelHandler);
}