import React , { createContext} from 'react'
export const authDataContext = createContext()

function authContext({children}) {
    let serverUrl = "https://smartcart-backend-v73t.onrender.com"
    let value = {
         serverUrl
    }
  return (
    <div>
      <authDataContext.Provider value={value}>
        {children}
      </authDataContext.Provider>
    </div>
  )
}

export default authContext
 
