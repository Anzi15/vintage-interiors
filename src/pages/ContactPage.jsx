import React, { useEffect, useState } from 'react'
import abstractImg from "../assets/pink-abstract.webp"
import InputField from '../components/InputField'

const ContactPage = () => {
    const [whatsappNumber, setWhatsappNumber] = useState(null)
    const [isWhatsAppNumberValid,setIsWhatsAppNumberValid] = useState(true)
  const [error, setError] = useState("");


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
  return (
    <main className=''>
        <h1 className='text-5xl text-left items-center p-8'>Contact Us</h1>
        <form className='w-full flex justify-center gap-8'>
            <div>
                <img src={abstractImg} alt="" className='max-h-screen rounded-xl' />
            </div>
            <div className='w-1/3 flex flex-col gap-4 '>
                <h3 className='text-2xl text-left'>Let's Talk!</h3>
                <InputField inputType='name' />
                <InputField inputType='tel' valueReturner={setWhatsappNumber} inputValue={whatsappNumber} errorMsg={error} inputName='Your WhatsApp Number'/>
            </div>
        </form>
    </main>
  )
}

export default ContactPage
