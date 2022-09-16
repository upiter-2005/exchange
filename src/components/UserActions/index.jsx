import { useSelector } from "react-redux";
import styles from "./UserActions.module.scss";
import OrderItem from "../OrderItem";

export default function UserActions() {
  const items = useSelector((state) => state.user.orders);

  return (
    <div className={styles.userActions}>
      <div className={styles.userActionsHeader}>
        <span className={styles.userActionsHeaderItems}>Pair</span>
        <span className={styles.userActionsHeaderItems}>Price</span>
        <span className={styles.userActionsHeaderItems}>Amount</span>
        <span className={styles.userActionsHeaderItems}>Total</span>
        <span className={styles.userActionsHeaderItems}>Type</span>
        <span className={styles.userActionsHeaderItems}>Status</span>
        <span className={styles.userActionsHeaderItems}>Time</span>
        <span className={styles.userActionsHeaderItems}>Cancel</span>
      </div>

      {items.length > 0 ? (
        items.map((obj) => <OrderItem {...obj} key={obj.time} />)
      ) : (
        <div className={styles.userActionsNoOrder}>You have no open orders</div>
      )}
    </div>
  );
}
