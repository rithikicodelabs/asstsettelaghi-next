"use client";
import { Alert } from "design-react-kit";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <Alert color="success">Success</Alert>
    </div>
  );
}
