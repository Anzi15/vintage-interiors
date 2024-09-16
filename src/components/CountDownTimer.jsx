import React, { useState, useEffect } from "react";
import { IoIosFlash } from "react-icons/io";

const CountdownTimer = ({ expiryTimestamp }) => {
  const [remainingTime, setRemainingTime] = useState("");

  useEffect(() => {
    // Function to format remaining time
    const formatRemainingTime = (expiryDate) => {
      const now = new Date();
      const remainingTime = expiryDate - now;

      if (remainingTime <= 0) {
        return "00:00:00"; // Time is up or in the past
      }

      const hours = Math.floor(remainingTime / (1000 * 60 * 60));
      const minutes = Math.floor(
        (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

      return [
        hours.toString().padStart(2, "0") + "h",
        " ",
        minutes.toString().padStart(2, "0") +"m",
        " ",
        seconds.toString().padStart(2, "0")+"s",
      ];
    };

    // Convert the expiry timestamp to a Date object
    const expiryDate = new Date(expiryTimestamp.seconds * 1000);

    // Update the countdown immediately
    setRemainingTime(formatRemainingTime(expiryDate));

    // Set up interval to update every second
    const intervalId = setInterval(() => {
      setRemainingTime(formatRemainingTime(expiryDate));
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [expiryTimestamp]);

  return (
    <div className="w-full bg-black min-h-[3.5rem] md:w-fit rounded-lg text-white flex items-center gap-3 p-3">
      <IoIosFlash className="text-3xl" />
      <p>Ending in: {remainingTime}</p>

      <div className="bg-white text-black rounded-tl-xl px-4 py-2 font-bold">
        Sale
      </div>
    </div>
  );
};

export default CountdownTimer;
