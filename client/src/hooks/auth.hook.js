import { useCallback, useEffect, useState } from "react";

const USER_STORAGE_NAME = 'userData';

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const login = useCallback((jwtToken, id) => {
    setToken(jwtToken);
    setUserId(id);

    localStorage.setItem(USER_STORAGE_NAME, JSON.stringify({ userId: id, token: jwtToken }));
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);

    localStorage.removeItem(USER_STORAGE_NAME);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(USER_STORAGE_NAME));

    if (data?.token) {
      login(data.token, data.userId);
    }
  }, [login]);

  return { login, logout, token, userId };
}
