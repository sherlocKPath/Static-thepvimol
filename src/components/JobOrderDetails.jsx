import React from "react";
import {
  ArrowLeft,
  Printer,
  FileText,
  Settings,
  Layers,
  Box,
} from "lucide-react";

const JobOrderDetail = ({ jobData, setCurrentPage }) => {
  // หากไม่มีข้อมูล ให้ใช้ Mock Data ตามรูปที่ 2
  const data = jobData || {
    id: "J104/0868",
    date: "14/08/2568",
    productCode: "TB-0000PL17-00",
    shortCode: "PL17",
    orderQty: "117,040",
    inventoryBalance: "-238,700",
    percent: "-19%",
    material: {
      code: "SB-5B660055-00",
      length: "500000",
      qty: "24",
    },
    mold: {
      code: "T0000PL17",
      length: "92",
      pcsPerMold: "8",
    },
    packaging: {
      small: "25",
      large: "900",
    },
    spec: {
      size: "208x263x36 (+/-5)",
      thickness: "0 (+/-2)",
      weight: "0 (+/-2)",
    },
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-12 font-sans">
      {/* 1. Top Action Bar */}
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-300 mx-auto px-4 py-3 flex justify-between items-center">
          <button
            onClick={() => setCurrentPage("jobs")}
            className="flex items-center text-slate-600 hover:text-blue-600 transition-colors font-medium"
          >
            <ArrowLeft className="w-5 h-5 mr-2" /> กลับหน้าหลัก
          </button>
          <div className="flex space-x-3">
            <button className="flex items-center bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-50 transition shadow-sm text-sm font-bold">
              <Printer className="w-4 h-4 mr-2" /> พิมพ์ใบสั่งผลิต
            </button>
            <button className="flex items-center bg-[#004a99] text-white px-4 py-2 rounded-lg hover:bg-[#003366] transition shadow-md text-sm font-bold">
              แก้ไขข้อมูล
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-300 mx-auto p-4 md:p-6 space-y-6 mt-4">
        {/* 2. Job Title & Summary Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-[#004a99] px-6 py-4 flex justify-between items-center text-white">
            <div>
              <p className="text-blue-200 text-xs font-bold uppercase tracking-widest">
                Job Order Number
              </p>
              <h2 className="text-2xl font-black">{data.id}</h2>
            </div>
            <div className="text-right">
              <p className="text-blue-200 text-xs font-bold uppercase tracking-widest">
                วันที่สั่งผลิต
              </p>
              <p className="text-lg font-bold">{data.date}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-100 border-b">
            <div className="p-6">
              <p className="text-slate-400 text-xs font-bold uppercase mb-1">
                รหัสสินค้า
              </p>
              <p className="text-lg font-bold text-slate-800">
                {data.productCode}
              </p>
              <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-bold">
                รหัสย่อ: {data.shortCode}
              </span>
            </div>
            <div className="p-6 text-right">
              <p className="text-slate-400 text-xs font-bold uppercase mb-1">
                จำนวนสั่งผลิต
              </p>
              <p className="text-2xl font-black text-[#004a99]">
                {data.orderQty}{" "}
                <span className="text-sm font-medium text-slate-500">ชิ้น</span>
              </p>
            </div>
            <div className="p-6 text-right">
              <p className="text-slate-400 text-xs font-bold uppercase mb-1">
                ยอดคลังหัก Order
              </p>
              <p
                className={`text-lg font-bold ${
                  // ตรวจสอบก่อนว่า data.inventoryBalance มีค่าไหม และเป็น String หรือไม่
                  data.inventoryBalance &&
                  String(data.inventoryBalance).startsWith("-")
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {data.inventoryBalance || "0"} {/* แสดง 0 หากไม่มีข้อมูล */}
              </p>
            </div>
            <div className="p-6 text-center">
              <p className="text-slate-400 text-xs font-bold uppercase mb-1">
                ประสิทธิภาพ (%)
              </p>
              <div className="inline-block px-4 py-1 bg-slate-100 rounded-full text-slate-700 font-bold">
                {data.percent}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 3. ข้อมูลม้วนวัตถุดิบ (Raw Material Info) */}
          <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-5 py-3 border-b flex items-center">
              <Layers className="w-5 h-5 mr-2 text-blue-600" />
              <h3 className="font-bold text-slate-700">ข้อมูลม้วนวัตถุดิบ</h3>
            </div>
            <div className="p-6 grid grid-cols-3 gap-4 text-center">
              <div className="col-span-3 pb-3 border-b text-left">
                <p className="text-slate-400 text-[10px] font-bold uppercase">
                  รหัสม้วน
                </p>
                <p className="text-base font-bold text-slate-800">
                  {data.material.code}
                </p>
              </div>
              <div className="pt-2">
                <p className="text-slate-400 text-[10px] font-bold uppercase mb-1">
                  ม้วนยาว
                </p>
                <p className="text-lg font-bold text-slate-700">
                  {data.material.length}
                </p>
              </div>
              <div className="pt-2 border-x divide-slate-100">
                <p className="text-slate-400 text-[10px] font-bold uppercase mb-1">
                  จน. ม้วน
                </p>
                <p className="text-lg font-bold text-slate-700">
                  {data.material.qty}
                </p>
              </div>
              <div className="pt-2">
                <p className="text-slate-400 text-[10px] font-bold uppercase mb-1">
                  น้ำหนักรวม
                </p>
                <p className="text-lg font-bold text-slate-700">-</p>
              </div>
            </div>
          </section>

          {/* 4. ข้อมูลโมลด์ (Mold Info) */}
          <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-5 py-3 border-b flex items-center">
              <Settings className="w-5 h-5 mr-2 text-blue-600" />
              <h3 className="font-bold text-slate-700">ข้อมูลโมลด์</h3>
            </div>
            <div className="p-6 grid grid-cols-3 gap-4 text-center">
              <div className="col-span-3 pb-3 border-b text-left">
                <p className="text-slate-400 text-[10px] font-bold uppercase">
                  รหัสโมลด์
                </p>
                <p className="text-base font-bold text-slate-800">
                  {data.mold.code}
                </p>
              </div>
              <div className="pt-2">
                <p className="text-slate-400 text-[10px] font-bold uppercase mb-1">
                  โมลด์ยาว
                </p>
                <p className="text-lg font-bold text-slate-700">
                  {data.mold.length}
                </p>
              </div>
              <div className="pt-2 border-x">
                <p className="text-slate-400 text-[10px] font-bold uppercase mb-1">
                  จน.ชิ้น/โมลด์
                </p>
                <p className="text-lg font-bold text-slate-700">
                  {data.mold.pcsPerMold}
                </p>
              </div>
              <div className="pt-2">
                <p className="text-slate-400 text-[10px] font-bold uppercase mb-1">
                  รอบการผลิต
                </p>
                <p className="text-lg font-bold text-slate-700">-</p>
              </div>
            </div>
          </section>

          {/* 5. รายละเอียด Item Spec */}
          <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden md:col-span-2">
            <div className="bg-slate-50 px-5 py-3 border-b flex items-center">
              <Box className="w-5 h-5 mr-2 text-blue-600" />
              <h3 className="font-bold text-slate-700">
                Item Specification & Packaging
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Spec Info */}
                <div className="space-y-4">
                  <div className="flex justify-between items-end border-b pb-2">
                    <p className="text-slate-500 text-xs font-bold uppercase italic">
                      ก x ย x ส (mm.)
                    </p>
                    <p className="font-bold text-slate-800">{data.spec.size}</p>
                  </div>
                  <div className="flex justify-between items-end border-b pb-2">
                    <p className="text-slate-500 text-xs font-bold uppercase italic">
                      ความหนา (mm.)
                    </p>
                    <p className="font-bold text-slate-800">
                      {data.spec.thickness}
                    </p>
                  </div>
                  <div className="flex justify-between items-end border-b pb-2">
                    <p className="text-slate-500 text-xs font-bold uppercase italic">
                      นน. (g)
                    </p>
                    <p className="font-bold text-slate-800">
                      {data.spec.weight}
                    </p>
                  </div>
                </div>

                {/* Packaging Info */}
                <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 flex flex-col justify-center items-center">
                  <p className="text-blue-800 text-xs font-black uppercase mb-3">
                    จำนวนบรรจุ: เล็ก
                  </p>
                  <p className="text-4xl font-black text-blue-700">
                    {data.packaging.small}
                  </p>
                  <p className="text-xs text-blue-600 font-bold mt-1 uppercase tracking-tighter">
                    ชิ้น / ห่อ
                  </p>
                </div>

                <div className="bg-[#004a99] p-4 rounded-xl border border-blue-900 flex flex-col justify-center items-center text-white shadow-md">
                  <p className="text-blue-200 text-xs font-black uppercase mb-3">
                    จำนวนบรรจุ: ใหญ่
                  </p>
                  <p className="text-4xl font-black text-white">
                    {data.packaging.large}
                  </p>
                  <p className="text-xs text-blue-200 font-bold mt-1 uppercase tracking-tighter">
                    ชิ้น / กล่อง
                  </p>
                </div>
              </div>

              {/* Remarks Section */}
              <div className="mt-8 pt-6 border-t border-slate-100">
                <p className="text-slate-400 text-[10px] font-bold uppercase mb-2">
                  หมายเหตุเพิ่มเติม
                </p>
                <div className="bg-slate-50 p-4 rounded-lg text-sm text-slate-600 italic border border-dashed border-slate-300">
                  ไม่มีหมายเหตุสำหรับรายการสั่งผลิตนี้
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default JobOrderDetail;
