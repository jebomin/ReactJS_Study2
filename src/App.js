import Button from "./Button";
import styles from "./App.module.css";

function App() {
  return (
    <div>
      <h className={styles.title}>Welcome back!</h>
      <Button text={"Continue"} />
    </div>
  );
}

export default App;
