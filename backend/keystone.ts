import { createAuth } from '@keystone-next/auth';
import {
  withItemData,
  statelessSessions,
} from '@keystone-next/keystone/session';
import 'dotenv/config'; // gives access to environmental variable values
import { config, createSchema } from '@keystone-next/keystone/schema';
import { Product } from './schemas/Product';
import { ProductImage } from './schemas/ProductImage';
import { User } from './schemas/User';
import { insertSeedData } from './seed-data/index';
import { sendPasswordResetEmail } from './lib/mail';

const databaseURL = process.env.DATABASE_URL || '';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // how long will the session last
  secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
  listKey: 'User', // Schema responsible for the user
  identityField: 'email', // User unique field
  secretField: 'password', // User password field
  initFirstItem: {
    fields: ['name', 'email', 'password'], // Creating an initial user when starting for the first time
    // TODO add all the roles here
  },
  // adding passwordResetLink to createAuth exposes graphQL methods for password management / reset
  passwordResetLink: {
    async sendToken(args) {
      const res = await sendPasswordResetEmail(args.token, args.identity);
      console.log('args: ', args);
      console.log('res: ', res);
    },
  },
});

export default withAuth(
  config({
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
      async onConnect(keystone) {
        console.log('\n', 'Connected to the database', '\n');
        // check if '--seed-data' string exists in the parameters of the run command
        if (process.argv.includes('--seed-data')) {
          await insertSeedData(keystone);
        }
      },
    },
    // lists are the datatypes keystone uses
    lists: createSchema({
      // schema items go here
      User,
      Product,
      ProductImage,
    }),
    // manage who has access to the external api for the data
    ui: {
      // show the ui only to people passing the test
      isAccessAllowed: ({ session }) => {
        console.log('session: ', session);
        return Boolean(session?.data);
      },
    },
    // session values here
    session: withItemData(statelessSessions(sessionConfig), {
      // GraphQL query
      User: 'id name email', // this will pass the User id with every data we query, along with every single session
    }),
  })
);
