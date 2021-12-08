const users = [
  {
    id: 0,
    username: 'Krabs',
    password: 'password',
    phone_number: '123-456-7890',
    address: '123 N Street',
    profile_pic_url: 'https://via.placeholder.com/150/FF0000/FFFFFF?Text="KB"',
  },
  {
    id: 1,
    username: 'Bob',
    password: 'password',
    phone_number: '123-456-7891',
    address: '123 N Street',
    profile_pic_url: 'https://via.placeholder.com/150/FFEE00/000000?Text="SB"',
  },
];

const friend_rel = [
  {
    id: 0,
    user_first: 0,
    user_second: 1,
  },
];

const lists = [
  {
    id: 0,
    user_id: 0,
    title: 'Christmas Wishlist',
  },
  {
    id: 1,
    user_id: 1,
    title: 'Christmas Wishlist',
  },
  {
    id: 2,
    user_id: 1,
    title: 'Wedding',
  },
  {
    id: 3,
    user_id: 1,
    title: 'Birthday',
  },
];

const items = [
  {
    id: 0,
    name: 'TV',
    image_url: '',
    item_url: '',
    price: 200.0,
  },
  {
    id: 0,
    name: 'Teddy Bear',
    image_url: '',
    item_url: '',
    price: 7.5,
  },
  {
    id: 0,
    name: 'Waffle Iron',
    image_url: '',
    item_url: '',
    price: 25.0,
  },
  {
    id: 0,
    name: 'Coal',
    image_url: '',
    item_url: '',
    price: 0.5,
  },
];

const list_items = (function () {
  const results = [];
  for (let i = 0; i < lists.length; i++) {
    for (let j = 0; j < items.length; j++) {
      const listItem = {
        id: results.length,
        list: i,
        item: j,
      };
      results.push(listItem);
    }
  }
  return results;
})();

export default {
  // Users
  createUser: (data) => {
    const { username, password, phone } = data;
    return new Promise((resolve, reject) => {
      const nameTaken = users.some((e) => e.username === username);

      if (nameTaken) {
        reject(new Error('username taken'));
      } else {
        const newUser = {
          id: users.length,
          username: username,
          password: password,
          address: '',
        };
        users.push(newUser);
        resolve(newUser);
      }
    });
  },
  getUser: (data) => {
    const { username, password } = data;
    return new Promise((resolve, reject) => {
      const user = users.find((e) => e.username === username);
      console.log(user);

      if (user.password === password) {
        resolve(user);
      } else {
        reject(new Error('wrong password'));
      }
    });
  },

  //Lists
  createList: (data) => {
    const { phone, title } = data;

    return new Promise((resolve, reject) => {
      const newList = {
        id: lists.length,
        user_phone_number: phone,
        title: title,
      };

      lists.push(newList);
      resolve(newList);
    });
  },

  addItemToList: (data) => {
    const { listId, itemId } = data;

    return new Promise((resolve, reject) => {
      const newListItem = {
        list,
        item,
      };

      list_items.push(newListItem);
      resolve(newListItem);
    });
  },

  getList: (data) => {
    const { listId } = data;
    return new Promise((resolve, reject) => {
      const list = {
        ...lists[listId],
        list_items: list_items
          .filter((item) => item.list === listId)
          .map((e) => ({
            item: items[e.item],
          })),
      };
      console.log(list);

      resolve(list);
    });
  },

  getUserLists: (data) => {
    const { userId } = data;
    return new Promise((resolve, reject) => {
      const userLists = lists.filter((e) => e.user_id === userId);
      const listItems = userLists.map((list) => {
        return {
          ...list,
          list_items: list_items
            .filter((item) => item.list === list.id)
            .map((e) => ({
              item: items[e.item],
            })),
        };
      });

      resolve(listItems);
    });
  },

  //Friends
  getFriends: (data) => {
    const { userId } = data;

    return new Promise((resolve, reject) => {
      const assoc = friend_rel.filter(
        (e) => e.user_first === userId || e.user_second === userId,
      );
      const friendIds = assoc.map((e) => {
        if (userId === e.user_first) {
          return e.user_second;
        }
        return e.user_first;
      });
      const friends = friendIds.map((e) => users[e]);

      resolve(friends);
    });
  },
};
