import { useNavigate } from "react-router-dom";
import { LoadForm, type LoadFormValues } from "../../components/Form/LoadForm";
import { createLoad } from "../../services/loads.service";

export const CreateLoadPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values: LoadFormValues) => {
    await createLoad({
      origin: values.origin,
      destination: values.destination,
      shipperId: values.shipperId,
      carrierId: values.carrierId || undefined,
      estimatedPickupDate: values.estimatedPickupDate || undefined,
      estimatedDeliveryDate: values.estimatedDeliveryDate || undefined,
    });
    navigate("/loads");
  };

  const handleCancel = () => {
    navigate("/loads");
  };

  return (
    <LoadForm
      submitLabel="Create load"
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
};
