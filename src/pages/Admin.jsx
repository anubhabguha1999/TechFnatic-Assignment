import React, { useEffect, useState } from 'react'
import HeaderAdmin from '../componets/Admin/HeaderAdmin'
import add from '../images/plus (2).png'
import Product from '../componets/Product'
import AddForm from '../componets/Admin/AddForm'
import { AuthContext } from '../Contexts/AuthContext/AuthContext'
import { useContext } from 'react'
import { useAsyncError, useNavigate } from 'react-router-dom'
import Invite_form from '../componets/Admin/invite_form'

const Admin = () => {

    const [Add, setAdd] = useState(false)
    const {authState} = useContext(AuthContext)
    const nav = useNavigate()

    // checking login

    useEffect(()=>{
        if (!authState.isAuthenticated){
            return nav('/signin')
        }
    },[authState])



    // const url = 'http://127.0.0.1:8000/'
    const url = 'https://techfnatic.pythonanywhere.com/'

    //states
    const [products,setProducts] = useState([])
    const [intro_head,setIntro_head] = useState('...')
    const [intro_sub_head,setIntro_sub_head] = useState('...')
    const [About,setAbout] = useState('...')
    const [email,setEmail] = useState('...')
    const [address,setAddress] = useState('...')
    
const Api = async ()=>{
    const response = await fetch(url+'api/data_values/')
    const data = await response.json()
    setProducts(data['products'])
    setAbout(data['about'])
    setEmail(data['email'])
    setAddress(data['address'])
    setIntro_head(data['intro_head'])
    setIntro_sub_head(data['intro_sub_head'])
}

const [username,setUsername] = useState(localStorage.getItem('username'))
const [admin_type,setAdmin_type] = useState(localStorage.getItem('admin_type'))



useState(()=>{
    Api()
},[])


const Submit = async (f)=>{
    f.preventDefault()

    const body = {
        'intro_head' : intro_head,
        'intro_sub_head' : intro_sub_head,
        'about' : About,
        'email' : email,
        'address' : address,
    }
    // console.log(body)

    const response = await fetch(url+'api/update_data_values',{
        headers:{
            'Content-type': 'application/json'
        },
        method:'PUT',
        body:JSON.stringify(body)
    })
    if (response.status == 200){
        alert('Value Updated..!')
        Api()
    }

}

    const [invite,setInvite] = useState(false)



    return (
    <div>
        {Add && <AddForm api={Api} fun={setAdd}/> }
        {invite && <Invite_form/>}
        <HeaderAdmin/>
        <h1 className='m-3 md:mr-14 float-right shadow-2xl shadow-black p-5 rounded-xl font-bold'><span className='text-green-500'>{admin_type}</span> : {username}</h1>        
        <br />
        <br />
        <br />
        <br />
        <div className="flex justify-between px-10 m-5">

        <h1 id="products" className="text-center text-xl font-semibold">- Total Products ({products.length}) </h1>
        <button onClick={()=>setAdd(!Add)} className="add hover:scale-110 duration-200 text-white bg-green-700 py-2 px-6 rounded-3xl flex items-center font-bold"> <img src={add} className='w-6 m-2' /> New Product</button>
        </div>
    
        {/* products */}

        <section>

        <div className="grid md:grid-cols-3 max-w-[1130px] mx-auto">

        {
        products.map(product=> <Product api={Api} update={true} key={product.id} id={product.id} title={product.title} content={product.content} img={url+product.img} />)
        }
            
        </div>

        </section>

<h1 id="products" className="text-xl ml-16 font-semibold">- Address & Others</h1>

<div className="grid md:grid-cols-2 gap- mx-auto">

{/* intro_head */}
    <form onSubmit={Submit} className="p-5 m-2">

        <label className="font-bold">
        Intro Heading
        </label>
        <input type="text" id="intro_heading" value={intro_head} onChange={(e)=>setIntro_head(e.target.value)} className="w-full h-20 text-xl border-2 border-gray-400 rounded-xl p-1 m-2" placeholder="Intro Heading" name="value" />
        <input type="submit" value="Change" className="text-white float-right bg-blue-700 py-2 px-8 rounded-3xl"/>
    </form>

{/* introsub */}
    <form onSubmit={Submit} className="p-5 m-2">

    <label className="font-bold">
        Intro Content
    </label>
    <input type="text" id="intro_content" value={intro_sub_head} onChange={(e)=>setIntro_sub_head(e.target.value)} className="w-full h-20 text-xl border-2 border-gray-400 rounded-xl p-1 m-2" placeholder="Intro Content" name="value" />
    <input type="submit" value="Change" className="text-white float-right bg-blue-700 py-2 px-8 rounded-3xl"/>
</form>


</div>

<div className="grid md:grid-cols-2 gap-2 mx-auto">

{/* email */}
    <form onSubmit={Submit} className="p-5 m-2">
    <label className="font-bold">
        Email
    </label>
    <input type="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="text-xl border-2 border-gray-400 rounded-xl p-1 m-2" placeholder="Email" name="value" />
    <input type="submit" value="Change" className="text-white float-right bg-blue-700 py-2 px-8 rounded-3xl"/>
</form>



<form onSubmit={Submit} className="p-5 m-2">
    <label className="font-bold">
        Address
    </label>
    <input type="text" id="address"  value={address} onChange={(e)=>setAddress(e.target.value)} className=" text-xl border-2 border-gray-400 rounded-xl p-1 m-2" placeholder="Address" name="value" />
    <input type="submit" value="Change" className="text-white float-right bg-blue-700 py-2 px-8 rounded-3xl"/>
</form>
</div>

{/* about */}

<form onSubmit={Submit} className="p-5 m-5">

    <label className="font-bold">
        About Content
    </label>
    <textarea type="text" id="about_content" onChange={(e)=>setAbout(e.target.value)} value={About} className="w-full h-44 text-xl border-2 border-gray-400 rounded-xl p-1 m-2" placeholder="About Content" name="value"></textarea>
    <input type="submit" value="Change" className="text-white float-right bg-blue-700 py-2 px-8 rounded-3xl"/>
</form>














    
    </div>
  )
}

export default Admin