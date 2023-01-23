import { SignUpCard } from "src/components/SignUpCard/SignUpCard";
import styles from "src/pages/SignUp/SignUp.module.scss";

const SignUp: React.FC = () => {
  //return <SignUpCard />;
  return (
    <div className={styles.container}>
      <div className={styles.filter} />
      <h2 className={styles.header}>Ready to hero-up?</h2>
      <SignUpCard />
    </div>
  );
};

export default SignUp;
