export function getPost(){
   return fetch('https://jsonplaceholder.typicode.com/posts')
    .then((res) => res.json())
}
export function getUser(userId){
    return fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
     .then((res) => res.json())
 }
 export function getUsersName(){
    return fetch(`https://jsonplaceholder.typicode.com/users`)
     .then((res) => res.json())
 }
