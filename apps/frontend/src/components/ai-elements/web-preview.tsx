'use client';

import React, { useState, useRef, useEffect, createContext, useContext } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader } from '@/components/ai-elements/loader';
import { ChevronLeft, ChevronRight, RotateCcw, Maximize, Smartphone, Tablet, Monitor } from 'lucide-react';

interface WebPreviewContextType {
  url: string;
  setUrl: (url: string) => void;
  device: 'desktop' | 'tablet' | 'mobile';
  setDevice: (device: 'desktop' | 'tablet' | 'mobile') => void;
  logs: Array<{ level: 'log' | 'warn' | 'error'; message: string; timestamp: Date }>;
  addLog: (level: 'log' | 'warn' | 'error', message: string) => void;
}

const WebPreviewContext = createContext<WebPreviewContextType | null>(null);

export const useWebPreview = () => {
  const context = useContext(WebPreviewContext);
  if (!context) {
    throw new Error('useWebPreview must be used within a WebPreviewProvider');
  }
  return context;
};

interface WebPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultUrl?: string;
  onUrlChange?: (url: string) => void;
}

export const WebPreview: React.FC<WebPreviewProps> = ({
  defaultUrl = '',
  onUrlChange,
  children,
  ...props
}) => {
  const [url, setUrl] = useState(defaultUrl);
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [logs, setLogs] = useState<Array<{ level: 'log' | 'warn' | 'error'; message: string; timestamp: Date }>>([]);

  const addLog = (level: 'log' | 'warn' | 'error', message: string) => {
    setLogs(prev => [...prev, { level, message, timestamp: new Date() }]);
  };

  useEffect(() => {
    onUrlChange?.(url);
  }, [url, onUrlChange]);

  const value = {
    url,
    setUrl,
    device,
    setDevice,
    logs,
    addLog,
  };

  return (
    <WebPreviewContext.Provider value={value}>
      <div className="border rounded-lg overflow-hidden" {...props}>
        {children}
      </div>
    </WebPreviewContext.Provider>
  );
};

export const WebPreviewNavigation: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...props
}) => {
  const { url, setUrl, device, setDevice } = useWebPreview();
  const [inputUrl, setInputUrl] = useState(url);

  useEffect(() => {
    setInputUrl(url);
  }, [url]);

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUrl(inputUrl);
  };

  return (
    <div className="bg-muted p-2 flex items-center gap-2" {...props}>
      <div className="flex gap-1">
        <Button variant="ghost" size="sm">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm">
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm">
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      <form onSubmit={handleUrlSubmit} className="flex-1">
        <Input
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          placeholder="Enter URL..."
          className="w-full"
        />
      </form>

      <div className="flex gap-1">
        <Button
          variant={device === 'desktop' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setDevice('desktop')}
        >
          <Monitor className="h-4 w-4" />
        </Button>
        <Button
          variant={device === 'tablet' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setDevice('tablet')}
        >
          <Tablet className="h-4 w-4" />
        </Button>
        <Button
          variant={device === 'mobile' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setDevice('mobile')}
        >
          <Smartphone className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm">
          <Maximize className="h-4 w-4" />
        </Button>
      </div>

      {children}
    </div>
  );
};

export const WebPreviewUrl: React.FC<React.ComponentProps<typeof Input>> = (props) => {
  const { url, setUrl } = useWebPreview();

  return (
    <Input
      value={url}
      onChange={(e) => setUrl(e.target.value)}
      placeholder="https://example.com"
      {...props}
    />
  );
};

export const WebPreviewBody: React.FC<{
  src?: string;
  loading?: React.ReactNode;
} & React.IframeHTMLAttributes<HTMLIFrameElement>> = ({
  src,
  loading,
  ...props
}) => {
  const { url, device } = useWebPreview();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  const deviceSizes = {
    desktop: { width: '100%', height: '100%' },
    tablet: { width: '768px', height: '1024px' },
    mobile: { width: '375px', height: '667px' },
  };

  useEffect(() => {
    setIsLoading(true);
  }, [url]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="relative bg-white flex-1">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
          {loading || <Loader />}
        </div>
      )}
      <iframe
        ref={iframeRef}
        src={src || url}
        onLoad={handleLoad}
        className="w-full h-full border-0"
        style={{
          width: deviceSizes[device].width,
          height: deviceSizes[device].height,
          margin: device !== 'desktop' ? '0 auto' : undefined,
          display: 'block',
        }}
        {...props}
      />
    </div>
  );
};

export const WebPreviewConsole: React.FC<{
  logs?: Array<{ level: 'log' | 'warn' | 'error'; message: string; timestamp: Date }>;
} & React.HTMLAttributes<HTMLDivElement>> = ({
  logs: externalLogs,
  ...props
}) => {
  const { logs } = useWebPreview();
  const displayLogs = externalLogs || logs;

  return (
    <div className="bg-black text-green-400 p-2 font-mono text-sm max-h-40 overflow-y-auto" {...props}>
      {displayLogs.map((log, index) => (
        <div key={index} className={`mb-1 ${log.level === 'error' ? 'text-red-400' : log.level === 'warn' ? 'text-yellow-400' : ''}`}>
          [{log.timestamp.toLocaleTimeString()}] {log.message}
        </div>
      ))}
    </div>
  );
};
