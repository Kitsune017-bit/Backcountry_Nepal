import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Backcountry Nepal",
  description: "Snowboarding adventures in Kashmir and beyond",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className="bg-[#b5e3ff] font-poppins min-h-screen"
      >
        {children}
      </body>
    </html>
  );
}
