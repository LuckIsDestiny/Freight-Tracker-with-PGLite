import { useNavigate } from "react-router-dom";
import {
  CarrierForm,
  type CarrierFormValues,
} from "../../components/Form/CarrierForm";
import { createCarrier } from "../../services/carrier.service";

export const CreateCarrierPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values: CarrierFormValues) => {
    await createCarrier({
      mcNumber: values.mcNumber,
      contactPerson: values.contactPerson,
      contactPhone: values.contactPhone,
      contactEmail: values.contactEmail || undefined,
      name: values.name,
    });
    navigate("/carrier");
  };

  const handleCancel = () => {
    navigate("/carrier");
  };

  return (
    <CarrierForm
      submitLabel="Create carrier"
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
};
