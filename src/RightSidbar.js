import React , { useEffect , useState } from 'react'
import './Right-sidebar.css'
import Avatar from '@mui/material/Avatar'
import ContactSupportSharpIcon from '@mui/icons-material/ContactSupportSharp';
import AddIcon from '@mui/icons-material/Add';
import Chats from './Chats';
import db from './firebase'
import { connect } from 'react-redux'
import Chat from './Chat'

function RightSidbar({user}) {
   

    return (
        <div className='right-sidebar'>
           <div className='follow-part'>
              <div>
                  <h2> Add to your feed</h2>
                  <ContactSupportSharpIcon/>
              </div>
              <div>
                  <div>
                  <Avatar/>
                  <div>
                  <h3> Elon Frank </h3>
                  <div>
                      <AddIcon/>
                      <span> Follow </span>  
                       </div>
                  </div>
                  </div>
                 

                  <div>
                  <Avatar/>
                  <div>
                  <h3> MAleny Sohrty </h3>
                  <div>
                      <AddIcon/>
                      <span> Follow </span>  
                       </div>
                  </div>
                  </div>

                  <div>
                  <Avatar/>
                  <div>
                  <h3> Gleen Smith </h3>
                  <div>
                      <AddIcon/>
                      <span> Follow </span>  
                       </div>
                  </div>
                  </div>

              </div>
           </div>
           <div className='photo-part'>
              <img src='https://static-exp1.licdn.com/scds/common/u/images/promo/ads/li_evergreen_jobs_ad_300x250_v1.jpg'/>
           </div>
           
        </div>
    )
}
const mapStateToProps = state => {
    return {
        user: state.userState.user
    };
  };

export default connect(mapStateToProps) (RightSidbar)
