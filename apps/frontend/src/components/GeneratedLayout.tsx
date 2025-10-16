'use client';

interface GeneratedSite {
  hero: string;
  features: string;
  contact: string;
}

interface Theme {
  primary: string;
  secondary: string;
  background: string;
  text: string;
}

interface GeneratedLayoutProps {
  site: GeneratedSite;
  theme: Theme;
}

export function GeneratedLayout({ site, theme }: GeneratedLayoutProps) {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: theme.background,
        color: theme.text,
        '--primary': theme.primary,
        '--secondary': theme.secondary,
      } as React.CSSProperties}
    >
      {/* Hero Section */}
      <section className="py-20 px-4 text-center" style={{ backgroundColor: theme.primary }}>
        <h1 className="text-4xl font-bold mb-4" style={{ color: theme.text }}>
          {site.hero}
        </h1>
        <p className="text-xl mb-8" style={{ color: theme.secondary }}>
          Welcome to your AI-generated website
        </p>
        <button
          className="px-6 py-3 rounded-lg font-semibold"
          style={{ backgroundColor: theme.secondary, color: theme.text }}
        >
          Get Started
        </button>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: theme.text }}>
            {site.features}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg" style={{ backgroundColor: theme.secondary }}>
              <h3 className="text-xl font-semibold mb-4" style={{ color: theme.text }}>Feature 1</h3>
              <p style={{ color: theme.text }}>Description of feature 1</p>
            </div>
            <div className="text-center p-6 rounded-lg" style={{ backgroundColor: theme.secondary }}>
              <h3 className="text-xl font-semibold mb-4" style={{ color: theme.text }}>Feature 2</h3>
              <p style={{ color: theme.text }}>Description of feature 2</p>
            </div>
            <div className="text-center p-6 rounded-lg" style={{ backgroundColor: theme.secondary }}>
              <h3 className="text-xl font-semibold mb-4" style={{ color: theme.text }}>Feature 3</h3>
              <p style={{ color: theme.text }}>Description of feature 3</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 px-4" style={{ backgroundColor: theme.secondary }}>
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8" style={{ color: theme.text }}>
            {site.contact}
          </h2>
          <form className="max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email"
              className="w-full p-3 mb-4 rounded border"
              style={{ backgroundColor: theme.background, color: theme.text }}
            />
            <textarea
              placeholder="Your message"
              className="w-full p-3 mb-4 rounded border"
              rows={4}
              style={{ backgroundColor: theme.background, color: theme.text }}
            />
            <button
              type="submit"
              className="w-full py-3 rounded-lg font-semibold"
              style={{ backgroundColor: theme.primary, color: theme.text }}
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
