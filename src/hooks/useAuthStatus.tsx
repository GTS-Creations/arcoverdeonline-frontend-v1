'use client'

import { useState, useEffect } from "react";

function useAuthStatus() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const cookies = document.cookie
      .split("; ")
      .map((cookie) => cookie.split("="));
    const tokenCookie = cookies.find(([key]) => key === "nextauth.token");

    setIsAuthenticated(!!tokenCookie);
  }, []);

  return isAuthenticated;
}

export default useAuthStatus;
