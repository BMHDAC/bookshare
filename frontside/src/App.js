import { Route,Routes} from 'react-router-dom'
import Register from './components/User/Register';
import Login from './components/User/Login';
import Mainpage from './components/Mainpage';

import UploadBook from './components/Books/UploadBook';
import Bookpage from './components/Books/Bookpage';
import PersistLogin from './components/User/PersistLogin';
import Layout from './components/Layouts/Layout';
import RequireAuth from './components/User/RequireAuth'
import Download from './components/Books/Download';

function App() {
  return (
    <Routes>
     <Route path="/" element={<Layout/>}>
      
      <Route path="/main" element={<Mainpage/>}/>  
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>

      <Route element={<PersistLogin/>}>
        <Route element={<RequireAuth/>}>
          <Route path="/uploads" element={<UploadBook/>}/>
          <Route path="/books" element={<Bookpage/>}/>
          <Route path="/books/download/:bookId" element={<Download/>}/>
        </Route>
      </Route>
     </Route>
    </Routes>
    
  );
}

export default App;
