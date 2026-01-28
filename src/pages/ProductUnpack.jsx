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
  Calendar,
  Package,
  Hash,
} from "lucide-react";

const ProductUnpack = ({ setCurrentPage }) => {
  // ปรับ Mock Up ให้รองรับหลาย Job และหลายรหัสสินค้าในบันทึกเดียว
  const [unpackRecords] = useState([
    {
      id: "UPK-680815-001",
      mfgDate: "15-08-68",
      jobs: ["104/0868", "102/0868"], // เก็บเป็น Array เพราะมีได้หลายอัน
      products: ["TB-0000PL17-00", "TB-0000PL17-01", "ABC-999"], // รหัสสินค้าทั้งหมดในใบนี้
      shift: "B",
      totalPacks: 1016,
      totalUnits: 35560,
      staffCount: 2,
      dataBy: "Admin Staff",
    },
  ]);

  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  // Search States แบบละเอียด
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
  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans">
      <main className="p-4 md:p-6 max-w-400 mx-auto animate-in fade-in duration-500">
        {/* 1. Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex items-center space-x-3">
            <div className="bg-[#004a99] p-2.5 rounded-2xl shadow-lg text-white">
              <CheckSquare size={26} />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-slate-700 uppercase tracking-tight font-sans">
                รายการสรุปการแกะสินค้า
              </h1>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest font-sans">
                Unpack Summary (Multi-Job Support)
              </p>
            </div>
          </div>
          <button
            onClick={() => setCurrentPage("unpack_mgmt")}
            className="flex items-center space-x-2 bg-[#004a99] hover:bg-[#003366] text-white px-6 py-2.5 rounded-xl shadow-md transition-all font-black text-xs active:scale-95 border-b-4 border-blue-900 uppercase"
          >
            <Plus size={18} /> <span>เพิ่มบันทึกใหม่</span>
          </button>
        </div>

        {/* 2. Expandable Search Section */}
        <div className="bg-[#e9ecef] rounded-t-xl overflow-hidden mb-0 border-x border-t border-slate-200 shadow-sm">
          <div
            onClick={() => setIsSearchExpanded(!isSearchExpanded)}
            className="px-6 py-4 flex items-center justify-between cursor-pointer hover:bg-slate-200/50 transition-colors"
          >
            <div className="flex items-center space-x-2 text-slate-600 font-bold">
              <Search className="w-4 h-4 text-[#004a99]" />{" "}
              <span className="text-xs tracking-tight uppercase font-sans">
                Search Summary Filters
              </span>
            </div>
            {isSearchExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </div>

          {isSearchExpanded && (
            <form
              onSubmit={handleSearchSubmit}
              className="bg-white px-8 pb-8 pt-6 border-t border-slate-200 animate-in slide-in-from-top-2"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <SearchField
                  label="Job Order No."
                  value={tempSearch.jobNo}
                  onChange={(e) =>
                    setTempSearch({ ...tempSearch, jobNo: e.target.value })
                  }
                  placeholder="ระบุเลขที่ Job"
                />
                <SearchField
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
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1 font-sans">
                    กะการทำงาน
                  </label>
                  <select
                    value={tempSearch.shift}
                    onChange={(e) =>
                      setTempSearch({ ...tempSearch, shift: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm outline-none focus:ring-4 focus:ring-blue-500/10"
                  >
                    <option value="">ทั้งหมด</option>
                    <option value="A">กะ A (กลางวัน)</option>
                    <option value="B">กะ B (กลางคืน)</option>
                  </select>
                </div>
                <SearchField
                  label="วันที่ผลิต"
                  type="date"
                  value={tempSearch.date}
                  onChange={(e) =>
                    setTempSearch({ ...tempSearch, date: e.target.value })
                  }
                />
              </div>
              <div className="flex justify-end mt-6 space-x-3">
                <button
                  type="button"
                  onClick={clearSearch}
                  className="px-6 py-2.5 text-slate-400 hover:text-slate-600 font-black text-[11px] uppercase tracking-widest transition-all"
                >
                  ล้างค่า
                </button>
                <button
                  type="submit"
                  className="flex items-center space-x-2 px-10 py-2.5 bg-[#004a99] text-white rounded-xl shadow-lg hover:bg-blue-800 text-[11px] font-black uppercase tracking-widest transition-all active:scale-95 border-b-4 border-blue-900"
                >
                  <Search size={14} /> <span>ค้นหาข้อมูล</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* 3. Main Table Content */}
        <div className="bg-white rounded-b-xl shadow-2xl overflow-hidden border border-slate-200">
          <div className="overflow-x-auto font-sans">
            <table className="w-full text-left border-collapse min-w-300">
              <thead className="bg-[#f1f3f5] border-b border-slate-300 font-bold">
                <tr className="divide-x divide-slate-300 text-[11px] uppercase text-slate-500">
                  <th className="px-4 py-4 text-center w-16">No.</th>
                  <th className="px-6 py-4 w-40">วันที่ผลิต</th>
                  <th className="px-6 py-4 w-48">Job No. ที่เกี่ยวข้อง</th>
                  <th className="px-6 py-4">รายละเอียดสินค้า</th>
                  <th className="px-4 py-4 text-center w-24">กะ</th>
                  <th className="px-4 py-4 text-center w-36 bg-blue-50/50 text-blue-700">
                    ห่อรวม
                  </th>
                  <th className="px-4 py-4 text-center w-40 bg-emerald-50/50 text-emerald-700">
                    ชิ้นรวม
                  </th>
                  <th className="px-4 py-4 text-center w-24">Tool</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm">
                {currentItems.map((rec, index) => (
                  <tr
                    key={rec.id}
                    className="hover:bg-blue-50/30 transition-colors divide-x divide-slate-100 font-semibold text-slate-700"
                  >
                    <td className="px-4 py-4 text-center font-black text-slate-400">
                      {(currentPageIndex - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="px-6 py-4 font-black text-slate-900">
                      {rec.mfgDate}
                    </td>
                    <td className="px-6 py-4">
                      {/* แสดง Job No หลายรายการ */}
                      <div className="flex flex-wrap gap-1">
                        {rec.jobs.map((job) => (
                          <span
                            key={job}
                            className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded border border-blue-100 text-[10px] font-black uppercase tracking-tighter"
                          >
                            JOB: {job}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {/* แสดง Product หลายรายการ */}
                      <div className="space-y-1">
                        {rec.products.map((p) => (
                          <div
                            key={p}
                            className="text-[11px] font-bold text-slate-600 flex items-center"
                          >
                            <Package
                              size={10}
                              className="mr-1 text-slate-400"
                            />{" "}
                            {p}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-black border ${rec.shift === "A" ? "bg-orange-50 text-orange-600 border-orange-100" : "bg-indigo-50 text-indigo-600 border-indigo-100"}`}
                      >
                        กะ {rec.shift}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center font-black text-blue-700 text-base bg-blue-50/10">
                      {rec.totalPacks.toLocaleString()}
                    </td>
                    <td className="px-4 py-4 text-center font-black text-emerald-700 text-base bg-emerald-50/10">
                      {rec.totalUnits.toLocaleString()}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex justify-center space-x-1.5">
                        <button className="p-2 bg-white hover:bg-blue-600 text-slate-400 hover:text-white rounded-lg transition-all border border-slate-200 shadow-sm active:scale-90">
                          <Edit size={14} />
                        </button>
                        <button className="p-2 bg-white hover:bg-red-600 text-slate-400 hover:text-white rounded-lg transition-all border border-slate-200 shadow-sm active:scale-90">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 4. Pagination */}
          <div className="px-8 py-5 bg-[#f8f9fa] border-t border-slate-200 flex items-center justify-between font-bold text-slate-500">
            <div className="text-[11px] uppercase tracking-widest font-sans">
              Showing {filteredRecords.length} Summary Entry
            </div>
            <div className="flex items-center space-x-1">
              <button
                disabled={currentPageIndex === 1}
                onClick={() => setPageIndex((p) => p - 1)}
                className="p-2 border border-slate-300 rounded-xl bg-white hover:bg-slate-50 disabled:opacity-40 shadow-sm"
              >
                <ChevronLeft size={16} />
              </button>
              <button className="w-10 h-10 flex items-center justify-center text-xs rounded-xl bg-[#004a99] text-white shadow-lg ring-4 ring-blue-50">
                {currentPageIndex}
              </button>
              <button
                disabled={currentPageIndex === totalPages}
                onClick={() => setPageIndex((p) => p + 1)}
                className="p-2 border border-slate-300 rounded-xl bg-white hover:bg-slate-50 shadow-sm"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Reusable Search Field
const SearchField = ({ label, ...props }) => (
  <div className="space-y-2 group">
    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1 font-sans transition-colors group-focus-within:text-[#004a99]">
      {label}
    </label>
    <div className="relative">
      <input
        {...props}
        className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm text-slate-600 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-[#004a99] transition-all font-sans"
      />
    </div>
  </div>
);

export default ProductUnpack;
