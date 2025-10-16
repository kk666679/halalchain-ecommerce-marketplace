'use client';

import { useOptimistic } from 'react';

interface PromptInputProps {
  onGenerate: (prompt: string) => void;
  isLoading: boolean;
}

export function PromptInput({ onGenerate, isLoading }: PromptInputProps) {
  const [, setOptimisticPrompt] = useOptimistic('');

  const handleSubmit = (formData: FormData) => {
    const prompt = formData.get('prompt') as string;
    setOptimisticPrompt(prompt);
    onGenerate(prompt);
  };

  return (
    <div className="bg-card p-6 rounded-lg border border-border">
      <h2 className="text-xl font-semibold mb-4">Describe Your Website</h2>
      <form action={handleSubmit} className="space-y-4">
        <textarea
          name="prompt"
          placeholder="e.g., Generate a modern portfolio site with dark theme, glassmorphism, and contact form."
          className="w-full h-32 p-3 border border-input rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring"
          required
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 disabled:opacity-50 transition-colors"
        >
          {isLoading ? 'Generating...' : 'Generate Site'}
        </button>
      </form>
    </div>
  );
}
