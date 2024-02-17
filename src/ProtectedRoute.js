import { useEffect } from "react";
import { Navigate, Route, useNavigate } from "react-router-dom";
import { indexPattern, loginPattern } from "./Routes";

function ProtectedRoute({  isAuth, }) {
    const navigate = useNavigate();


console.log(isAuth,"isauth dta")

    if(!isAuth){
        return <Navigate to={loginPattern}/>
    }
  

  
    return <></>;
  }

  export default ProtectedRoute