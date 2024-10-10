import React, { useEffect, useState } from "react";
import axios from "axios";

const RevenueAnalytics = () => {
    const [dailyRevenue, setDailyRevenue] = useState(0);
    const [monthlyRevenue, setMonthlyRevenue] = useState(0);
    const [annualRevenue, setAnnualRevenue] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);

    useEffect(() => {
        const fetchRevenueData = async () => {
            try {
                const dailyResponse = await axios.get('http://localhost:8000/api/daily/');
                setDailyRevenue(dailyResponse.data.total_revenue || 0);
                
                const monthlyResponse = await axios.get('http://localhost:8000/api/monthly/');
                setMonthlyRevenue(monthlyResponse.data.total_revenue || 0);
                
                const annualResponse = await axios.get('http://localhost:8000/api/annual/');
                setAnnualRevenue(annualResponse.data.total_revenue || 0);
                
                const summaryResponse = await axios.get('http://localhost:8000/api/summary/');
                setTotalRevenue(summaryResponse.data.total_revenue || 0);
            } catch (error) {
                console.error('Error fetching revenue data:', error);
            }
        };

        fetchRevenueData();
    }, []);

    return (
        <div className="p-4 bg-white shadow rounded-lg">
            <h2 className="text-xl font-bold mb-4">Thống Kê Doanh Thu</h2>
            <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border rounded">
                    <h3 className="font-semibold">Doanh Thu Hàng Ngày</h3>
                    <p className="text-2xl">{dailyRevenue} VNĐ</p>
                </div>
                <div className="p-4 border rounded">
                    <h3 className="font-semibold">Doanh Thu Hàng Tháng</h3>
                    <p className="text-2xl">{monthlyRevenue} VNĐ</p>
                </div>
                <div className="p-4 border rounded">
                    <h3 className="font-semibold">Doanh Thu Hàng Năm</h3>
                    <p className="text-2xl">{annualRevenue} VNĐ</p>
                </div>
                <div className="p-4 border rounded">
                    <h3 className="font-semibold">Tổng Doanh Thu</h3>
                    <p className="text-2xl">{totalRevenue} VNĐ</p>
                </div>
            </div>
        </div>
    );
};

export default RevenueAnalytics;
