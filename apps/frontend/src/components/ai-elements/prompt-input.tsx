'use client';

import React, { useState, createContext, useContext } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Loader2 } from 'lucide-react';

interface PromptInputContextType {
  value: string;
  setValue: (value: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  onSubmit: (value: string) => Promise<void> | void;
}

const PromptInputContext = createContext<PromptInputContextType | null>(null);

export const usePromptInput = () => {
  const context = useContext(PromptInputContext);
  if (!context) {
    throw new Error('usePromptInput must be used within a PromptInputProvider');
  }
  return context;
};

interface InputProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSubmit'> {
  onSubmit: (value: string) => Promise<void> | void;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
}

export const Input: React.FC<InputProps> = ({
  onSubmit,
  placeholder = 'Enter your prompt...',
  disabled = false,
  maxLength = 1000,
  children,
  ...props
}) => {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim() || isLoading || disabled) return;

    setIsLoading(true);
    try {
      await onSubmit(value);
      setValue('');
    } catch (error) {
      console.error('Submit error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const contextValue = {
    value,
    setValue,
    isLoading,
    setIsLoading,
    onSubmit,
  };

  return (
    <PromptInputContext.Provider value={contextValue}>
      <div {...props}>
        <form onSubmit={handleSubmit} className="relative">
          {children}
        </form>
      </div>
    </PromptInputContext.Provider>
  );
};

interface PromptInputTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  placeholder?: string;
  maxLength?: number;
}

export const PromptInputTextarea: React.FC<PromptInputTextareaProps> = ({
  placeholder = 'Enter your prompt...',
  maxLength = 1000,
  className = '',
  ...props
}) => {
  const { value, setValue, isLoading } = usePromptInput();

  return (
    <div className="relative">
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        disabled={isLoading}
        maxLength={maxLength}
        className={`resize-none pr-12 ${className}`}
        rows={3}
        {...props}
      />
      <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
        {value.length}/{maxLength}
      </div>
    </div>
  );
};

interface PromptInputSubmitProps extends React.ComponentProps<typeof Button> {
  status?: 'ready' | 'streaming' | 'error';
}

export const PromptInputSubmit: React.FC<PromptInputSubmitProps> = ({
  status = 'ready',
  disabled,
  children,
  ...props
}) => {
  const { value, isLoading } = usePromptInput();

  const isDisabled = disabled || !value.trim() || isLoading;

  return (
    <Button
      type="submit"
      size="sm"
      disabled={isDisabled}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : status === 'streaming' ? (
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-current rounded-full animate-pulse" />
          <span className="text-xs">Generating...</span>
        </div>
      ) : (
        <Send className="h-4 w-4" />
      )}
      {children}
    </Button>
  );
};
