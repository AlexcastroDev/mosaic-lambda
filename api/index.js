import { VercelHandler } from '../src/handlers/vercel.js'
import { default as lambda } from '../src/index.js'

export default async function handler(req, res) {
  lambda(req, res, VercelHandler)
}
