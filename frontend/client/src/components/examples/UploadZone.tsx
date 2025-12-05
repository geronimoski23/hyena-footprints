import UploadZone from '../UploadZone';

export default function UploadZoneExample() {
  const handleImageSelect = (file: File) => {
    console.log('Image selected:', file.name);
  };

  return <UploadZone onImageSelect={handleImageSelect} />;
}
