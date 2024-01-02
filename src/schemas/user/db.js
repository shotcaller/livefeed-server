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

export const findUserFromUseridPassword = async (userid, password) => {
  try {
    let match = await usersRef
      .where("userid", "==", userid)
      .where("password", "==", password)
      .get();
    if (match.empty) throw Error("User not found");
    const [matchedUser] = getDataList(match);
    console.log(matchedUser);
    return matchedUser;
  } catch (e) {
    console.log(e.message);
    return e.message;
  }
};

/** Helper functions */
const getDataList = (dbResponse) => {
  let data = [];
  dbResponse.forEach((res) => data.push(res.data()));
  return data;
};
