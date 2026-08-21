"use client";
import React, { useState, useEffect } from "react";

export default function Teaser() {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    // Set target date to November 1, 2026
    const targetDate = new Date("November 1, 2026 00:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days: days < 10 ? "0" + days : days,
        hours: hours < 10 ? "0" + hours : hours,
        minutes: minutes < 10 ? "0" + minutes : minutes,
        seconds: seconds < 10 ? "0" + seconds : seconds,
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="teaser section fade-in" id="teaser">
      <div className="container text-center">
        <h2 className="teaser-title">Something is being built.</h2>
        <div
          className="countdown-wrapper mt-4 mb-5"
          id="countdown"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
            gap: "1.5rem",
            justifyContent: "center",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          {[
            { label: "Days", value: timeLeft.days },
            { label: "Hours", value: timeLeft.hours },
            { label: "Minutes", value: timeLeft.minutes },
            { label: "Seconds", value: timeLeft.seconds },
          ].map((item, index) => (
            <div className="countdown-box" style={{ textAlign: "center" }} key={index}>
              <span
                className="countdown-num"
                style={{
                  display: "block",
                  fontVariantNumeric: "tabular-nums",
                  fontFamily: "var(--font-heading)",
                  fontSize: "3.5rem",
                  fontWeight: "bold",
                  color: "var(--accent-cyan)",
                  lineHeight: "1",
                }}
              >
                {item.value}
              </span>
              <span
                className="countdown-label"
                style={{
                  display: "block",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.85rem",
                  color: "var(--text-secondary)",
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                  marginTop: "5px",
                }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <a href="#partner" className="btn btn-amber">
            Be part of it before anyone else — Partner With Us
          </a>
        </div>
      </div>
    </section>
  );
}
