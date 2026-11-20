import { useNavigate, useParams } from "react-router-dom";
import {
  ShipperForm,
  type ShipperFormValues,
} from "../../components/Form/ShipperForm";
import { getShipperById, updateShipper } from "../../services/shipper.service";
import { useEffect, useState } from "react";

export const UpdateShipperPage = () => {
  const [initialValues, setInitialValues] = useState<
    ShipperFormValues | undefined
  >(undefined);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;
    if (id) {
      getShipperById(id)
        .then((shipper) => {
          if (!ignore) {
            setError("");
            setInitialValues({
              contactPerson: shipper.contactPerson,
              contactPhone: shipper.contactPhone || "",
              contactEmail: shipper.contactEmail || "",
              company: shipper.company,
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
    return <p>Shipper ID not found</p>;
  }

  const handleSubmit = async (values: ShipperFormValues) => {
    await updateShipper(id, {
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

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <ShipperForm
      initialValues={initialValues}
      submitLabel="Update shipper"
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
};
