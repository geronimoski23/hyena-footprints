import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileImage, X } from 'lucide-react';

interface ImagePreviewProps {
  imageUrl: string;
  fileName: string;
  fileSize: number;
  onAnalyze: () => void;
  onRemove: () => void;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

export default function ImagePreview({ imageUrl, fileName, fileSize, onAnalyze, onRemove }: ImagePreviewProps) {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12">
      <Card>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <FileImage className="w-5 h-5 text-primary" />
              <div>
                <h3 className="font-semibold" data-testid="text-filename">{fileName}</h3>
                <p className="text-sm text-muted-foreground" data-testid="text-filesize">
                  {formatFileSize(fileSize)}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onRemove}
              data-testid="button-remove"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="relative w-full max-h-96 rounded-lg overflow-hidden bg-muted mb-6">
            <img
              src={imageUrl}
              alt="Uploaded footprint"
              className="w-full h-full object-contain"
              data-testid="img-preview"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant="default"
              size="lg"
              onClick={onAnalyze}
              className="flex-1 sm:flex-none"
              data-testid="button-analyze"
            >
              Analyze Footprint
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={onRemove}
              className="flex-1 sm:flex-none"
              data-testid="button-upload-different"
            >
              Upload Different Image
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
