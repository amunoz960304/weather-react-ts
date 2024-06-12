import styles from './Alert.module.css';

type AlertProps = {
  message: string;
};

const Alert = ({ message }: AlertProps) => {
  return <p className={styles.alert}>{message}</p>;
};

export default Alert;
