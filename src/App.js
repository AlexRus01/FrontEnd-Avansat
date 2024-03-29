import { BrowserRouter as Router, Routes, Route} from 
'react-router-dom'

import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './components/Navbar.jsx'
import Explore from './pages/Explore'
import Profile from './pages/Profile'
import Listing from './pages/Listing.jsx'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import PrivateRoute from './components/PrivateRoute.jsx'
import Category from './pages/Category.jsx'
import CreateListing from './pages/CreateListing'


function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Explore />} /> 
        <Route path='/category/:categoryName' element={<Category/>} />
        <Route path='/profile' element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile/>}/>
        </Route>
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} /> 
        <Route path='/create-listing' element= {<CreateListing />} />
        <Route path='/category/:categoryName/:listingId' element={<Listing />} />
      </Routes>
      <Navbar></Navbar>
    </Router>

    <ToastContainer />

      
    </>
    
  );
}

export default App;
