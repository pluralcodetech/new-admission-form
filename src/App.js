
import './App.css';
import AdmissionForm from './pages/AdmissionForm';
import {Routes, Route} from "react-router-dom"
import Payment from './pages/Payment';
import ReactGA from "react-ga4";

function App() {
  ReactGA.initialize("G-86XXG6VF1L");
  ReactGA.send({ hitType: "pageview", page: "/admissions/payment", title: "Success page" });
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
