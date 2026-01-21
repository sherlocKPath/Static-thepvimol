import React from 'react';
import { Save, Scissors, Package, ChevronLeft, AlertCircle, Users, CheckCircle2 } from 'lucide-react';

const WriteoffRecord = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20 animate-in fade-in duration-500 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        
        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <button 
            onClick={onBack} 
            className="group flex items-center text-slate-500 hover:text-[#004a99] transition-all font-bold uppercase text-xs tracking-widest"
          >
            <div className="mr-3 p-2 bg-white border border-slate-200 rounded-xl group-hover:border-[#004a99] shadow-sm">
              <ChevronLeft size={18} />
            </div>
            Back to List
          </button>
          <div className="text-right">
             <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">บันทึกการตัดสินค้า</h2>
             <p className="text-xs font-bold text-blue-600 italic">Product Write-off Production Entry</p>
          </div>
        </div>

        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* 1. ข้อมูลการตัดสินค้า (Basic Info) */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center border-b pb-2">
                <Scissors className="w-5 h-5 mr-2 text-indigo-600" /> ข้อมูลการตัดสินค้า
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                   <InputField label="Job Order No." type="text" value="J104/0868" readOnly className="font-bold text-blue-700 bg-slate-50" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="วันที่ตัดสินค้า" type="date" />
                  <InputField label="ข้อมูลกะ" type="select" options={["กะ A (เช้า)", "กะ B (ดึก)"]} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="เวลาเริ่มตัดสินค้า" type="time" />
                  <InputField label="เวลาสิ้นสุด" type="time" />
                </div>
                <InputField label="รายชื่อผู้ตัด" type="text" placeholder="ระบุชื่อพนักงาน" className="font-bold" />
              </div>
            </div>

            {/* 2. รายละเอียดจำนวนที่ตัดได้ (Production Results) */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center border-b pb-2">
                <Package className="w-5 h-5 mr-2 text-blue-600" /> รายละเอียดผลผลิต
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="จำนวนที่ตัดได้ A" placeholder="0" />
                  <InputField label="จำนวนที่ตัดได้ B" placeholder="0" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="รวมจำนวนห่อ" placeholder="0" />
                  <InputField label="รวมจำนวนชิ้น" placeholder="0" />
                </div>
                <div className="pt-2">
                  <InputField label="หมายเหตุ / Remark" type="text" placeholder="ระบุรายละเอียดเพิ่มเติม" />
                </div>
              </div>
            </div>
          </div>

          {/* 3. ส่วนสรุปผลงาน (Summary Card) */}
          <div className="bg-blue-50/50 p-8 rounded-4xl border border-blue-100 shadow-sm overflow-hidden">
            <div className="flex items-center space-x-3 mb-6">
               <div className="bg-blue-600 p-2 rounded-xl text-white shadow-md">
                  <CheckCircle2 size={20} />
               </div>
               <h4 className="font-black text-blue-800 uppercase text-sm tracking-widest">สรุปผลงานพนักงาน (Performance Summary)</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
               <div className="md:col-span-2">
                  <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] mb-3 ml-1">สถิติการตัดรายบุคคล</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <SummaryMetric label="รวม A" value="0" unit="เฟรม" color="text-green-600" />
                    <SummaryMetric label="รวม B" value="0" unit="เฟรม" color="text-orange-600" />
                    <SummaryMetric label="รวมห่อ" value="0" unit="ห่อ" color="text-blue-600" />
                    <SummaryMetric label="รวมชิ้น" value="0" unit="ชิ้น" color="text-indigo-600" />
                  </div>
               </div>
               
               <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm text-center">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">รวมผลงาน / คน</p>
                  <p className="text-4xl font-black text-[#004a99]">0 <span className="text-base font-bold">ชิ้น</span></p>
               </div>
            </div>
          </div>
        </form>

        {/* --- Action Button --- */}
        <button className="w-full mt-10 bg-[#004a99] text-white py-5 rounded-2xl font-black text-lg shadow-xl flex items-center justify-center space-x-2 active:scale-[0.98] transition-all border-b-4 border-blue-900 cursor-pointer">
          <Save size={24} />
          <span>บันทึกข้อมูลการตัดสินค้า (SAVE RECORD)</span>
        </button>
      </div>
    </div>
  );
};

// --- Sub-Components ---

const SummaryMetric = ({ label, value, unit, color }) => (
  <div className="bg-white p-3 rounded-xl border border-blue-50 shadow-sm">
    <p className="text-[9px] font-black text-slate-400 uppercase mb-1">{label}</p>
    <p className={`text-xl font-black ${color}`}>{value} <span className="text-[10px] font-bold text-slate-400">{unit}</span></p>
  </div>
);

const InputField = ({ label, type = "text", options, className = "", ...props }) => (
  <div className="flex flex-col">
    <label className="text-[11px] font-bold text-slate-500 mb-1 ml-1 uppercase tracking-tight">
      {label}
    </label>
    {type === "select" ? (
      <select 
        className={`p-3 border border-slate-200 rounded-xl bg-white text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer shadow-sm ${className}`} 
        {...props}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    ) : (
      <input 
        type={type} 
        className={`p-3 border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm ${className}`} 
        {...props} 
      />
    )}
  </div>
);

export default WriteoffRecord;