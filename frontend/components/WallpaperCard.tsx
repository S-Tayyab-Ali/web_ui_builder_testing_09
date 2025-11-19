"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Heart, Download, Eye } from 'lucide-react';
import { Wallpaper } from '@/lib/wallpaper-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface WallpaperCardProps {
  wallpaper: Wallpaper;
  onPreview: (wallpaper: Wallpaper) => void;
}

export default function WallpaperCard({ wallpaper, onPreview }: WallpaperCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  return (
    <div
      className="group relative bg-card rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onPreview(wallpaper)}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        <Image
          src={wallpaper.thumbnailUrl}
          alt={wallpaper.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Overlay on hover */}
        <div className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'} flex items-center justify-center`}>
          <Button
            size="lg"
            className="bg-white text-black hover:bg-white/90"
            onClick={(e) => {
              e.stopPropagation();
              onPreview(wallpaper);
            }}
          >
            <Eye className="h-5 w-5 mr-2" />
            Preview
          </Button>
        </div>

        {/* Category badge */}
        <div className="absolute top-2 left-2">
          <Badge variant="secondary" className="capitalize">
            {wallpaper.category}
          </Badge>
        </div>

        {/* Favorite button */}
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-2 right-2 bg-black/50 hover:bg-black/70 transition-all duration-200 ${isFavorite ? 'text-red-500' : 'text-white'}`}
          onClick={handleFavoriteClick}
        >
          <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
        </Button>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 line-clamp-1">{wallpaper.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{wallpaper.description}</p>
        
        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-3">
            <span className="flex items-center">
              <Download className="h-3.5 w-3.5 mr-1" />
              {formatNumber(wallpaper.downloadCount)}
            </span>
            <span className="flex items-center">
              <Heart className="h-3.5 w-3.5 mr-1" />
              {formatNumber(wallpaper.favoriteCount)}
            </span>
          </div>
          <span className="text-xs">{wallpaper.fileSize}</span>
        </div>
      </div>
    </div>
  );
}
