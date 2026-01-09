import { createSignal, onCleanup, For } from 'solid-js';

// --- ข้อมูลสินค้า (แก้ไข: ใช้ลิงก์รูปออนไลน์ รูปขึ้นชัวร์ 100%) ---
const PRODUCTS = [
  { 
    id: 1, 
    name: "เครื่องให้อาหารไก่อัตโนมัติ (ขนาดเริ่มต้น)", 
    price: 7000, 
    category: "AUTOMATION&IOT", 
    // ใช้รูปออนไลน์
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT977VY2VZwlLK--cnz56ox7U5DOalBF1FY2Q&s",
    desc: "Automated precise feeding schedule" 
  },
  { 
    id: 2, 
    name: "เครื่องรดน้ำอัตโนมัติ (ขนาดเริ่มต้น)", 
    price: 5000, 
    category: "AUTOMATION&IOT", 
    // ใช้รูปออนไลน์
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyuChUopRp46hphr0Eyd90mJgav9oEW6lHNg&s",
    desc: "Coverage up to 50 sq. meters" 
  },
  { 
    id: 3, 
    name: "เครื่องให้อาหารปลาอัตโนมัติ (ขนาดเริ่มต้น)", 
    price: 7500, 
    category: "AUTOMATION&IOT", 
    // ใช้รูปออนไลน์
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEe22g6QH5R4B6ka7vEbEjoj23UPPkyqHBzA&s",
    desc: "Measure N-P-K and Moisture" 
  },
  { 
    id: 4, 
    name: "บริการให้เช่า Server (รายเดือน)", 
    price: 3000, 
    category: "server&cloud", 
    // ใช้รูปออนไลน์
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZkFoT53yu_re044Dyuz2vbaS0IDhtTcV2Gg&s",
    desc: "Connects up to 200 devices" 
  },
];

