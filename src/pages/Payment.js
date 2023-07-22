import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

const Payment = ({name,email,phone_number,course_of_interest,modeL,country,state,currency,cohort_id, total,program_type,academy_level, age, payment_plan, course_id}) => {

    const params = new URLSearchParams(window.location.search)
    const tx_ref= params.get("tx_ref")
    // const transaction_id= params.get("transaction_id")

    const [msg, setMsg] = useState()

    const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "name":name,
        "email": email,
        "phone_number":phone_number,
        "course_of_interest":course_of_interest,
        "mode_of_learning": modeL,
        "country":country,
        "state":state,
        "currency":currency,
        "cohort_id":cohort_id,
        "amount_paid":total,
        "program_type":program_type,
        "flutterwave_reference_id":tx_ref,
        "academy_level":academy_level,
        "age":age,
        "payment_plan":payment_plan,
        "course_id":course_id
    })

    const url = "https://backend.pluralcode.institute/enrol";
    const reqMethod = {
        method: "POST",
        headers: myHeaders,
        body: raw
    }
    
        fetch(url,reqMethod)
        .then(response=>response.json())
        .then(result=>{
            console.log(result)
            if(result.data.code === 200){
            setMsg(result.data.message)
            }
        })
        .then(err=>console.log(err))
   
  return (
    <div>
      <h1 className='text-3xl text-center py-4'>{msg}</h1>
      {/* status=successful&tx_ref=plc-986.8027782670599&transaction_id=4478959 */}
      
    </div>
  )
}

export default Payment
