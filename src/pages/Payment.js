import React from "react";
import { useState } from "react";
// import { useEffect } from 'react';

const Payment = ({
  name,
  email,
  phone_number,
  course_of_interest,
  modeL,
  country,
  state,
  currency,
  cohort_id,
  total,
  program_type,
  academy_level,
  age,
  payment_plan,
  bal,tot,
  courseid,
  detail
}) => {
  const params = new URLSearchParams(window.location.search);
  const tx_ref = params.get("tx_ref");
  // const transaction_id= params.get("transaction_id")
console.log(tx_ref)
  const [msg, setMsg] = useState();

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  // const detail = JSON.parse(localStorage.getItem("formD"));
  // const tot = JSON.parse(localStorage.getItem("totalA"));
  // const courseid = JSON.parse(localStorage.getItem("courseI"));
  // const bal = localStorage.getItem("balance");
  const raw = JSON.stringify({
    name: detail.full_name,
    email: detail.email,
    phone_number: detail.phone_number,
    course_of_interest: detail.course,
    mode_of_learning: detail.classF,
    country: detail.country,
    state: detail.state === "" ? "null" : detail.state,
    currency: detail.currency.toUpperCase(),
    cohort_id: detail.cohort,
    amount_paid: tot,
    program_type: detail.course_level,
    flutterwave_reference_id: tx_ref,
    academy_level: detail.academy_level,
    age: detail.age_range,
    payment_plan: detail.payment_plan,
    course_id: courseid,
    balance:bal === undefined ? "null" : bal

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
