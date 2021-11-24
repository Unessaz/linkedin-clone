import React from 'react'
import './LeftSidebar.css'
import CameraEnhanceIcon from '@mui/icons-material/CameraEnhance';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import AddIcon from '@mui/icons-material/Add';
import { connect } from 'react-redux';

function UserProfile(props) {
   
    return (
        <div className='left-sidebar'>
            <div className='left-card'>
           <div className='background'></div>
           <a>
               <div className='photo' style={{color: 'red', backgroundImage : `url(${props.user?.photoURL})`}}>  </div>
               <div className='greet'>  {props.user && props.user.displayName ? props.user.displayName : 'there'  }
                </div>
           </a>
              <a>  
               <div className='add'> Add Photo </div>
                </a>       
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

export default connect(mapStateToProps ,mapdispatchToProps ) (UserProfile)
