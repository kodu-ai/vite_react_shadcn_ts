import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

// Define the structure of a booking
interface Booking {
  id: string;
  name: string;
  email: string;
  service: string;
  date: Date;
  time: string;
  status: "Confirmed" | "Pending" | "Cancelled";
}

// Sample booking data (replace with real data later)
const sampleBookings: Booking[] = [
  { id: "bk_1", name: "Alice Johnson", email: "alice.j@example.com", service: "Modern Fade", date: new Date(2025, 4, 15), time: "10:00 AM", status: "Confirmed" },
  { id: "bk_2", name: "Bob Williams", email: "bob.w@sample.net", service: "Classic Haircut", date: new Date(2025, 4, 15), time: "02:00 PM", status: "Confirmed" },
  { id: "bk_3", name: "Charlie Brown", email: "charlie@mail.org", service: "Hot Towel Shave", date: new Date(2025, 4, 16), time: "11:00 AM", status: "Pending" },
  { id: "bk_4", name: "Diana Prince", email: "diana.p@hero.com", service: "Beard Trim & Shape", date: new Date(2025, 4, 17), time: "03:00 PM", status: "Confirmed" },
  { id: "bk_5", name: "Ethan Hunt", email: "ethan.h@imf.gov", service: "Classic Haircut", date: new Date(2025, 4, 18), time: "09:00 AM", status: "Cancelled" },
];

// Helper to get badge variant based on status
const getStatusVariant = (status: Booking['status']): "default" | "secondary" | "destructive" | "outline" => {
  switch (status) {
    case "Confirmed": return "default"; // Greenish in dark mode usually
    case "Pending": return "secondary"; // Yellowish/Grayish
    case "Cancelled": return "destructive"; // Reddish
    default: return "outline";
  }
};

export function BookingsTable() {
  // In a real app, you'd fetch this data using React Query
  const bookings = sampleBookings;

  return (
    <Table>
      <TableCaption>A list of recent bookings.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Service</TableHead>
          <TableHead className="text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookings.length === 0 && (
          <TableRow>
            <TableCell colSpan={5} className="text-center h-24">
              No bookings found.
            </TableCell>
          </TableRow>
        )}
        {bookings.map((booking) => (
          <TableRow key={booking.id}>
            <TableCell>{format(booking.date, "PPP")}</TableCell>
            <TableCell>{booking.time}</TableCell>
            <TableCell>
              <div className="font-medium">{booking.name}</div>
              <div className="text-sm text-muted-foreground">{booking.email}</div>
            </TableCell>
            <TableCell>{booking.service}</TableCell>
            <TableCell className="text-right">
              <Badge variant={getStatusVariant(booking.status)}>{booking.status}</Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}