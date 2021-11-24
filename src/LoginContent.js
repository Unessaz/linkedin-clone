import React from 'react'
import './LoginContent.css'
import {connect} from 'react-redux'
import {signInApi} from './Actions'
import {Redirect} from 'react-router'

function LoginContent(props) {
    return (
        <section>
            { props.user && <Redirect to='/home' /> }
            <div className='hero-content'>
            <h1> Welcome to your professional community </h1>
            <img src='https://static-exp1.licdn.com/sc/h/d58zfe6h3ycgq5l1ccjpkrtdn' alt=''/>
            <div className='ggl-sign'>
              <button onClick={()=> props.signIn()}>
                <img src='https://freesvg.org/img/1534129544.png' alt='' />
                Sign In With Google 
             </button>  
            </div>
            </div>         
        </section>
    )
}
const mapStateToProps = state => {
    return {
        user : state.userState.user
    }
}
const mapDispatchToProps = (dispatch) => ({ 
        signIn : () => dispatch(signInApi()),
    
});
export default connect(mapStateToProps , mapDispatchToProps) (LoginContent)

