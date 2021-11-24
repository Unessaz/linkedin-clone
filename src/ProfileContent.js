import React , {useState , useEffect} from 'react'
import RightSidbar from './RightSidbar'
import UserPosts from './UserPosts'
import UserProfile from './UserProfile'
import db from './firebase'
import { connect } from 'react-redux'

function ProfileContent({user}) {

    const [article, setarticle] = useState([])
    useEffect(() => {
        let didCancel = false;
        db.collection('articles').orderBy('date' , 'desc').onSnapshot( snapshot => (
            setarticle(snapshot.docs.map( doc =>  ({
                id: doc.id ,
                ...doc.data()

            }) ))
          ))

          return () =>{
              didCancel = true;
          }
    }, [])
      
      
    return (
        <div className='user-profile'>
            <div className='user-stuff'>
            <UserProfile/>
            {article.filter( ({email}) => email === user?.email ).map( ({id , text, avatar , image , name , email ,date , video }) => (
                <UserPosts
                id ={id}
                key ={id}
                text ={text}
                image = {image}
                avatar = {avatar}
                name = {name}
                email = {email}
                date = {date}
                video = {video}
                
                
                />
             ))}
            </div>
            <div className='user-side'>
            <RightSidbar/>
            </div>
            
           
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user: state.userState.user
    };
  };

export default connect(mapStateToProps) (ProfileContent)
