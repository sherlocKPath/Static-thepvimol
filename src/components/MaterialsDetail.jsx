import React, { useState, useMemo } from "react";
import {
  ChevronLeft,
  Edit2,
  Plus,
  Trash2,
  Settings,
  Layers,
  User,
  FileText,
  ClipboardList,
  X,
  Save,
} from "lucide-react";

const MaterialDetail = ({
  requisitionData,
  requisitions = [],
  setCurrentPage,
  onBack,
}) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Logic: กรองเฉพาะรายการเบิกที่มี Job Order เดียวกับที่กดเข้ามา
  const currentJobItems = useMemo(() => {
    return requisitions.filter(
      (item) => item.jobOrderId === requisitionData?.jobOrderId,
    );
  }, [requisitions, requisitionData]);

  // สถานะจำลองสำหรับ Job นี้ (ดึงจากตัวแรกของกลุ่ม)
  const jobStatus =
    requisitionData?.jobOrderId === "J104/0868" ? "กำลังผลิต" : "เบิกวัตถุดิบ";

  const handleEditClick = (item) => {
    setEditingItem(item);
    setShowEditModal(true);
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans text-slate-800 pb-20">
      {/* --- 1. TOP HEADER BAR --- */}
      <div className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="bg-[#004a99] p-2 rounded-xl text-white shadow-lg shadow-blue-200">
            <ClipboardList size={20} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight leading-none uppercase">
              Job Order No :{" "}
              <span className="text-blue-700">
                {requisitionData?.jobOrderId || "N/A"}
              </span>
            </h1>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
              Management Detail View
            </p>
          </div>
        </div>
        <button
          onClick={onBack}
          className="flex items-center space-x-2 px-6 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold text-xs hover:bg-slate-50 shadow-sm active:scale-95 uppercase"
        >
          <ChevronLeft size={16} /> <span>Back to list</span>
        </button>
      </div>

      <main className="max-w-7xl mx-auto p-6 lg:p-8 animate-in fade-in duration-500">
        {/* --- 2. INFORMATION CARDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <InfoCard
            title="Production Status"
            icon={<Settings size={18} className="text-blue-600" />}
          >
            <DetailRow
              label="สถานะการผลิต"
              value={jobStatus}
              color={
                jobStatus === "กำลังผลิต" ? "text-orange-600" : "text-blue-600"
              }
              isStrong
            />
            <DetailRow label="วันที่สั่งผลิต" value="14/08/2568" isStrong />
          </InfoCard>

          <InfoCard
            title="Production Specifications"
            icon={<Layers size={18} className="text-indigo-600" />}
          >
            <DetailRow
              label="รหัสสินค้า"
              value={requisitionData?.productCode}
              isStrong
            />
            <DetailRow
              label="รหัสวัตถุดิบ"
              value={requisitionData?.materialId}
              isStrong
            />
            <DetailRow
              label="วันที่ผลิต"
              value={jobStatus === "กำลังผลิต" ? "15/08/2568" : "-"}
            />
            <DetailRow
              label="รหัสเครื่องจักร"
              value={jobStatus === "กำลังผลิต" ? "MC-VF-1" : "-"}
            />
          </InfoCard>

          <InfoCard
            title="Accountability"
            icon={<User size={18} className="text-emerald-600" />}
          >
            <DetailRow label="ผู้เบิกวัตถุดิบ" value="ปฐมพร โตกล่ำ" isStrong />
            <DetailRow label="แผนก" value="Production Supervisor." />
            <DetailRow label="เบอร์ติดต่อ" value="062-492-2196" />
          </InfoCard>
        </div>

        {/* --- 3. REQUISITION ITEMS TABLE --- */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden mb-10">
          <div className="bg-[#f1f3f5] px-8 py-4 border-b border-slate-300 flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center">
              <Layers size={18} className="mr-2" /> รายการเบิกวัตถุดิบใน Job
              Order
            </h3>
            <button
              onClick={() => setCurrentPage("requisition")}
              className="flex items-center space-x-2 bg-[#004a99] hover:bg-[#003366] text-white px-5 py-2.5 rounded-lg shadow-md transition-all font-medium text-sm active:scale-95 border-b-4 border-blue-900 uppercase"
            >
              <Plus size={14} /> <span>เพิ่มรายการเบิก</span>
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr className="text-[11px] font-bold uppercase text-slate-500 divide-x divide-slate-200">
                  <th className="px-6 py-4 text-center w-28">Tool</th>
                  <th className="px-4 py-4 text-center w-20">ลำดับที่</th>
                  <th className="px-6 py-4">รหัสวัตถุดิบ</th>
                  <th className="px-6 py-4">Lot No.</th>
                  <th className="px-6 py-4 text-center">วันที่ผลิตวัตถุดิบ</th>
                  <th className="px-6 py-4 text-center">จำนวน (ม้วน)</th>
                  <th className="px-6 py-4 text-center">ผลิตสินค้า</th>
                  <th className="px-6 py-4">หมายเหตุ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm font-medium">
                {currentJobItems.map((item, idx) => (
                  <tr
                    key={item.id}
                    className="hover:bg-blue-50/20 transition-colors divide-x divide-slate-100"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => handleEditClick(item)}
                          className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all border border-blue-100 shadow-sm"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={handleDeleteClick}
                          className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-600 hover:text-white transition-all border border-red-100 shadow-sm"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center text-slate-400 font-bold">
                      {idx + 1}
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-800">
                      {item.materialId}
                    </td>
                    <td className="px-6 py-4 text-slate-700">{item.lotNo}</td>
                    <td className="px-6 py-4 text-center text-slate-500">
                      {item.mfgDate}
                    </td>
                    <td className="px-6 py-4 text-center font-bold text-orange-600">
                      {item.qty}
                    </td>
                    <td className="px-6 py-4 text-center font-bold text-slate-800 bg-slate-50/50">
                      {item.productCode}
                    </td>
                    <td className="px-6 py-4 text-slate-400 italic text-xs">
                      {item.remark || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- 4. ADDITIONAL REMARKS --- */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
          <div className="px-8 py-5 border-b border-slate-200 bg-slate-50/50 flex items-center space-x-3">
            <button className="p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:scale-90 transition-all shadow-md">
              <Plus size={16} />
            </button>
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
              บันทึกเพิ่มเติม (Notes)
            </h3>
          </div>
          <div className="p-8">
            <div className="flex items-start space-x-6 border-l-4 border-yellow-400 bg-yellow-50/50 p-6 rounded-r-2xl">
              <div className="space-y-2">
                <div className="flex items-center space-x-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <span>19 Jan 2026 • 18:00 น.</span>
                  <span className="text-blue-700">Admin Staff</span>
                </div>
                <p className="text-sm font-bold text-slate-700 italic">
                  "วัตถุดิบชุดนี้มีความหนาไม่สม่ำเสมอในม้วนที่ 3
                  ฝ่ายขึ้นรูปกรุณาตรวจสอบค่า VAC ให้มากกว่าปกติ"
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* --- MODALS --- */}
      {showEditModal && (
        <EditModal item={editingItem} onClose={() => setShowEditModal(false)} />
      )}
      {showDeleteConfirm && (
        <DeleteModal onCancel={() => setShowDeleteConfirm(false)} />
      )}
    </div>
  );
};

// --- Sub-components (Modal & Cards) ---

const InfoCard = ({ title, icon, children }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
    <div className="flex items-center space-x-3 mb-4 border-b border-slate-100 pb-3">
      {icon}
      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
        {title}
      </h4>
    </div>
    <div className="space-y-3">{children}</div>
  </div>
);

const DetailRow = ({ label, value, isStrong, color = "text-slate-700" }) => (
  <div className="flex flex-col">
    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-0.5">
      {label}
    </span>
    <span
      className={`text-sm font-bold ${isStrong ? "font-black" : ""} ${color}`}
    >
      {value || "-"}
    </span>
  </div>
);

const EditModal = ({ item, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
    <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
      <div className="bg-[#004a99] p-6 text-white flex justify-between items-center">
        <h3 className="font-bold uppercase tracking-tight flex items-center">
          <Edit2 size={18} className="mr-2" /> แก้ไขรายการเบิกวัตถุดิบ
        </h3>
        <button onClick={onClose} className="hover:bg-white/20 p-1 rounded-lg">
          <X size={20} />
        </button>
      </div>
      <div className="p-8 grid grid-cols-2 gap-4">
        <ModalField label="รหัสวัตถุดิบ" defaultValue={item?.materialId} />
        <ModalField label="Lot NO." defaultValue={item?.lotNo} />
        <ModalField
          label="วันที่ผลิตวัตถุดิบ"
          type="date"
          defaultValue={item?.mfgDate}
        />
        <ModalField
          label="จำนวน (ม้วน)"
          type="number"
          defaultValue={item?.qty}
        />
        <ModalField
          label="ผลิตสินค้า"
          className="col-span-2"
          defaultValue={item?.productCode}
        />
        <div className="col-span-2 space-y-1">
          <label className="text-xs font-bold text-slate-500 uppercase">
            หมายเหตุ
          </label>
          <textarea
            className="w-full p-3 border border-slate-200 rounded-xl font-bold text-sm h-24"
            defaultValue={item?.remark}
          ></textarea>
        </div>
      </div>
      <div className="p-6 bg-slate-50 flex justify-end space-x-3">
        <button
          onClick={onClose}
          className="px-6 py-2 font-bold text-slate-500 hover:bg-slate-100 rounded-xl transition-all"
        >
          ยกเลิก
        </button>
        <button className="px-8 py-2 bg-blue-600 text-white font-bold hover:bg-blue-700 rounded-xl shadow-lg shadow-blue-200 flex items-center space-x-2">
          <Save size={16} /> <span>บันทึกการแก้ไข</span>
        </button>
      </div>
    </div>
  </div>
);

const DeleteModal = ({ onCancel }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
    <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-xs w-full text-center">
      <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
        <Trash2 size={32} />
      </div>
      <h3 className="text-lg font-bold text-slate-800 mb-2">
        ยืนยันการลบรายการ?
      </h3>
      <p className="text-sm text-slate-500 mb-6">
        หากลบแล้วข้อมูลนี้จะไม่สามารถเรียกคืนได้
      </p>
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={onCancel}
          className="py-2.5 font-bold text-slate-500 bg-slate-100 rounded-xl"
        >
          ยกเลิก
        </button>
        <button className="py-2.5 font-bold text-white bg-red-600 rounded-xl shadow-lg shadow-red-200">
          ยืนยัน
        </button>
      </div>
    </div>
  </div>
);

const ModalField = ({ label, className = "", ...props }) => (
  <div className={`space-y-1 ${className}`}>
    <label className="text-xs font-bold text-slate-500 uppercase">
      {label}
    </label>
    <input
      className="w-full p-3 border border-slate-200 rounded-xl font-bold text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
      {...props}
    />
  </div>
);

export default MaterialDetail;