function App() {
  // --- State Management ---
  const [cartCount, setCartCount] = createSignal(0);
  const [temp, setTemp] = createSignal(24.3);
  const [humidity, setHumidity] = createSignal(60);
  const [systemStatus, setSystemStatus] = createSignal("NORMAL");

  // --- Real-time Simulation Loop ---
  const timer = setInterval(() => {
    // สุ่มตัวเลขให้ขยับเหมือน Sensor จริง
    setTemp(t => +(t + (Math.random() - 0.5)).toFixed(1));
    setHumidity(h => +(h + (Math.random() * 2 - 1)).toFixed(0));
    
    // Logic ตรวจสอบความร้อน
    if (temp() > 34) setSystemStatus("WARNING: อุณหภูมิสูง");
    else setSystemStatus("อุณหภูมิปกติ");
  }, 800); // อัปเดตทุก 0.8 วินาที

  // เคลียร์ Timer เมื่อปิดหน้าเว็บ
  onCleanup(() => clearInterval(timer));

  return (
    <div class="min-h-screen bg-slate-900 text-slate-200 font-mono selection:bg-green-500 selection:text-white pb-20">
      
      {/* --- Navbar --- */}
      <nav class="flex justify-between items-center p-6 border-b border-slate-700 bg-slate-800/90 backdrop-blur-md sticky top-0 z-50 shadow-2xl">
        <div class="text-2xl font-bold text-green-400 tracking-tighter cursor-pointer hover:text-green-300 transition-colors flex items-center gap-2">
          <span class="text-3xl">🌱</span> KUY<span class="text-white">KUB</span>
        </div>
        
        <div class="flex gap-4 items-center">
          {/* Status Indicator */}
          <div class="hidden md:flex bg-slate-900/50 border border-slate-600 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider items-center gap-2">
            <span class={`w-2 h-2 rounded-full ${systemStatus().includes("อุณหภูมิปกติ") ? "bg-green-500 animate-pulse" : "bg-red-500 animate-ping"}`}></span>
            SYS: <span class={systemStatus().includes("อุณหภูมิปกติ") ? "text-green-400" : "text-red-400"}>{systemStatus()}</span>
          </div>

          {/* Cart Button */}
          <button class="relative bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white px-5 py-2 rounded-lg font-bold shadow-lg shadow-green-900/40 active:scale-95 transition-all group">
            <span class="group-hover:hidden">ตระกร้า</span>
            <span class="hidden group-hover:inline">ดูตระกร้า</span>
            {cartCount() > 0 && (
              <span class="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full animate-bounce ring-2 ring-slate-900">
                {cartCount()}
              </span>
            )}
          </button>
        </div>
      </nav>

      <main class="max-w-7xl mx-auto p-6">
        
        {/* --- Hero Dashboard Section --- */}
        <section class="mb-16 mt-8">
          <header class="text-center mb-10">
            <h1 class="text-4xl md:text-6xl font-black mb-4 bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-500 text-transparent bg-clip-text drop-shadow-sm tracking-tight">
              Control Center
            </h1>
            <p class="text-slate-400 text-lg">Real-time Environmental Monitoring</p>
          </header>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Temperature */}
            <div class="bg-slate-800/60 backdrop-blur-sm p-8 rounded-3xl border border-slate-700/50 shadow-2xl relative overflow-hidden group hover:border-slate-600 transition-all">
              <div class="absolute -right-10 -top-10 w-40 h-40 bg-red-500/10 rounded-full blur-3xl group-hover:bg-red-500/20 transition-all duration-500"></div>
              <h3 class="text-slate-400 text-xs font-bold tracking-[0.2em] uppercase mb-4">Temperature</h3>
              <div class="flex items-end gap-2">
                <span class="text-7xl font-black text-white tracking-tighter">{temp()}</span>
                <span class="text-2xl text-slate-500 mb-2">°C</span>
              </div>
              {/* Progress Bar */}
              <div class="w-full bg-slate-700/50 h-2 mt-6 rounded-full overflow-hidden">
                <div class="h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(239,68,68,0.5)]" style={{ width: `${(temp() / 50) * 100}%` }}></div>
              </div>
            </div>

            {/* Card 2: Humidity */}
            <div class="bg-slate-800/60 backdrop-blur-sm p-8 rounded-3xl border border-slate-700/50 shadow-2xl relative overflow-hidden group hover:border-slate-600 transition-all">
              <div class="absolute -right-10 -top-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-500"></div>
              <h3 class="text-slate-400 text-xs font-bold tracking-[0.2em] uppercase mb-4">Soil Humidity</h3>
              <div class="flex items-end gap-2">
                <span class="text-7xl font-black text-blue-400 tracking-tighter">{humidity()}</span>
                <span class="text-2xl text-slate-500 mb-2">%</span>
              </div>
              {/* Progress Bar */}
              <div class="w-full bg-slate-700/50 h-2 mt-6 rounded-full overflow-hidden">
                <div class="h-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(59,130,246,0.5)]" style={{ width: `${humidity()}%` }}></div>
              </div>
            </div>

            {/* Card 3: System Status */}
            <div class="bg-slate-800/60 backdrop-blur-sm p-8 rounded-3xl border border-slate-700/50 shadow-2xl flex flex-col justify-center items-center relative overflow-hidden group">
               <div class={`absolute inset-0 opacity-5 transition-colors duration-500 ${systemStatus().includes("NORMAL") ? "bg-green-500" : "bg-red-500"}`}></div>
              <div class={`w-8 h-8 rounded-full mb-4 shadow-[0_0_25px] ${systemStatus().includes("NORMAL") ? "bg-green-500 shadow-green-500 animate-pulse" : "bg-red-500 shadow-red-500 animate-ping"}`}></div>
              <div class={`text-3xl font-bold tracking-widest ${systemStatus().includes("NORMAL") ? "text-white" : "text-red-400"}`}>{systemStatus()}</div>
              <p class="text-xs text-slate-500 mt-2 uppercase tracking-wider">System Integrity Check</p>
            </div>
          </div>
        </section>

        {/* --- Store Section --- */}
        <section>
          <div class="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-slate-700 pb-6 gap-4">
            <div>
              <h2 class="text-3xl font-bold text-white flex items-center gap-3">
                <span class="w-2 h-8 bg-green-500 rounded-full"></span>
                บริการของทางร้าน
              </h2>
              <p class="text-slate-500 text-sm mt-2 ml-5">Industrial-grade equipment for modern agriculture</p>
            </div>
            <span class="bg-slate-800 text-slate-400 text-xs px-3 py-1 rounded-full border border-slate-700">Stock Update: Just Now</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <For each={PRODUCTS}>{(product) => (
              <div class="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden hover:border-green-500/50 hover:shadow-2xl hover:shadow-green-900/10 hover:-translate-y-2 transition-all duration-300 group flex flex-col h-full">
                
                {/* Image Area */}
                <div class="h-64 overflow-hidden relative bg-slate-900">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out opacity-90 group-hover:opacity-100"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-80"></div>
                  <span class="absolute top-4 left-4 bg-green-500/20 text-green-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest backdrop-blur-md border border-green-500/30 shadow-lg">
                    {product.category}
                  </span>
                </div>

                {/* Content Area */}
                <div class="p-6 flex flex-col flex-grow">
                  <h3 class="text-xl font-bold text-white mb-2 leading-tight group-hover:text-green-400 transition-colors">{product.name}</h3>
                  <p class="text-slate-400 text-xs mb-6 leading-relaxed">{product.desc}</p>
                  
                  <div class="mt-auto pt-4 border-t border-slate-700/50 flex justify-between items-center">
                    <span class="text-2xl font-black text-white">฿{product.price.toLocaleString()}</span>
                    <button 
                      onClick={() => setCartCount(c => c + 1)}
                      class="bg-slate-700 hover:bg-green-600 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-green-500/50 active:scale-90"
                      title="Add to Cart"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}</For>
          </div>
        </section>

      </main>
    </div>
  );
}

export default App;