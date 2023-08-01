import React from "react";
import Images from "../atom/Images";
import adlogo from "../images/Frame 427318748.png";
import Text from "../atom/Text";
import { useRef } from "react";
import { useEffect } from "react";

const FormNav = ({
  amountdue,
  vat,
  transaction,
  balance,
  total,
  sign,
  usd,
  name,
  form,
  offset,
  deadline
  
}) => {
  const mob = useRef();
  const part2 = useRef();

  const numFor = Intl.NumberFormat("en-US");
  useEffect(()=>{

      if (form.course !== ""){
          mob.current.style.display="block"
        }
        if (form.payment_plan === "part_payment" && form.course_level==="diploma") {
            part2.current.style.display = "block";
        }else{part2.current.style.display="none"} 
    },[form.payment_plan,form.course,form.course_level])

  return (
    <div className="bgcolor sticky top-0 z-10 ">
      <div className="px-4 py-6 md:p-6 lg:px-16 lg:pt-6 lg:pb-4">
        <Images src={adlogo} className=" w-44 lg:w-56" />
      </div>
      
      <div className="mobile-summary lg:hidden px-4 py-2 md:p-6 lg:p-0" ref={mob}>
        <Text className="textcolor font-bold" children="Summary" />
        <div className="flex items-center pt-3 lg:hidden">
          <div className="w-full title">
            <p className=" font-semibold">
                {name}
            </p>
            <p>
              Course Fee:{" "}
              <span className="fee">
                {sign} {numFor.format(isNaN(amountdue) ? 0 : amountdue)} {usd}
              </span>
            </p>
           <div className="part-payment-fee" ref={part2}>
              <p>
                Amt to pay:{" "}
                <span className="fee">
                  {sign} {numFor.format(isNaN(amountdue) ? 0 : amountdue)} {usd}
                </span>
              </p>
              <p>
                Bal to pay:{" "}
                <span className="fee">
                  {sign} {numFor.format(isNaN(balance) ? 0 : balance)} {usd}
                </span>
              </p>
            </div>
            <p>
              Sub total:{" "}
              <span className="fee">
                {sign} {numFor.format(isNaN(amountdue) ? 0 : amountdue)} {usd}
              </span>
            </p>
            
            <p>
              Transaction Fee:{" "}
              <span className="fee">
                {sign} {numFor.format(isNaN(transaction) ? 0 : transaction)}{" "}
                {usd}
              </span>
            </p>
          </div>
          <div className="w-3/4">
            <div className="smalltot text-lg border-l-2 ">
              <Text className="ps-8" children="Total:" />
              <div className="ps-8">
              {offset && <p className="striketh text-sm">{sign} {numFor.format(
                      isNaN(offset) ? 0 : offset
                    )} {usd}</p>}
                {sign} {numFor.format(isNaN(total) ? 0 : total)} {usd}
                {deadline && <p className="discount text-sm">Discount Ends {deadline}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormNav;
