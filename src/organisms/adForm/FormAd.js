import React, { useEffect, useRef, useState } from "react";
import Text from "../../atom/Text";
// import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
// import Images from "../../atom/Images";
// import chkgreen from "../../images/Group.png";
import FormNav from "../../molecules/FormNav";
import HeaderAd from "./HeaderAd";
import { BiLoaderAlt } from "react-icons/bi";

const FormAd = () => {
  const liveD = useRef();
  // const diplomaplusref = useRef();
  // const diplomaref = useRef();
  const partpay = useRef();
  const physicalref = useRef();
  const virtualref = useRef();
  const nairaref = useRef();
  const usdtref = useRef();
  const payBody = useRef();
  const partFee = useRef();

  const numFor = Intl.NumberFormat("en-US");

  // get referral code
  const params = new URLSearchParams(window.location.search);
  const referral = params.get("referral_code");
  const getSandbox = params.get("sandbox");

  const [diplomaPlusCourse, setDiplomaPlusCourse] = useState([]);
  const [sandbox, setSandbox] = useState([]);
  const [diplomaCourse, setDiplomaCourse] = useState([]);
  const [showSandbox, setShowSandbox] = useState(false);
  const [showDip, setShowDip] = useState(true);
  const [advisor, setAdvisor] = useState({})
  const [readMore, setReadMore] = useState(false);
  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);
  const [cohort, setCohort] = useState([]);
  const [chname, setchname] = useState([]);
  const [fee, setFee] = useState([]);
  const [emailmsg, setEmailmsg] = useState("");
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
  const [duplicate, setDuplicate] = useState();
  const [oldPrice, setOldPrice] = useState({
    price: "",
    date: "",
  });

  const [eachFee, setEachFee] = useState({
    partpaymentbalancepercentage: "",
    partpaymentpercentage: "",
    offset: "",
    discount_deadline: "",
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
    country: "Nigeria",
    state: "Lagos State",
  });


  //display course level
  // useEffect(() => {
  //   if (getSandbox === "1") {
  //     setShowDip(false);
  //     setShowSandbox(true);
  //     setFee({
  //       name: formD.course,
  //     });
  //     physicalref.current.style.display = "none";
  //     payBody.current.style.display = "none";
  //     diplomaplusref.current.style.display = "none";
  //     diplomaplusref.current.style.display = "none";
  //     formD.course_level = "sandbox";
  //   }
  // }, [showSandbox, getSandbox, showDip, formD]);

 
  // countries list
   useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries/states")
      .then((response) => response.json())
      .then((result) => {
        setCountry(result?.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // courses list
  useEffect(() => {
    fetch("https://backend.pluralcode.institute/course-list")
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        setSandbox(result?.sandboxonly);
        setDiplomaCourse(result?.diplomacourses);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch(`https://backend.pluralcode.institute/get_advisor_info?ref_id=${referral}`)
      .then((response) => response.json())
      .then((result) => {
        setAdvisor(result?.advisor_details)
      })
      .catch((error) => console.log(error))
  }, [referral])

  // //diploma + sandbox list
  // useEffect(() => {
  //   const arr = [];
  //   diplomaCourse.map((each) => {
  //     if (each.sandbox_status === 1) {
  //       arr.push(each);
  //     }
  //     return setDiplomaPlusCourse(arr);
  //   });
  // }, [diplomaCourse]);

  // cohort list
  useEffect(() => {
    fetch("https://backend.pluralcode.institute/cohort-list")
      .then((response) => response.json())
      .then((result) => {
        setCohort(result?.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // diploma + sandbox courses
  // const dipplusC = diplomaPlusCourse?.map((eachC) => {
  //   return (
  //     <option
  //       key={eachC.id}
  //       value={eachC.name}
  //       id={eachC.id}
  //       className="w-full"
  //     >
  //       {eachC.name}
  //     </option>
  //   );
  // });
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
    // if (formD.course_level === "sandbox") {
    //   payBody.current.style.display = "none";
    //   physicalref.current.style.display = "none";
    // } else if (value === "diploma") {
    //   diplomaref.current.style.display = "block";
    //   diplomaplusref.current.style.display = "none";
    //   payBody.current.style.display = "block";
    //   formD.course = "";
    //   setFee([]);
    // }else if (value === "diplomaplus") {
    //   diplomaplusref.current.style.display = "block";
    //   diplomaref.current.style.display = "none";
    //   payBody.current.style.display = "block";
    //   formD.course = "";
    //   setFee([]);
    // }

    payBody.current.style.display = "block";


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
      //email message
      if (formD.email) {
        setEmailmsg(
          "Kindly enter the email address you will use to access your student portal. If you are a returning student, kindly us your registered email address here"
        );
      }

      //sort states of each country
      if (formD.country) {
        country
          .map((coun) => coun)
          .filter(
            (each) => each.name === formD.country && setState(each.states)
          );
      }

      // for currency
      if (formD.country === "Nigeria") {
        nairaref.current.style.display = "block";
      } else if (formD.country !== "Nigeria") {
        physicalref.current.style.display = "none";
        // formD.currency = "usd";
        nairaref.current.style.display = "none";
      }
      // for class format
      if (formD.course_level === "sandbox") {
        formD.classF = "virtual_class";
        physicalref.current.style.display = "none";
      } else if (formD.state === "Lagos State" && formD.country === "Nigeria" && fee?.course_onsite_fees?.onsite_course_full_payment_fees_ngn.hasOwnProperty('onsite_course_fee_ngn')
      ) {
        physicalref.current.style.display = "block";
      } else if (formD.state === "Lagos State" && formD.country === "Nigeria" && fee?.course_onsite_fees?.onsite_course_full_payment_fees_ngn.hasOwnProperty('onsite_course_fee_ngn') === false
      ) {
        physicalref.current.style.display = "none";
      } else if (formD.state !== "Lagos State") {
        formD.classF = "virtual_class";
        physicalref.current.style.display = "none";
      }

      if (formD.course_level === "diplomaplus") {
        diplomaPlusCourse
          .map((fee) => fee)
          .filter((each) => each.name === formD.course && setFee(each));
      } else if (formD.course_level === "diploma") {
        diplomaCourse
          .map((fee) => fee)
          .filter((each) => each.name === formD.course && setFee(each));
      }


      // for ngn

      // if (
      //   formD.currency === "ngn" &&
      //   formD.classF === "physical_class" &&
      //   formD.payment_plan === "full_payment" &&
      //   formD.course_level === "diplomaplus"
      // ) {
      //   setEachFee((prev) => {
      //     return {
      //       ...prev,
      //       partpaymentbalancepercentage: 30,
      //       partpaymentpercentage: 70,
      //       offset: fee?.actual_combo_course_fee_ngn_onsite,
      //       discount_deadline: fee?.combo_discount_deadline,
      //       amountDue:
      //         fee?.combo_course_onsite_fees
      //           ?.combo_onsite_course_full_payment_fees_ngn
      //           ?.combo_onsite_course_fee_ngn,
      //       subtotal:
      //         fee?.combo_course_onsite_fees
      //           ?.combo_onsite_course_full_payment_fees_ngn
      //           ?.combo_onsite_course_fee_ngn,
      //       vat: fee?.course_onsite_fees?.onsite_course_full_payment_fees_ngn
      //         ?.onsite_course_vat_fee_ngn,
      //       transaction:
      //         fee?.combo_course_onsite_fees
      //           ?.combo_onsite_course_full_payment_fees_ngn
      //           ?.combo_onsite_course_transaction_fee_ngn,
      //       total:
      //         fee?.combo_course_onsite_fees
      //           ?.combo_onsite_course_full_payment_fees_ngn
      //           ?.combo_onsite_course_total_fee_ngn,
      //       balance:
      //         fee?.combo_course_onsite_fees
      //           ?.combo_onsite_part_paymentcourse_fees_ngn
      //           ?.combo_onsitebalance_ngn,
      //       sign: <span>&#8358;</span>,
      //       usd: "",
      //     };
      //   });
      // } else if (
      //   formD.currency === "ngn" &&
      //   formD.classF === "physical_class" &&
      //   formD.payment_plan === "part_payment" &&
      //   formD.course_level === "diplomaplus"
      // ) {
      //   setEachFee((prev) => {
      //     return {
      //       ...prev,
      //       partpaymentbalancepercentage: 30,
      //       partpaymentpercentage: 70,
      //       offset: fee?.actual_combo_course_fee_ngn_onsite,
      //       discount_deadline: fee?.combo_discount_deadline,
      //       amountDue:
      //         fee?.combo_course_onsite_fees
      //           ?.combo_onsite_part_paymentcourse_fees_ngn
      //           ?.combo_onsite_part_payment_course_fee_ngn_due_amount,
      //       subtotal:
      //         fee?.combo_course_onsite_fees
      //           ?.combo_onsite_part_paymentcourse_fees_ngn
      //           ?.combo_onsite_part_payment_course_fee,
      //       vat: fee?.course_onsite_fees?.onsite_course_full_payment_fees_ngn
      //         ?.onsite_course_vat_fee_ngn,
      //       transaction:
      //         fee?.combo_course_onsite_fees
      //           ?.combo_onsite_part_paymentcourse_fees_ngn
      //           ?.combo_onsite_part_payment_course_transaction_fee_ngn,
      //       total:
      //         fee?.combo_course_onsite_fees
      //           ?.combo_onsite_part_paymentcourse_fees_ngn
      //           ?.combo_onsite_part_payment_course_total_fee_ngn,
      //       balance:
      //         fee?.combo_course_onsite_fees
      //           ?.combo_onsite_part_paymentcourse_fees_ngn
      //           ?.combo_onsitebalance_ngn,
      //       sign: <span>&#8358;</span>,
      //       usd: "",
      //     };
      //   });
      // } else if (
      //   formD.currency === "ngn" &&
      //   formD.classF === "virtual_class" &&
      //   formD.payment_plan === "full_payment" &&
      //   formD.course_level === "diplomaplus"
      // ) {
      //   setEachFee((prev) => {
      //     return {
      //       ...prev,
      //       partpaymentbalancepercentage: 30,
      //       partpaymentpercentage: 70,
      //       offset: fee?.actual_combo_course_fee_ngn_virtual,
      //       discount_deadline: fee?.combo_discount_deadline,
      //       amountDue:
      //         fee?.course_combo_virtual_fee
      //           ?.combo_virtual_course_full_payment_fees_ngn
      //           ?.combo_virtual_course_fee_ngn,
      //       subtotal:
      //         fee?.course_combo_virtual_fee
      //           ?.combo_virtual_course_full_payment_fees_ngn
      //           ?.combo_virtual_course_total_fee_ngn,
      //       vat: fee?.course_onsite_fees?.onsite_course_full_payment_fees_ngn
      //         ?.onsite_course_vat_fee_ngn,
      //       transaction:
      //         fee?.course_combo_virtual_fee
      //           ?.combo_virtual_course_full_payment_fees_ngn
      //           ?.combo_virtual_course_transaction_fee_ngn,
      //       total:
      //         fee?.course_combo_virtual_fee
      //           ?.combo_virtual_course_full_payment_fees_ngn
      //           ?.combo_virtual_course_total_fee_ngn,
      //       balance:
      //         fee?.course_combo_virtual_fee
      //           ?.combo_virtual_course_full_payment_fees_ngn
      //           ?.combo_virtual_part_payment_course_transaction_fee_ngn,
      //       sign: <span>&#8358;</span>,
      //       usd: "",
      //     };
      //   });
      // } else if (
      //   formD.currency === "ngn" &&
      //   formD.classF === "virtual_class" &&
      //   formD.payment_plan === "part_payment" &&
      //   formD.course_level === "diplomaplus"
      // ) {
      //   setEachFee((prev) => {
      //     return {
      //       ...prev,
      //       partpaymentbalancepercentage: 30,
      //       partpaymentpercentage: 70,
      //       offset: fee?.actual_combo_course_fee_ngn_onsite,
      //       discount_deadline: fee?.combo_discount_deadline,
      //       amountDue:
      //         fee?.course_combo_virtual_fee
      //           ?.combo_virtual_part_paymentcourse_fees_ngn
      //           ?.combo_virtual_part_payment_course_fee_ngn_due_amount,
      //       subtotal:
      //         fee?.course_combo_virtual_fee
      //           ?.combo_virtual_part_paymentcourse_fees_ngn
      //           ?.combo_virtual_part_payment_course_fee,
      //       vat: fee?.course_onsite_fees?.onsite_course_full_payment_fees_ngn
      //         ?.onsite_course_vat_fee_ngn,
      //       transaction:
      //         fee?.course_combo_virtual_fee
      //           ?.combo_virtual_part_paymentcourse_fees_ngn
      //           ?.combo_virtual_part_payment_course_transaction_fee_ngn,
      //       total:
      //         fee?.course_combo_virtual_fee
      //           ?.combo_virtual_part_paymentcourse_fees_ngn
      //           ?.combo_virtual_part_payment_course_total_fee_ngn,
      //       balance:
      //         fee?.course_combo_virtual_fee
      //           ?.combo_virtual_part_paymentcourse_fees_ngn
      //           ?.combo_virtualbalance_ngn,
      //       sign: <span>&#8358;</span>,
      //       usd: "",
      //     };
      //   });
      // }
      //  for ngn diploma
      if (
        formD.currency === "ngn" &&
        formD.classF === "physical_class" &&
        formD.payment_plan === "full_payment" &&
        formD.course_level === "diploma"
      ) {
        setEachFee((prev) => {
          return {
            ...prev,
            partpaymentbalancepercentage: 30,
            partpaymentpercentage: 70,
            offset: fee?.actual_diploma_only_course_fee_ngn_onsite,
            discount_deadline: fee?.diploma_only_discount_deadline,
            amountDue:
              fee?.course_onsite_fees?.onsite_course_full_payment_fees_ngn
                ?.onsite_course_fee_ngn,
            subtotal:
              fee?.course_onsite_fees?.onsite_course_full_payment_fees_ngn
                ?.onsite_course_fee_ngn,
            vat: fee?.course_onsite_fees?.onsite_course_full_payment_fees_ngn
              ?.onsite_course_vat_fee_ngn,
            transaction:
              fee?.course_onsite_fees?.onsite_course_full_payment_fees_ngn
                ?.onsite_course_transaction_fee_ngn,
            total:
              fee?.course_onsite_fees?.onsite_course_full_payment_fees_ngn
                ?.onsite_course_total_fee_ngn,
            balance:
              fee?.course_onsite_fees?.onsite_part_paymentcourse_fees_ngn
                ?.onsitebalance_ngn,
            sign: <span>&#8358;</span>,
            usd: "",
          };
        });
      } else if (
        formD.currency === "ngn" &&
        formD.classF === "physical_class" &&
        formD.payment_plan === "part_payment" &&
        formD.course_level === "diploma"
      ) {
        setEachFee((prev) => {
          return {
            ...prev,
            partpaymentbalancepercentage: 30,
            partpaymentpercentage: 70,
            offset: fee?.actual_diploma_only_course_fee_ngn_onsite,
            discount_deadline: fee?.diploma_only_discount_deadline,
            amountDue:
              fee?.course_onsite_fees?.onsite_part_paymentcourse_fees_ngn
                ?.onsite_part_payment_course_fee_ngn_due_amount,
            subtotal:
              fee?.course_onsite_fees?.onsite_part_paymentcourse_fees_ngn
                ?.onsite_part_payment_course_fee,
            vat: fee?.course_onsite_fees?.onsite_course_full_payment_fees_ngn
              ?.onsite_course_vat_fee_ngn,
            transaction:
              fee?.course_onsite_fees?.onsite_part_paymentcourse_fees_ngn
                ?.onsite_part_payment_course_transaction_fee_ngn,
            total:
              fee?.course_onsite_fees?.onsite_part_paymentcourse_fees_ngn
                ?.onsite_part_payment_course_total_fee_ngn,
            balance:
              fee?.course_onsite_fees?.onsite_part_paymentcourse_fees_ngn
                ?.onsitebalance_ngn,
            sign: <span>&#8358;</span>,
            usd: "",
          };
        });
      } else if (
        formD.currency === "ngn" &&
        formD.classF === "virtual_class" &&
        formD.payment_plan === "full_payment" &&
        formD.course_level === "diploma"
      ) {
        setEachFee((prev) => {
          return {
            ...prev,
            partpaymentbalancepercentage: 30,
            partpaymentpercentage: 70,
            offset: fee?.actual_diploma_only_course_fee_ngn_virtual,
            discount_deadline: fee?.diploma_only_discount_deadline,
            amountDue:
              fee?.course_virtual_fee?.virtual_course_full_payment_fees_ngn
                ?.virtual_course_fee_ngn,
            subtotal:
              fee?.course_virtual_fee?.virtual_course_full_payment_fees_ngn
                ?.virtual_course_total_fee_ngn,
            vat: fee?.course_onsite_fees?.onsite_course_full_payment_fees_ngn
              ?.onsite_course_vat_fee_ngn,
            transaction:
              fee?.course_virtual_fee?.virtual_course_full_payment_fees_ngn
                ?.virtual_course_transaction_fee_ngn,
            total:
              fee?.course_virtual_fee?.virtual_course_full_payment_fees_ngn
                ?.virtual_course_total_fee_ngn,
            balance:
              fee?.course_virtual_fee?.virtual_part_paymentcourse_fees_ngn
                ?.virtualbalance_ngn,
            sign: <span>&#8358;</span>,
            usd: "",
          };
        });
      } else if (
        formD.currency === "ngn" &&
        formD.classF === "virtual_class" &&
        formD.payment_plan === "part_payment" &&
        formD.course_level === "diploma"
      ) {
        setEachFee((prev) => {
          return {
            ...prev,
            partpaymentbalancepercentage: 30,
            partpaymentpercentage: 70,
            offset: fee?.actual_diploma_only_course_fee_ngn_virtual,
            discount_deadline: fee?.diploma_only_discount_deadline,
            amountDue:
              fee?.course_virtual_fee?.virtual_part_paymentcourse_fees_ngn
                ?.virtual_part_payment_course_fee_ngn_due_amount,
            subtotal:
              fee?.course_virtual_fee?.virtual_part_paymentcourse_fees_ngn
                ?.virtual_part_payment_course_fee,
            vat: fee?.course_onsite_fees?.onsite_course_full_payment_fees_ngn
              ?.onsite_course_vat_fee_ngn,
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
            usd: "",
          };
        });
      }

      // for usd
      if (
        formD.currency === "usd" &&
        formD.classF === "physical_class" &&
        formD.payment_plan === "full_payment" &&
        formD.course_level === "diplomaplus"
      ) {
        setEachFee((prev) => {
          return {
            ...prev,
            partpaymentbalancepercentage: 30,
            partpaymentpercentage: 70,
            offset: fee?.actual_combo_course_fee_usd_onsite,
            discount_deadline: fee?.combo_discount_deadline,
            amountDue:
              fee?.combo_course_onsite_fees
                ?.combo_onsite_course_full_payment_fees_usd
                ?.combo_onsite_course_fee_usd,
            subtotal:
              fee?.combo_course_onsite_fees
                ?.combo_onsite_course_full_payment_fees_usd
                ?.combo_onsite_course_fee_usd,
            vat: fee?.course_onsite_fees?.onsite_course_full_payment_fees_usd
              ?.onsite_course_vat_fee_usd,
            transaction:
              fee?.combo_course_onsite_fees
                ?.combo_onsite_course_full_payment_fees_usd
                ?.combo_onsite_course_transaction_fee_usd,
            total:
              fee?.combo_course_onsite_fees
                ?.combo_onsite_course_full_payment_fees_usd
                ?.combo_onsite_course_total_fee_usd,
            balance:
              fee?.combo_course_onsite_fees
                ?.combo_onsite_part_paymentcourse_fees_usd
                ?.combo_onsitebalance_usd,
            sign: <span>&#36;</span>,
            usd: "(USD)",
          };
        });
      } else if (
        formD.currency === "usd" &&
        formD.classF === "physical_class" &&
        formD.payment_plan === "part_payment" &&
        formD.course_level === "diplomaplus"
      ) {
        setEachFee((prev) => {
          return {
            ...prev,
            partpaymentbalancepercentage: 30,
            partpaymentpercentage: 70,
            offset: fee?.actual_combo_course_fee_usd_onsite,
            discount_deadline: fee?.combo_discount_deadline,
            amountDue:
              fee?.combo_course_onsite_fees
                ?.combo_onsite_part_paymentcourse_fees_usd
                ?.combo_onsite_part_payment_course_fee_usd_due_amount,
            subtotal:
              fee?.combo_course_onsite_fees
                ?.combo_onsite_part_paymentcourse_fees_usd
                ?.combo_onsite_part_payment_course_fee,
            vat: fee?.course_onsite_fees?.onsite_course_full_payment_fees_usd
              ?.onsite_course_vat_fee_usd,
            transaction:
              fee?.combo_course_onsite_fees
                ?.combo_onsite_part_paymentcourse_fees_usd
                ?.combo_onsite_part_payment_course_transaction_fee_usd,
            total:
              fee?.combo_course_onsite_fees
                ?.combo_onsite_part_paymentcourse_fees_usd
                ?.combo_onsite_part_payment_course_total_fee_usd,
            balance:
              fee?.combo_course_onsite_fees
                ?.combo_onsite_part_paymentcourse_fees_usd
                ?.combo_onsitebalance_usd,
            sign: <span>&#36;</span>,
            usd: "(USD)",
          };
        });
      } else if (
        formD.currency === "usd" &&
        formD.classF === "virtual_class" &&
        formD.payment_plan === "full_payment" &&
        formD.course_level === "diplomaplus"
      ) {
        setEachFee((prev) => {
          return {
            ...prev,
            partpaymentbalancepercentage: 30,
            partpaymentpercentage: 70,
            offset: fee?.actual_combo_course_fee_usd_virtual,
            discount_deadline: fee?.combo_discount_deadline,
            amountDue:
              fee?.course_combo_virtual_fee
                ?.combo_virtual_course_full_payment_fees_usd
                ?.combo_virtual_course_fee_usd,
            subtotal:
              fee?.course_combo_virtual_fee
                ?.combo_virtual_course_full_payment_fees_usd
                ?.combo_virtual_course_total_fee_usd,
            vat: fee?.course_onsite_fees?.onsite_course_full_payment_fees_usd
              ?.onsite_course_vat_fee_usd,
            transaction:
              fee?.course_combo_virtual_fee
                ?.combo_virtual_course_full_payment_fees_usd
                ?.combo_virtual_course_transaction_fee_usd,
            total:
              fee?.course_combo_virtual_fee
                ?.combo_virtual_course_full_payment_fees_usd
                ?.combo_virtual_course_total_fee_usd,
            balance:
              fee?.course_combo_virtual_fee
                ?.combo_virtual_course_full_payment_fees_usd
                ?.combo_virtual_part_payment_course_transaction_fee_usd,
            sign: <span>&#36;</span>,
            usd: "(USD)",
          };
        });
      } else if (
        formD.currency === "usd" &&
        formD.classF === "virtual_class" &&
        formD.payment_plan === "part_payment" &&
        formD.course_level === "diplomaplus"
      ) {
        setEachFee((prev) => {
          return {
            ...prev,
            partpaymentbalancepercentage: 30,
            partpaymentpercentage: 70,
            offset: fee?.actual_combo_course_fee_usd_onsite,
            discount_deadline: fee?.combo_discount_deadline,
            amountDue:
              fee?.course_combo_virtual_fee
                ?.combo_virtual_part_paymentcourse_fees_usd
                ?.combo_virtual_part_payment_course_fee_usd_due_amount,
            subtotal:
              fee?.course_combo_virtual_fee
                ?.combo_virtual_part_paymentcourse_fees_usd
                ?.combo_virtual_part_payment_course_fee,
            vat: fee?.course_onsite_fees?.onsite_course_full_payment_fees_usd
              ?.onsite_course_vat_fee_usd,
            transaction:
              fee?.course_combo_virtual_fee
                ?.combo_virtual_part_paymentcourse_fees_usd
                ?.combo_virtual_part_payment_course_transaction_fee_usd,
            total:
              fee?.course_combo_virtual_fee
                ?.combo_virtual_part_paymentcourse_fees_usd
                ?.combo_virtual_part_payment_course_total_fee_usd,
            balance:
              fee?.course_combo_virtual_fee
                ?.combo_virtual_part_paymentcourse_fees_usd
                ?.combo_virtualbalance_usd,
            sign: <span>&#36;</span>,
            usd: "(USD)",
          };
        });
      }

      //  for usd diploma or usdt diploma
      if (
        (formD.currency === "usd" || formD.currency === "usdt") &&
        formD.classF === "physical_class" &&
        formD.payment_plan === "full_payment" &&
        formD.course_level === "diploma"
      ) {
        setEachFee((prev) => {
          return {
            ...prev,
            partpaymentbalancepercentage: 30,
            partpaymentpercentage: 70,
            offset: fee?.actual_diploma_only_course_fee_usd_onsite,
            discount_deadline: fee?.diploma_only_discount_deadline,
            amountDue:
              fee?.course_onsite_fees?.onsite_course_full_payment_fees_usd
                ?.onsite_course_fee_usd,
            subtotal:
              fee?.course_onsite_fees?.onsite_course_full_payment_fees_usd
                ?.onsite_course_fee_usd,
            vat: fee?.course_onsite_fees?.onsite_course_full_payment_fees_usd
              ?.onsite_course_vat_fee_usd,
            transaction:
              fee?.course_onsite_fees?.onsite_course_full_payment_fees_usd
                ?.onsite_course_transaction_fee_usd,
            total:
              fee?.course_onsite_fees?.onsite_course_full_payment_fees_usd
                ?.onsite_course_total_fee_usd,
            balance:
              fee?.course_onsite_fees?.onsite_part_paymentcourse_fees_usd
                ?.onsitebalance_usd,
            sign: <span>&#36;</span>,
            usd: "(USD)",
          };
        });
      } else if (
        (formD.currency === "usd" || formD.currency === "usdt") &&
        formD.classF === "physical_class" &&
        formD.payment_plan === "part_payment" &&
        formD.course_level === "diploma"
      ) {
        setEachFee((prev) => {
          return {
            ...prev,
            partpaymentbalancepercentage: 30,
            partpaymentpercentage: 70,
            offset: fee?.actual_diploma_only_course_fee_usd_onsite,
            discount_deadline: fee?.diploma_only_discount_deadline,
            amountDue:
              fee?.course_onsite_fees?.onsite_part_paymentcourse_fees_usd
                ?.onsite_part_payment_course_fee_usd_due_amount,
            subtotal:
              fee?.course_onsite_fees?.onsite_part_paymentcourse_fees_usd
                ?.onsite_part_payment_course_fee,
            vat: fee?.course_onsite_fees?.onsite_course_full_payment_fees_usd
              ?.onsite_course_vat_fee_usd,
            transaction:
              fee?.course_onsite_fees?.onsite_part_paymentcourse_fees_usd
                ?.onsite_part_payment_course_transaction_fee_usd,
            total:
              fee?.course_onsite_fees?.onsite_part_paymentcourse_fees_usd
                ?.onsite_part_payment_course_total_fee_usd,
            balance:
              fee?.course_onsite_fees?.onsite_part_paymentcourse_fees_usd
                ?.onsitebalance_usd,
            sign: <span>&#36;</span>,
            usd: "(USD)",
          };
        });
      } else if (
        (formD.currency === "usd" || formD.currency === "usdt") &&
        formD.classF === "virtual_class" &&
        formD.payment_plan === "full_payment" &&
        formD.course_level === "diploma"
      ) {
        setEachFee((prev) => {
          return {
            ...prev,
            partpaymentbalancepercentage: 30,
            partpaymentpercentage: 70,
            offset: fee?.actual_diploma_only_course_fee_usd_virtual,
            discount_deadline: fee?.diploma_only_discount_deadline,
            amountDue:
              fee?.course_virtual_fee?.virtual_course_full_payment_fees_usd
                ?.virtual_course_fee_usd,
            subtotal:
              fee?.course_virtual_fee?.virtual_course_full_payment_fees_usd
                ?.virtual_course_total_fee_usd,
            vat: fee?.course_onsite_fees?.onsite_course_full_payment_fees_usd
              ?.onsite_course_vat_fee_usd,
            transaction:
              fee?.course_virtual_fee?.virtual_course_full_payment_fees_usd
                ?.virtual_course_transaction_fee_usd,
            total:
              fee?.course_virtual_fee?.virtual_course_full_payment_fees_usd
                ?.virtual_course_total_fee_usd,
            balance:
              fee?.course_virtual_fee?.virtual_part_paymentcourse_fees_usd
                ?.virtualbalance_usd,
            sign: <span>&#36;</span>,
            usd: "(USD)",
          };
        });
      } else if (
        (formD.currency === "usd" || formD.currency === "usdt") &&
        formD.classF === "virtual_class" &&
        formD.payment_plan === "part_payment" &&
        formD.course_level === "diploma"
      ) {
        setEachFee((prev) => {
          return {
            ...prev,
            partpaymentbalancepercentage: 30,
            partpaymentpercentage: 70,
            offset: fee?.actual_diploma_only_course_fee_usd_virtual,
            discount_deadline: fee?.diploma_only_discount_deadline,
            amountDue:
              fee?.course_virtual_fee?.virtual_part_paymentcourse_fees_usd
                ?.virtual_part_payment_course_fee_usd_due_amount,
            subtotal:
              fee?.course_virtual_fee?.virtual_part_paymentcourse_fees_usd
                ?.virtual_part_payment_course_fee,
            vat: fee?.course_onsite_fees?.onsite_course_full_payment_fees_usd
              ?.onsite_course_vat_fee_usd,
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
          };
        });
      }

      // for usdt
      if (
        formD.currency === "usdt" &&
        formD.classF === "physical_class" &&
        formD.payment_plan === "full_payment" &&
        formD.course_level === "diplomaplus"
      ) {
        setEachFee((prev) => {
          return {
            ...prev,
            partpaymentbalancepercentage: 30,
            partpaymentpercentage: 70,
            offset: fee?.actual_combo_course_fee_usd_onsite,
            discount_deadline: fee?.combo_discount_deadline,
            amountDue:
              fee?.combo_course_onsite_fees
                ?.combo_onsite_course_full_payment_fees_usd
                ?.combo_onsite_course_fee_usd,
            subtotal:
              fee?.combo_course_onsite_fees
                ?.combo_onsite_course_full_payment_fees_usd
                ?.combo_onsite_course_fee_usd,
            vat: fee?.course_onsite_fees?.onsite_course_full_payment_fees_usd
              ?.onsite_course_vat_fee_usd,
            transaction:
              fee?.combo_course_onsite_fees
                ?.combo_onsite_course_full_payment_fees_usd
                ?.combo_onsite_course_transaction_fee_usd,
            total:
              fee?.combo_course_onsite_fees
                ?.combo_onsite_course_full_payment_fees_usd
                ?.combo_onsite_course_total_fee_usd,
            balance:
              fee?.combo_course_onsite_fees
                ?.combo_onsite_part_paymentcourse_fees_usd
                ?.combo_onsitebalance_usd,
            sign: <span>&#36;</span>,
            usd: "(USD)",
          };
        });
      } else if (
        formD.currency === "usdt" &&
        formD.classF === "physical_class" &&
        formD.payment_plan === "part_payment" &&
        formD.course_level === "diplomaplus"
      ) {
        setEachFee((prev) => {
          return {
            ...prev,
            partpaymentbalancepercentage: 30,
            partpaymentpercentage: 70,
            offset: fee?.actual_combo_course_fee_usd_onsite,
            discount_deadline: fee?.combo_discount_deadline,
            amountDue:
              fee?.combo_course_onsite_fees
                ?.combo_onsite_part_paymentcourse_fees_usd
                ?.combo_onsite_part_payment_course_fee_usd_due_amount,
            subtotal:
              fee?.combo_course_onsite_fees
                ?.combo_onsite_part_paymentcourse_fees_usd
                ?.combo_onsite_part_payment_course_fee,
            vat: fee?.course_onsite_fees?.onsite_course_full_payment_fees_usd
              ?.onsite_course_vat_fee_usd,
            transaction:
              fee?.combo_course_onsite_fees
                ?.combo_onsite_part_paymentcourse_fees_usd
                ?.combo_onsite_part_payment_course_transaction_fee_usd,
            total:
              fee?.combo_course_onsite_fees
                ?.combo_onsite_part_paymentcourse_fees_usd
                ?.combo_onsite_part_payment_course_total_fee_usd,
            balance:
              fee?.combo_course_onsite_fees
                ?.combo_onsite_part_paymentcourse_fees_usd
                ?.combo_onsitebalance_usd,
            sign: <span>&#36;</span>,
            usd: "(USD)",
          };
        });
      } else if (
        formD.currency === "usdt" &&
        formD.classF === "virtual_class" &&
        formD.payment_plan === "full_payment" &&
        formD.course_level === "diplomaplus"
      ) {
        setEachFee((prev) => {
          return {
            ...prev,
            partpaymentbalancepercentage: 30,
            partpaymentpercentage: 70,
            offset: fee?.actual_combo_course_fee_usd_virtual,
            discount_deadline: fee?.combo_discount_deadline,
            amountDue:
              fee?.course_combo_virtual_fee
                ?.combo_virtual_course_full_payment_fees_usd
                ?.combo_virtual_course_fee_usd,
            subtotal:
              fee?.course_combo_virtual_fee
                ?.combo_virtual_course_full_payment_fees_usd
                ?.combo_virtual_course_total_fee_usd,
            vat: fee?.course_onsite_fees?.onsite_course_full_payment_fees_usd
              ?.onsite_course_vat_fee_usd,
            transaction:
              fee?.course_combo_virtual_fee
                ?.combo_virtual_course_full_payment_fees_usd
                ?.combo_virtual_course_transaction_fee_usd,
            total:
              fee?.course_combo_virtual_fee
                ?.combo_virtual_course_full_payment_fees_usd
                ?.combo_virtual_course_total_fee_usd,
            balance:
              fee?.course_combo_virtual_fee
                ?.combo_virtual_course_full_payment_fees_usd
                ?.combo_virtual_part_payment_course_transaction_fee_usd,
            sign: <span>&#36;</span>,
            usd: "(USD)",
          };
        });
      } else if (
        formD.currency === "usdt" &&
        formD.classF === "virtual_class" &&
        formD.payment_plan === "part_payment" &&
        formD.course_level === "diplomaplus"
      ) {
        setEachFee((prev) => {
          return {
            ...prev,
            partpaymentbalancepercentage: 30,
            partpaymentpercentage: 70,
            offset: fee?.actual_combo_course_fee_usd_onsite,
            discount_deadline: fee?.combo_discount_deadline,
            amountDue:
              fee?.course_combo_virtual_fee
                ?.combo_virtual_part_paymentcourse_fees_usd
                ?.combo_virtual_part_payment_course_fee_usd_due_amount,
            subtotal:
              fee?.course_combo_virtual_fee
                ?.combo_virtual_part_paymentcourse_fees_usd
                ?.combo_virtual_part_payment_course_fee,
            vat: fee?.course_onsite_fees?.onsite_course_full_payment_fees_usd
              ?.onsite_course_vat_fee_usd,
            transaction:
              fee?.course_combo_virtual_fee
                ?.combo_virtual_part_paymentcourse_fees_usd
                ?.combo_virtual_part_payment_course_transaction_fee_usd,
            total:
              fee?.course_combo_virtual_fee
                ?.combo_virtual_part_paymentcourse_fees_usd
                ?.combo_virtual_part_payment_course_total_fee_usd,
            balance:
              fee?.course_combo_virtual_fee
                ?.combo_virtual_part_paymentcourse_fees_usd
                ?.combo_virtualbalance_usd,
            sign: <span>&#36;</span>,
            usd: "(USD)",
          };
        });
      }

      //for sandbox
      if (formD.course_level === "sandbox" && formD.currency === "ngn") {
        setEachFee({
          partpaymentbalancepercentage: null,
          partpaymentpercentage: null,
          offset: null,
          discount_deadline: null,
          subtotal: sandbox?.ngn_price,
          amountDue: sandbox?.ngn_price,
          vat: null,
          transaction: null,
          total: sandbox?.ngn_price,
          balance: null,
          sign: <span>&#8358;</span>,
          usd: "",
        });
      } else if (
        formD.course_level === "sandbox" &&
        (formD.currency === "usd" || formD.currency === "usdt")
      ) {
        setEachFee({
          partpaymentbalancepercentage: null,
          partpaymentpercentage: null,
          offset: null,
          discount_deadline: null,
          subtotal: sandbox?.usd_price,
          amountDue: sandbox?.usd_price,
          vat: null,
          transaction: null,
          total: sandbox?.usd_price,
          balance: null,
          sign: <span>&#36;</span>,
          usd: "(USD)",
        });
      }
    }
    gg();
  }, [formD, fee, country, diplomaPlusCourse, diplomaCourse, sandbox]);


  //to check if any course has just one class format
  // useEffect(() => {
  //   if (!fee?.course_onsite_fees?.onsite_course_full_payment_fees_ngn?.onsite_course_fee_ngn || !fee?.course_onsite_fees?.onsite_course_full_payment_fees_usd?.onsite_course_fee_usd) {
  //     physicalref.current.style.display = "none";
  //     virtualref.current.style.display = 'block'
  //     formD.classF = 'virtual_class'

  //   } else if (!fee?.course_virtual_fee?.virtual_course_full_payment_fees_ngn?.virtual_course_fee_ngn || !fee?.course_virtual_fee?.virtual_course_full_payment_fees_usd?.virtual_course_fee_usd) {
  //     virtualref.current.style.display = "none"
  //     formD.classF = 'physical_class'
  //   } else {
  //     virtualref.current.style.display = 'block'
  //     physicalref.current.style.display = 'block'
  //   }
  // }, [fee, formD])

  //for duplicate data
  useEffect(() => {
    fetch(
      `https://backend.pluralcode.institute/check-enrol?email=${formD.email}&course=${formD.course}`
    )
      .then((response) => response.json())
      .then((result) => {
        setDuplicate(result.message);
      })
      .catch((err) => console.log(err));
  }, [formD.email, formD.course]);

  //offset i.e discount prices
  useEffect(() => {
    if (eachFee.offset > 0 && formD.payment_plan === "full_payment") {
      const oldPrice = eachFee.offset;
      setOldPrice({
        price: oldPrice,
        date: eachFee?.discount_deadline,
      });
    } else {
      setOldPrice({
        price: "",
        date: "",
      });
    }
    const cohname = cohort
      .map((e) => e)
      .filter((e) => e.id === parseInt(formD.cohort));
    setchname(cohname);
  }, [
    eachFee.amountDue,
    eachFee.offset,
    eachFee.discount_deadline,
    cohort,
    formD.cohort,
    formD.payment_plan,
  ]);

  //submit the form
  var rn = require("random-number");
  var options = {
    max: 987, // example input , yes negative values do work
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const sp = document.querySelector("#spinn");
    const sp2 = document.querySelector("#spinn2");
    let emailRegex = new RegExp(/\S+@\S+\.\S+/);
    let emailResult = emailRegex.test(formD.email.trim());

    if (checked) {
      //for part payment
      if (formD.payment_plan === "part_payment" && checkedpart !== true) {
        setErrMsgPp("box must be checked!");
        return;
      }

      if (formD.full_name.trim() === "") {
        setErrMsgFn("Fullname required!");
        setErrMsg("All fields required!");
      } else if (!emailResult) {
        setErrMsgE("Valid Email required!");
        setErrMsg("All fields required!");
      } else if (formD.phone_number.trim() === "") {
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
      } else if (formD.state === "") {
        setErrMsgS("State required!");
        setErrMsg("All fields required!");
      } else if (formD.course === "") {
        setErrMsgCo("Course required!");
        setErrMsg("All fields required!");
      } else if (formD.cohort === "") {
        setErrMsgCh("Cohort required!");
        setErrMsg("All fields required!");
      } else if (!(advisor?.hasOwnProperty('referral_code'))) { setErrMsg("Referral ID required!") } else if (duplicate !== "No records found") {
        setErrMsg("You are already enrolled in this course!");
      } else if (formD.currency === "usd" || formD.currency === "ngn") {
        sp.style.display = "block";
        sp2.style.display = "block";

        const raw = JSON.stringify({
          tx_ref: "plc-" + rn(options),
          amount: eachFee.total,
          currency: formD.currency.toUpperCase(),
          title: formD.course + " Enrollment",
          redirect_url: `https://pluralcode.academy/admissions/payment?name=${formD.full_name
            }&email=${formD.email}&phone_number=${formD.phone_number}&mode=${formD.classF
            }&course=${formD.course}&country=${formD.country}&state=${formD.state
            }&currency=${formD.currency.toUpperCase()}&cohort_id=${formD.cohort
            }&courseid=${fee.id}&program=${formD.course_level}&academy=${formD.academy_level
            }&balance=${eachFee.balance}&total=${eachFee.total}&age=${formD.age_range
            }&pay=${formD.payment_plan}&ref=${advisor?.referral_code}`,
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
            window.location.href = result.data.link;
            sp.style.display = "none";
            sp2.style.display = "none";
          })
          .catch((err) => console.log(err));
      }
      //
      else if (formD.currency === "usdt") {
        sp.style.display = "block";
        sp2.style.display = "block";
        const fullname = formD.full_name.replace(/ /g, "_");
        const st = formD.state.replace(/ /g, "_");
        const cour = formD.course.replace(/ /g, "_");
        // const upperCurrency = formD.currency.toUpperCase() ///
        const raw = JSON.stringify({
          amount: eachFee.amountDue,
          baseFiat: "USD",
          redirectLink: `pluralcode.academy/admissions/payment?name=${fullname}&email=${formD.email
            }&phone_number=${formD.phone_number}&mode=${formD.classF
            }&course=${cour}&country=${formD.country
            }&state=${st}&currency=${formD.currency.toUpperCase()}&cohort_id=${formD.cohort
            }&courseid=${fee.id}&program=${formD.course_level}&academy=${formD.academy_level
            }&balance=${eachFee.balance}&total=${eachFee.total}&age=${formD.age_range
            }&pay=${formD.payment_plan}&ref=${advisor?.referral_code}`,
          name: formD.full_name,
          description: formD.course,
        });

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const reqMethod = {
          method: "POST",
          headers: myHeaders,
          body: raw,
        };

        const url = "https://backend.pluralcode.institute/crypto-payment";

        fetch(url, reqMethod)
          .then((response) => response.json())
          .then((result) => {
            // window.open(result.paymentlink);
            window.location.href = result.paymentlink;
            sp.style.display = "none";
            sp2.style.display = "none";
          })
          .catch((err) => console.log(err));
      }
      //
    } else {
      setErrMsg("Box must be checked!");
    }
  };



  return (
    <>
      <FormNav
        offset={oldPrice.price}
        deadline={oldPrice.date}
        amountdue={eachFee.amountDue}
        vat={eachFee.vat}
        transaction={eachFee.transaction}
        balance={eachFee.balance}
        total={eachFee.total}
        name={fee?.name}
        sign={eachFee.sign}
        usd={eachFee.usd}
        form={formD}
        subtotal={eachFee.subtotal}
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
                  <p className="text-xs font-['Gilroy-semibold'] pt-2">
                    {emailmsg}
                  </p>
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
                    <option value="" className="dptext">
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
                    <option value="" className="dptext">
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

                {/* <div className="ad-input flex flex-col py-2 lg:py-3">
                  <label className="textdark pb-2">Course Level</label>
                  <div className="flex gap-8">
                    {showDip && (
                      <>
                        <div className="">
                          <label className="container text-base ten">
                            Diploma+{" "}
                            <span className="text-xs eight">
                              (Diploma Plus)
                            </span>
                            <input
                              type="radio"
                              name="course_level"
                              checked={formD.course_level === "diplomaplus"}
                              value="diplomaplus"
                              onChange={handleForm}
                              required
                            />
                            <span className="checkmark"></span>
                          </label>
                        </div>
                        <div className="">
                          <label className="container text-base ten">
                            Diploma
                            <span className="eight text-xs">(Beginner)</span> 
                            <input
                              type="radio"
                              required
                              name="course_level"
                              value="diploma"
                              checked={formD.course_level === "diploma"}
                              onChange={handleForm}
                            />
                            <span className="checkmark"></span>
                          </label>
                        </div>
                      </>
                    )}
                    {showSandbox && (
                      <div className="">
                        <label className="container text-base ten">
                          Sandbox only
                          <input
                            type="radio"
                            required
                            name="course_level"
                            value="sandbox"
                            checked={formD.course_level === "sandbox"}
                            onChange={handleForm}
                          />
                          <span className="checkmark"></span>
                        </label>
                      </div>
                    )}
                  </div>
                  <div className="entry-details" ref={diplomaref}>
                    <p className="green text-xs lg:text-sm pt-2">
                      The Diploma seek to take you on a premium journey from
                      beginner to advanced level in your chosen field. 4 months
                      live classes, 2 semesters, high-level projects, And of
                      course a globally recognized diploma both from Pluralcode
                      & one of our accreditation partners in the US, Canada or
                      Europe.
                    </p>
                    <span
                      onClick={handleRead}
                      className=" cursor-pointer nb green2 text-xs lg:text-sm underline"
                    >
                      {readMore ? "Show Less" : "Read More"}
                    </span>

                     Diploma Benefits 
                    {readMore && (
                      <div className="mt-4 md:w-96 border border-black rounded-3xl p-4 md:p-8">
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
                            children="4 Months Expert Training"
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
                            children="Global Diploma Recognition"
                          />
                        </div>
                        <div className="flex gap-4 py-2 items-center">
                          <div>
                            <Images className="w-3 lg:w-4" src={chkgreen} />
                          </div>
                          <Text
                            className="text-sm lg:text-base"
                            children="Access to Dozens of Expert videos"
                          />
                        </div>
                        
                      </div>
                    )}
                  </div>

                  <div className="diploma-details" ref={diplomaplusref}>
                    <p className="green text-xs lg:text-sm pt-2">
                      The Diploma+ combines all the benefits of Pluralcode’s
                      Diploma program as well as 2-3 months of market-readiness
                      training that will instantly position you to make
                      thousands of dollars with the skills you have acquired. 4
                      months live classes, 2 semesters, high-level projects,
                      added 1 month of career training on portfolio development,
                      brand building, high ticket selling, negotiation etc, and
                      2 months virtual internship with Pluralcode or one of our
                      hiring partners, a globally recognised Diploma both from
                      Pluralcode & one of our accreditation partners in the US,
                      Canada or Europe and a recommendation letter from your
                      company of deployment.
                    </p>
                    <span
                      onClick={handleRead}
                      className="cursor-pointer nb green2 text-xs lg:text-sm underline"
                    >
                      {readMore ? "Show Less" : "Read More"}
                    </span>

                    {/*Diploma plus Benefits 
                    {readMore && (
                      <div className="mt-4 border border-black rounded-3xl p-2 lg:p-4 xl:p-8">
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
                                children="Global Diploma Recognition"
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
                                children="Recommendation Letter"
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
                                children="Brand Building Workshops"
                              />
                            </div>
                            <div className="flex gap-2 lg:gap-4 py-2 items-center">
                              <div className="w-3 lg:w-4">
                                <Images className="w-full" src={chkgreen} />
                              </div>
                              <Text
                                className="w-full text-sm lg:text-base"
                                children="Freelance Monetization Training"
                              />
                            </div>
                            <div className="flex gap-2 lg:gap-4 py-2 items-center">
                              <div className="w-3 lg:w-4">
                                <Images className="w-full" src={chkgreen} />
                              </div>
                              <Text
                                className="w-full text-sm lg:text-base"
                                children="Listing On Our Recruitment Platform"
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
                </div> */}

                <div className="ad-input flex flex-col py-2 lg:py-3">
                  <label className="textdark pb-2">Course Of Interest</label>
                  <select
                    name="course"
                    value={formD.course}
                    onChange={handleForm}
                    required
                    className="w-full cursor-pointer flex items-center dp border p-3 lg:px-7 lg:py-4 outline-offset-2 outline-slate-500"
                  >
                    <option value="" className="dptext">
                      Select your course of interest
                    </option>
                    {dipC}
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
                      <div className="" ref={virtualref}>
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
                      <p className="w-full text-sm">
                        Kindly note that installment payment requires{" "}
                        {eachFee.partpaymentpercentage}% down payment and
                        Balance 4 weeks into the start of class.
                      </p>
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
                    <div className="" ref={usdtref}>
                      <label className="container text-base ten">
                        USDT/USDC (Cryptocurrencies)
                        <input
                          type="radio"
                          name="currency"
                          value="usdt"
                          checked={formD.currency === "usdt"}
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
                    value={advisor?.name}
                    placeholder=""
                    className="p-3 lg:px-7 lg:py-4 outline-offset-2 outline-slate-500"
                    disabled
                  />
                </div>
                <Text
                  className="textdark ad-input pt-4"
                  children="Student Policy"
                />
                <p className="refund font-['gextra'] lg:pt-2 ">
                  Students are advised to read Pluralcode’s Student policy in
                  order to be fully informed about standards and policies of the
                  institution. You can read more by clicking the link below.
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
              <div className="block lg:hidden  w-full md:w-96 m-auto rounded-xl pb-2">
                <Link to={`https://wa.me/${advisor?.contact_details?.slice(1)}`} target="_blank"><button
                  className="border border-seccolor text-seccolor bg-white justify-center flex gap-1 items-center w-full py-3 md:py-4 rounded-xl hover:bg-seccolor hover:text-white"
                >
                  Contact Support
                </button></Link>
              </div>
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
                      <span className="reg lg:text-lg">
                        {chname.length > 0 && chname[0].name}
                      </span>
                    </p>
                  </div>
                  <div className="w-3/5 text-right boldIt lg:text-xl textdark">
                    {oldPrice.price && (
                      <p className="striketh text-lg">
                        {eachFee.sign}{" "}
                        {numFor.format(
                          isNaN(oldPrice.price) ? 0 : oldPrice.price
                        )}{" "}
                        {eachFee.usd}
                      </p>
                    )}
                    {eachFee.sign}{" "}
                    {numFor.format(
                      isNaN(eachFee.subtotal) ? 0 : eachFee?.subtotal
                    )}{" "}
                    {eachFee.usd}
                    {oldPrice.date && (
                      <p className="discount text-sm">
                        Discount Ends {oldPrice.date}
                      </p>
                    )}
                  </div>
                </div>
                {/* balance for part payment */}
                <div className="part-payment-fee" ref={partFee}>
                  <div className="flex justify-between items-center pt-4 pb-8">
                    <div className="textdark">
                      <p className="text-xl lg:text-2xl">
                        Amount to pay {eachFee.partpaymentpercentage}%
                      </p>
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
                      <p className="text-xl lg:text-2xl">
                        Balance to pay {eachFee.partpaymentbalancepercentage}%
                      </p>
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
                    className="secbgcolor justify-center flex gap-1 items-center w-full py-3 md:py-4 text-white rounded-xl"
                  >
                    <div
                      id="spinn2"
                      className="spin animate-spin text-2xl mr-3"
                    >
                      <BiLoaderAlt />
                    </div>
                    Pay {eachFee.sign}{" "}
                    {numFor.format(isNaN(eachFee.total) ? 0 : eachFee.total)}{" "}
                    {eachFee.usd}
                  </button>
                </div>
                <div className="w-full md:w-96 m-auto rounded-xl pt-4">
                  <Link to={`https://wa.me/${advisor?.contact_details?.slice(1)}`} target="_blank"><button
                    className="border border-seccolor text-seccolor bg-white justify-center flex gap-1 items-center w-full py-3 md:py-4 rounded-xl hover:bg-seccolor hover:text-white"
                  >

                    Contact Support
                  </button></Link>
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
