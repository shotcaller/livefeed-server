import { createCustomToken } from "../_db.js";
import { findUserFromUseridPassword, getUsers } from "./db.js";

export const UserResolvers = {
  users: () => {
    const res = getUsers();
    return res;
  },

  login: async (_, args) => {
    const { userid, password } = args;
    const user = await findUserFromUseridPassword(userid, password);
    let token = "";
    if (user.id) token = createCustomToken();
    //if user is found and credentials matched
    return {
      success: user.id ? true : false,
      token: user.id ? token : null,
      user: user.id ? user : null,
    };
  },
};
