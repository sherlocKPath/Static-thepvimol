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
  EyeOff,
  UserCircle,
  Power,
  ChevronDown,
} from "lucide-react";

const UserSettings = ({ user, onBack }) => {
  const [activeTab, setActiveTab] = useState("profile");

  // จัดการ State ข้อมูลพนักงาน
  const [formData, setFormData] = useState({
    username: user?.username || "widely",
    role: user?.role || "Super Admin",
    isActive: user?.status === "Active" || true,
    firstName: user?.fullName?.split(" ")[0] || "PTK",
    lastName: user?.fullName?.split(" ")[1] || "widely",
    email: user?.email || "PTK@widelynext.co.th",
    phone: "062-492-2196",
  });

  const [passwords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [showPass, setShowPass] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleActive = () => {
    setFormData((prev) => ({ ...prev, isActive: !prev.isActive }));
  };

  return (
    <div className="flex min-h-screen bg-[#f8f9fa] font-sans overflow-hidden text-slate-700 tracking-tight">
      {/* --- ฝั่งซ้าย: Navigation Sidebar --- */}
      <div className="w-80 bg-white border-r border-slate-200 flex-col hidden lg:flex animate-in fade-in slide-in-from-left duration-500">
        {/* Profile Identity Header (เพิ่มกลับตามสั่ง) */}
        <div className="p-10 flex flex-col items-center border-b border-slate-50 bg-slate-50/30">
          <div className="w-20 h-20 bg-[#001d3d] rounded-[1.8rem] flex items-center justify-center text-white font-black text-3xl shadow-xl mb-4 border-4 border-white">
            {formData.firstName[0]}
          </div>
          <h3 className="text-slate-900 font-black text-lg leading-tight text-center">
            {formData.firstName} {formData.lastName}
          </h3>
          <p className="text-[#004a99] text-[10px] font-black uppercase tracking-[0.15em] mt-1 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            {formData.role}
          </p>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-1">
          <NavTabButton
            active={activeTab === "profile"}
            onClick={() => setActiveTab("profile")}
            icon={<UserCircle size={20} />}
            label="Profile"
            detail="Manage your profile"
          />
          <NavTabButton
            active={activeTab === "password"}
            onClick={() => setActiveTab("password")}
            icon={<Lock size={20} />}
            label="Change Password"
            detail="Manage your password"
          />
        </nav>

        <div className="p-10 text-[9px] text-slate-300 font-black uppercase tracking-[0.3em] text-center">
          Thepvimol Production v1.0
        </div>
      </div>

      {/* --- ฝั่งขวา: Main Content Area --- */}
      <div className="flex-1 overflow-y-auto pb-20 animate-in slide-in-from-right duration-500">
        <div className="max-w-4xl mx-auto p-6 lg:p-12">
          {/* Header & Back Button */}
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
              {activeTab === "profile" ? "Profile" : "Security"}
            </h1>
            <button
              onClick={onBack}
              className="flex items-center space-x-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 font-black text-[10px] hover:bg-slate-50 transition-all shadow-sm active:scale-95 border-b-4 uppercase tracking-widest"
            >
              <ChevronLeft size={16} /> <span>BACK TO LIST</span>
            </button>
          </div>

          <div className="space-y-12">
            {activeTab === "profile" ? (
              /* --- TAB 1: PROFILE INFO --- */
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Email (Editable ตามสั่ง) */}
                  <InputWrapper label="Email Address">
                    <div className="relative">
                      <Mail
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
                        size={18}
                      />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-2xl font-bold text-slate-900 outline-none focus:ring-4 focus:ring-indigo-50 transition-all text-sm"
                      />
                    </div>
                  </InputWrapper>

                  {/* Role (Dropdown พร้อมลูกศรท้ายฟิลด์) */}
                  <InputWrapper label="System Role">
                    <div className="relative group">
                      <Briefcase
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#004a99] transition-colors"
                        size={18}
                      />
                      <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full pl-12 pr-12 py-4 bg-white border border-slate-200 rounded-2xl font-black text-slate-900 outline-none focus:ring-4 focus:ring-indigo-50 transition-all text-sm cursor-pointer appearance-none"
                      >
                        <option value="Super Admin">Super Admin</option>
                        <option value="Supervisor">Supervisor</option>
                        <option value="Operator">Operator</option>
                        <option value="Accounting">Accounting</option>
                      </select>
                      {/* เพิ่มไอคอนลูกศรที่ส่วนท้าย */}
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-focus-within:text-[#004a99] transition-colors">
                        <ChevronDown size={18} />
                      </div>
                    </div>
                  </InputWrapper>
                </div>

                <div className="pt-8 border-t border-slate-100">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-8">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <InputWrapper label="First Name">
                      <div className="relative">
                        <User
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
                          size={18}
                        />
                        <input
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-2xl font-bold text-slate-900 outline-none focus:ring-4 focus:ring-indigo-50 transition-all text-sm"
                        />
                      </div>
                    </InputWrapper>
                    <InputWrapper label="Last Name">
                      <div className="relative">
                        <User
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
                          size={18}
                        />
                        <input
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-2xl font-bold text-slate-900 outline-none focus:ring-4 focus:ring-indigo-50 transition-all text-sm"
                        />
                      </div>
                    </InputWrapper>
                    <InputWrapper label="Phone">
                      <div className="relative">
                        <Phone
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
                          size={18}
                        />
                        <input
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-2xl font-bold text-slate-900 outline-none focus:ring-4 focus:ring-indigo-50 transition-all text-sm"
                        />
                      </div>
                    </InputWrapper>
                  </div>
                </div>

                {/* Status Toggle Section */}
                <div className="pt-8 border-t border-slate-100">
                  <div className="flex items-center justify-between p-8 bg-slate-50/50 rounded-[2.5rem] border border-slate-100">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`p-3 rounded-2xl shadow-sm ${formData.isActive ? "bg-emerald-100 text-emerald-600" : "bg-slate-200 text-slate-400"}`}
                      >
                        <Power size={22} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">
                          Account Visibility
                        </p>
                        <p className="text-sm font-black text-slate-900 leading-none">
                          {formData.isActive
                            ? "เปิดใช้งาน (Active Status)"
                            : "ระงับการใช้งาน (Inactive Status)"}
                        </p>
                      </div>
                    </div>
                    <div
                      onClick={toggleActive}
                      className={`w-16 h-9 rounded-full p-1 cursor-pointer transition-all duration-300 relative ${formData.isActive ? "bg-emerald-500 shadow-lg shadow-emerald-100" : "bg-slate-300"}`}
                    >
                      <div
                        className={`w-7 h-7 bg-white rounded-full shadow-md transition-transform duration-300 transform ${formData.isActive ? "translate-x-7" : "translate-x-0"}`}
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              /* --- TAB 2: PASSWORD SETTINGS --- */
              <div className="max-w-xl space-y-8 animate-in slide-in-from-bottom-4 duration-500">
                <PassInput
                  label="Current Password"
                  value={passwords.current}
                  show={showPass.current}
                  onToggle={() =>
                    setShowPass({ ...showPass, current: !showPass.current })
                  }
                />
                <PassInput
                  label="New Password"
                  value={passwords.new}
                  show={showPass.new}
                  onToggle={() =>
                    setShowPass({ ...showPass, new: !showPass.new })
                  }
                />
                <PassInput
                  label="Confirm New Password"
                  value={passwords.confirm}
                  show={showPass.confirm}
                  onToggle={() =>
                    setShowPass({ ...showPass, confirm: !showPass.confirm })
                  }
                />
              </div>
            )}

            {/* Footer Actions */}
            <div className="pt-12 flex flex-col md:flex-row justify-end items-center gap-4 border-t border-slate-100 mt-12">
              <button
                onClick={onBack}
                className="text-slate-400 hover:text-slate-900 font-black text-[11px] uppercase tracking-[0.2em] transition-all px-6 py-4"
              >
                Discard Changes
              </button>
              <button className="w-full md:w-auto flex items-center justify-center space-x-3 px-12 py-4 bg-[#001d3d] text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl hover:bg-black transition-all active:scale-95 border-b-4 border-black">
                <CheckCircle2 size={16} /> <span>Save All Changes</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const NavTabButton = ({ active, onClick, icon, label, detail }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center p-5 rounded-2xl transition-all duration-300 relative ${active ? "bg-indigo-50/80 text-[#004a99]" : "text-slate-400 hover:bg-slate-50"}`}
  >
    <div className={`${active ? "text-[#004a99]" : "opacity-40"}`}>{icon}</div>
    <div className="ml-4 text-left leading-tight">
      <p className="text-sm font-black tracking-tight">{label}</p>
      <p className="text-[10px] font-bold opacity-60 mt-0.5 tracking-tighter">
        {detail}
      </p>
    </div>
  </button>
);

const InputWrapper = ({ label, children }) => (
  <div className="space-y-2">
    <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1">
      {label}
    </label>
    {children}
  </div>
);

const PassInput = ({ label, show, onToggle }) => (
  <div className="space-y-2 group">
    <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1 group-focus-within:text-[#004a99] transition-colors">
      {label}
    </label>
    <div className="relative">
      <Lock
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#004a99] transition-colors"
        size={18}
      />
      <input
        type={show ? "text" : "password"}
        className="w-full pl-12 pr-14 py-4 bg-white border border-slate-200 rounded-2xl font-bold text-slate-900 outline-none focus:ring-4 focus:ring-indigo-50 transition-all text-sm"
      />
      <button
        onClick={onToggle}
        className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-900 transition-colors"
      >
        {show ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  </div>
);

export default UserSettings;
