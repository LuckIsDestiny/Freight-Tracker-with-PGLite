import { useNavigate, useParams } from "react-router-dom";
import {
  CarrierForm,
  type CarrierFormValues,
} from "../../components/Form/CarrierForm";
import { getCarrierById, updateCarrier } from "../../services/carrier.service";
import { useEffect, useState } from "react";

export const UpdateCarrierPage = () => {
  const [initialValues, setInitialValues] = useState<
    CarrierFormValues | undefined
  >(undefined);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;
    if (id) {
      getCarrierById(id)
        .then((carrier) => {
          if (!ignore) {
            setError("");
            setInitialValues({
              mcNumber: carrier.mcNumber,
              contactPerson: carrier.contactPerson,
              contactPhone: carrier.contactPhone,
              contactEmail: carrier.contactEmail || "",
              name: carrier.name,
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
    return <p>Carrier ID not found</p>;
  }

  const handleSubmit = async (values: CarrierFormValues) => {
    await updateCarrier(id, {
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

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <CarrierForm
      initialValues={initialValues}
      submitLabel="Update carrier"
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
};
