import { useEffect, useState } from "react"
import { getUser } from "./api"


export default function OnePost({searchText='',title,userId,text,textShort,userName1}){
    const [userName,setUserName]=useState(false)
    const [textSize,setTextSize]=useState(true)
    const [show,setShow]=useState(true)
    useEffect(()=>{
        
        if(!userName1){
            getUser(userId)
            .then(data=> setUserName(data.name))
        }
        if(searchText.length>1){
       setTextSize(true)
        }
        else{setTextSize(false)}
    },[searchText.length,userName1,userId])
    //show/hide post
    function moreText(){

       if(textSize){
           setTextSize(false)
       }else{setTextSize(true)}
    }
    function hide(){
       show?setShow(false):setShow(true)
    }
   //select text
    function writeText(elem){
        if(searchText.length>1){
            let res=elem.search(searchText)
            if (res>0){return <>{elem.slice(0,res)}<span className='searchText'>{searchText}</span>{elem.slice(res+searchText.length,elem.length)}</>}else{
                return<>{elem}</>
            }
            
        }else{
            return<>{elem}</>
        }
    }
    return(
        <>
            {userName||userName1?
                <div className='onePostCont'>
                    {show?<></>:<span className='buttonSpan' onClick={hide}>Show</span>}
                    <div className={show?'onePost':'noSee'}>
                        <p><span className='title'>Title: </span>{writeText(title)}</p>
                        <p><span className='title'>User Name: </span>{userName1?writeText(userName1):writeText(userName)}</p>
                    <p>  
                        {textSize? <><span className='title'>Post text: </span>{writeText(text)} <span className='buttonSpan' onClick={moreText}>Less...</span></>:<><span className='title'>Post short text: </span>{textShort} <span className='buttonSpan' onClick={moreText}>More...</span></>}
                    </p>
                    <span className='buttonSpan' onClick={hide}>Hide</span>
                    </div>
                </div>:
                <div className='onePost'>Loading</div>
            }
        </> 
        
    )
}