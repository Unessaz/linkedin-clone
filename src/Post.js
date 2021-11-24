import React , {useState , useEffect} from 'react'
import './Post.css'
import Avatar from '@mui/material/Avatar'
import Retweet from '@mui/icons-material/Send'
import Like from '@mui/icons-material/ThumbUp'
import Share from '@mui/icons-material/Shortcut'
import Reply from '@mui/icons-material/ModeCommentOutlined';
import More from '@mui/icons-material/MoreHoriz';
import { connect } from 'react-redux';
import db from './firebase'
import Comment from './Comment'
import firebase from 'firebase'
import ReactTimeAgo from 'react-timeago'

function Post( {id , likes , avatar , name , email , text , image , date , user , video , data}) {

   const [isdeleted, setisdeleted] = useState(false)
   const [iscomment, setiiscomment] = useState(false)
   const [cmntval, setcmntval] = useState('')
   const [comments, setcomments] = useState([])

   useEffect(() => {
      let didCancel = false;
      db.collection('comments').orderBy('date' , 'desc').onSnapshot( snapshot => (
         setcomments(snapshot.docs.map( doc =>  doc ))
        ))

        return () =>{
            didCancel = true;
        }
  }, [])
 
   const commenthndl = () => {
      if( !iscomment ){
         setiiscomment(true) 
      } else{
         setiiscomment(false)
      }
     
   }

   const commentSend = () => {
      db.collection('comments').add({
        commentid : id ,
        comment : cmntval ,
        username : user.displayName,
        avatar : user.photoURL,
        email : user.email,
        date : firebase.firestore.FieldValue.serverTimestamp(),
      })
      setcmntval('')
    
      
         
   }
   

   const morehndlr = () => {
      if(user.displayName === name) {
         if( isdeleted === false){
            setisdeleted(true)
         } else{
            setisdeleted(false)
         }
      }


      
   }
   
   const deletehandler = () => {
      db.collection('articles').doc(id).delete();
      
   }
    return ( 
<div className='post' >
         <div className='post-header'>
            <div className='post-name'>
               <Avatar src={avatar} sx={{ width: 48, height: 48 }} />
               <div>
               <h3> {name} </h3>
               <span > {email} </span>
               <span > <ReactTimeAgo date={ date && date.toDate().getTime() } /> </span>
               </div>
            </div>  
            <div>
            <More onClick={morehndlr}/>
            <button className={isdeleted === true ? 'delete-btn-blck delete-btn' : 'delete-btn'} onClick={deletehandler} > Delete </button>
            </div> 
            
         </div>

        <div className='post-caption'>
         <p>  {text} </p>
        </div>

        <div className={` ${image ? 'post-img ': 'post-without' } `}>
        { image === '' ? null :  <img src={image} alt='Wrong Url' />   }
        { video === '' ? null :  <video src={video} width='100%' controls='controls'> </video> }
        </div>

        <div className='post-footer'>

           <div className='tweet-like'> <Like fontSize='small' />
           <span   className='numbrs'>  Like   </span>
             </div> 
          <div onClick={commenthndl} className='tweet-reply'> <Reply fontSize='small'/>
           <span className='numbrs'> Comment  </span>
             </div>          
          <div  className='tweet-share'>  <Share fontSize='small' />  
          <span className='numbrs'> Share  </span>
            </div> 
          <div className='tweet-retweet'> <Retweet fontSize='small' /> 
          <span className='numbrs'> Send  </span>
              </div> 
           </div>
         { iscomment && <div className='comment-box' >
           <Avatar  src={user.photoURL} />
           <div> 
           <textarea value={cmntval} onChange={ e => setcmntval( e.target.value)}  placeholder='Add a comment ' >
           </textarea>
           <button onClick={commentSend} disabled={cmntval.length === 0 ? true : false}  > Post </button>
           </div>
          </div>}
          <div className='comments'>
             {comments.map( ( doc ) => (
                doc.data().commentid === id ?
               <Comment
                 username={doc.data().username}
                 avatar = {doc.data().avatar}
                 comment ={doc.data().comment}
                 date = {doc.data().date} 
                 email ={doc.data().email}
                 commentid ={doc.id}
                 key={doc.id}
               />
               : null
               
             ))}         
          </div>
        </div>
    )
}

const mapStateToProps = state => {
   return {
       user: state.userState.user
   }
 }
 const mapdispatchToProps = dispatch => ({})

export default connect(mapStateToProps ,mapdispatchToProps ) (Post)
