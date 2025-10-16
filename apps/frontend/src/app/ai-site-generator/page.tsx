'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

import { aiToolsApi } from '../../lib/api';
import { Sidebar } from './components/Sidebar';

interface GeneratedSite {
  hero?: string;
  features?: string;
  contact?: string;
  [key: string]: unknown;
}

const generateSiteHTML = (site: GeneratedSite): string => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Generated HalalChain Site</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f9f9f9; color: #333; }
        section { margin-bottom: 40px; padding: 20px; background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        h1 { color: #28a745; text-align: center; }
        h2 { color: #007bff; }
        p { line-height: 1.6; }
      </style>
    </head>
    <body>
      ${site.hero ? `<section><h1>${site.hero}</h1></section>` : ''}
      ${site.features ? `<section><h2>Features</h2><p>${site.features}</p></section>` : ''}
      ${site.contact ? `<section><h2>Contact</h2><p>${site.contact}</p></section>` : ''}
    </body>
    </html>
  `;
};

export default function AISiteGeneratorPage() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSite, setGeneratedSite] = useState<GeneratedSite | null>(null);
  const [iframeSrc, setIframeSrc] = useState('');
  const [error, setError] = useState<string>('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please describe what you want to create for HalalChain');
      return;
    }

    setIsGenerating(true);
    setError('');
    setGeneratedSite(null);
    setIframeSrc('');

    try {
      const result = await aiToolsApi.generateSite(prompt);
      setGeneratedSite(result);
      setIframeSrc(generateSiteHTML(result));
    } catch (err: unknown) {
      console.error('Generation failed:', err);
      let errorMessage = 'Failed to generate site. Please try again.';
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosError = err as { response?: { data?: { message?: string } } };
        errorMessage = axiosError.response?.data?.message || errorMessage;
      }
      setError(errorMessage);
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <motion.div
      className="flex h-screen bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Sidebar */}
      <div className={`transition-all duration-300 overflow-hidden bg-card border-r ${sidebarOpen ? 'w-64' : 'w-0'}`}>
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Toggle Button */}
        <div className="p-4 border-b flex justify-between items-center">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md bg-muted text-foreground hover:bg-primary/10"
          >
            {sidebarOpen ? 'Close' : 'Open'} Sidebar
          </button>
          <h1 className="text-2xl font-bold">AI Site Generator</h1>
        </div>

        {/* Iframe */}
        <div className="flex-1 p-4 overflow-auto">
          {iframeSrc ? (
            <iframe
              srcDoc={iframeSrc}
              className="w-full h-96 border rounded-lg shadow-lg"
              title="Generated Site Preview"
            />
          ) : (
            <div className="flex items-center justify-center h-96 bg-muted rounded-lg">
              <p className="text-muted-foreground">Generate a site to see the preview here</p>
            </div>
          )}
        </div>

        {/* Prompt Input */}
        <div className="p-4 border-t bg-background">
          <div className="space-y-4">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe what you want to create for HalalChain..."
              className="w-full h-24 p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={isGenerating}
            />
            <div className="flex gap-2">
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
                className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? 'Generating...' : 'Generate Site'}
              </button>
              {error && <p className="text-destructive text-sm">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
