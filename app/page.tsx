import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navigation";
import { Work, Services, About, Contact } from "@/components/sections";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Work />
      <Services />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
