# Baletify - Web Music Player

A modern web-based music player application that provides seamless audio playback with persistent storage capabilities.

## Overview

Baletify is a fully-featured music player built with TypeScript and modern web technologies. The application allows users to play, manage, and organize their music library directly in the browser with offline-first capabilities using IndexedDB for data persistence.

## Implementation

### Architecture
- **Design Pattern**: MVP (Model-View-Presenter) architecture for clean separation of concerns
- **Frontend Framework**: Vanilla TypeScript with Vite build system
- **Styling**: SCSS with modular component-based styling
- **Data Storage**: IndexedDB for persistent client-side storage
- **Testing**: Jest with Testing Library for comprehensive unit and integration tests

### Tech Stack
- TypeScript 5.x for type safety
- Vite for fast development and optimized production builds
- SCSS for maintainable styling
- IndexedDB API for offline data storage
- Jest & Testing Library for test coverage
- Custom fonts (Plus Jakarta Sans) for polished UI

### Key Features
- Audio playback controls (play, pause, skip, volume)
- Track list management with persistent storage
- Responsive header and player interface
- Offline-first architecture with IndexedDB
- Type-safe implementation throughout

## Technical Challenges & Solutions

### 1. State Management
**Challenge**: Coordinating state between multiple views (header, player, track list) without a framework  
**Solution**: Implemented MVP pattern with a centralized Controller managing all view interactions and model updates

### 2. IndexedDB Integration
**Challenge**: Working with IndexedDB's asynchronous, transaction-based API  
**Solution**: Created abstraction layer in the Model to handle database operations with proper error handling and transaction management

### 3. Audio Playback Synchronization
**Challenge**: Keeping UI in sync with audio element state (current time, duration, playing status)  
**Solution**: Implemented event-driven architecture with proper event listeners and state callbacks

### 4. Testing Asynchronous Storage
**Challenge**: Testing IndexedDB operations in a Jest environment  
**Solution**: Used fake-indexeddb library to mock IndexedDB in test environment, enabling comprehensive test coverage

### 5. Build Optimization
**Challenge**: Optimizing bundle size with custom fonts and assets  
**Solution**: Configured Vite for tree-shaking, code splitting, and asset optimization

## Project Structure
```
src/
├── controllers/    # Business logic and coordination
├── models/        # Data layer and IndexedDB operations
├── views/         # UI components (Header, Player, TrackList)
├── types/         # TypeScript type definitions
├── styles/        # SCSS modules
└── data/          # Static track data
```

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

---

*Built as part of a front-end development bootcamp to demonstrate proficiency in TypeScript, web APIs, and modern development practices.*
