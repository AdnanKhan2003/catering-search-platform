# CaterHub - Catering Search Platform

A minimalist, responsive directory for discovering and booking premium caterers in Mumbai.

## Features

- **Caterer Discovery**: Search by name and filter by price per plate.
- **Detailed Profiles**: Document-style views for each caterer with cuisine and location details.
- **Partner Registration**: Seamless boarding for new catering businesses.
- **Responsive Design**: Optimized for mobile, tablet, and desktop.

## Tech Stack

- **Frontend**: Next.js 15, Tailwind CSS, Lucide Icons.
- **Backend**: Node.js, Express, MongoDB.

## Getting Started

### Prerequisites

- Node.js & npm
- MongoDB instance

### Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   # In root, backend, and frontend directories
   npm install
   ```

### Running the App

**Backend**:
```bash
cd backend
npm run dev
```

**Frontend**:
```bash
cd frontend
npm run dev
```

The portal will be available at `http://localhost:3000`.

## Deployment

### Backend (Render)
1. Create a new Web Service on Render.
2. Connect your GitHub repository.
3. Use the following build settings:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
4. Use the following environment variables:

### Frontend (Vercel)
1. Import your repository into Vercel.
2. In Project Settings > Environment Variables, add:
   - `NEXT_PUBLIC_API_URL`: The URL of your Render backend (e.g., `https://your-backend.onrender.com/api`).
3. Deploy.

