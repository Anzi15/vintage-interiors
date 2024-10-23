import React, { useState, useEffect } from "react";
import { IoIosFlash } from "react-icons/io";

export const formatRemainingTime = (expiryTimestamp) => {
  const expiryDate = new Date(expiryTimestamp.seconds * 1000);
  const now = new Date();
  const remainingTime = expiryDate - now;

  if (remainingTime <= 0) {
    return null; // Return null if the time is up
  }

  const hours = Math.floor(remainingTime / (1000 * 60 * 60));
  const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

  return [
    hours.toString().padStart(2, "0") + "h",
    " ",
    minutes.toString().padStart(2, "0") + "m",
    " ",
    seconds.toString().padStart(2, "0") + "s",
  ].join(""); // Join into a single string
};

const CountdownTimer = ({ expiryTimestamp }) => {
  const [remainingTime, setRemainingTime] = useState(formatRemainingTime(expiryTimestamp));

  useEffect(() => {
    // Ensure expiryTimestamp is valid before proceeding
    if (!expiryTimestamp || !expiryTimestamp?.seconds) {
      return;
    }

    const intervalId = setInterval(() => {
      const updatedRemainingTime = formatRemainingTime(expiryTimestamp);
      setRemainingTime(updatedRemainingTime);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [expiryTimestamp]);

  // If remainingTime is null, it means time is up
  if (remainingTime === null) {
    return null; // Render nothing if time is up
  }

  console.log(remainingTime)

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
