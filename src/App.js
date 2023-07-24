
import './App.css';
import AdmissionForm from './pages/AdmissionForm';
import {Routes, Route} from "react-router-dom"
import Payment from './pages/Payment';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<AdmissionForm/>} />
      <Route path='/payment' element={<Payment/>} />
    </Routes>
    </>
  );
}

export default App;
