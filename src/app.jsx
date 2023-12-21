import { BrowserRouter } from 'react-router-dom';
import './app.css'
import Buzz from './components/Buzz/Buzz.jsx';


export function App() {
  return (
    <BrowserRouter>
      <Buzz/>
    </BrowserRouter>
  );
}
