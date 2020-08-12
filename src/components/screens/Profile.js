import React,{useEffect,useState,useContext} from "react";
import {UserContext} from '../../App'
export default function Profile() {
  const [mypics,setPics] = useState([])
  const [image , setImage] = useState("")

  const {state ,dispatch} = useContext(UserContext)
  useEffect(() => {
   fetch('https://waduddev.herokuapp.com/mypost',{
     headers:{
       "Authorization":"Bearer "+localStorage.getItem("jwt")
     }
   }).then(res=>res.json())
   .then(result=>setPics(result.mypost))
  }, [])
  useEffect(() => {
   if(image){
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "dmnt3xw4q");
    fetch("	https://api.cloudinary.com/v1_1/dmnt3xw4q/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        
        fetch('https://waduddev.herokuapp.com/updatepic',{
          method:"put",
          headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
          },
          body:JSON.stringify({
            pic:data.url
          })
        }).then(res=>res.json())
        .then(result=>{
          console.log(result)
          localStorage.setItem("user",JSON.stringify({...state,pic:result.pic}))
          dispatch({type:"UPDATEPIC",payload:result.pic})
          //window.location.reload()
        })
        
      })
      .catch((err) => console.log(err));
   }
  }, [image])
  const uploadPhoto = (file) =>{
    setImage(file)
   
  }
   return (
    <div style={{maxWidth:"550px",margin:"0px auto"}}>
      <div  style={{
            margin:"18px 0px",
            borderBottom:"1px solid grey"}}>
      <div style={{
            display:"flex",
            justifyContent:"space-around"}}>
        <div >
            <img style={{width:"160px",height:"160px",borderRadius:"80px"}} 
            src={state?state.pic:"loading"}/>
        </div>
        <div>
            <h4>{state?state.name:"loading"}</h4>
            <h4>{state?state.email:"loading"}</h4>
            <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                <h6>{mypics.length} posts</h6>
                <h6>{state?state.followers.length:"0"} followers</h6>
                <h6>{state?state.following.length:"0"} following</h6>
            </div>
        </div>
      </div>
      <div className="file-field input-field" style={{margin:"10px 0px 10px 52px"}}>
          <div className="btn #64b5f6 blue lighten-2">
            <span>Update Pic</span>
            <input type="file" onChange={(e) => uploadPhoto(e.target.files[0])} />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
     </div>
      <div className="gallery" >
        {
          mypics.map(items=>{
            return(
              <img className="item" src={items.photo} alt={items.title} key={items._id}/>
            )
          })
        }
      </div>
    </div>
  );
}
