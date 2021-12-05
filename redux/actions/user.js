// TODO: Replace this promise with an actual fetchGraphQL call
const promise = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('postUser');
      resolve({
        username: 'krabs',
        password: 'secret',
      });
    }, 300);
  });
export const fetchUser =
  ({ username, password }) =>
  async (dispatch) => {
    try {
      const user = await promise();
      console.log(user);
      dispatch(setUser(user));
    } catch (err) {
      console.log(err);
    }
  };

export const postUser =
  ({ username, password, phone }) =>
  async (dispatch) => {
    try {
      const user = await promise();
      console.log(user);
      dispatch(setUser(user));
    } catch (err) {
      console.log(err);
    }
  };

export const setUser = (user) => ({ type: 'SET_USER', payload: user });
