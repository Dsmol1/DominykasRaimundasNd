import { useParams } from "react-router-dom";
import { useBusinesses } from "../components/business/hooks";
import styles from "./BusinessInner.module.scss"
import { MdOutlinePlace } from "react-icons/md";
import { CiMail } from "react-icons/ci";
import Button from "../components/common/Button";
import { LuUpload, LuFileSignature } from "react-icons/lu";
import { IoPerson } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
  
const BusinessInner = () => {
    const navigate = useNavigate();

    const { id } = useParams();
    const idStr = id ?? '';
    const { data } = useBusinesses();
    const businesses = data ?? [];

    const currentBusiness = businesses.filter((business) => business._id == idStr )[0];
    const similarBusinesses = businesses.filter((business) => business.category == currentBusiness.category && business._id != id ).slice(0,2);

    const business = currentBusiness ?? {
        name: '',
        category: '',
        address: '',
        email: '',
        contactPerson: '',
        about: '',
        imageUrls: []
    };

    return (
        <div className={styles.businessInner}>
            <div className={styles.top}>
                <div className={styles.left}>
                    {business.imageUrls?.length > 0 ?
                        <div className={styles.businessImage}>
                            <img src={business.imageUrls[0]} alt="Business image" />
                        </div> : ""}
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
                    <Button><LuFileSignature />Book appointment</Button>
                    <h5>Similar businesses</h5>
                    <div className={styles.verticalBusinessList}>
                        {similarBusinesses.map((business) => (
                            <div className={styles.smallCard} onClick={() => navigate(`/businessess/${business._id}`)}>
                                {business.imageUrls?.length > 0 ?
                                    <div className={styles.businessImage}>
                                        <img src={business.imageUrls[0]} alt="Business image" />
                                    </div> : ""}
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
