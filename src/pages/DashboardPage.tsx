import { BookingsTable } from "@/components/BookingsTable";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="container py-12 md:py-20">
       <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-10">Booking Dashboard</h1>

       <Card>
         <CardHeader>
           <CardTitle>Recent Bookings</CardTitle>
           <CardDescription>View and manage upcoming appointments.</CardDescription>
         </CardHeader>
         <CardContent>
           <BookingsTable />
         </CardContent>
       </Card>

       {/* Add more dashboard widgets here later if needed */}
       {/* e.g., Stats cards, calendar view, etc. */}
    </div>
  );
}