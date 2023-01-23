import { useEffect, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { Loader } from "../Loader/Loader";
import styles from "src/components/SignUpCard/SignUpCard.module.scss";
import { useNavigate } from "react-router-dom";
import { useAuth } from "src/hooks/useAuth";

interface SignUpCardProps {
  redirect?: string;
}

export const SignUpCard: React.FC<SignUpCardProps> = ({ redirect = "/" }) => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");

  const signup = async () => {
    console.log("signing up...");
    auth?.signup({
      email,
      name,
      password,
      passwordConfirm,
    });
  };

  useEffect(() => {
    if (!auth?.isLoginError && auth?.isLoggedIn) {
      navigate(`/${auth.user?.id}/ark-board`);
    }
  }, [auth]);

  const Error = auth?.isSignUpError ? (
    <Alert variant="danger">Please Check your data, they are not correct!</Alert>
  ) : (
    <></>
  );

  const SignUpForm: React.ReactNode = (
    <>
      <div className={styles.CustomForm}>
        <Form.Label>Email</Form.Label>
        <Form.Control
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="text"
          placeholder="Email"
        />
      </div>
      <div className={styles.CustomForm}>
        <Form.Label>Name</Form.Label>
        <Form.Control
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          placeholder="Name"
        />
      </div>
      <div className={styles.CustomForm}>
        <Form.Label>Password</Form.Label>
        <Form.Control
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="Password"
        />
      </div>
      <div className={styles.CustomForm}>
        <Form.Label>Password Confirm</Form.Label>
        <Form.Control
          onChange={(e) => setPasswordConfirm(e.target.value)}
          value={passwordConfirm}
          type="password"
          placeholder="Password Confirm"
        />
      </div>
      <div className={styles.ButtonContainer}>
        <Button onClick={signup}>Sign Up</Button>
        <a className={styles.LoginLink} onClick={() => navigate("/login")}>
          Do you already have an account? <span>Sing In!</span>
        </a>
      </div>
    </>
  );

  const CardContent: React.ReactNode = auth?.isLoading ? <Loader /> : SignUpForm;

  return (
    <div className={styles.SignUpCardContainer}>
      <Card>
        <Card.Body>
          <div className={styles.HeaderContainer}>
            <Card.Title>Sign Up</Card.Title>
            <hr />
          </div>
          {Error}
          <Card.Text>{CardContent}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};
