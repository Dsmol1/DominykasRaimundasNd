import { useQuery } from "@tanstack/react-query";
import { fetchBookings } from "./api";

export const BOOKINGS_KEY = "BOOKING";

export const useBookings = (email: string) => {
  return useQuery({
    queryKey: [BOOKINGS_KEY],
    queryFn: () => fetchBookings(email),
  });
};
