import database from "../db/database.js";

const userModel = {
  readByEmail: async (email) => {
    try {
      const [user] = await database.query(
        `select * from users where email =?`,
        [email]
      );

      if (user.length > 0) {
        return user;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error("error!");
    }
  },
  read: () => {
    try {
      const user = database.query("select * from users");
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  createUser: async ({
    username,
    email,
    hashedPassword,
    first_name,
    last_name,
    birth_date,
  }) => {
    try {
      const user = await database.query(
        "insert into users (username, email, hashedPassword, first_name, last_name, birth_date) values (?,?,?,?,?,?)",
        [username, email, hashedPassword, first_name, last_name, birth_date]
      );
      if (user.affectedRows) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
export default userModel;
