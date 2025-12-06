import React from 'react';
import { AvatarExperience } from './avatar/avatarExperience';
import { useAvatarStore } from './store/avatarStore';

export default function AvatarSamplePage() {
    const { categories, changeAsset, customization, resetCustomization } = useAvatarStore();

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 md:p-8">
            {/* Main Container */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-6xl w-full flex flex-col md:flex-row h-[800px]">

                {/* LEFT PANEL: 3D Experience */}
                {/* The container needs relative positioning and defined height for the Canvas */}
                <div className="w-full md:w-2/3 bg-gradient-to-b from-blue-50 to-indigo-100 relative order-2 md:order-1">
                    <AvatarExperience />

                    {/* Floating Header Overlay */}
                    <div className="absolute top-6 left-6 z-10">
                        <div className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-sm border border-white/50">
                            <h1 className="text-xl font-bold text-indigo-900">Avatar Studio</h1>
                            <p className="text-xs text-indigo-500 font-medium">Interactive Preview</p>
                        </div>
                    </div>

                    {/* Instructions Overlay */}
                    <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none">
                        <span className="text-sm font-medium text-indigo-900/40 bg-white/30 px-4 py-1 rounded-full backdrop-blur-sm">
                            Drag to Rotate • Scroll to Zoom
                        </span>
                    </div>
                </div>

                {/* RIGHT PANEL: Controls */}
                <div className="w-full md:w-1/3 bg-white flex flex-col border-l border-gray-100 order-1 md:order-2 z-20">

                    {/* Header */}
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-800">Customize Look</h2>
                        <p className="text-gray-500 text-sm mt-1">Click to select or deselect items.</p>
                    </div>

                    {/* Scrollable List of Categories */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
                        {categories.map((category) => (
                            <div key={category.id} className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                                        {category.name}
                                    </h3>
                                    <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-md">
                                        {category.assets.length} items
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    {category.assets.map((asset) => {
                                        const isSelected = customization[category.id]?.id === asset.id;

                                        return (
                                            <button
                                                key={asset.id}
                                                onClick={() => changeAsset(category.id, asset)}
                                                className={`
                          relative group flex flex-col items-start p-3 rounded-xl border-2 text-left transition-all duration-200
                          ${isSelected
                                                        ? 'border-indigo-600 bg-indigo-50/50 shadow-md scale-[1.02]'
                                                        : 'border-gray-100 hover:border-indigo-200 hover:bg-gray-50'
                                                    }
                        `}
                                            >
                                                <div className="w-full aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden">
                                                    {/* Fallback to text if thumbnail is missing */}
                                                    {asset.thumbnail ? (
                                                        <img src={asset.thumbnail} alt={asset.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-2xl">
                                                            👕
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="w-full">
                                                    <div className={`font-semibold text-sm ${isSelected ? 'text-indigo-900' : 'text-gray-700'}`}>
                                                        {asset.name}
                                                    </div>
                                                    {asset.price && (
                                                        <div className="text-xs text-gray-400 mt-1 font-medium">
                                                            {asset.price} Coins
                                                        </div>
                                                    )}
                                                </div>

                                                {isSelected && (
                                                    <div className="absolute top-2 right-2 w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center shadow-sm">
                                                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer Actions */}
                    <div className="p-6 border-t border-gray-100 bg-gray-50/50 space-y-3">
                        <button
                            onClick={resetCustomization}
                            className="w-full py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-semibold text-base transition-all active:scale-95 flex items-center justify-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            <span>Reset to Default</span>
                        </button>
                        <button
                            onClick={() => alert(JSON.stringify(customization, null, 2))}
                            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-indigo-200 transition-all active:scale-95 flex items-center justify-center gap-2"
                        >
                            <span>Save Character</span>
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}