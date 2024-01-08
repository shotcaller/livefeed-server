import { initializeDb } from "../_db.js";

const db = await initializeDb();
const usersRef = db.collection("users");

export const getUsers = async () => {
  const users = await usersRef.get();
  if (users.empty) return null;
  else {
    return getDataList(users);
  }
};

export const findUserByUserid = async (userid) => {
    try {
        const foundUser = (await usersRef.doc(userid).get()).data();
        if (!foundUser.id) throw Error("User not found");
        return foundUser;
    } catch (e) {
        console.log(e);
        return e.message;
    } 
}

export const createUser = async ({id, userid, name, password }) => {
    try {
        await usersRef.doc(userid).set({
            id,
            userid,
            name,
            password,
          });
          const userObj = (await usersRef.doc(userid).get()).data();
          if (!userObj.id) throw Error("Error while registering user.")
          return userObj;

    } catch(e) {
        console.log(e);
        return e.message;
    }
}

/** Helper functions */
const getDataList = (dbResponse) => {
  let data = [];
  dbResponse.forEach((res) => data.push(res.data()));
  return data;
};
