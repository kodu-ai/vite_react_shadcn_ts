import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, Clock } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client"; // Corrected import path
import type { Database } from "@/integrations/supabase/types"; // Import generated types

// Define available services and time slots (keep as before)
const services = [
  { id: "classic_cut", name: "Classic Haircut ($35)" },
  { id: "modern_fade", name: "Modern Fade ($40)" },
  { id: "beard_trim", name: "Beard Trim & Shape ($25)" },
  { id: "hot_shave", name: "Hot Towel Shave ($45)" },
];
const serviceMap = Object.fromEntries(services.map(s => [s.id, s.name]));


const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM"
];

// Define the form schema using Zod (keep as before)
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }).optional().or(z.literal('')), // Allow empty string or valid phone
  service: z.string({ required_error: "Please select a service." }),
  date: z.date({ required_error: "Please select a date." }),
  time: z.string({ required_error: "Please select a time slot." }),
});

// Type for inserting a new booking based on Supabase schema
type NewBooking = Database['public']['Tables']['bookings']['Insert'];

export function BookingForm() {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  // Mutation function to insert booking into Supabase
  const addBookingMutation = useMutation({
    mutationFn: async (newBooking: NewBooking) => {
      const { data, error } = await supabase
        .from('bookings')
        .insert([newBooking])
        .select(); // Select the inserted row back

      if (error) {
        // Log the detailed error for debugging
        console.error("Supabase insert error:", error);
        throw new Error(`Supabase error: ${error.message} (Code: ${error.code})`);
      }
      return data;
    },
    onSuccess: (data, variables) => {
      // Invalidate the bookings query to refetch data on the dashboard
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      toast.success("Booking Request Submitted!", {
        description: `Thanks ${variables.name}, your appointment for ${serviceMap[variables.service] || variables.service} on ${format(new Date(variables.booking_date!), "PPP")} at ${variables.booking_time} is requested.`,
      });
      form.reset(); // Reset form after successful submission
    },
    onError: (error) => {
      console.error("Booking submission error:", error);
      toast.error("Booking Failed", {
        description: `There was an issue submitting your booking. Please check the details and try again. ${error.message}`,
      });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newBookingData: NewBooking = {
        name: values.name,
        email: values.email,
        phone: values.phone || null, // Store null if empty string
        service: values.service,
        // Format date to YYYY-MM-DD for Supabase 'date' type compatibility
        booking_date: format(values.date, "yyyy-MM-dd"),
        booking_time: values.time,
        status: 'Pending', // Default status
        // id and created_at will be handled by Supabase
    };
    addBookingMutation.mutate(newBookingData);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-2xl mx-auto">
        {/* Form Fields remain the same as before */}
         <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input type="email" placeholder="john.doe@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number (Optional)</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="(123) 456-7890" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="service"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Service</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a service..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service.id} value={service.id}>
                      {service.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Appointment Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date(new Date().setHours(0, 0, 0, 0)) // Disable past dates
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Appointment Time</FormLabel>
                 <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                       <Clock className="mr-2 h-4 w-4 opacity-50 inline-block"/>
                      <SelectValue placeholder="Select a time..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" size="lg" className="w-full md:w-auto" disabled={addBookingMutation.isPending}>
          {addBookingMutation.isPending ? "Submitting..." : "Request Booking"}
        </Button>
      </form>
    </Form>
  );
}