"use client";

import React, { useEffect, useRef, useState } from 'react';
import { X, Download, Heart, Play, Pause } from 'lucide-react';
import { Wallpaper } from '@/lib/wallpaper-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/lib/auth-context';
import { isFavorite, addFavorite, removeFavorite } from '@/lib/favorites';
import { toast } from 'sonner';

interface PreviewModalProps {
  wallpaper: Wallpaper | null;
  isOpen: boolean;
  onClose: () => void;
  onAuthRequired?: () => void;
}

export default function PreviewModal({ wallpaper, isOpen, onClose, onAuthRequired }: PreviewModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [favorite, setFavorite] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (wallpaper) {
      setFavorite(isFavorite(wallpaper.id));
    }
  }, [wallpaper]);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  }, [isOpen, wallpaper]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleFavoriteClick = () => {
    if (!user || !wallpaper) {
      onAuthRequired?.();
      return;
    }
    
    if (favorite) {
      removeFavorite(wallpaper.id);
      setFavorite(false);
      toast.success('Removed from favorites');
    } else {
      addFavorite(wallpaper.id);
      setFavorite(true);
      toast.success('Added to favorites');
    }
  };

  const handleDownload = async () => {
    if (!wallpaper) return;
    
    setIsDownloading(true);
    toast.loading('Preparing download...');
    try {
      const response = await fetch(wallpaper.downloadUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${wallpaper.title.replace(/\s+/g, '-').toLowerCase()}.mp4`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success('Download started!');
    } catch (error) {
      console.error('Download failed:', error);
      toast.error('Download failed. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  if (!isOpen || !wallpaper) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          src={wallpaper.videoUrl}
          className="w-full h-full object-cover"
          loop
          muted
          playsInline
        />
      </div>

      {/* Controls Overlay */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Top Bar */}
        <div className="flex items-center justify-between p-4 md:p-6 bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex-1 max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{wallpaper.title}</h2>
            <p className="text-sm md:text-base text-white/80">{wallpaper.description}</p>
            <div className="flex items-center space-x-2 mt-3">
              <Badge variant="secondary" className="capitalize">
                {wallpaper.category}
              </Badge>
              {wallpaper.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-white border-white/30">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-white hover:bg-white/20 ml-4"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Center Play/Pause Button */}
        <div className="flex-1 flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={togglePlayPause}
            className="h-20 w-20 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm transition-all"
          >
            {isPlaying ? (
              <Pause className="h-10 w-10" />
            ) : (
              <Play className="h-10 w-10 ml-1" />
            )}
          </Button>
        </div>

        {/* Bottom Bar */}
        <div className="flex items-center justify-between p-4 md:p-6 bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex items-center space-x-4 text-white/80 text-sm">
            <span>{wallpaper.dimensions}</span>
            <span>•</span>
            <span>{wallpaper.fileSize}</span>
            <span>•</span>
            <span>{wallpaper.downloadCount.toLocaleString()} downloads</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleFavoriteClick}
              className={`text-white hover:bg-white/20 ${favorite ? 'text-red-500' : ''}`}
            >
              <Heart className={`h-5 w-5 ${favorite ? 'fill-current' : ''}`} />
            </Button>
            <Button
              onClick={handleDownload}
              disabled={isDownloading}
              className="bg-white text-black hover:bg-white/90 font-semibold"
            >
              <Download className="h-5 w-5 mr-2" />
              {isDownloading ? 'Downloading...' : 'Download'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

