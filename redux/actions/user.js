import AsyncStorage from "@react-native-async-storage/async-storage";
import MockApi from "../../utils/MockApi";
import { fetchGraphQL } from "../../utils/helperFunctions";
import {
  REGISTER_USER,
  SIGN_IN_USER,
  SIGN_IN_USER_BY_ID,
} from "../../utils/schemas";

const cleanUserData = (userData) => {
  const userObject = {
    ...userData,
  };
  delete userObject.friend_rels;
  delete userObject.friendRelsByUserSecondId;

  const friends1 = userData.friend_rels.map((e) => e.userByUserSecondId);
  //const friends2 = userData.friendRelsByUserSecondId.map((e) => e.user);

  //userObject.friends = [...friends1, ...friends2];
  userObject.friends = friends1;
  return userObject;
};

export const signinUser = (user) => (dispatch) => {
  AsyncStorage.setItem("username", user.username);
  const userCopy = { ...user };
  delete userCopy.friend_rels;
  dispatch({ type: "SET_USER", payload: user });
  return;
};

export const populateListUser = (list) => (dispatch) => {
  dispatch({ type: "SET_USER_LIST", payload: list });
  return;
};

export const addListItem = (listId, item) => (dispatch) => {
  dispatch({ type: "ADD_LIST_ITEM", payload: { listId, item } });
  return;
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
        await AsyncStorage.setItem("username", user.data.user[0].username);

        dispatch({ type: "SET_USER", payload: user });
        return { status: "success" };
      } else {
        return { status: "error", error: "Invalid username or password" };
      }
    } catch (err) {
      console.log(err);
      return { status: "error", error: "Invalid username or password" };
    }
  };

export const setStateUsername = (username) => (dispatch) => {
  dispatch({ type: "SET_USERNAME", payload: username });
  return;
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
      console.log("user!", user);
      //await AsyncStorage.setItem('AuthToken', JSON.stringify({ id: user.id }));
      if (user.data) {
        await AsyncStorage.setItem(
          "username",
          user.data.register.userIdToUser.username
        );
        dispatch(setUser(user.data.register.userIdToUser));
        return { status: "success" };
      } else {
        return {
          status: "error",
          error: "Username or phone number already exist",
        };
      }
    } catch (err) {
      console.log(err);
      return {
        status: "error",
        error: "Username or phone number already exists",
      };
    }
  };

export const logout = () => async (dispatch) => {
  try {
    await AsyncStorage.removeItem("username");
    dispatch(setUser(null));
  } catch (err) {
    console.log(err);
  }
};

export const editListTitle = (listId, title) => (dispatch) => {
  dispatch({ type: "EDIT_LIST_TITLE", payload: { listId, title } });
  return;
};

export const editAddress = (address) => (dispatch) => {
  dispatch({ type: "EDIT_USER_ADDRESS", payload: address });
  return;
};

export const addList = (listData) => ({
  type: "ADD_USER_LIST",
  payload: listData,
});

export const removeLists = (listIds) => ({
  type: "REMOVE_LISTS",
  payload: listIds,
});

export const removeItems = ({ deletedIds, listId }) => ({
  type: "REMOVE_ITEMS",
  payload: {
    deletedIds,
    listId,
  },
});

export const updateUserImage = (profile_pic_url) => (dispatch) => {
  console.log("!setting0", profile_pic_url);
  dispatch({ type: "SET_USER_IMAGE", payload: profile_pic_url });
  return;
};

export const setUser = (user) => ({ type: "SET_USER", payload: user });
