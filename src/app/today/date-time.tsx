"use client";
import React, { useEffect, useState } from "react";

export default function DateTime() {
  const [dateTime, setDateTime] = useState(getFormattedDateTime());

  function getFormattedDateTime() {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "America/New_York",
    };

    return new Intl.DateTimeFormat("en-US", options).format(now);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(getFormattedDateTime());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return <div className="text-2xl font-bold mb-4 text-center">{dateTime} EST</div>;
}
