import AsyncStorage from '@react-native-async-storage/async-storage';
import MockApi from '../../utils/MockApi';
import { fetchGraphQL } from '../../utils/helperFunctions';
import {
  REGISTER_USER,
  SIGN_IN_USER,
  SIGN_IN_USER_BY_ID,
} from '../../utils/schemas';

const cleanUserData = (userData) => {
  const userObject = {
    ...userData,
  };
  delete userObject.friend_rels;
  delete userObject.friendRelsByUserSecondId;

  const friends1 = userData.friend_rels.map((e) => e.userByUserSecondId);
  const friends2 = userData.friendRelsByUserSecondId.map((e) => e.user);

  userObject.friends = [...friends1, ...friends2];
  return userObject;
};

export const signinByIdUser =
  (userRes) =>
  async (dispatch) => {
    const user = {...userRes.data.user[0]}
    delete user.friend_rels
    dispatch({ type: 'SET_USER', payload: user })
  };

export const signin =
  ({ username, password }) =>
  async (dispatch) => {
    console.log(username, password);
    try {
      const user = await fetchGraphQL(SIGN_IN_USER, { username, password });
      console.log(user);
      //await AsyncStorage.setItem('AuthToken', JSON.stringify({ id: user.id }));
      if (user.data.user.length) {
        const userObject = cleanUserData(user.data.user[0]);
        await AsyncStorage.setItem('user_id', user.data.user[0].id);

        dispatch({ type: 'SET_USER', payload: user });
        return { status: 'success' };
      } else {
        return { status: 'error', error: 'Invalid username or password' };
      }
    } catch (err) {
      console.log(err);
      return { status: 'error', error: 'Invalid username or password' };
    }
  };

export const signup =
  ({ username, password, phone_number, contacts_phone_numbers }) =>
  async (dispatch) => {
    try {
      const user = await fetchGraphQL(REGISTER_USER, {
        username,
        password,
        phone_number,
        contacts_phone_numbers,
      });
      console.log('user!', user);
      //await AsyncStorage.setItem('AuthToken', JSON.stringify({ id: user.id }));
      if (user.data) {
        await AsyncStorage.setItem(
          'user_id',
          user.data.register.userIdToUser.id,
        );
        dispatch(setUser(user.data.register.userIdToUser));
        return { status: 'success' };
      } else {
        return {
          status: 'error',
          error: 'Username or phone number already exist',
        };
      }
    } catch (err) {
      console.log(err);
      return {
        status: 'error',
        error: 'Username or phone number already exists',
      };
    }
  };

export const logout = () => async (dispatch) => {
  console.log('logging out');
  try {
    console.log('removing user id');
    await AsyncStorage.removeItem('user_id');
    const newUserId = await AsyncStorage.getItem('user_id');
    console.log('removed: ', newUserId);
    dispatch(setUser(null));
  } catch (err) {
    console.log(err);
  }
};

export const setUser = (user) => ({ type: 'SET_USER', payload: user });
