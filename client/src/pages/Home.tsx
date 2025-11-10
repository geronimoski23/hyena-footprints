import { useState } from 'react';
import Hero from '@/components/Hero';
import UploadZone from '@/components/UploadZone';
import ImagePreview from '@/components/ImagePreview';
import ResultsDisplay, { type HyenaMatch } from '@/components/ResultsDisplay';
import LoadingOverlay from '@/components/LoadingOverlay';

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<{ file: File; url: string } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<HyenaMatch[] | null>(null);

  const handleImageSelect = (file: File) => {
    const url = URL.createObjectURL(file);
    setSelectedImage({ file, url });
    setResults(null);
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    
    // TODO: Replace with actual API call
    // const formData = new FormData();
    // formData.append('image', selectedImage.file);
    // const response = await fetch('YOUR_API_ENDPOINT', {
    //   method: 'POST',
    //   body: formData
    // });
    // const data = await response.json();
    
    // Simulate API call with mock data
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockResults: HyenaMatch[] = [
      { id: 'HYN-001', name: 'Shenzi', confidence: 87 },
      { id: 'HYN-042', name: 'Banzai', confidence: 64 },
      { id: 'HYN-018', name: 'Ed', confidence: 41 },
      { id: 'HYN-029', name: 'Kamari', confidence: 23 },
    ];
    
    setResults(mockResults);
    setIsAnalyzing(false);
  };

  const handleRemoveImage = () => {
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage.url);
    }
    setSelectedImage(null);
    setResults(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      
      {!selectedImage && !results && (
        <UploadZone onImageSelect={handleImageSelect} />
      )}
      
      {selectedImage && !results && (
        <ImagePreview
          imageUrl={selectedImage.url}
          fileName={selectedImage.file.name}
          fileSize={selectedImage.file.size}
          onAnalyze={handleAnalyze}
          onRemove={handleRemoveImage}
        />
      )}
      
      {results && (
        <ResultsDisplay
          results={results}
          timestamp={new Date().toLocaleString()}
          onUploadAnother={handleRemoveImage}
        />
      )}
      
      {isAnalyzing && <LoadingOverlay />}
    </div>
  );
}
