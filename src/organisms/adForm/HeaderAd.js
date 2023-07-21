import React from "react";
import Images from "../../atom/Images";
import adpix from "../../images/Frame 20692.png";
import adlogo from "../../images/Frame 427318748.png";
import Text from "../../atom/Text";

const HeaderAd = () => {
  return (
    <>
      <div className="bgcolor p-4 md:p-6 lg:px-16 lg:py-8 ">
        <div className="grid grid-flow-row lg:grid-cols-2">
          <div>
            <Images src={adlogo} className="w-56" />
            <div className="pt-8 lg:pt-28">
              <p className="adtext text-white">
                Admission <span className="seccolor">Form</span>
              </p>
              <Text
                className="hero-text pt-3 text-white md:text-2xl text-center lg:text-start"
                children="Kindly fill this out the form below to register & 
                pay for your chosen course. Once your enrollment is
                Complete, you will receive an email address with
                your admission package, receipts, welcome letter,
                links to student community, course materials &
                login access to your Student Learning Portal."
              />
            </div>
          </div>
          <div>
            <Images src={adpix} className="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderAd;
