import React, { useEffect, useState  , useRef} from 'react'
import db from './firebase'
import { connect } from 'react-redux'
import firebase from 'firebase'
import ChatScreen from './ChatScreen'
import CloseIcon from '@mui/icons-material/Close';
import './chat.css'
import SendIcon from '@mui/icons-material/Send';

function Chat({id , user , open , opens , openf}) {
     const [msg , setmsg] = useState('')
     const [messages , setmessages] = useState([])
     const [userseen , setuserseen] = useState([])
     const [chatuser , setchatuser] = useState([])
     const messageRef = useRef(null)
     const messagesRef = useRef(null)
     
     const scrollToBottom = () => {
      messageRef.current?.scrollIntoView({ behavior : 'smooth'})
      messagesRef.current?.scrollIntoView({ behavior : 'smooth'})
     }

     useEffect(() => {
      scrollToBottom()
  }, [messages , opens , openf ])

    
     useEffect(() => {
        
      let usubscribe = false
      if(!usubscribe){
         db.collection('chats').onSnapshot( snapshot => (
             setchatuser(snapshot.docs.map( doc =>  ({
                 id : doc.id ,
                 ...doc.data()})))
           ))}

        return () => {
            usubscribe = true
          }
     }, [])
     

     useEffect(() => {

      let usubscribe = false
      if(!usubscribe){
        db.collection('chats').doc(id).collection('messages').orderBy('date' , 'asc').onSnapshot( snapshot => (
            setmessages(snapshot.docs.map( doc => ({
              id : doc.id ,
              ...doc.data()} ) ))
          ))}

          return () => {
            usubscribe = true
          }

    }, [])

    useEffect(() => {

      let usubscribe = false
      if(!usubscribe){ 
      db.collection('users').onSnapshot( snapshot => (
        setuserseen(snapshot.docs.map( doc =>  doc.data() )) 
        ))}

        return () => {
          usubscribe = true
        }

  }, [])

    
    

     const send = () => {
      const uid = userseen.filter(({id}) => id === user.uid).map(({id}) => id)
      db.collection('chats').doc(id).collection('messages').add({
          text : msg,
          date : firebase.firestore.FieldValue.serverTimestamp(),
          name : user?.displayName ,
          email: user?.email,
          pdp : user?.photoURL,
      })
      db.collection('users').doc(uid[0]).update({
        LastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      })
      setmsg('')
     }
     
    const close = () => {
      if(openf.email === user?.email){
        db.collection('chats').doc(id).update({
          openf : {
              email: user?.email ,
              statue : false

            }
        })
    }
    if(opens.email === user?.email){
      db.collection('chats').doc(id).update({
        opens : {
            email: user?.email ,
            statue : false

          }
      })
  }
   
    }

    

    return (
      
        <>

            { openf?.email === user?.email ?
             openf?.statue && <div className='chat-screen'>
              <div className='chat-screen-header'>
              <div>
              <span> Messaging </span>
              </div>
              <CloseIcon onClick={close}/>

               </div>
               <div className='chatting-wrp'>
                 
              {messages.map( ({text , date , email , name , pdp , id}) =>(
            <ChatScreen
              text ={text}
              date ={date}
              name ={name}
              email={email}
              pdp={pdp}
              key={id}
            />)
            )}
            <div ref={messageRef}></div>
             </div>
            <div className='send-msg'> 
            <textarea placeholder='Write a Message' value={msg} onChange={ e => setmsg(e.target.value)}> </textarea> 
            <button disabled={msg.length === 0 ? true : false} onClick={send} > <SendIcon /> </button>  
            </div>
             
           </div> : opens?.email === user?.email ?  opens?.statue && <div className='chat-screen'>
              <div className='chat-screen-header'>
              <div>
              <span> Messaging </span>
              </div>
              <CloseIcon onClick={close}/>

               </div>
               <div  className='chatting-wrp'>
              {messages.map( ({text , date , email , name , pdp, id}) =>(
            <ChatScreen
              text ={text}
              date ={date}
              name ={name}
              email={email}
              pdp={pdp}
              key ={id}
            />)
            )}
             <div ref={messagesRef}></div>
             </div>
            <div className='send-msg'> 
            <textarea placeholder='Write Message' value={msg} onChange={ e => setmsg(e.target.value)}> </textarea> 
            <button disabled={msg.length === 0 ? true : false} onClick={send} > <SendIcon /> </button>  
            </div>
             
           </div> : null }

           

        </>
    )
}

const mapStateToProps = state => {
    return {
        user: state.userState.user
    };
  };

export default connect(mapStateToProps) (Chat)  
