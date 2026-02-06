import React, { useState, useMemo } from "react";
import {
  Search,
  Plus,
  Users,
  Edit2,
  Trash2,
  X,
  Save,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  UserCircle,
  Edit,
  RotateCcw,
} from "lucide-react";

const StaffManagement = () => {
  const [staffList] = useState([
    {
      id: 1,
      firstName: "จินตนา",
      lastName: "พันธกระวี",
      nickname: "จิน",
      gender: "female",
      phone: "0962653610",
      lineId: "0914862140",
      status: "Active",
    },
    {
      id: 2,
      firstName: "ณัฐณิชา",
      lastName: "รัตนธนวิโรจน์",
      nickname: "เนเน่",
      gender: "female",
      phone: "0849787421",
      lineId: "nene.cocktail",
      status: "Active",
    },
    {
      id: 3,
      firstName: "ลักษมี",
      lastName: "คำหมื่น",
      nickname: "กระต่าย",
      gender: "female",
      phone: "0994170770",
      lineId: "-",
      status: "Inactive",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [modalMode] = useState("add"); // "add" หรือ "edit"
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  // State สำหรับค้นหา
  const [tempSearch, setTempSearch] = useState({
    firstName: "",
    lastName: "",
    nickname: "",
    gender: "",
    phone: "",
    status: "",
  });
  const [searchParams, setSearchParams] = useState({ ...tempSearch });
  const [isActive, setIsActive] = useState(true);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams(tempSearch);
    setIsSearchExpanded(false);
  };

  const clearSearch = () => {
    const empty = {
      firstName: "",
      lastName: "",
      nickname: "",
      gender: "",
      phone: "",
      status: "",
    };
    setTempSearch(empty);
    setSearchParams(empty);
  };

  const filteredStaff = useMemo(() => {
    return staffList.filter((s) => {
      return (
        s.firstName.includes(searchParams.firstName) &&
        s.lastName.includes(searchParams.lastName) &&
        s.nickname.includes(searchParams.nickname) &&
        (searchParams.gender === "" || s.gender === searchParams.gender) &&
        s.phone.includes(searchParams.phone) &&
        (searchParams.status === "" || s.status === searchParams.status)
      );
    });
  }, [staffList, searchParams]);

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans">
      <main className="p-4 md:p-6 max-w-400 mx-auto">
        {/* 1. Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          <div className="flex items-center space-x-2">
            <Users className="w-6 h-6 text-slate-500" />
            <h1 className="text-xl font-semibold text-slate-700">
              จัดการข้อมูลพนักงาน (Staff Management)
            </h1>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center space-x-2 bg-[#004a99] hover:bg-[#003366] text-white px-5 py-2.5 rounded-lg shadow-md transition-all font-medium text-sm active:scale-95 border-b-4 border-blue-900 uppercase"
          >
            <Plus className="w-4 h-4" /> <span>เพิ่มพนักงาน</span>
          </button>
        </div>

        {/* 2. Expandable Search Bar - Standard Design */}
        <div className="bg-[#e9ecef] rounded-t-xl overflow-hidden mb-0 border-x border-t border-slate-200 shadow-sm">
          <div
            onClick={() => setIsSearchExpanded(!isSearchExpanded)}
            className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-slate-200/50 transition-colors"
          >
            <div className="flex items-center space-x-2 text-slate-600">
              <Search className="w-4 h-4 text-[#004a99]" />
              <span className="text-sm font-bold tracking-tight">
                ค้นหา
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
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <SearchInput
                  label="ชื่อ"
                  value={tempSearch.firstName}
                  onChange={(e) =>
                    setTempSearch({ ...tempSearch, firstName: e.target.value })
                  }
                  placeholder="ระบุชื่อ"
                />
                <SearchInput
                  label="นามสกุล"
                  value={tempSearch.lastName}
                  onChange={(e) =>
                    setTempSearch({ ...tempSearch, lastName: e.target.value })
                  }
                  placeholder="ระบุนามสกุล"
                />
                <SearchInput
                  label="ชื่อเล่น"
                  value={tempSearch.nickname}
                  onChange={(e) =>
                    setTempSearch({ ...tempSearch, nickname: e.target.value })
                  }
                  placeholder="ระบุชื่อเล่น"
                />
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-600 uppercase">
                    เพศ
                  </label>
                  <select
                    value={tempSearch.gender}
                    onChange={(e) =>
                      setTempSearch({ ...tempSearch, gender: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded focus:border-blue-500 outline-none text-sm font-semibold"
                  >
                    <option value="">ทั้งหมด</option>
                    <option value="male">ชาย</option>
                    <option value="female">หญิง</option>
                  </select>
                </div>
                <SearchInput
                  label="เบอร์โทรศัพท์"
                  value={tempSearch.phone}
                  onChange={(e) =>
                    setTempSearch({ ...tempSearch, phone: e.target.value })
                  }
                  placeholder="08x-xxx-xxxx"
                />
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-600 uppercase">
                    สถานะ
                  </label>
                  <select
                    value={tempSearch.status}
                    onChange={(e) =>
                      setTempSearch({ ...tempSearch, status: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded focus:border-blue-500 outline-none text-sm font-semibold"
                  >
                    <option value="">ทั้งหมด</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end mt-6 space-x-2">
                <button
                  type="button"
                  onClick={clearSearch}
                  className="px-6 py-2 bg-slate-200 text-slate-700 rounded hover:bg-slate-300 transition text-sm font-bold flex items-center active:scale-95"
                >
                  <RotateCcw className="w-4 h-4 mr-1" /> ล้างค่า
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

        {/* 3. Table Content - Scale match Job Order */}
        <div className="bg-white rounded-b-xl shadow-md overflow-hidden border border-slate-200">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#f1f3f5] border-b border-slate-300 font-bold">
                <tr className="divide-x divide-slate-300">
                  <th className="px-4 py-3 text-xs text-slate-600 uppercase tracking-wider">
                    ชื่อ - นามสกุล
                  </th>
                  <th className="px-4 py-3 text-xs text-slate-600 text-center uppercase tracking-wider w-24">
                    ชื่อเล่น
                  </th>
                  <th className="px-4 py-3 text-xs text-slate-600 text-center uppercase tracking-wider">
                    เบอร์โทรศัพท์
                  </th>
                  {/* <th className="px-4 py-3 text-xs text-slate-600 text-center uppercase tracking-wider">
                    Line ID
                  </th> */}
                  <th className="px-4 py-3 text-xs text-slate-600 text-center uppercase tracking-wider w-32">
                    สถานะ
                  </th>
                  <th className="px-4 py-3 text-xs text-slate-600 text-center tracking-wider w-24">
                    Tool
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm">
                {filteredStaff.map((staff) => (
                  <tr
                    key={staff.id}
                    className="hover:bg-blue-50/30 transition-colors divide-x divide-slate-100"
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 font-bold text-xs uppercase shadow-inner border border-white">
                          {staff.firstName[0]}
                        </div>
                        <span className="font-bold text-slate-700">
                          {staff.firstName} {staff.lastName}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center font-semibold text-slate-500">
                      {staff.nickname}
                    </td>
                    <td className="px-4 py-4 text-center font-bold text-blue-700">
                      {staff.phone}
                    </td>
                    {/* <td className="px-4 py-4 text-center text-slate-500 font-medium">
                      {staff.lineId}
                    </td> */}
                    <td className="px-4 py-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                          staff.status === "Active"
                            ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                            : "bg-slate-100 text-slate-400 border-slate-200"
                        }`}
                      >
                        {staff.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex justify-center space-x-2">
                        <button className="p-2 bg-blue-50 hover:bg-blue-600 text-blue-500 hover:text-white rounded-lg transition-all border border-blue-200 shadow-sm active:scale-90">
                          <Edit size={14} />
                        </button>
                        <button className="p-2 bg-red-50 hover:bg-red-600 text-red-500 hover:text-white rounded-lg transition-all border border-red-200 shadow-sm active:scale-90">
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
          <div className="px-6 py-4 bg-[#f8f9fa] border-t border-slate-200 flex items-center justify-between font-bold text-slate-500">
            <div className="text-[11px] uppercase tracking-widest">
              Showing {filteredStaff.length} entries
            </div>
            <div className="flex items-center space-x-1">
              <button className="p-2 border border-slate-300 rounded bg-white hover:bg-slate-50 disabled:opacity-40 shadow-sm">
                <ChevronLeft size={16} />
              </button>
              <button className="w-8 h-8 text-xs rounded bg-[#004a99] text-white shadow-md">
                1
              </button>
              <button className="p-2 border border-slate-300 rounded bg-white hover:bg-slate-50 shadow-sm">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* --- ADD/EDIT STAFF MODAL --- */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 font-sans">
            {/* Header */}
            <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-[#004a99] text-white">
              <div className="flex items-center space-x-3">
                <UserCircle size={20} />
                <h3 className="text-xl font-black uppercase tracking-tight">
                  {modalMode === "add"
                    ? "เพิ่มพนักงานใหม่"
                    : "แก้ไขข้อมูลพนักงาน"}
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
            <div className="p-10 max-h-[70vh] overflow-y-auto space-y-5 no-scrollbar">
              {/* แถวที่ 1: ชื่อ - นามสกุล */}
              <div className="grid grid-cols-2 gap-4">
                <ModalInput
                  label="ชื่อ*"
                  placeholder="กรอกชื่อ"
                  value={selectedStaff?.firstName || ""}
                  onChange={(e) =>
                    setSelectedStaff({
                      ...selectedStaff,
                      firstName: e.target.value,
                    })
                  }
                />
                <ModalInput
                  label="นามสกุล*"
                  placeholder="กรอกนามสกุล"
                  value={selectedStaff?.lastName || ""}
                  onChange={(e) =>
                    setSelectedStaff({
                      ...selectedStaff,
                      lastName: e.target.value,
                    })
                  }
                />
              </div>

              {/* แถวที่ 2: ชื่อเล่น - เพศ (Dropdown) */}
              <div className="grid grid-cols-2 gap-4">
                <ModalInput
                  label="ชื่อเล่น"
                  placeholder="ระบุชื่อเล่น"
                  value={selectedStaff?.nickname || ""}
                  onChange={(e) =>
                    setSelectedStaff({
                      ...selectedStaff,
                      nickname: e.target.value,
                    })
                  }
                />
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest">
                    เพศ
                  </label>
                  <select
                    className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    value={selectedStaff?.gender || ""}
                    onChange={(e) =>
                      setSelectedStaff({
                        ...selectedStaff,
                        gender: e.target.value,
                      })
                    }
                  >
                    <option value="">เลือกเพศ...</option>
                    <option value="male">ชาย (Male)</option>
                    <option value="female">หญิง (Female)</option>
                  </select>
                </div>
              </div>

              {/* แถวที่ 3: วันเกิด - เลขบัตรประชาชน */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ModalInput
                  label="วันเกิด"
                  type="date"
                  value={selectedStaff?.birthDate || ""}
                  onChange={(e) =>
                    setSelectedStaff({
                      ...selectedStaff,
                      birthDate: e.target.value,
                    })
                  }
                />
                <ModalInput
                  label="เลขบัตรประชาชน*"
                  placeholder="x-xxxx-xxxxx-xx-x"
                  value={selectedStaff?.citizenId || ""}
                  onChange={(e) =>
                    setSelectedStaff({
                      ...selectedStaff,
                      citizenId: e.target.value,
                    })
                  }
                />
              </div>

              {/* แถวที่ 4: เบอร์โทรศัพท์ - Line ID */}
              <div className="grid grid-cols-2 gap-4">
                <ModalInput
                  label="เบอร์โทรศัพท์"
                  placeholder="08x-xxx-xxxx"
                  value={selectedStaff?.phone || ""}
                  onChange={(e) =>
                    setSelectedStaff({
                      ...selectedStaff,
                      phone: e.target.value,
                    })
                  }
                />
                {/* <ModalInput
                  label="Line ID"
                  placeholder="ระบุ Line ID"
                  value={selectedStaff?.lineId || ""}
                  onChange={(e) =>
                    setSelectedStaff({
                      ...selectedStaff,
                      lineId: e.target.value,
                    })
                  }
                /> */}
              </div>

              {/* แถวที่ 5: สถานะพนักงาน (Active/Inactive) */}
                <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest">
                      สถานะพนักงาน
                    </label>

                    <div
                      onClick={() => setIsActive(!isActive)}
                      className="flex items-center justify-between w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-100 transition-all group"
                    >
                      {/* ข้อความสถานะด้านซ้าย */}
                      <span className={`text-sm font-bold ml-1 transition-colors ${isActive ? "text-emerald-600" : "text-slate-500"}`}>
                        {isActive ? "Active" : "Inactive"}
                      </span>

                      {/* ตัวปุ่ม Toggle ด้านขวา */}
                      <div
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${isActive ? "bg-emerald-500" : "bg-slate-300"
                          }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-300 ${isActive ? "translate-x-6" : "translate-x-1"
                            }`}
                        />
                      </div>
                    </div>
                  </div>
            </div>

            {/* Footer Buttons */}
            <div className="p-8 bg-slate-50 border-t flex space-x-3">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="flex-1 py-4 font-black text-slate-400 uppercase tracking-widest hover:text-slate-600 hover:bg-white rounded-2xl transition-all"
              >
                ยกเลิก
              </button>
              <button
                // onClick={handleSave}
                className="flex-1 py-4 bg-[#004a99] text-white font-black rounded-2xl shadow-xl active:scale-95 border-b-4 border-blue-900 flex items-center justify-center space-x-2"
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

// Helper Component สำหรับช่องค้นหา
const SearchInput = ({ label, ...props }) => (
  <div className="space-y-2">
    <label className="text-xs font-bold text-slate-600 uppercase">
      {label}
    </label>
    <input
      className="w-full px-3 py-2 bg-white border border-slate-300 rounded focus:border-blue-500 outline-none transition text-sm font-semibold"
      {...props}
    />
  </div>
);

const ModalInput = ({ label, ...props }) => (
  <div className="space-y-1">
    <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest">
      {label}
    </label>
    <input
      className="w-full p-3.5 border border-slate-200 rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 transition-all"
      {...props}
    />
  </div>
);

export default StaffManagement;
