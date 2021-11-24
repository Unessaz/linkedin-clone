import React from 'react'
import './PostModal.css'
import CloseIcon from '@mui/icons-material/Close'
import { Avatar } from '@mui/material'
import PhotoIcon from '@mui/icons-material/PhotoSizeSelectActual'
import VideoIcon from '@mui/icons-material/VideoLibrary';
import DescriptionIcon from '@mui/icons-material/Description';
import WorkIcon from '@mui/icons-material/Work';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {useState , useEffect , useRef } from 'react'
import { connect } from 'react-redux';
import {articlesApi} from './Actions/index'
import firebase from 'firebase'

 function PostModel({showmodal , modalHandler , user , postArticle }) {
     
    const [value, setvalue] = useState('')
    const [shareimg, setshareimg] = useState('')
    const [sharevid, setsharevid] = useState('')


    
    const handleimg = (e) => {
        const image = e.target.files[0];
        setshareimg(image)
        setsharevid('')
    }

    const handlevid = (e) => {
        const video = e.target.files[0];
        video.srcObject = window.stream
        setsharevid(URL.createObjectURL(video))
        setshareimg('')
    }

    
    
    useEffect(() => {
        if(showmodal === 'close'){
            setshareimg('')
            setvalue('')
            setsharevid('')
        }
    }, [showmodal])

    const postartc = (e) => {

        if(e.target !== e.currentTarget){
            return;
        }

        const payload = {
            image : shareimg ,
            video : sharevid,
            text : value ,
            user : user,
            date : firebase.firestore.Timestamp.now()
        }

        postArticle(payload)
        setshareimg('')
        setvalue('')
        modalHandler()

    }
    
    return (
        <>
        { showmodal === 'open' &&
        <div className='post-modal' >
            <div className='share-post'>
             <div> 
                 <h2> Create a Post </h2>
                 <CloseIcon className='close-icon' onClick={modalHandler}/>
             </div>
             <div> 
             {user && user.photoURL ?  <Avatar src={user.photoURL} sx={{ width: 48, height: 48 }} /> :
         <Avatar src=''  sx={{ width: 48, height: 48 }} /> }   
               {user && user.displayName ? <span> {user.displayName}  </span> : '' }  
             </div>
             <div>
             <textarea value={value}  placeholder='What Would You Talk About' onChange={(e) => setvalue(e.target.value)}></textarea>
             <input style={{display : 'none'}} type='file' accept='image/gif , image/png , image/jpeg  ' name='img' id='file' onChange={handleimg}  />
           {shareimg  && <img alt='' src={URL.createObjectURL(shareimg)} /> } 
           <input style={{display : 'none'}} type='file' accept='video/* ' name='video' id='filevid' onChange={handlevid}  />
         { sharevid && <video src={sharevid} width='100%' controls='controls' > not supported </video>}
             </div>
             <div> 
               <div>
               <label htmlFor='file'>  
               <PhotoIcon/>  
               </label> 
               <label htmlFor='filevid'> 
             <VideoIcon/>
             </label> 
             <WorkIcon/>
             <DescriptionIcon/>
             <EqualizerIcon/>
             <MoreHorizIcon/>
               </div>  
               <div>
               <button disabled={value.length === 0 ? true : false}
              className={ shareimg === '' && value.length === 0 ? 'disabled' : ''}
               onClick={ (e) => postartc(e)}  > Post </button>
               </div> 
            

             </div>
            </div>
            
        </div>
    }
    </>
    )
}

const mapStateToProps = state => {
    return {
        user: state.userState.user
    }
  }
  const mapdispatchToProps = dispatch => ({
      postArticle : (payload) => dispatch(articlesApi(payload)),
  })

export default connect(mapStateToProps ,mapdispatchToProps ) (PostModel)
