"use client";

import React from 'react';
import Link from 'next/link';
import { Sparkles, Heart, Github, Twitter } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background/95 backdrop-blur mt-20">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Sparkles className="h-6 w-6 text-purple-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                LiveWalls
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Discover and download stunning animated wallpapers for your devices. Free, high-quality, and ready to use.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-purple-600 transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-muted-foreground hover:text-purple-600 transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/favorites" className="text-muted-foreground hover:text-purple-600 transition-colors">
                  Favorites
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4">Popular Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-muted-foreground hover:text-purple-600 transition-colors cursor-pointer">
                  Nature
                </span>
              </li>
              <li>
                <span className="text-muted-foreground hover:text-purple-600 transition-colors cursor-pointer">
                  Space
                </span>
              </li>
              <li>
                <span className="text-muted-foreground hover:text-purple-600 transition-colors cursor-pointer">
                  Abstract
                </span>
              </li>
              <li>
                <span className="text-muted-foreground hover:text-purple-600 transition-colors cursor-pointer">
                  Minimal
                </span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex space-x-3">
              <a
                href="#"
                className="h-10 w-10 rounded-full bg-muted flex items-center justify-center hover:bg-purple-600 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="h-10 w-10 rounded-full bg-muted flex items-center justify-center hover:bg-purple-600 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © {currentYear} LiveWalls. Made with <Heart className="h-4 w-4 inline text-red-500 fill-current" /> for wallpaper enthusiasts.
          </p>
          <div className="flex space-x-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-purple-600 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-purple-600 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
