
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
    {/* basename={'/admissions'} */}
    <Routes >
      <Route path='/' element={<AdmissionForm/>} />
      <Route path='/payment' element={<Payment/>} />
    </Routes>
    </>
  );
}

export default App;
