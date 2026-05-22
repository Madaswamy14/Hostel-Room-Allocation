# Hostel Room Allocation System

A comprehensive web-based frontend application for managing hostel room allocations. This system allows administrators to effectively track student allocations, monitor overall occupancy, and manage room statuses from a centralized dashboard.

## Features

- **Dashboard**: View real-time statistics including total rooms, capacity, current occupancy rate, and available rooms.
- **Room Management**: 
  - Add new rooms with different capacities (Single, Double, Triple).
  - Allocate students to available rooms.
  - Mark rooms for maintenance.
  - Remove rooms from the system.
- **Search & Filter**: Easily search for specific rooms or filter by availability status (Available, Partial, Full, Maintenance).
- **Recent Activity**: Track recent allocations, removals, and status changes on the dashboard.

## Technology Stack

- **HTML5**: Semantic markup for page structure.
- **CSS3 (Tailwind CSS)**: Utility-first styling via CDN for a modern, responsive, and glassmorphism-inspired design.
- **JavaScript (Vanilla)**: DOM manipulation, state management, and interactivity.

## Getting Started

Since this is a client-side web application, no complex setup or build process is required.

1. **Clone the repository** (if applicable) or download the source code.
2. Open `index.html` in your preferred modern web browser.
3. Navigate to the **Booking** tab (`product.html`) to start managing rooms.

## Project Structure

- `index.html` - The main dashboard providing an overview of hostel occupancy and recent activities.
- `index.js` - Logic for updating dashboard statistics.
- `product.html` - The room management page for adding, removing, and modifying rooms.
- `product.js` - Logic for handling room states, adding students, filtering, and searching.
- `contact.html` & `contact.js` - The support/contact page.
- `style.css` - Custom CSS overrides and gradient backgrounds used across the application.

## UI/UX Highlights

- **Glassmorphism panels**: Semi-transparent, blurred backgrounds for a premium look.
- **Dynamic Feedback**: Hover effects, micro-animations, and vibrant colors denoting room statuses (Emerald for Available, Amber for Partial, Rose for Full/Maintenance).
- **Responsive Layout**: Adapts seamlessly to desktop and mobile screens.