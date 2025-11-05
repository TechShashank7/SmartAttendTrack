# Overview

This is a Smart Attendance System built as a full-stack web application that revolutionizes attendance tracking in educational institutions. The system combines modern web technologies with proximity-based attendance using BLE (Bluetooth Low Energy), biometric verification, and gamification elements to create an engaging and secure attendance management solution.

The application serves both teachers and students with dedicated dashboards. Teachers can start and monitor attendance sessions in real-time, while students can check in using proximity detection and biometric verification. The system includes leaderboards and achievement systems to gamify the attendance experience.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The frontend is built using React 18 with TypeScript, implementing a single-page application (SPA) architecture. The UI framework leverages shadcn/ui components built on top of Radix UI primitives, providing a consistent and accessible design system. Styling is handled through Tailwind CSS with custom CSS variables for theming support.

Key architectural decisions:
- **Component-based architecture**: Modular React components with clear separation of concerns
- **Client-side routing**: Uses Wouter for lightweight routing without the overhead of React Router
- **State management**: TanStack Query for server state management with built-in caching and synchronization
- **Type safety**: Full TypeScript implementation ensuring compile-time error detection

## Backend Architecture
The backend follows a RESTful API design using Express.js with TypeScript. The server implements a layered architecture with clear separation between routes, business logic, and data access.

Key components:
- **Express server**: Handles HTTP requests and middleware
- **Storage abstraction**: Interface-based storage layer supporting both in-memory and database implementations
- **Development tooling**: Hot module replacement with Vite for rapid development

## Database Design
The system uses PostgreSQL as the primary database with Drizzle ORM for type-safe database operations. The current schema includes:
- **Users table**: Stores user credentials and basic information with UUID primary keys
- **Schema validation**: Zod integration for runtime type checking and validation

Database configuration uses environment-based connection strings for deployment flexibility.

## Authentication & Security
Currently implements a basic user authentication system with:
- Username/password authentication
- Session-based authentication (prepared for connect-pg-simple session store)
- Biometric verification simulation for attendance confirmation

## Development & Build System
The project uses a modern development stack optimized for developer experience:
- **Vite**: Fast development server with HMR and optimized production builds
- **TypeScript**: Comprehensive type checking across the entire codebase
- **ESBuild**: Fast bundling for production builds
- **Drizzle Kit**: Database migration and schema management tools

The build process separates client and server builds, with the client built as static assets and the server bundled as an ESM module.

# External Dependencies

## UI Components & Styling
- **Radix UI**: Comprehensive set of unstyled, accessible UI primitives (@radix-ui/react-*)
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **shadcn/ui**: Pre-built component library with consistent styling
- **Lucide React**: Icon library for consistent iconography
- **FontAwesome**: Additional icon support for specific UI elements

## Database & ORM
- **PostgreSQL**: Primary database (configured via Neon Database serverless driver)
- **Drizzle ORM**: Type-safe database toolkit with schema management
- **Drizzle Kit**: Database migration and introspection tools

## Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Static type checking
- **ESBuild**: JavaScript bundler for production
- **TanStack Query**: Server state management and caching
- **React Hook Form**: Form state management with validation

## Authentication & Session Management
- **connect-pg-simple**: PostgreSQL session store for Express sessions
- **Zod**: Runtime type validation and schema parsing

## Utilities
- **date-fns**: Date manipulation and formatting
- **clsx & class-variance-authority**: Conditional CSS class management
- **cmdk**: Command palette functionality

The application is designed to be deployed on platforms supporting Node.js with PostgreSQL database connectivity.