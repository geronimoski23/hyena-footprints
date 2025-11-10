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
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    
    try {
      const formData = new FormData();
      formData.append('image', selectedImage.file);
      
      const response = await fetch('/api/analyze-footprint', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze footprint');
      }
      
      const data = await response.json();
      setResults(data.results);
    } catch (error) {
      console.error('Error analyzing footprint:', error);
      alert(error instanceof Error ? error.message : 'Failed to analyze footprint. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
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
