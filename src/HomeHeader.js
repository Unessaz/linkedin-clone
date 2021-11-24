import React from 'react'
import './HomeHeader.css'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import Search from '@mui/icons-material/Search'
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import TextsmsIcon from '@mui/icons-material/Textsms';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ViewComfyIcon from '@mui/icons-material/ViewComfy';
import Networks from '@mui/icons-material/PermIdentity';
import { Avatar } from '@mui/material';
import { connect } from 'react-redux';
import {signOutApi} from './Actions/index'
import {useHistory}  from 'react-router-dom'
import ChatUsers from './ChatUsers';

function HomeHeader(props) {
    const history = useHistory()
    const toprofile = () => {
      
       history.push('/profile')
    }
    const tohome = () => {
      
        history.push('/')
     }
      
    return (
        <div className='home-header'>
        <nav>
            <div className='header-logo'>
              <LinkedInIcon/>
              <div>
              <Search/>
              <input type='text'placeholder='Search' />
             </div>
            </div>
            <div className='header-info'>
            <div className='search-mbl'>
            <Search />        
           </div>   
            <div onClick={tohome} className={ window.location.pathname === '/' ? 'active' : ''}>
            <HomeIcon/>
            <span> Home </span>
           </div>
           <div>
            <Networks/>
            <span> My Networks </span>
           </div>
           <div>
            <TextsmsIcon/>
            <span> Messaging </span>
            
           </div>
           <div>
            <WorkIcon/>
            <span> Jobs </span>
           </div>
           <div>
            <NotificationsIcon/>
            <span> Notifications </span>
           </div>
           <div  className={ window.location.pathname === '/profile' ? 'active signout-wrp' : 'signout-wrp'}>
             {props.user && props.user.photoURL ?
             <Avatar onClick={toprofile} src={props.user.photoURL} sx={{ width: 24, height: 24 }} /> 
             :  <Avatar onClick={toprofile} src='' sx={{ width: 24, height: 24 }} />}
           
            <span onClick={toprofile} > {props.user && props.user.displayName ?
                    props.user.displayName : 'Me' } </span>
            <button onClick={() => props.signOut()} className='sign-out'> Sign Out </button>
           </div>
           <div>
            <ViewComfyIcon/>
            <span> Work </span>
           </div>

            </div>
            
         </nav>
        </div>

    )
}

const mapStateToProps = state => {
    return {
        user: state.userState.user
    }
  }
  const mapdispatchToProps = dispatch => ({
      signOut : () => dispatch(signOutApi())
  })
export default connect(mapStateToProps ,mapdispatchToProps )(HomeHeader)

