import type { Express } from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import axios from "axios";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  // API route to analyze hyena footprint
  app.post('/api/analyze-footprint', upload.single('image'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No image file provided' });
      }

      // Get the external API endpoint from environment variable
      const apiEndpoint = process.env.FOOTPRINT_API_ENDPOINT;

      if (!apiEndpoint || apiEndpoint === '') {
        // If no API endpoint is configured, return mock data for testing
        console.log('No FOOTPRINT_API_ENDPOINT configured, returning mock data');
        
        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const mockResults = [
          { id: 'HYN-001', name: 'Shenzi', confidence: 87 },
          { id: 'HYN-042', name: 'Banzai', confidence: 64 },
          { id: 'HYN-018', name: 'Ed', confidence: 41 },
          { id: 'HYN-029', name: 'Kamari', confidence: 23 },
        ];
        
        return res.json({ results: mockResults });
      }

      // Forward the image to the external API
      const formData = new FormData();
      const blob = new Blob([req.file.buffer], { type: req.file.mimetype });
      formData.append('image', blob, req.file.originalname);

      const response = await axios.post(apiEndpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 30000, // 30 second timeout
      });

      // Forward the API response to the client
      res.json(response.data);
    } catch (error) {
      console.error('Error analyzing footprint:', error);
      
      if (axios.isAxiosError(error)) {
        const status = error.response?.status || 500;
        const message = error.response?.data?.error || error.message;
        return res.status(status).json({ 
          error: `API error: ${message}` 
        });
      }
      
      res.status(500).json({ 
        error: 'Failed to analyze footprint. Please try again.' 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
