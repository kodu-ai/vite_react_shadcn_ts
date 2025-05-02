import { BookingForm } from "@/components/BookingForm";

export default function BookingPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Book Your Appointment</h1>
        <p className="mt-3 text-lg text-muted-foreground max-w-xl mx-auto">
          Select your desired service, date, and time. We'll confirm your booking shortly.
        </p>
      </div>
      <BookingForm />
    </div>
  );
}