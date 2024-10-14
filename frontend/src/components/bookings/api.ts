import axiosInstance from "@/config/axios";
import { Booking } from "./types";

export const fetchBookings = async (email:string): Promise<Booking[]> => {
  const response = await axiosInstance.get("/bookings/user/"+email);
  return await response.data;
};
