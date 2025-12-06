/* src/components/avatar/AvatarModel.tsx */
import { useAvatarStore } from "../store/avatarStore";
import { Suspense, useEffect, useRef } from "react";
import { useGLTF, useAnimations, useFBX } from "@react-three/drei";
import { Group } from "three";
import { ThreeElements } from "@react-three/fiber";
import { Asset } from "./Asset";

// const Asset = ({ url, skeleton }: { url: string; skeleton: any }) => {
//   const { scene } = useGLTF(url);
//   // Clone scene to ensure unique instances
//   const clonedScene = scene.clone();

//   // Apply skeleton if provided
//   if (skeleton) {
//     clonedScene.traverse((child: any) => {
//       if (child.isSkinnedMesh) {
//         child.skeleton = skeleton;
//       }
//     });
//   }

//   return <primitive object={clonedScene} />;
// };

export function AvatarModel({
  ...props
}) {
  const group = useRef();
  const customization = useAvatarStore((state) => state.customization);
  const { nodes } = useGLTF("../../public/Assets/Armature.glb");

  // 1. Load the Animation File
  // Note: If your file is .glb, use useGLTF instead of useFBX
  const { animations } = useFBX("../../public/Assets/Idle.fbx");

  // 2. Name the animation for easier access
  // if (animations.length > 0) {
  //   animations[0].name = "Idle";
  // }

  // 3. Bind animations to the group reference
  const { actions } = useAnimations(animations, group);

  // 4. Play the animation on mount
  useEffect(() => {
    actions["mixamo.com"]?.play();
  }, [actions]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} />
          {/* Render the character parts */}
          {Object.entries(customization).map(([category, asset]) => (
            asset?.url && (
              <Suspense key={category} fallback={null}>
                <Asset
                  url={asset.url}
                  categoryName={category}
                  skeleton={nodes.Plane.skeleton} />
              </Suspense>
            )
          ))}
        </group>
      </group>
    </group>
  );
}