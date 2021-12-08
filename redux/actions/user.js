import AsyncStorage from '@react-native-async-storage/async-storage';
import MockApi from '../../utils/MockApi';

// TODO: Replace this promise with an actual fetchGraphQL call
const promise = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id: 1,
        username: 'krabs',
        password: 'secret',
      });
    }, 300);
  });

export const signin =
  ({ username, password }) =>
  async (dispatch) => {
    try {
      const user = await MockApi.getUser({ username, password });
      //await AsyncStorage.setItem('AuthToken', JSON.stringify({ id: user.id }));
      dispatch(setUser(user));
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
