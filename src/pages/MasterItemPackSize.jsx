import React, { useState, useMemo } from "react";
import {
  Search,
  Plus,
  Package,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Edit2,
  Trash2,
  X,
  Save,
  Box,
  Edit,
} from "lucide-react";

const MasterItemPackSize = () => {
  const [items] = useState([
    {
      id: 1,
      productCode: "PP-PL17 FB",
      packsizeName: "กล่อง",
      pcsPerFrame: 8,
      pcsPerPack: 50,
      packsPerBox: 20,
      totalPerBox: 1000,
      stdWeight: "12.5 kg",
      status: "Active",
    },
    {
      id: 2,
      productCode: "PP-PL18 BK",
      packsizeName: "ลัง",
      pcsPerFrame: 8,
      pcsPerPack: 25,
      packsPerBox: 40,
      totalPerBox: 1000,
      stdWeight: "10.2 kg",
      status: "Active",
    },
    {
      id: 3,
      productCode: "PT-PL17 FB",
      packsizeName: "กล่อง",
      pcsPerFrame: 6,
      pcsPerPack: 100,
      packsPerBox: 10,
      totalPerBox: 1000,
      stdWeight: "15.0 kg",
      status: "Active",
    },
    {
      id: 4,
      productCode: "BK-SPECIAL-01",
      packsizeName: "ลัง",
      pcsPerFrame: 4,
      pcsPerPack: 10,
      packsPerBox: 50,
      totalPerBox: 500,
      stdWeight: "8.5 kg",
      status: "Inactive",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedItem, setSelectedItem] = useState(null);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [tempSearch, setTempSearch] = useState({ productCode: "" });
  const [searchParams, setSearchParams] = useState({ productCode: "" });
  const [currentPageIndex, setPageIndex] = useState(1);
  const itemsPerPage = 7;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams(tempSearch);
    setPageIndex(1);
    setIsSearchExpanded(false);
  };

  const filteredItems = useMemo(() => {
    return items.filter((item) =>
      item.productCode
        .toLowerCase()
        .includes(searchParams.productCode.toLowerCase()),
    );
  }, [items, searchParams]);

  const currentItems = filteredItems.slice(
    (currentPageIndex - 1) * itemsPerPage,
    currentPageIndex * itemsPerPage,
  );
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handleEdit = (item) => {
    setModalMode("edit");
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleAdd = () => {
    setModalMode("add");
    setSelectedItem({
      productCode: "",
      pcsPerFrame: "",
      pcsPerPack: "",
      packsPerBox: "",
      stdWeight: "",
    });
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans">
      <main className="p-4 md:p-6 max-w-400 mx-auto">
        {/* 1. Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          <div className="flex items-center space-x-2">
            <Package className="w-6 h-6 text-slate-500" />
            <h1 className="text-xl font-semibold text-slate-700">
              จัดการขนาดบรรจุ (Master Item Pack Size)
            </h1>
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center space-x-2 bg-[#004a99] hover:bg-[#003366] text-white px-5 py-2.5 rounded-lg shadow-md transition-all font-medium text-sm active:scale-95 border-b-4 border-blue-900 uppercase tracking-wider"
          >
            <Plus className="w-4 h-4" /> <span>เพิ่มข้อมูลขนาดบรรจุ</span>
          </button>
        </div>

        {/* 2. Expandable Search Bar */}
        <div className="bg-[#e9ecef] rounded-t-xl overflow-hidden mb-0 border-x border-t border-slate-200 shadow-sm">
          <div
            onClick={() => setIsSearchExpanded(!isSearchExpanded)}
            className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-slate-200/50 transition-colors"
          >
            <div className="flex items-center space-x-2 text-slate-600 font-bold">
              <Search className="w-4 h-4 text-[#004a99]" />{" "}
              <span className="text-sm">ค้นหา</span>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-600 uppercase">
                    รหัสสินค้า
                  </label>
                  <input
                    type="text"
                    value={tempSearch.productCode}
                    onChange={(e) =>
                      setTempSearch({ productCode: e.target.value })
                    }
                    placeholder="ระบุรหัสสินค้า"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-sm font-semibold"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-6 space-x-2">
                <button
                  type="button"
                  onClick={() => setTempSearch({ productCode: "" })}
                  className="px-6 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition text-sm font-bold"
                >
                  ล้างค่า
                </button>
                <button
                  type="submit"
                  className="flex items-center space-x-2 px-8 py-2 bg-[#004a99] text-white rounded-lg hover:bg-blue-800 shadow-md text-sm font-bold"
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
              <thead className="bg-[#f1f3f5] border-b border-slate-300 font-bold text-xs">
                <tr className="divide-x divide-slate-300">
                  <th className="px-4 py-3 text-slate-600 text-center w-20 uppercase">
                    ลำดับ
                  </th>
                  <th className="px-4 py-3 text-slate-600 uppercase">
                    รหัสสินค้า
                  </th>
                  <th className="px-4 py-3 text-slate-600">
                    Pack Size Name
                  </th>
                  <th className="px-4 py-3 text-slate-600 text-center uppercase">
                    จำนวน
                  </th>
                  {/* <th className="px-4 py-3 text-slate-600 text-center uppercase">
                    ห่อ/กล่อง
                  </th> */}
                  <th className="px-4 py-3 text-slate-600 text-center uppercase">
                    รวมชิ้น/กล่อง
                  </th>
                  <th className="px-4 py-3 text-slate-600 text-center uppercase">
                    น้ำหนักมาตรฐาน
                  </th>
                  <th className="px-4 py-3 text-slate-600 text-center w-24">
                    Tool
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm">
                {currentItems.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-blue-50/30 transition-colors divide-x divide-slate-100 font-semibold text-slate-700"
                  >
                    <td className="px-4 py-4 text-center text-slate-400">
                      #{item.id}
                    </td>
                    <td className="px-4 py-4 font-bold text-blue-700">
                      {item.productCode}
                    </td>
                    <td className="px-4 py-4 font-bold text-blue-700">
                      {item.packsizeName}
                    </td>
                    <td className="px-4 py-4 text-center">{item.pcsPerPack}</td>
                    {/* <td className="px-4 py-4 text-center">
                      {item.packsPerBox}
                    </td> */}
                    <td className="px-4 py-4 text-center bg-slate-50/50 font-black text-slate-900">
                      {item.totalPerBox.toLocaleString()}
                    </td>
                    <td className="px-4 py-4 text-center text-emerald-600">
                      {item.stdWeight}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-2 bg-blue-50 hover:bg-blue-600 text-blue-500 hover:text-white rounded-lg transition-all border border-blue-200 active:scale-90"
                        >
                          <Edit size={14} />
                        </button>
                        <button className="p-2 bg-red-50 hover:bg-red-600 text-red-500 hover:text-white rounded-lg transition-all border border-red-200 active:scale-90">
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
          <div className="px-6 py-4 bg-[#f8f9fa] border-t border-slate-200 flex items-center justify-between font-bold">
            <div className="text-[11px] text-slate-500 uppercase">
              Showing {filteredItems.length} entries
            </div>
            <div className="flex items-center space-x-1">
              <button
                disabled={currentPageIndex === 1}
                onClick={() => setPageIndex((p) => p - 1)}
                className="p-2 border border-slate-300 rounded bg-white disabled:opacity-40"
              >
                <ChevronLeft size={16} />
              </button>
              <button className="w-8 h-8 text-xs rounded bg-[#004a99] text-white shadow-md">
                {currentPageIndex}
              </button>
              <button
                disabled={currentPageIndex === totalPages}
                onClick={() => setPageIndex((p) => p + 1)}
                className="p-2 border border-slate-300 rounded bg-white disabled:opacity-40"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* --- Add/Edit Modal --- */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 font-sans">
            <div className="bg-[#004a99] p-6 text-white flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <Box className="bg-white/20 p-1.5 rounded-lg" />
                <h3 className="font-black uppercase tracking-tight">
                  {modalMode === "add"
                    ? "เพิ่มข้อมูลขนาดบรรจุ"
                    : "แก้ไขข้อมูลขนาดบรรจุ"}
                </h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-8 space-y-5">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest">
                  รหัสสินค้า (Product Code)
                </label>
                <div className="relative group">
                  <select
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm text-slate-700 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all appearance-none cursor-pointer"
                    value={selectedItem?.productCode || ""}
                    onChange={(e) =>
                      setSelectedItem({
                        ...selectedItem,
                        productCode: e.target.value,
                      })
                    }
                  >
                    <option value="" disabled>
                      เลือกรายการรหัสสินค้า
                    </option>
                    {/* รายการ Mock up รหัสสินค้า */}
                    <option value="PP-PL17 FB">PP-PL17 FB</option>
                    <option value="PP-PL18 BK">PP-PL18 BK</option>
                    <option value="PET-H00P L17">
                      PET-H00P L17
                    </option>
                    <option value="ABC-999">ABC-999</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-focus-within:text-blue-500 transition-colors">
                    <ChevronDown size={18} />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <ModalInput
                  label="จำนวนชิ้นต่อห่อ"
                  type="number"
                  value={selectedItem?.pcsPerPack}
                  onChange={(e) =>
                    setSelectedItem({
                      ...selectedItem,
                      pcsPerPack: e.target.value,
                    })
                  }
                  placeholder="0"
                />
                <ModalInput
                  label="จำนวนห่อต่อกล่อง"
                  type="number"
                  value={selectedItem?.packsPerBox}
                  onChange={(e) =>
                    setSelectedItem({
                      ...selectedItem,
                      packsPerBox: e.target.value,
                    })
                  }
                  placeholder="0"
                />
              </div>
              <ModalInput
                label="น้ำหนักมาตรฐานต่อกล่อง"
                value={selectedItem?.stdWeight}
                onChange={(e) =>
                  setSelectedItem({
                    ...selectedItem,
                    stdWeight: e.target.value,
                  })
                }
                placeholder="0.00 kg"
              />
            </div>
            <div className="p-8 bg-slate-50 border-t flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-8 py-3 font-black text-slate-400 uppercase hover:text-slate-600"
              >
                ยกเลิก
              </button>
              <button className="px-10 py-3 bg-[#004a99] text-white font-black rounded-2xl shadow-xl active:scale-95 border-b-4 border-blue-900 flex items-center space-x-2">
                <Save size={18} /> <span>ยืนยันข้อมูล</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ModalInput = ({ label, ...props }) => (
  <div className="space-y-1">
    <label className="text-[10px] font-black text-slate-400 uppercase ml-1">
      {label}
    </label>
    <input
      className="w-full p-3.5 border border-slate-200 rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
      {...props}
    />
  </div>
);

export default MasterItemPackSize;
