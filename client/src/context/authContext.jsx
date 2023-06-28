import { createContext, useContext, useEffect, useState } from "react";
import { loginRequest, registerRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";
export const AuthContext = createContext();
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be use within at authProvider ");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true)
  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      console.log(res.data);
      setUsers(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error.response);
      setErrors(error.response.data);
    }
  };
  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      console.log(res);
      setIsAuthenticated(true);
      setUsers(res.data);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };
  const logout=()=>{
    Cookies.remove('token')
    setIsAuthenticated(false)
    setUsers(null)
  }
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
     async function checklogin() {
      const cookies = Cookies.get();

      if (!cookies.token) {
        setIsAuthenticated(false)
        setLoading(false)
        return 
      }
      try {
          const res = await verifyTokenRequest(cookies.token);
          console.log(res.data);
          if (!res.data){
            setIsAuthenticated(false);
          
           }
           setIsAuthenticated(true);
           setUsers(res.data);
           setLoading(false);
      }catch (error) {
          setIsAuthenticated(false);
          setUsers(null);
          setLoading(false)
        }
      }
    
    checklogin()
  }, []);
  return (
    <AuthContext.Provider
      value={{ signup, signin, users, isAuthenticated,loading, errors,logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
