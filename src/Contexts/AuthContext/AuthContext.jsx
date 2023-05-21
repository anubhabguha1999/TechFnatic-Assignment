import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext()

export const AuthProvider = ({children}) =>{
    const token_time = 550000 
    // const domain = 'http://localhost:8000/'
    const domain = 'https://techfnatic.pythonanywhere.com/'
    const [authState, setAuthState] = useState({
        isAuthenticated : false,
        access:null,
        refresh:null,
        domain
    })


    useEffect(()=>{
        var inter = null
        if(authState.isAuthenticated == true){
           inter = setInterval(refresh_token,token_time)
        }
        else{
            clearInterval(inter)
        }

        const access = localStorage.getItem('access')
        const refresh = localStorage.getItem('refresh')
        
        if(access != null && refresh != null){
            setAuthState({
                isAuthenticated : true,
                access:access,
                refresh:refresh,
                domain
            })
        }
    },[authState.isAuthenticated])

    

    async function refresh_token(){
        const response = await fetch(`${domain}api/admin/refresh/`,{
            headers:{
                'Content-Type' : 'application/json',
                'Accept' : 'application/json',
            },
        method:'POST',
        body:JSON.stringify({
            'refresh':authState.refresh
        })
    })
    if(response.status >= 400){
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            localStorage.removeItem('username',data.username)
            localStorage.removeItem('admin_type',data.admin_type)
            
            setAuthState({
                isAuthenticated : false,
                access:null,
                refresh:null,
                domain            })
        return window.location.href = '/signin'

      }
      const data = await response.json()
      localStorage.setItem('access',data.access)
      setAuthState({
        isAuthenticated : true,
        access:data.access,
        refresh:authState.refresh,
        domain
    })
    }
    
    // useEffect(()=>{
    //     refresh_token()
    // },[])
    
    
    const register = async (form) =>{
        
        const response = await fetch(`${domain}api/admin/register`,{
            method: 'POST',
            body:form
        })
        const data = await response.json()
        if(response.status == 200){
            return true
        }
        return false
    }



    const login = async (username,password) =>{
        const response = await fetch(`${domain}api/admin/login`,{
            headers:{
                'Content-Type' : 'application/json',
                'Accept' : 'application/json',
            },
            method:'POST',
            body:JSON.stringify({
                username,password
            })
        })
        if(response.status == 200){
            const data = await response.json()
            localStorage.setItem('access',data.access)
            localStorage.setItem('refresh',data.refresh)
            localStorage.setItem('username',data.username)
            localStorage.setItem('admin_type',data.admin_type)
            setAuthState({
                isAuthenticated : true,
                access:data.access,
                refresh:data.refresh,
                domain
            })
            return true
        }
    }



    const logout = () =>{
        localStorage.setItem('access','')       
        localStorage.setItem('refresh','')
        setAuthState({
            isAuthenticated : false,
            access:null,
            refresh:null,
            domain
        })       
    }






    return (
        <AuthContext.Provider value={{authState, login, logout, register}}>
            {children}
        </AuthContext.Provider>
        )
}

