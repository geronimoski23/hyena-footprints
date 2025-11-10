# Hyena Footprint Identification System

## Overview
A web application that allows researchers to upload hyena footprint images and receive AI-powered identification results showing the percentage likelihood of which individual hyena the footprint belongs to.

## Project Architecture

### Frontend (React + TypeScript)
- **Hero Section**: Savanna landscape background with app title and description
- **Upload Interface**: Drag-and-drop zone with file browser option
- **Image Preview**: Shows uploaded image with metadata before analysis
- **Results Display**: Shows identified hyenas with confidence percentages
- **Loading State**: Overlay with spinner during API processing

### Backend (Express + Node.js)
- **File Upload**: Handles image uploads using Multer (10MB limit, images only)
- **API Proxy**: Forwards images to external footprint identification API
- **Mock Data**: Returns sample results when no API endpoint is configured

### Key Components
- `Hero.tsx`: Hero section with background image
- `UploadZone.tsx`: Drag-and-drop and file upload interface
- `ImagePreview.tsx`: Displays uploaded image with actions
- `ResultsDisplay.tsx`: Shows analysis results with progress bars
- `LoadingOverlay.tsx`: Loading state during API calls
- `Home.tsx`: Main page orchestrating the flow

## Configuration

### API Endpoint Setup
To connect your actual hyena footprint identification API:

1. The backend expects an environment variable: `FOOTPRINT_API_ENDPOINT`
2. Set this to your API URL (e.g., `https://your-api.com/analyze`)
3. If not set, the app uses mock data for testing

**Adding the environment variable:**
- Use Replit Secrets to add `FOOTPRINT_API_ENDPOINT` with your API URL
- The API should accept POST requests with `multipart/form-data`
- Expected response format: `{ results: [{ id: string, name: string, confidence: number }] }`

### API Requirements
Your external API should:
- Accept POST requests with an image file
- Use `multipart/form-data` encoding
- Return JSON with this structure:
```json
{
  "results": [
    {
      "id": "HYN-001",
      "name": "Hyena Name",
      "confidence": 87
    }
  ]
}
```

## Design System
- **Colors**: Warm earth tones (orange/amber primary color)
- **Typography**: Inter (body), Space Grotesk (headings)
- **Theme**: Supports light and dark modes
- **Components**: Shadcn UI with Tailwind CSS

## Recent Changes
- Initial design and frontend implementation (Nov 10, 2025)
- Backend API route setup with placeholder endpoint support
- File upload handling with validation

## User Preferences
- No technical setup required for end users
- Simple drag-and-drop interface
- Clear visual feedback during processing
- Results sorted by confidence percentage
