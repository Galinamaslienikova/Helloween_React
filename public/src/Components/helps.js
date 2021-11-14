import { useEffect, useState } from "react"
import { getUsersName } from "./api"


export function Sorting({sortFunction,value}){
    return(
        <label> sort by: 
            <select onChange={sortFunction} value={value}>
                <option value='default'>default</option>
                <option value='userName'>by user name</option>
                <option value="title">by title</option>
            </select>
        </label>
    )
}

export function SearchText({onInputFunction,value}){
    return(
        <label> search: 
            <input value={value} type='text'  placeholder='begin to type' onChange={onInputFunction} />
        </label>
    )
}
export function FilterText({onFilter,filterValue}){
    const[users,setUsers]=useState([])
    useEffect(()=>{
        getUsersName()
        .then(data=>{
            setUsers(data)
        })
    })

    let res=users.map((element)=>{
        return <option value={element.name} key={element.id}>{element.name }</option>
    })
    
    return(
        <label> filter by user name: 
        <select onChange={onFilter} value={filterValue}  >
            <option value=''>'_______________'</option>
            {users.length>0?res:''}
        </select>
        </label>
    )
}
