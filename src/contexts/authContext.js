import PropTypes from "prop-types";
import { createContext, useEffect, useReducer, userEffect } from "react";
import axios from "../utils/axios";

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

// Context 생성
export const AuthContext = createContext({
  ...initialState,
  method: "jwt",
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      const { user: loginUser } = action.payload;
      return {
        ...state,
        isAuthenticated: true,
        user: loginUser,
      };
    case "INITIALIZE":
      const { isAuthenticated, user: initializeUser } = action.payload;
      return {
        ...state,
        isInitialized: true,
        isAuthenticated,
        user: initializeUser,
      };
    default:
      return;
  }
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const initialize = async () => {
      if (localStorage.getItem("accessToken")) {
        const { user } = await axios.get("/");
        dispatch({
          type: "INITIALIZE",
          payload: {
            user,
            isAuthenticated: true,
          },
        });
      } else {
        dispatch({
          type: "INITIALIZE",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };
    initialize();
  }, []);

  const login = async ({ userId, userPw }) => {
    const response = await axios.post("/login", { userId, userPw });
    const { accessToken, user } = response.data;
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    } else {
      localStorage.removeItem("accessToken");
      delete axios.defaults.headers.common.Authorization;
    }

    dispatch({
      type: "LOGIN",
      payload: {
        user: user,
      },
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "jwt",
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
