import { useState } from "react";
import type React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
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

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      await login({ email, password });
      navigate("/");
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
        <h1>Login</h1>
      </FormHeader>
      <Form onSubmit={handleSubmit}>
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
          Login
        </FormButton>
        {error && <FormError>{error}</FormError>}
      </Form>
      <AlternateButtonContainer>
        <p>New User?</p>
        <AlternateButton
          type="button"
          style={{ width: "40%" }}
          onClick={() => navigate("/register")}
        >
          Register
        </AlternateButton>
      </AlternateButtonContainer>
    </FormContainer>
  );
};
