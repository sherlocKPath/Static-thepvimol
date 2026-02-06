import React, { useState, useMemo } from "react";
import {
  Search,
  Plus,
  Users,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Edit,
  Trash2,
  RotateCcw,
  CheckSquare,
  Package,
  Clock,
  X,
  Calendar,
} from "lucide-react";

const ProductUnpack = ({ setCurrentPage }) => {
  // ข้อมูลจำลอง (Mock up)
  const [unpackRecords] = useState([
    {
      id: "UPK-001",
      mfgDate: "15-08-2568",
      starttime: "7:00",
      endtime: "19:00",
      jobs: ["104/0868", "102/0868"],
      products: ["TB-0000PL17-00", "TB-0000PL17-01"],
      shift: "B",
      totalPacks: 1016,
      totalUnits: 35560,
      staffCount: 7,
      dataBy: "admin_staff",
      updatedBy: "supervisor_01",
    },
  ]);

  const [isTimeModalOpen, setIsTimeModalOpen] = useState(false);
  const [initialData, setInitialData] = useState({
    date: new Date().toISOString().split("T")[0], // ค่าเริ่มต้นเป็นวันนี้
    startTime: "08:00",
    endTime: "17:00",
  });

  const handleCreateRecord = () => {
    // ตรงนี้สามารถส่ง initialData ไปยังหน้าถัดไปผ่าน Context หรือ State Management ได้
    console.log("สร้างรายการใหม่ช่วงเวลา:", initialData);
    setIsTimeModalOpen(false);
    setCurrentPage("unpack_mgmt"); // ไปหน้าจัดการต่อ
  };

  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [tempSearch, setTempSearch] = useState({
    jobNo: "",
    productCode: "",
    shift: "",
    date: "",
  });
  const [searchParams, setSearchParams] = useState({ ...tempSearch });
  const [currentPageIndex, setPageIndex] = useState(1);
  const itemsPerPage = 8;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams(tempSearch);
    setPageIndex(1);
    setIsSearchExpanded(false);
  };

  const clearSearch = () => {
    const empty = { jobNo: "", productCode: "", shift: "", date: "" };
    setTempSearch(empty);
    setSearchParams(empty);
  };

  const filteredRecords = useMemo(() => {
    return unpackRecords.filter((rec) => {
      const matchJob =
        searchParams.jobNo === "" ||
        rec.jobs.some((j) => j.includes(searchParams.jobNo));
      const matchProduct =
        searchParams.productCode === "" ||
        rec.products.some((p) =>
          p.toLowerCase().includes(searchParams.productCode.toLowerCase()),
        );
      const matchShift =
        searchParams.shift === "" || rec.shift === searchParams.shift;
      const matchDate =
        searchParams.date === "" || rec.mfgDate === searchParams.date;
      return matchJob && matchProduct && matchShift && matchDate;
    });
  }, [unpackRecords, searchParams]);

  const currentItems = filteredRecords.slice(
    (currentPageIndex - 1) * itemsPerPage,
    currentPageIndex * itemsPerPage,
  );
  const totalItems = filteredRecords.length;
  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans">
      <main className="p-4 md:p-6 max-w-400 mx-auto animate-in fade-in duration-500">
        {/* --- 1. Header Section --- */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex items-center space-x-3">
            <div className="bg-[#004a99] p-2.5 rounded-2xl shadow-lg text-white">
              <CheckSquare size={26} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-700 uppercase tracking-tight">
                รายการบันทึกสรุปแกะสินค้า
              </h1>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                Product Unpack Records
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsTimeModalOpen(true)}
            className="flex items-center space-x-2 bg-[#004a99] hover:bg-[#003366] text-white px-5 py-2.5 rounded-lg shadow-md transition-all font-medium text-sm active:scale-95 border-b-4 border-blue-900 uppercase"
          >
            <Plus size={18} /> <span>เพิ่มบันทึกการแกะ</span>
          </button>
        </div>

        {/* --- 2. Advance Search Bar (ตามแบบ Molding) --- */}
        <div className="bg-[#e9ecef] rounded-t-xl overflow-hidden mb-0 border-x border-t border-slate-200 shadow-sm">
          <div
            onClick={() => setIsSearchExpanded(!isSearchExpanded)}
            className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-slate-200/50 transition-colors"
          >
            <div className="flex items-center space-x-2 text-slate-600 font-bold">
              <Search size={18} className="text-[#004a99]" />
              <span className="text-sm">ค้นหา</span>
            </div>
            {isSearchExpanded ? (
              <ChevronUp size={18} />
            ) : (
              <ChevronDown size={18} />
            )}
          </div>

          {isSearchExpanded && (
            <form
              onSubmit={handleSearchSubmit}
              className="bg-white px-6 pb-6 pt-6 border-t border-slate-200 animate-in fade-in slide-in-from-top-1"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <SearchInput
                  label="Job No."
                  value={tempSearch.jobNo}
                  onChange={(e) =>
                    setTempSearch({ ...tempSearch, jobNo: e.target.value })
                  }
                  placeholder="ระบุเลขที่ Job"
                />
                <SearchInput
                  label="รหัสสินค้า"
                  value={tempSearch.productCode}
                  onChange={(e) =>
                    setTempSearch({
                      ...tempSearch,
                      productCode: e.target.value,
                    })
                  }
                  placeholder="ระบุรหัสสินค้า"
                />
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-600 tracking-wider">
                    กะผลิต
                  </label>
                  <select
                    value={tempSearch.shift}
                    onChange={(e) =>
                      setTempSearch({ ...tempSearch, shift: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded focus:border-blue-500 outline-none transition text-sm font-semibold"
                  >
                    <option value="">ทั้งหมด</option>
                    <option value="A">กะ A (เช้า)</option>
                    <option value="B">กะ B (ดึก)</option>
                  </select>
                </div>
                <SearchInput
                  label="วันที่แกะสินค้า"
                  type="date"
                  value={tempSearch.date}
                  onChange={(e) =>
                    setTempSearch({ ...tempSearch, date: e.target.value })
                  }
                />
              </div>
              <div className="flex justify-end mt-6 space-x-2">
                <button
                  type="button"
                  onClick={clearSearch}
                  className="px-6 py-2 bg-slate-200 text-slate-700 rounded hover:bg-slate-300 transition text-sm font-bold flex items-center"
                >
                  <RotateCcw size={16} className="mr-1" /> ล้างค่า
                </button>
                <button
                  type="submit"
                  className="flex items-center space-x-2 px-8 py-2 bg-[#004a99] text-white rounded hover:bg-[#005580] transition shadow-sm text-sm font-bold"
                >
                  <Search size={16} className="mr-1" /> ค้นหา
                </button>
              </div>
            </form>
          )}
        </div>

        {/* --- 3. Table Content (ตามโครงสร้าง Molding) --- */}
        <div className="bg-white rounded-b-xl shadow-md overflow-hidden border border-slate-200">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-300">
              <thead>
                <tr className="bg-[#f1f3f5] border-b border-slate-300 divide-x divide-slate-300">
                  <th className="px-4 py-3 text-xs font-bold text-slate-600 text-center tracking-wider w-32">
                    วันที่แกะสินค้า
                  </th>
                  <th className="px-4 py-3 text-xs font-bold text-slate-600 text-center uppercase tracking-wider w-40">
                    เวลาแกะ
                  </th>
                  <th className="px-4 py-3 text-xs font-bold text-slate-600 tracking-wider">
                    Job No.
                  </th>
                  <th className="px-4 py-3 text-xs font-bold text-slate-600 uppercase tracking-wider">
                    รหัสสินค้า
                  </th>
                  <th className="px-4 py-3 text-xs font-bold text-blue-700 bg-blue-50/50 text-center tracking-wider w-32">
                    รวมห่อ
                  </th>
                  <th className="px-4 py-3 text-xs font-bold text-emerald-700 bg-emerald-50/50 text-center tracking-wider w-36">
                    รวมชิ้น
                  </th>
                  <th className="px-4 py-3 text-xs font-bold text-slate-600 uppercase tracking-wider w-44">
                    ผู้บันทึก
                  </th>
                  <th className="px-4 py-3 text-xs font-bold text-slate-600 text-center tracking-wider w-24">
                    Tool
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm font-medium">
                {currentItems.map((rec) => (
                  <tr
                    key={rec.id}
                    className="hover:bg-blue-50/30 transition-colors divide-x divide-slate-100"
                  >
                    <td className="px-4 py-4 text-center text-slate-700 font-bold">
                      {rec.mfgDate}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="inline-flex items-center space-x-1 px-2 py-1 bg-slate-100 rounded-lg font-black text-slate-600 text-[11px]">
                        <Clock size={12} className="text-indigo-600" />
                        <span>
                          {rec.starttime}-{rec.endtime} น.
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 font-bold text-blue-700">
                      <div className="flex flex-wrap gap-1">
                        {rec.jobs.map((job) => (
                          <span
                            key={job}
                            className="bg-blue-50 px-2 py-0.5 rounded border border-blue-100 text-[10px] uppercase"
                          >
                            JOB: {job}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-slate-800">
                      {rec.products.map((p) => (
                        <div key={p} className="flex items-center text-xs mb-1">
                          <Package
                            size={12}
                            className="mr-1.5 text-slate-400"
                          />
                          {p}
                        </div>
                      ))}
                    </td>
                    {/* <td className="px-4 py-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold border ${rec.shift === "A" ? "bg-orange-50 text-orange-600 border-orange-200" : "bg-indigo-50 text-indigo-600 border-indigo-200"}`}
                      >
                        กะ {rec.shift}
                      </span>
                    </td> */}
                    <td className="px-4 py-4 text-center font-black text-blue-700 text-base bg-blue-50/10">
                      {rec.totalPacks.toLocaleString()}
                    </td>
                    <td className="px-4 py-4 text-center font-black text-emerald-700 text-base bg-emerald-50/10">
                      {rec.totalUnits.toLocaleString()}
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-[11px] font-bold text-slate-700">
                        {rec.dataBy}
                      </div>
                      <div className="text-[9px] text-slate-400 italic">
                        Upd : {rec.updatedBy}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center space-x-2">
                        <button className="p-2 bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white rounded-lg transition-all shadow-sm active:scale-90 border border-blue-100">
                          <Edit size={14} />
                        </button>
                        <button className="p-2 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white rounded-lg transition-all shadow-sm active:scale-90 border border-red-100">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* --- 4. Pagination Section --- */}
          {totalItems > 0 && (
            <div className="px-6 py-4 bg-[#f8f9fa] border-t border-slate-200 flex items-center justify-between">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                Showing {(currentPageIndex - 1) * itemsPerPage + 1} -{" "}
                {Math.min(currentPageIndex * itemsPerPage, totalItems)} of{" "}
                {totalItems} entries
              </div>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => setPageIndex((p) => Math.max(1, p - 1))}
                  disabled={currentPageIndex === 1}
                  className="p-2 border border-slate-300 rounded bg-white hover:bg-slate-50 disabled:opacity-40 transition shadow-sm"
                >
                  <ChevronLeft className="w-4 h-4 text-slate-600" />
                </button>
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => setPageIndex(index + 1)}
                    className={`w-8 h-8 text-xs font-bold rounded transition-all ${
                      currentPageIndex === index + 1
                        ? "bg-[#004a99] text-white shadow-md ring-2 ring-blue-100"
                        : "text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() =>
                    setPageIndex((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPageIndex === totalPages}
                  className="p-2 border border-slate-300 rounded bg-white hover:bg-slate-50 disabled:opacity-40 transition shadow-sm"
                >
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* --- 5. Modal สำหรับเลือกวันที่และเวลา (เด้งขึ้นมาหลังกดปุ่มเพิ่ม) --- */}
        {isTimeModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-white animate-in zoom-in-95 duration-300">
              {/* Modal Header */}
              <div className="bg-[#004a99] p-6 text-white flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="bg-white/20 p-2 rounded-xl">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg tracking-tight">
                      วันที่แกะสินค้าและเวลาดำเนินการ
                    </h3>
                    <p className="text-[10px] text-blue-100 uppercase font-black tracking-widest">
                      Select Operation Time
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsTimeModalOpen(false)}
                  className="hover:bg-black/10 p-2 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-8 space-y-6">
                {/* เลือกวันที่ */}
                <div className="space-y-2">
                  <label className="flex items-center text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
                    <Calendar size={14} className="mr-2 text-[#004a99]" />{" "}
                    วันที่ดำเนินการ
                  </label>
                  <input
                    type="date"
                    value={initialData.date}
                    onChange={(e) =>
                      setInitialData({ ...initialData, date: e.target.value })
                    }
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-[#004a99] transition-all"
                  />
                </div>

                {/* เลือกเวลา (จาก - ถึง) */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">
                      เริ่มเวลา
                    </label>
                    <input
                      type="time"
                      value={initialData.startTime}
                      onChange={(e) =>
                        setInitialData({
                          ...initialData,
                          startTime: e.target.value,
                        })
                      }
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 outline-none focus:border-[#004a99] transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">
                      ถึงเวลา
                    </label>
                    <input
                      type="time"
                      value={initialData.endTime}
                      onChange={(e) =>
                        setInitialData({
                          ...initialData,
                          endTime: e.target.value,
                        })
                      }
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 outline-none focus:border-[#004a99] transition-all"
                    />
                  </div>
                </div>

                {/* ปุ่มสร้างรายการ */}
                <button
                  onClick={handleCreateRecord}
                  className="w-full py-4 bg-[#004a99] hover:bg-[#003366] text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-blue-900/20 transition-all active:scale-[0.98] border-b-4 border-blue-900 mt-4"
                >
                  สร้างรายการบันทึก
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

const SearchInput = ({ label, ...props }) => (
  <div className="space-y-2">
    <label className="text-xs font-bold text-slate-600 tracking-wider">
      {label}
    </label>
    <input
      {...props}
      className="w-full px-3 py-2 bg-white border border-slate-300 rounded focus:border-blue-500 outline-none transition text-sm font-semibold"
    />
  </div>
);

export default ProductUnpack;
