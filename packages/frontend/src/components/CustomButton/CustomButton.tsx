import { Button } from "react-bootstrap";
import styles from "src/components/CustomButton/CustomButton.module.scss";

export interface CustomButtonProps {
  icon?: string;
  label?: string;
  action: () => void;
  children?: React.ReactNode;
  className?: string;
}
export const CustomButton: React.FC<CustomButtonProps> = ({
  icon,
  label,
  action,
  children,
  className,
}) => {
  const displayedIcon = icon && <img className={styles.image} src={icon} alt="icon" />;
  const customClass = className
    ? className
    : icon && !label
    ? styles.iconButton
    : styles.textButton;
  return (
    <Button className={customClass} onClick={action}>
      <h2>{label}</h2>
      {displayedIcon}
      {children}
    </Button>
  );
};
