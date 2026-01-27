import React, { useState } from "react";
import {
  Plus, Search, Calendar, ChevronLeft, ChevronRight,
  Edit2, Trash2, Eye, X, Database, ArrowRight
} from "lucide-react";

const WarehouseInboundList = ({ onNavigateToDetail }) => {
  // ข้อมูลจำลองรายการสรุปรายวัน
  const [inboundSummary] = useState([
    {
      date: "15/08/2025",
      productCount: 14,
      jobCount: 10,
      totalBoxes: 1761,
      totalPcs: 306580,
    },
    {
      date: "16/08/2025",
      productCount: 12,
      jobCount: 8,
      totalBoxes: 1540,
      totalPcs: 285000,
    }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const handleCreate = (e) => {
    e.preventDefault();
    if (selectedDate) {
      // เมื่อกดสร้าง จะส่งข้อมูลวันที่ไปยังฟังก์ชันนำทางเพื่อเปิดหน้า WarehouseInbound
      onNavigateToDetail(selectedDate);
      setShowCreateModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans">
      <main className="p-4 md:p-6 max-w-7xl mx-auto animate-in fade-in duration-500">
        
        {/* 1. Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-100">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-700 uppercase tracking-tight">
                รายการส่งสินค้าเข้าคลัง (All Inbound)
              </h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                Summary of Daily Warehouse Inbound Transactions
              </p>
            </div>
          </div>

          <button 
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 bg-[#004a99] hover:bg-blue-800 text-white px-6 py-3 rounded-2xl shadow-xl transition-all font-black text-sm active:scale-95 border-b-4 border-blue-900 uppercase"
          >
            <Plus className="w-5 h-5" />
            <span>ส่งสินค้าเข้าคลัง</span>
          </button>
        </div>

        {/* 2. Summary Table Section */}
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#f1f3f5] border-b border-slate-300 font-bold">
                <tr className="divide-x divide-slate-200 text-slate-600">
                  <th className="px-6 py-4 text-xs uppercase tracking-wider">วันที่ส่งเข้าคลัง</th>
                  <th className="px-6 py-4 text-xs text-center uppercase tracking-wider">จำนวนตามรหัสสินค้า</th>
                  <th className="px-6 py-4 text-center text-xs uppercase tracking-wider">จำนวนตาม Job No.</th>
                  <th className="px-6 py-4 text-center text-xs uppercase tracking-wider font-black text-indigo-700">รวมยอด (กล่อง)</th>
                  <th className="px-6 py-4 text-center text-xs uppercase tracking-wider font-black text-blue-700 bg-blue-50/30">รวมจำนวนชิ้น</th>
                  <th className="px-6 py-4 text-center text-xs uppercase tracking-wider w-32">Tools</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm font-bold">
                {inboundSummary.map((item, idx) => (
                  <tr key={idx} className="hover:bg-blue-50/20 transition-colors divide-x divide-slate-100">
                    <td className="px-6 py-4 text-slate-700 flex items-center space-x-3">
                      <div className="bg-slate-100 p-2 rounded-lg text-slate-400 group-hover:text-blue-600 transition-colors">
                        <Calendar size={16} />
                      </div>
                      <span>{item.date}</span>
                    </td>
                    <td className="px-6 py-4 text-center text-slate-600 font-semibold">{item.productCount} รายการ</td>
                    <td className="px-6 py-4 text-center text-blue-600">{item.jobCount} Jobs</td>
                    <td className="px-6 py-4 text-center font-black text-indigo-700">{item.totalBoxes.toLocaleString()}</td>
                    <td className="px-6 py-4 text-center font-black text-blue-800 bg-blue-50/50">{item.totalPcs.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center space-x-3 text-slate-400">
                        <button onClick={() => onNavigateToDetail(item.date)} className="hover:text-blue-600 font-black uppercase text-[10px] underline underline-offset-4 decoration-slate-200 hover:decoration-blue-600 transition-all">View</button>
                        <button className="hover:text-indigo-600 font-black uppercase text-[10px] underline underline-offset-4 decoration-slate-200 hover:decoration-indigo-600 transition-all">Edit</button>
                        <button className="hover:text-red-500 font-black uppercase text-[10px] underline underline-offset-4 decoration-slate-200 hover:decoration-red-600 transition-all">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 3. Pagination (Style match other pages) */}
          <div className="px-8 py-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between font-bold">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
              Showing {inboundSummary.length} entries
            </p>
            <div className="flex items-center space-x-1">
              <button className="p-2 border border-slate-300 rounded bg-white hover:bg-slate-50 shadow-sm transition-all">
                <ChevronLeft className="w-4 h-4 text-slate-600" />
              </button>
              <button className="w-8 h-8 flex items-center justify-center text-xs font-black bg-[#004a99] text-white rounded-lg shadow-lg shadow-blue-200 transition-transform active:scale-95">1</button>
              <button className="p-2 border border-slate-300 rounded bg-white hover:bg-slate-50 shadow-sm transition-all">
                <ChevronRight className="w-4 h-4 text-slate-600" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* --- MODAL: เลือกวันที่เพื่อสร้างข้อมูลใหม่ --- */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 font-sans">
            <div className="p-8 pb-4 flex justify-between items-center">
              <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">วันที่ส่งเข้าคลัง</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-300 hover:text-slate-500 transition-colors p-2"><X size={24} /></button>
            </div>
            
            <form onSubmit={handleCreate} className="p-8 pt-0 space-y-6">
               <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest">เลือกวันที่ (Date Selection)</label>
                 <input 
                   required
                   type="date"
                   value={selectedDate}
                   onChange={(e) => setSelectedDate(e.target.value)}
                   className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-blue-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all text-center text-lg"
                 />
               </div>

               <div className="flex space-x-3 pt-4">
                 <button 
                   type="button"
                   onClick={() => setShowCreateModal(false)} 
                   className="flex-1 py-4 font-black text-slate-400 uppercase tracking-widest hover:text-slate-600 hover:bg-slate-50 rounded-2xl transition-all"
                 >
                   ยกเลิก
                 </button>
                 <button 
                   type="submit"
                   className="flex-1 py-4 bg-[#004a99] text-white font-black rounded-2xl shadow-xl shadow-blue-100 flex items-center justify-center space-x-2 active:scale-95 transition-all border-b-4 border-blue-900 uppercase"
                 >
                   <span>สร้าง</span> <ArrowRight size={18} />
                 </button>
               </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WarehouseInboundList;