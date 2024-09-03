import { VercelHandler } from '../src/handlers/vercel.js';
import lambda from '../src/handlers/handler.js';

export default async function handler(req, res) {
  lambda(req, res, VercelHandler);
}