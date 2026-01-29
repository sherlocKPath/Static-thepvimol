import React, { useState } from "react";
import {
  Save,
  ChevronLeft,
  ClipboardList,
  Calendar,
  Hash,
  Layers,
  FileText,
  ChevronDown,
} from "lucide-react";

const RawMaterialIssue = ({ addRequisition, setCurrentPage }) => {
  // ข้อมูล Job ที่ถูกล็อคไว้
  const fixedJob = {
    id: "J104/0868",
    productCode: "TB-0000PL17-00",
  };

  const [formData, setFormData] = useState({
    jobOrderId: fixedJob.id,
    productCode: fixedJob.productCode,
    materialId: "",
    lotNo: "",
    mfgDate: "",
    qty: "",
    remark: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof addRequisition !== "function") return;

    // ส่งข้อมูลไปยัง State หลักใน App.jsx
    addRequisition({
      ...formData,
      qty: Number(formData.qty), // แปลงค่าเป็นตัวเลข
    });

    alert("บันทึกใบเบิกวัตถุดิบสำเร็จ!");

    if (typeof setCurrentPage === "function") {
      setCurrentPage("matlist");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans text-slate-800">
      <div className="max-w-4xl mx-auto p-4 md:p-6">
        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <button
            onClick={() => setCurrentPage("matlist")}
            className="group flex items-center text-slate-500 hover:text-[#004a99] transition-all font-bold uppercase text-xs tracking-widest"
          >
            <div className="mr-3 p-2 bg-white border border-slate-200 rounded-xl group-hover:border-[#004a99] shadow-sm">
              <ChevronLeft size={18} />
            </div>
            Back to List
          </button>
          <div className="text-right">
            <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">
              บันทึกการเบิกวัตถุดิบ
            </h2>
            <p className="text-xs font-bold text-blue-600 italic">
              Material Requisition Entry
            </p>
          </div>
        </div>

        {/* --- Form Section --- */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500"
        >
          <div className="bg-blue-50 p-6 border-b border-blue-100">
            <div className="flex items-center space-x-3 text-[#004a99]">
              <ClipboardList className="w-6 h-6" />
              <h2 className="text-lg font-bold uppercase tracking-tight">
                ข้อมูลใบเบิกวัตถุดิบ
              </h2>
            </div>
            <div>
              <p className="text-sm text-slate-600 mt-1">
                กรอกข้อมูลรายละเอียดการเบิกวัตถุดิบให้ครบถ้วน
              </p>
            </div>
          </div>

          <div className="p-8 space-y-6">
            {/* --- ส่วนที่ล็อค Job และ รหัสสินค้า (พื้นหลังสีเทา) --- */}
            <div className="bg-slate-100 p-6 rounded-2xl border border-slate-200 space-y-4 shadow-inner">
              <div>
                <label className="block text-xs font-black text-slate-500 mb-2 tracking-widest">
                  Job Order No.
                </label>
                <input
                  type="text"
                  readOnly
                  className="w-full p-4 bg-white border border-slate-300 rounded-xl text-blue-700 font-black cursor-not-allowed shadow-sm"
                  value={formData.jobOrderId}
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-500 mb-2 uppercase tracking-widest">
                  รหัสสินค้า
                </label>
                <input
                  type="text"
                  readOnly
                  className="w-full p-4 bg-white border border-slate-300 rounded-xl text-slate-700 font-bold cursor-not-allowed italic shadow-sm"
                  value={formData.productCode}
                />
              </div>
            </div>

            {/* --- ส่วนข้อมูลที่ต้องกรอก --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div>
                <label className="flex items-center text-[11px] font-bold text-slate-500 mb-2 uppercase tracking-tight">
                  <Layers className="w-4 h-4 mr-2 text-blue-500" /> รหัสวัตถุดิบ
                  *
                </label>
                <div className="relative group">
                  <select
                    required
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none shadow-sm text-sm font-bold appearance-none bg-white cursor-pointer transition-all"
                    value={formData.materialId}
                    onChange={(e) =>
                      setFormData({ ...formData, materialId: e.target.value })
                    }
                  >
                    <option value="" disabled>
                      เลือกรายการรหัสวัตถุดิบ
                    </option>
                    <option value="5B660055FB">
                      5B660055FB
                    </option>
                    <option value="5B660055FT">
                      5T660055FT
                    </option>
                    <option value="5A660055FA">
                      5A660055FA
                    </option>
                    <option value="5C660055FC">
                      5C660055FC
                    </option>
                    <option value="5D660055FD">
                      5D660055FD
                    </option>
                  </select>

                  {/* ไอคอนลูกศร Dropdown ส่วนท้าย */}
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-focus-within:text-blue-500 transition-colors">
                    <ChevronDown size={18} />
                  </div>
                </div>
              </div>

              <div>
                <label className="flex items-center text-[11px] font-bold text-slate-500 mb-2 tracking-tight">
                  <Hash className="w-4 h-4 mr-2 text-blue-500" /> Lot No. *
                </label>
                <input
                  type="text"
                  required
                  placeholder="ระบุหมายเลข Lot"
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none shadow-sm text-sm font-bold"
                  value={formData.lotNo}
                  onChange={(e) =>
                    setFormData({ ...formData, lotNo: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="flex items-center text-[11px] font-bold text-slate-500 mb-2 uppercase tracking-tight">
                  <Calendar className="w-4 h-4 mr-2 text-blue-500" />{" "}
                  วันที่ผลิตวัตถุดิบ
                </label>
                <input
                  type="date"
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none shadow-sm text-sm font-bold"
                  value={formData.mfgDate}
                  onChange={(e) =>
                    setFormData({ ...formData, mfgDate: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-2 uppercase tracking-tight">
                  จำนวน (ม้วน) *
                </label>
                <input
                  type="number"
                  required
                  placeholder="0"
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-black text-2xl text-blue-600 shadow-sm"
                  value={formData.qty}
                  onChange={(e) =>
                    setFormData({ ...formData, qty: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="flex items-center text-[11px] font-bold text-slate-500 mb-2 uppercase tracking-tight">
                <FileText className="w-4 h-4 mr-2 text-blue-500" /> หมายเหตุ /
                REMARK
              </label>
              <textarea
                rows="3"
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none shadow-sm text-sm font-bold"
                placeholder="ระบุข้อมูลเพิ่มเติม (ถ้ามี)"
                value={formData.remark}
                onChange={(e) =>
                  setFormData({ ...formData, remark: e.target.value })
                }
              ></textarea>
            </div>
          </div>

          {/* --- Footer Button --- */}
          <div className="p-8 bg-slate-50 border-t border-gray-100">
            <button
              type="submit"
              className="w-full bg-[#004a99] hover:bg-blue-800 text-white font-black py-5 rounded-2xl shadow-xl flex items-center justify-center space-x-3 transition-all transform hover:scale-[1.01] active:scale-95 text-lg uppercase border-b-4 border-blue-900"
            >
              <Save className="w-6 h-6" />
              <span>ยืนยันและบันทึกใบเบิกวัตถุดิบ</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RawMaterialIssue;
