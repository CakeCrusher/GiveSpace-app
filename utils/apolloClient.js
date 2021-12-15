import { ApolloClient, InMemoryCache, split } from '@apollo/client';
import { HASURA_ADMIN_SECRET } from 'react-native-dotenv';
import { WebSocketLink } from '@apollo/client/link/ws';

const link = new WebSocketLink({
  uri: 'ws://givespace.hasura.app/v1/graphql',
  options: {
    reconnect: true,
    connectionParams: {
      headers: {
        'x-hasura-admin-secret': HASURA_ADMIN_SECRET,
      },
    },
  },
});

const cache = new InMemoryCache();
const client = new ApolloClient({ link, cache });

export default client;
