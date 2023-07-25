import React, { useEffect, useRef, useState } from "react";
import Text from "../../atom/Text";
// import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import Images from "../../atom/Images";
import chkgreen from "../../images/Group.png";
import FormNav from "../../molecules/FormNav";
import HeaderAd from "./HeaderAd";
import { BiLoaderAlt } from "react-icons/bi";

const FormAd = () => {
  const liveD = useRef();
  const entryref = useRef();
  const diplomaref = useRef();
  const partpay = useRef();
  const physicalref = useRef();
  const nairaref = useRef();
  const payBody = useRef();
  const partFee = useRef();

  const numFor = Intl.NumberFormat("en-US");

  const [certCourse, setCertCourse] = useState([]);
  const [diplomaCourse, setDiplomaCourse] = useState([]);

  const [readMore, setReadMore] = useState(false);
  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);
  const [cohort, setCohort] = useState([]);
  const [fee, setFee] = useState([]);
  const [errMsg, setErrMsg] = useState();
  const [errMsgFn, setErrMsgFn] = useState();
  const [errMsgCh, setErrMsgCh] = useState();
  const [errMsgCo, setErrMsgCo] = useState();
  const [errMsgE, setErrMsgE] = useState();
  const [errMsgAl, setErrMsgAl] = useState();
  const [errMsgPn, setErrMsgPn] = useState();
  const [errMsgAr, setErrMsgAr] = useState();
  const [errMsgS, setErrMsgS] = useState();
  const [errMsgCt, setErrMsgCt] = useState();
  const [errMsgPp, setErrMsgPp] = useState();

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
  const [checkedpart, setCheckedpart] = useState(false);
  const handleCheckpart = () => {
    setCheckedpart(!checkedpart);
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
      })
      .catch((err) => console.log(err));
  }, []);

  // courses list
  useEffect(() => {
    fetch("https://backend.pluralcode.institute/course-list")
      .then((response) => response.json())
      .then((result) => {
        setCertCourse(result.certcourses);
        setDiplomaCourse(result.diplomacourses);
      })
      .catch((err) => console.log(err));
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
  const dipC = diplomaCourse?.map((eachC) => {
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
  });
  const handleForm = (event) => {
    setErrMsg("");
    setErrMsgAl("");
    setErrMsgAr("");
    setErrMsgCh("");
    setErrMsgCo("");
    setErrMsgCt("");
    setErrMsgE("");
    setErrMsgFn("");
    setErrMsgPn("");
    setErrMsgS("");
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
    } else if (value === "entry") {
      formD.payment_plan = "full_payment";
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
      //sort states of each country
      if (formD.country) {
        country
          .map((coun) => coun)
          .filter(
            (each) => each.name === formD.country && setState(each.states)
          );
      }

      if (formD.course_level === "entry") {
        certCourse
          .map((fee) => fee)
          .filter((each) => each.name === formD.course && setFee(each));
      } else if (formD.course_level === "diploma") {
        diplomaCourse
          .map((fee) => fee)
          .filter((each) => each.name === formD.course && setFee(each));
      }

      if (
        formD.currency === "ngn" &&
        formD.classF === "physical_class" &&
        formD.payment_plan === "full_payment"
      ) {
        setEachFee((prev) => {
          return {
            ...prev,
            amountDue:
              fee?.course_onsite_fees?.onsite_course_full_payment_fees_ngn
                .onsite_course_fee_ngn,
            subtotal:
              fee?.course_onsite_fees?.onsite_course_full_payment_fees_ngn
                .onsite_course_fee_ngn,
            vat: fee?.course_onsite_fees?.onsite_course_full_payment_fees_ngn
              ?.onsite_course_vat_fee_ngn,
            transaction:
              fee?.course_onsite_fees?.onsite_course_full_payment_fees_ngn
                ?.onsite_course_transaction_fee_ngn,
            total:
              fee?.course_onsite_fees?.onsite_course_full_payment_fees_ngn
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
            fee?.course_onsite_fees?.onsite_part_paymentcourse_fees_ngn
              ?.onsite_part_payment_course_fee,
          amountDue:
            fee?.course_onsite_fees?.onsite_part_paymentcourse_fees_ngn
              ?.onsite_part_payment_course_fee_ngn_due_amount,
          vat: fee?.course_onsite_fees?.onsite_part_paymentcourse_fees_ngn
            .onsite_part_payment_course_vat_fee_ngn,
          transaction:
            fee?.course_onsite_fees?.onsite_part_paymentcourse_fees_ngn
              .onsite_part_payment_course_transaction_fee_ngn,
          total:
            fee?.course_onsite_fees?.onsite_part_paymentcourse_fees_ngn
              .onsite_part_payment_course_total_fee_ngn,
          balance:
            fee?.course_onsite_fees?.onsite_part_paymentcourse_fees_ngn
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
            fee?.course_virtual_fee?.virtual_course_full_payment_fees_ngn
              ?.virtual_course_fee_ngn,
          subtotal:
            fee?.course_virtual_fee?.virtual_course_full_payment_fees_ngn
              ?.virtual_course_fee_ngn,
          vat: fee?.course_virtual_fee?.virtual_course_full_payment_fees_ngn
            ?.virtual_course_vat_fee_ngn,
          transaction:
            fee?.course_virtual_fee?.virtual_course_full_payment_fees_ngn
              ?.virtual_course_transaction_fee_ngn,
          total:
            fee?.course_virtual_fee?.virtual_course_full_payment_fees_ngn
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
            fee?.course_virtual_fee?.virtual_part_paymentcourse_fees_ngn
              ?.virtual_part_payment_course_fee,
          amountDue:
            fee?.course_virtual_fee?.virtual_part_paymentcourse_fees_ngn
              ?.virtual_part_payment_course_fee_ngn_due_amount,
          vat: fee?.course_virtual_fee?.virtual_part_paymentcourse_fees_ngn
            ?.virtual_part_payment_course_vat_fee_ngn,
          transaction:
            fee?.course_virtual_fee?.virtual_part_paymentcourse_fees_ngn
              ?.virtual_part_payment_course_transaction_fee_ngn,
          total:
            fee?.course_virtual_fee?.virtual_part_paymentcourse_fees_ngn
              ?.virtual_part_payment_course_total_fee_ngn,
          balance:
            fee?.course_virtual_fee?.virtual_part_paymentcourse_fees_ngn
              ?.virtualbalance_ngn,
          sign: <span>&#8358;</span>,
        });
      }

      // for usd
      if (formD.currency === "usd" && formD.payment_plan === "full_payment") {
        setEachFee({
          amountDue:
            fee?.course_virtual_fee?.virtual_course_full_payment_fees_usd
              ?.virtual_course_fee_usd,
          subtotal:
            fee?.course_virtual_fee?.virtual_course_full_payment_fees_usd
              ?.virtual_course_fee_usd,
          vat: fee?.course_virtual_fee?.virtual_course_full_payment_fees_usd
            ?.virtual_course_vat_fee_usd,
          transaction:
            fee?.course_virtual_fee?.virtual_course_full_payment_fees_usd
              ?.virtual_course_transaction_fee_usd,
          total:
            fee?.course_virtual_fee?.virtual_course_full_payment_fees_usd
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
            fee?.course_virtual_fee?.virtual_part_paymentcourse_fees_usd
              ?.virtual_part_payment_course_fee,
          amountDue:
            fee?.course_virtual_fee?.virtual_part_paymentcourse_fees_usd
              ?.virtual_part_payment_course_fee_usd_due_amount,
          vat: fee?.course_virtual_fee?.virtual_part_paymentcourse_fees_usd
            ?.virtual_part_payment_course_vat_fee_usd,
          transaction:
            fee?.course_virtual_fee?.virtual_part_paymentcourse_fees_usd
              ?.virtual_part_payment_course_transaction_fee_usd,
          total:
            fee?.course_virtual_fee?.virtual_part_paymentcourse_fees_usd
              ?.virtual_part_payment_course_total_fee_usd,
          balance:
            fee?.course_virtual_fee?.virtual_part_paymentcourse_fees_usd
              ?.virtualbalance_usd,
          sign: <span>&#36;</span>,
          usd: "(USD)",
        });
      }
    }
    gg();
  }, [formD, fee, country, certCourse, diplomaCourse]);

  //submit the form
  var rn = require("random-number");
  var options = {
    max: 987, // example input , yes negative values do work
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const sp = document.querySelector(".spin");
    if (checked) {
      //for part payment
      if (formD.payment_plan === "part_payment" && checkedpart !== true) {
        setErrMsgPp("box must be checked!");
        return;
      }

      if (formD.full_name === "") {
        setErrMsgFn("Fullname required!");
        setErrMsg("All fields required!");
      } else if (formD.email === "") {
        setErrMsgE("Email required!");
        setErrMsg("All fields required!");
      } else if (formD.phone_number === "") {
        setErrMsgPn("Phone number required!");
        setErrMsg("All fields required!");

      } else if (formD.academy_level === "") {
        setErrMsgAl("Academy level required!");
        setErrMsg("All fields required!");

      } else if (formD.age_range === "") {
        setErrMsgAr("Age range required!");
        setErrMsg("All fields required!");

      } else if (formD.country === "") {
        setErrMsgCt("Country required!");
        setErrMsg("All fields required!");

      }else if (formD.state === "") {
        setErrMsgS("State required!");
        setErrMsg("All fields required!");

      }  else if (formD.course === "") {
        setErrMsgCo("Course required!");
        setErrMsg("All fields required!");

      } else if (formD.cohort === "") {
        setErrMsgCh("Cohort required!");
        setErrMsg("All fields required!");

      } else {
        sp.style.display = "block";

        const raw = JSON.stringify({
          tx_ref: "plc-" + rn(options),
          amount: eachFee.total,
          currency: formD.currency.toUpperCase(),
          title: formD.course + " Enrollment",
          redirect_url: `https://bright-cuchufli-2253ee.netlify.app/payment?name=${
            formD.full_name
          }&email=${formD.email}&phone_number=${formD.phone_number}&mode=${
            formD.classF
          }&course=${formD.course}&country=${formD.country}&state=${
            formD.state
          }&currency=${formD.currency.toUpperCase()}&cohort_id=${
            formD.cohort
          }&courseid=${fee.id}&program=${formD.course_level}&academy=${
            formD.academy_level
          }&balance=${eachFee.balance}&total=${eachFee.total}&age=${
            formD.age_range
          }&pay=${formD.payment_plan}`,
          email: formD.email,
          phonenumber: formD.phone_number,
          name: formD.full_name,
        });
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const reqMethod = {
          method: "POST",
          headers: myHeaders,
          body: raw,
        };

        const url = "https://backend.pluralcode.institute/initialise-payment";

        fetch(url, reqMethod)
          .then((response) => response.json())
          .then((result) => {
            console.log(result);
            window.location.href = result.data.link;
            sp.style.display = "none";
          })
          .catch((err) => console.log(err));
      }
    } else {
      setErrMsg("Box must be checked!");
    }
  };

  return (
    <>
      <FormNav
        subtotal={eachFee.total}
        amountdue={eachFee.amountDue}
        vat={eachFee.vat}
        transaction={eachFee.transaction}
        balance={eachFee.balance}
        total={eachFee.total}
        name={fee?.name}
        sign={eachFee.sign}
        usd={eachFee.usd}
        form={formD}
      />

      <HeaderAd />

      <div className="w-full bg-white p-4 md:p-6 lg:px-16 lg:py-14">
        {/* certificate details */}
        <div className="w-full  cert-body pt-8 lg:pt-16 flex flex-col lg:flex-row lg:gap-2">
          <div className="w-full formleft">
            <div>
              <Text
                className="per-info text-center textcolor"
                children="Fill the form below"
              />
              <form className="pt-0 lg:pt-4">
                <p className="lg:hidden pb-2 enroltxt textcolor text-center">
                  Once your enrollment is complete, you will receive an email
                  address with your admission package, receipts, welcome letter,
                  links to student community, course materials & login access to
                  your Student Learning Portal.
                </p>
                <div className="ad-input flex flex-col py-2 lg:py-3">
                  <label className="textdark pb-2">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter full name"
                    name="full_name"
                    value={formD.full_name}
                    onChange={handleForm}
                    required
                    className="p-3 lg:px-7 lg:py-4 outline-offset-2 outline-slate-500"
                  />
                  <p className="text-red-600">{errMsgFn}</p>
                </div>
                <div className="ad-input flex flex-col py-2 lg:py-3">
                  <label className="textdark pb-2">Email *</label>
                  <input
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={formD.email}
                    onChange={handleForm}
                    required
                    className="p-3 lg:px-7 lg:py-4 outline-offset-2 outline-slate-500"
                  />
                  <p className="text-red-600">{errMsgE}</p>
                </div>
                <div className="ad-input flex flex-col py-2 lg:py-3">
                  <label className="textdark pb-2">Phone Number</label>
                  <input
                    type="text"
                    placeholder="Enter phone number"
                    name="phone_number"
                    value={formD.phone_number}
                    onChange={handleForm}
                    required
                    className="p-3 lg:px-7 lg:py-4 outline-offset-2 outline-slate-500"
                  />
                  <p className="text-red-600">{errMsgPn}</p>
                </div>
                <div className="ad-input flex flex-col py-2 lg:py-3">
                  <label className="textdark pb-2">Highest Academy Level</label>
                  <select
                    name="academy_level"
                    value={formD.academy_level}
                    onChange={handleForm}
                    required
                    className="w-full cursor-pointer flex items-center dp border p-3 lg:px-7 lg:py-4 outline-offset-2 outline-slate-500"
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
                    <option value="high/secondary" className="dptext">
                      High School / Secondary School
                    </option>
                    <option value="undergraduate" className="dptext">
                      Under Graduate
                    </option>
                    <option value="junior/middle" className="dptext">
                      Junior / Middle School
                    </option>
                    <option value="postgraduate" className="dptext">
                      Post Graduate
                    </option>
                  </select>
                  <p className="text-red-600">{errMsgAl}</p>
                </div>
                <div className="ad-input flex flex-col py-2 lg:py-3">
                  <label className="textdark pb-2">Age Range</label>
                  <select
                    name="age_range"
                    value={formD.age_range}
                    onChange={handleForm}
                    required
                    className="w-full cursor-pointer flex items-center dp border p-3 lg:px-7 lg:py-4 outline-offset-2 outline-slate-500"
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
                  <p className="text-red-600">{errMsgAr}</p>
                </div>
                <div className="w-full flex flex-row gap-4 lg:gap-6">
                  <div className="w-full ad-input flex flex-col py-2 lg:py-3">
                    <label className="textdark pb-2">Country</label>
                    <select
                      placeholder="Enter your country"
                      name="country"
                      value={formD.country}
                      onChange={handleForm}
                      required
                      className="w-full border dp p-3 lg:px-7 lg:py-4 outline-offset-2 outline-slate-500"
                    >
                      {country?.map((each) => {
                        if (each.states.length > 0) {
                          return (
                            <option key={each.iso3} value={each.name}>
                              {each.name}
                            </option>
                          );
                        }
                        return null;
                      })}
                    </select>
                    <p className="text-red-600">{errMsgCt}</p>
                  </div>
                  <div className="w-full ad-input flex flex-col py-2 lg:py-3">
                    <label className="textdark pb-2">State</label>
                    <select
                      placeholder="Enter your state"
                      name="state"
                      value={formD.state}
                      onChange={handleForm}
                      required
                      className="w-full border dp p-3 lg:px-7 lg:py-4 outline-offset-2 outline-slate-500"
                    >
                      {state?.map((eachS) => {
                        return (
                          <option className="w-full lg:pe-7" key={eachS.name}>
                            {eachS.name}
                          </option>
                        );
                      })}
                    </select>
                    <p className="text-red-600">{errMsgS}</p>
                  </div>
                </div>

                <div className="ad-input flex flex-col py-2 lg:py-3">
                  <label className="textdark pb-2">Course Level</label>
                  <div className="flex gap-8">
                    <div className="">
                      <label className="container text-base ten">
                        Diploma{" "}
                        <span className="text-xs eight">
                          (Beginner to Advanced)
                        </span>
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
                      <label className="container text-base ten">
                        Entry Level{" "}
                        <span className="eight text-xs">(Beginner)</span>
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
                    <p className="green text-xs lg:text-sm pt-2">
                      The Entry Level classes focus on foundational knowledge in
                      a dynamic 2 months program. What you learn here will be
                      enough to start you career as an intern or entry level
                      techie. Live classes (onsite or virtual) are available
                      every weekend and you will earn a Certificate of
                      Achievement at the end of your course.
                    </p>
                    <span
                      onClick={handleRead}
                      className=" cursor-pointer nb green2 text-xs lg:text-sm underline"
                    >
                      {readMore ? "Show Less" : "Read More"}
                    </span>

                    {/* Certificate Benefits */}
                    {readMore && (
                      <div className="mt-4 md:w-80 border border-black rounded-3xl p-4 md:p-8">
                        <Text
                          className="textcolor bold text-base lg:text-2xl text-center"
                          children="Benefits"
                        />
                        <div className="flex gap-4 py-2 items-center">
                          <div>
                            <Images className="w-3 lg:w-4" src={chkgreen} />
                          </div>
                          <Text
                            className="text-sm lg:text-base"
                            children="Career Guidance"
                          />
                        </div>
                        <div className="flex gap-4 py-2 items-center">
                          <div>
                            <Images className="w-3 lg:w-4" src={chkgreen} />
                          </div>
                          <Text
                            className="text-sm lg:text-base"
                            children="2 Months Expert Training"
                          />
                        </div>
                        <div className="flex gap-4 py-2 items-center">
                          <div>
                            <Images className="w-3 lg:w-4" src={chkgreen} />
                          </div>
                          <Text
                            className="text-sm lg:text-base"
                            children="Soft Skills Training"
                          />
                        </div>
                        <div className="flex gap-4 py-2 items-center">
                          <div>
                            <Images className="w-3 lg:w-4" src={chkgreen} />
                          </div>
                          <Text
                            className="text-sm lg:text-base"
                            children="Access to Community"
                          />
                        </div>
                        <div className="flex gap-4 py-2 items-center">
                          <div>
                            <Images className="w-3 lg:w-4" src={chkgreen} />
                          </div>
                          <Text
                            className="text-sm lg:text-base"
                            children="Weekly Live Classes"
                          />
                        </div>
                        <div className="flex gap-4 py-2 items-center">
                          <div>
                            <Images className="w-3 lg:w-4" src={chkgreen} />
                          </div>
                          <Text
                            className="text-sm lg:text-base"
                            children="Capstone Projects"
                          />
                        </div>
                        <div className="flex gap-4 py-2 items-center">
                          <div>
                            <Images className="w-3 lg:w-4" src={chkgreen} />
                          </div>
                          <Text
                            className="text-sm lg:text-base"
                            children="Certificate of Achievement"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="diploma-details" ref={diplomaref}>
                    <p className="green text-xs lg:text-sm pt-2">
                      The Diploma seek to take you on a premium journey from
                      beginner to advanced level in your chosen field. 4 months
                      live classes, 2 semesters, high-level projects, added 1-2
                      months virtual internship with Pluralcode or one of our
                      hiring partners, building up to the perfect learning &
                      work experience all in one. And of course a globally
                      recognized diploma both from Pluralcode & one of our
                      accreditation partners in the US, Canada or Europe.
                    </p>
                    <span
                      onClick={handleRead}
                      className="cursor-pointer nb green2 text-xs lg:text-sm underline"
                    >
                      {readMore ? "Show Less" : "Read More"}
                    </span>

                    {/*Diploma Benefits */}
                    {readMore && (
                      <div className="mt-4 border border-black rounded-3xl p-2 lg:p-8">
                        <Text
                          className="textcolor pb-4 bold text-base lg:text-2xl text-center"
                          children="Benefits"
                        />
                        <div className="flex flex-row">
                          <div className="w-full">
                            <div className="flex gap-2 lg:gap-4 py-2 items-center">
                              <div className="w-3 lg:w-4">
                                <Images className="w-full" src={chkgreen} />
                              </div>
                              <Text
                                className="w-full text-sm lg:text-base"
                                children="Career Guidance"
                              />
                            </div>
                            <div className="flex gap-2 lg:gap-4 py-2 items-center">
                              <div className="w-3 lg:w-4">
                                <Images className="w-full" src={chkgreen} />
                              </div>
                              <Text
                                className="w-full text-sm lg:text-base"
                                children="4 Months Expert Training"
                              />
                            </div>
                            <div className="flex gap-2 lg:gap-4 py-2 items-center">
                              <div className="w-3 lg:w-4">
                                <Images className="w-full" src={chkgreen} />
                              </div>
                              <Text
                                className="w-full text-sm lg:text-base"
                                children="Soft Skills Training"
                              />
                            </div>
                            <div className="flex gap-2 lg:gap-4 py-2 items-center">
                              <div className="w-3 lg:w-4">
                                <Images className="w-full" src={chkgreen} />
                              </div>
                              <Text
                                className="w-full text-sm lg:text-base"
                                children="Access to Community"
                              />
                            </div>
                            <div className="flex gap-2 lg:gap-4 py-2 items-center">
                              <div className="w-3 lg:w-4">
                                <Images className="w-full" src={chkgreen} />
                              </div>
                              <Text
                                className="w-full text-sm lg:text-base"
                                children="Weekly Live Classes"
                              />
                            </div>
                            <div className="flex gap-2 lg:gap-4 py-2 items-center">
                              <div className="w-3 lg:w-4">
                                <Images className="w-full" src={chkgreen} />
                              </div>
                              <Text
                                className="w-full text-sm lg:text-base"
                                children="Access to Dozens of Expert videos "
                              />
                            </div>
                          </div>
                          <div className="w-full">
                            <div className="flex gap-2 lg:gap-4 py-2 items-center">
                              <div className="w-3 lg:w-4">
                                <Images className="w-full" src={chkgreen} />
                              </div>
                              <Text
                                className="w-full text-sm lg:text-base"
                                children="Global Diploma Recognition"
                              />
                            </div>
                            <div className="flex gap-2 lg:gap-4 py-2 items-center">
                              <div className="w-3 lg:w-4">
                                <Images className="w-full" src={chkgreen} />
                              </div>
                              <Text
                                className="w-full text-sm lg:text-base"
                                children="Professional Internship (1-2 months)"
                              />
                            </div>
                            <div className="flex gap-2 lg:gap-4 py-2 items-center">
                              <div className="w-3 lg:w-4">
                                <Images className="w-full" src={chkgreen} />
                              </div>
                              <Text
                                className="w-full text-sm lg:text-base"
                                children="High-Level Capstone Projects"
                              />
                            </div>
                            <div className="flex gap-2 lg:gap-4 py-2 items-center">
                              <div className="w-3 lg:w-4">
                                <Images className="w-full" src={chkgreen} />
                              </div>
                              <Text
                                className="w-full text-sm lg:text-base"
                                children="Higher Earning Potential"
                              />
                            </div>
                            <div className="flex gap-2 lg:gap-4 py-2 items-center">
                              <div className="w-3 lg:w-4">
                                <Images className="w-full" src={chkgreen} />
                              </div>
                              <Text
                                className="w-full text-sm lg:text-base"
                                children="Beginner-Friendly"
                              />
                            </div>
                            <div className="flex gap-2 lg:gap-4 py-2 items-center">
                              <div className="w-3 lg:w-4">
                                <Images className="w-full" src={chkgreen} />
                              </div>
                              <Text
                                className="w-full text-sm lg:text-base"
                                children="Graduation/Awards Ceremony"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="ad-input flex flex-col py-2 lg:py-3">
                  <label className="textdark pb-2">Course Of Interest</label>
                  <select
                    name="course"
                    value={formD.course}
                    onChange={handleForm}
                    required
                    className="w-full cursor-pointer flex items-center dp border p-3 lg:px-7 lg:py-4 outline-offset-2 outline-slate-500"
                  >
                    <option value="ccc" className="dptext">
                      Select your course of interest
                    </option>

                    {formD.course_level === "entry" ? certC : dipC}
                  </select>
                  <p className="text-red-600">{errMsgCo}</p>
                </div>
                <div className="ad-input flex flex-col py-2 lg:py-3">
                  <label className="textdark pb-2">Cohort (Start Month)</label>
                  <select
                    type="text"
                    placeholder="Select your Cohort"
                    name="cohort"
                    onChange={handleForm}
                    required
                    className="w-full cursor-pointer flex items-center dp border p-3 lg:px-7 lg:py-4 outline-offset-2 outline-slate-500"
                  >
                    <option value="">Select your Cohort</option>
                    {cohort?.map((each) => {
                      return (
                        <option
                          className="w-full"
                          value={each.id}
                          key={each.name}
                        >
                          {each.name}
                        </option>
                      );
                    })}
                  </select>
                  <p className="text-red-600">{errMsgCh}</p>
                </div>

                <div className="live-details" ref={liveD}>
                  <div className="ad-input flex flex-col pt-2 lg:py-3">
                    <label className="textdark pb-2">Class Format</label>
                    <div className="flex gap-8">
                      <div className="">
                        <label className="container text-base ten">
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
                        <label className="container text-base ten">
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
                  <div className="ad-input flex flex-col py-0 lg:py-3">
                    <label className="textdark pb-2">
                      Select Payment Plan{" "}
                    </label>
                    <div className="flex gap-8">
                      <div className="">
                        <label className="container text-base ten">
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
                        <label className="container text-base ten">
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
                      <input
                        type="checkbox"
                        checked={checkedpart}
                        onChange={handleCheckpart}
                      />
                      <Text
                        className="w-full text-sm"
                        children="Kindly note that installment payment requires 70% down payment and Balance 4 weeks into the start of class."
                      />
                    </div>
                    <p className="text-red-500 lg:text-lg">{errMsgPp}</p>
                  </div>
                </div>
                <div className="ad-input flex flex-col py-0 lg:py-3">
                  <label className="textdark pb-2">Currency</label>
                  <div className="flex gap-8">
                    <div className="">
                      <label className="container text-base ten">
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
                      <label className="container text-base ten">
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

                <div className="ad-input flex flex-col py-2 lg:py-3">
                  <label className="textdark pb-2">Referral Code</label>
                  <input
                    type="text"
                    placeholder="GSHJSJK"
                    className="p-3 lg:px-7 lg:py-4 outline-offset-2 outline-slate-500"
                    disabled
                  />
                </div>
                <Text
                  className="textdark ad-input pt-4"
                  children="Refund Policy"
                />
                <p className="refund lg:pt-2 ">
                  A student is ONLY entitled to a refund if for any reason,
                  Pluralcode is unable to carry out training duties for the
                  cohort, if a cohort is cancelled or if a student has
                  accidentally overpaid the cost of tuition. You can read more
                  about our student policy below.
                </p>
                <div className="flex gap-2 pt-4">
                  <input
                    type="checkbox"
                    id="std_policy"
                    checked={checked}
                    onChange={handleCheck}
                    className="cursor-pointer lg:w-5"
                  />
                  <label className="text-xs lg:text-base w-full">
                    By checking this box, you have read and agreed with
                    Pluralcode's
                    <span className="seccolor">
                      <Link
                        to="https://pluralcode.academy/payment/terms.html"
                        target="_blank"
                      >
                        {" "}
                        student policy
                      </Link>
                    </span>
                    .
                  </label>
                </div>
                {
                  <p
                    className="text-xl lg:text-2xl pt-4 text-center"
                    style={{ color: "#f00" }}
                  >
                    {errMsg}
                  </p>
                }
                <div className="block lg:hidden w-full md:w-96 m-auto rounded-xl py-4">
                  <button
                    onClick={handleSubmit}
                    className="secbgcolor justify-center flex items-center w-full py-3 md:py-4 text-white rounded-xl"
                  >
                    <div id="spinn" className="spin animate-spin text-2xl mr-4">
                      <BiLoaderAlt />
                    </div>
                    Pay {eachFee.sign}{" "}
                    {numFor.format(isNaN(eachFee.total) ? 0 : eachFee.total)}{" "}
                    {eachFee.usd}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* right hand side */}
          <div className="hidden lg:block w-full mt-8 lg:mt-0 lg:w-9/12 lg:ps-10">
            <div className="formright">
              <Text
                className="textcolor text-2xl text-center pt-6 lg:pt-0"
                children="Disclaimer"
              />
              <Text
                className="reg text-center w-full md:w-96 m-auto pt-2 pb-6"
                children="Please ensure that the name provided on the form is what you want on your certificate."
              />
              <div className="">
                <Text className="courseD" children="Course details" />
                <div className="flex justify-between items-center pt-4 pb-4">
                  <div className="w-full textdark">
                    <Text
                      className="text-xl lg:text-2xl"
                      children={fee?.name}
                    />
                    <p className="lg:text-lg">
                      Cohort |{" "}
                      <span className="reg lg:text-lg">March 2023</span>
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
                  <div className="flex justify-between items-center pb-4">
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
                <div className="w-full md:w-96 m-auto rounded-xl pt-4">
                  <button
                    onClick={handleSubmit}
                    className="secbgcolor justify-center flex items-center w-full py-3 md:py-4 text-white rounded-xl"
                  >
                    <div
                      id="spinn2"
                      className="spin animate-spin text-2xl mr-4"
                    >
                      <BiLoaderAlt />
                    </div>
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
    </>
  );
};

export default FormAd;
