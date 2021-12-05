import fetch from 'node-fetch';
import { HASURA_ADMIN_SECRET } from 'react-native-dotenv';

export const fetchGraphQL = async (
  schema,
  variables = {},
) => {
  const graphql = JSON.stringify({
    query: schema,
    variables,
  });
  const requestOptions = {
    method: "POST",
    headers: {
      'content-type': 'application/json',
      'x-hasura-admin-secret': HASURA_ADMIN_SECRET,
    },
    body: graphql,
  };
  const database_url = "https://givespace.hasura.app/v1/graphql";
  const res = await fetch(database_url, requestOptions).then((res) =>
    res.json()
  );
  
  return res;
};

// library for formating phone number https://www.npmjs.com/package/libphonenumber-js
// library for inputing phone number https://www.npmjs.com/package/react-native-phone-number-input