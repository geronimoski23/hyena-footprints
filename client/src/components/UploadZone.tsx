import { useCallback, useState } from 'react';
import { Upload, FileImage } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface UploadZoneProps {
  onImageSelect: (file: File) => void;
}

export default function UploadZone({ onImageSelect }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (imageFile) {
      onImageSelect(imageFile);
    }
  }, [onImageSelect]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageSelect(file);
    }
  }, [onImageSelect]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-8">
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            border-2 border-dashed rounded-xl p-12 flex flex-col items-center justify-center
            transition-all duration-200 cursor-pointer hover-elevate
            ${isDragging ? 'border-primary bg-primary/5 scale-[1.02]' : 'border-border'}
          `}
          data-testid="upload-dropzone"
        >
          <Upload className={`w-16 h-16 mb-4 transition-colors ${isDragging ? 'text-primary' : 'text-muted-foreground'}`} />
          <h3 className="text-xl font-semibold mb-2">Drop footprint image here</h3>
          <p className="text-muted-foreground text-center mb-6">
            or click the button below to browse
          </p>
          <label htmlFor="file-input">
            <Button variant="default" size="lg" asChild data-testid="button-browse">
              <span>
                <FileImage className="w-4 h-4 mr-2" />
                Browse Files
              </span>
            </Button>
          </label>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
            data-testid="input-file"
          />
        </div>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Upload Guidelines</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span className="text-muted-foreground">
                  <strong className="text-foreground">Supported formats:</strong> JPG, PNG, WebP
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span className="text-muted-foreground">
                  <strong className="text-foreground">Image quality:</strong> High resolution preferred (min. 800x600px)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span className="text-muted-foreground">
                  <strong className="text-foreground">Lighting:</strong> Clear, well-lit images work best
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span className="text-muted-foreground">
                  <strong className="text-foreground">Focus:</strong> Ensure footprint is in sharp focus
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span className="text-muted-foreground">
                  <strong className="text-foreground">Background:</strong> Plain background improves accuracy
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
