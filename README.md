# Hostel Room Allocation System

A comprehensive web-based frontend application for managing hostel room allocations. This system allows administrators to effectively track student allocations, monitor overall occupancy, and manage room statuses from a centralized dashboard.

## Features

- **Centralized Dashboard**: View real-time, persistent statistics including total rooms, capacity, current occupancy rate, and available rooms.
- **System Constraints & Threshold Guards**: 
  - **Fixed Room Maximum**: Enforces a strict system ceiling capped at exactly 20 total rooms.
  - **Fixed Capacity Limit**: Ensures absolute student allocation counts never exceed a maximum threshold of 39 residents.
- **Room Management**: 
  - Add new rooms dynamically with custom capacities (Single, Double, Triple) using threshold checks.
  - Allocate multiple students to matching capacity rooms with automated duplicate name validation.
  - Seamlessly toggle rooms into an offline maintenance mode, which dims the user interface card, disables allocation buttons, and adjusts dashboard counters.
  - Remove rooms dynamically with real-time stat recalculations.
- **Advanced Search & Filter**: 
  - Dynamic Search Bar: Automatically filters room cards by room numbers, student occupant names, or current status keywords as you type.
  - Dropdown Filter Selector: Instantly sifts card layouts by specific status categories (All, Available, Partial, Full, Maintenance).
- **Recent Activity**: Track static allocations, removals, and active warning flags on the main dashboard screen.

## Technology Stack

- **HTML5**: Semantic markup for page structure.
- **CSS3 (Tailwind CSS)**: Utility-first styling via CDN for a modern, responsive, and glassmorphic user interface.
- **JavaScript (Vanilla DOM & LocalStorage)**: Interactivity, responsive state tracking, persistent page syncing, and data constraints.

## Getting Started

Since this is a client-side web application, no complex setup or build process is required.

1. Clone the repository or download the source folder.
2. Open `index.html` in your web browser to view the operational home dashboard.
3. Click the **Booking** tab (`product.html`) to test live creation limits, add student rosters, filter room grids, or simulate maintenance updates.

## Project Structure

- `index.html` - The main overview dashboard displaying persistent metrics and system logs.
- `index.js` - Lightweight rendering script loading global data states into dashboard nodes on initialization.
- `product.html` - The room management layout handling live creation forms and active room listings.
- `product.js` - Core application logic processor executing dynamic data calculations, search matching, system ceiling validation, and card manipulation handlers.
- `contact.html` & `contact.js` - Support ticketing system containing structured, debounced forms validated through regular expressions (RegEx).
- `style.css` - Centralized style variables, glassmorphic panel definitions, and global gradient visual layers.

## UI/UX Highlights

- **Glassmorphism panels**: Semi-transparent, blurred layers creating a high-end application interface.
- **Dynamic Feedback**: Immersive hover layouts, live status button text switches, micro-animations, and distinct color codes representing conditions (Emerald for Available, Amber for Partial, Rose for Full/Maintenance).
- **Responsive Layout**: Fluid flex grid structures adapting seamlessly to both desktop monitors and mobile devices.