import React from 'react';
import { withRouter } from 'react-router';
import { getPost, getUser } from './api';
import { FilterText, Sorting,SearchText } from './helps';
import OnePost from './OnePost';
import Paginations from './Paginations';
import Pumpkin1 from "../images/pumpkin1.png";
import Pumpkin2 from "../images/pumpkin2.png";
import Pumpkin3 from "../images/pumpkin3.png";

let page=0
 class Posts extends React.Component{
    constructor(props){
        super(props)
        this.state={
            base:[],
            sortPosts:[],
            post:false,
            pages:false,
            sort:'default',
            search:'',
            filter:'',
            filterBase:[]
        }
    }
    componentDidMount(){
        if(this.props.match.params.page){
            page=(this.props.match.params.page)*1-1
        }
        getPost()
        .then(data=>{
            this.setState({
               base:data,
                post:data.slice(page*10,page*10+10),
                pages:Math.ceil(data.length/10),
                sortPosts:data
            })
            data.forEach(element => {
                getUser(element.userId)
                .then(res=>element.userName=res.name)
            });
        } ) 
    }
    home = () => {
        this.props.history.push("/page1");
          };
    //paginations
    loadPage(first,last){
        this.setState({
            post:this.state.sortPosts.slice(first,last)
        })
    }
    nextP=()=>{
        page=page+1
        this.loadPage(page*10,page*10+10) 
    }
    prevP=()=>{
        page=page-1
        this.loadPage(page*10,page*10+10)  
    }
    numberPage=(first,last)=>{
        page=first/10
        this.loadPage(first,last)  
    }
    changeSort=(e)=>{
        this.setState({
            sort:e.target.value
        })
        this.sortState(this.state.sortPosts,e.target.value)
    }
    //sort
    sortState=(arr,title)=>{
        this.home()
        let arrSort=arr
        if(title==='title'||title==='userName'){
            arrSort.sort(function (a, b) {
                if (a[title].toLowerCase() > b[title].toLowerCase()) {
                  return 1;
                }
                if (a[title].toLowerCase() < b[title].toLowerCase()) {
                  return -1;
                }
                if (a[title].toLowerCase() === b[title].toLowerCase()) return 0;}
            );
        }
        if(title==='default'){
            arrSort.sort(function (a, b) {
                if (a.id > b.id) {
                  return 1;
                }
                if (a.id < b.id) {
                  return -1;
                }
                if (a.id === b.id) return 0;}
            );
        }  
        this.setState({
            sortPosts:arrSort,
            post:arrSort.slice(0,10),
            pages:Math.ceil(arrSort.length/10),
        }) 
        page=0
    }
   
    //search
   searchFunction=(e)=>{
       if(e.target.value.length===1){
           this.home()
           page=0
           this.setState({
               pages:1
           })
       }
        this.setState({
            search:e.target.value
        })
        if(e.target.value.length>1){
            page=0
            let arr=[]
            this.state.sortPosts.forEach((element)=>{
                   let res1=element.title.search(e.target.value)
                   let res2=element.userName.search(e.target.value)
                   let res3=element.body.search(e.target.value)
                if(res1>0||res2>0||res3>0){                  
                    arr.push(element)
                }
                
            })
            this.setState({
                sortPosts:arr,
                post:arr.slice(0,10),
                pages:Math.ceil(arr.length/10)===0?1:Math.ceil(arr.length/10)===0
            })
        }else{
            this.setState({
                sortPosts:this.state.filterBase.length>0?this.state.filterBase:this.state.base,
                post:this.state.filterBase.length>0?this.state.filterBase.slice(0,10):this.state.base.slice(0,10),
                pages:Math.ceil(this.state.base.length/10),
            }) 
        }
    }
    
    //filter
    filterFunction=(e)=>{
        this.setState({
            filter:e.target.value,
            search:''
        })
        if(e.target.value===''){
                this.setState({
                    filterBase:[],
                    sortPosts:this.state.base,
                    post:this.state.base.slice(0,10),
                    pages:Math.ceil(this.state.base.length/10),
                }) 
        }else{
            let arr=[]
            this.state.base.forEach((element)=>{
            if(element.userName===e.target.value){
                arr.push(element)
            }
        })
        
        this.setState({
            sortPosts:arr,
            filterBase:arr,
            post:arr.slice(0,10),
            pages:Math.ceil(arr.length/10)
        })
        }
        page=0
        this.home()
    }
    render(){
        let res
       if(this.state.post){
        res=this.state.post.map((item)=>{
            return <OnePost searchText={this.state.search}  key={item.id} userId={item.userId} userName1={item.userName} title={item.title} textShort={item.body.slice(0,75)} text={item.body} />
        })}
        
        return(
            <div className='postsCont'>
                <img className='pumpking1' alt='noImg' src={Pumpkin1}/>
                <img className='pumpking2' alt='noImg' src={Pumpkin2}/>
                <img className='pumpking3' alt='noImg' src={Pumpkin3}/>
                <div className='searchCont'>
                    <Sorting  sortFunction={this.changeSort} value={this.state.sort}/>
                    <SearchText value={this.state.search} onInputFunction={this.searchFunction}/>
                    <FilterText filterValue={this.state.filter} onFilter={this.filterFunction}/>
                </div>
                <div className='posts'>
                    {this.state.post?res:<p>Loading</p>}
                    <Paginations numberP={this.numberPage}   prev={this.prevP} counts={page} pages={this.state.pages} next={this.nextP}/>
                </div>
            </div>
        )
    }
}
export default withRouter(Posts)