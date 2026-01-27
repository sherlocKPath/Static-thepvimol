import React, { useState } from "react";
import { Plus, Users, LayoutDashboard, X, Save, Trash2 } from "lucide-react";

const ProductUnpackMgmt = () => {
  // 1. Data Structure State
  const [jobs, setJobs] = useState([
    {
      id: 1,
      jobNo: "104/0868",
      productCode: "TB-0000PL17-00 ถาด",
      isFinished: false,
    },
    {
      id: 2,
      jobNo: "104/0868",
      productCode: "TB-0000PL17-01 ฝา",
      isFinished: false,
    },
  ]);

  const [staffData, setStaffData] = useState([
    {
      id: 1,
      name: "โม",
      performances: { "1-A": 118, "1-B": 0, "2-A": 118, "2-B": 0 },
    },
  ]);

  const [showAddJobModal, setShowAddJobModal] = useState(false);
  const [newJob, setNewJob] = useState({ jobNo: "", productCode: "" });

  // 2. Logic Functions
  const addJob = () => {
    if (!newJob.jobNo || !newJob.productCode) return;
    const newId = Date.now();
    setJobs([...jobs, { id: newId, ...newJob, isFinished: false }]);
    setShowAddJobModal(false);
    setNewJob({ jobNo: "", productCode: "" });
  };

  const addStaff = () => {
    const name = prompt("ระบุชื่อผู้แกะสินค้า:");
    if (name) {
      setStaffData([...staffData, { id: Date.now(), name, performances: {} }]);
    }
  };

  const handlePerfChange = (staffId, key, value) => {
    setStaffData((prev) =>
      prev.map((s) => {
        if (s.id === staffId) {
          return {
            ...s,
            performances: { ...s.performances, [key]: Number(value) || 0 },
          };
        }
        return s;
      }),
    );
  };

  const toggleJobStatus = (id) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === id ? { ...j, isFinished: !j.isFinished } : j)),
    );
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans pb-20">
      <main className="p-4 md:p-6 max-w-full mx-auto animate-in fade-in duration-500">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg shadow-blue-100">
              <Users size={20} />
            </div>
            <h1 className="text-xl font-black text-slate-700 uppercase tracking-tight">
              สรุปการแกะสินค้า (Product Unpack)
            </h1>
          </div>
          <button className="flex items-center space-x-2 bg-[#004a99] text-white px-6 py-2.5 rounded-xl shadow-xl active:scale-95 border-b-4 border-blue-900 font-black text-xs uppercase">
            <Save size={16} /> <span>บันทึกข้อมูลทั้งหมด</span>
          </button>
        </div>

        {/* Table Area */}
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse table-fixed min-w-200">
              <thead>
                {/* Row 1: Header Titles */}
                <tr className="bg-[#f1f3f5] text-[11px] font-black text-slate-500 uppercase tracking-widest divide-x divide-slate-200">
                  <th rowSpan="3" className="w-32 py-4">
                    ชื่อ
                  </th>
                  {jobs.map((j) => (
                    <th
                      key={j.id}
                      colSpan="2"
                      className="py-2 px-4 relative group"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-blue-600">Job: {j.jobNo}</span>
                        <label className="flex items-center space-x-1 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={j.isFinished}
                            onChange={() => toggleJobStatus(j.id)}
                            className="w-3 h-3"
                          />
                          <span
                            className={
                              j.isFinished ? "text-red-500" : "text-slate-400"
                            }
                          >
                            หมด
                          </span>
                        </label>
                      </div>
                    </th>
                  ))}
                  <th rowSpan="4" className="w-40 bg-blue-50/50 text-blue-700">
                    รวมผลงานแต่ละคน
                  </th>
                  <th rowSpan="4" className="w-24 border-none">
                    <button
                      onClick={() => setShowAddJobModal(true)}
                      className="w-12 h-12 bg-white border-2 border-dashed border-slate-300 rounded-2xl flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-400 transition-all mx-auto active:scale-90"
                    >
                      <Plus size={20} />
                    </button>
                  </th>
                </tr>
                {/* Row 2: Product Codes */}
                <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 divide-x divide-slate-200">
                  {jobs.map((j) => (
                    <th
                      key={j.id}
                      colSpan="2"
                      className="py-2 px-2 border-b border-slate-100"
                    >
                      {j.productCode}
                    </th>
                  ))}
                </tr>
                {/* Row 3: A / B Headers */}
                <tr className="bg-white text-[10px] font-black text-slate-600 divide-x divide-slate-200 border-b border-slate-200">
                  {jobs.map((j) => (
                    <React.Fragment key={j.id}>
                      <th className="py-2 w-20">A</th>
                      <th className="py-2 w-20">B</th>
                    </React.Fragment>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {staffData.map((staff) => {
                  let rowTotal = 0;
                  return (
                    <tr
                      key={staff.id}
                      className="divide-x divide-slate-100 hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="py-4 font-black text-slate-700 text-sm">
                        {staff.name}
                      </td>
                      {jobs.map((j) => {
                        const valA = staff.performances[`${j.id}-A`] || 0;
                        const valB = staff.performances[`${j.id}-B`] || 0;
                        rowTotal += valA + valB;
                        return (
                          <React.Fragment key={j.id}>
                            <td className="p-1">
                              <input
                                type="number"
                                value={valA || ""}
                                onChange={(e) =>
                                  handlePerfChange(
                                    staff.id,
                                    `${j.id}-A`,
                                    e.target.value,
                                  )
                                }
                                disabled={j.isFinished}
                                className="w-full h-10 text-center font-bold text-slate-700 bg-transparent outline-none focus:bg-blue-50 rounded-lg transition-all"
                              />
                            </td>
                            <td className="p-1">
                              <input
                                type="number"
                                value={valB || ""}
                                onChange={(e) =>
                                  handlePerfChange(
                                    staff.id,
                                    `${j.id}-B`,
                                    e.target.value,
                                  )
                                }
                                disabled={j.isFinished}
                                className="w-full h-10 text-center font-bold text-orange-600 bg-transparent outline-none focus:bg-orange-50 rounded-lg transition-all"
                              />
                            </td>
                          </React.Fragment>
                        );
                      })}
                      <td className="font-black text-blue-800 text-base bg-blue-50/20">
                        {rowTotal.toLocaleString()}
                      </td>
                      <td></td>
                    </tr>
                  );
                })}
                {/* Add Staff Row */}
                <tr>
                  <td
                    colSpan={jobs.length * 2 + 2}
                    className="py-4 bg-slate-50/30"
                  >
                    <button
                      onClick={addStaff}
                      className="flex items-center space-x-2 mx-auto px-6 py-2 bg-white border border-slate-200 rounded-xl text-slate-500 font-bold text-xs hover:bg-blue-600 hover:text-white transition-all shadow-sm active:scale-95"
                    >
                      <Plus size={14} /> <span>เพิ่มผู้แกะ</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* --- ADD JOB MODAL --- */}
      {showAddJobModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-[#004a99] text-white">
              <h3 className="text-xl font-black uppercase tracking-tight">
                เพิ่มข้อมูล Job การแกะ
              </h3>
              <button
                onClick={() => setShowAddJobModal(false)}
                className="hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-10 space-y-6">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-1">
                  JOB NO.
                </label>
                <input
                  type="text"
                  value={newJob.jobNo}
                  onChange={(e) =>
                    setNewJob({ ...newJob, jobNo: e.target.value })
                  }
                  placeholder="ตัวอย่าง: 105/0868"
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-1">
                  รหัสสินค้า / รายละเอียด
                </label>
                <input
                  type="text"
                  value={newJob.productCode}
                  onChange={(e) =>
                    setNewJob({ ...newJob, productCode: e.target.value })
                  }
                  placeholder="ระบุรหัสสินค้า"
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={addJob}
                className="w-full py-4 bg-[#004a99] text-white font-black rounded-2xl shadow-xl active:scale-95 border-b-4 border-blue-900 uppercase tracking-widest"
              >
                เพิ่มรายการเข้าตาราง
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductUnpackMgmt;
