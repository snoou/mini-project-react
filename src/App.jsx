import React, { useState, Suspense, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { 
  OrbitControls, 
  Stage, 
  useGLTF, 
  Html, 
  PerspectiveCamera, 
  useProgress,
  Center
} from '@react-three/drei'
import * as THREE from 'three'

// --- لودر با استایل حرفه‌ای ---
function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="flex flex-col items-center gap-2 bg-white/90 p-6 rounded-3xl shadow-xl backdrop-blur-md border border-white">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-xs font-black font-mono text-indigo-600">{progress.toFixed(0)}%</span>
      </div>
    </Html>
  )
}

// --- کامپوننت مدل با آدرس‌دهی داینامیک ---
function ClothingModel({ color }) {
  // این خط به طور خودکار آدرس پایه سرور شما را پیدا می‌کند
  const baseUrl = import.meta.env.BASE_URL || './';
  const modelPath = `${baseUrl}input-transformed.glb`.replace('//', '/');

  // لود کردن مدل
  const { nodes, materials } = useGLTF(modelPath)

  useEffect(() => {
    // اعمال رنگ به متریال‌های مدل شما
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
    { hex: '#f43f5e', label: 'Pink' }
  ]

  return (
    <div className="fixed inset-0 bg-[#f8f8f8] overflow-hidden font-sans select-none">
      <style>{`canvas { touch-action: none; }`}</style>

      {/* 1. Canvas Layer */}
      <div className="absolute inset-0 z-0">
        <Canvas shadows dpr={[1, 2]}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={35} />
          
          <Suspense fallback={<Loader />}>
            <Stage environment="city" intensity={0.5} adjustCamera={true} contactShadow={true}>
              <ClothingModel color={activeColor} />
            </Stage>
          </Suspense>

          <OrbitControls makeDefault enableZoom={false} enableDamping={true} />
        </Canvas>
      </div>

      {/* 2. UI Layer */}
      <div className="relative h-full w-full flex flex-col justify-between p-8 md:p-12 pointer-events-none z-10">
        <header className="flex justify-between items-center pointer-events-auto">
          <div className="text-2xl font-black tracking-tighter uppercase italic">
            Snoou<span className="text-indigo-600">.3D</span>
          </div>
          <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
            <span className="text-xs font-bold px-2">STORE</span>
          </div>
        </header>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-sm pointer-events-auto">
            <h1 className="text-6xl md:text-8xl font-black text-gray-950 leading-[0.8] mb-6 uppercase tracking-tighter">
              Crop<br/>Skirt
            </h1>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-4">
              مدل‌سازی دقیق با استفاده از تکنولوژی PBR و بهینه‌سازی شده برای وب.
            </p>
          </div>

          {/* Color Selector */}
          <div className="flex flex-col gap-6 pointer-events-auto bg-white/70 backdrop-blur-2xl p-8 rounded-[3rem] border border-white shadow-2xl min-w-[280px]">
            <div className="flex gap-4 justify-center">
              {colors.map((c) => (
                <button
                  key={c.hex}
                  onClick={() => setActiveColor(c.hex)}
                  className={`w-12 h-12 rounded-2xl border-4 transition-all ${activeColor === c.hex ? 'border-indigo-600 scale-110 shadow-lg' : 'border-white opacity-80'}`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
            <button className="flex items-center justify-center gap-4 bg-gray-950 text-white w-full py-5 rounded-[2rem] font-bold hover:bg-indigo-600 transition-all active:scale-95 shadow-xl">
              ADD TO BAG
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}