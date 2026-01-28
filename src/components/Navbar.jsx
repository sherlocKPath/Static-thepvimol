import React, { useState } from "react";
import {
  Menu,
  X,
  LayoutDashboard,
  ClipboardList,
  Settings,
  LogOut,
  User,
  Factory,
  FileBarChart,
  ChevronDown,
  Box,
  Package,
  Bell,
  Scissors,
  Users,
  ChevronUp,
  ShieldCheck,
  Database,
  Home,
  Handshake,
  Lock,
} from "lucide-react";

const Navbar = ({
  currentPage,
  setCurrentPage,
  isSidebarOpen,
  setIsSidebarOpen,
  onSignOut,
}) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isProductionOpen, setIsProductionOpen] = useState(false);
  const [isMasterDataOpen, setIsMasterDataOpen] = useState(false);
  const [isPermissionOpen, setIsPermissionOpen] = useState(false);

  const mainMenuItems = [
    { id: "dashboard", label: "Home", icon: <Home size={18} /> },
    { id: "warehouselist", label: "Warehouse", icon: <Package size={18} /> },
    { id: "reports", label: "Reports", icon: <FileBarChart size={18} /> },
  ];

  const productionSubItems = [
    {
      id: "jobs",
      label: "Job Orders",
      detail: "รายการสั่งผลิต",
      icon: <LayoutDashboard size={16} />,
    },
    {
      id: "matlist",
      label: "Materials List",
      detail: "รายการวัตถุดิบ",
      icon: <ClipboardList size={16} />,
    },
    {
      id: "molding",
      label: "Molding",
      detail: "ขึ้นรูปสินค้า",
      icon: <Settings size={16} />,
    },
    {
      id: "writeoff",
      label: "Write-off",
      detail: "ตัดสินค้า",
      icon: <Scissors size={16} />,
    },
    {
      id: "unpack",
      label: "Unpack",
      detail: "แกะสินค้า",
      icon: <Users size={16} />,
    },
  ];

  const permissionSubItems = [
    {
      id: "staff_mgmt",
      label: "Staff",
      detail: "จัดการข้อมูลพนักงาน",
      icon: <Users size={16} />,
    },
    {
      id: "user_mgmt",
      label: "Users",
      detail: "จัดการผู้ใช้งานระบบ",
      icon: <User size={16} />,
    },
    {
      id: "role_mgmt",
      label: "Roles",
      detail: "จัดการสิทธิ์การใช้งาน",
      icon: <ShieldCheck size={16} />,
    },
  ];

  const masterDataSubItems = [
    {
      id: "master_machines",
      label: "Machines",
      detail: "จัดการข้อมูลเครื่องจักร",
      icon: <Settings size={16} />,
    },
    {
      id: "master_packsize",
      label: "Item pack size",
      detail: "จัดการขนาดบรรจุสินค้า",
      icon: <Box size={16} />,
    },
  ];

  return (
    <>
      <aside
        className={`bg-[#001d3d] text-white h-screen flex flex-col fixed left-0 top-0 z-60 transition-all duration-300 shadow-2xl w-72 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="pt-8 pb-6 px-10 flex flex-col items-center border-b border-white/5">
          <div className="bg-white p-3 rounded-4xl shadow-xl border border-white/10 flex items-center justify-center w-full aspect-2/1 overflow-hidden cursor-pointer transition-transform hover:scale-105">
            <img
              src="https://www.thepvimol.co.th/wp-content/uploads/2025/07/thepvimol-logo.png"
              alt="Thepvimol Logo"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <nav className="flex-1 mt-4 px-5 space-y-1 overflow-y-auto no-scrollbar pb-10">
          {/* --- 1. HOME --- */}
          <button
            onClick={() => setCurrentPage("dashboard")}
            className={`w-full flex items-center p-3.5 rounded-2xl transition-all duration-200 group relative cursor-pointer ${currentPage === "dashboard" ? "bg-linear-to-r from-[#004a99] to-[#003366] text-white shadow-lg" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}
          >
            <div
              className={
                currentPage === "dashboard"
                  ? "scale-110"
                  : "group-hover:scale-110"
              }
            >
              <Home size={18} />
            </div>
            <span className="ml-4 font-bold text-sm tracking-tight">Home</span>
            {currentPage === "dashboard" && (
              <div className="absolute left-0 w-1.5 h-6 bg-yellow-400 rounded-r-full shadow-[0_0_10px_#facc15]" />
            )}
          </button>

          {/* --- 2. PRODUCTION DROPDOWN --- */}
          <div className="space-y-0.5">
            <button
              onClick={() => setIsProductionOpen(!isProductionOpen)}
              className={`w-full flex items-center justify-between p-3.5 rounded-2xl transition-all duration-200 group cursor-pointer ${isProductionOpen || productionSubItems.some((s) => s.id === currentPage) ? "text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}
            >
              <div className="flex items-center">
                <Box
                  size={18}
                  className={
                    isProductionOpen ? "text-blue-400" : "group-hover:scale-110"
                  }
                />
                <span className="ml-4 font-bold text-sm tracking-tight">
                  Production
                </span>
              </div>
              {isProductionOpen ? (
                <ChevronUp size={14} />
              ) : (
                <ChevronDown size={14} />
              )}
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 px-1 ${isProductionOpen ? "max-h-125 opacity-100 mb-2 mt-1" : "max-h-0 opacity-0"}`}
            >
              {productionSubItems.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => setCurrentPage(sub.id)}
                  className={`w-full flex items-center py-2.5 pl-6 pr-4 rounded-xl transition-all group relative mt-1 cursor-pointer ${currentPage === sub.id ? "bg-white/10 text-white font-bold" : "text-slate-400 hover:text-white hover:bg-white/5"}`}
                >
                  <div
                    className={`${currentPage === sub.id ? "text-yellow-400" : "opacity-50"}`}
                  >
                    {sub.icon}
                  </div>
                  <div className="flex flex-col items-start leading-tight ml-4">
                    <span className="text-[13px] font-medium">{sub.label}</span>
                    <span className="text-[9px] opacity-40 font-normal">
                      {sub.detail}
                    </span>
                  </div>
                  {currentPage === sub.id && (
                    <div className="absolute left-0 w-1 h-4 bg-yellow-400 rounded-full ml-1" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* --- 3. WAREHOUSE & REPORTS --- */}
          {mainMenuItems.slice(1).map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`w-full flex items-center p-3.5 rounded-2xl transition-all duration-200 group relative cursor-pointer ${currentPage === item.id ? "bg-linear-to-r from-[#004a99] to-[#003366] text-white shadow-lg" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}
            >
              <div
                className={
                  currentPage === item.id
                    ? "scale-110"
                    : "group-hover:scale-110"
                }
              >
                {item.icon}
              </div>
              <span className="ml-4 font-bold text-sm tracking-tight">
                {item.label}
              </span>
              {currentPage === item.id && (
                <div className="absolute left-0 w-1.5 h-6 bg-yellow-400 rounded-r-full shadow-[0_0_10px_#facc15]" />
              )}
            </button>
          ))}

          {/* --- 4. PERMISSION DROPDOWN --- */}
          <div className="space-y-0.5">
            <button
              onClick={() => setIsPermissionOpen(!isPermissionOpen)}
              className={`w-full flex items-center justify-between p-3.5 rounded-2xl transition-all duration-200 group cursor-pointer ${isPermissionOpen || permissionSubItems.some((s) => s.id === currentPage) ? "text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}
            >
              <div className="flex items-center">
                <Lock
                  size={18}
                  className={
                    isPermissionOpen ? "text-blue-400" : "group-hover:scale-110"
                  }
                />
                <span className="ml-4 font-bold text-sm tracking-tight">
                  Permission
                </span>
              </div>
              {isPermissionOpen ? (
                <ChevronUp size={14} />
              ) : (
                <ChevronDown size={14} />
              )}
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 px-1 ${isPermissionOpen ? "max-h-64 opacity-100 mb-2 mt-1" : "max-h-0 opacity-0"}`}
            >
              {permissionSubItems.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => setCurrentPage(sub.id)}
                  className={`w-full flex items-center py-2.5 pl-6 pr-4 rounded-xl transition-all group relative mt-1 cursor-pointer ${currentPage === sub.id ? "bg-white/10 text-white font-bold" : "text-slate-400 hover:text-white hover:bg-white/5"}`}
                >
                  <div
                    className={`${currentPage === sub.id ? "text-yellow-400" : "opacity-50"}`}
                  >
                    {sub.icon}
                  </div>
                  <div className="flex flex-col items-start leading-tight ml-4">
                    <span className="text-[13px] font-medium">{sub.label}</span>
                    <span className="text-[9px] opacity-40 font-normal">
                      {sub.detail}
                    </span>
                  </div>
                  {currentPage === sub.id && (
                    <div className="absolute left-0 w-1 h-4 bg-yellow-400 rounded-full ml-1" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* --- 5. MASTER DATA DROPDOWN --- */}
          <div className="space-y-0.5">
            <button
              onClick={() => setIsMasterDataOpen(!isMasterDataOpen)}
              className={`w-full flex items-center justify-between p-3.5 rounded-2xl transition-all duration-200 group cursor-pointer ${isMasterDataOpen || masterDataSubItems.some((s) => s.id === currentPage) ? "text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}
            >
              <div className="flex items-center">
                <Database
                  size={18}
                  className={
                    isMasterDataOpen ? "text-blue-400" : "group-hover:scale-110"
                  }
                />
                <span className="ml-4 font-bold text-sm tracking-tight">
                  Master Data
                </span>
              </div>
              {isMasterDataOpen ? (
                <ChevronUp size={14} />
              ) : (
                <ChevronDown size={14} />
              )}
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 px-1 ${isMasterDataOpen ? "max-h-64 opacity-100 mb-2 mt-1" : "max-h-0 opacity-0"}`}
            >
              {masterDataSubItems.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => setCurrentPage(sub.id)}
                  className={`w-full flex items-center py-2.5 pl-6 pr-4 rounded-xl transition-all group relative mt-1 cursor-pointer ${currentPage === sub.id ? "bg-white/10 text-white font-bold" : "text-slate-400 hover:text-white hover:bg-white/5"}`}
                >
                  <div
                    className={`${currentPage === sub.id ? "text-yellow-400" : "opacity-50"}`}
                  >
                    {sub.icon}
                  </div>
                  <div className="flex flex-col items-start leading-tight ml-4">
                    <span className="text-[13px] font-medium">{sub.label}</span>
                    <span className="text-[9px] opacity-40 font-normal">
                      {sub.detail}
                    </span>
                  </div>
                  {currentPage === sub.id && (
                    <div className="absolute left-0 w-1 h-4 bg-yellow-400 rounded-full ml-1" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </nav>

        <div className="p-6 text-[8px] text-slate-500 font-black uppercase tracking-[0.3em] text-center border-t border-white/5 bg-[#00152b]">
          Thepvimol Production v1.0
        </div>
      </aside>

      <header
        className={`fixed top-0 right-0 bg-white/90 backdrop-blur-xl h-16 flex items-center justify-between px-8 border-b border-slate-100 z-50 transition-all duration-300 w-full ${isSidebarOpen ? "pl-75" : "pl-8"}`}
      >
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-slate-100 rounded-xl transition-all text-[#004a99] border border-slate-200 cursor-pointer active:scale-95"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div className="flex items-center bg-blue-50 p-1 rounded-xl border border-blue-100 shadow-sm">
            <button
              onClick={() => setCurrentPage("dashboard")}
              className="p-2 hover:bg-white rounded-lg transition-all text-blue-600 shadow-sm hover:shadow-md active:scale-90 cursor-pointer"
              title="กลับหน้าหลัก"
            >
              <Home size={18} />
            </button>
            <div className="h-4 w-px bg-blue-200 mx-1"></div>
            <div className="flex items-center space-x-2 px-3 py-1.5">
              <Factory className="w-4 h-4 text-blue-600" />
              <span className="text-[11px] font-black text-blue-900 uppercase tracking-tighter">
                โรงงาน : กรุงเทพ
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-3 p-1.5 hover:bg-slate-50 rounded-xl transition-all cursor-pointer"
            >
              <div className="text-right hidden md:block leading-tight pr-1">
                <p className="text-[11px] font-black text-slate-800 uppercase">
                  Admin Staff
                </p>
                <p className="text-[9px] font-bold text-slate-400 tracking-tight">
                  Production Dept.
                </p>
              </div>
              <div className="w-9 h-9 bg-linear-to-br from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center text-[#001d3d] font-black shadow-md border border-white text-sm">
                A
              </div>
              <ChevronDown
                className={`w-3 h-3 text-slate-400 transition-transform ${isProfileOpen ? "rotate-180" : ""}`}
              />
            </button>
            {isProfileOpen && (
              <>
                <div
                  className="fixed inset-0 z-70"
                  onClick={() => setIsProfileOpen(false)}
                ></div>
                <div className="absolute right-0 mt-4 w-56 bg-white rounded-2xl shadow-[0_15px_50px_rgba(0,0,0,0.1)] border border-slate-100 py-3 z-80 animate-in fade-in zoom-in-95 origin-top-right font-sans text-slate-700">
                  <div className="px-6 py-2 border-b border-slate-50 mb-2">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                      Signed in as
                    </p>
                    <p className="text-[13px] font-black text-[#004a99] truncate">
                      admin@thepvimol.com
                    </p>
                  </div>
                  <button className="w-full text-left px-6 py-2.5 text-[13px] hover:bg-blue-50 flex items-center font-bold transition-all cursor-pointer">
                    <User size={16} className="opacity-40 mr-3" /> Profile
                  </button>
                  <button className="w-full text-left px-6 py-2.5 text-[13px] hover:bg-blue-50 flex items-center font-bold transition-all cursor-pointer">
                    <Settings size={16} className="opacity-40 mr-3" /> Settings
                  </button>
                  <div className="h-px bg-slate-100 my-2 mx-6"></div>
                  <button
                    onClick={onSignOut}
                    className="w-full text-left px-6 py-2.5 text-xs text-red-500 hover:bg-red-50 flex items-center font-black uppercase tracking-widest transition-all cursor-pointer group"
                  >
                    <LogOut size={14} className="mr-3" /> Sign out
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
