/* eslint-disable react-refresh/only-export-components */
import React, { createContext } from 'react'
export const authDataContext = createContext()

function AuthContext({children}) {
  let serverUrl = "https://smartcart-backend-v73t.onrender.com";
  let value = {
    serverUrl
  };
  return (
    <authDataContext.Provider value={value}>
      {children}
    </authDataContext.Provider>
  );
}

export default AuthContext




