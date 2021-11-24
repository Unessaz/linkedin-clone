import React, { useEffect } from 'react'
import LoginContent from './LoginContent'
import LoginHeader from './LoginHeader'


function Login() {
    
    useEffect(() => {
        document.title = 'Login'
    }, [])

    return (
        <div className='login-in'>
            <LoginHeader/>
            <LoginContent/>
        </div>
    )
}

export default Login
