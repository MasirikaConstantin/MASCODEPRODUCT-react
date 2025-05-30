import Footer from "@/Components/Headers/Footer";
import Header from "@/Components/Headers/Header";
import { Head } from "@inertiajs/react";
import { Toaster } from "react-hot-toast";

export default function BaseLayout({ children }) {
    return (
        <>
            <Head title="Accueil" />

        <Header/>
        
        <Toaster position="top-right" />
  
        <main className="p-2">{children}</main>
  
        <Footer/>
      </>
    );
  }
  