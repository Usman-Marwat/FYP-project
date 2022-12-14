import { useContext } from "react";
import jwtDecode from "jwt-decode";

import AuthContext from "./context";
import authStorage from "./storage";

//This hook is encapsulating the logic around populating the state [user,setUser]
//This state could be from context as well

export default useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const logIn = (authToken) => {
    console.log("----------------Login Token-------------------------");
    console.log(authToken);
    const user = jwtDecode(authToken);
    setUser(user);
    authStorage.storeToken(authToken);
  };

  const logOut = () => {
    setUser(null);
    authStorage.removeToken();
  };

  const refreshUserToken = (authToken) => {
    console.log("----------------Refersh Token-------------------------");
    console.log(authToken);
    const user = jwtDecode(authToken);
    setUser(user);
    authStorage.removeToken();
    authStorage.storeToken(authToken);
  };

  return { user, logIn, logOut, refreshUserToken };
};
