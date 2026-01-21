import React, { useState } from "react";
import { Mail, Lock, LogIn, CheckCircle2, Loader2 } from "lucide-react";

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        onLoginSuccess();
      }, 1500);
    }, 2000);
  };

  return (
    <div className="flex h-screen w-full bg-white overflow-hidden font-sans">
      
      {/* --- Left Side: New Brand Layout (ตามที่คุณสั่ง) --- */}
      <div className="hidden lg:flex lg:w-[45%] relative bg-linear-to-b from-[#004a99] to-[#001d3d] items-center justify-center p-12 overflow-hidden">
        
        {/* เลเยอร์ตกแต่ง (ลบ TPV ออกแล้ว) */}
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-5%] left-[-5%] w-64 h-64 bg-blue-600/10 rounded-full blur-2xl"></div>

        <div className="relative z-10 flex flex-col items-center max-w-md">
          {/* รูปภาพลูกศรลง (ด้านบน) */}
          <div className="mb-6 animate-bounce duration-2000">
            <img 
              src="https://www.thepvimol.co.th/wp-content/uploads/2025/07/thepvimol-home-h-pic-1.png" 
              alt="Arrow Down Decor" 
              className="w-20 h-auto opacity-80"
            />
          </div>

          {/* รูปภาพกล่องบรรจุ (ตรงกลาง) */}
          <div className="bg-white/5 backdrop-blur-sm p-4 rounded-[3rem] border border-white/10 shadow-2xl">
            <img 
              src="https://www.thepvimol.co.th/wp-content/uploads/2025/08/thepvimol_home_h_side2_edit.png" 
              alt="Thepvimol Product" 
              className="w-full h-auto drop-shadow-[0_15px_40px_rgba(0,0,0,0.4)]"
            />
          </div>

          {/* ข้อความ (ด้านล่าง) */}
          <div className="mt-10 text-center">
            <h2 className="text-3xl font-black text-white leading-tight tracking-tight uppercase">
              Thepvimol <br/> 
              <span className="text-blue-300">Production Management</span>
            </h2>
            <div className="mt-4 flex items-center justify-center space-x-3">
              <div className="h-0.5 w-8 bg-blue-400"></div>
              <p className="text-blue-100 font-bold text-sm uppercase tracking-[0.3em] opacity-90 italic">
                More than packaging
              </p>
              <div className="h-0.5 w-8 bg-blue-400"></div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Right Side: Login Form (คงเดิม) --- */}
      <div className="w-full lg:w-[55%] flex items-center justify-center p-6 md:p-12 bg-slate-50">
        <div className="w-full max-w-md animate-in fade-in slide-in-from-right-8 duration-700">
          
          <div className="text-center mb-10">
            <div className="inline-block bg-white p-4 rounded-3xl shadow-xl border border-slate-100 mb-6">
              <img 
                src="https://www.thepvimol.co.th/wp-content/uploads/2025/07/thepvimol-logo.png" 
                alt="Thepvimol Logo" 
                className="h-16 w-auto object-contain"
              />
            </div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">Login to System</h1>
            <p className="text-slate-400 font-bold mt-2 uppercase text-[10px] tracking-[0.2em]">กรุณาระบุข้อมูลเพื่อเข้าใช้งาน</p>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-slate-100 relative">
            {isSuccess ? (
              <div className="py-10 text-center animate-in zoom-in duration-300">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} strokeWidth={3} />
                </div>
                <h3 className="text-2xl font-black text-slate-800">เข้าสู่ระบบสำเร็จ</h3>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Email</label>
                  <div className="relative">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"><Mail size={20} /></div>
                    <input required type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="admin@thepvimol.com"
                      className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-[#004a99] transition-all font-bold text-slate-700"/>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Password</label>
                  <div className="relative">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"><Lock size={20} /></div>
                    <input required type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="••••••••"
                      className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-[#004a99] transition-all font-bold text-slate-700"/>
                  </div>
                </div>

                <button disabled={isLoading} type="submit"
                  className="w-full flex items-center justify-center space-x-3 py-4 bg-[#004a99] text-white rounded-2xl font-black text-lg shadow-xl hover:bg-[#003366] transition-all active:scale-95 disabled:opacity-70 border-b-4 border-blue-900">
                  {isLoading ? <Loader2 size={24} className="animate-spin" /> : <><LogIn size={24} /> <span>เข้าสู่ระบบ</span></>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;