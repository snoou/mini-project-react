import React, { useState, Suspense, useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { 
  OrbitControls, 
  Environment, 
  ContactShadows, 
  useGLTF, 
  PerspectiveCamera,
  Html,
  useProgress,
  Center,
  Stage
} from '@react-three/drei'
import * as THREE from 'three'
import { ShoppingBag, Star, ArrowRight, Loader2, RotateCcw } from 'lucide-react'

// --- محصولات ---
const PRODUCTS = [
  { id: 1, name: "Summer Crop Set", price: "1,150,000", color: "#ffffff", desc: "ست نیم‌تنه و دامن نخی، خنک و مناسب فصل تابستان." },
  { id: 2, name: "Oceanic Blue", price: "1,250,000", color: "#3b82f6", desc: "رنگ آبی اقیانوسی با پارچه ضد حساسیت." },
  { id: 3, name: "Midnight Set", price: "1,400,000", color: "#1a1a1a", desc: "نسخه مشکی کلاسیک با دوخت سفارشی." }
];

// --- لودر ---
function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="flex flex-col items-center bg-white/80 p-4 rounded-2xl backdrop-blur-sm shadow-xl">
        <Loader2 className="animate-spin text-indigo-600 mb-2" size={24} />
        <span className="text-[10px] font-bold font-mono tracking-tighter">{progress.toFixed(0)}% LOADED</span>
      </div>
    </Html>
  )
}

// --- مدل اصلاح شده برای دیده شدن ---
function ClothingModel({ color }) {
  const { nodes, materials } = useGLTF('/input-transformed.glb')

  // اعمال رنگ به هر دو بخش مدل
  useEffect(() => {
    if (materials.FABRIC_3_FRONT_3983) materials.FABRIC_3_FRONT_3983.color.set(color)
    if (materials.FABRIC_5_FRONT_3993) materials.FABRIC_5_FRONT_3993.color.set(color)
  }, [color, materials])

  return (
    <group dispose={null}>
      {/* Object_2 و Object_3 نام‌هایی هستند که در فایل شما وجود داشتند */}
      <mesh 
        geometry={nodes.Object_2.geometry} 
        material={materials.FABRIC_3_FRONT_3983} 
        rotation={[-Math.PI / 2, 0, 0]} 
      />
      <mesh 
        geometry={nodes.Object_3.geometry} 
        material={materials.FABRIC_5_FRONT_3993} 
        rotation={[-Math.PI / 2, 0, 0]} 
      />
    </group>
  )
}

export default function App() {
  const [activeProduct, setActiveProduct] = useState(PRODUCTS[0]);

  return (
    <div className="w-full h-screen bg-slate-100 overflow-hidden relative font-sans">
      <style>{`html, body, #root { height: 100%; width: 100%; margin: 0; padding: 0; }`}</style>

      {/* 1. بخش سه بعدی - Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas shadows dpr={[1, 2]}>
          <Suspense fallback={<Loader />}>
            {/* Stage به صورت خودکار مدل را مرکزچینی (Centering) و نورپردازی می‌کند */}
            <Stage 
              intensity={0.5} 
              environment="city" 
              shadows={{ type: 'contact', opacity: 0.2, blur: 2 }} 
              adjustCamera={true} // دوربین را خودکار با سایز مدل تنظیم می‌کند
            >
              <ClothingModel color={activeProduct.color} />
            </Stage>
          </Suspense>

          <OrbitControls 
            enableZoom={true} 
            makeDefault 
            minPolarAngle={Math.PI / 3} 
            maxPolarAngle={Math.PI / 1.5} 
          />
        </Canvas>
      </div>

      {/* 2. رابط کاربری (UI) */}
      <nav className="absolute top-0 w-full p-8 flex justify-between items-center z-10 pointer-events-none">
        <div className="text-2xl font-black tracking-tighter pointer-events-auto flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded flex items-center justify-center text-white text-[10px]">ZA</div>
          <span>STUDIO</span>
        </div>
        <button className="bg-white p-3 rounded-full shadow-lg pointer-events-auto hover:bg-black hover:text-white transition-all">
          <ShoppingBag size={20} />
        </button>
      </nav>

      <main className="absolute inset-y-0 left-0 flex items-center px-8 md:px-24 z-10 pointer-events-none w-full">
        <div className="max-w-md pointer-events-auto">
          <div className="flex items-center gap-2 mb-2 text-indigo-600">
            <Star size={14} fill="currentColor" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Trending Now</span>
          </div>

          <h1 className="text-7xl font-black leading-[0.85] mb-6 text-gray-900 tracking-tighter uppercase">
            {activeProduct.name}
          </h1>
          
          <p className="text-gray-500 text-sm mb-10 max-w-sm leading-relaxed">
            {activeProduct.desc}
          </p>

          <div className="flex items-center gap-12 mb-12">
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-4">Fabric Color</span>
              <div className="flex gap-4">
                {PRODUCTS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setActiveProduct(p)}
                    className={`w-12 h-12 rounded-2xl border-4 transition-all ${activeProduct.id === p.id ? 'border-indigo-600 scale-110' : 'border-white'}`}
                    style={{ backgroundColor: p.color }}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Total Price</span>
              <span className="text-3xl font-black text-gray-900 italic">{activeProduct.price} <small className="text-xs font-normal">T</small></span>
            </div>
          </div>

          <button className="flex items-center gap-6 bg-black text-white px-10 py-5 rounded-3xl font-bold text-xl hover:bg-indigo-600 transition-all shadow-2xl active:scale-95">
            ADD TO BAG
            <ArrowRight size={20} />
          </button>
        </div>
      </main>

      {/* دکمه ریست زاویه */}
      <button 
        onClick={() => window.location.reload()}
        className="absolute bottom-8 right-8 z-10 p-3 bg-white/50 backdrop-blur-md rounded-full text-gray-500 hover:text-black transition-colors"
      >
        <RotateCcw size={20} />
      </button>
    </div>
  )
}

useGLTF.preload('/input-transformed.glb')