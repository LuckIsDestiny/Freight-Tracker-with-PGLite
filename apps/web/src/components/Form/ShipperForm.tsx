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

export type ShipperFormValues = {
  contactPerson: string;
  contactPhone: string;
  contactEmail: string;
  company: string;
};

type ShipperFormProps = {
  initialValues?: ShipperFormValues;
  submitLabel: string;
  onSubmit: (values: ShipperFormValues) => Promise<void>;
  onCancel: () => void;
};

export const ShipperForm = ({
  initialValues,
  submitLabel,
  onSubmit,
  onCancel,
}: ShipperFormProps) => {
  const [formValues, setFormValues] = useState<ShipperFormValues>({
    contactPerson: initialValues?.contactPerson || "",
    contactPhone: initialValues?.contactPhone || "",
    contactEmail: initialValues?.contactEmail || "",
    company: initialValues?.company || "",
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
    { name: "company", label: "Company", type: "text", required: true },
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
      required: false,
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
