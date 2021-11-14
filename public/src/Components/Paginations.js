import { Link } from "react-router-dom"


export default function Paginations({numberP,next,counts,pages,prev}){
    return(
        <div className="paginations">
           <Link  to={`/page${counts}`}> <button  disabled={counts===0?true:false} onClick={prev}>Prev</button></Link>
            <button disabled className='isActive' >{counts+1}</button>
            <Link  to={`/page${counts+2}`}><button className={counts>(pages-2)?"noButton":''}   onClick={()=>numberP((counts+1)*10,(counts+2)*10)}>{counts+2}</button></Link>
            <Link  to={`/page${counts+3}`}><button  className={counts>(pages-3)?"noButton":''}  onClick={()=>numberP((counts+2)*10,(counts+3)*10)}>{counts+3}</button></Link>
            <Link  to={`/page${counts+2}`}><button disabled={counts===pages-1?true:false} onClick={next}>Next</button></Link>
        </div>
    )
}