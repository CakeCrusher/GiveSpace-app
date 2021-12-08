import AsyncStorage from '@react-native-async-storage/async-storage';
import MockApi from '../../utils/MockApi';

import { fetchGraphQL } from '../../utils/helperFunctions';
import { SIGN_IN_USER } from '../../utils/schemas';

export const signin =
  ({ username, password }) =>
  async (dispatch) => {
    try {
      const { data } = await fetchGraphQL(SIGN_IN_USER, {
        password,
        username,
      });
      if (data) {
        const user = { ...data.user[0] };
        const friends1 = data.user[0].friend_rels.map(
          (e) => e.userByUserSecondId,
        );
        const friends2 = data.user[0].friendRelsByUserSecondId.map(
          (e) => e.user,
        );

        user.friends = [...friends1, ...friends2];
        delete user.friendRelsByUserSecondId;
        delete user.friend_rels;

        dispatch(setUser(user));
      } else {
        console.warn('no user found');
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

export const signup =
  ({ username, password, phone }) =>
  async (dispatch) => {
    try {
      const user = await MockApi.createUser({ username, password, phone });
      //await AsyncStorage.setItem('AuthToken', JSON.stringify({ id: user.id }));
      dispatch(setUser(user));
    } catch (err) {
      console.log(err);
    }
  };

export const logout = () => async (dispatch) => {
  try {
    await AsyncStorage.removeItem('AuthToken');
    dispatch(setUser(null));
  } catch (err) {
    console.log(err);
  }
};

export const setUser = (user) => ({ type: 'SET_USER', payload: user });
