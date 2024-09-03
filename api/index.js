import { VercelHandler } from '../src/handlers/vercel';
import lambda from '../src/handlers/handler';

export default async function handler(req, res) {
  lambda(req, res, VercelHandler);
}