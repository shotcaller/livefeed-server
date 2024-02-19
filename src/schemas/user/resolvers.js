import { compare, hash } from "bcrypt";
import { createJwtToken } from "../../utils/auth.js";
import { getUsers, findUserByUserid, createUser, addFriend } from "./db.js";
import { v4 } from "uuid";

export const UserResolvers = {
  Query: {
    users: (_parent, _args, context) => {
      const res = getUsers();
      return res;
    },
    loggedInUser: async (_parent, _args, context) => {
      const loggedInUserId = context.userIdFromToken;
      const foundUser = await findUserByUserid(loggedInUserId.id);
      if (!foundUser) throw Error("User does not exist");

      return foundUser.id ? foundUser : null;
    },
  },

  Mutation: {
    login: async (_, args) => {
      const { userid, password } = args.loginPayload;
      let token = "";
      const foundUser = await findUserByUserid(userid);
      if(!foundUser) throw Error("User does not exist");
      const passwordMatch = await compare(password, foundUser.hashedPassword);
      if (!passwordMatch) throw Error("Incorrect password");

      token = createJwtToken(foundUser.userid);
      //if user is found and credentials matched
      return {
        success: foundUser.id ? true : false,
        token: foundUser.id ? token : null,
        user: foundUser.id ? foundUser : null,
      };
    },

    register: async (_, args) => {
      const { userid, password, name } = args.registerPayload;
      const hashedPassword = await hash(password, 10);
      const id = v4();
      let token = "No token required";
      const userObj = await createUser({ id, userid, name, hashedPassword });
      return {
        success: userObj.id ? true : false,
        token: userObj.id ? token : null,
        user: userObj.id ? userObj : null,
      };
    },

    addFriend: async (_, args, context) => {
      const { friendUserId } = args;
      const res = await addFriend(context.userIdFromToken, friendUserId);
      return res;
    }
  },
  
  //Type Resolvers start here....
  User: {
    friends: async (parent, _args, _) => {
      //Retrieving friends of logged in user,  if no friends - empty array
      if (parent.friends?.length > 0) {
        const friendList = parent.friends.map(async (userid) => {
          const friend = await findUserByUserid(userid);
          if (friend) return friend;
        });
        return friendList;
      } else return [];
    },
  },
};
