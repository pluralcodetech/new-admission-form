import React from "react";
// import { useEffect } from 'react';

const Payment = ({
  detail
}) => {
  const params = new URLSearchParams(window.location.search);
  const tx_ref = params.get("tx_ref");
  // const [msg, setMsg] = useState();

 
localStorage.setItem("finalDetails",JSON.stringify(detail))
localStorage.setItem("tx",JSON.stringify(tx_ref))



  return (
    <div>
      <h1 className="text-3xl text-center py-4">Successful!</h1>
      {/* status=successful&tx_ref=plc-986.8027782670599&transaction_id=4478959 */}
    </div>
  );
};

export default Payment;
