import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import { ToastContainer } from "react-toastify";
import AllRouter from './components/AllRouter';

function App() {
  return (
    <>
    <AllRouter/>
         <ToastContainer 
    position="top-right" 
    autoClose={1500} 
    theme="light" 
/>


    </>
  );
}

export default App;
