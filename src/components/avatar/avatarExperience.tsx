import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import { AvatarModel } from "./AvatarModel";

export function AvatarExperience() {
  return (
    <Canvas camera={{ position: [0, 0, 100], fov: 50 }} shadows>
      <ambientLight intensity={0.7} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} castShadow />
      
      <group position={[0, -1.5, 0]}>
        <AvatarModel />
      </group>
      
      <ContactShadows opacity={0.4} scale={10} blur={2} far={10} resolution={256} color="#000000" />
      <Environment preset="city" />
      <OrbitControls minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 2} minDistance={2} maxDistance={8} />
    </Canvas>
  );
}