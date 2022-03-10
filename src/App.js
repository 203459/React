//import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Profile from './components/Profile/Profile';

import {Routes,Route} from 'react-router-dom'

function App() {
  return (
   <div>
     <div>
        {/* <NavBar/>  */}
       </div>
     <div>
     <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
         <Route path='/profile' element={<Profile/>}></Route> 
          <Route path='*' element={<div><h1>Not Found Page</h1></div>}></Route>
      </Routes>
     </div>
      </div>
  )
}

export default App;