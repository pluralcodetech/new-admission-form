import React from "react";
import Images from "../atom/Images";
import adlogo from "../images/Frame 427318748.png";
import Text from "../atom/Text";
import { useRef } from "react";
import { useEffect } from "react";

const FormNav = ({
  subtotal,
  amountdue,
  vat,
  transaction,
  balance,
  total,
  sign,
  usd,
  name,
  part,
  course
}) => {
  const mob = useRef();
  const part2 = useRef();

  const numFor = Intl.NumberFormat("en-US");
  useEffect(()=>{

      if (course !== ""){
          mob.current.style.display="block"
        }
        if (part === "part_payment") {
            part2.current.style.display = "block";
        }else{part2.current.style.display="none"} 
    },[course,part])

  return (
    <div className="bgcolor sticky top-0 z-10 ">
      <div className="px-4 py-6 md:p-6 lg:px-16 lg:pt-6 lg:pb-0">
        <Images src={adlogo} className=" w-44 lg:w-56" />
      </div>
      
      <div className="mobile-summary lg:hidden px-4 py-2 md:p-6 lg:p-0" ref={mob}>
        <Text className="textcolor font-bold" children="Summary" />
        <div className="flex items-center pt-3 lg:hidden">
          <div className="w-full title">
            <p>
              Course Fee:{" "}
              <span className="fee">
                {sign} {numFor.format(isNaN(subtotal) ? 0 : subtotal)} {usd}
              </span>
            </p>
           {part && <div className="part-payment-fee" ref={part2}>
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
            </div>}
            <p>
              Sub total:{" "}
              <span className="fee">
                {sign} {numFor.format(isNaN(amountdue) ? 0 : amountdue)} {usd}
              </span>
            </p>
            <p>
              VAT: <span className="fee"></span>
              {sign} {numFor.format(isNaN(vat) ? 0 : vat)} {usd}
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
              <p className="ps-8">
                {sign} {numFor.format(isNaN(total) ? 0 : total)} {usd}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormNav;
