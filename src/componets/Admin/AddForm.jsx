import React from 'react'

const AddForm = (props) => {

  // const url = 'http://127.0.0.1:8000/'
  const url = 'https://techfnatic.pythonanywhere.com/'



const PostApi = async (f)=>{
    f.preventDefault()
    const form = new FormData()
    form.append('title',f.target[0].value)
    form.append('content',f.target[1].value)
    form.append('img',f.target[2].files[0])

    const response = await fetch(url+'api/product/',{
    method:'POST',
    body:form
  })

  if(response.status >= 200){
    props.fun(false)
    props.api()
    alert('Product added')
  }
  
}



  return (
    <div className='fixed w-full h-full border-4 bg-white bg-opacity-70 z-50'>
    <div className="bg-white border-2 border-red-400 fixed w-auto top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] shadow-2xl shadow-gray-500 rounded-xl ">
    <h1 id="products" className="text-center text-lg font-bold m-2 mt-4">- New Product -</h1>

    <form onSubmit={PostApi} className="text-black p-3" >
        
        <center>
            <input type="text" className="border-2 border-gray-400 rounded-xl p-2 m-2" placeholder="Title" name="title"/>
            <br/>
            <textarea className="h-44 w-64 border-2 border-gray-400 rounded-xl p-1 m-2" placeholder="Content" name="content"></textarea>
            <br/>
            {/* <lebel>Image : </lebel> */}
            <input type="file"  className="m-2" name="img"/>
            <br/>
            <input type="submit"  value="Add" className="text-white border-2 m-2 duration-100 hover:scale-105 ease-linear border-green-600 bg-green-700 py-2 px-8 rounded-3xl"/>
            <input type="reset" onClick={()=> props.fun(false)}  value="Cancel" className="bg-white-700 py-2 px-8 border-2 m-2 duration-100 hover:scale-105 ease-linear border-green-600 rounded-3xl"/>
    
        </center>

    </form>


</div>

    </div>
  )
}

export default AddForm