import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Float, 
  Environment, 
  PerspectiveCamera, 
  Icosahedron, 
  Octahedron, 
  Dodecahedron 
} from '@react-three/drei';
import { EffectComposer, Bloom, Noise } from '@react-three/postprocessing';
import * as THREE from 'three';
import { stringToPaletteColor, getPolyType, type PolyType } from '@/lib/logoUtils';

interface GeneralLogoProps {
  color?: string;
  polyType?: PolyType;
  seed?: string;
  className?: string;
  style?: React.CSSProperties;
  theme?: 'light' | 'dark';
  size?: number;
}

const SinglePoly: React.FC<{ type: PolyType; color: string; }> = ({ type, color , }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((_state, delta) => {
      if (meshRef.current) {
          meshRef.current.rotation.x += delta * 0.2;
          meshRef.current.rotation.y += delta * 0.3;
      }
  });

  const Material = (
    <meshStandardMaterial
      color={color}
      emissive={color}
      emissiveIntensity={0.6}
      metalness={0.9}
      roughness={0.1}
      transparent={true}
      opacity={0.6}
      blending={THREE.AdditiveBlending}
      side={THREE.DoubleSide}
      flatShading={true}
    />
  );

  const scale = 1.8;
  const args: [number, number] = [scale, 0];

  const renderGeometry = () => {
    switch (type) {
      case 'octa': return <Octahedron args={args} ref={meshRef}>{Material}</Octahedron>;
      case 'dodeca': return <Dodecahedron args={args} ref={meshRef}>{Material}</Dodecahedron>;
      case 'icosa': default: return <Icosahedron args={args} ref={meshRef}>{Material}</Icosahedron>;
    }
  };

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      {renderGeometry()}
    </Float>
  );
};

const GeneralLogo: React.FC<GeneralLogoProps> = ({ 
  color: customColor,
  polyType: customPolyType,
  seed,
  className, 
  style, 
  size = 9 ,
  theme = 'light' 
}) => {
  const isDark = theme === 'dark';

  // Use custom color/type if provided, otherwise generate from seed
  const { color, type } = useMemo(() => {
    if (customColor && customPolyType) {
      return { color: customColor, type: customPolyType };
    }
    if (customColor) {
      return { 
        color: customColor, 
        type: customPolyType || (seed ? getPolyType(seed) : 'icosa')
      };
    }
    if (seed) {
      return {
        color: stringToPaletteColor(seed),
        type: customPolyType || getPolyType(seed)
      };
    }
    // Default values
    return {
      color: '#6f5cde',
      type: customPolyType || 'icosa'
    };
  }, [customColor, customPolyType, seed]);

  return (
    <div 
      className={className} 
      style={{ 
        width: '100%', 
        height: '100%', 
        minHeight: '150px', 
        position: 'relative',
        background: 'transparent',
        transition: 'background 0.3s ease',
        borderRadius: '12px',
        overflow: 'hidden',
        ...style 
      }}
    >
      {/* Vignette Overlay */}
      <div 
        style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 10
        }} 
      />
      <Canvas gl={{ antialias: false, alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, size]} />
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <Environment preset={isDark ? "night" : "city"} />

        <SinglePoly type={type} color={color} />

        <EffectComposer>
            <Bloom 
                luminanceThreshold={0.2} 
                luminanceSmoothing={0.9} 
                height={300} 
                intensity={isDark ? 1.5 : 0.8} 
            />
            <Noise opacity={0.02} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default GeneralLogo;
