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
  Clock,
  RotateCcw,
  CheckSquare,
  FileText,
} from "lucide-react";

const ProductUnpack = ({ setCurrentPage }) => {
  // 1. ข้อมูล Mock Up (อ้างอิงตัวเลขจากใบงานรูปที่ 7)
  const [unpackRecords] = useState([
    {
      id: "UPK-001",
      jobNo: "104/0868",
      productCode: "PP-PL17 FB / 35",
      type: "ถาด",
      mfgDate: "15-08-68",
      startTime: "19:00",
      endTime: "04:00",
      shift: "B",
      totalPacks: 1016, // ผลรวมห่อจากใบงาน
      totalUnits: 35560, // ผลรวมชิ้นจากใบงาน
      staffCount: 7, // จำนวนผู้แกะในใบงาน (โม, สำรวย, ชัย, ฯลฯ)
      dataBy: "ธุรการผลิต",
      verifiedBy: "หัวหน้าแผนกผลิต",
    },
    {
      id: "UPK-002",
      jobNo: "107/0868",
      productCode: "PET-H00P L17 / 35",
      type: "ฝา",
      mfgDate: "15-08-68",
      startTime: "19:00",
      endTime: "04:00",
      shift: "B",
      totalPacks: 480,
      totalUnits: 16800,
      staffCount: 4,
      dataBy: "ธุรการผลิต",
      verifiedBy: "หัวหน้าแผนกผลิต",
    },
  ]);

  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [tempSearch, setTempSearch] = useState({
    jobNo: "",
    productCode: "",
    shift: "",
    startDate: "",
    endDate: "",
  });
  const [searchParams, setSearchParams] = useState({ ...tempSearch });
  const [currentPageIndex, setPageIndex] = useState(1);
  const itemsPerPage = 7;

  const filteredRecords = useMemo(() => {
    return unpackRecords.filter((rec) => {
      const matchJob = rec.jobNo.includes(searchParams.jobNo);
      const matchProduct = rec.productCode
        .toLowerCase()
        .includes(searchParams.productCode.toLowerCase());
      const matchShift =
        searchParams.shift === "" || rec.shift === searchParams.shift;
      return matchJob && matchProduct && matchShift;
    });
  }, [unpackRecords, searchParams]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams(tempSearch);
    setPageIndex(1);
    setIsSearchExpanded(false);
  };

  const clearSearch = () => {
    const empty = {
      jobNo: "",
      productCode: "",
      shift: "",
      startDate: "",
      endDate: "",
    };
    setTempSearch(empty);
    setSearchParams(empty);
    setPageIndex(1);
  };

  const currentItems = filteredRecords.slice(
    (currentPageIndex - 1) * itemsPerPage,
    currentPageIndex * itemsPerPage
  );
  const totalItems = filteredRecords.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans">
      <main className="p-4 md:p-6 max-w-400 mx-auto animate-in fade-in duration-500">
        {/* --- 1. Header Section --- */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          <div className="flex items-center space-x-3">
            <div className="bg-emerald-600 p-2.5 rounded-2xl shadow-lg text-white">
              <CheckSquare size={26} />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-slate-700 uppercase tracking-tight">
                รายการสรุปการแกะสินค้า
              </h1>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                Product Unpack Summary Records
              </p>
            </div>
          </div>
          <button
            onClick={() => setCurrentPage("unpack_form")}
            className="flex items-center space-x-2 bg-[#004a99] hover:bg-[#003366] text-white px-6 py-3 rounded-2xl shadow-xl transition-all font-black text-sm active:scale-95 border-b-4 border-blue-900"
          >
            <Plus size={18} />
            <span>เพิ่มบันทึกการแกะสินค้า</span>
          </button>
        </div>

        {/* --- 2. Advance Search Bar --- */}
        <div className="bg-[#e9ecef] rounded-t-xl border-x border-t border-slate-200 shadow-sm">
          <div
            onClick={() => setIsSearchExpanded(!isSearchExpanded)}
            className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-slate-200/50 transition-colors"
          >
            <div className="flex items-center space-x-2 text-slate-600 font-bold">
              <Search size={18} className="text-[#004a99]" />
              <span className="text-sm">ค้นหาใบสรุปการแกะ</span>
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
                  label="Job Order No."
                  value={tempSearch.jobNo}
                  onChange={(e) =>
                    setTempSearch({ ...tempSearch, jobNo: e.target.value })
                  }
                  placeholder="เลขที่ Job"
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
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                    กะผลิต
                  </label>
                  <select
                    value={tempSearch.shift}
                    onChange={(e) =>
                      setTempSearch({ ...tempSearch, shift: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded focus:border-blue-500 outline-none transition text-sm"
                  >
                    <option value="">ทั้งหมด</option>
                    <option value="A">กะ A (เช้า)</option>
                    <option value="B">กะ B (ดึก)</option>
                  </select>
                </div>
                <SearchInput
                  label="วันที่ผลิต"
                  type="date"
                  value={tempSearch.startDate}
                  onChange={(e) =>
                    setTempSearch({ ...tempSearch, startDate: e.target.value })
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

        {/* --- 3. Table Content --- */}
        <div className="bg-white rounded-b-xl shadow-md overflow-hidden border border-slate-200">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-275">
              <thead>
                <tr className="bg-[#f1f3f5] border-b border-slate-300 divide-x divide-slate-300">
                  <th className="px-4 py-3 text-xs font-bold text-slate-600 text-center uppercase tracking-wider w-32">
                    Job No.
                  </th>
                  <th className="px-4 py-3 text-xs font-bold text-slate-600 uppercase tracking-wider">
                    รหัสสินค้า / ประเภท
                  </th>
                  <th className="px-4 py-3 text-xs font-bold text-slate-600 text-center uppercase tracking-wider w-32">
                    วันที่ผลิต
                  </th>
                  <th className="px-4 py-3 text-xs font-bold text-slate-600 text-center uppercase tracking-wider w-24">
                    กะ
                  </th>
                  <th className="px-4 py-3 text-xs font-bold text-blue-700 bg-blue-50/50 uppercase tracking-wider text-center w-36">
                    จำนวนห่อรวม
                  </th>
                  <th className="px-4 py-3 text-xs font-bold text-emerald-700 bg-emerald-50/50 uppercase tracking-wider text-center w-36">
                    จำนวนชิ้นรวม
                  </th>
                  <th className="px-4 py-3 text-xs font-bold text-slate-600 text-center uppercase tracking-wider w-28">
                    จำนวนผู้แกะ
                  </th>
                  <th className="px-4 py-3 text-xs font-bold text-slate-600 uppercase tracking-wider">
                    ผู้ตรวจสอบ
                  </th>
                  <th className="px-4 py-3 text-xs font-bold text-slate-600 text-center uppercase tracking-wider w-24">
                    Tool
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm font-medium">
                {currentItems.length > 0 ? (
                  currentItems.map((rec) => (
                    <tr
                      key={rec.id}
                      className="hover:bg-blue-50/30 transition-colors divide-x divide-slate-100"
                    >
                      <td className="px-4 py-4 font-bold text-blue-700 text-center">
                        {rec.jobNo}
                      </td>
                      <td className="px-4 py-4">
                        <div className="font-bold text-slate-800">
                          {rec.productCode}
                        </div>
                        <div className="text-[10px] text-slate-500 font-black uppercase tracking-tighter italic">
                          ประเภท: {rec.type}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center text-slate-600">
                        {rec.mfgDate}
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-bold border ${
                            rec.shift === "A"
                              ? "bg-orange-50 text-orange-600 border-orange-200"
                              : "bg-indigo-50 text-indigo-600 border-indigo-200"
                          }`}
                        >
                          กะ {rec.shift}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center font-black text-blue-700 text-lg bg-blue-50/20">
                        {rec.totalPacks.toLocaleString()}
                      </td>
                      <td className="px-4 py-4 text-center font-black text-emerald-700 text-lg bg-emerald-50/20">
                        {rec.totalUnits.toLocaleString()}
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="inline-flex items-center space-x-1 text-slate-600">
                          <Users size={14} />
                          <span className="font-bold">{rec.staffCount} คน</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-[11px] font-bold text-slate-700 italic">
                          Verify: {rec.verifiedBy}
                        </div>
                        <div className="text-[9px] text-slate-400">
                          Entry: {rec.dataBy}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-center space-x-2">
                          <button className="p-2 bg-slate-100 hover:bg-blue-600 text-slate-600 hover:text-white rounded-lg transition-all shadow-sm active:scale-90 border border-slate-200">
                            <Edit size={14} />
                          </button>
                          <button className="p-2 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white rounded-lg transition-all shadow-sm active:scale-90 border border-red-100">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="9"
                      className="px-6 py-12 text-center text-slate-400 italic font-bold"
                    >
                      -- ไม่พบข้อมูลการแกะสินค้า --
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* --- 4. Pagination --- */}
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
      </main>
    </div>
  );
};

const SearchInput = ({ label, ...props }) => (
  <div className="space-y-2">
    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
      {label}
    </label>
    <input
      {...props}
      type={props.type || "text"}
      className="w-full px-3 py-2 bg-white border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition text-sm"
    />
  </div>
);

export default ProductUnpack;
