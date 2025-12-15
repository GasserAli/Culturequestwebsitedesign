import { create } from 'zustand';
import { ASSET_CATEGORIES } from './avatarConfig';
import { MeshStandardMaterial } from 'three';

// 1. Define Constants for Modes and Poses
export const UI_MODES = {
  CUSTOMIZE: "customize",
  PHOTO: "photo",
};

export const PHOTO_POSES = {
  Idle: "Idle",
  Chill: "Chill", // You will need to add more animations to your folder to use these
  Cool: "Cool",
};

// 2. Define the Interface
interface AvatarState {
  // --- Data ---
  categories: typeof ASSET_CATEGORIES;
  currentCategory: typeof ASSET_CATEGORIES[0];
  customization: Record<string, any>;
  
  // New States
  mode: string;
  pose: string;
  skin: MeshStandardMaterial; // Shared material for head/body
  loading: boolean;

  // --- Actions ---
  setCurrentCategory: (category: any) => void;
  changeAsset: (category: string, asset: any) => void;
  resetCustomization: () => void;
  
  // New Actions
  setMode: (mode: string) => void;
  setPose: (pose: string) => void;
  updateColor: (color: string) => void;
  updateSkin: (color: string) => void;
  
  // Screenshot/Download placeholders
  download: () => void;
  setDownload: (fn: () => void) => void;
  screenshot: () => void;
  setScreenshot: (fn: () => void) => void;
}

// Helper to set defaults
const getDefaultCustomization = () =>
  ASSET_CATEGORIES.reduce((acc, category) => ({
    ...acc,
    [category.id]: category.assets[0] || null
  }), {});

export const useAvatarStore = create<AvatarState>((set, get) => ({
  // --- Initial State ---
  categories: ASSET_CATEGORIES,
  currentCategory: ASSET_CATEGORIES[0],
  customization: getDefaultCustomization(),
  
  loading: false,
  mode: UI_MODES.CUSTOMIZE,
  pose: PHOTO_POSES.Idle,
  // Create one shared material for all skin parts (Head, Hands, etc.)
  skin: new MeshStandardMaterial({ color: 0xf5c6a5, roughness: 1 }),

  download: () => {},
  screenshot: () => {},

  // --- Actions ---

  setCurrentCategory: (category) => set({ currentCategory: category }),

  setMode: (mode) => {
    set({ mode });
    // Reset to Idle pose when going back to editing
    if (mode === UI_MODES.CUSTOMIZE) {
      set({ pose: PHOTO_POSES.Idle });
    }
  },

  setPose: (pose) => set({ pose }),
  setDownload: (download) => set({ download }),
  setScreenshot: (screenshot) => set({ screenshot }),

  changeAsset: (categoryId, asset) =>
    set((state) => {
      const isCurrentlySelected = state.customization[categoryId]?.id === asset.id;

      const newCustomization = {
        ...state.customization,
        [categoryId]: isCurrentlySelected ? null : asset
      };

      // Conflict Resolution: Outfit hides Top/Bottom/Shoes
      if (categoryId === 'outfit' && !isCurrentlySelected) {
        newCustomization.top = null;
        newCustomization.bottom = null;
        newCustomization.shoe = null;
      }
      // Conflict Resolution: Top/Bottom hides Outfit
      if ((categoryId === 'top' || categoryId === 'bottom') && !isCurrentlySelected) {
        newCustomization.outfit = null;
      }

      return { customization: newCustomization };
    }),

  updateColor: (color) => {
    const { customization, currentCategory, updateSkin } = get();
    
    // 1. Update the color in the customization state (for UI/Saving)
    set((state) => ({
      customization: {
        ...state.customization,
        [state.currentCategory.id]: {
          ...state.customization[state.currentCategory.id],
          color: color, // Adds 'color' property to the selected asset
        },
      },
    }));

    // 2. If editing the Head, also update the shared Skin material
    if (currentCategory.id === 'head') {
      updateSkin(color);
    }
  },

  updateSkin: (color) => {
    // Imperatively update the Three.js material for performance
    get().skin.color.set(color);
  },

  resetCustomization: () =>
    set({ customization: getDefaultCustomization() }),
}));