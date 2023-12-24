import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useReducer } from "react";
import { auth } from "../firebase";

const AuthContext = createContext()

const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOG_IN": 
            return { ...state, user: action.payload}
        case "LOG_OUT":
            return { ...state, user: null}
        case "AUTH_READY":
            return { ...state, authReady: true}
        default:
            return state;
    }
}

const AuthContextProvider = ({children}) => {

    const [ state, disptach ] = useReducer(AuthReducer, { user : null, authReady: false} );

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            disptach({ type: "AUTH_READY"})
            if(user) {
                disptach({ type: "LOG_IN", payload: user })
            } else {
                disptach({ type: "LOG_OUT" })
            }
        })
    }, [])
  return (
    <AuthContext.Provider value={ state }>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextProvider};
