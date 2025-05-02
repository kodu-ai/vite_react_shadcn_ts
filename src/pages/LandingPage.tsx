import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center text-center bg-cover bg-center" style={{ backgroundImage: "url('https://images.pexels.com/photos/3998414/pexels-photo-3998414.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}>
           <div className="absolute inset-0 bg-black/50"></div> {/* Overlay */}
           <div className="relative z-10 space-y-4 p-4">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              Experience the Art of Barbering
            </h1>
            <p className="text-lg text-gray-300 md:text-xl">
              Precision cuts, classic shaves, and modern styles. Your best look starts here.
            </p>
            <Button size="lg" asChild>
              <Link to="/book">Book Your Appointment</Link>
            </Button>
          </div>
        </section>

        {/* Placeholder for other sections */}
        <section className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Our Services
            </h2>
            <p className="text-center text-muted-foreground">
              (Service Cards will go here)
            </p>
             <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center my-8 pt-12">
              Gallery
            </h2>
            <p className="text-center text-muted-foreground">
              (Image Carousel will go here)
            </p>
             <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center my-8 pt-12">
              Visit Us
            </h2>
            <p className="text-center text-muted-foreground">
              (Contact Info & Map will go here)
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}