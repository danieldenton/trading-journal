"use client";
import React, { useState, useEffect } from "react";

export default function ReplayChart() {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
   
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Replay Chart</h1>
    </div>
  );
}