import React from "react";
import Images from "../../atom/Images";
import adpix from "../../images/Frame 20692.png";
import play from "../../images/Group 3.png";

const HeaderAd = () => {
  return (
    <>
      <div className="bgcolor m-0 px-4 pt-0 pb-4 md:px-6 md:pt-0 md:pb-6 lg:px-16 lg:py-0 ">
        
        <div className="flex flex-col-reverse lg:flex-row">
          <div>
            <div className="pt-8 lg:pt-28">
              <p className="adtext text-white">
                Admission <span className="seccolor">Form</span>
              </p>
              <p className="hero-text pt-3 lg:leading-9 text-white text-sm md:text-2xl text-start">
                Kindly fill this out the form below to register & pay for your chosen course.<span className="hidden lg:inline leading-9"> Once your enrollment is Complete, you will receive an email
                  address with your admission package, receipts, welcome letter,
                  links to student community, course materials & login access to
                  your Student Learning Portal.
                </span>
              </p>
            </div>
          </div>
          <div className="relative">
            <Images src={play} className="w-16 md:w-20 play  absolute" />
            <Images src={adpix} className="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderAd;
