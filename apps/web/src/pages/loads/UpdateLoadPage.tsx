import { useNavigate, useParams } from "react-router-dom";
import { LoadForm, type LoadFormValues } from "../../components/Form/LoadForm";
import { getLoadById, updateLoad } from "../../services/loads.service";
import { useEffect, useState } from "react";
import { getInputDate } from "../../utils/formatDate";

export const UpdateLoadPage = () => {
  const [initialValues, setInitialValues] = useState<
    LoadFormValues | undefined
  >(undefined);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;
    if (id) {
      getLoadById(id)
        .then((load) => {
          if (!ignore) {
            setError("");
            setInitialValues({
              origin: load.origin,
              destination: load.destination,
              shipperId: load.shipperId,
              carrierId: load.carrierId || "",
              estimatedPickupDate: load.estimatedPickupDate
                ? getInputDate(load.estimatedPickupDate)
                : "",
              estimatedDeliveryDate: load.estimatedDeliveryDate
                ? getInputDate(load.estimatedDeliveryDate)
                : "",
            });
          }
        })
        .catch((err) => {
          if (!ignore) {
            setError(err instanceof Error ? err.message : "");
          }
        })
        .finally(() => {
          if (!ignore) {
            setIsLoading(false);
          }
        });
    }
    return () => {
      ignore = true;
    };
  }, [id]);

  if (!id) {
    return <p>Load ID not found</p>;
  }

  const handleSubmit = async (values: LoadFormValues) => {
    await updateLoad(id, {
      origin: values.origin,
      destination: values.destination,
      carrierId: values.carrierId || undefined,
      estimatedPickupDate: values.estimatedPickupDate || undefined,
      estimatedDeliveryDate: values.estimatedDeliveryDate || undefined,
    });
    navigate("/loads");
  };

  const handleCancel = () => {
    navigate("/loads");
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <LoadForm
      initialValues={initialValues}
      submitLabel="Update load"
      showShipper={false}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
};
