import React,{useEffect} from 'react'
import { AuthContext } from '../../../Contexts/AuthContext/AuthContext'
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import logo from '../../../images/logo.png'
const RegForm = () => {

    // const url = 'http://localhost:8000/'
    const { register, authState } = useContext(AuthContext)
    const nav = useNavigate()
    
        // checking login

        useEffect(()=>{
            if (authState.isAuthenticated){
                return nav('/admin')
            }
        },[authState])
    
    async function Api(f){
        f.preventDefault()
        const username = f.target[0].value
        const password = f.target[1].value
        if(register(JSON.stringify({
            username,
            password
        }))){
            return nav('/admin')
        }
    }

  return (
    <div className='z-20 bg-red-500 bg-opacity-50'>
        <div className='bg-gray fixed w-auto top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] border-2 border-red-4000  shadow-2xl shadow-gray-500 rounded-xl p-14 pt-5 '>
        <center>
            <img src={logo} className='w-52 m-2'/>
        </center>
        <h1 className='text-md m-2 text-center font-bold'>Admin Register</h1>
        <form onSubmit={Api} className=''>
            <input type='text' className="border-2 border-gray-400 rounded-xl p-2 m-2" placeholder='Username' /><br/>
            <input type='password' className="border-2 border-gray-400 rounded-xl p-2 m-2" placeholder='Password' /><br/>
            <input type='submit' className="text-white border-2 m-2 duration-100 hover:scale-105 ease-linear border-green-600 bg-blue-700 py-2 px-8 rounded-3xl float-right" />
        </form>
        </div>
    </div>
  )
}

export default RegForm