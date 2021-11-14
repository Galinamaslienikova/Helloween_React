
import React from "react";
import Bat from "../images/bat_PNG47.png";
let int
export class HappyHellowin extends React.Component{
   constructor(props){
        super(props)
        this.state={
            mouses:[],
            interval:false,
        }
    }
    componentDidMount(){
        window.addEventListener('resize',this.screenResize)
        let arr=[]
        for(let i=1;i<15;i++){
            arr.push({
                x: window.innerWidth / 15 * i,
                y: Math.floor(window.document.body.offsetHeight * Math.random()),
                yDirection: Math.random() * 2 + 1,
                xDirection: 0,
            })
        }
        this.setState({
            mouses:arr
        })
        this.falling()
    }
    screenResize=()=>{
        if(window.innerWidth<740){
            this.stop()
        }
    }
    falling=()=>{
        int=setInterval(()=>{
            let arr=[]
            this.state.mouses.forEach((item)=>{
             item.x+=item.xDirection
               if(item.x+97>=window.innerWidth){
                item.x=1
               }
             item.y+=item.yDirection
             if (item.y+52 >= window.document.body.offsetHeight) {
                 item.y = 1;
                 item.x = Math.floor(window.innerWidth * Math.random())
                
             }
             arr.push(item)
            })
            
            this.setState({
                mouses:arr
            })
        },17
        )
    }
    //left/right fly
    moveBats=(e)=>{
        let direction;
            let halfViewport = window.innerWidth / 2;
            if (e.clientX < halfViewport) {
                direction = halfViewport / e.clientX * -1;
                if (direction < -3) {
                    direction = -3;
                }
            } else {
                let clientXReverse = halfViewport - (e.clientX % halfViewport);
                direction = halfViewport / clientXReverse;
                if (direction > 3) {
                    direction = 3;
                }
            }
            let arr=[]
            this.state.mouses.forEach((item)=>{
            item.xDirection = direction
            arr.push(item)
            })
            this.setState({
                mouses:arr
            })
    }
    //stop bats
    stop=()=>{
        this.state.interval?this.falling():clearInterval(int)
        this.setState({
            interval:!this.state.interval
        })
    }
    render(){
        let res=this.state.mouses.map((item)=>{
            return <img className='bats' alt='noImg' style={{width: 75, top:item.y + 'px', left:item.x +'px'}} key={item.y*Math.random()} src={Bat}/>
        })
        return(
            <div onMouseMove={this.moveBats} >
                <div className='onOff' onClick={this.stop}>{this.state.interval?"FLY BATS":"STOP BATS"}</div>
                {res}
                {this.props.children}
                
            </div>
        )
    }
    
}