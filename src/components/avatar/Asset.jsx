import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo } from "react";

export const Asset = ({ url, categoryName, skeleton }) => {
    const { scene } = useGLTF(url);

    // Clone the scene to ensure unique instances
    const clonedScene = useMemo(() => scene.clone(), [scene]);

    // Extract mesh items from the scene
    const attachedItems = useMemo(() => {
        const items = [];
        clonedScene.traverse((child) => {
            if (child.isMesh || child.isSkinnedMesh) {
                items.push({
                    geometry: child.geometry,
                    material: child.material,
                    morphTargetDictionary: child.morphTargetDictionary,
                    morphTargetInfluences: child.morphTargetInfluences,
                });
            }
        });
        return items;
    }, [clonedScene]);

    // Render as skinnedMesh components with the provided skeleton
    return (
        <>
            {attachedItems.map((item, index) => (
                <skinnedMesh
                    key={index}
                    geometry={item.geometry}
                    material={item.material}
                    skeleton={skeleton}
                    morphTargetDictionary={item.morphTargetDictionary}
                    morphTargetInfluences={item.morphTargetInfluences}
                    castShadow
                    receiveShadow
                />
            ))}
        </>
    );
};