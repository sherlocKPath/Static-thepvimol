import React, { useState, useMemo } from "react";
import {
  Search,
  Plus,
  Package,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Edit2,
  Trash2,
  X,
  Save,
  Database,
  Activity,
} from "lucide-react";

const WarehouseInbound = ({ setCurrentPage, inboundDate }) => {
  // ข้อมูลจำลอง
  const [inboundRecords] = useState([
    {
      id: 1,
      productCode: "TB-0000PL17-00 ถาด",
      jobNo: "104/0868",
      location: "A",
      slots: [
        20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 252,
      ],
      pcsPerBox: 140,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  // const [selectedProduct, setSelectedProduct] = useState(null);

  // คำนวณผลรวมสะสมท้ายตาราง
  const grandTotals = useMemo(() => {
    return inboundRecords.reduce(
      (acc, row) => {
        const rowSum = row.slots.reduce((s, v) => s + (Number(v) || 0), 0);
        const rowTotalPcs = rowSum * row.pcsPerBox;
        return { qty: acc.qty + rowSum, pcs: acc.pcs + rowTotalPcs };
      },
      { qty: 0, pcs: 0 },
    );
  }, [inboundRecords]);

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans">
      {/* --- 1. TOP HEADER BAR (เหมือนหน้า Molding Detail) --- */}
      <div className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-200">
            <Database size={20} />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-800 tracking-tight leading-none uppercase">
              สินค้าส่งเข้าคลังประจำวันที่ :{" "}
              <span className="text-indigo-700">
                {/* ตรวจสอบและแปลงรูปแบบวันที่เป็น DD/MM/YYYY */}
                {inboundDate
                  ? new Date(inboundDate).toLocaleDateString("en-GB")
                  : "16/08/2025"}
              </span>
            </h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 italic">
              Daily Warehouse Inbound Transaction Record
            </p>
          </div>
        </div>

        <button
          onClick={() => setCurrentPage("warehouselist")}
          className="flex items-center space-x-2 px-6 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold text-xs hover:bg-slate-50 shadow-sm active:scale-95 uppercase tracking-widest text-[11px]"
        >
          <ChevronLeft size={16} /> <span>Back To List</span>
        </button>
      </div>

      <main className="p-4 md:p-6 max-w-400 mx-auto animate-in fade-in duration-500">
        {/* --- 2. ACTION BUTTON AREA --- */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center space-x-2 bg-[#004a99] hover:bg-[#003366] text-white px-8 py-3 rounded-2xl shadow-xl transition-all font-black text-xs active:scale-95 border-b-4 border-blue-900 uppercase tracking-wider"
          >
            <Plus className="w-5 h-5" />
            <span>เพิ่มรายการสินค้า</span>
          </button>
        </div>

        {/* --- 3. TABLE SECTION --- */}
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-300">
              <thead className="bg-[#f1f3f5] border-b border-slate-300 font-bold">
                <tr className="divide-x divide-slate-200 text-slate-600">
                  <th className="px-3 py-4 text-[10px] text-center uppercase w-16">
                    ลำดับที่
                  </th>
                  <th className="px-4 py-4 text-[10px] uppercase w-48">
                    รหัสสินค้า
                  </th>
                  <th className="px-4 py-4 text-[10px] text-center w-28">
                    Job No.
                  </th>
                  <th className="px-4 py-4 text-[10px] text-center uppercase w-20">
                    ที่จัดเก็บ
                  </th>
                  {Array.from({ length: 17 }, (_, i) => (
                    <th
                      key={i}
                      className="p-1 text-[9px] text-center uppercase w-10"
                    >
                      {i + 1}
                    </th>
                  ))}
                  <th className="px-4 py-4 text-[10px] text-center uppercase w-24">
                    รวมยอด
                  </th>
                  <th className="px-4 py-4 text-[10px] text-center uppercase w-16">
                    เศษ
                  </th>
                  <th className="px-4 py-4 text-[10px] text-center uppercase w-24">
                    ชิ้น/กล่อง
                  </th>
                  <th className="px-4 py-4 text-[10px] text-center uppercase w-32 font-black text-blue-800 bg-blue-50/30 border-l-2 border-blue-200">
                    จำนวนชิ้น
                  </th>
                  <th className="px-4 py-4 text-[10px] text-center w-20">
                    Tool
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm font-bold">
                {inboundRecords.map((row) => {
                  const rowSum = row.slots.reduce(
                    (a, b) => a + (Number(b) || 0),
                    0,
                  );
                  const rowTotalPcs = rowSum * row.pcsPerBox;
                  return (
                    <tr
                      key={row.id}
                      className="hover:bg-blue-50/20 transition-colors divide-x divide-slate-100"
                    >
                      <td className="px-3 py-4 text-center text-slate-400 font-medium">
                        #{row.id}
                      </td>
                      <td className="px-4 py-4 text-slate-700">
                        {row.productCode}
                      </td>
                      <td className="px-4 py-4 text-center text-blue-700">
                        {row.jobNo}
                      </td>
                      <td className="px-4 py-4 text-center text-slate-500">
                        {row.location}
                      </td>
                      {row.slots.map((val, i) => (
                        <td
                          key={i}
                          className={`p-1 text-center text-xs ${val ? "text-slate-800" : "text-slate-300"}`}
                        >
                          {val || "-"}
                        </td>
                      ))}
                      <td className="px-4 py-4 text-center text-indigo-700 font-black bg-indigo-50/30">
                        {rowSum}
                      </td>
                      <td className="px-4 py-4 text-center text-slate-400">
                        -
                      </td>
                      <td className="px-4 py-4 text-center text-slate-600">
                        {row.pcsPerBox}
                      </td>
                      <td className="px-4 py-4 text-center text-blue-800 font-black bg-blue-50/50 border-l-2 border-blue-100">
                        {rowTotalPcs.toLocaleString()}
                      </td>
                      <td className="px-4 py-4 text-center">
                        <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors active:scale-90">
                          <Edit2 size={14} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot className="bg-slate-50 border-t-2 border-slate-300 font-black">
                <tr className="divide-x divide-slate-200">
                  <td
                    colSpan="4"
                    className="px-8 py-5 text-right text-[11px] text-slate-500 uppercase tracking-widest"
                  >
                    รวมทั้งหมดประจำวัน
                  </td>
                  <td colSpan="17" className="bg-slate-100/50"></td>
                  <td className="px-4 py-5 text-center text-indigo-700 text-base">
                    {grandTotals.qty}
                  </td>
                  <td className="bg-slate-50"></td>
                  <td className="bg-slate-50"></td>
                  <td className="px-4 py-5 text-center text-blue-900 text-lg bg-blue-100/50">
                    {grandTotals.pcs.toLocaleString()}
                  </td>
                  <td className="bg-slate-50"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* --- 4. PAGINATION --- */}
        <div className="mt-6 flex justify-between items-center px-4 font-bold">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Total {inboundRecords.length} Products Entry
          </p>
          <div className="flex space-x-1">
            <button className="p-2 border border-slate-200 rounded-lg bg-white disabled:opacity-30">
              <ChevronLeft size={16} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-xs font-black bg-[#004a99] text-white rounded-lg shadow-lg">
              1
            </button>
            <button className="p-2 border border-slate-200 rounded-lg bg-white disabled:opacity-30">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </main>

      {/* --- MODAL (คงเดิมตามฟังก์ชันที่ออกแบบไว้) --- */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="bg-[#004a99] p-6 text-white flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <Plus className="bg-white/20 p-1.5 rounded-lg" />
                <h3 className="font-black uppercase tracking-tight">
                  เพิ่มรายการสินค้าส่งเข้าคลัง
                </h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            {/* Modal Body เนื้อหาช่อง 1-17 คงเดิม... */}
            <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-8 max-h-[70vh] overflow-y-auto no-scrollbar">
              <div className="space-y-5">
                <ModalInput label="รหัสสินค้า" placeholder="ระบุรหัสสินค้า" />
                <div className="grid grid-cols-2 gap-4">
                  <ModalInput label="Job No." placeholder="104/0868" />
                  <ModalInput label="ที่จัดเก็บ" placeholder="A" />
                </div>
                <ModalInput
                  label="จำนวนชิ้นต่อกล่อง"
                  type="number"
                  placeholder="140"
                />
              </div>
              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-slate-400 uppercase border-b pb-2 tracking-widest">
                  ข้อมูลรายช่อง (1-17)
                </h4>
                <div className="grid grid-cols-4 lg:grid-cols-6 gap-3">
                  {Array.from({ length: 17 }, (_, i) => (
                    <div key={i} className="space-y-1">
                      <label className="text-[9px] font-black text-slate-300 uppercase ml-1">
                        ช่อง {i + 1}
                      </label>
                      <input
                        type="number"
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-center outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-8 bg-slate-50 border-t flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-8 py-3 font-black text-slate-400 uppercase hover:text-slate-600 transition-colors"
              >
                ยกเลิก
              </button>
              <button className="px-10 py-3 bg-[#004a99] text-white font-black rounded-2xl shadow-xl active:scale-95 border-b-4 border-blue-900 flex items-center space-x-2">
                <Save size={18} /> <span>ยืนยันบันทึกข้อมูล</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ModalInput = ({ label, ...props }) => (
  <div className="space-y-1">
    <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-tighter">
      {label}
    </label>
    <input
      className="w-full p-3.5 border border-slate-200 rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
      {...props}
    />
  </div>
);

export default WarehouseInbound;
