import React, { useState, useMemo } from "react";
import {
  ShieldCheck,
  Search,
  Plus,
  Edit,
  Trash2,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  X,
  Save,
} from "lucide-react";

const RolesManagement = ({ onEditRole }) => {
  const [roles] = useState([
    {
      id: 1,
      name: "SUPERADMIN",
      description: "สิทธิ์สูงสุด จัดการได้ทุกส่วนของระบบ",
      createdBy: "admin",
      createdDate: "27/06/2022",
      modifiedBy: "admin",
      modifiedDate: "14/08/2025",
    },
    {
      id: 2,
      name: "PRODUCTION_SUP",
      description: "หัวหน้าฝ่ายผลิต (Supervisor)",
      createdBy: "admin",
      createdDate: "15/01/2024",
      modifiedBy: "admin",
      modifiedDate: "12/01/2026",
    },
    {
      id: 3,
      name: "OPERATOR",
      description: "พนักงานฝ่ายผลิต (Operator)",
      createdBy: "admin",
      createdDate: "15/01/2024",
      modifiedBy: "admin",
      modifiedDate: "10/01/2026",
    },
    {
      id: 4,
      name: "WAREHOUSE",
      description: "เจ้าหน้าที่คลังสินค้า",
      createdBy: "admin",
      createdDate: "20/02/2024",
      modifiedBy: "admin",
      modifiedDate: "05/01/2026",
    },
    {
      id: 5,
      name: "ACCOUNTING",
      description: "ฝ่ายบัญชีและการเงิน",
      createdBy: "admin",
      createdDate: "01/03/2024",
      modifiedBy: "admin",
      modifiedDate: "12/01/2026",
    },
  ]);

  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

    const clearSearch = () => {
    const empty = { username: "", fullName: "", role: "", status: "" };
    setSearchTerm(empty.username); // Reset searchTerm to empty string
  };

  // State สำหรับฟอร์มใน Modal
  const [newRole, setNewRole] = useState({ name: "", description: "" });

  const filteredRoles = useMemo(() => {
    return roles.filter(
      (role) =>
        role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        role.description.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [roles, searchTerm]);

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans">
      <main className="p-4 md:p-6 max-w-400 mx-auto animate-in fade-in duration-500">
        {/* 1. Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-6 h-6 text-slate-500" />
            <h1 className="text-xl font-semibold text-slate-700">
              จัดการบทบาท (Roles Management)
            </h1>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 bg-[#004a99] hover:bg-[#003366] text-white px-5 py-2.5 rounded-lg shadow-md transition-all font-medium text-sm active:scale-95 border-b-4 border-blue-900 uppercase"
          >
            <Plus className="w-4 h-4" /> <span>Add Role</span>
          </button>
        </div>

        {/* 2. Expandable Search Bar */}
        <div className="bg-[#e9ecef] rounded-t-xl overflow-hidden mb-0 border-x border-t border-slate-200 shadow-sm">
          <div
            onClick={() => setIsSearchExpanded(!isSearchExpanded)}
            className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-slate-200/50 transition-colors"
          >
            <div className="flex items-center space-x-2 text-slate-600 font-bold">
              <Search className="w-4 h-4 text-[#004a99]" />
              <span className="text-sm tracking-tight uppercase">
                Search Role
              </span>
            </div>
            {isSearchExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </div>

          {isSearchExpanded && (
            <div className="bg-white px-8 pb-8 pt-6 border-t border-slate-200 animate-in slide-in-from-top-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* ฟิลด์ชื่อบทบาท */}
              <SearchField
                  label="ชื่อบทบาท (Role)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="ระบุชื่อบทบาท"
                />
                {/* คุณสามารถเพิ่มฟิลด์อื่นๆ ตรงนี้ได้ในอนาคต เช่น สถานะ หรือ วันที่สร้าง */}
              </div>

              {/* ปุ่มกด ค้นหา-ล้างค่า ตามมาตรฐานระบบ */}
              <div className="flex justify-end mt-6 space-x-2">
                <button
                  type="button"
                  onClick={clearSearch}
                  className="px-6 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition text-sm font-bold"
                >
                  ล้างค่า
                </button>
                <button
                  type="submit"
                  className="flex items-center space-x-2 px-8 py-2 bg-[#004a99] text-white rounded-lg hover:bg-blue-800 shadow-md text-sm font-bold active:scale-95"
                >
                  <Search className="w-4 h-4" /> <span>ค้นหา</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 3. Roles Table */}
        <div className="bg-white rounded-b-xl shadow-md overflow-hidden border border-slate-200">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#f1f3f5] border-b border-slate-300 font-bold">
                <tr className="divide-x divide-slate-300 text-[11px] text-slate-600">
                  <th className="px-4 py-3">Role Name</th>
                  <th className="px-4 py-3">Description</th>
                  <th className="px-4 py-3 w-40">Created By</th>
                  <th className="px-4 py-3 w-40">Modified Date</th>
                  <th className="px-4 py-3 text-center w-24">Tool</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm">
                {filteredRoles.map((role) => (
                  <tr
                    key={role.id}
                    className="hover:bg-blue-50/30 transition-colors divide-x divide-slate-100 font-semibold text-slate-700"
                  >
                    <td className="px-4 py-3 font-bold">
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg border border-blue-100 uppercase text-[10px] tracking-wider font-black">
                        {role.name}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-500">
                      {role.description}
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-xs font-black text-slate-700">
                        {role.createdBy}
                      </div>
                      <div className="text-[10px] text-slate-400 font-bold tracking-tight">
                        {role.createdDate}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-xs font-black text-slate-700">
                        {role.modifiedBy}
                      </div>
                      <div className="text-[10px] text-slate-400 font-bold tracking-tight">
                        {role.modifiedDate}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => onEditRole(role)}
                          className="p-2 bg-blue-50 hover:bg-blue-600 text-blue-500 hover:text-white rounded-lg transition-all border border-blue-200 active:scale-90"
                          title="Edit Permissions"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          className="p-2 bg-red-50 hover:bg-red-600 text-red-500 hover:text-white rounded-lg transition-all border border-red-200 active:scale-90"
                          title="Delete Role"
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
          <div className="px-6 py-4 bg-[#f8f9fa] border-t border-slate-200 flex items-center justify-between font-bold text-slate-500">
            <div className="text-[11px] uppercase tracking-widest">
              Total {filteredRoles.length} Roles Defined
            </div>
            <div className="text-[10px] text-[#004a99] italic uppercase tracking-tighter">
              Access Control Management
            </div>
          </div>
        </div>
      </main>

      {/* --- ADD ROLE MODAL --- */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-4xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 font-sans">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-[#004a99] text-white">
              <div className="flex items-center space-x-3">
                <ShieldCheck size={24} />
                <h3 className="text-lg font-black uppercase tracking-tight">
                  เพิ่มบทบาทใหม่ (Add Role)
                </h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase ml-1 tracking-widest">
                  Role Name*
                </label>
                <input
                  type="text"
                  value={newRole.name}
                  onChange={(e) =>
                    setNewRole({
                      ...newRole,
                      name: e.target.value.toUpperCase(),
                    })
                  }
                  placeholder="เช่น WAREHOUSE_MGR"
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase ml-1 tracking-widest">
                  Description
                </label>
                <textarea
                  rows="3"
                  value={newRole.description}
                  onChange={(e) =>
                    setNewRole({ ...newRole, description: e.target.value })
                  }
                  placeholder="ระบุรายละเอียดหน้าที่ของบทบาทนี้..."
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm resize-none"
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
                <p className="text-[10px] font-bold text-blue-700 leading-relaxed uppercase">
                  หมายเหตุ:
                  ชื่อบทบาทควรเป็นภาษาอังกฤษตัวพิมพ์ใหญ่และไม่มีช่องว่าง
                  เพื่อความถูกต้องในการประมวลผลสิทธิ์ในระบบ
                </p>
              </div>
            </div>

            <div className="p-6 bg-slate-50 border-t flex space-x-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-3.5 font-black text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-all text-xs"
              >
                ยกเลิก
              </button>
              <button className="flex-1 py-3.5 bg-[#004a99] text-white font-black rounded-xl shadow-lg active:scale-95 border-b-4 border-blue-900 flex items-center justify-center space-x-2 text-xs">
                <Save size={16} /> <span>Save Role</span>
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
    <label className="text-xs font-bold text-slate-600 uppercase">
      {label}
    </label>
    <input
      className="w-full px-3 py-2 bg-white border border-slate-300 rounded focus:border-blue-500 outline-none text-sm font-semibold transition-all"
      {...props}
    />
  </div>
);

export default RolesManagement;
