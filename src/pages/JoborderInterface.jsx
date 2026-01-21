import React, { useState, useMemo } from "react";
import {
  Search,
  Plus,
  Package,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  RefreshCw,
} from "lucide-react";

const JobOrderInterface = ({ setCurrentPage }) => {
  const [jobs] = useState([
    {
      id: "J104/0868",
      product: "TB-0000PL17-00",
      code: "PL17",
      qty: 50000,
      date: "14-08-2568",
      status: "กำลังผลิต",
    },
    {
      id: "J105/0868",
      product: "TB-0000PL18-00",
      code: "PL18",
      qty: 25000,
      date: "15-08-2568",
      status: "รอเบิกวัตถุดิบ",
    },
    {
      id: "J106/0868",
      product: "TB-0000PL19-00",
      code: "PL19",
      qty: 100000,
      date: "16-08-2568",
      status: "กำลังผลิต",
    },
    {
      id: "J107/0868",
      product: "TB-0000PL20-00",
      code: "PL20",
      qty: 30000,
      date: "17-08-2568",
      status: "เบิกวัตถุดิบ",
    },
    {
      id: "J108/0868",
      product: "TB-0000PL21-00",
      code: "PL21",
      qty: 15000,
      date: "18-08-2568",
      status: "รอเบิกวัตถุดิบ",
    },
    {
      id: "J109/0868",
      product: "TB-0000PL22-00",
      code: "PL22",
      qty: 45000,
      date: "19-08-2568",
      status: "กำลังผลิต",
    },
    {
      id: "J110/0868",
      product: "TB-0000PL23-00",
      code: "PL23",
      qty: 80000,
      date: "20-08-2568",
      status: "กำลังผลิต",
    },
    {
      id: "J111/0868",
      product: "TB-0000PL24-00",
      code: "PL24",
      qty: 200000,
      date: "21-08-2568",
      status: "รอเบิกวัตถุดิบ",
    },
    {
      id: "J112/0868",
      product: "TB-0000PL25-00",
      code: "PL25",
      qty: 300000,
      date: "22-08-2568",
      status: "เบิกวัตถุดิบ",
    },
    {
      id: "J113/0868",
      product: "TB-0000PL26-00",
      code: "PL26",
      qty: 12000,
      date: "23-08-2568",
      status: "กำลังผลิต",
    },
    {
      id: "J114/0868",
      product: "TB-0000PL27-00",
      code: "PL27",
      qty: 5000,
      date: "24-08-2568",
      status: "รอเบิกวัตถุดิบ",
    },
    {
      id: "J115/0868",
      product: "TB-0000PL28-00",
      code: "PL28",
      qty: 40000,
      date: "25-08-2568",
      status: "กำลังผลิต",
    },
  ]);

  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [tempSearch, setTempSearch] = useState({
    jobNo: "",
    productCode: "",
    orderDate: "",
  });
  const [searchParams, setSearchParams] = useState({
    jobNo: "",
    productCode: "",
    orderDate: "",
  });
  const [currentPageIndex, setPageIndex] = useState(1);
  const itemsPerPage = 7;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams(tempSearch);
    setPageIndex(1);
    setIsSearchExpanded(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempSearch((prev) => ({ ...prev, [name]: value }));
  };

  const clearSearch = () => {
    const empty = { jobNo: "", productCode: "", orderDate: "" };
    setTempSearch(empty);
    setSearchParams(empty);
    setPageIndex(1);
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchJob = job.id
        .toLowerCase()
        .includes(searchParams.jobNo.toLowerCase());
      const matchProduct = job.product
        .toLowerCase()
        .includes(searchParams.productCode.toLowerCase());
      const matchDate =
        searchParams.orderDate === "" || job.date === searchParams.orderDate;
      return matchJob && matchProduct && matchDate;
    });
  }, [jobs, searchParams]);

  const totalItems = filteredJobs.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPageIndex * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstItem, indexOfLastItem);

  // ฟังก์ชันสำหรับจัดการเมื่อกดปุ่มดูรายละเอียด
  // const handleViewDetail = (job) => {
  //   setSelectedJob(job); // เก็บข้อมูล Job ที่คลิกลงใน State หลัก
  //   setCurrentPage("jobDetail"); // เปลี่ยนหน้าไปยังรายละเอียด
  // };

  const [isRefreshing, setIsRefreshing] = useState(false);

  // ฟังก์ชัน Refresh ข้อมูล
  const handleRefresh = () => {
    setIsRefreshing(true);

    // จำลองการดึงข้อมูลจาก Database (API Call)
    // ในอนาคตคุณสามารถใส่ fetch ข้อมูลใหม่ตรงนี้ได้
    setTimeout(() => {
      // ตัวอย่าง: ถ้ามี API ก็สั่ง setJobs(newData) ตรงนี้
      setPageIndex(1); // รีเซ็ตไปหน้าแรก
      setIsRefreshing(false);
      console.log("Data Refreshed!");
    }, 800); // หมุนค้างไว้ 0.8 วินาทีเพื่อให้ User รู้สึกว่าระบบทำงาน
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans">
      <main className="p-4 md:p-6 max-w-400 mx-auto">
        {/* 1. Header with Title and Action Button */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          <div className="flex items-center space-x-2">
            <Package className="w-6 h-6 text-slate-500" />
            <h1 className="text-xl font-semibold text-slate-700">
              รายการสั่งผลิต (Job Order)
            </h1>
          </div>

          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center space-x-2 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 px-5 py-2 rounded-lg shadow-sm transition-all font-bold text-sm active:scale-95 disabled:opacity-50"
          >
            {/* ใส่ animate-spin เมื่อกดปุ่ม */}
            <RefreshCw
              className={`w-4 h-4 ${isRefreshing ? "animate-spin text-blue-600" : ""}`}
            />
            <span>{isRefreshing ? "กำลังโหลด..." : "รีเฟรชข้อมูล"}</span>
          </button>
        </div>

        {/* 2. Expandable Search Bar */}
        <div className="bg-[#e9ecef] rounded-t-xl overflow-hidden mb-0 border-x border-t border-slate-200 shadow-sm">
          <div
            onClick={() => setIsSearchExpanded(!isSearchExpanded)}
            className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-slate-200/50 transition-colors"
          >
            <div className="flex items-center space-x-2 text-slate-600">
              <Search className="w-4 h-4" />
              <span className="text-sm font-bold">ค้นหา</span>
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
              className="bg-white px-6 pb-6 pt-6 border-t border-slate-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-600 uppercase">
                    Job No.
                  </label>
                  <input
                    name="jobNo"
                    value={tempSearch.jobNo}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="ระบุเลขที่ Job"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-600 uppercase">
                    รหัสสินค้า / รายละเอียด
                  </label>
                  <input
                    name="productCode"
                    value={tempSearch.productCode}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="ระบุรหัสหรือชื่อสินค้า"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-600 uppercase">
                    วันที่สั่งผลิต
                  </label>
                  <input
                    name="orderDate"
                    value={tempSearch.orderDate}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="วว-ดด-ปปปป"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition text-sm"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-6 space-x-2">
                <button
                  type="button"
                  onClick={clearSearch}
                  className="px-6 py-2 bg-slate-200 text-slate-700 rounded hover:bg-slate-300 transition text-sm font-bold"
                >
                  ล้างค่า
                </button>
                <button
                  type="submit"
                  className="flex items-center space-x-2 px-6 py-2 bg-[#004a99] text-white rounded hover:bg-[#005580] transition shadow-sm text-sm font-bold"
                >
                  <Search className="w-4 h-4" />
                  <span>ค้นหา</span>
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
                  <th className="px-4 py-3 text-xs font-bold text-slate-600 text-center uppercase tracking-wider w-32">
                    Job NO.
                  </th>
                  <th className="px-4 py-3 text-xs font-bold text-slate-600 uppercase tracking-wider">
                    รายละเอียดสินค้า
                  </th>
                  <th className="px-4 py-3 text-xs font-bold text-slate-600 uppercase tracking-wider w-40">
                    จำนวนสั่งผลิต
                  </th>
                  <th className="px-4 py-3 text-xs font-bold text-slate-600 uppercase tracking-wider w-40">
                    วันที่สั่งผลิต
                  </th>
                  <th className="px-4 py-3 text-xs font-bold text-slate-600 text-center uppercase tracking-wider w-32">
                    สถานะ
                  </th>
                  <th className="px-4 py-3 text-xs font-bold text-slate-600 text-center uppercase tracking-wider w-20">
                    Tool
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm">
                {currentJobs.length > 0 ? (
                  currentJobs.map((job) => (
                    <tr
                      key={job.id}
                      className="hover:bg-blue-50/30 transition-colors divide-x divide-slate-100"
                    >
                      <td className="px-4 py-4 font-bold text-blue-700 text-center">
                        {job.id}
                      </td>
                      <td className="px-4 py-4">
                        <div className="font-bold text-slate-800">
                          {job.product}
                        </div>
                        <div className="text-[11px] text-slate-500 font-medium italic">
                          รหัสย่อ : {job.code}
                        </div>
                      </td>
                      <td className="px-4 py-4 font-semibold text-slate-700">
                        {job.qty.toLocaleString()} ชิ้น
                      </td>
                      <td className="px-4 py-4 text-slate-600">{job.date}</td>
                      <td className="px-4 py-4 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter shadow-sm
            ${
              job.status === "เบิกวัตถุดิบ"
                ? "bg-blue-100 text-blue-700 border border-blue-200"
                : job.status === "รอเบิกวัตถุดิบ"
                  ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                  : "bg-amber-100 text-amber-700 border border-amber-200"
            }`}
                        >
                          {job.status}
                        </span>
                      </td>

                      {/* ส่วน Tool ที่ปรับปรุงใหม่ */}
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-center space-x-2">
                          {/* ปุ่มดูรายละเอียด - แสดงในทุกสถานะ */}
                          <button
                            onClick={() => {
                              setCurrentPage("jobDetail");
                            }}
                            title="ดูรายละเอียด Job"
                            className="group flex items-center justify-center p-2 bg-slate-100 hover:bg-blue-600 text-slate-600 hover:text-white rounded-lg transition-all duration-200 shadow-sm active:scale-90 border border-slate-200 hover:border-blue-600"
                          >
                            <Search className="w-4 h-4" />
                          </button>

                          {/* ปุ่มเพิ่มใบเบิก - แสดงเฉพาะสถานะ "รอเบิกวัตถุดิบ" หรือ "เบิกวัตถุดิบ" */}
                          {(job.status === "รอเบิกวัตถุดิบ" ||
                            job.status === "เบิกวัตถุดิบ") && (
                            <button
                              onClick={() => setCurrentPage("requisition")}
                              title="สร้างใบเบิกวัตถุดิบ"
                              className="group flex items-center justify-center p-2 bg-emerald-50 hover:bg-emerald-600 text-emerald-600 hover:text-white rounded-lg transition-all duration-200 shadow-sm active:scale-90 border border-emerald-200 hover:border-emerald-600"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-12 text-center text-slate-400 italic"
                    >
                      ไม่พบข้อมูลที่ค้นหา...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* 4. Pagination */}
          {totalItems > 0 && (
            <div className="px-6 py-4 bg-[#f8f9fa] border-t border-slate-200 flex items-center justify-between">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                Showing {indexOfFirstItem + 1} -{" "}
                {Math.min(indexOfLastItem, totalItems)} of {totalItems} entries
              </div>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => setPageIndex((prev) => Math.max(prev - 1, 1))}
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
                        ? "bg-[#004a99] text-white shadow-md"
                        : "text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() =>
                    setPageIndex((prev) => Math.min(prev + 1, totalPages))
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

export default JobOrderInterface;
