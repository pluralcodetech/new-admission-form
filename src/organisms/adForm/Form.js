import React, { useEffect, useRef, useState } from "react";
import Text from "../../atom/Text";
// import plogo from "../../images/plc-icon.png";
// import { Link } from "react-router-dom";
import Images from "../../atom/Images";
import chkgreen from "../../images/Group.png";
import Payment from "../../pages/Payment";

const Form = () => {
  const liveD = useRef();
  const entryref = useRef();
  const diplomaref = useRef();
  const partpay = useRef();
  const physicalref = useRef();
  const nairaref = useRef();
  const payBody = useRef();
  const partFee = useRef();

  

  const numFor = Intl.NumberFormat("en-US");

  const [certCourse, setCertCourse] = useState();
  const [diplomaCourse, setDiplomaCourse] = useState();

  const [readMore, setReadMore] = useState(false);
  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);
  const [cohort, setCohort] = useState([]);
  const [fee, setFee] = useState([]);
  const [errMsg, setErrMsg] = useState();
  const [payLink, setPayLink] = useState()
  // const [loading, setLoading] = useState(false);

  const [eachFee, setEachFee] = useState({
    subtotal: "",
    vat: "",
    transaction: "",
    total: "",
    balance: "",
    amountDue: "",
    sign: "",
    usd: "",
  });

  const handleRead = () => {
    setReadMore(!readMore);
  };

  const [checked, setChecked] = useState(false);
  const handleCheck = () => {
    setChecked(!checked);
  };

  const [formD, setFormD] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    age_range: "",
    academy_level: "",
    course_level: "diploma",
    classF: "virtual_class",
    cohort: "",
    course: "",
    payment_plan: "full_payment",
    currency: "usd",
    country: "",
    state: "",
  });

  // countries list
  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries/states")
      .then((response) => response.json())
      .then((result) => {
        setCountry(result.data);
      });
  }, []);

  // courses list
  useEffect(() => {
    fetch("https://backend.pluralcode.institute/course-list")
      .then((response) => response.json())
      .then((result) => {
        setCertCourse(result.certcourses);
        setDiplomaCourse(result.diplomacourses);
      });
  }, []);

  // cohort list
  useEffect(() => {
    fetch("https://backend.pluralcode.institute/cohort-list")
      .then((response) => response.json())
      .then((result) => {
        setCohort(result.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // certificate courses
  const certC = certCourse?.map((eachC) => {
    return (
      <option
        key={eachC.id}
        value={eachC.name}
        id={eachC.id}
        className="w-full"
      >
        {eachC.name}
      </option>
    );
  });
  //diploma courses

  const handleForm = (event) => {
    const { name, value } = event.target;
    // dropdown for course level
    if (value === "entry") {
      entryref.current.style.display = "block";
      diplomaref.current.style.display = "none";
      payBody.current.style.display = "none";
    } else if (value === "diploma") {
      diplomaref.current.style.display = "block";
      payBody.current.style.display = "block";
      entryref.current.style.display = "none";
    }
    // for class format
    if (name === "state" && value === "Lagos State") {
      physicalref.current.style.display = "block";
    } else if (name === "state" && value !== "Lagos State") {
      physicalref.current.style.display = "none";
    }
    // for currency
    if (name === "country" && value === "Nigeria") {
      nairaref.current.style.display = "block";
    } else if (name === "country" && value !== "Nigeria") {
      nairaref.current.style.display = "none";
    }

    //for part payment
    if (value === "part_payment") {
      partpay.current.style.display = "flex";
      partFee.current.style.display = "block";
    } else if (name === "payment_plan" && value !== "part_payment") {
      partpay.current.style.display = "none";
      partFee.current.style.display = "none";
    }

    setFormD((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  // for fee

  useEffect(() => {
    function gg() {
      if (
        formD.currency === "ngn" &&
        formD.classF === "physical_class" &&
        formD.payment_plan === "full_payment"
      ) {
        setEachFee((prev) => {
          return {
            ...prev,
            amountDue:
              fee[0]?.course_onsite_fees?.onsite_course_full_payment_fees_ngn
                .onsite_course_fee_ngn,
            subtotal:
              fee[0]?.course_onsite_fees?.onsite_course_full_payment_fees_ngn
                .onsite_course_fee_ngn,
            vat: fee[0]?.course_onsite_fees?.onsite_course_full_payment_fees_ngn
              ?.onsite_course_vat_fee_ngn,
            transaction:
              fee[0]?.course_onsite_fees?.onsite_course_full_payment_fees_ngn
                ?.onsite_course_transaction_fee_ngn,
            total:
              fee[0]?.course_onsite_fees?.onsite_course_full_payment_fees_ngn
                ?.onsite_course_total_fee_ngn,
            sign: <span>&#8358;</span>,
          };
        });
      } else if (
        formD.currency === "ngn" &&
        formD.classF === "physical_class" &&
        formD.payment_plan === "part_payment"
      ) {
        setEachFee({
          subtotal:
            fee[0]?.course_onsite_fees?.onsite_part_paymentcourse_fees_ngn
              ?.onsite_part_payment_course_fee,
          amountDue:
            fee[0]?.course_onsite_fees?.onsite_part_paymentcourse_fees_ngn
              ?.onsite_part_payment_course_fee_ngn_due_amount,
          vat: fee[0]?.course_onsite_fees?.onsite_part_paymentcourse_fees_ngn
            .onsite_part_payment_course_vat_fee_ngn,
          transaction:
            fee[0]?.course_onsite_fees?.onsite_part_paymentcourse_fees_ngn
              .onsite_part_payment_course_transaction_fee_ngn,
          total:
            fee[0]?.course_onsite_fees?.onsite_part_paymentcourse_fees_ngn
              .onsite_part_payment_course_total_fee_ngn,
          balance:
            fee[0]?.course_onsite_fees?.onsite_part_paymentcourse_fees_ngn
              ?.onsitebalance_ngn,
          sign: <span>&#8358;</span>,
        });
      } else if (
        formD.currency === "ngn" &&
        formD.classF === "virtual_class" &&
        formD.payment_plan === "full_payment"
      ) {
        setEachFee({
          amountDue:
            fee[0]?.course_virtual_fee?.virtual_course_full_payment_fees_ngn
              ?.virtual_course_fee_ngn,
          subtotal:
            fee[0]?.course_virtual_fee?.virtual_course_full_payment_fees_ngn
              ?.virtual_course_fee_ngn,
          vat: fee[0]?.course_virtual_fee?.virtual_course_full_payment_fees_ngn
            ?.virtual_course_vat_fee_ngn,
          transaction:
            fee[0]?.course_virtual_fee?.virtual_course_full_payment_fees_ngn
              ?.virtual_course_transaction_fee_ngn,
          total:
            fee[0]?.course_virtual_fee?.virtual_course_full_payment_fees_ngn
              ?.virtual_course_total_fee_ngn,
          sign: <span>&#8358;</span>,
        });
      } else if (
        formD.currency === "ngn" &&
        formD.classF === "virtual_class" &&
        formD.payment_plan === "part_payment"
      ) {
        setEachFee({
          subtotal:
            fee[0]?.course_virtual_fee?.virtual_part_paymentcourse_fees_ngn
              ?.virtual_part_payment_course_fee,
          amountDue:
            fee[0]?.course_virtual_fee?.virtual_part_paymentcourse_fees_ngn
              ?.virtual_part_payment_course_fee_ngn_due_amount,
          vat: fee[0]?.course_virtual_fee?.virtual_part_paymentcourse_fees_ngn
            ?.virtual_part_payment_course_vat_fee_ngn,
          transaction:
            fee[0]?.course_virtual_fee?.virtual_part_paymentcourse_fees_ngn
              ?.virtual_part_payment_course_transaction_fee_ngn,
          total:
            fee[0]?.course_virtual_fee?.virtual_part_paymentcourse_fees_ngn
              ?.virtual_part_payment_course_total_fee_ngn,
          balance:
            fee[0]?.course_virtual_fee?.virtual_part_paymentcourse_fees_ngn
              ?.virtualbalance_ngn,
          sign: <span>&#8358;</span>,
        });
      }

      // for usd
      if (formD.currency === "usd" && formD.payment_plan === "full_payment") {
        setEachFee({
          amountDue:
            fee[0]?.course_virtual_fee?.virtual_course_full_payment_fees_usd
              ?.virtual_course_fee_usd,
          subtotal:
            fee[0]?.course_virtual_fee?.virtual_course_full_payment_fees_usd
              ?.virtual_course_fee_usd,
          vat: fee[0]?.course_virtual_fee?.virtual_course_full_payment_fees_usd
            ?.virtual_course_vat_fee_usd,
          transaction:
            fee[0]?.course_virtual_fee?.virtual_course_full_payment_fees_usd
              ?.virtual_course_transaction_fee_usd,
          total:
            fee[0]?.course_virtual_fee?.virtual_course_full_payment_fees_usd
              ?.virtual_course_total_fee_usd,
          sign: <span>&#36;</span>,
          usd: "(USD)",
        });
      } else if (
        formD.currency === "usd" &&
        formD.payment_plan === "part_payment"
      ) {
        setEachFee({
          subtotal:
            fee[0]?.course_virtual_fee?.virtual_part_paymentcourse_fees_usd
              ?.virtual_part_payment_course_fee,
          amountDue:
            fee[0]?.course_virtual_fee?.virtual_part_paymentcourse_fees_usd
              ?.virtual_part_payment_course_fee_usd_due_amount,
          vat: fee[0]?.course_virtual_fee?.virtual_part_paymentcourse_fees_usd
            ?.virtual_part_payment_course_vat_fee_usd,
          transaction:
            fee[0]?.course_virtual_fee?.virtual_part_paymentcourse_fees_usd
              ?.virtual_part_payment_course_transaction_fee_usd,
          total:
            fee[0]?.course_virtual_fee?.virtual_part_paymentcourse_fees_usd
              ?.virtual_part_payment_course_total_fee_usd,
          balance:
            fee[0]?.course_virtual_fee?.virtual_part_paymentcourse_fees_usd
              ?.virtualbalance_usd,
          sign: <span>&#36;</span>,
          usd: "(USD)",
        });
      }
    }
    gg();
  }, [formD, fee]);

  console.log(fee)
  // console.log(checked)

  //submit the form
  var rn = require("random-number");
  var options = {
    max: 987, // example input , yes negative values do work
  };

  const handleSubmit = () => {
    if (checked) {
      // setLoading(true);
      if (
        eachFee.total === "" ||
        formD.currency === "" ||
        formD.email === "" ||
        formD.phone_number === "" ||
        formD.full_name === ""
        ) {
          setErrMsg("All fields must not be empty!");
        } else {
        const raw = JSON.stringify({
          "tx_ref": "plc-" + rn(options),
          "amount": eachFee.total,
          "currency": formD.currency.toUpperCase(),
          "title": formD.course + " Enrollment",
          "redirect_url": "https://bright-cuchufli-2253ee.netlify.app/payment",
          "email": formD.email,
          "phonenumber": formD.phone_number,
          "name": formD.full_name,
        });
        localStorage.setItem("formD",JSON.stringify(formD))
        sessionStorage.setItem("formm",JSON.stringify(formD))
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const reqMethod = {
          method: "POST",
          headers:myHeaders,
          body: raw,
        };

        const url = "https://backend.pluralcode.institute/initialise-payment";

        fetch(url, reqMethod)
          .then((response) => response.json())
          .then((result) =>{ 
            console.log(result)
            setPayLink(result.data.link)

              window.location.replace(result.data.link)
              
            
          })
          .catch((err) => console.log(err));
      
      }
    } else {
      setErrMsg("Box must be checked!");
    }
    <Payment name = {formD.full_name} email={formD.email} phone_number = {formD.phone_number} course_of_interest = {formD.course} modeL = {formD.classF} country = {formD.country} state = {formD.state} currency = {formD.currency} cohort_id = {formD.cohort} total = {eachFee.total} program_type = {formD.course_level} academy_level = {formD.academy_level} age = {formD.age_range} payment_plan = {formD.payment_plan} course_id={fee.length === 0 ? null :fee[0].id} />
  };
console.log(formD)


  return (
    <div className="w-full bg-white p-4 md:p-6 lg:px-16 lg:py-14">
      {/* certificate details */}
      <div className="w-full  cert-body pt-16 flex flex-col lg:flex-row lg:gap-2">
        <div className="w-full formleft">
          <div>
            <Text
              className="per-info text-center textcolor"
              children="Fill the form below"
            />
            <form className="pt-4">
              <div className="ad-input flex flex-col py-3">
                <label className="textdark pb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  name="full_name"
                  value={formD.full_name}
                  onChange={handleForm}
                  required
                  className="px-7 py-4 outline-offset-2 outline-slate-500"
                />
              </div>
              <div className="ad-input flex flex-col py-3">
                <label className="textdark pb-2">Email *</label>
                <input
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={formD.email}
                  onChange={handleForm}
                  required
                  className="px-7 py-4 outline-offset-2 outline-slate-500"
                />
              </div>
              <div className="ad-input flex flex-col py-3">
                <label className="textdark pb-2">Phone Number</label>
                <input
                  type="text"
                  placeholder="Enter phone number"
                  name="phone_number"
                  value={formD.phone_number}
                  onChange={handleForm}
                  required
                  className="px-7 py-4 outline-offset-2 outline-slate-500"
                />
              </div>
              <div className="ad-input flex flex-col py-3">
                <label className="textdark pb-2">Highest Academy Level</label>
                <select
                  name="academy_level"
                  value={formD.academy_level}
                  onChange={handleForm}
                  required
                  className="w-full cursor-pointer flex items-center dp border px-7 py-4 outline-offset-2 outline-slate-500"
                >
                  <option value="ccc" className="dptext">
                    Select highest academy level
                  </option>
                  <option value="none" className="dptext">
                    None
                  </option>
                  <option value="Bsc" className="dptext">
                    Bsc
                  </option>
                  <option value="Msc" className="dptext">
                    Msc
                  </option>
                  <option value="diploma" className="dptext">
                    Diploma
                  </option>
                  <option value="doctorate" className="dptext">
                    Doctorate (PhD)
                  </option>
                  <option value="high" className="dptext">
                    High School / Secondary School
                  </option>
                  <option value="under" className="dptext">
                    Under Graduate
                  </option>
                  <option value="junior" className="dptext">
                    Junior / Middle School
                  </option>
                  <option value="post" className="dptext">
                    Post Graduate
                  </option>
                </select>
              </div>
              <div className="ad-input flex flex-col py-3">
                <label className="textdark pb-2">Age Range</label>
                <select
                  name="age_range"
                  value={formD.age_range}
                  onChange={handleForm}
                  required
                  className="w-full cursor-pointer flex items-center dp border px-7 py-4 outline-offset-2 outline-slate-500"
                >
                  <option value="ccc" className="dptext">
                    Select your age range
                  </option>
                  <option value="18-24" className="dptext">
                    18 - 24
                  </option>
                  <option value="25-29" className="dptext">
                    25 - 29
                  </option>
                  <option value="30-39" className="dptext">
                    30 - 39
                  </option>
                  <option value="40-50" className="dptext">
                    40 - 50
                  </option>
                  <option value="50+" className="dptext">
                    50+
                  </option>
                </select>
              </div>
              <div className="w-full flex flex-col md:flex-row gap-6">
                <div className="w-full ad-input flex flex-col py-3">
                  <label className="textdark pb-2">Country</label>
                  <select
                    placeholder="Enter your country"
                    name="country"
                    value={formD.country}
                    onChange={handleForm}
                    required
                    onClick={(e) => {
                      const eachState = country
                        .map((country) => country)
                        .filter(
                          (each) => each.name === e.target.value && each.states
                        );
                      setState(eachState);
                    }}
                    className="w-full border dp px-7 py-4 outline-offset-2 outline-slate-500"
                  >
                    {country?.map((each) => {
                      return (
                        <option key={each.iso3} value={each.name}>
                          {each.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="w-full ad-input flex flex-col py-3">
                  <label className="textdark pb-2">State</label>
                  <select
                    placeholder="Enter your state"
                    name="state"
                    value={formD.state}
                    onChange={handleForm}
                    required
                    className="w-full border dp px-7 py-4 outline-offset-2 outline-slate-500"
                  >
                    {state?.map((eachS) => {
                      if (eachS.states.length > 0) {
                        const a = eachS.states.map((e) => {
                          return (
                            <option className="w-full pe-7" key={e.name}>
                              {e.name}
                            </option>
                          );
                        });
                        return a;
                      } else {
                        return <option value="">No state</option>;
                      }
                    })}
                  </select>
                </div>
              </div>

              <div className="ad-input flex flex-col py-3">
                <label className="textdark pb-2">Course Level</label>
                <div className="flex gap-8">
                  <div className="">
                    <label className="container text-base">
                      Diploma (Beginner to Advanced)
                      <input
                        type="radio"
                        name="course_level"
                        checked={formD.course_level === "diploma"}
                        value="diploma"
                        onChange={handleForm}
                        required
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <div className="">
                    <label className="container text-base">
                      Entry Level (Beginner)
                      <input
                        type="radio"
                        required
                        name="course_level"
                        value="entry"
                        checked={formD.course_level === "entry"}
                        onChange={handleForm}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                </div>
                <div className="entry-details" ref={entryref}>
                  <p className="green text-sm pt-2">
                    The Entry Level classes focus on foundational knowledge in a
                    dynamic 2 months program. What you learn here will be enough
                    to start you career as an intern or entry level techie. Live
                    classes (onsite or virtual) are available every weekend and
                    you will earn a Certificate of Achievement at the end of
                    your course.
                  </p>
                  <span
                    onClick={handleRead}
                    className=" cursor-pointer nb green2 text-sm underline"
                  >
                    {readMore ? "Show Less" : "Read More"}
                  </span>

                  {/* Certificate Benefits */}
                  {readMore && (
                    <div className="mt-4 md:w-80 border border-black rounded-3xl p-4 md:p-8">
                      <Text
                        className="textcolor bold text-2xl text-center"
                        children="Benefits"
                      />
                      <div className="flex gap-4 py-4 items-center">
                        <div>
                          <Images className="w-4" src={chkgreen} />
                        </div>
                        <Text className="" children="Career Guidance" />
                      </div>
                      <div className="flex gap-4 py-2 items-center">
                        <div>
                          <Images className="w-4" src={chkgreen} />
                        </div>
                        <Text
                          className=""
                          children="2 Months Expert Training"
                        />
                      </div>
                      <div className="flex gap-4 py-2 items-center">
                        <div>
                          <Images className="w-4" src={chkgreen} />
                        </div>
                        <Text className="" children="Soft Skills Training" />
                      </div>
                      <div className="flex gap-4 py-2 items-center">
                        <div>
                          <Images className="w-4" src={chkgreen} />
                        </div>
                        <Text className="" children="Access to Community" />
                      </div>
                      <div className="flex gap-4 py-2 items-center">
                        <div>
                          <Images className="w-4" src={chkgreen} />
                        </div>
                        <Text className="" children="Weekly Live Classes" />
                      </div>
                      <div className="flex gap-4 py-2 items-center">
                        <div>
                          <Images className="w-4" src={chkgreen} />
                        </div>
                        <Text className="" children="Capstone Projects" />
                      </div>
                      <div className="flex gap-4 py-2 items-center">
                        <div>
                          <Images className="w-4" src={chkgreen} />
                        </div>
                        <Text
                          className=""
                          children="Certificate of Achievement"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="diploma-details" ref={diplomaref}>
                  <p className="green text-sm pt-2">
                    The Diploma seek to take you on a premium journey from
                    beginner to advanced level in your chosen field. 4 months
                    live classes, 2 semesters, high-level projects, added 1-2
                    months virtual internship with Pluralcode or one of our
                    hiring partners, building up to the perfect learning & work
                    experience all in one. And of course a globally recognized
                    diploma both from Pluralcode & one of our accreditation
                    partners in the US, Canada or Europe.
                  </p>
                  <span
                    onClick={handleRead}
                    className="cursor-pointer nb green2 text-sm underline"
                  >
                    {readMore ? "Show Less" : "Read More"}
                  </span>

                  {/*Diploma Benefits */}
                  {readMore && (
                    <div className="mt-4 border border-black rounded-3xl p-4 lg:p-8">
                      <Text
                        className="textcolor pb-4 bold text-2xl text-center"
                        children="Benefits"
                      />
                      <div className="flex flex-col lg:flex-row">
                        <div className="w-full">
                          <div className="flex gap-4 py-2 items-center">
                            <div className="w-4">
                              <Images className="w-full" src={chkgreen} />
                            </div>
                            <Text
                              className="w-full"
                              children="Career Guidance"
                            />
                          </div>
                          <div className="flex gap-4 py-2 items-center">
                            <div className="w-4">
                              <Images className="w-full" src={chkgreen} />
                            </div>
                            <Text
                              className="w-full"
                              children="4 Months Expert Training"
                            />
                          </div>
                          <div className="flex gap-4 py-2 items-center">
                            <div className="w-4">
                              <Images className="w-full" src={chkgreen} />
                            </div>
                            <Text
                              className="w-full"
                              children="Soft Skills Training"
                            />
                          </div>
                          <div className="flex gap-4 py-2 items-center">
                            <div className="w-4">
                              <Images className="w-full" src={chkgreen} />
                            </div>
                            <Text
                              className="w-full"
                              children="Access to Community"
                            />
                          </div>
                          <div className="flex gap-4 py-2 items-center">
                            <div className="w-4">
                              <Images className="w-full" src={chkgreen} />
                            </div>
                            <Text
                              className="w-full"
                              children="Weekly Live Classes"
                            />
                          </div>
                          <div className="flex gap-4 py-2 items-center">
                            <div className="w-4">
                              <Images className="w-full" src={chkgreen} />
                            </div>
                            <Text
                              className="w-full"
                              children="Access to Dozens of Expert videos "
                            />
                          </div>
                        </div>
                        <div className="w-full">
                          <div className="flex gap-4 py-2 items-center">
                            <div className="w-4">
                              <Images className="w-full" src={chkgreen} />
                            </div>
                            <Text
                              className="w-full"
                              children="Global Diploma Recognition"
                            />
                          </div>
                          <div className="flex gap-4 py-2 items-center">
                            <div className="w-4">
                              <Images className="w-full" src={chkgreen} />
                            </div>
                            <Text
                              className="w-full"
                              children="Professional Internship (1-2 months)"
                            />
                          </div>
                          <div className="flex gap-4 py-2 items-center">
                            <div className="w-4">
                              <Images className="w-full" src={chkgreen} />
                            </div>
                            <Text
                              className="w-full"
                              children="High-Level Capstone Projects"
                            />
                          </div>
                          <div className="flex gap-4 py-2 items-center">
                            <div className="w-4">
                              <Images className="w-full" src={chkgreen} />
                            </div>
                            <Text
                              className="w-full"
                              children="Higher Earning Potential"
                            />
                          </div>
                          <div className="flex gap-4 py-2 items-center">
                            <div className="w-4">
                              <Images className="w-full" src={chkgreen} />
                            </div>
                            <Text
                              className="w-full"
                              children="Beginner-Friendly"
                            />
                          </div>
                          <div className="flex gap-4 py-2 items-center">
                            <div className="w-4">
                              <Images className="w-full" src={chkgreen} />
                            </div>
                            <Text
                              className="w-full"
                              children="Graduation/Awards Ceremony"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="ad-input flex flex-col py-3">
                <label className="textdark pb-2">Course Of Interest</label>
                <select
                  name="course"
                  value={formD.course}
                  onChange={handleForm}
                  required
                  onClick={(e) => {
                    if (formD.course_level === "entry") {
                      const eachFee = certCourse
                        .map((fee) => fee)
                        .filter((each) => each.name === e.target.value);
                      console.log(eachFee);
                      setFee(eachFee);
                    } else {
                      const cF = diplomaCourse
                        .map((fee) => fee)
                        .filter((each) => each.name === e.target.value);
                      console.log(cF);
                      setFee(cF);
                    }
                  }}
                  className="w-full cursor-pointer flex items-center dp border px-7 py-4 outline-offset-2 outline-slate-500"
                >
                  <option value="ccc" className="dptext">
                    Select your course of interest
                  </option>

                  {formD.course_level === "entry"
                    ? certC
                    : diplomaCourse?.map((eachC) => {
                        return (
                          <option
                            key={eachC.id}
                            className="w-full"
                            value={eachC.name}
                            id={eachC.id}
                          >
                            {eachC.name}
                          </option>
                        );
                      })}
                </select>
              </div>
              <div className="ad-input flex flex-col py-3">
                <label className="textdark pb-2">Cohort (Start Month)</label>
                <select
                  type="text"
                  placeholder="Select your Cohort"
                  name="cohort"
                  onChange={handleForm}
                  required
                  className="w-full cursor-pointer flex items-center dp border px-7 py-4 outline-offset-2 outline-slate-500"
                >
                  <option value="">Select your Cohort</option>
                  {cohort?.map((each) => {
                    
                    return (
                      <option className="w-full" value={each.id} key={each.name}>
                        
                        {each.name}
                      </option>

                    );
                  })}
                </select>
              </div>

              <div className="live-details" ref={liveD}>
                <div className="ad-input flex flex-col py-3">
                  <label className="textdark pb-2">Class Format</label>
                  <div className="flex gap-8">
                    <div className="">
                      <label className="container text-base">
                        Virtual Class
                        <input
                          type="radio"
                          name="classF"
                          checked={formD.classF === "virtual_class"}
                          value="virtual_class"
                          onChange={handleForm}
                        />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                    <div className="physical" ref={physicalref}>
                      <label className="container text-base">
                        Physical Class
                        <input
                          type="radio"
                          name="classF"
                          value="physical_class"
                          checked={formD.classF === "physical_class"}
                          onChange={handleForm}
                        />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pay-body" ref={payBody}>
                <div className="ad-input flex flex-col py-3">
                  <label className="textdark pb-2">Select Payment Plan </label>
                  <div className="flex gap-8">
                    <div className="">
                      <label className="container text-base">
                        Full Payment
                        <input
                          type="radio"
                          name="payment_plan"
                          checked={formD.payment_plan === "full_payment"}
                          value="full_payment"
                          onChange={handleForm}
                        />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                    <div className="">
                      <label className="container text-base">
                        Part Payment
                        <input
                          type="radio"
                          name="payment_plan"
                          value="part_payment"
                          checked={formD.payment_plan === "part_payment"}
                          onChange={handleForm}
                        />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  </div>

                  {/* part payment note */}
                  <div
                    className="flex gap-3 pay items-baseline"
                    ref={partpay}
                    style={{ color: "#ff0000" }}
                  >
                    <div className="w-4 h-3 border paychk"></div>
                    <Text
                      className="w-full text-sm"
                      children="Kindly note that installment payment requires 70% down payment and Balance 4 weeks into the start of class."
                    />
                  </div>
                </div>
              </div>
              <div className="ad-input flex flex-col py-3">
                <label className="textdark pb-2">Currency</label>
                <div className="flex gap-8">
                  <div className="">
                    <label className="container text-base">
                      USD
                      <input
                        type="radio"
                        name="currency"
                        checked={formD.currency === "usd"}
                        value="usd"
                        onChange={handleForm}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <div className="naira" ref={nairaref}>
                    <label className="container text-base">
                      NGN
                      <input
                        type="radio"
                        name="currency"
                        value="ngn"
                        checked={formD.currency === "ngn"}
                        onChange={handleForm}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="ad-input flex flex-col py-3">
                <label className="textdark pb-2">Referral Code</label>
                <input
                  type="text"
                  placeholder="GSHJSJK"
                  className="px-7 py-4 outline-offset-2 outline-slate-500"
                />
              </div>
              <Text
                className="textdark ad-input pt-4"
                children="Refund Policy"
              />
              <p className="refund pt-2">
                A student is ONLY entitled to a refund if for any reason,
                Pluralcode is unable to carry out training duties for the
                cohort, if a cohort is cancelled or if a student has
                accidentally overpaid the cost of tuition. You can read more
                about our student policy below.
              </p>
              <div className="flex items-center gap-2 pt-4">
                <input
                  type="checkbox"
                  id="std_policy"
                  checked={checked}
                  onChange={handleCheck}
                  className="cursor-pointer"
                />
                <label>
                  By checking this box, you have read and agreed with
                  Pluralcode's
                  <span className="seccolor"> student policy</span>.
                </label>
              </div>
              {
                <p
                  className="text-3xl pt-4 text-center"
                  style={{ color: "#f00" }}
                >
                  {errMsg}
                </p>
              }
            </form>
          </div>
        </div>

        {/* right hand side */}
        <div className="w-full mt-8 lg:mt-0 lg:w-9/12 lg:ps-10">
          <div className="formright">
            <Text
              className="textcolor text-2xl text-center pt-8 lg:pt-0"
              children="Disclaimer"
            />
            <Text
              className="reg text-center w-full md:w-96 m-auto pt-4 pb-6"
              children="Please ensure that the name provided on the form is what you want on your certificate."
            />
            <div className="">
              <Text className="courseD pt-4" children="Course details" />
              <div className="flex justify-between items-center pt-4 pb-8">
                <div className="w-full textdark">
                  <Text
                    className="text-xl lg:text-2xl"
                    children={fee[0]?.name}
                  />
                  <p className="lg:text-lg">
                    Cohort | <span className="reg lg:text-lg">March 2023</span>
                  </p>
                </div>
                <p className="w-2/4 text-right boldIt lg:text-xl textdark">
                  {eachFee.sign}{" "}
                  {numFor.format(
                    isNaN(eachFee.subtotal) ? 0 : eachFee?.subtotal
                  )}{" "}
                  {eachFee.usd}
                </p>
              </div>
              {/* balance for part payment */}
              <div className="part-payment-fee" ref={partFee}>
                <div className="flex justify-between items-center pt-4 pb-8">
                  <div className="textdark">
                    <Text
                      className="text-xl lg:text-2xl"
                      children="Amount to pay (70%)"
                    />
                  </div>
                  <p className="boldIt lg:text-xl textdark">
                    {eachFee.sign}{" "}
                    {numFor.format(
                      isNaN(eachFee.amountDue) ? 0 : eachFee?.amountDue
                    )}{" "}
                    {eachFee.usd}
                  </p>
                </div>
                <div className="flex justify-between items-center pt-4 pb-8">
                  <div className="textdark">
                    <Text
                      className="text-xl lg:text-2xl"
                      children="Balance to pay (30%)"
                    />
                  </div>
                  <p className="boldIt lg:text-xl textdark">
                    {eachFee.sign}{" "}
                    {numFor.format(
                      isNaN(eachFee.balance) ? 0 : eachFee?.balance
                    )}{" "}
                    {eachFee.usd}
                  </p>
                </div>
              </div>

              <Text className="courseD " children="Summary" />
              <div className="summ lg:text-xl reg flex justify-between pt-2 pb-3 my-4">
                <Text className="" children="Sub Total:" />
                <p className="">
                  {eachFee.sign}{" "}
                  {numFor.format(
                    isNaN(eachFee.amountDue) ? 0 : eachFee.amountDue
                  )}{" "}
                  {eachFee.usd}
                </p>
              </div>
              <div className="summ lg:text-xl reg flex justify-between pt-2 pb-3 my-4">
                <Text className="" children="VAT:" />
                <p className="">
                  {eachFee.sign}{" "}
                  {numFor.format(isNaN(eachFee.vat) ? 0 : eachFee.vat)}{" "}
                  {eachFee.usd}
                </p>
              </div>
              <div className="summ lg:text-xl reg flex justify-between pt-2 pb-3 my-4">
                <Text className="" children="Transaction fee:" />
                <p className="">
                  {eachFee.sign}{" "}
                  {numFor.format(
                    isNaN(eachFee.transaction) ? 0 : eachFee.transaction
                  )}{" "}
                  {eachFee.usd}
                </p>
              </div>
              <div className="summ lg:text-xl flex justify-between pt-2 pb-3 my-4">
                <Text className="" children="Total:" />
                <p className="">
                  {eachFee.sign}{" "}
                  {isNaN(eachFee.total) ? 0 : numFor.format(eachFee?.total)}{" "}
                  {eachFee.usd}
                </p>
              </div>
              <div className="w-full md:w-96 m-auto rounded-xl py-8">
                <button
                  onClick={handleSubmit}
                  className="secbgcolor w-full py-3 md:py-4 text-white rounded-xl"
                >
                  Pay {eachFee.sign}{" "}
                  {numFor.format(isNaN(eachFee.total) ? 0 : eachFee.total)}{" "}
                  {eachFee.usd}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      
    </div>
  );
};

export default Form;
