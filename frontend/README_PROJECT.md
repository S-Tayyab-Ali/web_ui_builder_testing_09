# LiveWalls - Animated Live Wallpaper Platform

A beautiful, modern web application for browsing, previewing, and downloading animated live wallpapers. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

### ✨ Core Features
- **Wallpaper Gallery** - Browse a curated collection of animated wallpapers
- **Full-Screen Preview** - Preview wallpapers with smooth video playback and controls
- **Download** - Download wallpapers directly to your device
- **Search & Filter** - Find wallpapers by keywords, categories, and tags
- **Categories** - Browse wallpapers organized by themes (Nature, Space, Abstract, etc.)
- **Favorites** - Save your favorite wallpapers (requires account)

### 🔐 User Features
- **User Authentication** - Sign up/login to access personalized features
- **Favorites Management** - Save and organize your favorite wallpapers
- **User Profile** - Simple account management with logout

### 🎨 Design Features
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Dark/Light Mode Support** - Adapts to system preferences
- **Smooth Animations** - Polished transitions and interactions
- **Toast Notifications** - User-friendly feedback for actions
- **Custom Scrollbar** - Elegant scrolling experience

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Icons:** Lucide React
- **Notifications:** Sonner (Toast)
- **Loading:** NextJS TopLoader

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the frontend directory:
\`\`\`bash
cd frontend
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

\`\`\`
frontend/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home/Gallery page
│   ├── favorites/         # Favorites page
│   ├── categories/        # Categories page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Footer
│   ├── WallpaperCard.tsx  # Wallpaper grid item
│   ├── PreviewModal.tsx   # Full-screen preview
│   ├── SearchFilterBar.tsx # Search and filters
│   └── AuthModal.tsx      # Login/signup modal
├── lib/                   # Utilities and data
│   ├── wallpaper-data.ts  # Mock wallpaper data
│   ├── auth-context.tsx   # Authentication context
│   └── favorites.ts       # Favorites management
└── components/ui/         # shadcn/ui components
\`\`\`

## Features in Detail

### Wallpaper Gallery
- Grid layout with responsive columns
- Hover effects with preview animations
- Quick favorite button on each card
- Download count and file size display

### Full-Screen Preview
- Video playback with play/pause controls
- Wallpaper details and metadata
- Download button with progress feedback
- Favorite toggle with instant feedback
- Keyboard shortcuts (ESC to close)

### Search & Filter
- Real-time search across titles, descriptions, and tags
- Category filtering with visual badges
- Result count display
- Clear and intuitive UI

### User Authentication
- Email/password authentication
- Mock authentication (frontend-only)
- Persistent login with localStorage
- User profile dropdown menu

### Favorites System
- Save/unsave wallpapers with one click
- Dedicated favorites page
- Synced across sessions
- Empty state with call-to-action

## Data Structure

### Wallpaper
\`\`\`typescript
interface Wallpaper {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  thumbnailUrl: string;
  videoUrl: string;
  downloadUrl: string;
  dimensions: string;
  fileSize: string;
  downloadCount: number;
  favoriteCount: number;
  uploadDate: string;
}
\`\`\`

## Future Enhancements

- User-uploaded wallpapers
- Social features (comments, ratings)
- Advanced filtering (by color, resolution, etc.)
- Collections/playlists
- Premium wallpapers
- Mobile apps
- AI-powered recommendations

## Notes

This is a **frontend-only application** with mock data. All functionality is implemented using:
- **localStorage** for user authentication and favorites
- **Mock data** for wallpaper content
- **Client-side logic** for all features

For a production version, you would need to:
- Set up a backend API
- Implement real authentication
- Add a database for wallpapers and users
- Set up file storage (CDN) for videos
- Add content moderation

## License

This project is a demonstration application for learning purposes.
