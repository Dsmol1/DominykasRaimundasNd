import Button from "../common/Button";
import styles from "./BusinessCard.module.scss";
import { Business } from "./types";
import { ROUTES } from "@/router/consts";
import { useNavigate, generatePath } from "react-router-dom";

interface BusinessCardProps {
  business: Business;
}

const BusinessCard = ({ business }: BusinessCardProps) => {
  const navigate = useNavigate();
  const bookNowPath = generatePath(ROUTES.BUSINESS_INNER, { id: business._id });

  return (
    <div className={styles.card}>
      {business.imageUrls.length && (
        <img
          src={business.imageUrls[0]}
          alt={business.name}
          className={styles.image}
        />
      )}
      <div className={styles.infoContainer}>
        <span className={styles.chip}>{business.category}</span>
        <h3 className={styles.name}>{business.name}</h3>
        <p className={styles.contactPerson}>{business.contactPerson}</p>
        <p className={styles.address}>{business.address}</p>
        <Button onClick={() => navigate(bookNowPath)}>Book now</Button>
      </div>
    </div>
  );
};

export default BusinessCard;
