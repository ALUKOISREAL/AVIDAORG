import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip"

// Configure Poppins
const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  // Specify the weights you plan to use in your app
  weight: ["300", "400", "500", "600", "700"], 
});

export const metadata: Metadata = {
  title: "AVIDA",
  description: "MY PORTFOLIO",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full antialiased`}
    >
      <body className={`${poppins.className} min-h-full flex flex-col`}>
        {/* The Provider must go inside the body, wrapping the children */}
        <TooltipProvider>
          {children}
        </TooltipProvider>
      </body>
    </html>
  );
}
