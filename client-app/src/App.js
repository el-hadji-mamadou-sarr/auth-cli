import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { Login } from './components/login';
import { Home } from './components/home';
import { Register } from './components/register';
import { Profile } from './components/profile';
import { Mailbox } from './components/mailbox';
import { Chat } from './components/chat';
function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path = '/home' element={<Home/>}/>
          <Route path = '/profile' element={<Profile/>}/>
          <Route path = '/mailbox' element={<Mailbox/>}/>
          <Route path = '/chat' element={<Chat/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
