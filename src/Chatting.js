import React , { useEffect , useState } from 'react'
import './Chatting.css'
import Avatar from '@mui/material/Avatar'
import Chats from './Chats';
import db from './firebase'
import { connect } from 'react-redux'
import Chat from './Chat'

function Chatting({user}) {
    
    const [users, setusers] = useState([])
    const [chatuser , setchatuser] = useState([])
    const [openchats , setopenchats] = useState('chats')
   
   
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
        db.collection('users').orderBy('LastSeen' , 'desc').onSnapshot( snapshot => (
            setusers(snapshot.docs.map( doc =>({ 
                 id : doc.id ,
                  ...doc.data()})
                 ))
          ))
            }
            
          return () => {
            usubscribe = true
          }
    }, [])

    const openChat = () => {
        if( openchats === 'chats') {
            setopenchats('open-chats')
        } else{
            setopenchats('chats')
        }
    }

   

    return (
        <div className='Chatting'>
           <div className='chat-hnd-screen'>
            {chatuser.map(({opens , openf , id , users}) => (
              
              <Chat
              key={id}
              opens={opens}
              openf={openf}
              id={id}
              
              />
               
            ))}
            </div>

           <div className={openchats}>
           <div onClick={openChat} className='chat-header'>
            <Avatar src={user?.photoURL} sx={{ width: 28, height: 28 }}  />
            <span> Messaging </span>
            </div>
            { users.filter( (users) => users.email !==  user?.email  ).map( ({LastSeen , email , pdp , username , id}) => (
              <Chats
                username={username}
                LastSeen={LastSeen}
                email={email}
                pdp={pdp}
                id ={id}    
                key={id}
                         
               />
               
            ) )}
              
           </div>

           

        </div>
    )
}
const mapStateToProps = state => {
    return {
        user: state.userState.user
    };
  };

export default connect(mapStateToProps) (Chatting)
