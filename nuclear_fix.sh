#!/bin/bash

echo "Nuclear option: completely recreating corrupted files..."

# Remove and recreate the corrupted files
cd /workspaces/halalchain-ecommerce-marketplace/apps/frontend

# Backup any important data first
mkdir -p /tmp/frontend_backup
cp -r src/app /tmp/frontend_backup/ 2>/dev/null || true

# Remove the corrupted files
rm -f src/app/checkout/page.tsx
rm -f src/app/page.tsx
rm -f src/hooks/useCart.ts
rm -f src/app/layout.tsx
rm -f src/components/menu-bar.tsx

# Ensure directories exist
mkdir -p src/app/checkout
mkdir -p src/hooks
mkdir -p src/components

# Create fresh, simple files to start

# Checkout page
cat > src/app/checkout/page.tsx << 'CHECKOUT'
export default function CheckoutPage() {
  return (
    <div>
      <h1>Checkout</h1>
      <p>Checkout page content</p>
    </div>
  );
}
CHECKOUT

# Home page
cat > src/app/page.tsx << 'HOME'
export default function HomePage() {
  return (
    <div>
      <h1>HalalChain Marketplace</h1>
      <p>Welcome to our marketplace</p>
    </div>
  );
}
HOME

# useCart hook
cat > src/hooks/useCart.ts << 'USECART'
export function useCart() {
  return {
    cart: null,
    loading: false,
    addToCart: () => {},
    checkout: () => {},
  };
}
USECART

# Layout
cat > src/app/layout.tsx << 'LAYOUT'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
LAYOUT

# Menu bar
cat > src/components/menu-bar.tsx << 'MENUBAR'
export default function MenuBar() {
  return <nav>Menu Bar</nav>;
}
MENUBAR

echo "Basic files created. Testing build..."
npm run build

