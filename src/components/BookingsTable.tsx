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
import { Skeleton } from "@/components/ui/skeleton"; // For loading state
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"; // For error state
import { format, parseISO } from "date-fns"; // Need parseISO for date strings
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client"; // Corrected import path
import type { Database } from "@/integrations/supabase/types"; // Import generated types
import { AlertCircle } from "lucide-react";

// Type for a booking fetched from Supabase
type Booking = Database['public']['Tables']['bookings']['Row'];

// Map service IDs back to display names (optional, but nice)
const services = [
  { id: "classic_cut", name: "Classic Haircut" },
  { id: "modern_fade", name: "Modern Fade" },
  { id: "beard_trim", name: "Beard Trim & Shape" },
  { id: "hot_shave", name: "Hot Towel Shave" },
];
const serviceMap = Object.fromEntries(services.map(s => [s.id, s.name]));

// Helper to get badge variant based on status
const getStatusVariant = (status: Booking['status']): "default" | "secondary" | "destructive" | "outline" => {
  switch (status) {
    case "Confirmed": return "default";
    case "Pending": return "secondary";
    case "Cancelled": return "destructive";
    default: return "outline";
  }
};

// Function to fetch bookings from Supabase
async function fetchBookings(): Promise<Booking[]> {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .order('booking_date', { ascending: false }) // Show newest first
    .order('booking_time', { ascending: true });

  if (error) {
    console.error("Supabase fetch error:", error);
    throw new Error(`Supabase error: ${error.message}`);
  }
  // Ensure data is not null before returning
  return data || [];
}

export function BookingsTable() {
  const { data: bookings, isLoading, isError, error } = useQuery<Booking[], Error>({
    queryKey: ['bookings'], // Unique key for this query
    queryFn: fetchBookings, // Function to fetch data
  });

  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  if (isError) {
    return (
       <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error Loading Bookings</AlertTitle>
        <AlertDescription>
          There was a problem fetching the booking data: {error?.message || "Unknown error"}
        </AlertDescription>
      </Alert>
    );
  }

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
        {bookings?.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center h-24">
              No bookings found.
            </TableCell>
          </TableRow>
        ) : (
          bookings?.map((booking) => (
            <TableRow key={booking.id}>
              {/* Parse the date string before formatting */}
              <TableCell>{format(parseISO(booking.booking_date), "PPP")}</TableCell>
              <TableCell>{booking.booking_time}</TableCell>
              <TableCell>
                <div className="font-medium">{booking.name}</div>
                <div className="text-sm text-muted-foreground">{booking.email}</div>
              </TableCell>
              {/* Display mapped service name or the ID if not found */}
              <TableCell>{serviceMap[booking.service] || booking.service}</TableCell>
              <TableCell className="text-right">
                <Badge variant={getStatusVariant(booking.status)}>{booking.status}</Badge>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}