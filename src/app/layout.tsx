import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import { PostHogProvider } from "~/app/_providers/posthog-provider";

export const metadata: Metadata = {
  title: "Drive Tutorial",
  description: "It's like Google Drive, but for tutorial purposes",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${geist.variable}`}>
        <PostHogProvider>
          <body>{children}</body>
        </PostHogProvider>
      </html>
    </ClerkProvider>
  );
}
