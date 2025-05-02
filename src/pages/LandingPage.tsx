import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ServiceCard } from "@/components/ServiceCard";
import { GalleryCarousel } from "@/components/GalleryCarousel";
import { ContactInfo } from "@/components/ContactInfo";
import { Scissors, Feather, Sparkles } from "lucide-react"; // Corrected icon import

const services = [
  { title: "Classic Haircut", description: "Timeless style, precision cut.", price: "$35", icon: <Scissors /> }, // Corrected icon usage
  { title: "Modern Fade", description: "Sharp fade tailored to you.", price: "$40", icon: <Sparkles /> },
  { title: "Beard Trim & Shape", description: "Keep your beard looking its best.", price: "$25", icon: <Feather /> },
  { title: "Hot Towel Shave", description: "Relaxing traditional shave experience.", price: "$45" }, // Default icon will be used
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[70vh] flex items-center justify-center text-center bg-cover bg-center" style={{ backgroundImage: "url('https://images.pexels.com/photos/3998414/pexels-photo-3998414.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}>
           <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent"></div> {/* Gradient Overlay */}
           <div className="relative z-10 space-y-4 p-4 max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Experience the Art of Barbering
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              Precision cuts, classic shaves, and modern styles. Your best look starts here at Sharp Cuts.
            </p>
            <Button size="lg" asChild>
              <Link to="/book">Book Your Appointment</Link>
            </Button>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16 md:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Our Services
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service) => (
                <ServiceCard key={service.title} {...service} />
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="py-16 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
             <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Gallery
            </h2>
            <GalleryCarousel />
          </div>
        </section>

         {/* Contact Section */}
        <section id="contact" className="py-16 md:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6">
             <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Visit Us
            </h2>
            <ContactInfo />
          </div>
        </section>
      </main>
    </div>
  );
}