import React from 'react'
import './LeftSidebar.css'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import AddIcon from '@mui/icons-material/Add';
import { connect } from 'react-redux';

function LeftSidebar(props) {
   
    return (
        <div className='left-sidebar'>
            <div className='left-card'>
           <div className='background'>
           </div>
           <a>
               <div className='photo' style={{color: 'red', backgroundImage : `url(${props.user?.photoURL})`}}>  </div>
               <div className='greet'> Hi Welcome {props.user && props.user.displayName ? props.user.displayName : 'there'  }
                </div>
           </a>
              <a>  
               <div className='add'> Add Photo </div>
                </a>
                <div className='user-info'>
                <div>
                    <a>
                        <span> Connections</span>
                        <span> Grow Your Networks</span>
                    </a>
                    <PersonAddIcon/>
                </div>
                <div>
                
                <TurnedInIcon/>
                    <a>
                        <span> Try Premium for free</span>    
                    </a>    
                </div>
                <div>
                <TurnedInIcon/>
                    <a>
                        <span> My Items</span>    
                    </a>    
                </div> 
                </div>        
            </div>

         <div className='user-int'>
            <div>
               <a> <div> Groups</div> </a>  
               <a> <div> Events</div> <AddIcon/> </a> 
               <a> <div> Followed Hashtag</div> </a> 
            </div>
         <div>
             <a> Discover more</a>
         </div>
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

export default connect(mapStateToProps ,mapdispatchToProps ) (LeftSidebar)
