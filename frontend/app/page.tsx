"use client";

import React, { useState, useMemo } from 'react';
import Header from '@/components/Header';
import WallpaperCard from '@/components/WallpaperCard';
import PreviewModal from '@/components/PreviewModal';
import SearchFilterBar from '@/components/SearchFilterBar';
import AuthModal from '@/components/AuthModal';
import { mockWallpapers, Wallpaper } from '@/lib/wallpaper-data';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [previewWallpaper, setPreviewWallpaper] = useState<Wallpaper | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Filter wallpapers based on search and category
  const filteredWallpapers = useMemo(() => {
    let filtered = mockWallpapers;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((w) => w.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (w) =>
          w.title.toLowerCase().includes(query) ||
          w.description.toLowerCase().includes(query) ||
          w.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [searchQuery, selectedCategory]);

  const handlePreview = (wallpaper: Wallpaper) => {
    setPreviewWallpaper(wallpaper);
    setIsPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
    setTimeout(() => setPreviewWallpaper(null), 300);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 md:px-6 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Stunning Live Wallpapers
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover and download beautiful animated wallpapers for your devices. 
            Free, high-quality, and ready to use.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <SearchFilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            resultCount={filteredWallpapers.length}
          />
        </div>

        {/* Wallpaper Grid */}
        {filteredWallpapers.length > 0 ? (
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
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold mb-2">No wallpapers found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
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

