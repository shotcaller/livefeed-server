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
        return foundUser;
    } catch (e) {
        console.log(e);
    } 
}

export const createUser = async ({id, userid, name, hashedPassword }) => {
    try {
        await usersRef.doc(userid).set({
            id,
            userid,
            name,
            hashedPassword,
          });
          const userObj = (await usersRef.doc(userid).get()).data();
          if (!userObj.id) throw Error("Error while registering user.")
          return userObj;

    } catch(e) {
        console.log(e);
    }
}

/** Helper functions */
const getDataList = (dbResponse) => {
  let data = [];
  dbResponse.forEach((res) => data.push(res.data()));
  return data;
};
