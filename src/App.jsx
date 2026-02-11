import React, { useState, Suspense, useRef } from 'react'
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

// --- لودر مخصوص موبایل و دسکتاپ ---
function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="flex flex-col items-center bg-white/90 p-5 rounded-3xl shadow-2xl backdrop-blur-md">
        <Loader2 className="animate-spin text-indigo-600 mb-2" size={28} />
        <span className="text-[10px] font-black font-mono text-gray-600">{progress.toFixed(0)}%</span>
      </div>
    </Html>
  )
}

// --- کامپوننت مدل (بر اساس فایل input-transformed.glb شما) ---
function ClothingModel({ color }) {
  const { nodes, materials } = useGLTF('/input-transformed.glb')

  // اعمال مستقیم رنگ به متریال‌ها
  React.useEffect(() => {
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
    { hex: '#ffffff', label: 'White' },
    { hex: '#3b82f6', label: 'Blue' },
    { hex: '#1a1a1a', label: 'Black' },
    { hex: '#ec4899', label: 'Pink' }
  ]

  return (
    <div className="fixed inset-0 bg-[#f8f8f8] overflow-hidden font-sans">
      {/* استایل ضروری برای موبایل */}
      <style>{`
        canvas { touch-action: none; }
        .no-select { -webkit-tap-highlight-color: transparent; }
      `}</style>

      {/* 1. لایه سه بعدی (Canvas) - تمام صفحه */}
      <div className="absolute inset-0 z-0">
        <Canvas 
          shadows 
          dpr={[1, 1.5]} // بهینه سازی برای موبایل
          gl={{ antialias: true, powerPreference: "high-performance" }}
        >
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={45} />
          
          <Suspense fallback={<Loader />}>
            <Stage environment="city" intensity={0.5} adjustCamera={true} contactShadow={true}>
              <ClothingModel color={activeColor} />
            </Stage>
          </Suspense>

          <OrbitControls 
            makeDefault 
            enableZoom={false} 
            minPolarAngle={Math.PI / 2.5} 
            maxPolarAngle={Math.PI / 1.5}
            enableDamping={true} // حرکت نرم‌تر
          />
        </Canvas>
      </div>

      {/* 2. رابط کاربری (UI) - لایه رویی */}
      <div className="relative h-full w-full flex flex-col justify-between p-6 md:p-12 pointer-events-none z-10">
        
        {/* Header */}
        <header className="flex justify-between items-center pointer-events-auto">
          <div className="text-xl font-black italic tracking-tighter uppercase text-gray-900">
            Concept<span className="text-indigo-600">Lab</span>
          </div>
          <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
            <ShoppingBag size={20} />
          </div>
        </header>

        {/* Product Info & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-sm pointer-events-auto">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex text-yellow-400"><Star size={12} fill="currentColor" /></div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">New Season</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-none mb-4 uppercase italic">
              Crop<br/>Skirt
            </h1>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              طراحی شده برای عملکرد بالا و استایل مدرن. متریال بهینه برای رندر سریع در وب.
            </p>
          </div>

          {/* Color Selector & Action */}
          <div className="flex flex-col gap-6 pointer-events-auto bg-white/40 backdrop-blur-xl p-6 rounded-[2.5rem] border border-white/50 shadow-2xl">
            <div className="flex gap-4 justify-center">
              {colors.map((c) => (
                <button
                  key={c.hex}
                  onClick={() => setActiveColor(c.hex)}
                  className={`w-10 h-10 rounded-full border-4 transition-all no-select ${activeColor === c.hex ? 'border-white scale-110 shadow-lg' : 'border-transparent opacity-70'}`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
            
            <button className="flex items-center justify-center gap-4 bg-gray-900 text-white px-8 py-4 rounded-3xl font-bold text-sm hover:bg-indigo-600 transition-all active:scale-95 shadow-xl">
              ADD TO BAG
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="absolute top-1/2 -right-12 rotate-90 hidden lg:block opacity-20 pointer-events-none">
        <span className="text-xs font-mono tracking-[0.5em] text-black uppercase">
          Optimized Geometry // 46.96KB
        </span>
      </div>
    </div>
  )
}

// پیش‌بارگذاری برای موبایل حیاتی است
useGLTF.preload('/input-transformed.glb')