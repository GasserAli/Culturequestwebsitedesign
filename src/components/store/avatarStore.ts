import { create } from 'zustand';
import { ASSET_CATEGORIES } from './avatarConfig';

interface AvatarState {
  categories: typeof ASSET_CATEGORIES;
  currentCategory: typeof ASSET_CATEGORIES[0];
  customization: Record<string, any>;
  setCurrentCategory: (category: any) => void;
  changeAsset: (category: string, asset: any) => void;
  resetCustomization: () => void;
}

const getDefaultCustomization = () =>
  ASSET_CATEGORIES.reduce((acc, category) => ({
    ...acc,
    [category.id]: category.id === "head" ? category.assets[0] :
      category.id === "eyes" ? category.assets[0] :
        category.id === "top" ? category.assets[0] :
          category.id === "bottom" ? category.assets[0] :
            category.id === "hair" ? category.assets[0] : null

  }), {});

export const useAvatarStore = create<AvatarState>((set) => ({
  categories: ASSET_CATEGORIES,
  currentCategory: ASSET_CATEGORIES[0],

  // Set default assets (first item in each category)
  customization: getDefaultCustomization(),

  setCurrentCategory: (category) => set({ currentCategory: category }),

  changeAsset: (categoryId, asset) =>
    set((state) => {
      // If clicking the same asset, deselect it (set to null)
      const isCurrentlySelected = state.customization[categoryId]?.id === asset.id;

      const newCustomization = {
        ...state.customization,
        [categoryId]: isCurrentlySelected ? null : asset
      };

      // If selecting an outfit, deselect top, bottom, and shoe
      if (categoryId === 'outfit' && !isCurrentlySelected) {
        newCustomization.top = null;
        newCustomization.bottom = null;
        newCustomization.shoe = null;
      }

      // If selecting top or bottom, deselect outfit
      if ((categoryId === 'top' || categoryId === 'bottom') && !isCurrentlySelected) {
        newCustomization.outfit = null;
      }

      return {
        customization: newCustomization
      };
    }),

  resetCustomization: () =>
    set({ customization: getDefaultCustomization() }),
}));    