import type React from "react";
import {
  CancelButton,
  Form,
  FormButton,
  FormButtonContainer,
  FormContainer,
  FormError,
  FormInput,
  FormLabel,
} from "./FormElements";
import { Fragment, useState } from "react";

export type LoadFormValues = {
  origin: string;
  destination: string;
  shipperId: string;
  carrierId: string;
  estimatedPickupDate: string;
  estimatedDeliveryDate: string;
};

type LoadFormProps = {
  initialValues?: LoadFormValues;
  submitLabel: string;
  showShipper?: boolean;
  onSubmit: (values: LoadFormValues) => Promise<void>;
  onCancel: () => void;
};

export const LoadForm = ({
  initialValues,
  submitLabel,
  showShipper = true,
  onSubmit,
  onCancel,
}: LoadFormProps) => {
  const [formValues, setFormValues] = useState<LoadFormValues>({
    origin: initialValues?.origin || "",
    destination: initialValues?.destination || "",
    shipperId: initialValues?.shipperId || "",
    carrierId: initialValues?.carrierId || "",
    estimatedPickupDate: initialValues?.estimatedPickupDate || "",
    estimatedDeliveryDate: initialValues?.estimatedDeliveryDate || "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      await onSubmit(formValues);
    } catch (err) {
      setError(err instanceof Error ? err.message : "");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const fields = [
    { name: "origin", label: "Origin", type: "text", required: true },
    { name: "destination", label: "Destination", type: "text", required: true },
    { name: "shipperId", label: "Shipper ID", type: "text", required: true },
    { name: "carrierId", label: "Carrier ID", type: "text", required: false },
    {
      name: "estimatedPickupDate",
      label: "Estimated pickup",
      type: "date",
      required: false,
    },
    {
      name: "estimatedDeliveryDate",
      label: "Estimated delivery",
      type: "date",
      required: false,
    },
  ] as const;

  return (
    <FormContainer>
      <h1>{submitLabel}</h1>
      <Form onSubmit={handleSubmit}>
        {fields.map((field) => {
          if (field.name === "shipperId" && !showShipper) {
            return;
          }
          return (
            <Fragment key={field.name}>
              <FormLabel htmlFor={field.name}>{field.label}</FormLabel>
              <FormInput
                id={field.name}
                name={field.name}
                type={field.type}
                value={formValues[field.name]}
                onChange={handleChange}
                required={field.required}
              />
            </Fragment>
          );
        })}
        {error && <FormError>{error}</FormError>}
        <FormButtonContainer>
          <FormButton type="submit" disabled={isSubmitting}>
            {submitLabel}
          </FormButton>
          <CancelButton type="button" onClick={onCancel}>
            Cancel
          </CancelButton>
        </FormButtonContainer>
      </Form>
    </FormContainer>
  );
};
