import React, { useState, useMemo } from "react";
import {
  ChevronLeft,
  Edit2,
  Plus,
  Trash2,
  Save,
  Package,
  Settings,
  Clock,
  ClipboardList,
  Activity,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Maximize2,
  Edit,
  Edit3,
  X,
  Calendar,
  Layers,
  Monitor,
} from "lucide-react";

const MoldingDetail = ({ moldingData, onBack }) => {
  const [expandedRoll, setExpandedRoll] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showHeightModal, setShowHeightModal] = useState(false);
  const [tempHeights, setTempHeights] = useState([]);
  const [heightSets, setHeightSets] = useState([
    98, 98, 98, 98, 98, 98, 98, 98, 98, 98,
  ]);
  const [expandedGroups, setExpandedGroups] = useState({});
  const toggleGroup = (groupKey) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupKey]: !prev[groupKey],
    }));
  };

  // 1. State สำหรับควบคุมการเปิด-ปิด Modal ของแต่ละ Card
  const [activeModal, setActiveModal] = useState(null); // 'production', 'quality', 'statistics' หรือ null
  const closeModal = () => setActiveModal(null);

  const [formData, setFormData] = useState({ yieldA: 0, yieldB: 0 });

  // คำนวณสถิติความสูงจาก Array ปัจจุบัน
  const heightStats = useMemo(() => {
    if (heightSets.length === 0) return { total: 0, min: 0, max: 0, avg: 0 };
    const total = heightSets.reduce((a, b) => a + b, 0);
    return {
      total: total,
      min: Math.min(...heightSets),
      max: Math.max(...heightSets),
      avg: (total / heightSets.length).toFixed(1),
    };
  }, [heightSets]);

  // ฟังก์ชันเปิด Modal แก้ไขความสูง
  const handleOpenHeightModal = () => {
    setTempHeights([...heightSets]); // สำเนาข้อมูลเดิมไปที่ Temp
    setShowHeightModal(true);
  };

  // ฟังก์ชันเพิ่มช่องตั้งงานใหม่ใน Modal
  const addNewHeightField = () => {
    setTempHeights([...tempHeights, 0]); // เพิ่มค่าเริ่มต้นเป็น 0
  };

  // ฟังก์ชันบันทึกข้อมูลความสูง
  const handleSaveHeights = () => {
    setHeightSets([...tempHeights]);
    setShowHeightModal(false);
  };

  // ข้อมูลจำลองรายการม้วนที่ผลิต (อ้างอิงจากใบงานจริง)
  const [productionRolls] = useState([
    {
      id: 1,
      rollNo: 1,
      lotNo: "110825",
      seq: 15,
      mfgDate: "09-08-25",
      weight: 205.4,
      thicknessBefore: 0.55,
      thicknessAfter: 0.5,
      outputA: 618,
      outputB: 1,
      scrap: 0,
      total: 619,
    },
    {
      id: 2,
      rollNo: 2,
      lotNo: "110825",
      seq: 13,
      mfgDate: "09-08-25",
      weight: 205.35,
      thicknessBefore: 0.55,
      thicknessAfter: 0.5,
      outputA: 614,
      outputB: 1,
      scrap: 0,
      total: 615,
    },
    {
      id: 3,
      rollNo: 3,
      lotNo: "130825",
      seq: 10,
      mfgDate: "11-08-25",
      weight: 210.0,
      thicknessBefore: 0.58,
      thicknessAfter: 0.52,
      outputA: 620,
      outputB: 0,
      scrap: 2,
      total: 622,
    },
    {
      id: 4,
      rollNo: 4,
      lotNo: "130825",
      seq: 11,
      mfgDate: "11-08-25",
      weight: 208.5,
      thicknessBefore: 0.58,
      thicknessAfter: 0.52,
      outputA: 615,
      outputB: 2,
      scrap: 1,
      total: 618,
    },
  ]);

  // 2. จัดกลุ่มข้อมูลตาม Lot No. และวันที่ผลิต
  const groupedRolls = useMemo(() => {
    const groups = productionRolls.reduce((acc, roll) => {
      const key = `${roll.lotNo}-${roll.mfgDate}`;
      if (!acc[key]) acc[key] = [];
      acc[key].push(roll);
      return acc;
    }, {});
    return Object.entries(groups);
  }, [productionRolls]);

  const totals = useMemo(() => {
    return productionRolls.reduce(
      (acc, roll) => ({
        outputA: acc.outputA + roll.outputA,
        outputB: acc.outputB + roll.outputB,
        scrap: acc.scrap + roll.scrap,
        total: acc.total + roll.total,
        weight: acc.weight + roll.weight,
      }),
      { outputA: 0, outputB: 0, scrap: 0, total: 0, weight: 0 },
    );
  }, [productionRolls]);

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans pb-20 text-slate-800">
      {/* --- 1. TOP HEADER BAR --- */}
      <div className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-200">
            <Activity size={20} />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-800 tracking-tight leading-none uppercase">
              Job No :{" "}
              <span className="text-indigo-700">
                {moldingData?.jobNo || "104/0868"}
              </span>
            </h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 italic">
              Forming Production Detailed Record
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          {/* <button className="flex items-center space-x-2 px-5 py-2.5 bg-blue-50 text-blue-700 border border-blue-100 rounded-xl font-bold text-xs hover:bg-blue-100 transition-all active:scale-95">
            <Maximize2 size={14} /> <span>Print Report</span>
          </button> */}
          <button
            onClick={onBack}
            className="flex items-center space-x-2 px-6 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold text-xs hover:bg-slate-50 shadow-sm active:scale-95 uppercase"
          >
            <ChevronLeft size={16} /> <span>Back To List</span>
          </button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto p-6 lg:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* --- 2. SUMMARY CARDS (Specs & Times) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* ข้อมูลการผลิตหลัก */}
          <InfoCard
            title="Production Details"
            icon={<ClipboardList size={18} className="text-blue-600" />}
            onEdit={() => setActiveModal("production details")}
          >
            <DetailRow label="วันที่ผลิต" value="15/08/2568" />
            <DetailRow label="รหัสสินค้า" value="PP-PL17 FB" isStrong />
            <DetailRow
              label="Job No."
              value={moldingData?.jobNo || "J104/0868"}
              isStrong
            />
            <DetailRow
              label="รหัสเครื่องจักร"
              value="MC-VF-1"
              color="text-indigo-600"
              isStrong
            />
          </InfoCard>

          {/* ค่ามาตรฐาน Specs (อ้างอิงจากรูป) */}
          <InfoCard
            title="Quality Standards"
            icon={<Settings size={18} className="text-emerald-600" />}
            onEdit={() => setActiveModal("quality standards")}
          >
            <DetailRow
              label="รหัสวัตถุดิบหลัก"
              value="5B660055FB"
              color="text-blue-600"
            />
            <DetailRow label="ขนาด (กxยxส)" value="208 x 263 x 36 mm" />
            <DetailRow label="ความหนา" value="20.40 micron" isStrong />
            <DetailRow label="สีสินค้า" value="สีดำ" />
          </InfoCard>

          {/* Card: ข้อมูลการผลิต (อ้างอิงจากรูป f4ff04 และใบงานจริง) */}
          <InfoCard
            title="Production Statistics"
            icon={<Clock size={18} className="text-blue-600" />}
            onEdit={() => setActiveModal("production statistics")}
          >
            <div className="space-y-4 pt-1">
              <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tight">
                  จำนวนเฟรมต่อม้วน
                </span>
                <span className="text-sm font-black text-slate-700">
                  7,400{" "}
                  <span className="text-[10px] font-normal text-slate-400">
                    Frames
                  </span>
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">
                    จำนวนชิ้นต่อเฟรม
                  </p>
                  <p className="text-sm font-black text-slate-700">
                    8 <span className="text-[10px] font-normal">ชิ้น</span>
                  </p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">
                    เวลาในการผลิตทั้งหมด
                  </p>
                  <p className="text-sm font-black text-slate-700">
                    12 <span className="text-[10px] font-normal">ชม.</span>
                  </p>
                </div>
              </div>

              <div className="bg-blue-600 p-4 rounded-2xl shadow-lg shadow-blue-100 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black text-blue-100 uppercase tracking-widest leading-none">
                    จำนวนม้วนที่ได้ใน 1 ชม.
                  </p>
                  <p className="text-[9px] text-blue-200 mt-1 italic">
                    Average Output Rate
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-white leading-none">
                    0.52
                  </span>
                  <p className="text-[10px] font-bold text-blue-100 uppercase mt-1 text-center">
                    Rolls/Hr
                  </p>
                </div>
              </div>
            </div>
          </InfoCard>
        </div>

        {activeModal && (
          <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
              {/* Modal Header - เปลี่ยนเป็นสีน้ำเงินเข้มตามระบบ */}
              <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-[#004a99] text-white">
                <div className="flex items-center space-x-3">
                  {activeModal === "production details" && (
                    <ClipboardList size={22} />
                  )}
                  {activeModal === "quality standards" && (
                    <Settings size={22} />
                  )}
                  {activeModal === "production statistics" && (
                    <Clock size={22} />
                  )}
                  <h3 className="text-lg font-black uppercase tracking-tight">
                    Edit {activeModal}
                  </h3>
                </div>
                <button
                  onClick={closeModal}
                  className="hover:bg-white/20 p-2 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body - ดึงข้อมูลเก่ามาแสดง (ตัวอย่างการใช้ defaultValue) */}
              <div className="p-10 space-y-6">
                {activeModal === "production details" && (
                  <div className="space-y-4">
                    <ModalInput
                      label="วันที่ผลิต"
                      type="date"
                      icon={<Calendar size={16} />}
                      defaultValue="2025-08-15"
                    />
                    <ModalInput
                      label="รหัสสินค้า"
                      icon={<Package size={16} />}
                      defaultValue="PP-PL17 FB"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <ModalInput
                        label="Job No."
                        defaultValue={moldingData?.jobNo || "J104/0868"}
                      />
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase ml-1">
                          เครื่องจักร
                        </label>
                        <select className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm outline-none focus:ring-4 focus:ring-blue-500/10 cursor-pointer">
                          <option selected>MC-VF-1</option>
                          <option>MC-VF-2</option>
                          <option>MC-VF-3</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {activeModal === "quality standards" && (
                  <div className="space-y-4">
                    <ModalInput
                      label="รหัสวัตถุดิบหลัก"
                      icon={<Layers size={16} />}
                      defaultValue="5B660055FB"
                    />
                    <ModalInput
                      label="ขนาด (กว้าง x ยาว x สูง)"
                      defaultValue="208 x 263 x 36 mm"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <ModalInput
                        label="ความหนา (Micron)"
                        type="number"
                        defaultValue="20.40"
                      />
                      <ModalInput label="สีสินค้า" defaultValue="สีดำ" />
                    </div>
                  </div>
                )}

                {activeModal === "production statistics" && (
                  <div className="space-y-4">
                    <ModalInput
                      label="จำนวนเฟรมต่อม้วน"
                      type="number"
                      defaultValue="7400"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <ModalInput
                        label="จำนวนชิ้นต่อเฟรม"
                        type="number"
                        defaultValue="8"
                      />
                      <ModalInput
                        label="เวลาผลิตทั้งหมด (ชม.)"
                        type="number"
                        defaultValue="12"
                      />
                    </div>
                    <div className="bg-blue-50 p-5 rounded-4xl border border-blue-100 flex items-center space-x-4">
                      <Monitor size={20} className="text-blue-600" />
                      <p className="text-[11px] font-bold text-blue-800 leading-tight uppercase tracking-tight">
                        ระบบจะคำนวณอัตราเฉลี่ย (0.52 Rolls/Hr)
                        ให้ใหม่อัตโนมัติหลังกดบันทึก
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer - ปุ่ม Save สีน้ำเงินเข้มและขอบล่างหนา */}
              <div className="p-8 bg-slate-50 border-t flex space-x-4 font-sans">
                <button
                  onClick={closeModal}
                  className="flex-1 py-4 font-black text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-all text-xs"
                >
                  ยกเลิก
                </button>
                <button className="flex-1 py-4 bg-[#004a99] text-white font-black rounded-2xl shadow-xl active:scale-95 border-b-4 border-black flex items-center justify-center space-x-2 text-xs uppercase tracking-widest hover:bg-blue-600 transition-all">
                  <Save size={16} /> <span>Save Changes</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- 3. PRODUCTION TABLE WITH GROUPING --- */}
        <div className="mb-10">
          <div className="flex justify-between items-end mb-6 px-2">
            <div>
              <h3 className="text-xl font-black text-slate-800 uppercase flex items-center">
                <Activity size={24} className="mr-2 text-indigo-600" />{" "}
                รายละเอียดผลการขึ้นรูปรายม้วน
              </h3>
              <p className="text-xs font-bold text-slate-400 mt-1 italic tracking-tight">
                แยกแสดงผลตามล็อตการผลิต (Lot Grouping)
              </p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-6 py-3 bg-[#004a99] text-white rounded-2xl font-black text-xs hover:bg-blue-800 shadow-xl border-b-4 border-blue-900 flex items-center space-x-2"
            >
              <Plus size={18} /> <span>เพิ่มข้อมูลม้วนใหม่</span>
            </button>
          </div>

          <div className="bg-white rounded-4xl shadow-2xl border border-slate-100 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#f1f3f5] border-b border-slate-300">
                <tr className="text-[10px] font-black tracking-widest text-slate-600 divide-x divide-slate-200">
                  <th className="px-6 py-4 text-center w-28">Tool</th>
                  <th className="px-4 py-4 text-center w-20">ม้วนที่</th>
                  <th className="px-6 py-4">Lot No. / Seq</th>
                  <th className="px-6 py-4 text-center">นน.ม้วน (kg)</th>
                  <th className="px-6 py-4 text-center">หนาก่อน/หลัง VAC</th>
                  <th className="px-6 py-4 text-center">วันที่ผลิต</th>
                  <th className="px-6 py-4 text-center">ผลผลิต A</th>
                  <th className="px-6 py-4 text-center">ผลผลิต B</th>
                  <th className="px-6 py-4 text-center">เสีย</th>
                  <th className="px-6 py-4 text-center">รวม (Pcs)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm">
                {groupedRolls.map(([groupKey, rolls]) => {
                  const groupOutputA = rolls.reduce(
                    (sum, r) => sum + r.outputA,
                    0,
                  );
                  const groupOutputB = rolls.reduce(
                    (sum, r) => sum + r.outputB,
                    0,
                  );
                  const groupScrap = rolls.reduce((sum, r) => sum + r.scrap, 0);
                  const groupTotal = rolls.reduce((sum, r) => sum + r.total, 0);
                  const groupWeight = rolls.reduce(
                    (sum, r) => sum + r.weight,
                    0,
                  );

                  const isExpanded = expandedGroups[groupKey] !== false;

                  return (
                    <React.Fragment key={groupKey}>
                      {/* 1. Lot Header (แถบสีม่วงของกลุ่ม) */}
                      <tr
                        onClick={() => toggleGroup(groupKey)}
                        className="bg-indigo-50/50 border-y border-indigo-100/50 cursor-pointer hover:bg-indigo-100/50 transition-colors"
                      >
                        <td colSpan="10" className="px-6 py-2.5">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-2 bg-indigo-600 px-3 py-1 rounded-lg text-white font-black text-[10px] uppercase shadow-sm">
                                <Package size={12} />{" "}
                                <span>Lot: {rolls[0].lotNo}</span>
                              </div>
                              {/* <div className="text-[11px] font-bold text-slate-500 flex items-center">
                                <Calendar
                                  size={14}
                                  className="mr-1 opacity-50"
                                />{" "}
                                {rolls[0].mfgDate}
                              </div> */}
                            </div>
                            {isExpanded ? (
                              <ChevronUp
                                size={16}
                                className="text-indigo-400"
                              />
                            ) : (
                              <ChevronDown
                                size={16}
                                className="text-indigo-400"
                              />
                            )}
                          </div>
                        </td>
                      </tr>

                      {/* 2. รายการม้วนและ QC Section (แสดงเมื่อกลุ่มถูกขยาย) */}
                      {isExpanded && (
                        <>
                          {rolls.map((roll) => (
                            <React.Fragment key={roll.id}>
                              {/* แถวข้อมูลม้วนปกติ */}
                              <tr
                                className={`hover:bg-blue-50/30 divide-x divide-slate-100 transition-colors ${expandedRoll === roll.id ? "bg-indigo-50/50" : ""}`}
                              >
                                <td className="px-6 py-4 text-center">
                                  <div className="flex justify-center space-x-2">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setExpandedRoll(
                                          expandedRoll === roll.id
                                            ? null
                                            : roll.id,
                                        );
                                      }}
                                      className="p-2 bg-white text-slate-400 rounded-lg hover:text-indigo-600 border border-slate-100 shadow-sm"
                                    >
                                      {expandedRoll === roll.id ? (
                                        <ChevronUp size={16} />
                                      ) : (
                                        <Maximize2 size={16} />
                                      )}
                                    </button>
                                    <button className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all active:scale-90">
                                      <Edit2 size={14} />
                                    </button>
                                  </div>
                                </td>
                                <td className="px-4 py-4 text-center font-black text-slate-400">
                                  #{roll.rollNo}
                                </td>
                                <td className="px-6 py-4">
                                  <div className="font-bold text-slate-800">
                                    {roll.lotNo}
                                  </div>
                                  <div className="text-[10px] text-slate-400 font-bold uppercase italic">
                                    Seq : {roll.seq}
                                  </div>
                                </td>
                                <td className="px-6 py-4 text-center font-bold text-blue-700 bg-blue-50/20">
                                  {roll.weight}
                                </td>
                                <td className="px-6 py-4 text-center text-slate-500 font-medium">
                                  {roll.thicknessBefore} / {roll.thicknessAfter}
                                </td>
                                <td className="px-6 py-4 text-center font-bold text-slate-400 italic">
                                  {roll.mfgDate}
                                </td>
                                <td className="px-6 py-4 text-center font-black text-emerald-600 text-base">
                                  {roll.outputA}
                                </td>
                                <td className="px-6 py-4 text-center font-black text-orange-600 text-base">
                                  {roll.outputB}
                                </td>
                                <td className="px-6 py-4 text-center font-black text-slate-600 text-base">
                                  {roll.scrap}
                                </td>
                                <td className="px-6 py-4 text-center font-black text-slate-800 bg-slate-50/30">
                                  {roll.total}
                                </td>
                              </tr>

                              {/* แถวรายละเอียด QC (แสดงเมื่อกดขยายรายม้วน) */}
                              {expandedRoll === roll.id && (
                                <tr>
                                  <td
                                    colSpan="10"
                                    className="px-10 py-6 bg-slate-50/80 border-y border-indigo-100"
                                  >
                                    <div className="animate-in slide-in-from-top-2 duration-300">
                                      <div className="space-y-4">
                                        <h4 className="text-xs font-black text-indigo-700 uppercase flex items-center">
                                          <AlertTriangle
                                            size={14}
                                            className="mr-2"
                                          />
                                          ปัญหาที่พบระหว่างกระบวนการ (QC Check)
                                          ของม้วน #{roll.rollNo}
                                        </h4>

                                        {/* จัดเรียงเป็น Grid 2 แถว (แถวละประมาณ 6-7 รายการ) */}
                                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
                                          {/* แถวที่ 1 */}
                                          <QCBadge
                                            label="กล่องไม่มีรู"
                                            checked={true}
                                          />
                                          <QCBadge
                                            label="กล่องร่องพับไม่ได้"
                                            checked={false}
                                          />
                                          <QCBadge
                                            label="กรอบ"
                                            checked={false}
                                          />
                                          <QCBadge
                                            label="นิ่ม"
                                            checked={true}
                                          />
                                          <QCBadge
                                            label="หน้ากว้างไม่เท่า"
                                            checked={false}
                                          />
                                          <QCBadge
                                            label="เป็นรอยยับ"
                                            checked={true}
                                          />
                                          <QCBadge
                                            label="ม้วนโฟมติด"
                                            checked={false}
                                          />

                                          {/* แถวที่ 2 */}
                                          <QCBadge
                                            label="สีมีปัญหา"
                                            checked={false}
                                          />
                                          <QCBadge
                                            label="ฟิล์มเคลือบไม่ติด"
                                            checked={false}
                                          />
                                          <QCBadge
                                            label="ฟิล์มมีรอยยับ"
                                            checked={false}
                                          />
                                          <QCBadge
                                            label="ฟิล์มเคลือบไม่ตรง"
                                            checked={false}
                                          />
                                          <QCBadge
                                            label="การปิดฝาได้"
                                            checked={false}
                                          />
                                          <QCBadge
                                            label="พบสิ่งแปลกปลอม"
                                            checked={true}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </React.Fragment>
                          ))}

                          {/* 3. แถวสรุปยอดของกลุ่ม Lot (Subtotal) */}
                          <tr className="bg-slate-50 font-black border-b-2 border-slate-200">
                            <td
                              colSpan="3"
                              className="px-6 py-3 text-right text-[10px] text-slate-400 uppercase tracking-tighter"
                            >
                              Subtotal (Lot {rolls[0].lotNo})
                            </td>
                            <td className="px-6 py-3 text-center text-blue-800 font-black">
                              {groupWeight.toFixed(1)}
                            </td>
                            <td colSpan="2" className="bg-slate-100/50"></td>
                            <td className="px-6 py-3 text-center text-emerald-600 text-sm border-x border-slate-200">
                              {groupOutputA.toLocaleString()}
                            </td>
                            <td className="px-6 py-3 text-center text-orange-600 text-sm border-x border-slate-200">
                              {groupOutputB.toLocaleString()}
                            </td>
                            <td className="px-6 py-3 text-center text-slate-500 text-sm border-x border-slate-200">
                              {groupScrap.toLocaleString()}
                            </td>
                            <td className="px-6 py-3 text-center text-slate-900 text-sm bg-indigo-50/50">
                              {groupTotal.toLocaleString()}
                            </td>
                          </tr>
                        </>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>

              {/* --- ผลรวมทั้งหมดท้ายตาราง --- */}
              <tfoot className="bg-slate-800 text-white border-t-4 border-slate-900">
                <tr className="divide-x divide-slate-700">
                  <td
                    colSpan="3"
                    className="px-8 py-5 text-right font-black uppercase text-[11px] tracking-widest text-slate-400"
                  >
                    Total All Lots Summation
                  </td>
                  <td className="px-6 py-5 text-center text-blue-400 text-lg font-black">
                    {totals.weight.toFixed(1)}
                  </td>
                  <td colSpan="2" className="bg-slate-900/50"></td>
                  <td className="px-6 py-5 text-center text-emerald-400 text-xl font-black">
                    {totals.outputA.toLocaleString()}
                  </td>
                  <td className="px-6 py-5 text-center text-orange-400 text-xl font-black">
                    {totals.outputB.toLocaleString()}
                  </td>
                  <td className="px-6 py-5 text-center text-red-400 text-xl font-black">
                    {totals.scrap.toLocaleString()}
                  </td>
                  <td className="px-6 py-5 text-center bg-indigo-600 text-white text-xl font-black">
                    {totals.total.toLocaleString()}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* --- 4. PRODUCTION HEIGHT LOG (ทุก 100 เฟรม ตามใบงาน) --- */}
        <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden mb-8">
          {" "}
          {/* เพิ่ม mb-8 เพื่อเว้นระยะห่าง */}
          <div className="px-10 py-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <div className="flex items-center space-x-3 text-slate-800 font-black uppercase text-sm tracking-tight">
              <Clock size={20} className="text-blue-600" />{" "}
              <span>บันทึกความสูงของตั้งงาน (Every 100 Frames)</span>
            </div>
            <button
              onClick={handleOpenHeightModal}
              className="p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-md active:scale-90 transition-all"
            >
              <Edit size={16} />
            </button>
          </div>
          <div className="p-10 space-y-8">
            {/* Grid แสดงค่าความสูงแต่ละเซต */}
            <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
              {heightSets.map((val, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center p-3 bg-gray-50 rounded-2xl border border-slate-100 shadow-sm"
                >
                  <span className="text-[9px] font-black text-slate-400 uppercase mb-1">
                    Set {i + 1}
                  </span>
                  <span className="text-sm font-black text-blue-600">
                    {val}
                  </span>
                </div>
              ))}
            </div>

            {/* ส่วนสรุปสถิติความสูงที่เพิ่มเข้ามา (อ้างอิงรูป image_113950) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-slate-100 pt-8 text-center">
              <HeightStatItem
                label="รวมทั้งหมด"
                value={heightStats.total}
                color="bg-slate-800 text-white"
              />
              <HeightStatItem
                label="ต่ำสุด (Min)"
                value={heightStats.min}
                color="bg-red-50 border border-red-100 text-red-600"
              />
              <HeightStatItem
                label="สูงสุด (Max)"
                value={heightStats.max}
                color="bg-emerald-50 border border-emerald-100 text-emerald-600"
              />
              <HeightStatItem
                label="เฉลี่ย (Avg)"
                value={heightStats.avg}
                color="bg-blue-600 text-white shadow-lg shadow-blue-100"
              />
            </div>
          </div>
        </div>

        {/* --- MODAL: กำหนดตั้งความสูง (อ้างอิงรูป image_1d12b5) --- */}
        {showHeightModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="bg-white p-8 border-b border-slate-100 flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-50 text-blue-600 p-2.5 rounded-2xl">
                    <Edit2 size={22} />
                  </div>
                  <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">
                    กำหนดตั้งความสูง
                  </h3>
                </div>
                <button
                  onClick={() => setShowHeightModal(false)}
                  className="p-2 text-slate-400 hover:bg-slate-100 rounded-full"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-10 max-h-[60vh] overflow-y-auto">
                <div className="grid grid-cols-5 md:grid-cols-8 gap-4 mb-8">
                  {tempHeights.map((val, idx) => (
                    <div key={idx} className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase ml-1">
                        ตั้งที่ {idx + 1}
                      </label>
                      <input
                        type="number"
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-center text-blue-600 focus:ring-2 focus:ring-blue-500 outline-none"
                        value={val}
                        onChange={(e) => {
                          const newArr = [...tempHeights];
                          newArr[idx] = Number(e.target.value);
                          setTempHeights(newArr);
                        }}
                      />
                    </div>
                  ))}

                  {/* ปุ่ม + เพิ่มตั้ง (อ้างอิงรูป image_1d12b5) */}
                  <div className="flex items-end">
                    <button
                      onClick={addNewHeightField}
                      className="w-full h-12.5 border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center text-slate-400 hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50 transition-all active:scale-95"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-slate-50 border-t border-slate-200 flex justify-end space-x-4">
                <button
                  onClick={() => setShowHeightModal(false)}
                  className="px-10 py-3.5 font-black text-slate-400 uppercase tracking-widest hover:text-slate-600"
                >
                  ยกเลิก
                </button>
                <button
                  onClick={handleSaveHeights}
                  className="px-12 py-3.5 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-100 flex items-center space-x-2 active:scale-95 transition-all"
                >
                  <Save size={18} /> <span>บันทึกข้อมูล</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- 5. PRODUCTION ISSUES (สไตล์เดียวกับ MaterialsDetail) --- */}
        <div className="bg-white rounded-4xl border border-slate-200 shadow-xl overflow-hidden">
          <div className="px-10 py-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <div className="flex items-center space-x-3 text-slate-800 font-black uppercase text-sm tracking-tight">
              <button className="p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:scale-90 transition-all shadow-md">
                <Plus size={16} />
              </button>
              <span>ปัญหาที่พบระหว่างกระบวนการผลิต (Production Issues)</span>
            </div>
          </div>
          <div className="p-10">
            <div className="flex items-start space-x-8 group">
              <div className="flex flex-col items-center space-y-3 pt-2">
                <button className="p-3 bg-white text-slate-400 border border-slate-200 rounded-2xl hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 transition-all shadow-sm">
                  <Edit2 size={18} />
                </button>
                <button className="p-3 bg-white text-slate-400 border border-slate-200 rounded-2xl hover:text-red-500 hover:border-red-300 hover:bg-red-50 transition-all shadow-sm">
                  <Trash2 size={18} />
                </button>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 font-black text-xs border-2 border-white shadow-inner">
                      AS
                    </div>
                    <div>
                      <p className="text-[12px] font-black text-slate-700 uppercase">
                        Admin Staff
                      </p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">
                        21 Jan 2026 • 15:30 น.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-yellow-50/70 p-8 rounded-3xl border border-yellow-100 text-sm font-bold text-slate-700 leading-relaxed italic shadow-inner">
                  "ฟิล์มเคลือบไม่ติดกับชิ้นงานในช่วงต้นม้วน"
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* --- MODAL: บันทึกข้อมูลม้วนใหม่ --- */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="bg-[#004a99] p-6 text-white flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <Plus className="bg-white/20 p-1.5 rounded-lg" />
                <h3 className="font-black uppercase tracking-tight">
                  บันทึกข้อมูลม้วนที่ {productionRolls.length + 1}
                </h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Body */}
            <div className="p-10 grid grid-cols-1 md:grid-cols-3 gap-8 max-h-[75vh] overflow-y-auto">
              {/* Column 1: วัตถุดิบและผลผลิต */}
              <div className="space-y-5">
                <h4 className="text-blue-700 font-black uppercase text-sm border-b pb-2">
                  วัตถุดิบและสเปค
                </h4>
                <ModalInput label="Lot No." placeholder="เลข Lot" />
                <ModalInput label="SEQ (ลำดับ)" type="number" placeholder="0" />
                <ModalInput label="วันที่ผลิต" type="date" isHighlight />
                <ModalInput
                  label="น้ำหนักม้วน (KG)"
                  type="number"
                  step="0.1"
                  placeholder="0.00"
                  isHighlight
                />
                <div className="grid grid-cols-2 gap-3">
                  <ModalInput
                    label="ความหนาก่อน VAC"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                  />
                  <ModalInput
                    label="ความหนาหลัง VAC"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                  />
                </div>
                {/* <ModalSelect
                  label="ประเภทกล่อง"
                  options={["กล่องไม่มีรู", "กล่องร่องพับไม่ได้"]}
                />
                <ModalSelect label="ลักษณะสินค้า" options={["กรอบ", "นิ่ม"]} /> */}
              </div>

              {/* Column 2: ปัญหาที่พบ (QC) */}
              <div className="space-y-4">
                <h4 className="text-red-600 font-black uppercase text-sm border-b pb-2">
                  ปัญหาที่พบ (QC)
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    "กล่องไม่มีรู",
                    "กล่องร่องพับไม่ได้",
                    "กรอบ",
                    "นิ่ม",
                    "หน้ากว้างไม่เท่า",
                    "เป็นรอยยับ",
                    "ม้วนโฟมติด",
                    "สีมีปัญหา",
                    "ฟิล์มเคลือบไม่ติด",
                    "ฟิล์มมีรอยยับ",
                    "ฟิล์มเคลือบไม่ตรง",
                    "การปิดฝาได้",
                    "พบสิ่งแปลกปลอม",
                  ].map((issue) => (
                    <label
                      key={issue}
                      className="flex items-center space-x-3 p-2.5 bg-slate-50 rounded-xl border border-transparent hover:border-red-200 cursor-pointer transition-all"
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-slate-300 text-red-600 focus:ring-red-500"
                      />
                      <span className="text-[11px] font-bold text-slate-600 uppercase tracking-tighter">
                        {issue}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Column 3: สรุปยอดม้วน พร้อมระบบคำนวณอัตโนมัติ */}
              <div className="space-y-6 bg-slate-50 p-6 rounded-4xl h-fit border border-slate-200 shadow-inner">
                <h4 className="text-slate-800 font-black uppercase text-xs border-b border-slate-200 pb-3 text-center tracking-widest">
                  สรุปผลผลิตม้วนนี้
                </h4>

                <div className="space-y-4">
                  <ModalInput
                    label="ผลผลิต A"
                    type="number"
                    placeholder="0"
                    value={formData.yieldA}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        yieldA: Number(e.target.value),
                      })
                    }
                  />
                  <ModalInput
                    label="ผลผลิต B"
                    type="number"
                    placeholder="0"
                    value={formData.yieldB}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        yieldB: Number(e.target.value),
                      })
                    }
                  />
                  <ModalInput
                    label="เสีย (SCRAP)"
                    type="number"
                    placeholder="0"
                  />
                </div>

                {/* ส่วนผลรวมอัตโนมัติ (แทนที่ Remark เดิม) */}
                <div className="pt-6 border-t border-slate-200">
                  <label className="text-[10px] font-black text-indigo-500 uppercase ml-1 tracking-[0.15em]">
                    ผลผลิตรวม TOTAL (A+B)
                  </label>
                  <div className="mt-2 relative group">
                    <input
                      readOnly
                      type="text"
                      className="w-full p-5 bg-indigo-600 border-none rounded-3xl text-white text-2xl font-black text-center shadow-lg shadow-indigo-100 outline-none cursor-default transition-transform"
                      value={(
                        Number(formData.yieldA || 0) +
                        Number(formData.yieldB || 0)
                      ).toLocaleString()}
                    />
                  </div>
                  <p className="text-[9px] text-slate-400 font-bold mt-3 text-center uppercase tracking-tighter italic">
                    * ระบบจะคำนวณยอดรวมชิ้นงานให้อัตโนมัติ
                  </p>
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="p-8 bg-slate-50 border-t border-slate-200 flex justify-end space-x-4">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-8 py-3.5 font-black text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors"
              >
                ยกเลิก
              </button>
              <button className="px-12 py-3.5 bg-[#004a99] text-white font-black rounded-2xl shadow-xl shadow-blue-100 flex items-center space-x-2 active:scale-95 transition-all border-b-4 border-blue-900">
                <Save size={18} /> <span>ยืนยันบันทึกข้อมูล</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Helper Components ---
// const ModalInput = ({ label, isHighlight, ...props }) => (
//   <div className="space-y-1">
//     <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-tighter">
//       {label}
//     </label>
//     <input
//       className={`w-full p-3.5 border border-slate-200 rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${isHighlight ? "bg-blue-50 border-blue-200 text-blue-700 shadow-inner" : "bg-white"}`}
//       {...props}
//     />
//   </div>
// );

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
        {...props}
        className={`w-full ${icon ? "pl-11" : "px-5"} py-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm text-slate-700 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all`}
      />
    </div>
  </div>
);

const ModalSelect = ({ label, options }) => (
  <div className="space-y-1">
    <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-tighter">
      {label}
    </label>
    <select className="w-full p-3.5 border border-slate-200 rounded-2xl font-bold text-sm bg-white outline-none focus:ring-2 focus:ring-indigo-500">
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

const HeightStatItem = ({ label, value, color }) => (
  <div
    className={`p-4 rounded-2xl flex flex-col items-center justify-center ${color}`}
  >
    <span className="text-[10px] font-black uppercase mb-0.5 opacity-70 tracking-widest">
      {label}
    </span>
    <span className="text-xl font-black">{value}</span>
  </div>
);

// --- Sub-components ---
const InfoCard = ({ title, icon, children, onEdit }) => (
  <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 hover:shadow-md transition-all relative">
    <div className="flex items-center justify-between mb-4 border-b border-slate-50 pb-3">
      <div className="flex items-center space-x-3">
        {icon}
        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          {title}
        </h4>
      </div>

      {/* เพิ่มปุ่ม Edit สไตล์เดียวกับบันทึกตั้งงาน */}
      {onEdit && (
        <button
          onClick={onEdit}
          className="p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:scale-90 transition-all shadow-md"
        >
          <Edit3 size={14} />
        </button>
      )}
    </div>
    <div className="space-y-3">{children}</div>
  </div>
);

const DetailRow = ({ label, value, isStrong, color = "text-slate-700" }) => (
  <div className="flex justify-between items-center group">
    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
      {label}
    </span>
    <span
      className={`text-sm font-bold ${isStrong ? "font-black" : ""} ${color}`}
    >
      {value || "-"}
    </span>
  </div>
);

const QCBadge = ({ label, checked }) => (
  <div
    className={`px-3 py-2 rounded-xl border text-[11px] font-bold flex items-center justify-between ${checked ? "bg-red-50 border-red-200 text-red-700" : "bg-slate-50 border-slate-100 text-slate-400"}`}
  >
    {label}
    <div
      className={`w-2 h-2 rounded-full ${checked ? "bg-red-500 animate-pulse" : "bg-slate-300"}`}
    ></div>
  </div>
);

export default MoldingDetail;
