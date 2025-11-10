import ImagePreview from '../ImagePreview';

export default function ImagePreviewExample() {
  const mockImageUrl = 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800';
  
  const handleAnalyze = () => {
    console.log('Analyze triggered');
  };
  
  const handleRemove = () => {
    console.log('Remove triggered');
  };

  return (
    <ImagePreview
      imageUrl={mockImageUrl}
      fileName="hyena_footprint_001.jpg"
      fileSize={2457600}
      onAnalyze={handleAnalyze}
      onRemove={handleRemove}
    />
  );
}
