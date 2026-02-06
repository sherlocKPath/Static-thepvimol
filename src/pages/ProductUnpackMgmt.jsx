import React, { useState } from "react";
import {
  Plus,
  Users,
  X,
  Save,
  ChevronLeft,
  LayoutDashboard,
  UserPlus,
  ChevronDown,
} from "lucide-react";

const ProductUnpackMgmt = ({ onBack }) => {
  // 1. Data Structure State
  const [jobs, setJobs] = useState([
    {
      id: 1,
      jobNo: "104/0868",
      productCode: "TB-0000PL17-00 ถาด",
      packSize: "กล่อง : 35",
      isFinished: false,
    },
    {
      id: 2,
      jobNo: "107/0868",
      productCode: "TB-0000PL17-01 ฝา",
      packSize: "ลัง : 35",
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
  const [newJob, setNewJob] = useState({
    jobNo: "",
    productCode: "",
    packSize: "",
  });

  const PCS_PER_PACK = newJob.packSize
    ? Number(newJob.packSize.split(":").pop())
    : 0;
  // ดึงค่าข้อความเต็มๆ เช่น "กล่อง : 35" หรือ "ลัง : 30" มาใช้งาน
  const PACK_SIZE_TEXT = newJob.packSize || "กล่อง : 35";

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
    if (!newJob.jobNo || !newJob.productCode || !newJob.packSize) return;

    // สกัดเอาตัวเลขจาก "กล่อง : 35"
    const packSizeNumber = Number(newJob.packSize.split(":").pop()) || 0;

    setJobs([
      ...jobs,
      {
        id: Date.now(),
        ...newJob,
        packSizeNumber: packSizeNumber, // ✅ เก็บตัวเลขไว้คำนวณ
        isFinished: false,
      },
    ]);

    setShowAddJobModal(false);
    setNewJob({ jobNo: "", productCode: "", packSize: "" });
  };

  const jobMapping = {
    "J104/0868": {
      productCode: "TB-0000PL17-00",
      packSize: "กล่อง : 35",
    },
    "J105/0868": {
      productCode: "TB-0000PL18-00",
      packSize: "ลัง : 30",
    },
    "J106/0868": {
      productCode: "TB-0000PL19-00",
      packSize: "กล่อง : 30",
    },
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
                บันทึกสรุปแกะสินค้าวันที่ : 15/08/2568 เวลา 07.00 - 19.00
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
            <button className="flex items-center space-x-2 bg-[#004a99] hover:bg-[#003366] text-white px-5 py-2.5 rounded-lg shadow-md transition-all font-medium text-sm active:scale-95 border-b-4 border-blue-900">
              <Save size={16} /> <span>บันทึกข้อมูล</span>
            </button>
          </div>
        </div>

        {/* --- Table Area --- */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden shadow-blue-900/5">
          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse table-fixed min-w-300">
              <thead>
                {/* Row 1: Job Number & Product Code */}
                <tr className="bg-[#f8fafc] text-slate-500 divide-x divide-slate-100 border-b border-slate-100">
                  <th
                    rowSpan="4"
                    className="w-40 py-6 text-[10px] font-black uppercase tracking-widest"
                  >
                    ชื่อ
                  </th>
                  {jobs.map((j) => (
                    <th
                      key={j.id}
                      colSpan="2"
                      className="py-3 px-4 bg-blue-50/30"
                    >
                      <div className="text-blue-700 font-black text-[11px]">
                        JOB: {j.jobNo}
                      </div>
                      <div className="text-[9px] text-slate-400 font-medium truncate">
                        {j.productCode}
                      </div>
                    </th>
                  ))}
                  <th
                    rowSpan="4"
                    className="w-40 bg-slate-50 text-blue-900 font-black text-[10px] uppercase"
                  >
                    รวมผลงานแต่ละคน
                  </th>
                  <th rowSpan="4" className="w-20 border-none bg-white">
                    <button
                      onClick={() => setShowAddJobModal(true)}
                      className="w-12 h-12 bg-white border-2 border-dashed border-slate-300 rounded-2xl flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-400 transition-all mx-auto active:scale-90"
                    >
                      <Plus size={20} />
                    </button>
                  </th>
                </tr>

                {/* Row 2: บรรจุ & แกะหมด (Checkbox) */}
                <tr className="bg-white divide-x divide-slate-100 border-b border-slate-100">
                  {jobs.map((j) => (
                    <th key={`${j.id}-info`} colSpan="2" className="py-2 px-2">
                      {/* ✅ ปรับตรงนี้: ดึง j.packSize จากข้อมูล Job นั้นๆ โดยตรง */}
                      <div className="text-[8px] bg-blue-50 text-blue-500 py-0.5 rounded-full border border-blue-100 italic font-bold mb-1">
                        {j.packSize || "ไม่ระบุ"}
                      </div>

                      {/* แกะหมด Checkbox */}
                      <label className="flex items-center justify-center space-x-1 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={j.isFinished}
                          onChange={() => toggleJobStatus(j.id)}
                          className="w-3 h-3 accent-red-600 cursor-pointer"
                        />
                        <span
                          className={`text-[9px] font-black ${
                            j.isFinished
                              ? "text-red-600"
                              : "text-slate-400 group-hover:text-slate-600"
                          }`}
                        >
                          แกะหมด
                        </span>
                      </label>
                    </th>
                  ))}
                </tr>

                {/* Row 3: Column A/B Labels */}
                <tr className="bg-slate-50/50 text-[9px] font-black text-slate-600 divide-x divide-slate-100 border-b border-slate-100">
                  {jobs.map((j) => (
                    <React.Fragment key={`${j.id}-label`}>
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
                              className={`p-1 ${j.isFinished ? "bg-slate-50/50" : ""}`}
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
                                className="w-full h-11 text-center font-bold text-slate-700 bg-transparent outline-none focus:bg-blue-50 rounded-xl disabled:cursor-not-allowed disabled:opacity-30 transition-all"
                                placeholder="-"
                              />
                            </td>
                            <td
                              className={`p-1 ${j.isFinished ? "bg-slate-50/50" : ""}`}
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
                                className="w-full h-11 text-center font-bold text-orange-600 bg-transparent outline-none focus:bg-orange-50 rounded-xl disabled:cursor-not-allowed disabled:opacity-30 transition-all"
                                placeholder="-"
                              />
                            </td>
                          </React.Fragment>
                        );
                      })}
                      <td className="font-black text-blue-900 text-base bg-blue-50/10 italic">
                        {rowTotalPacks.toLocaleString()}
                      </td>
                      <td className="bg-white"></td>
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

                {/* 2. แถวรวมชิ้น (สรุปราย Job) */}
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

                    // ✅ ใช้ j.packSizeNumber ของ Job นั้นๆ โดยตรง (ถ้าไม่มีให้ default เป็น 35)
                    const currentPackSize = j.packSizeNumber || 35;

                    return (
                      <React.Fragment key={j.id}>
                        <td className="bg-white text-slate-500 font-bold">
                          {(totalA * currentPackSize).toLocaleString()}
                        </td>
                        <td className="bg-white text-orange-400 font-bold">
                          {(totalB * currentPackSize).toLocaleString()}
                        </td>
                      </React.Fragment>
                    );
                  })}

                  {/* ยอดรวมชิ้นสุทธิ (ล่างขวา) */}
                  <td className="bg-emerald-600 text-white text-base">
                    {staffData
                      .reduce((grandTotal, staff) => {
                        let staffUnits = 0;
                        jobs.forEach((j) => {
                          const valA = staff.performances[`${j.id}-A`] || 0;
                          const valB = staff.performances[`${j.id}-B`] || 0;
                          staffUnits +=
                            (valA + valB) * (j.packSizeNumber || 35);
                        });
                        return grandTotal + staffUnits;
                      }, 0)
                      .toLocaleString()}
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
            className="flex items-center space-x-3 px-12 py-4 bg-white border-2 border-slate-200 rounded-3xl text-slate-500 font-black text-xs hover:bg-[#004a99] hover:text-white hover:border-[#004a99] transition-all shadow-xl active:scale-95"
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
                  เพิ่มพนักงานแกะสินค้า
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
                เพิ่มข้อมูลการแกะสินค้า
              </h3>

              <button
                onClick={() => setShowAddJobModal(false)}
                className="hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-10 space-y-6">
              {/* --- Job No. Select --- */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 tracking-widest ml-1 uppercase">
                  Job No.
                </label>
                <div className="relative group">
                  <select
                    value={newJob.jobNo}
                    onChange={(e) => {
                      const selectedJob = e.target.value;
                      const data = jobMapping[selectedJob] || {
                        productCode: "",
                        packSize: "",
                      };
                      setNewJob({
                        ...newJob,
                        jobNo: selectedJob,
                        productCode: data.productCode,
                        packSize: data.packSize, // เพิ่มการ Update Pack Size
                      });
                    }}
                    className="w-full p-4 pr-12 border border-slate-200 rounded-2xl font-bold outline-none 
                   bg-slate-50 appearance-none cursor-pointer transition-all
                   focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50"
                  >
                    <option value="">เลือก Job No.</option>
                    {Object.keys(jobMapping).map((job) => (
                      <option key={job} value={job}>
                        {job}
                      </option>
                    ))}
                  </select>
                  <div
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none 
                      group-focus-within:text-blue-500 transition-colors"
                  >
                    <ChevronDown size={18} strokeWidth={3} />
                  </div>
                </div>
              </div>

              {/* --- รหัสสินค้า (Read-only) --- */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  รหัสสินค้า
                </label>
                <input
                  type="text"
                  value={newJob.productCode}
                  readOnly
                  className="w-full p-4 bg-slate-100 border border-slate-200 rounded-2xl font-bold text-slate-500 cursor-not-allowed outline-none"
                />
              </div>

              {/* --- Pack Size (Read-only) --- */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Pack Size
                </label>
                <input
                  type="text"
                  value={newJob.packSize}
                  readOnly
                  placeholder="ระบบจะดึงข้อมูลตาม Job No."
                  className="w-full p-4 bg-slate-100 border border-slate-200 rounded-2xl font-bold text-slate-500 cursor-not-allowed outline-none"
                />
              </div>

              <button
                onClick={addJob}
                className="w-full py-5 bg-[#004a99] text-white font-black rounded-2xl shadow-xl active:scale-95 border-b-4 border-blue-900 uppercase tracking-[0.2em] text-xs"
              >
                บันทึกข้อมูล
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductUnpackMgmt;
