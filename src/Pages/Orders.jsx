import UserActions from "../components/UserActions";
import styles from "./Orders.module.scss";

const Orders = () => (
  <div className={styles.orderWrapper}>
    <h1 className={styles.orderTitle}>Account page</h1>
    <UserActions />
  </div>
);
export default Orders;
