import { createSignal, For, onMount, createEffect } from 'solid-js';

const PRODUCTS = [
  { id: 1, name: "เครื่องให้อาหารไก่อัตโนมัติ(ขนาดเริ่มต้น)", price: 7000, category: "AUTOMATION", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT977VY2VZwlLK--cnz56ox7U5DOalBF1FY2Q&s", desc: "ระบบให้อาหารแม่นยำ ตั้งเวลาผ่านมือถือได้" },
  { id: 2, name: "เครื่องรดน้ำอัตโนมัติ(ขนาดเริ่มต้น)", price: 5000, category: "AUTOMATION", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyuChUopRp46hphr0Eyd90mJgav9oEW6lHNg&s", desc: "ดูแลสวนของคุณด้วยระบบ AI ประหยัดน้ำ 30%" },
  { id: 3, name: "เครื่องให้อาหารปลาอัตโนมัติ(ขนาดเริ่มต้น)", price: 7500, category: "AUTOMATION", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEe22g6QH5R4B6ka7vEbEjoj23UPPkyqHBzA&s", desc: "ตั้งปริมาณอาหารได้ละเอียด ป้องกันน้ำเสีย" },
  { id: 4, name: "Cloud Server สำหรับฟาร์ม(รายเดือน)", price: 3000, category: "CLOUD", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZkFoT53yu_re044Dyuz2vbaS0IDhtTcV2Gg&s", desc: "เช่ารายเดือน เชื่อมต่ออุปกรณ์ได้ไม่จำกัด" },
];

function App() {
  const [cartItems, setCartItems] = createSignal([]);
  const [isCartOpen, setIsCartOpen] = createSignal(false);
  const [showToast, setShowToast] = createSignal(false);

  // --- [เทพที่ 1: LocalStorage] โหลดข้อมูลตะกร้าตอนเปิดเว็บ ---
  onMount(() => {
    const savedCart = localStorage.getItem('kuykub_cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  });

  // --- [เทพที่ 1: LocalStorage] เซฟข้อมูลทุกครั้งที่ตะกร้าเปลี่ยน ---
  createEffect(() => {
    localStorage.setItem('kuykub_cart', JSON.stringify(cartItems()));
  });

  const addToCart = (product) => {
    setCartItems([...cartItems(), { ...product, cartId: Date.now() }]);
    // --- [เทพที่ 2: UX Toast] แจ้งเตือนเวลาเพิ่มของสำเร็จ ---
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const removeFromCart = (cartId) => {
    setCartItems(cartItems().filter(item => item.cartId !== cartId));
  };

  const totalPrice = () => cartItems().reduce((sum, item) => sum + item.price, 0);

  return (
    <div class="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-green-500 selection:text-white pb-20">
      
      {/* --- Toast Notification --- */}
      <div class={`fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] bg-green-500 text-black px-6 py-3 rounded-full font-bold shadow-2xl transition-all duration-300 ${showToast() ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
        เพิ่มสินค้าลงตะกร้าแล้ว! 🛒
      </div>

      <nav class="flex justify-between items-center p-6 border-b border-slate-800 bg-slate-900/80 backdrop-blur-xl sticky top-0 z-50">
        <div class="text-2xl font-black text-green-400 tracking-tighter flex items-center gap-2">
          <span class="text-3xl">🌱</span> KUY<span class="text-white">KUB</span> STORE
        </div>
        
        <button onClick={() => setIsCartOpen(true)} class="relative bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-green-400 transition-all active:scale-95 shadow-xl">
          Cart
          {cartItems().length > 0 && (
            <span class="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full ring-2 ring-slate-950 animate-bounce">
              {cartItems().length}
            </span>
          )}
        </button>
      </nav>

      <main class="max-w-7xl mx-auto p-6">
        <header class="py-16 text-center">
          <h1 class="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-b from-white to-slate-500 text-transparent bg-clip-text tracking-tight animate-in fade-in slide-in-from-top-4 duration-1000">
            Next-Gen Farm Gear
          </h1>
          <p class="text-slate-500 text-lg max-w-2xl mx-auto">ขีดสุดของเทคโนโลยี เพื่อฟาร์มยุคใหม่</p>
        </header>

        <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <For each={PRODUCTS}>{(product) => (
            <div class="bg-slate-900 rounded-3xl border border-slate-800 p-2 hover:border-green-500/50 transition-all duration-500 group hover:-translate-y-2">
              <div class="aspect-square rounded-2xl overflow-hidden relative mb-4 bg-black">
                <img src={product.image} class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
              </div>
              <div class="p-4">
                <h3 class="text-lg font-bold text-white mb-1 group-hover:text-green-400 transition-colors">{product.name}</h3>
                <p class="text-slate-500 text-sm mb-6 line-clamp-2 min-h-[40px]">{product.desc}</p>
                <div class="flex justify-between items-center">
                  <span class="text-xl font-black text-white">฿{product.price.toLocaleString()}</span>
                  <button onClick={() => addToCart(product)} class="bg-green-500 hover:bg-green-400 text-black p-3 rounded-xl transition-all active:scale-90 shadow-lg shadow-green-500/20">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                  </button>
                </div>
              </div>
            </div>
          )}</For>
        </section>
      </main>

      {/* --- Cart Modal --- */}
      {isCartOpen() && (
        <div class="fixed inset-0 z-[100] flex items-center justify-end md:p-6">
          <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
          <div class="relative bg-slate-900 border-l border-slate-800 w-full max-w-md h-full md:h-auto md:rounded-3xl p-8 shadow-2xl flex flex-col animate-in slide-in-from-right duration-500">
            <div class="flex justify-between items-center mb-8">
              <h2 class="text-2xl font-black text-white">Your Cart ({cartItems().length})</h2>
              <button onClick={() => setIsCartOpen(false)} class="bg-slate-800 p-2 rounded-full hover:text-red-400 transition-colors">✕</button>
            </div>
            <div class="flex-grow overflow-y-auto space-y-4 pr-2">
              <For each={cartItems()}>{(item) => (
                <div class="flex items-center gap-4 bg-slate-800/50 p-3 rounded-2xl border border-slate-700/50 animate-in fade-in zoom-in duration-300">
                  <img src={item.image} class="w-16 h-16 rounded-lg object-cover" />
                  <div class="flex-grow">
                    <h4 class="text-sm font-bold text-white leading-tight">{item.name}</h4>
                    <p class="text-green-400 font-bold">฿{item.price.toLocaleString()}</p>
                  </div>
                  <button onClick={() => removeFromCart(item.cartId)} class="text-slate-500 hover:text-red-500 text-xs font-bold uppercase">ลบ</button>
                </div>
              )}</For>
              {cartItems().length === 0 && <p class="text-center text-slate-500 py-10">เหงาจัง... ยังไม่มีของเลย</p>}
            </div>
            <div class="mt-8 pt-6 border-t border-slate-800">
              <div class="flex justify-between text-xl font-black text-white mb-6">
                <span>Total:</span>
                <span class="text-green-400">฿{totalPrice().toLocaleString()}</span>
              </div>
              <button disabled={cartItems().length === 0} class="w-full bg-green-500 disabled:bg-slate-700 hover:bg-green-400 text-black font-black py-4 rounded-2xl transition-all shadow-lg active:scale-95" onClick={() => alert(`ชำระเงิน${totalPrice().toLocaleString()} บาทเรียบร้อย! ขอบคุณที่อุดหนุน KUYKUB STORE 🌱`)}>
                CHECKOUT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;