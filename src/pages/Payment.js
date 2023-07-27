import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Payment = () => {
  const [msg, setMsg] = useState(false);
  const [contact, setContact] = useState("");
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
    balance: balance,
  });

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const url = "https://backend.pluralcode.institute/enrol";
    const reqMethod = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    fetch(url, reqMethod)
      .then((response) => response.json())
      .then((result) => {
        if (result.code === 200) {
          setContact(result.advisor_contact_detail);
          setMsg(true);
        } else {
          Swal.fire({
            title: result.message,
            icon: "error",
            showConfirmButton: false,
          });
        }
      })
      .catch((err) => console.log(err));
  }, [raw]);

  return (
    <div>
      {msg && (
        <div className="lg:w-2/4 m-auto px-4 h-screen flex flex-col justify-center pay-text">
          <p className="text-2xl lg:text-3xl text-center bold pt-8 pb-4">
            Enrollment Successful
          </p>
          <p className="medium pt-4">
            Thank you for kicking off your tech journey with Pluralcode. Kindly
            check your email inbox for your welcome pack including LMS access,
            payment receipts, welcome letter and onboarding instructions. Be
            sure to also check your spam/junk folders so you don't miss
            anything.
          </p>
          <p className="medium pt-4">
            If you need any further help with your onboarding, kindly send an
            email to{" "}
            <Link
              className="font-semibold"
              to="mailto:admissions@pluralcode.academy"
            >
              admissions@pluralcode.academy
            </Link>{" "}
            or click the button below to contact your student advisor via
            WhatsApp.
          </p>
          <Link to={`https://wa.me/${contact}`}>
            <button className="w-72 flex justify-center m-auto mt-8 secbgcolor text-white p-3 rounded-lg">
              Chat our Student Advisor
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Payment;
