"use client";

import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socketUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const socket = io(`${socketUrl}`);

interface SocketMessage {
  store_id: number;
  customers_in: number;
  customers_out: number;
  time_stamp: string;
}

const Live: React.FC = () => {
  const [message, setMessage] = useState<SocketMessage | null>(null);

  useEffect(() => {
    socket.on("message", (msg: SocketMessage) => {
      setMessage(msg);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  return (
    <div className="flex-1 bg-gray-100 text-gray-800 p-6 rounded-lg shadow-lg">
      {message ? (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Live Data</h2>
          <div className="space-y-2">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <p className="text-lg font-medium">
                <strong>Time Stamp:</strong> {message.time_stamp}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <p className="text-lg font-medium">
                <strong>Customers In:</strong> {message.customers_in}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <p className="text-lg font-medium">
                <strong>Customers Out:</strong> {message.customers_out}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600">Waiting for message...</p>
      )}
    </div>
  );
};

export default Live;
