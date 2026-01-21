import React, { useState } from "react";
import { Check, ChevronDown, ChevronRight, ChevronLeft, Save, ShieldCheck } from "lucide-react";

const PermissionSettings = ({ role, onBack }) => {
  const modules = [
    { id: "jobs", name: "Job Orders", type: "GROUP", children: [
        { id: "job_list", name: "View Job List", type: "BASIC" },
        { id: "job_detail", name: "Manage Job Details", type: "BASIC" }
    ]},
    { id: "mats", name: "Materials", type: "GROUP", children: [
        { id: "mat_list", name: "Materials List", type: "BASIC" },
        { id: "mat_req", name: "Raw Material Requisition", type: "BASIC" }
    ]},
    { id: "prod", name: "Production Record", type: "GROUP", children: [
        { id: "prod_molding", name: "Product Molding", type: "BASIC" },
        { id: "prod_writeoff", name: "Product Write-off", type: "BASIC" },
        { id: "prod_unpack", name: "Product Unpack", type: "BASIC" }
    ]},
    { id: "wh", name: "Warehouse", type: "GROUP", children: [
        { id: "wh_inbound", name: "Warehouse Inbound", type: "BASIC" }
    ]},
    { id: "mgmt", name: "Management", type: "GROUP", children: [
        { id: "user_mgmt", name: "User Management", type: "BASIC" },
        { id: "role_mgmt", name: "Roles & Permissions", type: "BASIC" }
    ]},
  ];

  // 1. ปรับปรุง: เริ่มต้นให้ขยายเฉพาะกลุ่มแรก (index 0) เท่านั้น
  const [expandedGroups, setExpandedGroups] = useState(() => {
    return modules.reduce((acc, curr, index) => ({ 
      ...acc, 
      [curr.id]: index === 0 // true แค่อันแรก
    }), {});
  });

  const toggleGroup = (groupId) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  const [permissions, setPermissions] = useState(() => {
    const initialState = {};
    modules.forEach(group => {
      group.children.forEach(child => {
        ['access', 'create', 'view', 'edit', 'delete'].forEach(action => {
          initialState[`${child.id}-${action}`] = role?.name === 'SUPERADMIN';
        });
      });
    });
    return initialState;
  });

  const togglePermission = (id, action) => {
    const key = `${id}-${action}`;
    setPermissions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans">
      <main className="p-0 animate-in slide-in-from-right duration-500">
        
        {/* --- 1. Header Section --- */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 px-6 pt-2 gap-4">
          <div className="flex items-center space-x-4">
            <button 
              onClick={onBack} 
              className="p-3 bg-white hover:bg-slate-100 rounded-2xl transition-all text-slate-600 border border-slate-200 shadow-sm active:scale-90"
            >
              <ChevronLeft size={24} />
            </button>
            <div>
              <div className="flex items-center space-x-2">
                <ShieldCheck size={20} className="text-blue-600" />
                <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Module & Permission</h1>
              </div>
              <p className="text-sm font-bold text-slate-500">
                กำลังกำหนดสิทธิ์ให้กับ: <span className="text-[#004a99] bg-blue-50 px-2 py-0.5 rounded-md ml-1 border border-blue-100">{role?.name || "N/A"}</span>
              </p>
            </div>
          </div>
          <button className="flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-600 text-white px-10 py-3.5 rounded-2xl shadow-xl transition-all font-black text-sm active:scale-95 border-b-4 border-emerald-700">
            <Save size={18} /> <span>Save Changes</span>
          </button>
        </div>

        {/* --- 2. Permission Table Content --- */}
        <div className="mx-6 bg-white rounded-4xl shadow-2xl border border-slate-200 overflow-hidden mb-12">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-8 py-6 text-[11px] font-black text-slate-500 uppercase tracking-widest w-1/3">Module Name</th>
                  <th className="px-6 py-6 text-[11px] font-black text-slate-500 uppercase text-center w-32">Type</th>
                  {['Access', 'Create', 'View', 'Edit', 'Delete'].map(action => (
                    <th key={action} className="px-4 py-6 text-[11px] font-black text-slate-500 uppercase text-center">{action}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {modules.map((group) => {
                  const isExpanded = expandedGroups[group.id];
                  return (
                    <React.Fragment key={group.id}>
                      {/* Group Header Row */}
                      <tr 
                        onClick={() => toggleGroup(group.id)}
                        className={`cursor-pointer transition-colors select-none ${isExpanded ? 'bg-blue-50/30' : 'bg-white hover:bg-slate-50'}`}
                      >
                        <td className="px-8 py-5 font-black text-slate-800 flex items-center border-l-4 border-transparent active:border-blue-600 transition-all">
                          <div className={`mr-3 p-1 rounded-lg transition-all ${isExpanded ? 'bg-blue-600 text-white shadow-md rotate-180' : 'bg-slate-100 text-slate-400'}`}>
                            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                          </div>
                          {group.name}
                        </td>
                        <td className="px-6 py-5 text-center">
                          <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-md text-[9px] font-black uppercase tracking-wider border border-indigo-100">GROUP</span>
                        </td>
                        <td colSpan="5" className="px-4 py-5 text-right opacity-30 italic text-[10px] font-bold">
                          {isExpanded ? "" : ""}
                        </td>
                      </tr>

                      {/* Sub-module Items (Conditionally Rendered) */}
                      {isExpanded && group.children.map((child) => (
                        <tr key={child.id} className="hover:bg-blue-50/20 transition-colors group animate-in fade-in slide-in-from-top-1 duration-200">
                          <td className="pl-16 pr-8 py-5 font-bold text-slate-600 text-sm border-l-4 border-blue-400/20">{child.name}</td>
                          <td className="px-6 py-5 text-center">
                            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-md text-[9px] font-black uppercase tracking-wider border border-emerald-100">BASIC</span>
                          </td>
                          
                          {['access', 'create', 'view', 'edit', 'delete'].map((action) => {
                            const isChecked = permissions[`${child.id}-${action}`];
                            return (
                              <td key={action} className="px-4 py-5 text-center">
                                <div 
                                  onClick={() => togglePermission(child.id, action)}
                                  className={`mx-auto w-8 h-8 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-center 
                                    ${isChecked 
                                      ? "bg-blue-600 border-blue-600 shadow-md scale-110" 
                                      : "bg-white border-slate-200 hover:border-blue-400"}`}
                                >
                                  <Check 
                                    size={18} 
                                    strokeWidth={4} 
                                    className={`text-white transition-all duration-200 ${isChecked ? "scale-100 opacity-100" : "scale-50 opacity-0"}`} 
                                  />
                                </div>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PermissionSettings;