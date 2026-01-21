import React, { useState, useMemo } from "react";
import {
  Plus,
  Search,
  Layers,
  Trash2,
  Edit,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
} from "lucide-react";

const MaterialList = ({ requisitions = [], setCurrentPage, onEdit }) => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [expandedJobs, setExpandedJobs] = useState({});
  const [searchParams, setSearchParams] = useState({
    jobNo: "",
    matId: "",
    mfgDate: "",
  });
  const [tempSearch, setTempSearch] = useState({
    jobNo: "",
    matId: "",
    mfgDate: "",
  });
  const [currentPageIndex, setPageIndex] = useState(1);
  const itemsPerPage = 10;

  const toggleExpand = (jobId) => {
    setExpandedJobs((prev) => ({ ...prev, [jobId]: !prev[jobId] }));
  };

  const groupedData = useMemo(() => {
    const filtered = requisitions.filter((item) => {
      const matchJob = item.jobOrderId
        ?.toLowerCase()
        .includes(searchParams.jobNo.toLowerCase());
      const matchMat = item.materialId
        ?.toLowerCase()
        .includes(searchParams.matId.toLowerCase());
      const matchDate =
        searchParams.mfgDate === "" || item.mfgDate === searchParams.mfgDate;
      return matchJob && matchMat && matchDate;
    });

    const groups = filtered.reduce((acc, item) => {
      if (!acc[item.jobOrderId]) {
        acc[item.jobOrderId] = {
          jobOrderId: item.jobOrderId,
          productCode: item.productCode,
          totalQty: 0,
          status:
            item.jobOrderId === "J104/0868" ? "กำลังผลิต" : "เบิกวัตถุดิบ",
          items: [],
        };
      }
      acc[item.jobOrderId].totalQty += Number(item.qty);
      acc[item.jobOrderId].items.push(item);
      return acc;
    }, {});

    return Object.values(groups).sort((a, b) =>
      a.jobOrderId.localeCompare(b.jobOrderId),
    );
  }, [requisitions, searchParams]);

  const totalItems = groupedData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentGroups = groupedData.slice(
    (currentPageIndex - 1) * itemsPerPage,
    currentPageIndex * itemsPerPage,
  );

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams(tempSearch);
    setPageIndex(1);
    setIsSearchExpanded(false);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans">
      <main className="p-4 md:p-6 max-w-400 mx-auto animate-in fade-in duration-500">
        {/* 1. Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          <div className="flex items-center space-x-2">
            <ClipboardList className="w-6 h-6 text-slate-500" />
            <h1 className="text-xl font-semibold text-slate-700 uppercase tracking-tight">
              รายการเบิกวัตถุดิบ (Material List)
            </h1>
          </div>
          <button
            onClick={() => setCurrentPage("requisition")}
            className="flex items-center space-x-2 bg-[#004a99] hover:bg-[#003366] text-white px-5 py-2.5 rounded-lg shadow-md transition-all font-medium text-sm active:scale-95 border-b-4 border-blue-900 uppercase"
          >
            <Plus size={18} />
            <span>เพิ่มรายการเบิกวัตถุดิบ</span>
          </button>
        </div>

        {/* 2. Expandable Search Bar */}
        <div className="bg-[#e9ecef] rounded-t-xl overflow-hidden mb-0 border-x border-t border-slate-200 shadow-sm">
          <div
            onClick={() => setIsSearchExpanded(!isSearchExpanded)}
            className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-slate-200/50 transition-colors"
          >
            <div className="flex items-center space-x-2 text-slate-600 font-bold">
              <Search className="w-4 h-4" />
              <span className="text-sm font-bold">ค้นหาใบเบิก (Filter)</span>
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
              className="bg-white px-6 py-6 border-t border-slate-200 animate-in fade-in slide-in-from-top-1"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <SearchField
                  label="Job Order No."
                  name="jobNo"
                  value={tempSearch.jobNo}
                  onChange={(e) =>
                    setTempSearch({ ...tempSearch, jobNo: e.target.value })
                  }
                  placeholder="Jxxx/xxxx"
                />
                <SearchField
                  label="รหัสวัตถุดิบ"
                  name="matId"
                  value={tempSearch.matId}
                  onChange={(e) =>
                    setTempSearch({ ...tempSearch, matId: e.target.value })
                  }
                  placeholder="รหัสวัตถุดิบ"
                />
                <SearchField
                  label="วันที่ผลิตวัตถุดิบ"
                  name="mfgDate"
                  type="date"
                  value={tempSearch.mfgDate}
                  onChange={(e) =>
                    setTempSearch({ ...tempSearch, mfgDate: e.target.value })
                  }
                />
              </div>
              <div className="flex justify-end mt-6 space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setTempSearch({ jobNo: "", matId: "", mfgDate: "" });
                    setSearchParams({ jobNo: "", matId: "", mfgDate: "" });
                  }}
                  className="px-6 py-2 bg-slate-200 text-slate-700 rounded hover:bg-slate-300 transition text-sm font-bold flex items-center"
                >
                  <RotateCcw className="w-4 h-4 mr-1" /> ล้างค่า
                </button>
                <button
                  type="submit"
                  className="flex items-center space-x-2 px-6 py-2 bg-[#004a99] text-white rounded hover:bg-[#005580] transition shadow-sm text-sm font-bold uppercase"
                >
                  <Search className="w-4 h-4" /> <span>ค้นหา</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* 3. Table Content */}
        <div className="bg-white rounded-b-xl shadow-md overflow-hidden border border-slate-200">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#f1f3f5] border-b border-slate-300">
                <tr className="divide-x divide-slate-300">
                  <th className="px-4 py-3 w-12"></th>
                  <th className="px-4 py-3 text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Job No.
                  </th>
                  <th className="px-4 py-3 text-xs font-bold text-slate-600 text-center uppercase tracking-wider">
                    ผลิตสินค้า
                  </th>
                  <th className="px-4 py-3 text-xs font-bold text-slate-600 text-center uppercase tracking-wider w-32">
                    รายการเบิก
                  </th>
                  <th className="px-4 py-3 text-xs font-bold text-slate-600 text-center uppercase tracking-wider w-32">
                    เบิกรวม (ม้วน)
                  </th>
                  <th className="px-4 py-3 text-xs font-bold text-slate-600 text-center uppercase tracking-wider">
                    สถานะ
                  </th>
                  <th className="px-4 py-3 text-xs font-bold text-slate-600 text-center uppercase tracking-wider w-24">
                    Tool
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm">
                {currentGroups.map((group) => (
                  <React.Fragment key={group.jobOrderId}>
                    <tr
                      className={`hover:bg-blue-50/30 transition-colors divide-x divide-slate-100 ${expandedJobs[group.jobOrderId] ? "bg-blue-50/50" : ""}`}
                    >
                      <td className="px-4 py-4 text-center">
                        <button
                          onClick={() => toggleExpand(group.jobOrderId)}
                          className="p-1 hover:bg-white rounded-lg transition-all border border-transparent hover:border-slate-200 shadow-sm"
                        >
                          {expandedJobs[group.jobOrderId] ? (
                            <ChevronUp size={16} className="text-blue-600" />
                          ) : (
                            <ChevronDown size={16} className="text-slate-400" />
                          )}
                        </button>
                      </td>
                      <td className="px-4 py-4 font-bold text-blue-700">
                        {group.jobOrderId}
                      </td>
                      <td className="px-4 py-4 text-center font-bold text-slate-800 bg-slate-50/50">
                        {group.productCode}
                      </td>

                      {/* คอลัมน์จำนวนรายการเบิกที่เพิ่มกลับมา */}
                      <td className="px-4 py-4 text-center font-semibold text-slate-500 italic">
                        {group.items.length} รายการ
                      </td>

                      <td className="px-4 py-4 text-center">
                        <span className="px-3 py-1 bg-orange-50 text-orange-600 rounded-full font-bold border border-orange-100">
                          {group.totalQty}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter shadow-sm border ${
                            group.status === "เบิกวัตถุดิบ"
                              ? "bg-blue-100 text-blue-700 border-blue-200"
                              : "bg-amber-100 text-amber-700 border-amber-200"
                          }`}
                        >
                          {group.status}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-center space-x-2">
                          <button
                            onClick={() => onEdit(group.items[0])}
                            className="p-2 bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white rounded-lg transition-all shadow-sm active:scale-90 border border-blue-100"
                          >
                            <Edit size={16} />
                          </button>
                          {/* <button className="p-2 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white rounded-lg transition-all shadow-sm active:scale-90 border border-red-100">
                            <Trash2 size={16} />
                          </button> */}
                        </div>
                      </td>
                    </tr>
                    {expandedJobs[group.jobOrderId] && (
                      <tr>
                        <td colSpan="7" className="px-8 py-4 bg-slate-50/30">
                          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden animate-in slide-in-from-top-2 duration-300">
                            <table className="w-full text-left text-xs border-collapse">
                              <thead className="bg-[#001d3d] text-white">
                                <tr>
                                  <th className="px-6 py-2.5 text-center w-24 uppercase font-black">
                                    ลำดับที่
                                  </th>
                                  <th className="px-6 py-2.5 uppercase font-black">
                                    รหัสวัตถุดิบ
                                  </th>
                                  <th className="px-6 py-2.5 uppercase font-black">
                                    Lot No.
                                  </th>
                                  <th className="px-6 py-2.5 text-center uppercase font-black">
                                    วันที่ผลิตวัตถุดิบ
                                  </th>
                                  <th className="px-6 py-2.5 text-center uppercase font-black">
                                    จำนวน (ม้วน)
                                  </th>
                                  <th className="px-6 py-2.5 uppercase font-black">
                                    หมายเหตุ
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100 text-slate-600 font-medium italic">
                                {group.items.map((item, idx) => (
                                  <tr
                                    key={item.id}
                                    className="hover:bg-slate-50 transition-colors"
                                  >
                                    <td className="px-6 py-3 text-center text-slate-400 font-bold">
                                      {idx + 1}
                                    </td>
                                    <td className="px-6 py-3 font-bold text-slate-800">
                                      {item.materialId}
                                    </td>
                                    <td className="px-6 py-3">{item.lotNo}</td>
                                    <td className="px-6 py-3 text-center">
                                      {item.mfgDate}
                                    </td>
                                    <td className="px-6 py-3 text-center font-black text-orange-600">
                                      {item.qty}
                                    </td>
                                    <td className="px-6 py-3 truncate max-w-50">
                                      {item.remark || "-"}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {/* 4. Pagination Section */}
          {totalItems > 0 && (
            <div className="px-6 py-4 bg-[#f8f9fa] border-t border-slate-200 flex items-center justify-between">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                Showing {totalItems} Job Groups
              </div>
              <div className="flex items-center space-x-1">
                <PageActionBtn
                  onClick={() => setPageIndex((p) => Math.max(p - 1, 1))}
                  disabled={currentPageIndex === 1}
                  icon={<ChevronLeft size={16} />}
                />
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPageIndex(i + 1)}
                    className={`w-8 h-8 text-xs font-bold rounded transition-all ${currentPageIndex === i + 1 ? "bg-[#004a99] text-white shadow-md" : "text-slate-600 hover:bg-slate-200"}`}
                  >
                    {i + 1}
                  </button>
                ))}
                <PageActionBtn
                  onClick={() =>
                    setPageIndex((p) => Math.min(p + 1, totalPages))
                  }
                  disabled={currentPageIndex === totalPages}
                  icon={<ChevronRight size={16} />}
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

// --- Helpers ---
const SearchField = ({ label, ...props }) => (
  <div className="space-y-1">
    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
      {label}
    </label>
    <input
      className="w-full px-3 py-2 bg-white border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition text-sm font-semibold"
      {...props}
    />
  </div>
);

const PageActionBtn = ({ icon, ...props }) => (
  <button
    className="p-2 border border-slate-300 rounded bg-white hover:bg-slate-50 disabled:opacity-40 transition shadow-sm active:scale-95"
    {...props}
  >
    {icon}
  </button>
);

export default MaterialList;
