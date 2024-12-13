import { createContext } from "react";


const UserContext = createContext({
  username : null,
  setAuthenticated: (user) => {}
});


export default UserContext;