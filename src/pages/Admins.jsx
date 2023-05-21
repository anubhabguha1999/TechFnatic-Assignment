import React, {useState ,useEffect } from 'react'
import add from '../images/plus (2).png'
import HeaderAdmin from '../componets/Admin/HeaderAdmin'
import Invite_form from '../componets/Admin/invite_form'

const Admins = () => {
    const [invite,setInvite] = useState(false)
    const [admins,setAdmins] = useState([])
    // const url = 'http://127.0.0.1:8000/'
    const url = 'https://techfnatic.pythonanywhere.com/'

    const [username,setUsername] = useState(localStorage.getItem('username'))
    const [admin_type,setAdmin_type] = useState(localStorage.getItem('admin_type'))


    const Admins_Api = async ()=>{
        const response = await fetch(url+'api/admin/admins/')
        const data = await response.json()
        setAdmins(data)    
    }

    useEffect(()=>{
        Admins_Api()
    },[])



  return (
    <div>
        {invite && <Invite_form fun={setInvite} />}
        { localStorage.getItem('admin_type') == 'SuperAdmin'? <div><HeaderAdmin/>
        <h1 className='m-3 md:mr-14 float-right shadow-2xl shadow-gray-400 p-5 rounded-full font-bold'><span className='text-green-500'>{admin_type}</span> : {username}</h1>
        <div className='p-2'>
        <br />
        <br />
        <br />
        <br />
        <div className="flex justify-between px-10 m-5">
        <h1 id="products" className="text-center m-3 text-xl font-semibold">Available Admins ({admins.length}) </h1>
        <button onClick={()=>setInvite(!invite)} className="add hover:scale-110 duration-200 text-white bg-green-700 py-2 px-6 rounded-3xl flex items-center font-bold"> <img src={add} className='w-6 m-2' /> Invite Admin</button>
        </div>
        
        <div className=''>

        <table className="min-w-full bg-white border border-gray-300">
  <thead>
    <tr>
      <th className="py-2 px-4 bg-gray-200 text-gray-700 font-semibold border-b">ID</th>
      <th className="py-2 px-4 bg-gray-200 text-gray-700 font-semibold border-b">Username</th>
      <th className="py-2 px-4 bg-gray-200 text-gray-700 font-semibold border-b">Date of Join</th>
    </tr>
  </thead>
  <tbody>
    {admins.map(admin=><tr key={admin.id} className="hover:bg-gray-100">
      <td className="py-2 px-4 border-b text-center">{admin.id}</td>
      <td className="py-2 px-4 border-b text-center">{admin.username}</td>
      <td className="py-2 px-4 border-b text-center">{admin.date_joined}</td>
    </tr>)}
  </tbody>
</table>
    
        </div>

        </div></div> : <h1 className='text-4xl font-bold'> Sorry this page is only for SuperAdmin </h1> }
    </div>
  )
}


export default Admins