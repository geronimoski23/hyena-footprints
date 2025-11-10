import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export interface HyenaMatch {
  id: string;
  name: string;
  confidence: number;
}

interface ResultsDisplayProps {
  results: HyenaMatch[];
  timestamp: string;
  onUploadAnother: () => void;
}

function getConfidenceBadge(confidence: number) {
  if (confidence >= 80) {
    return (
      <Badge variant="default" className="bg-green-600 hover:bg-green-700">
        <CheckCircle2 className="w-3 h-3 mr-1" />
        High Confidence
      </Badge>
    );
  } else if (confidence >= 50) {
    return (
      <Badge variant="secondary">
        Medium Confidence
      </Badge>
    );
  } else {
    return (
      <Badge variant="outline" className="border-yellow-600 text-yellow-600">
        <AlertCircle className="w-3 h-3 mr-1" />
        Low Confidence
      </Badge>
    );
  }
}

export default function ResultsDisplay({ results, timestamp, onUploadAnother }: ResultsDisplayProps) {
  const sortedResults = [...results].sort((a, b) => b.confidence - a.confidence);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-4 flex-wrap space-y-0 pb-4">
          <div>
            <h2 className="text-2xl font-semibold">Analysis Results</h2>
            <p className="text-sm text-muted-foreground mt-1" data-testid="text-timestamp">
              Analyzed on {timestamp}
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {sortedResults.map((result, index) => (
            <Card key={result.id} className="overflow-visible">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold mb-1" data-testid={`text-hyena-name-${index}`}>
                      {result.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">ID: {result.id}</p>
                  </div>
                  {getConfidenceBadge(result.confidence)}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Match Probability</span>
                    <span className="text-2xl font-bold" data-testid={`text-confidence-${index}`}>
                      {result.confidence}%
                    </span>
                  </div>
                  <Progress value={result.confidence} className="h-3" data-testid={`progress-bar-${index}`} />
                </div>
              </CardContent>
            </Card>
          ))}

          <div className="pt-4 flex justify-center">
            <Button
              variant="default"
              size="lg"
              onClick={onUploadAnother}
              data-testid="button-upload-another"
            >
              Upload Another Footprint
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
