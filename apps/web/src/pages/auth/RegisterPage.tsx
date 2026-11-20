import { useState } from "react";
import type React from "react";
import { register } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import {
  AlternateButton,
  AlternateButtonContainer,
  Form,
  FormButton,
  FormContainer,
  FormError,
  FormHeader,
  FormInput,
  FormLabel,
} from "../../components/Form/FormElements";

export const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      await register({ name, email, password });
      navigate("/login");
    } catch (err) {
      setPassword("");
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormContainer>
      <FormHeader>
        <h1>Register</h1>
      </FormHeader>
      <Form onSubmit={handleSubmit}>
        <FormLabel htmlFor="name">Name</FormLabel>
        <FormInput
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <FormLabel htmlFor="email">Email</FormLabel>
        <FormInput
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <FormLabel htmlFor="password">Password</FormLabel>
        <FormInput
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <FormButton type="submit" disabled={isSubmitting}>
          Register
        </FormButton>
        {error && <FormError>{error}</FormError>}
      </Form>
      <AlternateButtonContainer>
        <p>Already Registered?</p>
        <AlternateButton
          type="button"
          style={{ width: "40%" }}
          onClick={() => navigate("/login")}
        >
          Login
        </AlternateButton>
      </AlternateButtonContainer>
    </FormContainer>
  );
};
