"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WallpaperCard from '@/components/WallpaperCard';
import PreviewModal from '@/components/PreviewModal';
import AuthModal from '@/components/AuthModal';
import { mockWallpapers, Wallpaper } from '@/lib/wallpaper-data';
import { getFavorites } from '@/lib/favorites';
import { useAuth } from '@/lib/auth-context';
import { Heart } from 'lucide-react';

export default function FavoritesPage() {
  const [previewWallpaper, setPreviewWallpaper] = useState<Wallpaper | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/');
    } else {
      setFavoriteIds(getFavorites());
    }
  }, [user, router]);

  // Update favorites when returning from preview
  useEffect(() => {
    const interval = setInterval(() => {
      setFavoriteIds(getFavorites());
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const favoriteWallpapers = useMemo(() => {
    return mockWallpapers.filter((w) => favoriteIds.includes(w.id));
  }, [favoriteIds]);

  const handlePreview = (wallpaper: Wallpaper) => {
    setPreviewWallpaper(wallpaper);
    setIsPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
    setTimeout(() => setPreviewWallpaper(null), 300);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 md:px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-3">
            <Heart className="h-8 w-8 text-purple-600 fill-current" />
            <h1 className="text-4xl md:text-5xl font-bold">My Favorites</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Your collection of saved wallpapers
          </p>
        </div>

        {/* Wallpaper Grid */}
        {favoriteWallpapers.length > 0 ? (
          <>
            <div className="mb-4 text-sm text-muted-foreground">
              {favoriteWallpapers.length} {favoriteWallpapers.length === 1 ? 'wallpaper' : 'wallpapers'} saved
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favoriteWallpapers.map((wallpaper) => (
                <WallpaperCard
                  key={wallpaper.id}
                  wallpaper={wallpaper}
                  onPreview={handlePreview}
                  onAuthRequired={() => setIsAuthModalOpen(true)}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <Heart className="h-24 w-24 mx-auto mb-6 text-muted-foreground/30" />
            <h3 className="text-2xl font-semibold mb-2">No favorites yet</h3>
            <p className="text-muted-foreground mb-6">
              Start exploring and save wallpapers you love
            </p>
            <a
              href="/"
              className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 text-white font-semibold hover:from-purple-700 hover:to-blue-700 transition-all"
            >
              Browse Gallery
            </a>
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
      
      <Footer />
    </div>
  );
}

