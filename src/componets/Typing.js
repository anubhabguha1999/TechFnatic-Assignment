import React from 'react'
import { useState , useEffect } from 'react';
const Typing = (props) => {

    const [text, setText] = useState("")
const [fullText, setFullText] = useState(props.string)
const [index, setIndex] = useState(0)
const [timetype , settimetype] = useState(props.late)
const [pipe , setpipe] = useState('<b>|</b>')


useEffect(()=>{
    setTimeout(function(){
        if (pipe == '|'){
            setpipe('')
        }
        else{
            setpipe('|')
        }
    },400)
})
useEffect(() => {
    setTimeout(function(){
        if (index < fullText.length) {
            setTimeout(() => {
              setText(text + fullText[index])
              setIndex(index + 1)
            }, props.speed)
          }
          settimetype(2)
    },timetype)
}, [index])
  
    return (
        <div>
    {props.style == 'new' }
    <div className={props.style} >{<label dangerouslySetInnerHTML={{__html:text}} />}{props.pipe ? <b className='text-cyan-400'>{pipe}</b> : ''}<b className='text-cyan-400 text-md'>{props.extratext}</b></div>
    {/* <div className='text-left text-[13px]' >{<label dangerouslySetInnerHTML={{__html:text}} />}{props.pipe ? <b className='text-cyan-400'>{pipe}</b> : ''}<b className='text-cyan-400 text-md'>{props.extratext}</b></div> */}
    </div>
  )
}

export default Typing
//   <img src={logo} className='w-16'/>