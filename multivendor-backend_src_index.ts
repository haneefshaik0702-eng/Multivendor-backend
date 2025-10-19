import dotenv from 'dotenv';
dotenv.config();
import app from './app';
import { initDb } from './db';

const port = process.env.PORT || 3000;

(async () => {
  await initDb(); // ensure tables
  app.listen(port, () => {
    console.log(`Server listening on http://0.0.0.0:${port}`);
  });
})().catch(err => { console.error(err); process.exit(1); });
