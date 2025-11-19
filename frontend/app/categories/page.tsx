"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import WallpaperCard from '@/components/WallpaperCard';
import PreviewModal from '@/components/PreviewModal';
import AuthModal from '@/components/AuthModal';
import { categories, mockWallpapers, Wallpaper } from '@/lib/wallpaper-data';
import { Badge } from '@/components/ui/badge';

export default function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [previewWallpaper, setPreviewWallpaper] = useState<Wallpaper | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const getCategoryWallpapers = (categoryId: string) => {
    if (categoryId === 'all') return mockWallpapers;
    return mockWallpapers.filter((w) => w.category === categoryId);
  };

  const getCategoryCount = (categoryId: string) => {
    return getCategoryWallpapers(categoryId).length;
  };

  const handlePreview = (wallpaper: Wallpaper) => {
    setPreviewWallpaper(wallpaper);
    setIsPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
    setTimeout(() => setPreviewWallpaper(null), 300);
  };

  const filteredWallpapers = selectedCategory
    ? getCategoryWallpapers(selectedCategory)
    : [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 md:px-6 py-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Categories</h1>
          <p className="text-lg text-muted-foreground">
            Browse wallpapers by category
          </p>
        </div>

        {selectedCategory ? (
          // Category Detail View
          <div>
            <div className="mb-6">
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-sm text-muted-foreground hover:text-foreground mb-4 inline-flex items-center"
              >
                ← Back to all categories
              </button>
              <h2 className="text-3xl font-bold capitalize mb-2">
                {categories.find((c) => c.id === selectedCategory)?.name}
              </h2>
              <p className="text-muted-foreground">
                {filteredWallpapers.length} wallpapers
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredWallpapers.map((wallpaper) => (
                <WallpaperCard
                  key={wallpaper.id}
                  wallpaper={wallpaper}
                  onPreview={handlePreview}
                  onAuthRequired={() => setIsAuthModalOpen(true)}
                />
              ))}
            </div>
          </div>
        ) : (
          // Category Grid View
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories
              .filter((cat) => cat.id !== 'all')
              .map((category) => {
                const categoryWallpapers = getCategoryWallpapers(category.id);
                const count = getCategoryCount(category.id);
                
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className="group relative bg-card rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] text-left"
                  >
                    {/* Background Image */}
                    <div className="relative aspect-video w-full overflow-hidden bg-muted">
                      {categoryWallpapers.length > 0 && (
                        <img
                          src={categoryWallpapers[0].thumbnailUrl}
                          alt={category.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                      
                      {/* Category Info */}
                      <div className="absolute inset-0 flex flex-col justify-end p-6">
                        <h3 className="text-2xl font-bold text-white mb-2 capitalize">
                          {category.name}
                        </h3>
                        <Badge variant="secondary" className="w-fit">
                          {count} wallpapers
                        </Badge>
                      </div>
                    </div>
                  </button>
                );
              })}
          </div>
        )}
      </main>

      {/* Preview Modal */}
      <PreviewModal
        wallpaper={previewWallpaper}
        isOpen={isPreviewOpen}
        onClose={handleClosePreview}
        onAuthRequired={() => setIsAuthModalOpen(true)}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}
