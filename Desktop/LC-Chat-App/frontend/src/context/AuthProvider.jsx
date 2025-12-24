import React from 'react'
import Cookies from 'js-cookie';
 export const AuthContext = React.createContext();

 export const AuthProvider = ({children}) => {

    const initialUserState = Cookies.get("jwt") || localStorage.getItem("ChatApp");

    // parsing the user data and storign in state

    const [authUser, setAuthUser] = React.useState(
        initialUserState ? JSON.parse(initialUserState) : undefined
    );



  return (
  <AuthContext.Provider value={[authUser, setAuthUser]}>
    {children}
    </AuthContext.Provider>

  )
}

export const useAuth = () => React.useContext(AuthContext);
// export default AuthProvider