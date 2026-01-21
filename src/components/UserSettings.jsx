import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Shield,
  Briefcase,
  ChevronLeft,
  Save,
  CheckCircle2,
  Settings,
  Circle,
  Lock,
  Eye,
  EyeOff
} from "lucide-react";

const UserSettings = ({ user, onBack }) => {
  // 1. State สำหรับคุมหน้าเมนูย่อย (profile หรือ password)
  const [activeTab, setActiveTab] = useState("profile");

  // 2. จัดการ State ข้อมูลพนักงาน
  const [formData, setFormData] = useState({
    username: user?.username || "widely",
    role: user?.role || "SUPERADMIN",
    position: "Production Supervisor",
    manager: "Admin Staff",
    isActive: user?.status === "Active" || true,
    firstName: user?.fullName?.split(" ")[0] || "PT",
    lastName: user?.fullName?.split(" ")[1] || "widely",
    email: user?.email || "PT@widelynext.co.th",
    phone: "062-492-2196",
  });

  // 3. State สำหรับ Change Password
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: ""
  });
  const [showPass, setShowPass] = useState({ current: false, new: false, confirm: false });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const toggleActive = () => {
    setFormData(prev => ({ ...prev, isActive: !prev.isActive }));
  };

  return (
    <div className="flex min-h-screen bg-[#f8fafc] font-sans">
      
      {/* --- ฝั่งซ้าย: Sidebar เมนูย่อย --- */}
      <div className="w-72 bg-white border-r border-slate-200 p-8 hidden lg:block animate-in fade-in duration-500">
        <div className="flex items-center space-x-3 mb-10">
           <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg shadow-blue-200">
              <Settings size={20} />
           </div>
           <h2 className="text-xl font-black text-slate-800 tracking-tight">User Settings</h2>
        </div>
        
        <div className="space-y-3">
          <button 
            onClick={() => setActiveTab("profile")}
            className={`w-full flex items-center space-x-4 px-5 py-4 rounded-2xl font-black transition-all border ${
              activeTab === "profile" 
              ? "bg-blue-50 text-blue-700 border-blue-100 shadow-sm" 
              : "text-slate-400 border-transparent hover:bg-slate-50"
            }`}
          >
            <User size={18} />
            <div className="text-left">
              <p className="text-sm">Profile Info</p>
              <p className={`text-[10px] font-bold opacity-80 uppercase tracking-tighter ${activeTab === "profile" ? "text-blue-400" : "text-slate-400"}`}>Account Management</p>
            </div>
          </button>

          <button 
            onClick={() => setActiveTab("password")}
            className={`w-full flex items-center space-x-4 px-5 py-4 rounded-2xl font-black transition-all border ${
              activeTab === "password" 
              ? "bg-blue-50 text-blue-700 border-blue-100 shadow-sm" 
              : "text-slate-400 border-transparent hover:bg-slate-50"
            }`}
          >
            <Lock size={18} />
            <div className="text-left">
              <p className="text-sm">Change Password</p>
              <p className={`text-[10px] font-bold opacity-80 uppercase tracking-tighter ${activeTab === "password" ? "text-blue-400" : "text-slate-400"}`}>Security Settings</p>
            </div>
          </button>
        </div>
      </div>

      {/* --- ฝั่งขวา: ส่วนฟอร์มข้อมูลหลัก --- */}
      <div className="flex-1 overflow-y-auto animate-in slide-in-from-right duration-500 pb-16">
        <div className="max-w-4xl mx-auto p-6 lg:p-12">
          
          <div className="flex justify-between items-end mb-8">
            <div>
              <h1 className="text-3xl font-black text-slate-800 tracking-tight">
                {activeTab === "profile" ? "Manage User" : "Security Settings"}
              </h1>
              <p className="text-slate-400 font-bold text-sm mt-1 uppercase tracking-widest">
                {activeTab === "profile" ? "แก้ไขข้อมูลและสิทธิ์การใช้งาน" : "แก้ไขรหัสผ่านเพื่อความปลอดภัย"}
              </p>
            </div>
            <button onClick={onBack} className="flex items-center space-x-2 px-6 py-2.5 bg-white border border-slate-200 rounded-2xl text-slate-600 font-black text-xs hover:bg-slate-50 transition-all shadow-sm active:scale-95 border-b-4">
              <ChevronLeft size={16} /> <span>BACK TO LIST</span>
            </button>
          </div>

          <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-slate-100 overflow-hidden transition-all duration-500">
            
            {activeTab === "profile" ? (
              /* --- TAB 1: PROFILE INFO --- */
              <>
                <div className="p-8 md:p-12 bg-slate-50/50 border-b border-slate-100">
                  <div className="flex items-center space-x-3 mb-8">
                    <Shield size={20} className="text-[#004a99]" />
                    <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">1. Account Configuration</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <InputGroup label="Username (Primary ID)" icon={<User size={18} />}>
                      <input disabled value={formData.username} className="w-full px-5 py-3 bg-white border border-slate-200 rounded-2xl text-slate-400 font-bold outline-none cursor-not-allowed italic" />
                    </InputGroup>
                    <InputGroup label="System Role" icon={<Shield size={18} />}>
                      <select name="role" value={formData.role} onChange={handleChange} className="w-full px-5 py-3 bg-white border border-slate-200 rounded-2xl text-slate-700 font-black outline-none focus:ring-4 focus:ring-blue-500/10 transition-all cursor-pointer">
                        <option value="SUPERADMIN">SUPERADMIN</option>
                        <option value="PRODUCTION_SUP">PRODUCTION_SUP</option>
                        <option value="OPERATOR">OPERATOR</option>
                        <option value="WAREHOUSE">WAREHOUSE</option>
                      </select>
                    </InputGroup>
                    <InputGroup label="Position" icon={<Briefcase size={18} />}>
                      <input name="position" value={formData.position} onChange={handleChange} className="w-full px-5 py-3 bg-white border border-slate-200 rounded-2xl text-slate-700 font-bold outline-none focus:ring-4 focus:ring-blue-500/10 transition-all" />
                    </InputGroup>
                    <div className="space-y-2 flex flex-col justify-end pb-1">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Account Access Status</label>
                      <div onClick={toggleActive} className={`flex items-center justify-between p-3 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${formData.isActive ? "bg-emerald-50 border-emerald-200 shadow-sm" : "bg-slate-100 border-slate-200"}`}>
                        <div className="flex items-center space-x-3 ml-2">
                           <Circle size={12} fill={formData.isActive ? "#10b981" : "#94a3b8"} className={formData.isActive ? "text-emerald-500" : "text-slate-400"} />
                           <span className={`text-sm font-black uppercase tracking-widest ${formData.isActive ? 'text-emerald-700' : 'text-slate-500'}`}>{formData.isActive ? 'Active Now' : 'Inactive / Disabled'}</span>
                        </div>
                        <div className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${formData.isActive ? 'bg-emerald-500' : 'bg-slate-300'}`}>
                           <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${formData.isActive ? 'left-7' : 'left-1'}`}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-8 md:p-12">
                  <div className="flex items-center space-x-3 mb-8">
                    <Mail size={20} className="text-[#004a99]" />
                    <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">2. Personal Information</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <InputGroup label="First Name" required>
                      <input name="firstName" value={formData.firstName} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 outline-none focus:ring-4 focus:ring-blue-500/10 transition-all" />
                    </InputGroup>
                    <InputGroup label="Last Name" required>
                      <input name="lastName" value={formData.lastName} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 outline-none focus:ring-4 focus:ring-blue-500/10 transition-all" />
                    </InputGroup>
                    <InputGroup label="Email Address" icon={<Mail size={18} />} required>
                      <input name="email" value={formData.email} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 outline-none focus:ring-4 focus:ring-blue-500/10 transition-all" />
                    </InputGroup>
                    <InputGroup label="Contact Phone" icon={<Phone size={18} />}>
                      <input name="phone" value={formData.phone} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 outline-none focus:ring-4 focus:ring-blue-500/10 transition-all" />
                    </InputGroup>
                  </div>
                </div>
              </>
            ) : (
              /* --- TAB 2: CHANGE PASSWORD --- */
              <div className="p-8 md:p-12 animate-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-center space-x-3 mb-8">
                  <Lock size={20} className="text-orange-500" />
                  <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">Update Password</h3>
                </div>
                
                <div className="max-w-xl space-y-8">
                  <InputGroup label="รหัสผ่านปัจจุบัน (Current Password)" required>
                    <div className="relative">
                      <input 
                        type={showPass.current ? "text" : "password"}
                        name="current"
                        value={passwords.current}
                        onChange={handlePasswordChange}
                        className="w-full pl-5 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all" 
                      />
                      <button onClick={() => setShowPass({...showPass, current: !showPass.current})} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                        {showPass.current ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </InputGroup>

                  <div className="h-px bg-slate-100 w-full"></div>

                  <InputGroup label="รหัสผ่านใหม่ (New Password)" required>
                    <div className="relative">
                      <input 
                        type={showPass.new ? "text" : "password"}
                        name="new"
                        value={passwords.new}
                        onChange={handlePasswordChange}
                        className="w-full pl-5 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all" 
                      />
                      <button onClick={() => setShowPass({...showPass, new: !showPass.new})} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                        {showPass.new ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </InputGroup>

                  <InputGroup label="ยืนยันรหัสผ่านใหม่ (Confirm New Password)" required>
                    <div className="relative">
                      <input 
                        type={showPass.confirm ? "text" : "password"}
                        name="confirm"
                        value={passwords.confirm}
                        onChange={handlePasswordChange}
                        className="w-full pl-5 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all" 
                      />
                      <button onClick={() => setShowPass({...showPass, confirm: !showPass.confirm})} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                        {showPass.confirm ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </InputGroup>

                  <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                    <p className="text-xs font-bold text-blue-700 leading-relaxed">
                      <span className="flex items-center mb-1 uppercase tracking-widest font-black"><Shield size={14} className="mr-2" /> ข้อกำหนดความปลอดภัย:</span>
                      • รหัสผ่านควรมีความยาวอย่างน้อย 8 ตัวอักษร <br/>
                      • ประกอบด้วยตัวพิมพ์ใหญ่ ตัวพิมพ์เล็ก และตัวเลขอย่างน้อยหนึ่งตัว
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* --- Footer Buttons --- */}
            <div className="px-12 py-8 bg-slate-50 border-t border-slate-100 flex flex-col md:flex-row justify-end items-center gap-4">
              <button onClick={onBack} className="w-full md:w-auto px-8 py-3.5 text-slate-400 hover:text-slate-600 font-black text-xs uppercase tracking-[0.2em] transition-all">
                Discard Changes
              </button>
              
              <button className="w-full md:w-auto flex items-center justify-center space-x-2 px-8 py-4 bg-slate-800 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-900 transition-all shadow-lg active:scale-95">
                <CheckCircle2 size={16} /> <span>Save & Exit</span>
              </button>
              
              <button className={`w-full md:w-auto flex items-center justify-center space-x-2 px-10 py-4 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl active:scale-95 border-b-4 ${activeTab === "profile" ? "bg-[#004a99] hover:bg-blue-800 border-blue-900 shadow-blue-200" : "bg-orange-500 hover:bg-orange-600 border-orange-700 shadow-orange-200"}`}>
                <Save size={16} /> <span>{activeTab === "profile" ? "Apply Changes" : "Update Password"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Input Wrapper
const InputGroup = ({ label, icon, children, required }) => (
  <div className="space-y-2 group">
    <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-blue-600">
      {label} {required && <span className="text-red-500 text-lg">*</span>}
    </label>
    <div className="relative">
      {icon && (
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
          {icon}
        </div>
      )}
      <div className={icon ? "pl-12" : ""}>{children}</div>
    </div>
  </div>
);

export default UserSettings;