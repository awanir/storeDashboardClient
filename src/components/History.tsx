"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

interface HistoryItem {
  total_customers_in: number;
  total_customers_out: number;
  interval: string;
}

const History: React.FC = () => {
  const [data, setData] = useState<HistoryItem[] | undefined>();
  const storeId = process.env.NEXT_PUBLIC_STORE_ID;
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  async function fetchData() {
    try {
      const response = await axios.get(`${apiUrl}/api/history/${storeId}`);
      setData(response.data.data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [storeId]);

  return (
    <div className="flex-1 bg-gray-100 text-black p-6 rounded-lg shadow-lg">
      {data ? (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Historical Data (24 Hours)
            </h2>
            <button
              onClick={fetchData}
              className="mb-6 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
            >
              Refresh
            </button>
          </div>
          <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-3 px-6 text-left text-gray-700 font-semibold">
                  Interval
                </th>
                <th className="py-3 px-6 text-left text-gray-700 font-semibold">
                  Total Customers In
                </th>
                <th className="py-3 px-6 text-left text-gray-700 font-semibold">
                  Total Customers Out
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="py-3 px-6 border-b border-gray-300 text-gray-700">
                    {item.interval}
                  </td>
                  <td className="py-3 px-6 border-b border-gray-300 text-gray-700">
                    {item.total_customers_in}
                  </td>
                  <td className="py-3 px-6 border-b border-gray-300 text-gray-700">
                    {item.total_customers_out}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-gray-600">Loading...</div>
      )}
    </div>
  );
};

export default History;
