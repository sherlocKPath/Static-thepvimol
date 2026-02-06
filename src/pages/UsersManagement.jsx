import React, { useState, useMemo } from "react";
import {
  Search,
  Users,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  UserPlus,
  ShieldCheck,
  RotateCcw,
  X,
  Save,
  Key,
  Mail,
  UserCircle,
} from "lucide-react";

const UsersManagement = ({ onEditUser }) => {
  const [users] = useState([
    {
      id: 1,
      username: "widely",
      role: "Super Admin",
      fullName: "PTK widely",
      email: "PTK@widelynext.co.th",
      status: "Active",
      loginAttempt: 0,
    },
    {
      id: 2,
      username: "praewa",
      role: "Operator",
      fullName: "praewa phatchara",
      email: "praewa@thepvimol.com",
      status: "Active",
      loginAttempt: 0,
    },
    {
      id: 3,
      username: "account_tvm",
      role: "Accounting",
      fullName: "Account TVM",
      email: "accounting@thepvimol.com",
      status: "Active",
      loginAttempt: 0,
    },
    {
      id: 4,
      username: "joker_staff",
      role: "Supervisor",
      fullName: "Baron Joke",
      email: "joker@thepvimol.com",
      status: "Active",
      loginAttempt: 0,
    },
    {
      id: 5,
      username: "demo_cs",
      role: "Operator",
      fullName: "Demo Support",
      email: "support@thepvimol.com",
      status: "Inactive",
      loginAttempt: 3,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [, setSelectedUser] = useState(null);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isActive, setIsActive] = useState(true);

  // Search States
  const [tempSearch, setTempSearch] = useState({
    username: "",
    fullName: "",
    role: "",
    status: "",
  });
  const [searchParams, setSearchParams] = useState({ ...tempSearch });
  const [currentPageIndex, setPageIndex] = useState(1);
  const itemsPerPage = 8;

  // ฟังก์ชันกำหนดสี Badge ตาม Role (เพิ่มความต่างของสี)
  const getRoleStyle = (role) => {
    switch (role) {
      case "Super Admin":
        return "bg-rose-100 text-rose-700 border-rose-200";
      case "Supervisor":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Accounting":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "Operator":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams(tempSearch);
    setPageIndex(1);
    setIsSearchExpanded(false);
  };

  const clearSearch = () => {
    const empty = { username: "", fullName: "", role: "", status: "" };
    setTempSearch(empty);
    setSearchParams(empty);
  };

  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.username
          .toLowerCase()
          .includes(searchParams.username.toLowerCase()) &&
        user.fullName
          .toLowerCase()
          .includes(searchParams.fullName.toLowerCase()) &&
        (searchParams.role === "" || user.role === searchParams.role) &&
        (searchParams.status === "" || user.status === searchParams.status),
    );
  }, [users, searchParams]);

  const currentItems = filteredUsers.slice(
    (currentPageIndex - 1) * itemsPerPage,
    currentPageIndex * itemsPerPage,
  );
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans">
      <main className="p-4 md:p-6 max-w-400 mx-auto animate-in fade-in duration-500">
        {/* 1. Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          <div className="flex items-center space-x-2">
            <Users className="w-6 h-6 text-slate-500" />
            <h1 className="text-xl font-semibold text-slate-700">
              จัดการผู้ใช้งาน (Users Management)
            </h1>
          </div>
          <button
            onClick={() => {
              setSelectedUser(null);
              setShowModal(true);
            }}
            className="flex items-center space-x-2 bg-[#004a99] hover:bg-[#003366] text-white px-5 py-2.5 rounded-lg shadow-md transition-all font-medium text-sm active:scale-95 border-b-4 border-blue-900 uppercase"
          >
            <UserPlus size={18} /> <span>Create User</span>
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
              <span className="text-sm tracking-tight uppercase">
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <SearchField
                  label="Username"
                  value={tempSearch.username}
                  onChange={(e) =>
                    setTempSearch({ ...tempSearch, username: e.target.value })
                  }
                  placeholder="ระบุ Username"
                />
                <SearchField
                  label="ชื่อ-นามสกุล"
                  value={tempSearch.fullName}
                  onChange={(e) =>
                    setTempSearch({ ...tempSearch, fullName: e.target.value })
                  }
                  placeholder="ค้นหาชื่อ"
                />
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-600 uppercase">
                    สิทธิ์การใช้งาน (Role)
                  </label>
                  <select
                    value={tempSearch.role}
                    onChange={(e) =>
                      setTempSearch({ ...tempSearch, role: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded focus:border-blue-500 outline-none text-sm font-semibold"
                  >
                    <option value="">ทั้งหมด</option>
                    <option value="Super Admin">Super Admin</option>
                    <option value="Supervisor">Supervisor</option>
                    <option value="Operator">Operator</option>
                    <option value="Accounting">Accounting</option>
                  </select>
                </div>
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
                  className="flex items-center space-x-2 px-8 py-2 bg-[#004a99] text-white rounded-lg hover:bg-blue-800 shadow-md text-sm font-bold active:scale-95"
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
              <thead className="bg-[#f1f3f5] border-b border-slate-300 font-bold">
                <tr className="divide-x divide-slate-300 text-[11px] text-slate-600">
                  <th className="px-4 py-3">Username</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Full Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3 text-center">Status</th>
                  <th className="px-4 py-3 text-center">Login Attempt</th>
                  <th className="px-4 py-3 text-center w-24">Tool</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm">
                {currentItems.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-blue-50/30 transition-colors divide-x divide-slate-100 font-semibold text-slate-700"
                  >
                    <td className="px-4 py-3 font-bold text-slate-900">
                      {user.username}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`flex items-center px-2 py-1 rounded text-[11px] w-fit border font-bold ${getRoleStyle(user.role)}`}
                      >
                        <ShieldCheck size={12} className="mr-1" /> {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-500">
                      {user.fullName}
                    </td>
                    <td className="px-4 py-3 text-blue-600 underline decoration-blue-100 underline-offset-4">
                      {user.email}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${user.status === "Active" ? "bg-emerald-100 text-emerald-700 border border-emerald-200" : "bg-slate-100 text-slate-400"}`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center font-black text-slate-400">
                      {user.loginAttempt}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center space-x-2">
                        {/* ปุ่ม Edit: แก้ไขให้เรียกใช้ onEditUser พร้อมส่งข้อมูล user คนนั้นไป */}
                        <button
                          onClick={() => onEditUser(user)}
                          className="p-2 bg-blue-50 hover:bg-blue-600 text-blue-500 hover:text-white rounded-lg transition-all border border-blue-200 active:scale-90"
                          title="Edit User Profile"
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
          <div className="px-6 py-4 bg-[#f8f9fa] border-t border-slate-200 flex items-center justify-between font-bold text-slate-500">
            <div className="text-[11px] uppercase">
              Showing {filteredUsers.length} Users
            </div>
            <div className="flex items-center space-x-1">
              <button
                disabled={currentPageIndex === 1}
                onClick={() => setPageIndex((p) => p - 1)}
                className="p-2 border border-slate-300 rounded bg-white hover:bg-slate-50 disabled:opacity-40 shadow-sm"
              >
                <ChevronLeft size={16} />
              </button>
              <button className="w-8 h-8 text-xs rounded bg-[#004a99] text-white shadow-md">
                {currentPageIndex}
              </button>
              <button
                disabled={currentPageIndex === totalPages}
                onClick={() => setPageIndex((p) => p + 1)}
                className="p-2 border border-slate-300 rounded bg-white hover:bg-slate-50 shadow-sm"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* --- ADD USER MODAL --- */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 font-sans">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-[#004a99] text-white">
              <div className="flex items-center space-x-3">
                <UserCircle size={24} />
                <h3 className="text-xl font-black uppercase tracking-tight">
                  กำหนดบัญชีผู้ใช้งาน
                </h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-10 max-h-[70vh] overflow-y-auto space-y-6 no-scrollbar">
              <div className="space-y-4 border-b border-slate-100 pb-6">
                <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
                  Account Security
                </h4>
                <ModalInput
                  label="Username*"
                  icon={<UserCircle size={16} />}
                  placeholder="ระบุชื่อสำหรับเข้าระบบ"
                />
                <ModalInput
                  label="Password*"
                  type="password"
                  icon={<Key size={16} />}
                  placeholder="กำหนดรหัสผ่าน"
                />
              </div>

              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
                  Profile & Permissions
                </h4>
                <ModalInput
                  label="ชื่อ-นามสกุล (Display Name)"
                  placeholder="ระบุชื่อจริงพนักงาน"
                />
                <ModalInput
                  label="Email*"
                  icon={<Mail size={16} />}
                  placeholder="example@thepvimol.com"
                />

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest">
                      Role
                    </label>
                    <select className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
                      <option value="Operator">Operator</option>
                      <option value="Supervisor">Supervisor</option>
                      <option value="Accounting">Accounting</option>
                      <option value="Super Admin">Super Admin</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest">
                      Initial Status
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
              </div>
            </div>

            <div className="p-8 bg-slate-50 border-t flex space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-4 font-black text-slate-400 uppercase tracking-widest hover:text-slate-600 hover:bg-white rounded-2xl transition-all"
              >
                ยกเลิก
              </button>
              <button className="flex-1 py-4 bg-[#004a99] text-white font-black rounded-2xl shadow-xl active:scale-95 border-b-4 border-blue-900 flex items-center justify-center space-x-2">
                <Save size={18} /> <span>บันทึกข้อมูล</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SearchField = ({ label, ...props }) => (
  <div className="space-y-2">
    <label className="text-xs font-bold text-slate-600">
      {label}
    </label>
    <input
      className="w-full px-3 py-2 bg-white border border-slate-300 rounded focus:border-blue-500 outline-none text-sm font-semibold transition-all"
      {...props}
    />
  </div>
);

const ModalInput = ({ label, icon, ...props }) => (
  <div className="space-y-1">
    <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest">
      {label}
    </label>
    <div className="relative">
      {icon && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300">
          {icon}
        </div>
      )}
      <input
        className={`w-full ${icon ? "pl-11" : "px-4"} py-3.5 border border-slate-200 rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 transition-all`}
        {...props}
      />
    </div>
  </div>
);

export default UsersManagement;
