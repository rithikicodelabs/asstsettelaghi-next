'use client'
import { Navbar } from "design-react-kit";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <Navbar/>
        {children}
    </div>
  );
}