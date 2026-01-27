import React, { useState, useMemo } from "react";
import {
  Search,
  Plus,
  Settings,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Edit2,
  Trash2,
  Edit,
  X,
  Save,
} from "lucide-react";

const MasterMachines = () => {
  const [machines] = useState([
    {
      id: 1,
      code: "MC-VF-1",
      type: "Vacuum Forming",
      supportProduct: "PL17, PL18",
      capacity: "8,500 Frms/Day",
      status: "พร้อมใช้งาน",
    },
    {
      id: 2,
      code: "MC-VF-2",
      type: "Vacuum Forming",
      supportProduct: "PL18, BK10",
      capacity: "7,200 Frms/Day",
      status: "พร้อมใช้งาน",
    },
    {
      id: 3,
      code: "MC-VF-3",
      type: "Vacuum Forming",
      supportProduct: "PL20, AN40",
      capacity: "8,500 Frms/Day",
      status: "ซ่อมบำรุง",
    },
    {
      id: 4,
      code: "MC-CT-1",
      type: "Cutting Machine",
      supportProduct: "All Types",
      capacity: "15,000 Pcs/Day",
      status: "พร้อมใช้งาน",
    },
    {
      id: 5,
      code: "MC-VF-5",
      type: "Vacuum Forming",
      supportProduct: "Special Order",
      capacity: "5,000 Frms/Day",
      status: "ว่าง (Idle)",
    },
  ]);

  const [selectedMachine, setSelectedMachine] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // "add" หรือ "edit"
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [tempSearch, setTempSearch] = useState({ machineCode: "", type: "" });
  const [searchParams, setSearchParams] = useState({
    machineCode: "",
    type: "",
  });
  const [currentPageIndex, setPageIndex] = useState(1);
  const itemsPerPage = 7;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams(tempSearch);
    setPageIndex(1);
    setIsSearchExpanded(false);
  };

  const filteredMachines = useMemo(() => {
    return machines.filter((m) => {
      return (
        m.code.toLowerCase().includes(searchParams.machineCode.toLowerCase()) &&
        m.type.toLowerCase().includes(searchParams.type.toLowerCase())
      );
    });
  }, [machines, searchParams]);

  const totalItems = filteredMachines.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPageIndex * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMachines.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  // ฟังก์ชันสำหรับเปิด Modal แก้ไข
  const handleEdit = (machine) => {
    setModalMode("edit");
    setSelectedMachine(machine); // นำข้อมูลแถวที่กดมาเก็บไว้
    setShowModal(true);
  };

  // ฟังก์ชันสำหรับเปิด Modal เพิ่มใหม่
  const handleAdd = () => {
    setModalMode("add");
    setSelectedMachine({
      code: "",
      type: "",
      supportProduct: "",
      capacity: "",
      status: "พร้อมใช้งาน",
    });
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans">
      <main className="p-4 md:p-6 max-w-400 mx-auto">
        {/* 1. Header Area - Match Job Order Layout */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          <div className="flex items-center space-x-2">
            <Settings className="w-6 h-6 text-slate-500" />
            <h1 className="text-xl font-semibold text-slate-700">
              จัดการข้อมูลเครื่องจักร (Master Machines)
            </h1>
          </div>

          <button
            onClick={handleAdd}
            className="flex items-center space-x-2 bg-[#004a99] hover:bg-[#003366] text-white px-5 py-2.5 rounded-lg shadow-md transition-all font-medium text-sm active:scale-95 border-b-4 border-blue-900 uppercase tracking-wider"
          >
            <Plus className="w-4 h-4" />
            <span>เพิ่มข้อมูลเครื่องจักร</span>
          </button>
        </div>

        {/* 2. Expandable Search Bar - Match Job Order Design */}
        <div className="bg-[#e9ecef] rounded-t-xl overflow-hidden mb-0 border-x border-t border-slate-200 shadow-sm">
          <div
            onClick={() => setIsSearchExpanded(!isSearchExpanded)}
            className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-slate-200/50 transition-colors"
          >
            <div className="flex items-center space-x-2 text-slate-600">
              <Search className="w-4 h-4 text-[#004a99]" />
              <span className="text-sm font-bold tracking-tight">
                ค้นหาเครื่องจักร
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
              className="bg-white px-6 pb-6 pt-6 border-t border-slate-200 animate-in fade-in duration-300"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-tight">
                    Machine Code
                  </label>
                  <input
                    name="machineCode"
                    value={tempSearch.machineCode}
                    onChange={(e) =>
                      setTempSearch({
                        ...tempSearch,
                        machineCode: e.target.value,
                      })
                    }
                    type="text"
                    placeholder="ระบุรหัสเครื่องจักร"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition text-sm font-semibold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-tight">
                    Machine Type
                  </label>
                  <select
                    name="type"
                    value={tempSearch.type}
                    onChange={(e) =>
                      setTempSearch({ ...tempSearch, type: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded focus:border-blue-500 outline-none transition text-sm font-semibold cursor-pointer"
                  >
                    <option value="">ทั้งหมด</option>
                    <option value="Vacuum Forming">Vacuum Forming</option>
                    <option value="Cutting Machine">Cutting Machine</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end mt-6 space-x-2">
                <button
                  type="button"
                  onClick={() => setTempSearch({ machineCode: "", type: "" })}
                  className="px-6 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition text-sm font-bold active:scale-95"
                >
                  ล้างค่า
                </button>
                <button
                  type="submit"
                  className="flex items-center space-x-2 px-8 py-2 bg-[#004a99] text-white rounded-lg hover:bg-blue-800 transition shadow-md text-sm font-bold active:scale-95"
                >
                  <Search className="w-4 h-4" /> <span>ค้นหา</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* 3. Table Content - Exact Match to Job Order Size/Font */}
        <div className="bg-white rounded-b-xl shadow-md overflow-hidden border border-slate-200">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#f1f3f5] border-b border-slate-300 font-bold">
                <tr className="divide-x divide-slate-300">
                  <th className="px-4 py-3 text-xs text-slate-600 text-center uppercase tracking-wider w-20">
                    ลำดับ
                  </th>
                  <th className="px-4 py-3 text-xs text-slate-600 uppercase tracking-wider">
                    Machine Code
                  </th>
                  <th className="px-4 py-3 text-xs text-slate-600 uppercase tracking-wider">
                    ประเภท
                  </th>
                  <th className="px-4 py-3 text-xs text-slate-600 uppercase tracking-wider">
                    รหัสสินค้าที่รองรับ
                  </th>
                  <th className="px-4 py-3 text-xs text-slate-600 uppercase tracking-wider">
                    กำลังผลิต
                  </th>
                  <th className="px-4 py-3 text-xs text-slate-600 text-center uppercase tracking-wider w-32">
                    สถานะ
                  </th>
                  <th className="px-4 py-3 text-xs text-slate-600 text-center uppercase tracking-wider w-24">
                    Tool
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm">
                {currentItems.map((m) => (
                  <tr
                    key={m.id}
                    className="hover:bg-blue-50/30 transition-colors divide-x divide-slate-100"
                  >
                    <td className="px-4 py-4 text-center font-bold text-slate-400">
                      #{m.id}
                    </td>
                    <td className="px-4 py-4 font-bold text-blue-700">
                      {m.code}
                    </td>
                    <td className="px-4 py-4 font-semibold text-slate-700">
                      {m.type}
                    </td>
                    <td className="px-4 py-4 font-bold text-slate-800">
                      {m.supportProduct}
                    </td>
                    <td className="px-4 py-4 text-slate-600">{m.capacity}</td>
                    <td className="px-4 py-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter shadow-sm border ${
                          m.status === "พร้อมใช้งาน"
                            ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                            : "bg-red-100 text-red-600 border-red-200"
                        }`}
                      >
                        {m.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          title="แก้ไขข้อมูล"
                          onClick={() => handleEdit(m)}
                          className="p-2 bg-blue-50 hover:bg-blue-600 text-blue-500 hover:text-white rounded-lg transition-all border border-blue-200 shadow-sm active:scale-90"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          title="ลบข้อมูล"
                          className="p-2 bg-red-50 hover:bg-red-600 text-red-500 hover:text-white rounded-lg transition-all border border-red-200 shadow-sm active:scale-90"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 4. Pagination - Exact Match to Job Order */}
          {totalItems > 0 && (
            <div className="px-6 py-4 bg-[#f8f9fa] border-t border-slate-200 flex items-center justify-between font-bold">
              <div className="text-[11px] text-slate-500 uppercase tracking-widest">
                Showing {indexOfFirstItem + 1} -{" "}
                {Math.min(indexOfLastItem, totalItems)} of {totalItems} entries
              </div>
              <div className="flex items-center space-x-1">
                <button
                  disabled={currentPageIndex === 1}
                  onClick={() => setPageIndex((prev) => Math.max(prev - 1, 1))}
                  className="p-2 border border-slate-300 rounded bg-white hover:bg-slate-50 disabled:opacity-40 transition shadow-sm"
                >
                  <ChevronLeft className="w-4 h-4 text-slate-600" />
                </button>
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => setPageIndex(index + 1)}
                    className={`w-8 h-8 text-xs rounded transition-all ${
                      currentPageIndex === index + 1
                        ? "bg-[#004a99] text-white shadow-md"
                        : "text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  disabled={currentPageIndex === totalPages}
                  onClick={() =>
                    setPageIndex((prev) => Math.min(prev + 1, totalPages))
                  }
                  className="p-2 border border-slate-300 rounded bg-white hover:bg-slate-50 disabled:opacity-40 transition shadow-sm"
                >
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="bg-[#004a99] p-6 text-white flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <Settings className="bg-white/20 p-1.5 rounded-lg" />
                <h3 className="font-black uppercase tracking-tight">
                  {modalMode === "add"
                    ? "เพิ่มข้อมูลเครื่องจักรใหม่"
                    : "แก้ไขข้อมูลเครื่องจักร"}
                </h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Form Body */}
            <div className="p-8 space-y-5">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-1">
                  รหัสเครื่องจักร (Machine Code)
                </label>
                <input
                  type="text"
                  placeholder="ตัวอย่าง: MC-VF-01"
                  className="w-full p-3.5 border border-slate-200 rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                  /* 1. เชื่อมข้อมูลรหัสเครื่องจักร */
                  value={selectedMachine?.code || ""}
                  onChange={(e) =>
                    setSelectedMachine({
                      ...selectedMachine,
                      code: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-1">
                  ประเภทเครื่องจักร
                </label>
                <select
                  className="w-full p-3.5 border border-slate-200 rounded-2xl font-bold text-sm bg-white outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  /* 2. เชื่อมข้อมูลประเภทเครื่องจักร */
                  value={selectedMachine?.type || ""}
                  onChange={(e) =>
                    setSelectedMachine({
                      ...selectedMachine,
                      type: e.target.value,
                    })
                  }
                >
                  <option value="">เลือกประเภท...</option>
                  <option value="Vacuum Forming">
                    Vacuum Forming (เครื่องขึ้นรูป)
                  </option>
                  <option value="Cutting Machine">
                    Cutting Machine (เครื่องตัด)
                  </option>
                  <option value="Packaging">Packaging (เครื่องบรรจุ)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-1">
                  รหัสสินค้าที่รองรับ
                </label>
                <input
                  type="text"
                  placeholder="ระบุรหัสสินค้า (เช่น PL17, PL18)"
                  className="w-full p-3.5 border border-slate-200 rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  /* 3. เชื่อมข้อมูลรหัสสินค้า */
                  value={selectedMachine?.supportProduct || ""}
                  onChange={(e) =>
                    setSelectedMachine({
                      ...selectedMachine,
                      supportProduct: e.target.value,
                    })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-1">
                    กำลังผลิตสูงสุด / วัน
                  </label>
                  <input
                    type="text"
                    placeholder="0"
                    className="w-full p-3.5 border border-slate-200 rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    /* 4. เชื่อมข้อมูลกำลังผลิต */
                    value={selectedMachine?.capacity || ""}
                    onChange={(e) =>
                      setSelectedMachine({
                        ...selectedMachine,
                        capacity: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-1">
                    สถานะเริ่มต้น
                  </label>
                  <select
                    className="w-full p-3.5 border border-slate-200 rounded-2xl font-bold text-sm bg-white outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    /* 5. เชื่อมข้อมูลสถานะ */
                    value={selectedMachine?.status || "พร้อมใช้งาน"}
                    onChange={(e) =>
                      setSelectedMachine({
                        ...selectedMachine,
                        status: e.target.value,
                      })
                    }
                  >
                    <option value="พร้อมใช้งาน">พร้อมใช้งาน</option>
                    <option value="ซ่อมบำรุง">ซ่อมบำรุง</option>
                    <option value="ว่าง (Idle)">ว่าง (Idle)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-8 py-3 font-black text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors"
              >
                ยกเลิก
              </button>
              <button
                // onClick={handleSave} /* 6. เรียกใช้ฟังก์ชันบันทึก */
                className="px-10 py-3 bg-[#004a99] text-white font-black rounded-2xl shadow-xl shadow-blue-100 flex items-center space-x-2 active:scale-95 transition-all border-b-4 border-blue-900"
              >
                <Save size={18} /> <span>ยืนยันข้อมูล</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MasterMachines;
