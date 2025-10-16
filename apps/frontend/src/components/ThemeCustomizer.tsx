'use client';

interface Theme {
  primary: string;
  secondary: string;
  background: string;
  text: string;
}

interface ThemeCustomizerProps {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export function ThemeCustomizer({ theme, onThemeChange }: ThemeCustomizerProps) {
  const handleChange = (key: keyof Theme, value: string) => {
    onThemeChange({ ...theme, [key]: value });
  };

  return (
    <div className="bg-card p-6 rounded-lg border border-border">
      <h2 className="text-xl font-semibold mb-4">Customize Theme</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Primary Color</label>
          <input
            type="color"
            value={theme.primary}
            onChange={(e) => handleChange('primary', e.target.value)}
            className="w-full h-10 border border-input rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Secondary Color</label>
          <input
            type="color"
            value={theme.secondary}
            onChange={(e) => handleChange('secondary', e.target.value)}
            className="w-full h-10 border border-input rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Background Color</label>
          <input
            type="color"
            value={theme.background}
            onChange={(e) => handleChange('background', e.target.value)}
            className="w-full h-10 border border-input rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Text Color</label>
          <input
            type="color"
            value={theme.text}
            onChange={(e) => handleChange('text', e.target.value)}
            className="w-full h-10 border border-input rounded"
          />
        </div>
      </div>
    </div>
  );
}
