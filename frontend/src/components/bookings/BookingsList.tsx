import { useState, useContext } from 'react';
import styles from "./BookingsList.module.scss";
import { useBookings } from "./hooks";
import { UserContext } from "@/context/UserContext";
import BookingCard from "./BookingCard";
import { useBusinesses } from "../business/hooks";

const BookingsList = () => {
  const [activeTab, setActiveTab] = useState<string>('booked');

  const { user } = useContext(UserContext);
  const userEmail = user.email ?? '';
  const { data } = useBookings(userEmail);

  const businessesData = useBusinesses().data ?? [];

  const bookings = data ?? [];

  const tabChange = function (value: string) {
    setActiveTab(value);
  };

  const pendingBookings = bookings.filter((booking) => booking.status == 'pending' || booking.status == 'confirmed' );
  const completedBookings = bookings.filter((booking) => booking.status === 'completed' );

  return (
    <div className={styles.container}>
      <h3>My bookings</h3>
      <div className={styles.bookingTabsHolder}>
        <div onClick={() => tabChange('booked')} className={activeTab == "booked" ? styles.active : ''}>Booked</div>
        <div onClick={() => tabChange('completed')} className={activeTab == "completed" ? styles.active : ''}>Completed</div>
      </div>
      <div className={styles.bookingsList}>
        {activeTab == "booked" ? pendingBookings.map((booking) => {
          const business = businessesData.filter((business) => business._id == booking.businessId );
          return <BookingCard key={booking._id} booking={booking} business={business[0]} />
        }) : ''}
        {activeTab == "completed" ? completedBookings.map((booking) => {
          const business = businessesData.filter((business) => business._id == booking.businessId );
          return <BookingCard key={booking._id} booking={booking} business={business[0]} />
        }) : ''}
      </div>
    </div>
  );
};

export default BookingsList;
