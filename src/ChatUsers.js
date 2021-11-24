import React, { useState , useEffect} from 'react'
import './chat.css'
import db from './firebase'
import { connect } from 'react-redux'
import Avatar from '@mui/material/Avatar'
import ReactTimeAgo from 'react-timeago'

function ChatUsers({username , email , user, id , pdp , LastSeen }) {
    const [chatuser , setchatuser] = useState([])
    
    
    
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
    
     const send = () => {
        const femail = chatuser.filter( ({users }) => users[1] === email && users[0] === user?.email  ).map( ({openf}) => openf.email ) 
        const semail = chatuser.filter( ({users }) => users[0] === email && users[1] === user?.email  ).map( ({opens}) => opens.email ) 
        const cid = chatuser.filter( ({users , id}) => users[1] === email && users[0] === user?.email  ).map(({id}) => id)
        const sid = chatuser.filter( ({users , id}) => users[0] === email && users[1] === user?.email  ).map(({id}) => id)
        
          
          if(semail[0] === user?.email){
            db.collection('chats').doc(sid[0]).update({
                opens : {
                    email: user.email ,
                    statue : true

                  }
            })
        }
        if(femail[0] === user?.email){
            db.collection('chats').doc(cid[0]).update({
                openf : {
                    email: user.email ,
                    statue : true

                  }
            })
        }
         

         if( !chatuser.filter( ({users}) => users[1] === email && users[0] === user.email ).length > 0 &&
          !chatuser.filter( ({users}) => users[0] === email && users[1] === user.email ).length > 0
         )
        { db.collection('chats').add({ 
             users: [user.email , email],
             openf : {
               email: user.email , 
               statue : false
             },
             opens : {
                email: email , 
                statue : false
              }
              
         })
         
        } 
        
     }
     
     
    return (

        <div onClick={send} className='users'>
            <Avatar src={pdp} sx={{ width: 36, height: 36 }} />
            <div> 
            <span > {username} </span>
            <span > {email} </span>
            </div>
            <span > <ReactTimeAgo date={ LastSeen && LastSeen.toDate().getTime() } /> </span>
            
         </div>
    )
}

const mapStateToProps = state => {
    return {
        user: state.userState.user
    };
  };

export default connect(mapStateToProps) (ChatUsers) 
