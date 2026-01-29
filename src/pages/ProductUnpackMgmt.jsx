import React, { useState } from "react";
import {
  Plus,
  Users,
  X,
  Save,
  ChevronLeft,
  LayoutDashboard,
  UserPlus,
} from "lucide-react";

const ProductUnpackMgmt = ({ onBack }) => {
  const PCS_PER_PACK = 35; // มาตรฐาน 35 ชิ้นต่อห่อ

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
      jobNo: "107/0868",
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
    {
      id: 2,
      name: "สำรวย",
      performances: { "1-A": 118, "1-B": 0, "2-A": 118, "2-B": 0 },
    },
  ]);

  const [showAddJobModal, setShowAddJobModal] = useState(false);
  const [newJob, setNewJob] = useState({ jobNo: "", productCode: "" });
  const [showAddStaffModal, setShowAddStaffModal] = useState(false);
  const [newStaffName, setNewStaffName] = useState("");

  // 2. Logic Functions
  const handlePerfChange = (staffId, key, value) => {
    setStaffData((prev) =>
      prev.map((s) =>
        s.id === staffId
          ? {
              ...s,
              performances: { ...s.performances, [key]: Number(value) || 0 },
            }
          : s,
      ),
    );
  };

  // ✅ ฟังก์ชันเพิ่มพนักงานลงในตาราง
  const confirmAddStaff = () => {
    if (!newStaffName.trim()) return;

    const newStaff = {
      id: Date.now(),
      name: newStaffName,
      performances: {}, // เริ่มต้นด้วยข้อมูลว่าง
    };

    setStaffData([...staffData, newStaff]);
    setNewStaffName("");
    setShowAddStaffModal(false);
  };

  const toggleJobStatus = (id) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === id ? { ...j, isFinished: !j.isFinished } : j)),
    );
  };

  const addJob = () => {
    if (!newJob.jobNo || !newJob.productCode) return;
    setJobs([...jobs, { id: Date.now(), ...newJob, isFinished: false }]);
    setShowAddJobModal(false);
    setNewJob({ jobNo: "", productCode: "" });
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans pb-20">
      <main className="p-4 md:p-6 max-w-full mx-auto animate-in fade-in duration-500">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center space-x-4">
            <div className="bg-[#004a99] p-3 rounded-2xl shadow-xl text-white">
              <LayoutDashboard size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight">
                สรุปการแกะสินค้าประจำวันที่ : 15/08/2568
              </h1>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
                Product Unpack Summary Sheet
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 px-6 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 font-black text-xs hover:bg-slate-50 transition-all shadow-sm active:scale-95 border-b-4 uppercase"
            >
              <ChevronLeft size={16} /> <span>Back To List</span>
            </button>
            <button className="flex items-center space-x-2 bg-[#004a99] text-white px-8 py-3 rounded-xl shadow-xl active:scale-95 border-b-4 border-blue-900 font-black text-xs uppercase tracking-widest">
              <Save size={16} /> <span>บันทึกข้อมูลทั้งหมด</span>
            </button>
          </div>
        </div>

        {/* --- Table Area --- */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden shadow-blue-900/5">
          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse table-fixed min-w-300">
              <thead>
                <tr className="bg-[#f8fafc] text-[10px] font-black text-slate-500 uppercase tracking-widest divide-x divide-slate-100 border-b border-slate-100">
                  <th rowSpan="3" className="w-40 py-6">
                    ชื่อ
                  </th>
                  {jobs.map((j) => (
                    <th
                      key={j.id}
                      colSpan="2"
                      className="py-4 px-4 relative group"
                    >
                      <div className="flex justify-between items-center text-blue-700 font-black mb-1">
                        <span>JOB: {j.jobNo}</span>
                        <label className="flex items-center space-x-1 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={j.isFinished}
                            onChange={() => toggleJobStatus(j.id)}
                            className="w-3.5 h-3.5 accent-red-600"
                          />
                          <span
                            className={`text-[9px] ${j.isFinished ? "text-red-600" : "text-slate-400"}`}
                          >
                            หมด
                          </span>
                        </label>
                      </div>
                      <div className="text-[9px] text-slate-400 truncate">
                        {j.productCode}
                      </div>
                      <div className="mt-1 text-[8px] bg-blue-50 text-blue-500 py-0.5 rounded-full border border-blue-100 italic font-bold">
                        บรรจุ {PCS_PER_PACK}
                      </div>
                    </th>
                  ))}
                  <th
                    rowSpan="3"
                    className="w-40 bg-slate-50 text-blue-900 font-black"
                  >
                    รวมผลงานแต่ละคน
                  </th>
                  <th rowSpan="3" className="w-20 border-none">
                    <button
                      onClick={() => setShowAddJobModal(true)}
                      className="w-12 h-12 bg-white border-2 border-dashed border-slate-300 rounded-2xl flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-400 transition-all mx-auto active:scale-90"
                    >
                      <Plus size={20} />
                    </button>
                  </th>
                </tr>
                <tr className="bg-white text-[9px] font-black text-slate-600 divide-x divide-slate-100 border-b border-slate-100">
                  {jobs.map((j) => (
                    <React.Fragment key={j.id}>
                      <th className="py-2">A</th>
                      <th className="py-2 text-orange-600">B</th>
                    </React.Fragment>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-50">
                {staffData.map((staff) => {
                  let rowTotalPacks = 0;
                  return (
                    <tr
                      key={staff.id}
                      className="divide-x divide-slate-50 hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="py-5 font-black text-slate-700 text-sm bg-slate-50/20">
                        {staff.name}
                      </td>
                      {jobs.map((j) => {
                        const valA = staff.performances[`${j.id}-A`] || 0;
                        const valB = staff.performances[`${j.id}-B`] || 0;
                        rowTotalPacks += valA + valB;
                        return (
                          <React.Fragment key={j.id}>
                            <td
                              className={`p-1 ${j.isFinished ? "bg-slate-50" : ""}`}
                            >
                              <input
                                type="number"
                                disabled={j.isFinished}
                                value={valA || ""}
                                onChange={(e) =>
                                  handlePerfChange(
                                    staff.id,
                                    `${j.id}-A`,
                                    e.target.value,
                                  )
                                }
                                className="w-full h-11 text-center font-bold text-slate-700 bg-transparent outline-none focus:bg-blue-50 rounded-xl disabled:cursor-not-allowed disabled:opacity-30"
                                placeholder="-"
                              />
                            </td>
                            <td
                              className={`p-1 ${j.isFinished ? "bg-slate-50" : ""}`}
                            >
                              <input
                                type="number"
                                disabled={j.isFinished}
                                value={valB || ""}
                                onChange={(e) =>
                                  handlePerfChange(
                                    staff.id,
                                    `${j.id}-B`,
                                    e.target.value,
                                  )
                                }
                                className="w-full h-11 text-center font-bold text-orange-600 bg-transparent outline-none focus:bg-orange-50 rounded-xl disabled:cursor-not-allowed disabled:opacity-30"
                                placeholder="-"
                              />
                            </td>
                          </React.Fragment>
                        );
                      })}
                      {/* คอลัมน์ขวาสุด: รวมรายคน */}
                      <td className="font-black text-blue-900 text-base bg-blue-50/10 italic">
                        {rowTotalPacks.toLocaleString()}
                      </td>
                      <td></td>
                    </tr>
                  );
                })}

                {/* --- สรุปท้ายตาราง 2 แถวติดกันตามภาพ --- */}
                {/* 1. แถวรวมห่อ */}
                <tr className="bg-slate-50/80 text-slate-700 divide-x divide-slate-200 font-black text-xs border-t-2 border-slate-200">
                  <td className="py-4 uppercase tracking-widest text-[10px] bg-slate-100">
                    รวมห่อ
                  </td>
                  {jobs.map((j) => {
                    const totalA = staffData.reduce(
                      (sum, s) => sum + (s.performances[`${j.id}-A`] || 0),
                      0,
                    );
                    const totalB = staffData.reduce(
                      (sum, s) => sum + (s.performances[`${j.id}-B`] || 0),
                      0,
                    );
                    return (
                      <React.Fragment key={j.id}>
                        <td className="bg-white">{totalA.toLocaleString()}</td>
                        <td className="bg-white text-orange-600">
                          {totalB.toLocaleString()}
                        </td>
                      </React.Fragment>
                    );
                  })}
                  {/* ยอดรวมห่อสุทธิ (ล่างขวา) */}
                  <td className="bg-blue-600 text-white text-base">
                    {staffData
                      .reduce(
                        (sum, s) =>
                          sum +
                          Object.values(s.performances).reduce(
                            (a, b) => a + b,
                            0,
                          ),
                        0,
                      )
                      .toLocaleString()}
                  </td>
                  <td></td>
                </tr>

                {/* 2. แถวรวมชิ้น */}
                <tr className="bg-slate-50/80 text-slate-700 divide-x divide-slate-200 font-black text-xs">
                  <td className="py-4 uppercase tracking-widest text-[10px] bg-slate-100">
                    รวมชิ้น
                  </td>
                  {jobs.map((j) => {
                    const totalA = staffData.reduce(
                      (sum, s) => sum + (s.performances[`${j.id}-A`] || 0),
                      0,
                    );
                    const totalB = staffData.reduce(
                      (sum, s) => sum + (s.performances[`${j.id}-B`] || 0),
                      0,
                    );
                    return (
                      <React.Fragment key={j.id}>
                        <td className="bg-white text-slate-500 font-bold">
                          {(totalA * PCS_PER_PACK).toLocaleString()}
                        </td>
                        <td className="bg-white text-orange-400 font-bold">
                          {(totalB * PCS_PER_PACK).toLocaleString()}
                        </td>
                      </React.Fragment>
                    );
                  })}
                  {/* ยอดรวมชิ้นสุทธิ (ล่างขวา) */}
                  <td className="bg-emerald-600 text-white text-base">
                    {(
                      staffData.reduce(
                        (sum, s) =>
                          sum +
                          Object.values(s.performances).reduce(
                            (a, b) => a + b,
                            0,
                          ),
                        0,
                      ) * PCS_PER_PACK
                    ).toLocaleString()}
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Action: Add Staff */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setShowAddStaffModal(true)}
            className="flex items-center space-x-3 px-12 py-4 bg-white border-2 border-slate-200 rounded-3xl text-slate-500 font-black text-xs hover:bg-[#004a99] hover:text-white hover:border-[#004a99] transition-all shadow-xl active:scale-95 uppercase tracking-widest"
          >
            <Users size={18} /> <span>เพิ่มรายชื่อพนักงานผู้แกะสินค้า</span>
          </button>
        </div>
      </main>

      {/* --- MODAL: เพิ่มพนักงานใหม่ --- */}
      {showAddStaffModal && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-[#001d3d] text-white">
              <div className="flex items-center space-x-3">
                <UserPlus size={22} />
                <h3 className="text-xl font-black uppercase tracking-tight italic">
                  Add New Staff
                </h3>
              </div>
              <button
                onClick={() => setShowAddStaffModal(false)}
                className="hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-10 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  ชื่อพนักงานผู้แกะสินค้า*
                </label>
                <input
                  autoFocus
                  type="text"
                  value={newStaffName}
                  onChange={(e) => setNewStaffName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && confirmAddStaff()}
                  placeholder="เช่น สมชาย, มานะ"
                  className="w-full p-5 bg-slate-50 border border-slate-200 rounded-2xl font-black text-slate-800 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-[#004a99] transition-all text-lg"
                />
              </div>

              <div className="bg-blue-50 p-5 rounded-3xl border border-blue-100 flex items-start space-x-3">
                <Users className="text-blue-600 mt-1 shrink-0" size={18} />
                <p className="text-[11px] font-bold text-blue-800 leading-relaxed uppercase tracking-tight">
                  รายชื่อพนักงานจะถูกเพิ่มเป็นแถวใหม่ในตารางสรุป
                  และคุณสามารถเริ่มกรอกจำนวนห่อได้ทันที
                </p>
              </div>

              <button
                onClick={confirmAddStaff}
                className="w-full py-5 bg-[#004a99] text-white font-black rounded-2xl shadow-xl active:scale-95 border-b-4 border-blue-900 uppercase tracking-[0.2em] text-xs transition-all hover:bg-blue-800"
              >
                ยืนยันเพิ่มพนักงาน
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal เพิ่ม Job (คงเดิมตาม Design หลัก) */}

      {showAddJobModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-[#004a99] text-white">
              <h3 className="text-xl font-black uppercase tracking-tight italic">
                New Unpack Job
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
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Job No.
                </label>

                <input
                  type="text"
                  value={newJob.jobNo}
                  onChange={(e) =>
                    setNewJob({ ...newJob, jobNo: e.target.value })
                  }
                  placeholder="Ex: 104/0868"
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold outline-none focus:ring-4 focus:ring-blue-500/10"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Product Detail
                </label>

                <input
                  type="text"
                  value={newJob.productCode}
                  onChange={(e) =>
                    setNewJob({ ...newJob, productCode: e.target.value })
                  }
                  placeholder="Ex: TB-0000PL17-00"
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold outline-none focus:ring-4 focus:ring-blue-500/10"
                />
              </div>

              <button
                onClick={addJob}
                className="w-full py-5 bg-[#004a99] text-white font-black rounded-2xl shadow-xl active:scale-95 border-b-4 border-blue-900 uppercase tracking-[0.2em] text-xs"
              >
                Confirm Add Job
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductUnpackMgmt;
