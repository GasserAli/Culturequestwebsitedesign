import { useAvatarStore } from "../store/avatarStore";
import { Suspense } from "react";
import { useGLTF } from "@react-three/drei";
import { ThreeElements } from "@react-three/fiber";

// A component to load a single GLB file
const Asset = ({ url }: { url: string }) => {
  const { scene } = useGLTF(url);
  // Clone the scene so we can re-use the same GLB if needed
  return <primitive object={scene.clone()} />;
};

export function AvatarModel() {
  const baseBody = useGLTF("../../public/Assets/NakedFullBody.glb");
  const customization = useAvatarStore((state) => state.customization);

  return (
    <group dispose={null}>
      <primitive object={baseBody.scene.clone()} />
       {/* Loop through the current configuration (head, outfit) and render them */}
       {Object.entries(customization).map(([category, asset]) => (
         asset?.url && (
           <Suspense key={category} fallback={null}>
             <Asset url={asset.url} />
           </Suspense>
         )
       ))}
    </group>
  );
}