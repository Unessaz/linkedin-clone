import React from 'react'
import LeftSidebar from './LeftSidebar'
import Posts from './Posts'
import RightSidebar from './RightSidbar'
import './feeds.css'
function Feeds() {
    return (
        <div className='feeds'>
          <LeftSidebar/>
          <Posts/>
          <RightSidebar/>  
        </div>
    )
}

export default Feeds
