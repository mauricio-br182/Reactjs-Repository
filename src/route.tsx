
import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from "react-router-dom";
import {Home} from './Routes/Home/Home'
import {Repo} from './Routes/Repo/Repo'

export function AppRouter(){
    return(
        <Router>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/repo/:repo' element={<Repo/>} />
            </Routes>
        </Router>
    )
}
  
  
  

