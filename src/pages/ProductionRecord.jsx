import React, { useState } from 'react';
import { 
  Save, Settings, Scissors, Users, Clock, Package, 
  AlertTriangle, CheckCircle2, ChevronDown, ChevronUp,
  BarChart3, ClipboardCheck, History
} from 'lucide-react';

const ProductionRecord = () => {
  const [activeTab, setActiveTab] = useState("forming");

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Tab Navigation ปรับปรุงให้รองรับ 6 Tabs */}
      <div className="sticky top-0 z-20 bg-white border-b shadow-sm overflow-x-auto">
        <div className="flex max-w-350 mx-auto min-w-max">
          {[
            {
              id: "forming",
              label: "1. บันทึกขึ้นรูป",
              icon: <Settings className="w-4 h-4" />,
            },
            {
              id: "cutting",
              label: "2. บันทึกตัด",
              icon: <Scissors className="w-4 h-4" />,
            },
            {
              id: "peeling",
              label: "3. บันทึกแกะ",
              icon: <Users className="w-4 h-4" />,
            },
            {
              id: "summary_forming",
              label: "4. สรุปขึ้นรูป",
              icon: <BarChart3 className="w-4 h-4" />,
            },
            {
              id: "summary_cutting",
              label: "5. สรุปตัด",
              icon: <ClipboardCheck className="w-4 h-4" />,
            },
            {
              id: "summary_peeling",
              label: "6. สรุปแกะ",
              icon: <History className="w-4 h-4" />,
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-4 flex items-center space-x-2 border-b-4 transition-all
                ${
                  activeTab === tab.id
                    ? "border-[#004a99] text-[#004a99] bg-blue-50/50"
                    : "border-transparent text-gray-500 hover:bg-gray-50"
                }`}
            >
              {tab.icon} <span className="font-bold text-sm">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-6 mt-4">
        {/* Render Forms (1-3) */}
        {activeTab === "forming" && <FormingForm />}
        {activeTab === "cutting" && (
          <ProcessingForm title="ข้อมูลการตัดสินค้า" type="cutting" />
        )}
        {activeTab === "peeling" && (
          <ProcessingForm title="ข้อมูลการแกะสินค้า" type="peeling" />
        )}

        {/* Render Summaries (4-6) */}
        {activeTab === "summary_forming" && <FormingSummary />}
        {activeTab === "summary_cutting" && <CuttingSummary />}
        {activeTab === "summary_peeling" && <PeelingSummary />}
      </div>
    </div>
  );
};

const FormingSummary = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      <div className="bg-white rounded-2xl shadow-sm border p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-4">สรุปรายงานการขึ้นรูป (Daily Forming Report)</h3>
        
        {/* ตารางสรุปตั้งความสูง 100 เฟรม (จากรูป 7) */}
        <div className="mb-8 overflow-hidden rounded-xl border">
          <div className="bg-slate-100 p-3 font-bold text-sm text-slate-700">สรุปความสูงสินค้า (ทุก 100 เฟรม)</div>
          <table className="w-full text-center text-sm border-collapse">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="p-3 border-r">รายการสรุป</th>
                <th className="p-3 border-r">ยอดรวม (Sum)</th>
                <th className="p-3 border-r">ค่าต่ำสุด (Min)</th>
                <th className="p-3 border-r">ค่าสูงสุด (Max)</th>
                <th className="p-3">ค่าเฉลี่ย (Avg)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-4 font-bold border-r">ความสูงทุก 100 เฟรม</td>
                <td className="p-4 border-r text-blue-700 font-bold">3724.0</td>
                <td className="p-4 border-r text-red-600 font-bold">98.0</td>
                <td className="p-4 border-r text-green-600 font-bold">98.0</td>
                <td className="p-4 bg-blue-50 font-black text-lg">98.0</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* รายการวัตถุดิบที่ใช้ (Lot Detail จากรูป 7) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-xl p-4">
            <h4 className="font-bold text-blue-800 mb-3 underline">สรุปวัตถุดิบ (Lot Detail)</h4>
            <div className="space-y-2 text-sm">
               <div className="flex justify-between border-b pb-1"><span>Lot-No ทั้งหมด:</span> <span className="font-bold">130825, 110825</span></div>
               <div className="flex justify-between border-b pb-1"><span>น้ำหนักม้วนรวม:</span> <span className="font-bold">206.5 kg</span></div>
               <div className="flex justify-between border-b pb-1"><span>ความหนาเฉลี่ย:</span> <span className="font-bold">0.55 mm</span></div>
            </div>
          </div>
          <div className="border rounded-xl p-4">
            <h4 className="font-bold text-green-800 mb-3 underline">สรุปยอดผลิตสะสม</h4>
            <div className="space-y-2 text-sm">
               <div className="flex justify-between border-b pb-1"><span>ยอดผลิตเกรด A รวม:</span> <span className="font-bold text-green-700">3,841</span></div>
               <div className="flex justify-between border-b pb-1"><span>ยอดผลิตเกรด B รวม:</span> <span className="font-bold text-orange-600">9</span></div>
               <div className="flex justify-between border-b pb-1"><span>ยอดเสีย (Scrap) รวม:</span> <span className="font-bold text-red-600">30.8 kg</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- ส่วนที่ 1: การขึ้นรูปสินค้า (Forming) ---
const FormingForm = () => {
  return (
    <div className="space-y-6">
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Section: รายละเอียดสินค้า */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center border-b pb-2">
            <Package className="w-5 h-5 mr-2 text-blue-600" /> รายละเอียดสินค้า
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <InputField label="วันที่ผลิต" type="date" />
              <InputField label="กะผลิต" type="select" options={["A", "B"]} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <InputField label="เวลาเริ่มผลิต" type="time" />
              <InputField label="เวลาผลิตเสร็จ" type="time" />
            </div>
            <InputField
              label="Job No."
              type="text"
              placeholder="ระบุ Job Number"
            />
            <div className="grid grid-cols-2 gap-4">
              <InputField label="รหัสสินค้า" type="text" />
              <InputField label="รหัสเครื่องจักร" type="text" />
            </div>
            <InputField label="รหัสวัตถุดิบ" type="text" />
          </div>
        </div>

        {/* Section: ค่ามาตรฐานสินค้า */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center border-b pb-2">
            <Settings className="w-5 h-5 mr-2 text-blue-600" /> ค่ามาตรฐานสินค้า
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              <InputField label="กว้าง" placeholder="mm" />
              <InputField label="ยาว" placeholder="mm" />
              <InputField label="สูง" placeholder="mm" />
            </div>
            <InputField label="หนา" placeholder="micron" />
            <InputField label="สี" type="text" />
            <InputField label="รหัสฟิล์ม" type="text" />
          </div>
        </div>

        {/* Section: ข้อมูลการผลิต และ ความสูง */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 md:col-span-2">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center border-b pb-2">
            <Clock className="w-5 h-5 mr-2 text-blue-600" /> ข้อมูลการผลิต
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-4">
              <InputField label="จำนวนเฟรมต่อม้วน" />
              <InputField label="จำนวนชิ้นต่อเฟรม" />
              <InputField label="ม้วนที่ได้ / 1 ชม." />
            </div>
            <div className="md:col-span-3 space-y-4">
              <label className="text-sm font-bold text-gray-700">
                ความสูงของแต่ละตั้ง
              </label>
              <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
                {[...Array(10)].map((_, i) => (
                  <input
                    key={i}
                    type="number"
                    className="p-2 border rounded-lg text-center text-sm"
                    placeholder={`#${i + 1}`}
                  />
                ))}
              </div>
              <div className="grid grid-cols-3 gap-4 mt-2">
                <div className="p-3 bg-gray-50 rounded-xl text-center border">
                  <p className="text-xs text-gray-500 font-bold">สูงสุด</p>
                  <span className="text-lg font-bold text-blue-600">0.0</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl text-center border">
                  <p className="text-xs text-gray-500 font-bold">ต่ำสุด</p>
                  <span className="text-lg font-bold text-red-600">0.0</span>
                </div>
                <div className="p-3 bg-blue-600 rounded-xl text-center shadow-md">
                  <p className="text-xs text-blue-100 font-bold">เฉลี่ย</p>
                  <span className="text-lg font-bold text-white">0.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section: ข้อมูลวัตถุดิบ ผลผลิต และปัญหา */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h4 className="font-bold text-blue-800 underline">
              วัตถุดิบและผลผลิต
            </h4>
            <InputField label="Lot No. / Seq" placeholder="Lot No." />
            <InputField label="น้ำหนักม้วน (kg)" />
            <div className="grid grid-cols-2 gap-2">
              <InputField label="ความหนาก่อน VAC" />
              <InputField label="ความหนาหลัง VAC" />
            </div>
            <InputField
              label="ประเภทกล่อง"
              type="select"
              options={["กล่องไม่มีรู", "กล่องร่องพับไม่ได้"]}
            />
            <InputField
              label="ลักษณะสินค้า"
              type="select"
              options={["กรอบ", "นิ่ม"]}
            />
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-red-700 underline">
              ปัญหาที่พบ (QC)
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {[
                "หน้ากว้างไม่เท่า",
                "เป็นรอยยับ",
                "ม้วนโฟมติด",
                "สีมีปัญหา",
                "ฟิล์มเคลือบไม่ติด/ตรง",
                "ปิดฝาไม่ได้",
                "พบสิ่งแปลกปลอม",
              ].map((issue) => (
                <label
                  key={issue}
                  className="flex items-center space-x-2 text-sm p-2 bg-gray-50 rounded-lg border border-transparent hover:border-red-200"
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded text-red-600"
                  />
                  <span>{issue}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-green-800 underline">สรุปยอดผลิต</h4>
            <div className="grid grid-cols-2 gap-2">
              <InputField label="ผลิตได้ A" />
              <InputField label="ผลิตได้ B" />
              <InputField label="เสีย (Scrap)" />
              <InputField label="รวมทั้งหมด" readOnly className="bg-green-50" />
            </div>
            <label className="block text-sm font-bold text-gray-700 mt-2">
              หมายเหตุ / Remark
            </label>
            <textarea
              className="w-full border rounded-xl p-3 text-sm h-24"
              placeholder="ระบุปัญหาที่พบระหว่างกระบวนการผลิต"
            ></textarea>
          </div>
        </div>
      </form>

      <button className="w-full bg-[#004a99] text-white py-5 rounded-2xl font-bold shadow-xl flex items-center justify-center space-x-2 active:scale-95 transition-transform">
        <Save className="w-6 h-6" />{" "}
        <span className="text-lg">บันทึกข้อมูลการขึ้นรูปทั้งหมด</span>
      </button>
    </div>
  );
};

// --- (ส่วนที่ 5) สรุปรายงานการตัดสินค้า ถอดแบบจากรูปที่ 6 ---
const CuttingSummary = () => {
  const header = {
    date: "15-08-68",
    product: "PP-PL17 FB ถาด",
    jobNo: "104/08/68",
    machine: "MC 6, 6A",
    shift: "B (ดึก)",
    start: "19:00",
    end: "04:00"
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 font-sans">
      <div className="bg-white rounded-xl shadow-md border p-6">
        {/* Header ส่วนบนตามใบงาน */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 pb-6 border-b text-sm">
          <div><p className="text-gray-500 font-bold uppercase text-[10px]">วันที่ผลิต</p><p className="font-bold">{header.date}</p></div>
          <div><p className="text-gray-500 font-bold uppercase text-[10px]">รหัสสินค้า</p><p className="font-bold">{header.product}</p></div>
          <div><p className="text-gray-500 font-bold uppercase text-[10px]">Job No.</p><p className="font-bold text-blue-700">{header.jobNo}</p></div>
          <div><p className="text-gray-500 font-bold uppercase text-[10px]">กะ/เวลา</p><p className="font-bold">{header.shift} ({header.start}-{header.end})</p></div>
        </div>

        <h3 className="text-lg font-black text-slate-800 mb-4 uppercase tracking-tight">ตารางบันทึกจำนวนการตัด (เกรด A / B)</h3>
        
        {/* โครงสร้างตารางตามรูปที่ 6 */}
        <div className="overflow-x-auto border rounded-xl">
          <table className="w-full text-xs border-collapse">
            <thead className="bg-slate-100 font-bold">
              <tr className="border-b">
                <th className="p-2 border-r w-32">ประเภท</th>
                <th colSpan="5" className="p-2 border-r text-center">จำนวนตัด (หน่วย 50 เฟรม)</th>
                <th className="p-2 border-r w-16">เศษ</th>
                <th className="p-2 bg-blue-50 text-blue-700 w-24">ยอดรวม</th>
              </tr>
            </thead>
            <tbody>
              {/* แถวที่ 1: เกรด A บรรทัดแรก */}
              <tr className="border-b h-12">
                <td className="p-2 border-r font-bold bg-green-50">เกรด A (ล็อต 1)</td>
                {[250, 500, 750, 1000, 1250].map(v => <td key={v} className="border-r p-2 text-center text-gray-400 italic">ช่องละ 50</td>)}
                <td className="border-r p-2 text-center">-</td>
                <td rowSpan="2" className="p-2 text-center font-black text-lg bg-blue-50">800</td>
              </tr>
              {/* แถวที่ 2: เกรด B บรรทัดแรก */}
              <tr className="border-b h-12">
                <td className="p-2 border-r font-bold bg-orange-50 text-orange-700">เกรด B</td>
                {[1, 2, 3, 4, 5].map(v => <td key={v} className="border-r p-2 text-center"></td>)}
                <td className="border-r p-2 text-center"></td>
              </tr>
              {/* ล็อตที่ 2 (ตามรูป 6 ด้านล่าง) */}
              <tr className="border-b h-12">
                <td className="p-2 border-r font-bold bg-green-50">เกรด A (ล็อต 2)</td>
                <td className="border-r p-2 text-center">✓</td>
                {[2, 3, 4, 5].map(v => <td key={v} className="border-r p-2 text-center"></td>)}
                <td className="border-r p-2 text-center font-bold text-blue-600 italic">20</td>
                <td className="p-2 text-center font-black text-lg bg-blue-50">270</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ยอดสรุปสุดท้าย */}
        <div className="mt-6 flex justify-end">
          <div className="bg-[#004a99] text-white p-4 rounded-2xl shadow-xl flex items-center space-x-8">
            <div className="text-center">
              <p className="text-[10px] font-bold opacity-70 uppercase">ยอดรวมเกรด A ทั้งหมด</p>
              <p className="text-3xl font-black">1,070 <span className="text-xs">เฟรม</span></p>
            </div>
            <div className="w-px h-10 bg-white/20"></div>
            <div className="text-center">
              <p className="text-[10px] font-bold opacity-70 uppercase">ยอดรวมเกรด B ทั้งหมด</p>
              <p className="text-3xl font-black text-orange-300">0 <span className="text-xs">เฟรม</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- (ส่วนที่ 6) สรุปรายงานการแกะสินค้า ถอดแบบจากรูปที่ 8 ---
const PeelingSummary = () => {
  const staffData = [
    { name: 'โม', trayA: 118, trayB: 0, lidA: 118, lidB: 0, boxA: 0, boxB: 0, total: 236 },
    { name: 'รัตน์', trayA: 118, trayB: 0, lidA: 118, lidB: 0, boxA: 0, boxB: 0, total: 236 },
    { name: 'ซัน', trayA: 0, trayB: 0, lidA: 0, lidB: 0, boxA: 120, boxB: 0, total: 240 },
    { name: 'กาก้อน', trayA: 0, trayB: 0, lidA: 0, lidB: 0, boxA: 120, boxB: 0, total: 240 },
    { name: 'ริน', trayA: 0, trayB: 0, lidA: 0, lidB: 0, boxA: 11, boxB: 0, total: 22 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 font-sans">
      <div className="bg-white rounded-xl shadow-md border p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-black text-gray-800 uppercase border-l-4 border-blue-600 pl-3">ใบสรุปการแกะสินค้า (Peeling Report)</h3>
          <div className="text-right text-[10px] font-bold text-gray-500">วันที่: 15-08-68 | เวลา: 19.00 - 04.00 น.</div>
        </div>

        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-xs text-center border-collapse">
            <thead className="bg-[#f8fafc] border-b">
              {/* Header 2 ชั้นตามรูปที่ 8 */}
              <tr className="border-b divide-x">
                <th rowSpan="2" className="p-3 w-32 bg-slate-50">ชื่อพนักงาน</th>
                <th colSpan="2" className="p-2 bg-blue-50">ถาด</th>
                <th colSpan="2" className="p-2 bg-indigo-50">ฝา</th>
                <th colSpan="2" className="p-2 bg-slate-50">กล่อง</th>
                <th rowSpan="2" className="p-3 w-28 bg-[#004a99] text-white">รวมผลงานแต่ละคน (ห่อ)</th>
              </tr>
              <tr className="divide-x border-b">
                <th className="p-2 w-16 bg-blue-50/50">A</th><th className="p-2 w-16 bg-blue-50/50">B</th>
                <th className="p-2 w-16 bg-indigo-50/50">A</th><th className="p-2 w-16 bg-indigo-50/50">B</th>
                <th className="p-2 w-16">A</th><th className="p-2 w-16">B</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {staffData.map((staff, idx) => (
                <tr key={idx} className="divide-x hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-bold text-left text-slate-700 bg-slate-50/30">{staff.name}</td>
                  <td className="p-2">{staff.trayA || ''}</td><td className="p-2">{staff.trayB || ''}</td>
                  <td className="p-2">{staff.lidA || ''}</td><td className="p-2">{staff.lidB || ''}</td>
                  <td className="p-2 font-bold">{staff.boxA || ''}</td><td className="p-2">{staff.boxB || ''}</td>
                  <td className="p-2 font-black text-blue-700 bg-blue-50/50">{staff.total}</td>
                </tr>
              ))}
            </tbody>
            {/* ส่วนสรุปรวมท้ายตาราง */}
            <tfoot className="bg-slate-900 text-white font-bold">
              <tr className="divide-x divide-slate-700">
                <td className="p-3 text-left uppercase">รวมจำนวนห่อ</td>
                <td colSpan="2" className="p-3">236 ห่อ</td>
                <td colSpan="2" className="p-3">236 ห่อ</td>
                <td colSpan="2" className="p-3">240 ห่อ</td>
                <td className="p-3 text-yellow-400 text-lg">1,016 ห่อ</td>
              </tr>
              <tr className="divide-x divide-slate-700 bg-slate-800 text-[10px]">
                <td className="p-2 text-left uppercase">รวมจำนวนชิ้น</td>
                <td colSpan="2" className="p-2 text-blue-300">8,260 ชิ้น</td>
                <td colSpan="2" className="p-2 text-blue-300">8,260 ชิ้น</td>
                <td colSpan="2" className="p-2 text-blue-300">8,400 ชิ้น</td>
                <td className="p-2 text-xl text-white">35,560 ชิ้น</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

// --- ส่วนที่ 2 & 3: ตัดและแกะสินค้า (ใช้โครงสร้างเดียวกัน) ---
const ProcessingForm = ({ title, type }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-bold text-[#004a99] mb-6 flex items-center">
          {type === "cutting" ? (
            <Scissors className="w-6 h-6 mr-2" />
          ) : (
            <Users className="w-6 h-6 mr-2" />
          )}
          {title}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 border-b pb-8">
          <InputField label="วันที่" type="date" />
          <InputField label="เวลาเริ่ม" type="time" />
          <InputField label="เวลาสิ้นสุด" type="time" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4 bg-gray-50 p-6 rounded-2xl border">
            <h4 className="font-bold flex items-center text-gray-700">
              <Users className="w-4 h-4 mr-2" /> ข้อมูลผู้ปฏิบัติงานและกะ
            </h4>
            <InputField
              label="ข้อมูลกะ"
              type="select"
              options={["กะเช้า A", "กะดึก B"]}
            />
            <InputField
              label="รายชื่อผู้ปฏิบัติงาน"
              type="text"
              placeholder="ระบุชื่อพนักงาน"
            />
            <InputField label="หมายเหตุ" type="text" />
          </div>

          <div className="space-y-4 bg-blue-50 p-6 rounded-2xl border border-blue-100">
            <h4 className="font-bold flex items-center text-blue-800">
              <Package className="w-4 h-4 mr-2" /> รายละเอียดผลผลิต
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <InputField label="จำนวน A" placeholder="0" />
              <InputField label="จำนวน B" placeholder="0" />
              <InputField label="รวมจำนวนห่อ" placeholder="0" />
              <InputField label="รวมจำนวนชิ้น" placeholder="0" />
            </div>
            <div className="mt-4 pt-4 border-t border-blue-200">
              <p className="text-sm text-gray-500 font-bold uppercase">
                รวมผลงาน / คน
              </p>
              <p className="text-3xl font-black text-[#004a99]">
                0 <span className="text-sm font-normal">ชิ้น</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <button className="w-full bg-[#004a99] text-white py-5 rounded-2xl font-bold shadow-xl flex items-center justify-center space-x-2">
        <Save className="w-6 h-6" />{" "}
        <span className="text-lg">ยืนยันการบันทึกข้อมูล</span>
      </button>
    </div>
  );
};

// Reusable Input Component
const InputField = ({ label, type = "number", options, ...props }) => (
  <div className="flex flex-col">
    <label className="text-xs font-bold text-gray-500 mb-1 ml-1 uppercase">
      {label}
    </label>
    {type === "select" ? (
      <select
        className="p-3 border rounded-xl bg-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
        {...props}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    ) : (
      <input
        type={type}
        className="p-3 border rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
        {...props}
      />
    )}
  </div>
);

export default ProductionRecord;
