import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext2 = createContext();

export const UserProvider2 = ({children}) =>{
    const [userData , setUserData] = useState(null);
    const [error ,setError] = useState(null);
    useEffect(()=>{
        const fetchData = async ()=>{
            try {
            const token = localStorage.getItem("token");
            if(!token){
            throw new Error('No token found');
        }
            const response = axios.get('/api/user',{
            headers : {Authorization: `Bearer ${token}`}
        });
        setUserData(response.data);
        } catch (err) {
            setError(err.message);
            throw new Error(error);
        }
        
        }
        fetchData();
    }, [])
    return (
        <UserContext2.Provider
            value={{userData , setUserData}}
        >
            {children}
        </UserContext2.Provider>
    )
}
