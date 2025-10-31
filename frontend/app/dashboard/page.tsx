"use client"

import Layout from "@/components/custom/layout"
import { useState } from "react";
import { useEffect } from "react";
import PicaChart from "@/components/custom/pica-chart";
import QuadrantChart from "@/components/custom/kuadran-chart";

export default function DashboardPage() {
  const [currentTime, setCurrentTime] = useState(new Date());

  const formatDate = (date: any) => {
    const options = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    };
    return date.toLocaleDateString('id-ID', options);
  };

  const formatTime = (date: any) => {
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();

    if (hour >= 5 && hour < 11) return 'Pagi';
    if (hour >= 11 && hour < 15) return 'Siang';
    if (hour >= 15 && hour < 19) return 'Sore';
    return 'Malam';
  };


  // Dummy data
  const dummyData: any[] = [
    { x: 2.1, y: 4800, region: "Pabrik A", outputType: "CPO", bulan: "Januari", tahun: 2025 },
    { x: 3.4, y: 5200, region: "Pabrik B", outputType: "Kernel", bulan: "Januari", tahun: 2025 },
    { x: 1.8, y: 6000, region: "Pabrik C", outputType: "CPO", bulan: "Februari", tahun: 2025 },
    { x: 4.2, y: 4500, region: "Pabrik D", outputType: "Kernel", bulan: "Februari", tahun: 2025 },
    { x: 2.7, y: 7000, region: "Pabrik E", outputType: "CPO", bulan: "Maret", tahun: 2025 },
    { x: 3.9, y: 3000, region: "Pabrik F", outputType: "Kernel", bulan: "Maret", tahun: 2025 },
  ];

  return ( 
<Layout>
  
    <div className="space-y-4">
      <div>
        <div
          className="overflow-hidden rounded-md outlined relative transition-all duration-900"
          style={{
            backgroundImage: 'url(./lpc.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="h-full w-full bg-black/10 p-3">
            <div className="flex flex-col xl:flex-row gap-4">
              <div className="w-full xl:w-1/3">
                <div className="mb-2 text-2xl text-white">
                  <span>Selamat {getGreeting()}, </span>
                  <span className="font-bold">{''}</span>
                </div>
                <div><span className="text-xl text-white">{formatDate(currentTime)} | {formatTime(currentTime)}</span></div>
              </div>

            </div>
          </div>

        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <PicaChart />
        <QuadrantChart
          title=""
          data={dummyData}
        />
      </div>
    </div>
</Layout>

  )

}
