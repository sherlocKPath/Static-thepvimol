import React from 'react';
import { Save, Package, Settings, Clock, ChevronLeft, AlertTriangle } from 'lucide-react';

const FormingRecord = ({ onBack }) => {
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
             <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">บันทึกการขึ้นรูปสินค้า</h2>
             <p className="text-xs font-bold text-blue-600 italic">Daily Forming Production Record</p>
          </div>
        </div>

        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* 1. รายละเอียดสินค้า */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center border-b pb-2">
                <Package className="w-5 h-5 mr-2 text-blue-600" /> รายละเอียดสินค้า
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="วันที่ผลิต" type="date" />
                  <InputField label="กะผลิต" type="select" options={["A", "B"]} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="เวลาเริ่มผลิต" type="time" />
                  <InputField label="เวลาผลิตเสร็จ" type="time" />
                </div>
                <InputField label="Job No." type="text" placeholder="ระบุ Job Number" className="font-bold text-blue-700" />
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="รหัสสินค้า" type="text" />
                  <InputField label="รหัสเครื่องจักร" type="text" />
                </div>
                <InputField label="รหัสวัตถุดิบ" type="text" />
              </div>
            </div>

            {/* 2. ค่ามาตรฐานสินค้า */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center border-b pb-2">
                <Settings className="w-5 h-5 mr-2 text-blue-600" /> ค่ามาตรฐานสินค้า
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  <InputField label="กว้าง" placeholder="mm" />
                  <InputField label="ยาว" placeholder="mm" />
                  <InputField label="สูง" placeholder="mm" />
                </div>
                <InputField label="หนา" placeholder="micron" />
                <InputField label="สี" type="text" />
                <InputField label="รหัสฟิล์ม" type="text" />
              </div>
            </div>
          </div>

          {/* 3. ข้อมูลการผลิต และ ความสูง */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center border-b pb-2">
              <Clock className="w-5 h-5 mr-2 text-blue-600" /> ข้อมูลการผลิต
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-4">
                <InputField label="จำนวนเฟรมต่อม้วน" />
                <InputField label="จำนวนชิ้นต่อเฟรม" />
                <InputField label="ม้วนที่ได้ / 1 ชม." />
              </div>
              <div className="md:col-span-3 space-y-4">
                <label className="text-sm font-bold text-gray-700 ml-1">ความสูงของแต่ละตั้ง (ทุก 100 เฟรม)</label>
                <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
                  {[...Array(10)].map((_, i) => (
                    <input 
                      key={i} 
                      type="number" 
                      className="p-2 border border-slate-200 rounded-lg text-center text-sm font-bold text-blue-700 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                      placeholder={`#${i + 1}`} 
                    />
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-4 mt-2">
                  <div className="p-3 bg-gray-50 rounded-xl text-center border">
                    <p className="text-[10px] text-gray-500 font-bold uppercase">สูงสุด</p>
                    <span className="text-lg font-black text-blue-600">0.0</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl text-center border">
                    <p className="text-[10px] text-gray-500 font-bold uppercase">ต่ำสุด</p>
                    <span className="text-lg font-black text-red-600">0.0</span>
                  </div>
                  <div className="p-3 bg-blue-600 rounded-xl text-center shadow-md">
                    <p className="text-[10px] text-blue-100 font-bold uppercase">เฉลี่ย</p>
                    <span className="text-lg font-black text-white">0.0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4. รายละเอียดวัตถุดิบ ปัญหา และสรุป */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {/* วัตถุดิบ */}
             <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                <h4 className="font-bold text-blue-800 underline uppercase text-sm">วัตถุดิบและผลผลิต</h4>
                <InputField label="Lot No. / Seq" placeholder="Lot No." />
                <InputField label="น้ำหนักม้วน (kg)" />
                <div className="grid grid-cols-2 gap-2">
                   <InputField label="ความหนาก่อน VAC" />
                   <InputField label="ความหนาหลัง VAC" />
                </div>
                <InputField label="ประเภทกล่อง" type="select" options={["กล่องไม่มีรู", "กล่องร่องพับไม่ได้"]} />
                <InputField label="ลักษณะสินค้า" type="select" options={["กรอบ", "นิ่ม"]} />
             </div>

             {/* ปัญหา (QC) - ปรับให้แสดงครบ ไม่ต้องเลื่อน */}
             <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                <h4 className="font-bold text-red-700 underline uppercase text-sm">ปัญหาที่พบ (QC)</h4>
                <div className="grid grid-cols-1 gap-1.5">
                   {[
                    "หน้ากว้างไม่เท่า", "เป็นรอยยับ", "ม้วนโฟมติด", "สีมีปัญหา", 
                    "ฟิล์มเคลือบไม่ติด/ตรง", "ปิดฝาไม่ได้", "พบสิ่งแปลกปลอม"
                   ].map((issue) => (
                    <label key={issue} className="flex items-center space-x-3 p-2.5 bg-gray-50 rounded-xl border border-transparent hover:border-red-200 cursor-pointer transition-all">
                      <input type="checkbox" className="w-4 h-4 rounded text-red-600 focus:ring-red-500 cursor-pointer" />
                      <span className="text-sm font-bold text-slate-600">{issue}</span>
                    </label>
                   ))}
                </div>
             </div>

             {/* สรุป - ปรับเป็นโทนสีอ่อน */}
             <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 space-y-5">
                <h4 className="font-bold text-blue-800 underline uppercase text-sm">สรุปยอดผลิตสะสม</h4>
                <div className="grid grid-cols-2 gap-3">
                   <InputField label="ผลิตได้ A" className="bg-white border-blue-100 shadow-sm" />
                   <InputField label="ผลิตได้ B" className="bg-white border-blue-100 shadow-sm" />
                   <InputField label="เสีย (Scrap)" className="bg-white border-blue-100 shadow-sm" />
                   <InputField label="รวมทั้งหมด" readOnly className="bg-blue-100/50 border-blue-200 font-black text-blue-800" />
                </div>
                <div className="space-y-1">
                   <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">หมายเหตุ / Remark</label>
                   <textarea className="w-full bg-white border border-blue-100 rounded-xl p-3 text-sm font-bold h-28 focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="ระบุรายละเอียดเพิ่มเติม..."></textarea>
                </div>
             </div>
          </div>
        </form>

        {/* --- Action Button --- */}
        <button className="w-full mt-10 bg-[#004a99] text-white py-5 rounded-2xl font-black text-lg shadow-xl flex items-center justify-center space-x-2 active:scale-[0.98] transition-all border-b-4 border-blue-900 cursor-pointer">
          <Save size={24} />
          <span>บันทึกข้อมูลการขึ้นรูปทั้งหมด (CONFIRM RECORD)</span>
        </button>
      </div>
    </div>
  );
};

// --- ส่วนประกอบ InputField (Reuseable) ---
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

export default FormingRecord;