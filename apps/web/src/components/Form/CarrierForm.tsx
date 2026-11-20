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

export type CarrierFormValues = {
  mcNumber: string;
  contactPerson: string;
  contactPhone: string;
  contactEmail: string;
  name: string;
};

type CarrierFormProps = {
  initialValues?: CarrierFormValues;
  submitLabel: string;
  onSubmit: (values: CarrierFormValues) => Promise<void>;
  onCancel: () => void;
};

export const CarrierForm = ({
  initialValues,
  submitLabel,
  onSubmit,
  onCancel,
}: CarrierFormProps) => {
  const [formValues, setFormValues] = useState<CarrierFormValues>({
    mcNumber: initialValues?.mcNumber || "",
    contactPerson: initialValues?.contactPerson || "",
    contactPhone: initialValues?.contactPhone || "",
    contactEmail: initialValues?.contactEmail || "",
    name: initialValues?.name || "",
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
    { name: "name", label: "Name", type: "text", required: true },
    { name: "mcNumber", label: "MCNumber", type: "text", required: true },
    {
      name: "contactPerson",
      label: "ContactPerson",
      type: "text",
      required: true,
    },
    {
      name: "contactEmail",
      label: "ContactEmail",
      type: "email",
      required: false,
    },
    {
      name: "contactPhone",
      label: "ContactPhone",
      type: "text",
      required: true,
    },
  ] as const;

  return (
    <FormContainer>
      <h1>{submitLabel}</h1>
      <Form onSubmit={handleSubmit}>
        {fields.map((field) => (
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
        ))}
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
