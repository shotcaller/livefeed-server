import { compare, hash } from "bcrypt";
import { createJwtToken, initializeDb } from "../_db.js";
import { v4 } from "uuid";

const db = await initializeDb();
const usersRef = db.collection("users");
const bcryptRounds = 10;

export const getUsers = async () => {
  const users = await usersRef.get();
  if (users.empty) return null;
  else {
    return getDataList(users);
  }
};

export const loginUser = async ({ userid, password }) => {
  try {
    //Compare with hashed password
    let token = "";
    const foundUser = (await usersRef.doc(userid).get()).data();
    if (!foundUser.id) throw Error("User not found");
    const passwordMatch = await compare(password, foundUser.password);
    if(!passwordMatch) throw Error("Incorrect password");
    
    token = createJwtToken(foundUser.userid);
    //if user is found and credentials matched
    return {
      success: foundUser.id ? true : false,
      token: foundUser.id ? token : null,
      user: foundUser.id ? foundUser : null,
    };
  } catch (e) {
    console.log(e.message);
    return e.message;
  }
};

export const registerUser = async ({ userid, password, name }) => {
  try {
    const hashedPassword = await hash(password, bcryptRounds);
    const id = v4()
    let token = "";
    await usersRef.doc(userid).set({
      id,
      userid,
      password: hashedPassword,
      name,
    });
    const userObj = (await usersRef.doc(userid).get()).data();
    if (!userObj.id) throw Error("Error while registering user.")
    token = createJwtToken(userObj.userid);
    return {
      success: userObj.id ? true : false,
      token: userObj.id ? token : null,
      user: userObj.id ? userObj : null,
    };
  } catch (e) {
    console.log(e);
    return e.message;
  }
};

/** Helper functions */
const getDataList = (dbResponse) => {
  let data = [];
  dbResponse.forEach((res) => data.push(res.data()));
  return data;
};
