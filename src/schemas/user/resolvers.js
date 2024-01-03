import { loginUser, getUsers, registerUser } from "./db.js";

export const UserResolvers = {
  Query: {
    users: () => {
      const res = getUsers();
      return res;
    },
  },

  Mutation: {
    login: async (_, args) => {
      const response = await loginUser(args.loginPayload);
      return response;
    },

    register: async(_, args) => {
        const response = registerUser(args.registerPayload);
        return response;
    }
  },
};
