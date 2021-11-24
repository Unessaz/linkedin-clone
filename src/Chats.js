
import React from 'react'
import './chat.css'
import { connect } from 'react-redux'
import ChatUsers from './ChatUsers'

function Chats({username , pdp , email , LastSeen , user , id }) {
  
   
    return (
        <div >
         <ChatUsers 
           username={username}
           email ={email}
           id ={id}
           pdp={pdp}
           LastSeen = {LastSeen}
           />
           
        </div>
         
         
        
        
    )
}
const mapStateToProps = state => {
    return {
        user: state.userState.user
    };
  };

export default connect(mapStateToProps) (Chats)
