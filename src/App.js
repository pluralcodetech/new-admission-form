
import './App.css';
import AdmissionForm from './pages/AdmissionForm';
import {Routes, Route} from "react-router-dom"
import Payment from './pages/Payment';
import Navbar from './molecules/Navbar'

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<AdmissionForm/>} />
      <Route path='/n' element={<Navbar/>} />
      <Route path='/payment' element={<Payment/>} />
    </Routes>
    </>
  );
}

export default App;
