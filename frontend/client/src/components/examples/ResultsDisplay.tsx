import ResultsDisplay from '../ResultsDisplay';

export default function ResultsDisplayExample() {
  const mockResults = [
    { id: 'HYN-001', name: 'Shenzi', confidence: 87 },
    { id: 'HYN-042', name: 'Banzai', confidence: 64 },
    { id: 'HYN-018', name: 'Ed', confidence: 41 },
    { id: 'HYN-029', name: 'Kamari', confidence: 23 },
  ];

  const handleUploadAnother = () => {
    console.log('Upload another triggered');
  };

  return (
    <ResultsDisplay
      results={mockResults}
      timestamp={new Date().toLocaleString()}
      onUploadAnother={handleUploadAnother}
    />
  );
}
