import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Clock } from "lucide-react";

export function ContactInfo() {
  return (
    <div className="grid md:grid-cols-2 gap-8 items-start">
      <Card>
        <CardHeader>
          <CardTitle>Visit Our Shop</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start space-x-3">
            <MapPin className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
            <div>
              <p className="font-semibold">Address</p>
              <p className="text-muted-foreground">123 Barber Lane, Styleville, ST 45678</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Phone className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
            <div>
              <p className="font-semibold">Phone</p>
              <p className="text-muted-foreground">(123) 456-7890</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Clock className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
            <div>
              <p className="font-semibold">Hours</p>
              <p className="text-muted-foreground">Mon - Fri: 9am - 7pm</p>
              <p className="text-muted-foreground">Sat: 10am - 5pm</p>
              <p className="text-muted-foreground">Sun: Closed</p>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Placeholder for Map */}
      <div className="bg-muted rounded-lg aspect-video flex items-center justify-center">
        <p className="text-muted-foreground">Map Placeholder</p>
        {/* In a real app, embed Google Maps or similar here */}
      </div>
    </div>
  );
}