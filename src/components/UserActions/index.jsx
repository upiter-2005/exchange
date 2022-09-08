import styles from "./UserActions.module.scss";
import OrderItem from "../OrderItem";

export default function UserActions() {
  return (
    <div className={styles.userActions}>
      <div className={styles.userActionsHeader}>
        <span className={styles.userActionsHeaderItems}>Pair</span>
        <span className={styles.userActionsHeaderItems}>Price</span>
        <span className={styles.userActionsHeaderItems}>Amount</span>
        <span className={styles.userActionsHeaderItems}>Type</span>
        <span className={styles.userActionsHeaderItems}>Status</span>
        <span className={styles.userActionsHeaderItems}>Time</span>
      </div>
      <OrderItem />
      <OrderItem />
      <OrderItem />
      <OrderItem />
    </div>
  );
}
