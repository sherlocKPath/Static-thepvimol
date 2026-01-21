import React, { useState } from "react";
import Navbar from "./components/Navbar";
import JobOrderInterface from "./pages/JoborderInterface";
import RawMaterialIssue from "./components/WithdrawRawmaterial";
import ProductionRecord from "./pages/ProductionRecord";
import WarehouseInbound from "./pages/WarehouseInbound";
import MaterialList from "./pages/MaterialList";
import JobOrderDetail from "./components/JobOrderDetails";
import ProductionReport from "./pages/ProductionReport";
import ProductMolding from "./pages/ProductMolding";
import ProductWriteoff from "./pages/ProductWriteoff";
import ProductUnpack from "./pages/ProductUnpack";
import UsersManagement from "./pages/UsersManagement";
import RolesManagement from "./pages/RolesManagement";
import PermissionSettings from "./components/PermissionSettings";
import UserSettings from "./components/UserSettings";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import FormingRecord from "./components/FormingRecord";
import WriteoffRecord from "./components/WriteoffRecord";
import UnpackRecord from "./components/UnpackRecord";
import MaterialDetail from "./components/MaterialsDetail";
import MoldingDetail from "./components/MoldingDetails";

function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // View States สำหรับสลับระหว่างหน้า Table และหน้า Form
  const [moldingView, setMoldingView] = useState("list"); // "list" หรือ "form"
  const [writeoffView, setWriteoffView] = useState("list"); // "list" หรือ "form"
  const [unpackView, setUnpackView] = useState("list"); // "list" หรือ "form"
  const [selectedMolding, setSelectedMolding] = useState(null);

  // Master Data Views
  const [currentRoleView, setCurrentRoleView] = useState("list");
  const [editingRole, setEditingRole] = useState(null);
  const [currentUserView, setCurrentUserView] = useState("list");
  const [editingUser, setEditingUser] = useState(null);
  const [materialView, setMaterialView] = useState("list"); // "list" หรือ "detail"
  const [selectedRequisition, setSelectedRequisition] = useState(null);

  const [requisitions, setRequisitions] = useState([
    {
      id: "REQ-001",
      jobOrderId: "J104/0868",
      materialId: "5B660055FB",
      lotNo: "110825",
      mfgDate: "09-08-2568",
      qty: 5,
      productCode: "PP-PL17",
      remark: "ด่วน",
    },
    {
      id: "REQ-002",
      jobOrderId: "J104/0868",
      materialId: "5B660055FB",
      lotNo: "150825",
      mfgDate: "11-08-2568",
      qty: 2,
      productCode: "PP-PL17",
      remark: "-",
    },
    {
      id: "REQ-002",
      jobOrderId: "J107/0868",
      materialId: "1L660040AN",
      lotNo: "130825",
      mfgDate: "13-08-2568",
      qty: 4,
      productCode: "PT-PL17",
      remark: "-",
    },
  ]);

  const addRequisition = (newData) => {
    const newEntry = { id: `REQ-00${requisitions.length + 1}`, ...newData };
    setRequisitions([newEntry, ...requisitions]);
    setCurrentPage("matlist");
  };

  if (!isLoggedIn) {
    return <Login onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  const handleNavigate = (page) => {
    if (page === "matlist") {
      setMaterialView("list");
    }

    if (page === "production") {
      setMoldingView("form");
      setCurrentPage("molding");
    } else if (page === "writeoff_form") {
      setWriteoffView("form");
      setCurrentPage("writeoff");
    } else if (page === "unpack_form") {
      setUnpackView("form");
      setCurrentPage("unpack");
    } else {
      setCurrentPage(page);
    }
  };

  const handleEditMoldingFromDashboard = (data) => {
    setSelectedMolding(data); // เก็บข้อมูล Job ที่ส่งมา
    setMoldingView("detail"); // เปลี่ยน View เป็น Detail
    setCurrentPage("molding"); // เปลี่ยนหน้าหลักเป็น Molding
  };

  return (
    <div className="flex h-screen w-full bg-[#f8fafc] overflow-hidden font-sans">
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        onSignOut={() => setIsLoggedIn(false)}
      />

      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          isSidebarOpen ? "ml-72" : "ml-0"
        }`}
      >
        <div className="h-16 w-full shrink-0" />

        <main className="flex-1 overflow-y-auto bg-[#f8fafc]">
          <div className="w-full h-full animate-in fade-in duration-500">
            {currentPage === "dashboard" && (
              <Dashboard
                setCurrentPage={handleNavigate}
                onEditMolding={handleEditMoldingFromDashboard}
              />
            )}

            {currentPage === "jobs" && (
              <JobOrderInterface
                setCurrentPage={setCurrentPage}
                setSelectedJob={setSelectedJob}
              />
            )}

            {currentPage === "jobDetail" && (
              <JobOrderDetail
                jobData={selectedJob}
                setCurrentPage={setCurrentPage}
              />
            )}

            {currentPage === "requisition" && (
              <RawMaterialIssue
                addRequisition={addRequisition}
                setCurrentPage={setCurrentPage}
              />
            )}

            {currentPage === "matlist" &&
              (materialView === "list" ? (
                <MaterialList
                  requisitions={requisitions}
                  setCurrentPage={setCurrentPage}
                  onEdit={(data) => {
                    setSelectedRequisition(data);
                    setMaterialView("detail");
                  }}
                />
              ) : (
                <MaterialDetail
                  requisitionData={selectedRequisition}
                  requisitions={requisitions} // *** เพิ่มบรรทัดนี้เพื่อส่งข้อมูลทั้งหมดไป Filter ***
                  setCurrentPage={setCurrentPage}
                  onBack={() => setMaterialView("list")}
                />
              ))}

            {/* --- MOLDING MANAGEMENT --- */}
            {currentPage === "molding" &&
              (moldingView === "list" ? (
                <ProductMolding
                  setCurrentPage={setCurrentPage}
                  // เมื่อกดปุ่ม +เพิ่มบันทึก ให้เปลี่ยน view เป็น form
                  onAddNew={() => setMoldingView("form")}
                  // เมื่อกดปุ่ม Edit ในตาราง ให้เก็บข้อมูลและเปลี่ยน view เป็น detail
                  onEdit={(data) => {
                    setSelectedMolding(data);
                    setMoldingView("detail");
                  }}
                />
              ) : moldingView === "form" ? (
                // หน้ากรอกแบบฟอร์มบันทึกการขึ้นรูป (FormingRecord)
                <FormingRecord onBack={() => setMoldingView("list")} />
              ) : (
                // หน้ารายละเอียดการขึ้นรูป (MoldingDetail)
                <MoldingDetail
                  moldingData={selectedMolding}
                  onBack={() => setMoldingView("list")}
                />
              ))}

            {/* --- WRITEOFF: สลับระหว่างตารางกับฟอร์ม --- */}
            {currentPage === "writeoff" &&
              (writeoffView === "list" ? (
                <ProductWriteoff
                  setCurrentPage={(page) => {
                    if (page === "writeoff_form")
                      setWriteoffView("form"); // เมื่อกดปุ่ม "เพิ่ม"
                    else setCurrentPage(page);
                  }}
                />
              ) : (
                <WriteoffRecord onBack={() => setWriteoffView("list")} />
              ))}

            {/* --- UNPACK: สลับระหว่างตารางกับฟอร์ม --- */}
            {currentPage === "unpack" &&
              (unpackView === "list" ? (
                <ProductUnpack
                  setCurrentPage={(page) => {
                    if (page === "unpack_form")
                      setUnpackView("form"); // เมื่อกดปุ่ม "เพิ่ม"
                    else setCurrentPage(page);
                  }}
                />
              ) : (
                <UnpackRecord onBack={() => setUnpackView("list")} />
              ))}

            {currentPage === "warehouse" && (
              <WarehouseInbound setCurrentPage={setCurrentPage} />
            )}
            {currentPage === "reports" && (
              <ProductionReport setCurrentPage={setCurrentPage} />
            )}

            {/* --- MASTER DATA MGMT --- */}
            {currentPage === "user_mgmt" &&
              (currentUserView === "list" ? (
                <UsersManagement
                  onEditUser={(user) => {
                    setEditingUser(user);
                    setCurrentUserView("settings");
                  }}
                />
              ) : (
                <UserSettings
                  user={editingUser}
                  onBack={() => setCurrentUserView("list")}
                />
              ))}

            {currentPage === "role_mgmt" &&
              (currentRoleView === "list" ? (
                <RolesManagement
                  onEditRole={(role) => {
                    setEditingRole(role);
                    setCurrentRoleView("edit");
                  }}
                />
              ) : (
                <PermissionSettings
                  role={editingRole}
                  onBack={() => setCurrentRoleView("list")}
                />
              ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
