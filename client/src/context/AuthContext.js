import { createContext } from "react";

function emptyFunc() {
}

export const AuthContext = createContext({
  token: null,
  userId: null,
  login: emptyFunc,
  logout: emptyFunc,
  isAuthenticated: false
});
