import React, { useState, Suspense, useRef, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { 
  OrbitControls, 
  Environment, 
  useGLTF, 
  PerspectiveCamera,
  Html,
  useProgress,
  Stage,
  Center
} from '@react-three/drei'
import * as THREE from 'three'
import { ShoppingBag, Star, ArrowRight, Loader2 } from 'lucide-react'

// --- لودر با نمایش درصد ---
function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="flex flex-col items-center bg-white/90 p-6 rounded-3xl shadow-2xl backdrop-blur-md border border-white">
        <Loader2 className="animate-spin text-indigo-600 mb-2" size={32} />
        <span className="text-xs font-black font-mono text-gray-800">{progress.toFixed(0)}%</span>
      </div>
    </Html>
  )
}

// --- کامپوننت مدل با هندلینگ خطا ---
function ClothingModel({ color }) {
  // استفاده از مسیر نسبی (./) برای حل مشکل 404 روی سرور
  const { nodes, materials } = useGLTF('./input-transformed.glb')

  useEffect(() => {
    // تغییر رنگ متریال‌ها (نام‌ها بر اساس خروجی فایل شما)
    if (materials.FABRIC_3_FRONT_3983) materials.FABRIC_3_FRONT_3983.color.set(color)
    if (materials.FABRIC_5_FRONT_3993) materials.FABRIC_5_FRONT_3993.color.set(color)
  }, [color, materials])

  return (
    <Center>
      <group dispose={null}>
        <mesh 
          geometry={nodes.Object_2.geometry} 
          material={materials.FABRIC_3_FRONT_3983} 
          rotation={[-Math.PI / 2, 0, 0]} 
          castShadow 
        />
        <mesh 
          geometry={nodes.Object_3.geometry} 
          material={materials.FABRIC_5_FRONT_3993} 
          rotation={[-Math.PI / 2, 0, 0]} 
          castShadow 
        />
      </group>
    </Center>
  )
}

export default function App() {
  const [activeColor, setActiveColor] = useState('#ffffff')
  
  const colors = [
    { hex: '#ffffff', name: 'Cloud' },
    { hex: '#3b82f6', name: 'Marine' },
    { hex: '#1a1a1a', name: 'Void' },
    { hex: '#f43f5e', name: 'Rose' }
  ]

  return (
    <div className="fixed inset-0 bg-[#f4f4f5] overflow-hidden font-sans select-none">
      <style>{`
        canvas { touch-action: none; }
        .no-tap { -webkit-tap-highlight-color: transparent; }
      `}</style>

      {/* 1. Canvas Layer */}
      <div className="absolute inset-0 z-0">
        <Canvas 
          shadows 
          dpr={[1, 2]} 
          gl={{ antialias: true, powerPreference: "high-performance" }}
        >
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={40} />
          
          <Suspense fallback={<Loader />}>
            {/* Stage برای تنظیم خودکار دوربین و نور */}
            <Stage environment="city" intensity={0.5} adjustCamera={true} contactShadow={true}>
              <ClothingModel color={activeColor} />
            </Stage>
          </Suspense>

          <OrbitControls 
            makeDefault 
            enableZoom={true} 
            minPolarAngle={Math.PI / 3} 
            maxPolarAngle={Math.PI / 1.5}
            enableDamping={true}
          />
        </Canvas>
      </div>

      {/* 2. UI Layer */}
      <div className="relative h-full w-full flex flex-col justify-between p-6 md:p-12 pointer-events-none z-10">
        
        <header className="flex justify-between items-center pointer-events-auto">
          <div className="text-2xl font-black tracking-tighter text-gray-900 italic uppercase">
            Snoou<span className="text-indigo-600 not-italic">.3D</span>
          </div>
          <div className="bg-white/80 p-3 rounded-2xl shadow-xl backdrop-blur-md border border-white">
            <ShoppingBag size={22} className="text-gray-800" />
          </div>
        </header>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div className="max-w-sm pointer-events-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-600 rounded-full mb-4">
              <Star size={10} className="text-white" fill="currentColor" />
              <span className="text-[9px] font-bold text-white uppercase tracking-widest">New Arrival</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-gray-950 leading-[0.8] mb-6 uppercase tracking-tighter">
              Crop<br/>Skirt
            </h1>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-4">
              ترکیبی از تکنولوژی سه بعدی و مد. پارچه با شبیه‌سازی دقیق فیزیکی.
            </p>
          </div>

          {/* Color Selector & Price */}
          <div className="flex flex-col gap-6 pointer-events-auto bg-white/70 backdrop-blur-2xl p-8 rounded-[3rem] border border-white shadow-2xl shadow-black/5 min-w-[300px]">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Price</span>
              <span className="text-2xl font-black text-gray-900 italic">1,250,000 <small className="text-xs not-italic font-bold">T</small></span>
            </div>

            <div className="flex gap-4 justify-center">
              {colors.map((c) => (
                <button
                  key={c.hex}
                  onClick={() => setActiveColor(c.hex)}
                  className={`w-12 h-12 rounded-2xl border-4 transition-all no-tap ${activeColor === c.hex ? 'border-indigo-600 scale-110 shadow-lg' : 'border-white opacity-80'}`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
            </div>
            
            <button className="flex items-center justify-center gap-4 bg-gray-950 text-white w-full py-5 rounded-[2rem] font-bold text-sm hover:bg-indigo-600 transition-all active:scale-95 shadow-xl shadow-indigo-200">
              ADD TO BAG
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <footer className="absolute bottom-6 right-10 hidden lg:block opacity-20 pointer-events-none">
        <div className="text-[8px] font-mono uppercase tracking-[0.5em] text-black text-right leading-loose">
          Geometry: Draco Compressed <br />
          Network: Asset Fetching ./
        </div>
      </footer>
    </div>
  )
}

// پیش‌بارگذاری با مسیر نسبی
useGLTF.preload('blob:https://github.com/eb55a773-8671-44f8-a179-9e0bd35f9086')