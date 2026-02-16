import { createSignal, For, onMount, createEffect } from 'solid-js';

const PRODUCTS = [
  { id: 1, name: "งานติดตั้งระบบ Automation", category: "Service", image: "", desc: "ติดตั้งระบบ Automation ครบวงจรสำหรับฟาร์มของคุณ" },
  { id: 2, name: "งานออกแบบ 2D & Drawing", category: "Service", image: "", desc: "ออกแบบแผนผังที่คุณต้องการ" },
  { id: 3, name: "งานออกแบบ 3D & Drawing", category: "AUTOMATION", image: "", desc: "ออกแบบระบบ 3D สำหรับฟาร์มของคุณ" },
  { id: 4, name: "งานติดตั้งระบบกล้อง CCTV", category: "AUTOMATION", image: "", desc: "ติดตั้งกล้องวงจรปิดสำหรับฟาร์มของคุณ" },
  { id: 5, name: "งานออกแบบระบบควบคุมอัตโนมัติ", category: "AUTOMATION", image: "", desc: "ออกแบบระบบควบคุมอัตโนมัติ สำหรับฟาร์มของคุณ" },
  { id: 6, name: "งานติดตั้งระบบควบคุมอัตโนมัติ", category: "AUTOMATION", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEe22g6QH5R4B6ka7vEbEjoj23UPPkyqHBzA&s", desc: "ติดตั้งระบบควบคุมอัตโนมัติ สำหรับฟาร์มของคุณ" },

];

function App() {
  const [cartItems, setCartItems] = createSignal([]);
  const [isCartOpen, setIsCartOpen] = createSignal(false);
  const [showToast, setShowToast] = createSignal(false);

  onMount(() => {
    const savedCart = localStorage.getItem('kuykub_cart');
    if (savedCart) setCartItems(JSON.parse(savedCart));
  });

  createEffect(() => {
    localStorage.setItem('kuykub_cart', JSON.stringify(cartItems()));
  });

  const addToCart = (product) => {
    const existing = cartItems().find(item => item.id === product.id);
    if (existing) {
      updateQuantity(existing.cartId, 1);
    } else {
      setCartItems([...cartItems(), { ...product, quantity: 1, cartId: Date.now() }]);
    }
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const updateQuantity = (cartId, change, absoluteValue = null) => {
    setCartItems(cartItems().map(item => {
      if (item.cartId === cartId) {
        let newQty = absoluteValue !== null ? absoluteValue : item.quantity + change;
        return { ...item, quantity: Math.max(1, newQty) };
      }
      return item;
    }));
  };

  const removeFromCart = (cartId) => {
    setCartItems(cartItems().filter(item => item.cartId !== cartId));
  };

  const totalPrice = () => cartItems().reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalQty = () => cartItems().reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div class="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-green-500 selection:text-white pb-20">
      
      <div class={`fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] bg-green-500 text-black px-6 py-3 rounded-full font-bold shadow-2xl transition-all duration-300 ${showToast() ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
        เพิ่มสินค้าแล้ว! 🛒
      </div>

      <nav class="flex justify-between items-center p-6 border-b border-slate-800 bg-slate-900/80 backdrop-blur-xl sticky top-0 z-50">
        <div class="text-2xl font-black text-green-400 flex items-center gap-2">PNPK Automation Team</div>
        <button onClick={() => setIsCartOpen(true)} class="relative bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-green-400 transition-all active:scale-95 shadow-xl">
          Cart {totalQty() > 0 && `(${totalQty()})`}
        </button>
      </nav>

      <main class="max-w-7xl mx-auto p-6">
        <header class="py-16 text-center">
          <h1 class="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-b from-white to-slate-500 text-transparent bg-clip-text tracking-tight animate-in fade-in slide-in-from-top-4 duration-1000">PNPK Automation Team</h1>
          <p class="text-slate-500 text-lg max-w-2xl mx-auto">ที่สุดของงานAutomation และงานงานออกแบบครบวงจรสำหรับคุณ</p>
        </header>

        <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <For each={PRODUCTS}>{(product) => (
            <div class="bg-slate-900 rounded-3xl border border-slate-800 p-2 hover:border-green-500/50 transition-all group hover:-translate-y-2">
              <div class="aspect-square rounded-2xl overflow-hidden mb-4 bg-black relative">
                <img src={product.image} class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
              </div>
              <div class="p-4">
                <h3 class="text-lg font-bold text-white mb-1 group-hover:text-green-400 transition-colors">{product.name}</h3>
                <p class="text-slate-500 text-sm mb-6 line-clamp-2 min-h-[40px]">{product.desc}</p>
                <div class="flex justify-between items-center">
                  <span class="text-xl font-black text-white">฿{product.price.toLocaleString()}</span>
                  <button onClick={() => addToCart(product)} class="bg-green-500 hover:bg-green-400 text-black p-3 rounded-xl transition-all active:scale-90 shadow-lg shadow-green-500/20">+</button>
                </div>
              </div>
            </div>
          )}</For>
        </section>
      </main>

      {/* --- Cart Modal (Fixed Mobile Stuck Bug) --- */}
      {isCartOpen() && (
        <div class="fixed inset-0 z-[100] flex items-center justify-end md:p-6">
          <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
          <div class="relative bg-slate-900 border-l border-slate-800 w-full max-w-md h-full md:h-auto md:rounded-3xl p-8 shadow-2xl flex flex-col animate-in slide-in-from-right duration-500">
            <div class="flex justify-between items-center mb-8">
              <h2 class="text-2xl font-black text-white">Your Cart ({totalQty()})</h2>
              <button onClick={() => setIsCartOpen(false)} class="bg-slate-800 p-2 rounded-full hover:text-red-400 transition-colors">✕</button>
            </div>
            
            <div class="flex-grow overflow-y-auto space-y-4 pr-2">
              <For each={cartItems()}>{(item) => (
                <div class="flex items-center gap-4 bg-slate-800/50 p-3 rounded-2xl border border-slate-700/50">
                  <img src={item.image} class="w-16 h-16 rounded-lg object-cover" />
                  <div class="flex-grow">
                    <h4 class="text-sm font-bold text-white leading-tight">{item.name}</h4>
                    <p class="text-green-400 font-bold mb-2">฿{(item.price * item.quantity).toLocaleString()}</p>
                    <div class="flex items-center gap-2">
                      <button onClick={() => updateQuantity(item.cartId, -1)} class="w-7 h-7 bg-slate-700 rounded-md flex items-center justify-center hover:bg-red-500 transition-colors text-white">-</button>
                      <input 
                        type="number" 
                        min="1"
                        value={item.quantity}
                        onInput={(e) => {
                          const val = parseInt(e.currentTarget.value);
                          updateQuantity(item.cartId, 0, isNaN(val) ? 1 : val);
                        }}
                        class="w-12 h-7 bg-slate-800 border border-slate-700 rounded-md text-center text-white font-bold text-xs focus:ring-1 focus:ring-green-500 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <button onClick={() => updateQuantity(item.cartId, 1)} class="w-7 h-7 bg-slate-700 rounded-md flex items-center justify-center hover:bg-green-500 transition-colors text-white">+</button>
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(item.cartId)} class="text-slate-500 hover:text-red-500 text-xs">ลบ</button>
                </div>
              )}</For>
              {cartItems().length === 0 && <p class="text-center text-slate-500 py-10">เหงาจัง... ยังไม่มีของเลย</p>}
            </div>

            <div class="mt-8 pt-6 border-t border-slate-800">
              <div class="flex justify-between text-xl font-black text-white mb-6">
                <span>Total:</span>
                <span class="text-green-400">฿{totalPrice().toLocaleString()}</span>
              </div>
              
              {/* ปุ่ม Checkout ที่แก้ไขให้ปิดตะกร้าหลังจบงาน */}
              <button 
                disabled={cartItems().length === 0} 
                class="w-full bg-green-500 disabled:bg-slate-700 hover:bg-green-400 text-black font-black py-4 rounded-2xl transition-all shadow-lg active:scale-95" 
                onClick={() => {
                  alert(`ยอดชำระ ฿${totalPrice().toLocaleString()} บาทเรียบร้อย! ขอบคุณที่อุดหนุนครับ`);
                  setIsCartOpen(false); // ปิดตะกร้าทันทีหลัง Checkout
                  setCartItems([]); // ล้างตะกร้าให้พร้อมสำหรับลูกค้ารายใหม่ (หรือลบทิ้งถ้าอยากให้ค้างไว้)
                }}
              >
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