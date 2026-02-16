import './index.css'; 
import { createSignal, For, onMount, createEffect } from 'solid-js';

const SERVICES = [
  { id: 1, name: "บริการให้คำปรึกษา & วางแผนโครงการ", category: "PLANNING", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=500&auto=format&fit=crop", desc: "วางแผนผังการทำงาน (Workflow) และประเมินงบประมาณก่อนติดตั้งจริง เพื่อความคุ้มค่าสูงสุด" },
  { id: 2, name: "งานออกแบบ 2D & 3D Drawing", category: "DESIGN", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=500&auto=format&fit=crop", desc: "เขียนแบบวิศวกรรม ออกแบบตู้คอนโทรล เครื่องจักร และระบบกลไกด้วยซอฟต์แวร์มาตรฐาน" },
  { id: 3, name: "รับติดตั้งระบบ Automation ครบวงจร", category: "INSTALLATION", image: "https://images.unsplash.com/photo-1563770660941-20978e870e26?q=80&w=500&auto=format&fit=crop", desc: "ติดตั้งระบบ PLC, HMI, เซ็นเซอร์ และระบบนิวเมติกส์ พร้อมเขียนโปรแกรมควบคุม" },
  { id: 4, name: "บริการติดตั้งกล้องวงจรปิด (CCTV)", category: "SECURITY", image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=500&auto=format&fit=crop", desc: "ติดตั้งระบบรักษาความปลอดภัย ดูออนไลน์ได้ 24 ชม. พร้อมระบบ AI ตรวจจับความเคลื่อนไหว" },
  { id: 5, name: "งานวางระบบโครงสร้างข่ายสายไฟ", category: "WIRING", image: "https://images.unsplash.com/photo-1517420704952-d9f397412122?q=80&w=500&auto=format&fit=crop", desc: "เดินสายไฟอุตสาหกรรม จัดสายเข้าตู้คอนโทรล มาตรฐานความปลอดภัยสูง" },
];

// เพิ่มตัวแปรแบรนด์พันธมิตร
const TECH_BRANDS = ["SIEMENS", "MITSUBISHI", "OMRON", "KEYENCE", "ABB", "DELTA", "PANASONIC"];

function App() {
  const [cartItems, setCartItems] = createSignal([]);
  const [isCartOpen, setIsCartOpen] = createSignal(false);
  const [showToast, setShowToast] = createSignal(false);

  onMount(() => {
    const savedCart = localStorage.getItem('pnpk_services');
    if (savedCart) setCartItems(JSON.parse(savedCart));
  });

  createEffect(() => {
    localStorage.setItem('pnpk_services', JSON.stringify(cartItems()));
  });

  const addToCart = (service) => {
    const existing = cartItems().find(item => item.id === service.id);
    if (!existing) {
      setCartItems([...cartItems(), { ...service, quantity: 1, cartId: Date.now() }]);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } else {
      alert("รายการนี้ถูกเพิ่มในใบเสนอราคาแล้วครับ");
    }
  };

  const removeFromCart = (cartId) => {
    setCartItems(cartItems().filter(item => item.cartId !== cartId));
  };

  return (
    // เปลี่ยน pb-20 เป็น pb-0 เพราะเรามี Footer แล้ว
    <div class="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-cyan-500 selection:text-white pb-0 relative overflow-hidden">
      
      {/* Background Glow Effect */}
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-cyan-600/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      <div class={`fixed bottom-24 left-1/2 -translate-x-1/2 z-[200] bg-cyan-500 text-black px-6 py-3 rounded-full font-bold shadow-[0_10px_30px_rgba(6,182,212,0.4)] transition-all duration-300 ${showToast() ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
        เพิ่มลงรายการขอใบเสนอราคาแล้ว! 📋
      </div>

      <nav class="flex justify-between items-center px-6 py-4 border-b border-slate-800/50 bg-[#020617]/80 backdrop-blur-xl sticky top-0 z-50">
        <div class="text-2xl font-black text-cyan-400 flex items-center gap-2 tracking-wide hover:scale-105 transition-transform cursor-pointer">
          ⚙️ PNPK
        </div>

        <div class="hidden lg:flex items-center gap-8 font-bold text-sm text-slate-300">
          <a href="#" class="text-cyan-400 border-b-2 border-cyan-400 pb-1 flex items-center gap-1.5 hover:text-cyan-300 transition-colors">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
            HOME
          </a>
          <a href="#" class="hover:text-cyan-400 transition-colors flex items-center gap-1 cursor-pointer group">
            SERVICES 
            <svg class="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
          </a>
          <a href="#" class="hover:text-cyan-400 transition-colors flex items-center gap-1 cursor-pointer group">
            SOLUTIONS
            <svg class="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
          </a>
          <a href="#" class="hover:text-cyan-400 transition-colors">COMPANY</a>
          <a href="#" class="hover:text-cyan-400 transition-colors">CONTACT</a>
        </div>

        <button onClick={() => setIsCartOpen(true)} class="relative bg-white text-black px-6 py-2.5 rounded-full font-bold hover:bg-cyan-400 transition-all active:scale-95 shadow-[0_0_15px_rgba(34,211,238,0.3)] border border-cyan-200 flex items-center gap-2">
          Quotation 
          {cartItems().length > 0 && <span class="bg-black text-cyan-400 px-2 py-0.5 rounded-full text-xs animate-pulse">{cartItems().length}</span>}
        </button>
      </nav>

      <main class="max-w-7xl mx-auto p-6 relative z-10">
        
        {/* --- Hero Section อัปเกรดใหม่ --- */}
        <header class="py-24 text-center">
          <div class="inline-block mb-6 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm font-bold tracking-widest uppercase shadow-[0_0_10px_rgba(6,182,212,0.2)]">
            ⚙️ Next-Gen Automation Solutions
          </div>
          <h1 class="text-5xl md:text-8xl font-black mb-6 bg-gradient-to-b from-white via-slate-200 to-slate-500 text-transparent bg-clip-text tracking-tighter uppercase leading-tight">
            Industrial <br/> <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Automation</span>
          </h1>
          <p class="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
            ยกระดับสายการผลิตและลดต้นทุนด้วยเทคโนโลยีระบบควบคุมอัตโนมัติ บริการวางแผน ออกแบบ 2D/3D และรับติดตั้งครบวงจร (Turnkey Solutions) โดยทีมวิศวกรผู้เชี่ยวชาญ
          </p>
          
          <div class="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button class="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-400 text-black px-8 py-4 rounded-full font-black transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] active:scale-95 text-lg">
              นัดหมายประเมินหน้างานฟรี
            </button>
            <button class="w-full sm:w-auto bg-slate-800/50 hover:bg-slate-700 text-white px-8 py-4 rounded-full font-bold border border-slate-700 hover:border-cyan-500/50 transition-all active:scale-95 text-lg flex items-center justify-center gap-2 backdrop-blur-sm">
              ดูผลงานการติดตั้ง
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </button>
          </div>
        </header>

        {/* --- Trust Signals (แบรนด์พาร์ทเนอร์) --- */}
        <div class="py-10 border-y border-slate-800/50 mb-20 bg-slate-900/30 backdrop-blur-md rounded-3xl overflow-hidden shadow-inner shadow-slate-800/50">
          <p class="text-center text-slate-500 text-sm font-bold tracking-widest mb-6 uppercase">Supported Technologies & Systems</p>
          <div class="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 hover:opacity-100 transition-opacity duration-500 px-4">
            <For each={TECH_BRANDS}>{(brand) => (
              <span class="text-xl md:text-2xl font-black tracking-tighter text-slate-400 hover:text-cyan-400 transition-colors cursor-default drop-shadow-md">{brand}</span>
            )}</For>
          </div>
        </div>

        {/* --- Services Section --- */}
        <section class="mb-32">
          <div class="flex flex-col items-center md:items-start mb-12">
            <h2 class="text-3xl md:text-5xl font-black text-white mb-2 tracking-tight">OUR EXPERTISE</h2>
            <div class="w-24 h-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"></div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <For each={SERVICES}>{(service) => (
              <div class="bg-slate-900/50 backdrop-blur-sm rounded-3xl border border-slate-800 p-2 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all duration-500 group hover:-translate-y-2 flex flex-col">
                <div class="aspect-video rounded-2xl overflow-hidden mb-4 bg-black relative">
                  <img src={service.image} class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-70 group-hover:opacity-100" />
                  <div class="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div class="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-cyan-400 text-xs font-bold px-3 py-1 rounded-full border border-cyan-500/30">
                    {service.category}
                  </div>
                </div>
                <div class="p-5 flex-grow flex flex-col">
                  <h3 class="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">{service.name}</h3>
                  <p class="text-slate-400 text-sm mb-8 flex-grow leading-relaxed">{service.desc}</p>
                  <div class="flex justify-between items-center mt-auto border-t border-slate-800/50 pt-4">
                    <span class="text-xs font-bold text-slate-500 flex items-center gap-1">
                      <svg class="w-4 h-4 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      ประเมินหน้างาน
                    </span>
                    <button onClick={() => addToCart(service)} class="bg-cyan-500 hover:bg-cyan-400 text-black px-5 py-2.5 rounded-xl transition-all active:scale-90 font-bold shadow-lg shadow-cyan-500/20 text-sm flex items-center gap-2">
                      เพิ่มลงรายการ +
                    </button>
                  </div>
                </div>
              </div>
            )}</For>
          </div>
        </section>
      </main>

      {/* --- Corporate Footer --- */}
      <footer class="bg-slate-950 border-t border-slate-900 py-16 px-6 relative z-10">
        <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div class="text-3xl font-black text-cyan-400 flex items-center gap-2 mb-4">⚙️ PNPK TEAM</div>
            <p class="text-slate-500 text-sm leading-relaxed mb-6">ผู้เชี่ยวชาญด้านการออกแบบและติดตั้งระบบ Automation, PLC, Robot และโครงข่ายไฟฟ้าอุตสาหกรรมแบบครบวงจร</p>
            <div class="flex gap-4">
              <div class="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-all cursor-pointer">FB</div>
              <div class="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-all cursor-pointer">LN</div>
            </div>
          </div>
          <div>
            <h4 class="text-white font-black tracking-widest mb-6">CONTACT US</h4>
            <div class="space-y-4">
              <p class="text-slate-400 text-sm flex items-center gap-3"><span class="text-xl">📞</span> 08X-XXX-XXXX (ทีมวิศวกร)</p>
              <p class="text-slate-400 text-sm flex items-center gap-3"><span class="text-xl">✉️</span> contact@pnpk-automation.com</p>
              <p class="text-slate-400 text-sm flex items-start gap-3"><span class="text-xl">📍</span> คลองหก, อำเภอคลองหลวง<br/>ปทุมธานี, ประเทศไทย 12120</p>
            </div>
          </div>
          <div>
            <h4 class="text-white font-black tracking-widest mb-6">BUSINESS HOURS</h4>
            <div class="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
              <p class="text-slate-400 text-sm mb-3 flex justify-between"><span>จันทร์ - ศุกร์:</span> <span class="text-white">08:00 - 18:00</span></p>
              <p class="text-slate-400 text-sm mb-4 flex justify-between"><span>เสาร์:</span> <span class="text-white">09:00 - 15:00</span></p>
              <div class="w-full h-px bg-slate-800 mb-4"></div>
              <p class="text-cyan-400 text-sm font-bold text-center flex items-center justify-center gap-2">
                <span class="relative flex h-3 w-3"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span><span class="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span></span>
                ทีมซ่อมบำรุงฉุกเฉิน 24 ชม.
              </p>
            </div>
          </div>
        </div>
        <div class="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-600 text-xs">
          <p>© {new Date().getFullYear()} PNPK Automation Team. All rights reserved.</p>
          <div class="flex gap-4">
            <a href="#" class="hover:text-cyan-400 transition-colors">Privacy Policy</a>
            <a href="#" class="hover:text-cyan-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* --- Floating LINE Button (ทักแชท) --- */}
      <a href="#" class="fixed bottom-6 right-6 z-[90] bg-[#00B900] text-white p-4 rounded-full shadow-[0_0_20px_rgba(0,185,0,0.4)] hover:scale-110 transition-transform flex items-center justify-center group border-2 border-[#00B900] hover:border-white">
        <svg class="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 3.55 8.845 8.442 9.581.393.076.923.238 1.058.546.12.276.077.712.037 1.008-.06.439-.39 2.527-.478 3.067-.107.643.336.852.885.552.427-.234 4.545-2.678 6.182-4.526C21.493 18.068 24 14.479 24 10.304z"/></svg>
        <span class="absolute -top-12 right-0 bg-white text-black text-sm font-bold px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl">ทักแชทปรึกษาวิศวกร</span>
      </a>

      {/* --- RFQ Modal (เหมือนเดิม แต่ปรับสีนิดหน่อย) --- */}
      {isCartOpen() && (
        <div class="fixed inset-0 z-[100] flex items-center justify-end md:p-6">
          <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
          <div class="relative bg-[#020617] border-l border-slate-800 w-full max-w-md h-full md:h-auto md:max-h-[90vh] md:rounded-3xl p-8 shadow-2xl flex flex-col animate-in slide-in-from-right duration-500">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-2xl font-black text-white flex items-center gap-2">
                <svg class="w-6 h-6 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                รายการขอใบเสนอราคา
              </h2>
              <button onClick={() => setIsCartOpen(false)} class="bg-slate-800 p-2 rounded-full hover:bg-red-500 hover:text-white transition-colors">✕</button>
            </div>
            
            <p class="text-sm text-cyan-400 mb-6 bg-cyan-500/10 p-4 rounded-xl border border-cyan-500/20 font-bold">
              * ทีมวิศวกร PNPK จะติดต่อกลับเพื่อประเมินราคาตามหน้างานจริงครับ
            </p>

            <div class="flex-grow overflow-y-auto space-y-3 pr-2 mb-6">
              <For each={cartItems()}>{(item) => (
                <div class="flex items-center gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800 group hover:border-cyan-500/50 transition-colors">
                  <div class="flex-grow">
                    <h4 class="text-sm font-bold text-white leading-tight mb-1">{item.name}</h4>
                    <span class="text-[10px] text-cyan-400 uppercase tracking-widest font-bold bg-cyan-500/10 px-2 py-0.5 rounded">{item.category}</span>
                  </div>
                  <button onClick={() => removeFromCart(item.cartId)} class="text-slate-500 hover:text-red-500 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                  </button>
                </div>
              )}</For>
              {cartItems().length === 0 && (
                <div class="text-center text-slate-500 py-16 flex flex-col items-center">
                  <svg class="w-16 h-16 text-slate-800 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                  ยังไม่ได้เลือกบริการที่สนใจครับ
                </div>
              )}
            </div>

            <div class="border-t border-slate-800 pt-6 mt-auto">
              <button 
                disabled={cartItems().length === 0} 
                class="w-full bg-cyan-500 disabled:bg-slate-800 disabled:text-slate-500 hover:bg-cyan-400 text-black font-black py-4 rounded-2xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] disabled:shadow-none active:scale-95 flex items-center justify-center gap-2" 
                onClick={() => {
                  alert(`ระบบบันทึกคำขอของคุณเรียบร้อยแล้ว ทีมวิศวกรจะรีบติดต่อกลับครับ!`);
                  setIsCartOpen(false); 
                  setCartItems([]); 
                }}
              >
                ส่งข้อมูลให้ทีมวิศวกร 🚀
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
