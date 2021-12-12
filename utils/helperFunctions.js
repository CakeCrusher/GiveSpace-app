import fetch from 'node-fetch';
import { HASURA_ADMIN_SECRET } from 'react-native-dotenv';
import { useState } from 'react';
import { ACCEPT_FRIEND_REL, DELETE_FRIEND_REL } from './schemas';

export const debounce = (func, time = 500) => {
  let timeout;
  return (args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(args);
    }, time);
  };
};

export const fetchGraphQL = async (schema, variables = {}) => {
  const graphql = JSON.stringify({
    query: schema,
    variables,
  });
  const requestOptions = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-hasura-admin-secret': HASURA_ADMIN_SECRET,
    },
    body: graphql,
  };
  const database_url = 'https://givespace.hasura.app/v1/graphql';
  const res = await fetch(database_url, requestOptions)
    .then((res) => res.json())
    .catch((err) => console.log(err));

  return res;
};

export const useField = (type, fill = '') => {
  const [value, setValue] = useState(fill);
  const onChangeText = (text) => {
    setValue(text);
  };
  return {
    type,
    value,
    onChangeText
  }
}

export const deleteFriendRel = async (userId, friendId) => {
  const firstDelRes = await fetchGraphQL(DELETE_FRIEND_REL, {
    "user_first_id": userId,
    "user_second_id": friendId
  })
  const secondDelRes = await fetchGraphQL(DELETE_FRIEND_REL, {
    "user_first_id": friendId,
    "user_second_id": userId
  })

  return secondDelRes;
}
export const acceptFriendRel = async (userId, friendId) => {
  const firstAccRes = await fetchGraphQL(ACCEPT_FRIEND_REL, {
    "user_first_id": userId,
    "user_second_id": friendId
  })
  const secondAccRes = await fetchGraphQL(ACCEPT_FRIEND_REL, {
    "user_first_id": friendId,
    "user_second_id": userId
  })

  return secondAccRes
}

export const friendState = (id, friendsState) => {
  if (friendsState.list.find(f => f.id === id)) return 'friends'
  if (friendsState.pendingThem.find(f => f.id === id)) return 'pendingThem'
  if (friendsState.pendingMe.find(f => f.id === id)) return 'pendingMe'
  return false
}