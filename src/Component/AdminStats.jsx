import React, { useEffect, useState } from "react";
import {AreaChart, Area, CartesianGrid, XAxis, Tooltip, ResponsiveContainer, } from "recharts";
import "../Assets/Stat.css"; 

    const AdminStats = () => {
    const [userData, setUserData] = useState([]);
    const [scheduleData, setScheduleData] = useState([]);
    const [messageData, setMessageData] = useState([]);

    useEffect(() => {
    fetch("https://sheetdb.io/api/v1/mjsofaysxw41w")
        .then((res) => res.json())
        .then((rows) => {
        const grouped = {};
        rows.forEach((entry) => {
            const date = new Date(entry.created_at || Date.now());
            const month = date.toLocaleString("default", { month: "long" });
            grouped[month] = (grouped[month] || 0) + 1;
        });

        const formatted = Object.keys(grouped).map((month) => ({
            month,
            users: grouped[month],
        }));
        setUserData(formatted);
        })
        .catch((err) => console.error("Error fetching user data:", err));
    }, []);

    useEffect(() => {
    fetch("https://sheetdb.io/api/v1/iqe4w67dofyxj")
        .then((res) => res.json())
        .then((rows) => {
        const grouped = {};
        rows.forEach((entry) => {
            const date = new Date(entry.created_at || Date.now());
            const month = date.toLocaleString("default", { month: "long" });
            grouped[month] = (grouped[month] || 0) + 1;
        });

        const formatted = Object.keys(grouped).map((month) => ({
            month,
            schedules: grouped[month],
        }));
        setScheduleData(formatted);
        })
        .catch((err) => console.error("Error fetching schedule data:", err));
    }, []);

    useEffect(() => {
    fetch("https://sheetdb.io/api/v1/8i0xrsehdkbfc")
        .then((res) => res.json())
        .then((rows) => {
        const grouped = {};
        rows.forEach((entry) => {
            const date = new Date(entry.created_at || Date.now());
            const month = date.toLocaleString("default", { month: "long" });
            grouped[month] = (grouped[month] || 0) + 1;
        });

        const formatted = Object.keys(grouped).map((month) => ({
            month,
            messages: grouped[month],
        }));
        setMessageData(formatted);
        })
        .catch((err) => console.error("Error fetching message data:", err));
    }, []);

    return (
    <div className="stats-container">
        <h2 className="stats-title">Admin Statistics Dashboard</h2>

        <div className="stats-grid">
        {/* 👥 Users Chart */}
        <div className="stats-card">
            <h4>Registered Users</h4>
            <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={userData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <Tooltip />
                <Area
                type="monotone"
                dataKey="users"
                stroke="#4b7bec"
                fill="#4b7bec"
                fillOpacity={0.4}
                />
            </AreaChart>
            </ResponsiveContainer>
        </div>

        <div className="stats-card">
            <h4>Schedules Created</h4>
            <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={scheduleData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <Tooltip />
                <Area
                type="monotone"
                dataKey="schedules"
                stroke="#20bf6b"
                fill="#20bf6b"
                fillOpacity={0.4}
                />
            </AreaChart>
            </ResponsiveContainer>
        </div>

        <div className="stats-card">
            <h4>Messages Received</h4>
            <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={messageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <Tooltip />
                <Area
                type="monotone"
                dataKey="messages"
                stroke="#fa8231"
                fill="#fa8231"
                fillOpacity={0.4}
                />
            </AreaChart>
            </ResponsiveContainer>
        </div>
        </div>
    </div>
    );
    };

export default AdminStats;
