import { compare, hash } from "bcrypt";
import { createJwtToken } from "../../utils/auth.js";
import { getUsers, findUserByUserid, createUser } from "./db.js";

export const UserResolvers = {
  Query: {
    users: (_parent,_args,context) => {
      const res = getUsers();
      return res;
    },
  },

  Mutation: {
    login: async (_, args) => {
      const { userid, password } = args.loginPayload;
      let token = "";
      const foundUser = await findUserByUserid(userid);
      const passwordMatch = await compare(password, foundUser.password);
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
      const hashedPassword = await hash(password, bcryptRounds);
      const id = v4();
      let token = "";
      const userObj = await createUser({ id, userid, name, hashedPassword });
      token = createJwtToken(userObj.userid);
      return {
        success: userObj.id ? true : false,
        token: userObj.id ? token : null,
        user: userObj.id ? userObj : null,
      };
    },
  },
};
