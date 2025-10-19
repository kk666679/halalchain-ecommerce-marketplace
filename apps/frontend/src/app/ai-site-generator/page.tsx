'use client';

import { useState } from 'react';
import {
  WebPreview,
  WebPreviewBody,
  WebPreviewNavigation,
  WebPreviewUrl,
} from '@/components/ai-elements/web-preview';
import { Loader } from '@/components/ai-elements/loader';
import {
  Artifact,
  ArtifactHeader,
  ArtifactTitle,
  ArtifactDescription,
  ArtifactActions,
  ArtifactAction,
  ArtifactContent,
} from '@/components/ai-elements/artifact';
import { Copy, Download, Share, X } from 'lucide-react';

interface GeneratedSite {
  demo?: string;
  webUrl?: string;
  code?: string;
  title?: string;
}

export default function AISiteGeneratorPage() {
  const [previewUrl, setPreviewUrl] = useState('');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSite, setGeneratedSite] = useState<GeneratedSite | null>(null);
  const [showArtifact, setShowArtifact] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);
    try {
      const response = await fetch('/api/v0', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data: GeneratedSite = await response.json();
      setPreviewUrl(data.demo || '/');
      setGeneratedSite(data);
      setShowArtifact(true);
      console.log('Generation finished:', data);
    } catch (error) {
      console.error('Generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyCode = () => {
    if (generatedSite?.code) {
      navigator.clipboard.writeText(generatedSite.code);
    }
  };

  const handleDownload = () => {
    if (generatedSite?.code) {
      const blob = new Blob([generatedSite.code], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'generated-site.html';
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleShare = () => {
    if (generatedSite?.demo) {
      navigator.share?.({
        title: generatedSite.title || 'Generated Site',
        url: generatedSite.demo,
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Preview Section */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">AI Site Generator</h1>

          <div className="h-[500px] border rounded-lg overflow-hidden">
            {isGenerating ? (
              <div className="flex flex-col items-center justify-center h-full">
                <Loader />
                <p className="mt-4 text-muted-foreground">
                  Generating app, this may take a few seconds...
                </p>
              </div>
            ) : previewUrl ? (
              <WebPreview defaultUrl={previewUrl}>
                <WebPreviewNavigation>
                  <WebPreviewUrl />
                </WebPreviewNavigation>
                <WebPreviewBody src={previewUrl} />
              </WebPreview>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                Your generated app will appear here
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="relative">
            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the app you want to build..."
                className="w-full min-h-[80px] p-3 pr-12 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                rows={3}
                disabled={isGenerating}
              />
              <button
                type="submit"
                disabled={!prompt.trim() || isGenerating}
                className="absolute bottom-2 right-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? 'Generating...' : 'Generate'}
              </button>
            </div>
          </form>
        </div>

        {/* Artifact Section */}
        {showArtifact && generatedSite && (
          <div className="space-y-4">
            <Artifact>
              <ArtifactHeader>
                <div>
                  <ArtifactTitle>{generatedSite.title || 'Generated Site'}</ArtifactTitle>
                  <ArtifactDescription>Generated just now</ArtifactDescription>
                </div>
                <ArtifactActions>
                  <ArtifactAction
                    icon={Copy}
                    label="Copy code"
                    tooltip="Copy to clipboard"
                    onClick={handleCopyCode}
                  />
                  <ArtifactAction
                    icon={Download}
                    label="Download"
                    tooltip="Download HTML file"
                    onClick={handleDownload}
                  />
                  <ArtifactAction
                    icon={Share}
                    label="Share"
                    tooltip="Share site"
                    onClick={handleShare}
                  />
                  <ArtifactAction
                    icon={X}
                    label="Close"
                    tooltip="Close artifact"
                    onClick={() => setShowArtifact(false)}
                  />
                </ArtifactActions>
              </ArtifactHeader>
              <ArtifactContent>
                <pre className="text-sm overflow-x-auto bg-muted p-4 rounded">
                  <code>{generatedSite.code || 'No code available'}</code>
                </pre>
              </ArtifactContent>
            </Artifact>
          </div>
        )}
      </div>
    </div>
  );
}
