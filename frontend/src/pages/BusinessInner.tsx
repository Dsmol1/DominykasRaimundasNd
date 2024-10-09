import { useParams } from "react-router-dom";

const BusinessInner = () => {
  const { id } = useParams();

  return (
    <div>
        business vidinis {id}
    </div>
  );
};

export default BusinessInner;
