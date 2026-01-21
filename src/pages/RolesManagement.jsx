import React, { useState } from "react";
import { 
  ShieldCheck, Search, Plus, Edit, Trash2, 
  ChevronDown, ChevronUp, RotateCcw
} from "lucide-react";

const RolesManagement = ({ onEditRole }) => {
  // 1. ข้อมูลบทบาทพนักงาน (Mock up)
  const [roles] = useState([
    { id: 1, name: "SUPERADMIN", description: "สิทธิ์สูงสุด จัดการได้ทุกส่วนของระบบ", createdBy: "admin", createdDate: "27/06/2022", modifiedBy: "admin", modifiedDate: "14/08/2025" },
    { id: 2, name: "PRODUCTION_SUP", description: "หัวหน้าฝ่ายผลิต (Supervisor)", createdBy: "admin", createdDate: "15/01/2024", modifiedBy: "admin", modifiedDate: "12/01/2026" },
    { id: 3, name: "OPERATOR", description: "พนักงานฝ่ายผลิต (Operator)", createdBy: "admin", createdDate: "15/01/2024", modifiedBy: "admin", modifiedDate: "10/01/2026" },
    { id: 4, name: "WAREHOUSE", description: "เจ้าหน้าที่คลังสินค้า", createdBy: "admin", createdDate: "20/02/2024", modifiedBy: "admin", modifiedDate: "05/01/2026" },
    { id: 5, name: "ACCOUNTING", description: "ฝ่ายบัญชีและการเงิน", createdBy: "admin", createdDate: "01/03/2024", modifiedBy: "admin", modifiedDate: "12/01/2026" },
  ]);

  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans">
      <main className="p-0 animate-in fade-in duration-500">
        
        {/* --- 1. Page Header & Action Button --- */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 px-6 pt-2 gap-4">
          <div className="flex items-center space-x-3">
            <div className="bg-[#004a99] p-2.5 rounded-2xl shadow-lg text-white">
               <ShieldCheck size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Roles Management</h1>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">จัดการบทบาทและสิทธิ์การใช้งานระบบ</p>
            </div>
          </div>
          
          <button className="flex items-center space-x-2 bg-[#004a99] hover:bg-[#003366] text-white px-8 py-3.5 rounded-2xl shadow-xl transition-all font-black text-sm active:scale-95 border-b-4 border-blue-900">
            <Plus size={18} />
            <span>Add Role</span>
          </button>
        </div>

        {/* --- 2. Search Section (Layout เดียวกับหน้า Users) --- */}
        <div className="mx-6 mb-0 bg-white rounded-t-4xl border-x border-t border-slate-200 overflow-hidden shadow-sm">
          <div 
            onClick={() => setIsSearchExpanded(!isSearchExpanded)}
            className="px-8 py-5 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center space-x-3 text-[#004a99]">
              <Search size={20} />
              <span className="text-sm font-black uppercase tracking-widest text-blue-900">Search Role</span>
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
                  placeholder="ระบุชื่อบทบาท หรือรายละเอียด เพื่อค้นหา..."
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

        {/* --- 3. Roles Table Content --- */}
        <div className="mx-6 bg-white rounded-b-4xl shadow-2xl overflow-hidden border border-slate-200">
          <div className="p-6 bg-slate-50 border-b border-slate-200">
             <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Table of transaction roles</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white border-b border-slate-200">
                  <th className="px-6 py-5 text-[11px] font-black text-slate-500 uppercase tracking-widest text-center w-28">Tool</th>
                  <th className="px-6 py-5 text-[11px] font-black text-slate-500 uppercase tracking-widest">Name</th>
                  <th className="px-6 py-5 text-[11px] font-black text-slate-500 uppercase tracking-widest">Description</th>
                  <th className="px-6 py-5 text-[11px] font-black text-slate-500 uppercase tracking-widest">Created By</th>
                  <th className="px-6 py-5 text-[11px] font-black text-slate-500 uppercase tracking-widest">Modified Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {roles.map((role) => (
                  <tr key={role.id} className="hover:bg-blue-50/40 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-center space-x-3">
                        <button 
                          onClick={() => onEditRole(role)}
                          className="p-2.5 bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-xl transition-all shadow-sm border border-indigo-100 active:scale-90"
                          title="Edit Permissions"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          className="p-2.5 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all shadow-sm border border-red-100 active:scale-90"
                          title="Delete Role"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-5 font-black text-slate-700 text-sm">
                      <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg w-fit">
                        {role.name}
                      </div>
                    </td>
                    <td className="px-6 py-5 font-bold text-slate-500 text-sm">{role.description}</td>
                    <td className="px-6 py-5">
                      <div className="text-xs font-black text-slate-700">{role.createdBy}</div>
                      <div className="text-[10px] text-slate-400 font-bold">{role.createdDate}</div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="text-xs font-black text-slate-700">{role.modifiedBy}</div>
                      <div className="text-[10px] text-slate-400 font-bold">{role.modifiedDate}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Footer Padding */}
          <div className="px-10 py-6 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
             <div className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
                Total {roles.length} Roles Defined
             </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RolesManagement;