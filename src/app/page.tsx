import styles from "./page.module.css";

export default async function Home() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/items.json`
  );
  const text = await response.text();

  //  const data=await response.json();
  console.log(text);
  return (
    <div className={styles.page}>
      3dayel Company
      {text}
    </div>
  );
}
