import React from "react";
import { useState } from "react";
// import { useEffect } from 'react';

const Payment = () => {
  const params = new URLSearchParams(window.location.search);
  const tx_ref = params.get("tx_ref");
  const name = params.get("name");
  const email = params.get("email");
  const phone_number = params.get("phone_number");
  const mode = params.get("mode");
  const course = params.get("course");
  const country = params.get("country");
  const state = params.get("state");
  const currency = params.get("currency");
  const cohort_id = params.get("cohort_id");
  const course_id = params.get("courseid");
  const program = params.get("program");
  const academy = params.get("academy");
  const balance = params.get("balance");
  const total = params.get("total");
  const age = params.get("age");
  const pay = params.get("pay");

  const [msg, setMsg] = useState();



  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const raw = JSON.stringify({
    name: name,
    email: email,
    phone_number: phone_number,
    course_of_interest: course,
    mode_of_learning: mode,
    country: country,
    state: state,
    currency: currency,
    cohort_id: cohort_id,
    amount_paid: total,
    program_type: program,
    flutterwave_reference_id: tx_ref,
    academy_level: academy,
    age: age,
    payment_plan: pay,
    course_id: course_id,
    balance: balance

  });
console.log(raw)
//   let url;
// if (detail.course_level === "diploma" && detail.payment_plan === "full_payment"){

//      url = "https://backend.pluralcode.institute/enrol";
// }else if (detail.course_level === "diploma" && detail.payment_plan === "part_payment"){
//     url = "https://backend.pluralcode.institute/enrol"
// }

const url = "https://backend.pluralcode.institute/enrol"
  const reqMethod = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  fetch(url, reqMethod)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      if (result.code === 200){

          setMsg(result.message);
        }else{
            setMsg("Unsuccessful!")
        }
    })
    .catch((err) => console.log(err));

  return (
    <div>
      <h1 className="text-3xl text-center py-4">{msg}</h1>
      {/* status=successful&tx_ref=plc-986.8027782670599&transaction_id=4478959 */}
    </div>
  );
};

export default Payment;
