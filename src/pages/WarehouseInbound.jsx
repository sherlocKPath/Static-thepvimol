import React, { useState } from "react";
import {
  Save,
  Warehouse,
  Hash,
  Package,
  Archive,
  Calculator,
  ArrowRightCircle,
  ChevronLeft,
  Boxes,
  MapPin,
} from "lucide-react";

const WarehouseInbound = ({ setCurrentPage }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    productCode: "",
    jobNo: "",
    storageA: "",
    storageSeq: "",
    totalBoxes: 0,
    scrap: 0,
    pcsPerBox: 0,
    totalPcs: 0,
  });

  // ฟังก์ชันคำนวณจำนวนชิ้นอัตโนมัติ (จำนวนกล่อง * ชิ้น/กล่อง + เศษ)
  const calculateTotal = (boxes, pbox, scrap) => {
    return Number(boxes) * Number(pbox) + Number(scrap);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };
      if (["totalBoxes", "pcsPerBox", "scrap"].includes(name)) {
        newData.totalPcs = calculateTotal(
          newData.totalBoxes,
          newData.pcsPerBox,
          newData.scrap
        );
      }
      return newData;
    });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20 font-sans text-slate-800">
      <div className="max-w-5xl mx-auto p-4 md:p-8 animate-in fade-in duration-500">
        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <button
            onClick={() => setCurrentPage("dashboard")}
            className="group flex items-center text-slate-500 hover:text-[#004a99] transition-all font-black uppercase text-xs tracking-widest"
          >
            <div className="mr-3 p-2 bg-white border border-slate-200 rounded-xl group-hover:border-[#004a99] shadow-sm">
              <ChevronLeft size={18} />
            </div>
            Back to Dashboard
          </button>
          <div className="text-right">
            <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tight flex items-center justify-end">
              <Warehouse className="mr-3 text-[#004a99]" size={32} />
              บันทึกการส่งสินค้าเข้าคลัง
            </h2>
            <p className="text-sm font-bold text-blue-600 italic">
              Finished Goods (FG) Inbound Entry
            </p>
          </div>
        </div>

        <form className="space-y-6">
          {/* ส่วนที่ 1: ข้อมูลอ้างอิงการผลิต */}
          <div className="bg-white p-8 rounded-4xl shadow-xl shadow-slate-200/50 border border-slate-100">
            <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center border-b border-slate-50 pb-4 uppercase tracking-tight">
              <Package className="w-6 h-6 mr-3 text-blue-600" /> 1.
              ข้อมูลอ้างอิงการผลิต
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InputField
                label="วันที่ส่งเข้าคลัง"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
              <InputField
                label="Job No."
                type="text"
                name="jobNo"
                placeholder="ระบุเลขที่ Job"
                value={formData.jobNo}
                onChange={handleChange}
                className="text-blue-700 font-bold"
              />
              <InputField
                label="รหัสสินค้า (Product Code)"
                type="text"
                name="productCode"
                placeholder="ระบุรหัสสินค้า"
                value={formData.productCode}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* ส่วนที่ 2: ตำแหน่งจัดเก็บ */}
          <div className="bg-white p-8 rounded-4xl shadow-xl shadow-slate-200/50 border border-slate-100">
            <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center border-b border-slate-50 pb-4 uppercase tracking-tight">
              <MapPin className="w-6 h-6 mr-3 text-red-500" /> 2.
              ระบุตำแหน่งจัดเก็บ
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-center space-x-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="bg-[#004a99] p-4 rounded-xl text-white shadow-lg">
                  <Archive className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <InputField
                    label="ที่จัดเก็บ A"
                    type="text"
                    name="storageA"
                    placeholder="เช่น โซน A / ชั้น 2"
                    value={formData.storageA}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="bg-yellow-400 p-4 rounded-xl text-[#001d3d] shadow-lg">
                  <Hash className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <InputField
                    label="ลำดับที่จัดเก็บ (Seq)"
                    type="number"
                    name="storageSeq"
                    placeholder="ระบุลำดับ"
                    value={formData.storageSeq}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ส่วนที่ 3: รายละเอียดจำนวนสินค้าและการคำนวณ */}
          <div className="bg-white p-8 rounded-4xl shadow-xl shadow-slate-200/50 border border-slate-100">
            <h3 className="text-lg font-black text-slate-800 mb-8 flex items-center uppercase tracking-tight">
              <Calculator className="w-6 h-6 mr-3 text-indigo-600" /> 3.
              คำนวณปริมาณสินค้าส่งมอบ
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  ยอดรวมทั้งหมด (กล่อง)
                </label>
                <input
                  type="number"
                  name="totalBoxes"
                  className="w-full text-4xl font-black p-5 bg-slate-50 border-2 border-slate-200 rounded-3xl focus:border-blue-500 focus:bg-white outline-none transition-all text-[#004a99]"
                  value={formData.totalBoxes}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  จำนวนชิ้น / กล่อง
                </label>
                <input
                  type="number"
                  name="pcsPerBox"
                  className="w-full text-4xl font-black p-5 bg-slate-50 border-2 border-slate-200 rounded-3xl focus:border-blue-500 focus:bg-white outline-none transition-all text-slate-700"
                  value={formData.pcsPerBox}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black text-orange-400 uppercase tracking-widest ml-1">
                  ยอดรวมเศษ (ชิ้น)
                </label>
                <input
                  type="number"
                  name="scrap"
                  className="w-full text-4xl font-black p-5 bg-orange-50 border-2 border-orange-200 rounded-3xl focus:border-orange-500 focus:bg-white outline-none transition-all text-orange-700 shadow-inner"
                  value={formData.scrap}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* ส่วนสรุปผลลัพธ์ (Grand Total Visual) */}
            <div className="bg-[#001d3d] rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden ring-8 ring-blue-50">
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center items-center">
                <div>
                  <p className="text-blue-300 text-[10px] font-black uppercase tracking-[0.2em] mb-2">
                    Total Pack Units
                  </p>
                  <p className="text-4xl font-black">
                    {formData.totalBoxes.toLocaleString()}{" "}
                    <span className="text-xl font-bold text-blue-400">
                      Boxes
                    </span>
                  </p>
                </div>
                <div className="border-white/10 md:border-x px-4">
                  <p className="text-orange-300 text-[10px] font-black uppercase tracking-[0.2em] mb-2">
                    Total Loose Units
                  </p>
                  <p className="text-4xl font-black">
                    {formData.scrap.toLocaleString()}{" "}
                    <span className="text-xl font-bold text-orange-400">
                      Pcs
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-yellow-400 text-xs font-black uppercase tracking-[0.3em] mb-2">
                    Grand Total Sum
                  </p>
                  <div className="flex flex-col items-center">
                    <p className="text-6xl font-black text-yellow-400 drop-shadow-[0_4px_10px_rgba(250,204,21,0.3)]">
                      {formData.totalPcs.toLocaleString()}
                    </p>
                    <p className="text-sm font-bold text-yellow-500 mt-1 uppercase">
                      Total Pieces in Stock
                    </p>
                  </div>
                </div>
              </div>
              {/* Background Decoration */}
              <div className="absolute -right-16 -bottom-16 opacity-5 rotate-12">
                <Boxes className="w-72 h-72" />
              </div>
            </div>
          </div>

          <button
            type="button"
            className="w-full bg-[#004a99] hover:bg-blue-800 text-white py-7 rounded-4xl font-black text-2xl shadow-2xl shadow-blue-200 flex items-center justify-center space-x-4 transition-all transform active:scale-[0.98] border-b-8 border-blue-900 cursor-pointer"
          >
            <Save className="w-8 h-8" />
            <span>บันทึกและส่งเข้าคลังสำเร็จรูป (CONFIRM FG)</span>
          </button>
        </form>
      </div>
    </div>
  );
};

// Reusable Input Component
const InputField = ({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  className = "",
}) => (
  <div className="flex flex-col space-y-1.5 group">
    <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-blue-600">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`p-4 border border-slate-200 rounded-xl bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-sm font-bold ${className}`}
    />
  </div>
);

export default WarehouseInbound;
