import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Environment, 
  PerspectiveCamera, 
  Icosahedron, 
  Octahedron, 
  Dodecahedron,
  Sparkles
} from '@react-three/drei';
import { EffectComposer, Bloom, Noise } from '@react-three/postprocessing';
import * as THREE from 'three';
import { type PolyType } from '@/lib/logoUtils';

interface PolyNode {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  type: PolyType;
  color: string;
  lifetime: number;
  maxLifetime: number;
}

interface WanderingPolyProps {
  node: PolyNode;
}

interface OrganicLogoProps {
  count?: number;
  color?: string;
  colors?: string[];
  className?: string;
  style?: React.CSSProperties;
  theme?: 'light' | 'dark';
  size?: number;
  connectionDistance?: number;
  wanderSpeed?: number;
}

const WanderingPoly: React.FC<WanderingPolyProps> = ({ node }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((_state, delta) => {
    if (meshRef.current) {
      // Rotation
      meshRef.current.rotation.x += delta * 0.3;
      meshRef.current.rotation.y += delta * 0.2;
      
      // Update position based on velocity
      node.position.add(node.velocity.clone().multiplyScalar(delta));
      
      // Update lifetime
      node.lifetime += delta;
      
      // If lifetime exceeded, respawn from outside
      const bounds = 6;
      if (node.lifetime > node.maxLifetime || 
          Math.abs(node.position.x) > bounds || 
          Math.abs(node.position.y) > bounds || 
          Math.abs(node.position.z) > bounds) {
        // Respawn from random edge
        const edge = Math.floor(Math.random() * 6);
        const randomPos = () => (Math.random() - 0.5) * 5;
        
        switch(edge) {
          case 0: node.position.set(bounds, randomPos(), randomPos()); break;
          case 1: node.position.set(-bounds, randomPos(), randomPos()); break;
          case 2: node.position.set(randomPos(), bounds, randomPos()); break;
          case 3: node.position.set(randomPos(), -bounds, randomPos()); break;
          case 4: node.position.set(randomPos(), randomPos(), bounds); break;
          case 5: node.position.set(randomPos(), randomPos(), -bounds); break;
        }
        
        // Set velocity towards center with some randomness
        const targetDirection = new THREE.Vector3(0, 0, 0).sub(node.position).normalize();
        node.velocity.copy(targetDirection).multiplyScalar(0.3 + Math.random() * 0.3);
        node.lifetime = 0;
      }
      
      // Random direction changes for organic movement
      if (Math.random() < 0.02) {
        node.velocity.add(new THREE.Vector3(
          (Math.random() - 0.5) * 0.2,
          (Math.random() - 0.5) * 0.2,
          (Math.random() - 0.5) * 0.2
        ));
        // Limit velocity
        if (node.velocity.length() > 0.8) {
          node.velocity.normalize().multiplyScalar(0.8);
        }
      }
      
      meshRef.current.position.copy(node.position);
    }
  });

  const Material = (
    <meshStandardMaterial
      color={node.color}
      emissive={node.color}
      emissiveIntensity={0.6}
      metalness={0.8}
      roughness={0.2}
      transparent={true}
      opacity={0.7}
      blending={THREE.AdditiveBlending}
      side={THREE.DoubleSide}
      flatShading={true}
    />
  );

  const args: [number, number] = [0.8, 0];

  const renderGeometry = () => {
    switch (node.type) {
      case 'octa': return <Octahedron args={args} ref={meshRef}>{Material}</Octahedron>;
      case 'dodeca': return <Dodecahedron args={args} ref={meshRef}>{Material}</Dodecahedron>;
      case 'icosa': default: return <Icosahedron args={args} ref={meshRef}>{Material}</Icosahedron>;
    }
  };

  return renderGeometry();
};

const InstancedConnections: React.FC<{
  nodes: PolyNode[];
  connectionDistance: number;
  color: string;
  lineThickness: number;
}> = ({ nodes, connectionDistance, color, lineThickness }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  // Max lines possible
  const maxLines = (nodes.length * (nodes.length - 1)) / 2;

  useFrame(() => {
    if (!meshRef.current) return;
    
    let lineIndex = 0;
    const baseColor = new THREE.Color(color);

    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const dist = nodes[i].position.distanceTo(nodes[j].position);
            
            if (dist < connectionDistance) {
            const intensity = 1 - (dist / connectionDistance);
            
            // Calculate midpoint
            const midPoint = new THREE.Vector3().addVectors(nodes[i].position, nodes[j].position).multiplyScalar(0.5);
            
            // Orientation
            dummy.position.copy(midPoint);
            dummy.lookAt(nodes[j].position);
            // Rotate 90 deg so cylinder aligns with lookat vector (cylinder is Y-up)
            dummy.rotateX(Math.PI / 2);
            
            // Scale: thickness, distance, thickness
            // Using slightly varied thickness for electric feel
            const thickness = lineThickness * (0.8 + Math.random() * 0.4); 
            dummy.scale.set(thickness, dist, thickness);
            dummy.updateMatrix();
            
            meshRef.current.setMatrixAt(lineIndex, dummy.matrix);
            
            // Color with intensity
            const flicker = 0.8 + Math.random() * 0.5; // Flicker > 1 allows glow boost
            // Boost color for glow effect
            const glowColor = baseColor.clone().multiplyScalar(intensity * flicker * 2); 
            
            meshRef.current.setColorAt(lineIndex, glowColor);
            
            lineIndex++;
            }
        }
    }

    // Hide unused instances
    for (let k = lineIndex; k < maxLines; k++) {
        dummy.scale.set(0, 0, 0); // Hide
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(k, dummy.matrix);
    }

    meshRef.current.count = maxLines;
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, maxLines]}>
      <cylinderGeometry args={[1, 1, 1, 6]} /> 
      <meshBasicMaterial 
        color={0xffffff}
        transparent={true}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        toneMapped={false}
      />
    </instancedMesh>
  );
};

