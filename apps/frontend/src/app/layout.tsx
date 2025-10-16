import { ThemeProvider } from '@/components/theme-provider';
import { AuthProvider } from '@/contexts/AuthContext';
import { Layout } from '@/components/Layout';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';
import { PageTransition } from '@/components/motion/PageTransition';
import { PageTransitions } from '@/components/motion/PageTransitions';
import './globals.css';

export const metadata = {
  title: 'HalalChain - Blockchain-Powered Halal E-commerce',
  description: 'A blockchain-powered, AI-driven multivendor e-commerce platform for Halal products',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <SmoothScrollProvider>
            <AuthProvider>
              <Layout>
                <PageTransitions>
                  <PageTransition>
                    {children}
                  </PageTransition>
                </PageTransitions>
              </Layout>
            </AuthProvider>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
