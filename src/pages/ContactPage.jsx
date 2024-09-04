import React, { useEffect, useRef, useState } from "react";
import abstractImg from "../assets/pink-abstract.webp";
import InputField from "../components/InputField";
import { Button } from "@material-tailwind/react";
import { toast } from "react-toastify";

const ContactPage = () => {
  const [whatsappNumber, setWhatsappNumber] = useState(null);
  const [name, setName] = useState(null);
  const [message, setMessage] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);

  const validatePhoneNumber = (number) => {
    if (!number?.length) {
      setError("");
      return true;
    }
    const regex = /^(\+92|0)?3[0-9]{9}$/;
    if (regex.test(number)) {
      setError("");
      return true;
    } else {
      setError("Please enter a valid number (e.g., +923XXXXXXXXX)");
      return false;
    }
  };
  const handleSubmission = (e) => {
    e.preventDefault();
    setLoading(true);
    if (!validatePhoneNumber(whatsappNumber)) {
      toast.error("kindly enter a valid whatsapp number");
    setLoading(false);
  } else if (!message.length) {
    toast.error("Kindly Enter Something in Message Box");
    setLoading(false);
  } else {
    // ..
    toast.success("message sent successfully");
    formRef.current.reset();
    setLoading(false);
    }
  };
  return (
    <main className="py-10 pb-[10rem]">
      <h1 className="text-5xl my-10 items-center p-8">Contact Us</h1>
      <form
        className="w-full flex justify-center gap-8 items-center"
        ref={formRef}
        onSubmit={(e) => {
          handleSubmission(e);
        }}
      >
        <div>
          <img src={abstractImg} alt="" className="max-h-[30rem] rounded-xl" />
        </div>
        <div className="w-1/3 flex flex-col gap-4 ">
          <h3 className="text-2xl text-left">Let's Talk!</h3>
          <InputField
            inputType="name"
            valueReturner={setName}
            inputAutoComplete={"name"}
            inputValue={name}
            requiredInput={true}
          />
          <InputField
            inputType="tel"
            valueReturner={setWhatsappNumber}
            inputAutoComplete={"tel"}
            inputValue={whatsappNumber}
            errorMsg={error}
            inputName="Your WhatsApp Number"
            requiredInput={true}
          />
          <textarea
            name="message"
            className="min-h-[15rem] resize-y rounded-md"
            placeholder="Your Message"
            onInput={(e) => {
              setMessage(e.target.value.trim());
            }}
          ></textarea>
          <Button className="bg-black flex justify-center" loading={loading} type="submit">
            Submit
          </Button>
        </div>
      </form>
    </main>
  );
};

export default ContactPage;
