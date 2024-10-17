import { useState } from "react";
import { useParams } from "react-router-dom";
import { useBusinesses } from "../components/business/hooks";
import styles from "./BusinessInner.module.scss";
import { MdOutlinePlace } from "react-icons/md";
import { CiMail } from "react-icons/ci";
import Button from "../components/common/Button";
import { LuUpload, LuFileSignature } from "react-icons/lu";
import { IoPerson } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { IoClose } from "react-icons/io5";

interface Business {
    _id: string;
    name: string;
    category: string;
    address: string;
    email: string;
    contactPerson: string;
    about: string;
    imageUrls: string[];
}

const BusinessInner: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>(); // Typing for useParams
    const { data } = useBusinesses();
    const businesses: Business[] = data ?? [];

    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    const currentBusiness = businesses.find((business) => business._id === id) ?? null;
    const similarBusinesses = businesses.filter(
        (business) => business.category === currentBusiness?.category && business._id !== id
    ).slice(0, 2);

    const business = currentBusiness ?? {
        name: '',
        category: '',
        address: '',
        email: '',
        contactPerson: '',
        about: '',
        imageUrls: []
    };

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleDateChange = (value: Date | Date[] | null) => {
        if (value instanceof Date) {
            setSelectedDate(value);
        }
    };

    return (
        <div className={styles.businessInner}>
            <div className={styles.top}>
                <div className={styles.left}>
                    {business.imageUrls?.length > 0 && (
                        <div className={styles.businessImage}>
                            <img src={business.imageUrls[0]} alt="Business image" />
                        </div>
                    )}
                    <div className={styles.info}>
                        <div className="categories">
                            <div className="chip">{business.category}</div>
                        </div>
                        <h2>{business.name}</h2>
                        <p className={styles.address}>
                            <MdOutlinePlace />
                            {business.address}
                        </p>
                        <p className={styles.email}>
                            <CiMail />
                            {business.email}
                        </p>
                    </div>
                </div>
                <div className={styles.right}>
                    <Button><LuUpload /></Button>
                    <p className={styles.contactPerson}>
                        <IoPerson />
                        {business.contactPerson}
                    </p>
                    <p className={styles.availability}>
                        <FaRegClock />
                        Available
                    </p>
                </div>
            </div>
            <div className={styles.bottom}>
                <div className={styles.left}>
                    <h3>Description</h3>
                    <div className={styles.description}>{business.about}</div>
                    <h3>Gallery</h3>
                    <div className={styles.gallery}>
                        {business.imageUrls?.map((image, index) => (
                            <img src={image} alt="Image" key={index} />
                        ))}
                    </div>
                </div>
                <div className={styles.right}>
                    <Button onClick={openModal}>
                        <LuFileSignature /> Book appointment
                    </Button>

                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        contentLabel="Book appointment"
                        className={styles.modal} // Use your sidebar class
                        overlayClassName={styles.overlay} // Optional darkened background
                    >
                        <div className={styles.modalHeader}>
                            <button className={styles.closeButton} onClick={closeModal}>
                                <IoClose />
                            </button>
                            <h2>Book a Service</h2>
                            <p>Select a date to book a service</p>

                        </div>
                        <Calendar onChange={handleDateChange} value={selectedDate} />
                        <div className={styles.modalActions}>
                            <Button onClick={closeModal}>Cancel</Button>
                            <Button onClick={() => {
                                closeModal();
                                // Handle booking logic here
                            }}>Confirm</Button>
                        </div>
                    </Modal>

                    <h5>Similar businesses</h5>
                    <div className={styles.verticalBusinessList}>
                        {similarBusinesses.map((business) => (
                            <div
                                key={business._id}
                                className={styles.smallCard}
                                onClick={() => navigate(`/businessess/${business._id}`)}
                            >
                                {business.imageUrls?.length > 0 && (
                                    <div className={styles.businessImage}>
                                        <img src={business.imageUrls[0]} alt="Business image" />
                                    </div>
                                )}
                                <div className={styles.info}>
                                    <span className={styles.category}>{business.category}</span>
                                    <span className={styles.contactPerson}>{business.contactPerson}</span>
                                    <span className={styles.address}>{business.address}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BusinessInner;
