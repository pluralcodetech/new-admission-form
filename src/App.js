
import './App.css';
import AdmissionForm from './pages/AdmissionForm';
import {Routes, Route} from "react-router-dom"
import Payment from './pages/Payment';

function App() {
  return (
    <>
    <Routes basename={'/admissions'}>
      <Route path='/admissions' element={<AdmissionForm/>} />
      <Route path='/admissions/payment' element={<Payment/>} />
    </Routes>
    </>
  );
}

export default App;