const OrganicLogo: React.FC<OrganicLogoProps> = ({ 
  count = 7,
  color = '#6f5cde',
  colors,
  className, 
  style, 
  size = 12,
  connectionDistance = 3,
  wanderSpeed = 0.5,
  theme = 'light' 
}) => {
  const isDark = theme === 'dark';
  
  // Generate color palette if multiple colors provided
  const colorPalette = useMemo(() => {
    if (colors && colors.length > 0) return colors;
    // Generate slight variations of the base color
    const baseColor = new THREE.Color(color);
    const variations: string[] = [];
    
    for (let i = 0; i < count; i++) {
      const hsl = { h: 0, s: 0, l: 0 };
      baseColor.getHSL(hsl);
      
      // Vary hue slightly (+/- 15 degrees)
      hsl.h = (hsl.h + (Math.random() - 0.5) * 0.08) % 1;
      // Vary saturation slightly
      hsl.s = Math.max(0, Math.min(1, hsl.s + (Math.random() - 0.5) * 0.2));
      // Vary lightness slightly
      hsl.l = Math.max(0.3, Math.min(0.7, hsl.l + (Math.random() - 0.5) * 0.2));
      
      const variedColor = new THREE.Color().setHSL(hsl.h, hsl.s, hsl.l);
      variations.push('#' + variedColor.getHexString());
    }
    
    return variations;
  }, [color, colors, count]);

  // Initialize nodes
  const nodes = useMemo(() => {
    const polyTypes: PolyType[] = ['icosa', 'octa', 'dodeca'];
    return Array.from({ length: count }, (_, i) => {
      // Start from outside bounds
      const edge = Math.floor(Math.random() * 6);
      const randomPos = () => (Math.random() - 0.5) * 8;
      const bounds = 8;
      let startPos: THREE.Vector3;
      
      switch(edge) {
        case 0: startPos = new THREE.Vector3(bounds, randomPos(), randomPos()); break;
        case 1: startPos = new THREE.Vector3(-bounds, randomPos(), randomPos()); break;
        case 2: startPos = new THREE.Vector3(randomPos(), bounds, randomPos()); break;
        case 3: startPos = new THREE.Vector3(randomPos(), -bounds, randomPos()); break;
        case 4: startPos = new THREE.Vector3(randomPos(), randomPos(), bounds); break;
        default: startPos = new THREE.Vector3(randomPos(), randomPos(), -bounds); break;
      }
      
      // Initial velocity towards center
      const targetDirection = new THREE.Vector3(0, 0, 0).sub(startPos).normalize();
      const velocity = targetDirection.multiplyScalar(0.3 + Math.random() * 0.3);
      
      return {
        position: startPos,
        velocity: velocity,
        type: polyTypes[i % polyTypes.length],
        color: colorPalette[i % colorPalette.length],
        lifetime: 0,
        maxLifetime: 15 + Math.random() * 10
      };
    });
  }, [count, wanderSpeed, colorPalette]);

  return (
    <div 
      className={className} 
      style={{ 
        width: '100%', 
        height: '100%', 
        minHeight: '150px', 
        position: 'relative',
        background: 'transparent',
        borderRadius: '12px',
        overflow: 'hidden',
        ...style 
      }}
    >
      <Canvas gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, size]} />
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.4} />
        <Environment preset={isDark ? "night" : "city"} />

        {nodes.map((node, index) => (
          <WanderingPoly key={index} node={node} />
        ))}
        
        <InstancedConnections 
          nodes={nodes} 
          connectionDistance={connectionDistance}
          color={color}
          lineThickness={0.03}
        />

        <EffectComposer>
          <Bloom 
            luminanceThreshold={0.2} 
            luminanceSmoothing={0.9} 
            height={300} 
            intensity={isDark ? 1.8 : 0.9} 
          />
          <Noise opacity={0.1} />
          <Sparkles
            count={30}  
            scale={10}
            size={1.5}   
            speed={0.2}  
            color={color} 
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default OrganicLogo;
