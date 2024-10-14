import styles from "./BookingCard.module.scss";
import { Booking } from "./types";
import { Business } from "../business/types";
import { IoPerson } from "react-icons/io5";
import { MdOutlinePlace } from "react-icons/md";
import { CiCalendar } from "react-icons/ci";
import { FaRegClock } from "react-icons/fa";
import Moment from 'moment';

interface BookingCardProps {
  booking: Booking;
  business: Business;
}

const BookingCard = ({ booking, business }: BookingCardProps) => {
  return (
    <div className={styles.bookingCard}>
      { business.imageUrls.length > 0 ?
        <div className={styles.imageHolder}>
          <img src={business.imageUrls[0]}  alt={business.name} />
        </div> : ''
      }
      <div className={styles.info}>
        <p className={styles.businessName}>{business.name}</p>
        <p className={styles.contactPerson}><IoPerson />{business.contactPerson}</p>
        <p className={styles.address}><MdOutlinePlace />{business.address}</p>
        <p className={styles.date}><CiCalendar /> Service on:&nbsp;<b>{Moment(booking.date).format("YYYY-MM-DD")}</b></p>
        <p className={styles.time}><FaRegClock /> service on:&nbsp;<b>{booking.time}</b></p>
      </div>
    </div>
  );
};

export default BookingCard;
