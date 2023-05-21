import React, { useState } from 'react'
import arrow from '../images/arrow.svg'
import del from '../images/delete (1).png'
import edit from '../images/edit.png'
const Product = (props) => {
  
  // const url = 'http://127.0.0.1:8000/'
  const url = 'https://techfnatic.pythonanywhere.com/'

  const [edit_bool,setEdit_boll] = useState(false)
  const [content,setContent] = useState('...')
  const [title,setTitle] = useState('...')
  const [img,setImg] = useState(null)

  async function Delete(){
      const response = await fetch(url+'api/product/'+String(props.id),{
        method:'DELETE'
      })
      if (response.status >= 200 && response.status < 400){
        props.api()
        alert('Product Deleted!')
      }
      }

  async function Edit(){
    const response = await fetch(url+'api/product/'+String(props.id),{
      method:'GET'
    })
    if (response.status >= 200 && response.status < 400){
      const data = await response.json()
      setContent(data['content'])
      setTitle(data['title'])
      setEdit_boll(!edit_bool)
    }
    }

    async function Api(){
      const form = new FormData()
      form.append('img',img)
      form.append('content',content)
      form.append('title',title)
      const response = await fetch(url+'api/product/'+String(props.id)+'/',{
      method:'PUT',
      body:form
    })
    if (response.status >= 200 && response.status < 400){
      alert('Product Updatad!')
      props.api()
      setEdit_boll(!edit_bool)

    }
    else if (response.status == 400){
      const form2 = new FormData()
      form2.append('title',title)
      form2.append('content',content)
      
      const response = await fetch(url+'api/product/',{
      method:'PATCH',
      body:form2
    })
  
    if(response.status >= 200){
      props.api()
      setEdit_boll(!edit_bool)
      alert('Product Updated')
    } 
  
    }
  
    }
  
  
  return (
    <div className={edit_bool ? '' : 'hover:scale-95 duration-300'}>
      {/* edit form */}
    
    {edit_bool && <div className='fixed w-full h-full border-4 bg-white bg-opacity-70 z-50'>
    <div className="bg-white border-2 border-red-400 fixed w-auto top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] shadow-2xl shadow-gray-500 rounded-xl ">
    <h1 id="products" className="text-center text-lg font-bold m-2 mt-4">- Edit Product {props.title} -</h1>

    <div className="text-black p-3" >
        
        <center>
            <input type="text" onChange={(e)=>setTitle(e.target.value)} value={title} className="border-2 border-gray-400 rounded-xl p-2 m-2" placeholder="Title" name="title"/>
            <br/>
            <textarea onChange={(e)=>setContent(e.target.value)} value={content} className="h-44 w-64 border-2 border-gray-400 rounded-xl p-1 m-2" placeholder="Content" name="content"></textarea>
            <br/>
            {/* <lebel>Image : </lebel> */}
            <input type="file" onChange={(e)=>setImg(e.target.files[0])} className="m-2" name="img"/>
            <br/>
            <input type="submit" onClick={Api}  value="Add" className="text-white border-2 m-2 duration-100 hover:scale-105 ease-linear border-green-600 bg-green-700 py-2 px-8 rounded-3xl"/>
            <input type="reset" onClick={()=> setEdit_boll(!edit_bool)} value="Cancel" className="bg-white-700 py-2 px-8 border-2 m-2 duration-100 hover:scale-105 ease-linear border-green-600 rounded-3xl"/>
          </center>
      </div>
      </div>
    </div>
    }
        {
          !props.update ? <div className="border-2 border-black m-2 rounded-xl">
          <img src={props.img} className="w-96"/>
      <div className="text-red-900 border-t-2 opacity-40 border-black mx-3"></div>
          <div className="m-4">
          <h1 className="text-red-800 text-2xl font-semibold">{props.title}</h1>
          <h1 className="text-2xl font-bold">
            {props.content}</h1>
              <h1 className="my-3 flex item-center text-gray-800 font-semibold">Know More <img src={arrow} className="mx-2 w-5" alt="Arrow Icon"/> </h1>
          
          </div>
      </div> : <div className="border-2 border-black m-2 rounded-xl">
        <img src={props.img} className="w-96"/>
    <div className="text-red-900 border-t-2 opacity-40 border-black mx-3"></div>
        <div className="m-4">
        <h1 className="text-red-800 text-2xl font-semibold">{props.title}</h1>
        <h1 className="text-2xl font-bold">
            {props.content}</h1>
            <div className='flex items-center mt-2 justify-end'>
            <button onClick={Edit} className="hover:scale-110 duration-200 text-md m-2 float-right border-2 text-white bg-blue-500 border-red-500 py-1 px-3 rounded-3xl flex items-center"> <img src={edit} className='w-4 mx-2'/> Edit</button>
            <button onClick={Delete} className="hover:scale-110 duration-200 text-md m-2 float-right text-white bg-red-700 py-1 px-3 rounded-3xl flex items-center"><img src={del} className='w-4 mx-2'/> Delete</button>
            </div>
        </div>
    </div>
        }
    </div>
  )
}

export default Product