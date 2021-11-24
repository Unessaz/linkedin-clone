import React , {useEffect , useState} from 'react'
import Post from './Post'
import PostBox from './PostBox'
import db from './firebase'

function Posts() {
    const [article, setarticle] = useState([])
    useEffect(() => {
        let didCancel = false;
        db.collection('articles').orderBy('date' , 'desc').onSnapshot( snapshot => (
            setarticle(snapshot.docs.map( doc =>  doc ))
          ))

          return () =>{
              didCancel = true;
          }
    }, [])
         
    return (
        <div className='posts'>
            <PostBox/>
            {article.map( (doc) => (
                <Post
                id ={doc.id} 
                key ={doc.id}
                text ={doc.data().text}
                image = {doc.data().image}
                avatar = {doc.data().avatar}
                name = {doc.data().name}
                email = {doc.data().email}
                date = {doc.data().date}
                likes = {doc.data().likes}
                video = {doc.data().video}
                data = {doc}
                
                />
             ))}
            

        </div>
    )
}

export default Posts
