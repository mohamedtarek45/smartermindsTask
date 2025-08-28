import CompareProviders from "@/components/CompareProviders";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <Toaster />
        <CompareProviders/>
        {children}
        </body>
    </html>
  );
}
