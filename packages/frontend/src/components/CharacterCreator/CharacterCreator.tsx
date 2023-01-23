import { Button, Container, Form } from "react-bootstrap";
import styles from "src/components/CharacterCreator/CharacterCreator.module.scss";

export const CharacterCreator: React.FC = () => {
  return (
    <Container className={styles.container}>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>
            <h2>Enter your name!</h2>
          </Form.Label>
          <Form.Control type="text" placeholder="Enter your name here" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>
            <h2>When did you become a hero*?</h2>
          </Form.Label>
          <Form.Control type="text" placeholder="this should be a dropdown lol" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>
            <h2>Why did you become a hero*?</h2>
          </Form.Label>
          <Form.Control type="text" placeholder="This is plain text!" />
        </Form.Group>
        <Button className="mt-3" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};
