import FloatingShapes from "@/components/floating-shapes";
import { Inter} from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pixel",
  description: "AI Image Editor",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className}`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {/* {<header/>} */}
            <main className="bg-slate-900 min-h-[2000px] text-white overflow-x-hidden">
            <FloatingShapes />
            <Toaster richColors/>
            {children}
            </main>

        </ThemeProvider>
      </body>
    </html>
  );
}
