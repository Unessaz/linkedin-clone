import {auth , provider , storage} from '../firebase'
import db from '../firebase'
import {SET_USER} from './actionTypes'

export const setUser = (payload) => ({
    type: SET_USER ,
    user : payload,
})

export function signInApi(){
    return dispatch => {
          auth.signInWithPopup(provider).then(payload => {
              dispatch(setUser(payload.user))
              
          })
          .catch(error => alert(error.message));
    }
}

export function getUserAuth(){
    return dispatch => {
          auth.onAuthStateChanged( async (user) => {
              if(user) {
                  dispatch(setUser(user))
              }
          })
         
    }
}

export function signOutApi(){
    return dispatch => {
          auth.signOut().then( () => {
              dispatch(setUser(null))
          })
          .catch(error => console.log(error.message));
    }
}

export function articlesApi(payload){
    
    return (dispatch) => {
         
        if(payload.image !== '' || payload.text !== '' || payload.video !== '' ) {
            const upload = storage.ref(`images/${payload.image.name}`).put(payload.image);
            const uploadvid = storage.ref(`images/${payload.video.name}`).put(payload.video);
            upload.on('state_changed' , (snapshot) => {
                const progressvid = (snapshot.bytesTransferred / snapshot.totalBytes) * 100 ;
                console.log(`progress : ${progressvid}`)
                if(snapshot.state === 'RUNNING')
                console.log(`progress Running : ${progressvid}`)
                
                
            },
             error => console.log(error.code) ,
            async () => {
                const downloadUrl = await upload.snapshot.ref.getDownloadURL();
                const downloadvideoUrl = await uploadvid.snapshot.ref.getDownloadURL();
                db.collection('articles').add({                  
                        email : payload.user.email ,
                        name : payload.user.displayName,
                        date : payload.date ,
                        avatar : payload.user.photoURL,
                        image : payload.image.name !== undefined ? downloadUrl : '',
                        video : payload.video.name !== undefined ? downloadvideoUrl : '',
                        text : payload.text,
                    
                    
                })
            }
            )
        }
        
    }
    
}