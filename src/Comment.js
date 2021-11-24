import React , {useState} from 'react'
import More from '@mui/icons-material/MoreHoriz';
import Avatar from '@mui/material/Avatar'
import './comment.css'
import ReactTimeAgo from 'react-timeago'
import { connect } from 'react-redux';
import db from './firebase'

function Comment({comment , username , avatar , email , date , user , commentid}) {

    const [isdeleted, setisdeleted] = useState(false)

    const morehndlr = () => {
        if(user.displayName === username) {
           if( isdeleted === false){
              setisdeleted(true)
           } else{
              setisdeleted(false)
           }
        }}
        
        const deletehandler = () => {
            db.collection('comments').doc(commentid).delete();
            setisdeleted(false)
         }

    return (

        <div className='comment'>
               <Avatar src={avatar}/>
               <div>
                  <div>
                      <div>
                       <h4> {username}  </h4>
                       <span> {email} </span>
                      </div>
                      <div>
                       <span> <ReactTimeAgo date= {date && date.toDate().getTime()} /> </span>        
            <More onClick={morehndlr}/>
            <button className={isdeleted === true ? 'delete-btn-blck delete-btn' : 'delete-btn'} onClick={deletehandler} > Delete </button>       
                      </div>
                  </div>
                  <div>
                  <p> {comment} </p>
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
  export default connect(mapStateToProps ,mapdispatchToProps ) (Comment)
