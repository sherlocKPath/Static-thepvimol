import React from "react";
import {
  Plus,
  Layers,
  Settings,
  Scissors,
  CheckSquare,
  Warehouse,
  ClipboardList,
  Clock,
  Activity,
  ArrowRight,
} from "lucide-react";

const Dashboard = ({ setCurrentPage, onEditMolding }) => {
  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans">
      <main className="p-8 animate-in fade-in duration-700">
        {/* --- 1. Header --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight uppercase">
              Production Dashboard
            </h1>
            <p className="text-slate-500 font-bold mt-1">
              ภาพรวมสถานะการผลิตประจำวัน :{" "}
              <span className="text-blue-600">22 ม.ค. 2569</span>
            </p>
          </div>
          <div className="flex items-center space-x-3 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
            <div className="bg-blue-50 text-blue-600 p-2 rounded-xl">
              <Clock size={20} />
            </div>
            <div className="pr-4">
              <p className="text-[10px] font-black text-slate-400 uppercase leading-none">
                อัปเดตล่าสุด
              </p>
              <p className="text-sm font-black text-slate-700">14:00:00 น.</p>
            </div>
          </div>
        </div>

        {/* --- 2. Production Quick Actions --- */}
        <div className="mb-10">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4 ml-1">
            Production Quick Actions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <ShortcutCard
              icon={<Layers size={22} />}
              label="เบิกวัตถุดิบ"
              detail="Issue Raw Material"
              color="blue"
              onClick={() => setCurrentPage("requisition")}
            />
            <ShortcutCard
              icon={<Settings size={22} />}
              label="บันทึกการขึ้นรูป"
              detail="Molding Entry"
              color="indigo"
              onClick={() => setCurrentPage("production")}
            />
            <ShortcutCard
              icon={<Scissors size={22} />}
              label="บันทึกการตัด"
              detail="Write-off Record"
              color="orange"
              onClick={() => setCurrentPage("writeoff_form")}
            />
            <ShortcutCard
              icon={<CheckSquare size={22} />}
              label="บันทึกการแกะสินค้า"
              detail="Product Unpack"
              color="emerald"
              onClick={() => setCurrentPage("unpack_form")}
            />
            <ShortcutCard
              icon={<Warehouse size={22} />}
              label="ส่งสินค้าเข้าคลัง"
              detail="Warehouse Inbound"
              color="amber"
              onClick={() => setCurrentPage("warehouse")}
            />
          </div>
        </div>

        {/* --- 3. Production Details & Quick Record Section --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* ฝั่งซ้าย: Production Live Details (ลดขนาด Padding และช่องไฟ) */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4 ml-1">
              Production Molding Live Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProductionLiveCard
                jobNo="104/0868"
                productCode="PP-PL17 FB"
                materialId="5B660055FB"
                mfgDate="22/01/2569"
                startTime="07:00"
                endTime="19:00"
                shift="A"
                machine="MC-VF-1"
                onClick={() =>
                  onEditMolding({
                    jobNo: "104/0868",
                    productCode: "PP-PL17 FB",
                  })
                }
              />
              <ProductionLiveCard
                jobNo="105/0868"
                productCode="PP-PL18 BK"
                materialId="5B660056BK"
                mfgDate="22/01/2569"
                startTime="19:00"
                endTime="04:00"
                shift="B"
                machine="MC-VF-2"
                onClick={() =>
                  onEditMolding({
                    jobNo: "105/0868",
                    productCode: "PP-PL18 BK",
                  })
                }
              />
            </div>
          </div>

          {/* ฝั่งขวา: Quick Action Cards (ย้ายมาแทน Machine Status) */}
          <div className="flex flex-col h-full">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4 ml-1">
              Molding Quick Record
            </h3>
            <div className="grid grid-cols-1 gap-4 flex-1">
              <QuickActionCard onAction={() => setCurrentPage("production")} />
              <QuickActionCard onAction={() => setCurrentPage("production")} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// --- Sub-components ---

const ProductionLiveCard = ({
  jobNo,
  productCode,
  materialId,
  mfgDate,
  startTime,
  endTime,
  shift,
  machine,
  onClick,
}) => (
  <div className="bg-white rounded-4xl shadow-xl shadow-slate-200/30 border border-slate-100 overflow-hidden flex flex-col group transition-all hover:-translate-y-1">
    <div className="p-5 flex-1">
      <div className="flex justify-between items-center mb-4">
        <div className="bg-indigo-50 text-indigo-600 p-2 rounded-xl">
          <Activity size={18} />
        </div>
        <span className="bg-emerald-100 text-emerald-700 text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-tighter border border-emerald-200 animate-pulse">
          กำลังผลิต
        </span>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1">
            Job Number
          </p>
          <h2 className="text-lg font-black text-slate-800 tracking-tight">
            {jobNo}
          </h2>
        </div>

        <div className="space-y-2 border-y border-slate-50 py-3">
          <DetailLine label="รหัสสินค้า" value={productCode} />
          <DetailLine label="รหัสวัตถุดิบ" value={materialId} />
          <DetailLine label="วันที่ผลิต" value={mfgDate} />
          <DetailLine label="เครื่องจักร" value={machine} highlight />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col text-[10px]">
            <span className="font-bold text-slate-400 uppercase tracking-tighter">
              กะผลิต
            </span>
            <span className="font-black text-indigo-600 uppercase">
              {shift}
            </span>
          </div>
          <div className="flex flex-col text-right text-[10px]">
            <span className="font-bold text-slate-400 uppercase tracking-tighter">
              เวลาดำเนินการ
            </span>
            <span className="font-black text-slate-700">
              {startTime} - {endTime} น.
            </span>
          </div>
        </div>
      </div>
    </div>
    <button
      onClick={onClick}
      className="w-full bg-[#004a99] text-white py-4 font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center space-x-2 group-hover:bg-blue-800 transition-colors"
    >
      <span>ดำเนินการต่อ</span>
      <ArrowRight
        size={14}
        className="group-hover:translate-x-1 transition-transform"
      />
    </button>
  </div>
);

const DetailLine = ({ label, value, highlight }) => (
  <div className="flex justify-between items-center text-[10px]">
    <span className="font-bold text-slate-400">{label} :</span>
    <span
      className={`font-black ${highlight ? "text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded" : "text-slate-700"}`}
    >
      {value}
    </span>
  </div>
);

const QuickActionCard = ({ onAction }) => (
  <div
    onClick={onAction}
    className="bg-white rounded-4xl border-4 border-dashed border-slate-200 flex flex-col items-center justify-center p-6 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-all group active:scale-95 flex-1 min-h-40"
  >
    <div className="bg-slate-50 text-slate-300 w-12 h-12 rounded-full flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner">
      <Plus size={24} />
    </div>
    <h3 className="text-xs font-black text-slate-500 uppercase tracking-tight group-hover:text-blue-700">
      เพิ่มข้อมูลขึ้นรูปสินค้า
    </h3>
    <p className="text-[8px] font-bold text-slate-400 mt-1 uppercase tracking-widest leading-none">
      New Entry
    </p>
  </div>
);

const ShortcutCard = ({ icon, label, detail, color, onClick }) => {
  const colorStyles = {
    blue: "bg-blue-600",
    indigo: "bg-indigo-600",
    orange: "bg-orange-500",
    emerald: "bg-emerald-600",
    amber: "bg-amber-500",
  };
  return (
    <div
      onClick={onClick}
      className="bg-white p-5 rounded-4xl shadow-lg shadow-slate-200/50 border border-slate-100 flex flex-col items-center justify-center text-center cursor-pointer hover:-translate-y-1 transition-all group active:scale-95"
    >
      <div
        className={`w-12 h-12 ${colorStyles[color]} text-white rounded-2xl flex items-center justify-center mb-2 shadow-xl group-hover:scale-110 transition-transform`}
      >
        {icon}
      </div>
      <p className="text-[12px] font-black text-slate-800 tracking-tight mb-0.5">
        {label}
      </p>
      <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">
        {detail}
      </p>
    </div>
  );
};

export default Dashboard;
