import React from 'react'
import { connect } from 'react-redux' 
import Avatar from '@mui/material/Avatar'
import moment from 'moment'
function ChatScreen({text , date , email , user , name , pdp}) {

    
    return (
        <div  className={` ${ pdp !== user?.photoURL ? 'text-wrp-reciever' : 'text-wrp'}`} >
        { pdp !== user?.photoURL &&   <Avatar src={pdp} sx={{ width: 24, height: 24 }} /> }  
        <div className='text-screen'>
        {name !== user?.displayName &&  <span > {name}  </span> } 
        <p className={ email === user?.email ? 'sender' : 'reciever' }>
            {text}
            <span> {date ? moment(date && date.toDate().getTime()).format('LT') : '....'} </span>
        </p>
        
        </div>
        </div>
       

    )
}

const mapStateToProps = state => {
    return {
        user: state.userState.user
    };
  };

export default connect(mapStateToProps) (ChatScreen)
