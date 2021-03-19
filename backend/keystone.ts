import 'dotenv/config'; // import environmental variable values
import { config, createSchema } from '@keystone-next/keystone/schema';

const databaseURL = process.env.DATABASE_URL || '';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // how long will the session last
  secret: process.env.COOKIE_SECRET,
};

export default config({
  server: {
    cors: {
      origin: process.env.FRONTEND_URL,
      credentials: true, // pass along the cookie
    },
  },
  db: {
    adapter: 'mongoose',
    url: databaseURL,
    // TODO add data seeding
  },
  // lists are the datatypes keystone uses
  lists: createSchema({}),
  // manage who has access to the external api for the data
  ui: {
    isAccessAllowed: () => true,
  },
  // TODO add session values here
});
