import { useEffect, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { Loader } from "../Loader/Loader";
import styles from "src/components/LoginCard/LoginCard.module.scss";
import { useAuth } from "src/hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const LoginCard: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  /*eslint-disable */
  const login = async (data: any) => {
    /*eslint-enable */
    await auth?.login(data);
  };

  useEffect(() => {
    if (!auth?.isLoginError && auth?.isLoggedIn) {
      navigate(`/${auth.user?.id}/ark-board`);
    }
  }, [auth]);

  const Error = auth?.isLoginError ? (
    <Alert variant="danger">Your credentials are not correct!</Alert>
  ) : (
    <></>
  );

  const LoginForm: React.ReactNode = (
    <>
      <div className={styles.CustomForm}>
        <Form.Label>Email</Form.Label>
        <Form.Control
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder="Email"
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
      <div className={styles.ButtonContainer}>
        <Button onClick={() => login({ email, password })}>Login</Button>
        <a className={styles.SignUpLink} onClick={() => navigate("/signup")}>
          Not a member yet? <span>Sign Up!</span>
        </a>
      </div>
    </>
  );

  const CardContent: React.ReactNode =
    auth?.isLoading || auth?.isLoggedIn ? <Loader /> : LoginForm;

  return (
    <div className={styles.LoginCardContainer}>
      <Card>
        <Card.Body>
          <div className={styles.HeaderContainer}>
            <Card.Title>Login</Card.Title>
            <hr />
          </div>
          {Error}
          <Card.Text>{CardContent}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};
