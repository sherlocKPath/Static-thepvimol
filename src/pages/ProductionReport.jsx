import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  FileSpreadsheet, 
  TrendingDown, 
  Search,
  ChevronDown,
  Filter
} from 'lucide-react';

const ProductionReport = () => {
  // 1. ข้อมูลจำลองสำหรับผู้บริหาร (Reconcile Data)
  const [reportData] = useState([
    { 
      jobNo: "J104/0868", 
      product: "TB-0000PL17-00", 
      issued: 50, // จำนวนม้วนที่เบิก
      formed: 48, // ขึ้นรูปได้ (ม้วน)
      peeling: 45000, // จำนวนชิ้นที่แกะได้
      cutting: 44850, // จำนวนชิ้นที่ตัดเสร็จ (Final A)
      yield: "96.5%",
      status: "Normal"
    },
    { 
      jobNo: "J105/0868", 
      product: "TB-0000PL18-00", 
      issued: 25, 
      formed: 22, 
      peeling: 20000, 
      cutting: 19500, 
      yield: "88.0%",
      status: "Warning" // มี Loss สูงกว่าปกติ
    },
    { 
      jobNo: "J106/0868", 
      product: "TB-0000PL19-00", 
      issued: 100, 
      formed: 99, 
      peeling: 95000, 
      cutting: 94800, 
      yield: "98.2%",
      status: "Excellent"
    }
  ]);

  return (
    <div className="min-h-screen bg-[#f1f3f5] font-sans text-slate-800">
      <main className="p-4 md:p-6 max-w-400 mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex items-center space-x-3">
            <div className="bg-[#004a99] p-2 rounded-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800 uppercase tracking-tight">รายงานเปรียบเทียบผลผลิต (Reconcile Report)</h1>
              <p className="text-xs text-slate-500 font-medium">สรุปข้อมูลการเบิก-ขึ้นรูป-แกะ-ตัด ราย Job Order สำหรับผู้บริหาร</p>
            </div>
          </div>

          {/* Export Group Buttons */}
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg shadow-sm transition text-sm font-bold">
              <FileSpreadsheet className="w-4 h-4 text-green-600" />
              <span>Export Excel</span>
            </button>
            <button className="flex items-center space-x-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg shadow-sm transition text-sm font-bold">
              <Download className="w-4 h-4 text-red-600" />
              <span>Export PDF</span>
            </button>
          </div>
        </div>

        {/* 2. สรุปยอดภาพรวม (Executive Summary Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
           <SummaryCard title="Total Jobs" value="12" sub="Active this month" color="blue" />
           <SummaryCard title="Avg. Yield" value="94.2%" sub="+1.5% from last month" color="green" />
           <SummaryCard title="Total Loss" value="5.8%" sub="Material waste" color="red" />
           <SummaryCard title="On-time Delivery" value="92%" sub="Production efficiency" color="amber" />
        </div>

        {/* 3. Reconcile Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-200">
          {/* Table Toolbar */}
          <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex flex-col md:flex-row justify-between gap-4">
             <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input type="text" placeholder="ค้นหาตามเลขที่ Job หรือรหัสสินค้า..." className="pl-10 pr-4 py-2 w-full border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
             </div>
             <button className="flex items-center space-x-2 px-4 py-2 text-slate-600 border border-slate-300 rounded-lg bg-white hover:bg-slate-50 text-sm font-bold">
                <Filter className="w-4 h-4" />
                <span>ตัวกรองขั้นสูง</span>
             </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#f8fafc] text-slate-600 uppercase text-[11px] font-black tracking-wider">
                <tr className="border-b border-slate-200 divide-x divide-slate-100">
                  <th className="px-6 py-4 w-[12%]">Job Order No.</th>
                  <th className="px-6 py-4 w-[18%]">รหัสสินค้า</th>
                  <th className="px-6 py-4 text-center bg-blue-50/30">1. เบิก (ม้วน)</th>
                  <th className="px-6 py-4 text-center bg-blue-50/30">2. ขึ้นรูป (ม้วน)</th>
                  <th className="px-6 py-4 text-center bg-emerald-50/30">3. แกะ (ชิ้น)</th>
                  <th className="px-6 py-4 text-center bg-emerald-50/30">4. ตัดเสร็จ (ชิ้น)</th>
                  <th className="px-6 py-4 text-center">Yield %</th>
                  <th className="px-6 py-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm font-medium">
                {reportData.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-50 transition-colors divide-x divide-slate-50">
                    <td className="px-6 py-4 font-bold text-[#004a99]">{item.jobNo}</td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-800">{item.product}</div>
                    </td>
                    {/* ยอดม้วน */}
                    <td className="px-6 py-4 text-center text-slate-600 font-bold">{item.issued}</td>
                    <td className="px-6 py-4 text-center font-bold">
                      <span className={item.formed < item.issued ? "text-red-500" : "text-slate-800"}>
                        {item.formed}
                      </span>
                    </td>
                    {/* ยอดชิ้น */}
                    <td className="px-6 py-4 text-center text-slate-600 font-bold">{item.peeling.toLocaleString()}</td>
                    <td className="px-6 py-4 text-center text-emerald-700 font-black">{item.cutting.toLocaleString()}</td>
                    
                    <td className="px-6 py-4 text-center">
                      <div className="flex flex-col items-center">
                        <span className="font-black text-slate-800">{item.yield}</span>
                        <div className="w-16 bg-slate-200 h-1.5 rounded-full mt-1 overflow-hidden">
                           <div 
                              className={`h-full ${parseFloat(item.yield) < 90 ? 'bg-red-500' : 'bg-emerald-500'}`} 
                              style={{ width: item.yield }}
                           ></div>
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest
                        ${item.status === 'Normal' ? 'bg-blue-100 text-blue-700' : 
                          item.status === 'Excellent' ? 'bg-emerald-100 text-emerald-700' : 
                          'bg-red-100 text-red-700 animate-pulse'}`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

// Reusable Summary Card Component
const SummaryCard = ({ title, value, sub, color }) => {
  const colors = {
    blue: 'border-blue-500 text-blue-600',
    green: 'border-emerald-500 text-emerald-600',
    red: 'border-red-500 text-red-600',
    amber: 'border-amber-500 text-amber-600'
  };

  return (
    <div className={`bg-white p-5 rounded-xl shadow-sm border-l-4 ${colors[color]}`}>
      <p className="text-slate-500 text-xs font-bold uppercase mb-1">{title}</p>
      <h3 className="text-2xl font-black text-slate-800">{value}</h3>
      <p className="text-[10px] text-slate-400 font-medium mt-1">{sub}</p>
    </div>
  );
};

export default ProductionReport;