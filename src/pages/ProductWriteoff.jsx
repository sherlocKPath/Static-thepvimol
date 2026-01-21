import React, { useState, useMemo } from "react";
import {
  Search,
  Plus,
  Scissors,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Edit,
  Trash2,
  Clock,
  RotateCcw,
} from "lucide-react";

const ProductWriteoff = ({ setCurrentPage }) => {
  const [writeoffRecords] = useState([
    {
      id: "WRO-001",
      jobNo: "J104/0868",
      productCode: "PP-PL17 FB ถาด",
      machineCode: "MC 6, 6A",
      mfgDate: "2026-01-01",
      startTime: "19:00",
      endTime: "04:00",
      shift: "B",
      totalA: 1070,
      totalB: 0,
      createdBy: "ชลธิชา@thepvimol.com",
      updatedBy: "supervisor_01@thepvimol.com",
    },
    {
      id: "WRO-002",
      jobNo: "J105/0868",
      productCode: "PP-PL18 BK",
      machineCode: "MC 5",
      mfgDate: "2026-01-02",
      startTime: "07:00",
      endTime: "19:00",
      shift: "A",
      totalA: 500,
      totalB: 12,
      createdBy: "operator_02@thepvimol.com",
      updatedBy: "-",
    },
  ]);

  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [tempSearch, setTempSearch] = useState({
    jobNo: "",
    productCode: "",
    machineCode: "",
    startDate: "",
    endDate: "",
    shift: "",
    user: "",
  });
  const [searchParams, setSearchParams] = useState({ ...tempSearch });
  const [currentPageIndex, setPageIndex] = useState(1);
  const itemsPerPage = 7;

  const filteredRecords = useMemo(() => {
    return writeoffRecords.filter((rec) => {
      const matchJob = rec.jobNo
        .toLowerCase()
        .includes(searchParams.jobNo.toLowerCase());
      const matchProduct = rec.productCode
        .toLowerCase()
        .includes(searchParams.productCode.toLowerCase());
      const matchMachine = rec.machineCode
        .toLowerCase()
        .includes(searchParams.machineCode.toLowerCase());
      const matchShift =
        searchParams.shift === "" || rec.shift === searchParams.shift;
      const matchUser =
        rec.createdBy.toLowerCase().includes(searchParams.user.toLowerCase()) ||
        rec.updatedBy.toLowerCase().includes(searchParams.user.toLowerCase());
      const recDate = new Date(rec.mfgDate);
      const start = searchParams.startDate
        ? new Date(searchParams.startDate)
        : null;
      const end = searchParams.endDate ? new Date(searchParams.endDate) : null;
      let matchDate = true;
      if (start && recDate < start) matchDate = false;
      if (end && recDate > end) matchDate = false;
      return (
        matchJob &&
        matchProduct &&
        matchMachine &&
        matchShift &&
        matchUser &&
        matchDate
      );
    });
  }, [writeoffRecords, searchParams]);

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
      machineCode: "",
      startDate: "",
      endDate: "",
      shift: "",
      user: "",
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
            <div className="bg-indigo-600 p-2.5 rounded-2xl shadow-lg text-white">
              <Scissors size={26} />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-slate-700 uppercase tracking-tight">
                รายการบันทึกการตัดสินค้า
              </h1>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                Product Write-off Production List
              </p>
            </div>
          </div>
          <button
            onClick={() => setCurrentPage("writeoff_form")}
            className="flex items-center space-x-2 bg-[#004a99] hover:bg-[#003366] text-white px-6 py-3 rounded-2xl shadow-xl transition-all font-black text-sm active:scale-95 border-b-4 border-blue-900"
          >
            <Plus size={18} />
            <span>เพิ่มบันทึกการตัดสินค้า</span>
          </button>
        </div>

        {/* --- 2. Advance Search Bar --- */}
        <div className="bg-[#e9ecef] rounded-t-xl overflow-hidden mb-0 border-x border-t border-slate-200 shadow-sm">
          <div
            onClick={() => setIsSearchExpanded(!isSearchExpanded)}
            className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-slate-200/50 transition-colors"
          >
            <div className="flex items-center space-x-2 text-slate-600 font-bold">
              <Search size={18} className="text-[#004a99]" />
              <span className="text-sm">ค้นหารายการตัดสินค้า</span>
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
                <SearchInput
                  label="รหัสเครื่องจักร"
                  value={tempSearch.machineCode}
                  onChange={(e) =>
                    setTempSearch({
                      ...tempSearch,
                      machineCode: e.target.value,
                    })
                  }
                  placeholder="ระบุเครื่องจักร"
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
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                    วันที่ผลิต (ช่วงเวลา)
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="date"
                      value={tempSearch.startDate}
                      onChange={(e) =>
                        setTempSearch({
                          ...tempSearch,
                          startDate: e.target.value,
                        })
                      }
                      className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition text-sm"
                    />
                    <span className="text-slate-400 font-bold text-xs px-1">
                      ถึง
                    </span>
                    <input
                      type="date"
                      value={tempSearch.endDate}
                      onChange={(e) =>
                        setTempSearch({
                          ...tempSearch,
                          endDate: e.target.value,
                        })
                      }
                      className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition text-sm"
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <SearchInput
                    label="พนักงานที่บันทึก"
                    value={tempSearch.user}
                    onChange={(e) =>
                      setTempSearch({ ...tempSearch, user: e.target.value })
                    }
                    placeholder="ค้นหาชื่อพนักงาน"
                  />
                </div>
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
                    สินค้า / เครื่องจักร
                  </th>
                  <th className="px-4 py-3 text-xs font-bold text-slate-600 text-center uppercase tracking-wider w-32">
                    วันที่ผลิต
                  </th>
                  <th className="px-4 py-3 text-xs font-bold text-slate-600 text-center uppercase tracking-wider w-40">
                    เวลาดำเนินการ
                  </th>
                  <th className="px-4 py-3 text-xs font-bold text-slate-600 text-center uppercase tracking-wider w-24">
                    กะ
                  </th>
                  <th className="px-4 py-3 text-xs font-bold text-green-700 bg-green-50/50 uppercase tracking-wider text-center w-36">
                    ยอดรวม A
                  </th>
                  <th className="px-4 py-3 text-xs font-bold text-orange-700 bg-orange-50/50 uppercase tracking-wider text-center w-36">
                    ยอดรวม B
                  </th>
                  <th className="px-4 py-3 text-xs font-bold text-slate-600 uppercase tracking-wider">
                    ผู้บันทึก
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
                        <div className="text-[10px] text-indigo-500 font-black uppercase tracking-tighter">
                          {rec.machineCode}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center text-slate-600">
                        {rec.mfgDate}
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="inline-flex items-center space-x-1 px-2 py-1 bg-slate-100 rounded-lg font-black text-slate-600 text-[11px]">
                          <Clock size={12} className="text-indigo-600" />
                          <span>
                            {rec.startTime}-{rec.endTime} น.
                          </span>
                        </div>
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
                      <td className="px-4 py-4 text-center font-black text-green-700 text-lg bg-green-50/20">
                        {rec.totalA.toLocaleString()}
                      </td>
                      <td className="px-4 py-4 text-center font-black text-orange-700 text-lg bg-orange-50/20">
                        {rec.totalB.toLocaleString()}
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-[11px] font-bold text-slate-700">
                          {rec.createdBy.split("@")[0]}
                        </div>
                        <div className="text-[9px] text-slate-400 italic">
                          Upd: {rec.updatedBy.split("@")[0]}
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
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="9"
                      className="px-6 py-12 text-center text-slate-400 italic font-bold"
                    >
                      -- ไม่พบข้อมูลการตัดสินค้า --
                    </td>
                  </tr>
                )}
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
      type="text"
      className="w-full px-3 py-2 bg-white border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition text-sm"
    />
  </div>
);

export default ProductWriteoff;
