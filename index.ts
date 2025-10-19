import dotenv from 'dotenv';
dotenv.config();
import app from './app';
import { connectDb } from './db';

const port = process.env.PORT || 3000;

async function main() {
  await connectDb();
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
