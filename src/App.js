import './App.css';
import {BrowserRouter as Router , Route , Switch } from 'react-router-dom'
import Login from './Login';
import Home from './Home';
import {getUserAuth} from './Actions/index'
import {useEffect} from 'react'
import {useState} from 'react'
import { connect } from 'react-redux';
import Chat from './Chat';
import db from './firebase';
import Profile from './Profile';

function App(props) {
   
   useEffect(() => {
       props.getUserAuth();
   }, [])



  return (
    <div className="App">
      <Router>
        
          {!props.user ?
         
          <Login/>
         
          :
          <Switch>
          <Route path='/' exact>
          <Home/>
        </Route>
        <Route path='/profile'>
          <Profile/>
        </Route>
        </Switch>
          }
          
          
       
      </Router>
    </div>
  );
}
const mapStateToProps = state => {
  return {
    user: state.userState.user
  }
}
const mapdispatchToProps = dispatch => ({
   getUserAuth : () => dispatch(getUserAuth() )
})

export default connect( mapStateToProps , mapdispatchToProps ) (App)

