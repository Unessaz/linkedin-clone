import React , {useState} from 'react'
import Avatar from '@mui/material/Avatar'
import PhotoIcon from '@mui/icons-material/PhotoSizeSelectActual'
import VideoIcon from '@mui/icons-material/VideoLibrary';
import EventIcon from '@mui/icons-material/CalendarToday'
import ArticlIcon from '@mui/icons-material/FormatAlignRight';
import './Posts.css'
import PostModal from './PostModal'
import { connect } from 'react-redux';


function PostBox(props) {
    const [showmodal, setmodal] = useState('close')

    const modalHandler = () => {
        switch (showmodal) {
            case 'close':
                setmodal('open')
                break;
            case 'open':
                    setmodal('close')
                  break;            
            default:
                setmodal('close')
                break;
        }
    }
    

    return (
        <div  className='post-box'>
           
        <div className='post-inpt' onClick={modalHandler}>
        {props.user && props.user.photoURL ?  <Avatar src={props.user.photoURL} sx={{ width: 48, height: 48 }} /> :
         <Avatar src=''  sx={{ width: 48, height: 48 }} /> }      
        <button > Start a post  </button>         
        </div>  
        <div className='post-info'>
            <div > 
                <PhotoIcon/>
                <span> Photo </span>
            </div>
            <div> 
                <VideoIcon/>
                <span> Video </span>
            </div>
            <div> 
                <EventIcon/>
                <span> Event </span>
            </div>
            <div> 
                <ArticlIcon/>
                <span> Write article </span>
            </div>
        </div>
      <PostModal showmodal={showmodal} modalHandler={modalHandler}  />        
 </div>

    )
}

const mapStateToProps = state => {
    return {
        user: state.userState.user
    }
  }
  const mapdispatchToProps = dispatch => ({})

export default connect(mapStateToProps ,mapdispatchToProps ) (PostBox)
