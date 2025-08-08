import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="d-flex flex-column min-vh-100">
        <Header/>
        <main className="flex-grow-1">
            {children}
        </main>
        <Footer/>
    </div>
  );
}