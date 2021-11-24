import React from 'react'
import './LoginHeader.css'

function LoginHeader() {
    return (
        <nav className='login-header'>
            <img src='https://logos-marques.com/wp-content/uploads/2021/03/Linkedin-logo.png' alt=''/>
            <div>
                <a className='join'> Join Now </a>
                <a className='sign'> Sign In  </a>
            </div>
        </nav>
    )
}

export default LoginHeader
