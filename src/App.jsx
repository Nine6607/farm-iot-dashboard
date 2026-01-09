import { createSignal, For } from 'solid-js';

// --- ข้อมูลสินค้า (Catalog) ---
const PRODUCTS = [
  { 
    id: 1, 
    name: "เครื่องให้อาหารไก่อัตโนมัติ", 
    price: 7000, 
    category: "AUTOMATION", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT977VY2VZwlLK--cnz56ox7U5DOalBF1FY2Q&s",
    desc: "ระบบให้อาหารแม่นยำ ตั้งเวลาผ่านมือถือได้" 
  },
  { 
    id: 2, 
    name: "เครื่องรดน้ำอัตโนมัติ (50 ตรม.)", 
    price: 5000, 
    category: "SMART FARM", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyuChUopRp46hphr0Eyd90mJgav9oEW6lHNg&s",
    desc: "ดูแลสวนของคุณด้วยระบบ AI ประหยัดน้ำ 30%" 
  },
  { 
    id: 3, 
    name: "เครื่องให้อาหารปลาอัตโนมัติ", 
    price: 7500, 
    category: "AQUACULTURE", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEe22g6QH5R4B6ka7vEbEjoj23UPPkyqHBzA&s",
    desc: "ตั้งปริมาณอาหารได้ละเอียด ป้องกันน้ำเสีย" 
  },
  { 
    id: 4, 
    name: "Cloud Server สำหรับฟาร์ม", 
    price: 3000, 
    category: "CLOUD", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZkFoT53yu_re044Dyuz2vbaS0IDhtTcV2Gg&s",
    desc: "เช่ารายเดือน เชื่อมต่ออุปกรณ์ได้ไม่จำกัด" 
  },
];

function App() {
  const [cartCount, setCartCount] = createSignal(0);

  return (
    <div class="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-green-500 selection:text-white pb-20">
      
      {/* --- Simple & Clean Navbar --- */}
      <nav class="flex justify-between items-center p-6 border-b border-slate-800 bg-slate-900/80 backdrop-blur-xl sticky top-0 z-50">
        <div class="text-2xl font-black text-green-400 tracking-tighter flex items-center gap-2">
          <span class="text-3xl">🌱</span> KUY<span class="text-white">KUB</span> STORE
        </div>
        
        <button class="relative bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-green-400 transition-all active:scale-95 shadow-xl">
          Cart
          {cartCount() > 0 && (
            <span class="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full ring-2 ring-slate-950">
              {cartCount()}
            </span>
          )}
        </button>
      </nav>

      <main class="max-w-7xl mx-auto p-6">
        
        {/* --- Hero Section --- */}
        <header class="py-16 text-center">
          <h1 class="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-b from-white to-slate-500 text-transparent bg-clip-text tracking-tight">
            Premium Farm Gear
          </h1>
          <p class="text-slate-500 text-lg max-w-2xl mx-auto">
            ยกระดับเกษตรกรรมของคุณด้วยเทคโนโลยีที่ทันสมัยที่สุด สั่งซื้อออนไลน์พร้อมติดตั้งทันที
          </p>
        </header>

        {/* --- Product Grid --- */}
        <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <For each={PRODUCTS}>{(product) => (
            <div class="bg-slate-900 rounded-3xl border border-slate-800 p-2 hover:border-green-500/50 transition-all duration-300 group">
              <div class="aspect-square rounded-2xl overflow-hidden relative mb-4 bg-black">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                />
                <div class="absolute top-3 left-3 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/10 uppercase">
                  {product.category}
                </div>
              </div>

              <div class="p-4">
                <h3 class="text-lg font-bold text-white mb-1 group-hover:text-green-400 transition-colors">{product.name}</h3>
                <p class="text-slate-500 text-sm mb-6 line-clamp-2">{product.desc}</p>
                
                <div class="flex justify-between items-center">
                  <span class="text-xl font-black text-white">฿{product.price.toLocaleString()}</span>
                  <button 
                    onClick={() => setCartCount(c => c + 1)}
                    class="bg-green-500 hover:bg-green-400 text-black p-3 rounded-xl transition-all active:scale-90 shadow-lg shadow-green-500/20"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}</For>
        </section>

      </main>

      {/* --- Footer Footer --- */}
      <footer class="mt-20 border-t border-slate-900 p-10 text-center">
        <p class="text-slate-600 text-sm">© 2026 KUYKUB Smart Farming Solutions. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;