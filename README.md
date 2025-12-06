# Hyena Footprint Identification System

## Overview

In partnership with WildTrack (wildtrack.org), we have developed a hyena footprint identification system that allows users to match footprints they see in the wild to the species it may belong to.


## Project Architecture

### Frontend (React + TypeScript)
- **Hero Section**: Savanna landscape background with app title and description
    <img src="images/Hero.png" width="400">
- **Upload Interface**: Drag-and-drop zone with file browser option and select sample image option
    <img src="images/Select.png" width="250">
- **Image Preview**: Shows uploaded image with metadata before analysis
- **Loading State**: Overlay with spinner during API processing
    <img src="images/Upload.png" width="400">
- **Results Display**: Shows identified hyenas with confidence percentages
    <img src="images/Result.png" width="400">


### Backend (Express + Node.js)
- **File Upload**: Handles image uploads using Multer (10MB limit, images only)
- **API Proxy**: Forwards images to external footprint identification API