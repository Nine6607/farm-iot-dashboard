import './index.css'; 
import { createSignal, For, onMount, createEffect } from 'solid-js';

const SERVICES = [
  { id: 1, name: "บริการให้คำปรึกษา & วางแผนโครงการ", category: "PLANNING", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=500&auto=format&fit=crop", desc: "วางแผนผังการทำงาน (Workflow) และประเมินงบประมาณก่อนติดตั้งจริง เพื่อความคุ้มค่าสูงสุด" },
  { id: 2, name: "งานออกแบบ 2D & 3D Drawing", category: "DESIGN", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=500&auto=format&fit=crop", desc: "เขียนแบบวิศวกรรม ออกแบบตู้คอนโทรล เครื่องจักร และระบบกลไกด้วยซอฟต์แวร์มาตรฐาน" },
  { id: 3, name: "รับติดตั้งระบบ Automation ครบวงจร", category: "INSTALLATION", image: "https://images.unsplash.com/photo-1563770660941-20978e870e26?q=80&w=500&auto=format&fit=crop", desc: "ติดตั้งระบบ PLC, HMI, เซ็นเซอร์ และระบบนิวเมติกส์ พร้อมเขียนโปรแกรมควบคุม" },
  { id: 4, name: "บริการติดตั้งกล้องวงจรปิด (CCTV)", category: "SECURITY", image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=500&auto=format&fit=crop", desc: "ติดตั้งระบบรักษาความปลอดภัย ดูออนไลน์ได้ 24 ชม. พร้อมระบบ AI ตรวจจับความเคลื่อนไหว" },
  { id: 5, name: "งานวางระบบโครงสร้างข่ายสายไฟ", category: "WIRING", image: "https://images.unsplash.com/photo-1517420704952-d9f397412122?q=80&w=500&auto=format&fit=crop", desc: "เดินสายไฟอุตสาหกรรม จัดสายเข้าตู้คอนโทรล มาตรฐานความปลอดภัยสูง" },
];

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
    <div class="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500 selection:text-white pb-20">
      
      <div class={`fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] bg-cyan-500 text-black px-6 py-3 rounded-full font-bold shadow-2xl transition-all duration-300 ${showToast() ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
        เพิ่มลงรายการขอใบเสนอราคาแล้ว! 📋
      </div>

      {/* --- อัปเกรด Navbar โฉมใหม่ สไตล์องค์กรใหญ่ --- */}
      <nav class="flex justify-between items-center px-6 py-4 border-b border-slate-800 bg-slate-900/90 backdrop-blur-xl sticky top-0 z-50 shadow-lg shadow-black/50">
        
        {/* ฝั่งซ้าย: โลโก้ */}
        <div class="text-2xl font-black text-cyan-400 flex items-center gap-2 tracking-wide hover:scale-105 transition-transform cursor-pointer">
          ⚙️ PNPK
        </div>

        {/* ตรงกลาง: เมนูแบบในรูป (ซ่อนในมือถือ โชว์เฉพาะจอคอม) */}
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

        {/* ฝั่งขวา: ปุ่มขอใบเสนอราคา */}
        <button onClick={() => setIsCartOpen(true)} class="relative bg-white text-black px-6 py-2.5 rounded-full font-bold hover:bg-cyan-400 transition-all active:scale-95 shadow-[0_0_15px_rgba(34,211,238,0.3)]">
          Quotation {cartItems().length > 0 && <span class="bg-black text-cyan-400 px-2 py-0.5 rounded-full text-xs ml-1">{cartItems().length}</span>}
        </button>

      </nav>

      <main class="max-w-7xl mx-auto p-6">
        <header class="py-16 text-center">
          <h1 class="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-b from-white to-cyan-600 text-transparent bg-clip-text tracking-tight animate-in fade-in slide-in-from-top-4 duration-1000 uppercase">Industrial Automation</h1>
          <p class="text-slate-400 text-lg max-w-2xl mx-auto mb-8">บริการวางแผน ออกแบบ 2D/3D และรับติดตั้งระบบควบคุมอัตโนมัติ กล้อง CCTV แบบครบวงจร (Turnkey Solutions)</p>
          <button class="bg-cyan-500 hover:bg-cyan-400 text-black px-8 py-3 rounded-full font-bold transition-all shadow-lg shadow-cyan-500/20 active:scale-95">ติดต่อทีมวิศวกรด่วน</button>
        </header>

        <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <For each={SERVICES}>{(service) => (
            <div class="bg-slate-900 rounded-3xl border border-slate-800 p-2 hover:border-cyan-500/50 transition-all group hover:-translate-y-2 flex flex-col">
              <div class="aspect-video rounded-2xl overflow-hidden mb-4 bg-black relative">
                <img src={service.image} class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-70 group-hover:opacity-100" />
                <div class="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-cyan-400 text-xs font-bold px-3 py-1 rounded-full border border-cyan-500/30">
                  {service.category}
                </div>
              </div>
              <div class="p-4 flex-grow flex flex-col">
                <h3 class="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{service.name}</h3>
                <p class="text-slate-500 text-sm mb-6 flex-grow">{service.desc}</p>
                <div class="flex justify-between items-center mt-auto">
                  <span class="text-md font-bold text-slate-400 border border-slate-700 px-3 py-1 rounded-lg">ประเมินหน้างาน</span>
                  <button onClick={() => addToCart(service)} class="bg-cyan-500 hover:bg-cyan-400 text-black px-4 py-2 rounded-xl transition-all active:scale-90 font-bold shadow-lg shadow-cyan-500/20 text-sm">
                    สนใจบริการนี้
                  </button>
                </div>
              </div>
            </div>
          )}</For>
        </section>
      </main>

      {/* --- RFQ Modal --- */}
      {isCartOpen() && (
        <div class="fixed inset-0 z-[100] flex items-center justify-end md:p-6">
          <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
          <div class="relative bg-slate-900 border-l border-slate-800 w-full max-w-md h-full md:h-auto md:max-h-[90vh] md:rounded-3xl p-8 shadow-2xl flex flex-col animate-in slide-in-from-right duration-500">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-2xl font-black text-white">รายการขอใบเสนอราคา</h2>
              <button onClick={() => setIsCartOpen(false)} class="bg-slate-800 p-2 rounded-full hover:text-red-400 transition-colors">✕</button>
            </div>
            
            <p class="text-sm text-cyan-400 mb-4 bg-cyan-500/10 p-3 rounded-xl border border-cyan-500/20">
              * ทีมงาน PNPK จะติดต่อกลับเพื่อประเมินราคาตามขอบเขตงานจริงครับ
            </p>

            <div class="flex-grow overflow-y-auto space-y-3 pr-2 mb-6">
              <For each={cartItems()}>{(item) => (
                <div class="flex items-center gap-4 bg-slate-800/50 p-3 rounded-2xl border border-slate-700/50">
                  <div class="flex-grow">
                    <h4 class="text-sm font-bold text-white leading-tight">{item.name}</h4>
                    <span class="text-xs text-slate-500">{item.category}</span>
                  </div>
                  <button onClick={() => removeFromCart(item.cartId)} class="text-red-400 bg-red-400/10 px-3 py-1 rounded-lg hover:bg-red-500 hover:text-white transition-colors text-xs font-bold">ลบทิ้ง</button>
                </div>
              )}</For>
              {cartItems().length === 0 && <p class="text-center text-slate-500 py-10">ยังไม่ได้เลือกบริการที่สนใจครับ</p>}
            </div>

            <div class="border-t border-slate-800 pt-6 mt-auto">
              <button 
                disabled={cartItems().length === 0} 
                class="w-full bg-cyan-500 disabled:bg-slate-700 hover:bg-cyan-400 text-black font-black py-4 rounded-2xl transition-all shadow-lg shadow-cyan-500/20 active:scale-95 flex items-center justify-center gap-2" 
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