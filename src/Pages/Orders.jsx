import UserActions from "../components/UserActions";
import styles from "./Orders.module.scss";
import Wallet from "../components/Wallet";

const Orders = () => (
  <div className={styles.orderWrapper}>
    <h2 className={styles.orderTitle}>My wallet</h2>
    <Wallet />
    <h2 className={styles.orderTitle}>My orders</h2>
    <UserActions />
  </div>
);
export default Orders;
