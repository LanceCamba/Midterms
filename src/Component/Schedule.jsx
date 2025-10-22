import React, { useEffect, useState } from "react";
import "../Assets/Schedule.css";

const Schedule = ({ sheetName }) => {
  const [schedule, setSchedule] = useState([]);
  const [message, setMessage] = useState("");
  
  const SHEET_ID = "1rgbKL2dsFTFJBG_i5gFQ4BH3MvoVXX4-weq4rJiZ_yo";
  const API_URL = `https://opensheet.elk.sh/${SHEET_ID}/${sheetName}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();

        const now = new Date();
        const nowMinutes = now.getHours() * 60 + now.getMinutes();

        const parseTime = (t) => {
          const [time, meridian] = t.split(" ");
          let [h, m] = time.split(":").map(Number);
          if (meridian === "PM" && h !== 12) h += 12;
          if (meridian === "AM" && h === 12) h = 0;
          return h * 60 + m;
        };

        const upcoming = data
          .filter((row) => row.Time)
          .sort((a, b) => parseTime(a.Time) - parseTime(b.Time))
          .filter((row) => {
            const [time, meridian] = row.Time.split(" ");
            let [hour, minute] = time.split(":").map(Number);
            if (meridian === "PM" && hour !== 12) hour += 12;
            if (meridian === "AM" && hour === 12) hour = 0;
            const scheduleTime = new Date();
            scheduleTime.setHours(hour, minute, 0, 0);
            return scheduleTime > now;
          });

        if (upcoming.length > 0) {
          setSchedule(upcoming);
          setMessage("");
        } else {
          setSchedule([]);
          setMessage("Next trip starts tomorrow");
        }
      } catch {
        setMessage("Error loading schedule");
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, [API_URL]);

  return (
    <div className="schedule-content">
      <div className="schedule-header">
        <span>Time</span>
        <span>Status</span>
      </div>
      <div className="schedule-scroll">
        {schedule.length > 0 ? (
          schedule.map((item, index) => (
            <div key={index} className="schedule-row">
              <span className="time">{item.Time}</span>
              <span className={`status ${item.Status?.toLowerCase().replace(/\s+/g, "")}`}>
                {item.Status}
              </span>
            </div>
          ))
        ) : (
          <p className="no-data">{message || "No upcoming trips"}</p>
        )}
      </div>
    </div>
  );
};

export default Schedule;
