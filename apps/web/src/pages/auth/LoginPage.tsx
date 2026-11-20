import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  AlternateButton,
  AlternateButtonContainer,
  Form,
  FormButton,
  FormContainer,
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
    login({ email, password })
      .then(() => navigate("/"))
      .catch((err) => {
        setPassword("");
        setError(err.message);
        setIsSubmitting(false);
      });
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
        {error && <p>{error}</p>}
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
