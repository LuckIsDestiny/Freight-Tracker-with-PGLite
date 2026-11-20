import { useNavigate } from "react-router-dom";
import {
  ShipperForm,
  type ShipperFormValues,
} from "../../components/Form/ShipperForm";
import { createShipper } from "../../services/shipper.service";

export const CreateShipperPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values: ShipperFormValues) => {
    await createShipper({
      contactPerson: values.contactPerson,
      contactPhone: values.contactPhone || undefined,
      contactEmail: values.contactEmail || undefined,
      company: values.company,
    });
    navigate("/shipper");
  };

  const handleCancel = () => {
    navigate("/shipper");
  };

  return (
    <ShipperForm
      submitLabel="Create shipper"
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
};
