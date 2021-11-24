import React, { useEffect } from 'react'
import './profile.css'
import { connect } from 'react-redux'
import HomeHeader from './HomeHeader'
import Chatting from './Chatting'
import ProfileContent from './ProfileContent'



function Profile({user}) {


  
  useEffect(() => {
    document.title = `${user?.displayName} | Linkedin`
}, [])
     
    return (

        <div >
           <HomeHeader/>
           <ProfileContent/>
           <Chatting/>
         </div>
    )
}

const mapStateToProps = state => {
    return {
        user: state.userState.user
    };
  };

export default connect(mapStateToProps) (Profile) 
