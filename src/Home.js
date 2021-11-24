import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Feeds from './Feeds'
import HomeHeader from './HomeHeader'
import db from './firebase'
import firebase from 'firebase'
import Chatting from './Chatting'

function Home({user}) {
    
   useEffect(() => {
    let usubscribe = false
      if(!usubscribe){
       db.collection('users').doc(user?.uid).set({
        username: user?.displayName,
        email : user?.email,
        LastSeen : firebase.firestore.FieldValue.serverTimestamp() ,
        id : user?.uid,
        pdp : user?.photoURL
      } , {merge : true })  
    
  }
    return () => {
            usubscribe = true
          }
     
   }, [user])
  
   useEffect(() => {
    document.title = 'Feed | Linkedin'
}, [])

  
    return (
        <div className='home'>
          
          <HomeHeader/>
          <Feeds/>
          <Chatting/>
          
        </div>
    )
}

const mapStateToProps = state => {
  return {
      user: state.userState.user
  };
};

export default connect(mapStateToProps) (Home)