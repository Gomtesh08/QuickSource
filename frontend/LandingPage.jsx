import React from 'react' ;
import './src/LandingPage.css'
import {Link} from 'react-router-dom' 

const LandingPage = () => {
  return (
    <div className='landingpageContainer'>
    <div className='landingpageInnerContainer'>
           <h1>QuickSource....</h1>

           <div className="buttons">
           <button> <Link to="/signup" className='signUp' >SignUp</Link></button>
           <button> <Link to="/signin" className='signIn'>SignIn</Link></button>
          </div>
    </div>
            

    </div>
  )
}

export default LandingPage
