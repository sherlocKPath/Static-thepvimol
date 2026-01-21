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
  RotateCcw
} from "lucide-react";

// เพิ่ม onEditUser เข้ามาใน Props
const UsersManagement = ({ onEditUser }) => {
  const [users] = useState([
    { id: 1, username: "widely", role: "Super Admin", fullName: "PTK widely", email: "PTK@widelynext.co.th", status: "Active", loginAttempt: 0 },
    { id: 2, username: "praewa", role: "Operator", fullName: "praewa phatchara", email: "praewa@thepvimolproduction.com", status: "Active", loginAttempt: 0 },
    { id: 3, username: "accountthepvimol", role: "Accounting", fullName: "account tvm", email: "accounting@thepvimolproduction.com", status: "Active", loginAttempt: 0 },
    { id: 4, username: "joker", role: "Supervisor", fullName: "baron joke", email: "joker@thepvimolproduction.com", status: "Active", loginAttempt: 0 },
    { id: 5, username: "democs", role: "Customer Service", fullName: "demo CS", email: "petchza10222@gmail.com", status: "Inactive", loginAttempt: 2 },
    { id: 6, username: "demo", role: "Guest", fullName: "demo demo", email: "petchza10222@gmail.com", status: "Active", loginAttempt: 0 },
  ]);

  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPageIndex, setPageIndex] = useState(1);
  const itemsPerPage = 8;

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  const totalItems = filteredUsers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentItems = filteredUsers.slice(
    (currentPageIndex - 1) * itemsPerPage,
    currentPageIndex * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans">
      <main className="p-0 animate-in fade-in duration-500">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 px-6 pt-2 gap-4">
          <div className="flex items-center space-x-3">
            <div className="bg-[#004a99] p-2.5 rounded-2xl shadow-lg text-white">
               <Users size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Users Management</h1>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">จัดการข้อมูลและสิทธิ์พนักงาน</p>
            </div>
          </div>
          
          <button className="flex items-center space-x-2 bg-[#004a99] hover:bg-[#003366] text-white px-8 py-3.5 rounded-2xl shadow-xl transition-all font-black text-sm active:scale-95 border-b-4 border-blue-900">
            <UserPlus size={18} />
            <span>เพิ่มข้อมูลพนักงาน</span>
          </button>
        </div>

        {/* Search Section */}
        <div className="mx-6 mb-0 bg-white rounded-t-4xl border-x border-t border-slate-200 overflow-hidden shadow-sm">
          <div 
            onClick={() => setIsSearchExpanded(!isSearchExpanded)}
            className="px-8 py-5 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center space-x-3 text-[#004a99]">
              <Search size={20} />
              <span className="text-sm font-black uppercase tracking-widest">Search User</span>
            </div>
            {isSearchExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>

          {isSearchExpanded && (
            <div className="px-8 pb-8 pt-2 border-t border-slate-100 animate-in slide-in-from-top-2">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="ค้นหาด้วย Username, ชื่อ-นามสกุล หรือ อีเมล..."
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-3xl focus:ring-2 focus:ring-blue-500 outline-none transition font-medium pr-12"
                />
                <button 
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-slate-600"
                >
                  <RotateCcw size={18} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Table Content */}
        <div className="mx-6 bg-white rounded-b-4xl shadow-2xl overflow-hidden border border-slate-200">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-5 text-[11px] font-black text-slate-500 uppercase tracking-widest text-center w-28">Tool</th>
                  <th className="px-6 py-5 text-[11px] font-black text-slate-500 uppercase tracking-widest">Username</th>
                  <th className="px-6 py-5 text-[11px] font-black text-slate-500 uppercase tracking-widest">Role</th>
                  <th className="px-6 py-5 text-[11px] font-black text-slate-500 uppercase tracking-widest">Full Name</th>
                  <th className="px-6 py-5 text-[11px] font-black text-slate-500 uppercase tracking-widest">Email</th>
                  <th className="px-6 py-5 text-[11px] font-black text-slate-500 uppercase tracking-widest text-center">Status</th>
                  <th className="px-6 py-5 text-[11px] font-black text-slate-500 uppercase tracking-widest text-center">Login Attempt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {currentItems.length > 0 ? (
                  currentItems.map((user) => (
                    <tr key={user.id} className="hover:bg-blue-50/40 transition-colors group">
                      <td className="px-6 py-5 text-center">
                        <div className="flex items-center justify-center space-x-3">
                          {/* ปุ่ม Edit: เมื่อกดจะเรียกใช้ฟังก์ชัน onEditUser พร้อมส่งข้อมูลพนักงานไป */}
                          <button 
                            onClick={() => onEditUser(user)} 
                            className="p-2.5 bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-xl transition-all shadow-sm border border-indigo-100 active:scale-90"
                            title="Edit User"
                          >
                            <Edit size={16} />
                          </button>
                          <button className="p-2.5 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all shadow-sm border border-red-100 active:scale-90" title="Delete User">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-5 font-black text-slate-700 text-sm">{user.username}</td>
                      <td className="px-6 py-5 font-bold text-slate-600 text-xs">
                        <div className="flex items-center bg-slate-100 px-3 py-1.5 rounded-lg w-fit">
                          <ShieldCheck size={14} className="mr-1.5 text-blue-600" />
                          {user.role}
                        </div>
                      </td>
                      <td className="px-6 py-5 font-bold text-slate-600 text-sm capitalize">{user.fullName}</td>
                      <td className="px-6 py-5 font-medium text-blue-600 text-sm underline decoration-blue-200 underline-offset-4">{user.email}</td>
                      <td className="px-6 py-5 text-center">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-sm ${
                          user.status === 'Active' 
                            ? 'bg-emerald-50 text-emerald-600 border-emerald-200' 
                            : 'bg-red-50 text-red-600 border-red-200'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-center font-black text-slate-500 text-sm">{user.loginAttempt}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-24 text-center text-slate-400 italic font-black uppercase tracking-[0.2em]">-- ไม่พบข้อมูลผู้ใช้งาน --</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-10 py-6 bg-slate-50 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
             <div className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
                Showing {currentItems.length} of {totalItems} Active Users
             </div>
             <div className="flex items-center space-x-2">
                <button onClick={() => setPageIndex(p => Math.max(1, p-1))} disabled={currentPageIndex === 1} className="p-2.5 bg-white border border-slate-200 rounded-2xl hover:bg-slate-100 disabled:opacity-30 transition-all shadow-sm"><ChevronLeft size={20} /></button>
                <div className="px-6 py-2 bg-[#004a99] text-white rounded-2xl font-black text-sm shadow-lg ring-4 ring-blue-50">{currentPageIndex} / {totalPages || 1}</div>
                <button onClick={() => setPageIndex(p => Math.min(totalPages, p+1))} disabled={currentPageIndex === totalPages} className="p-2.5 bg-white border border-slate-200 rounded-2xl hover:bg-slate-100 disabled:opacity-30 transition-all shadow-sm"><ChevronRight size={20} /></button>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UsersManagement;