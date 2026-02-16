import HomeView from '@/views/pages/home';
import styles from './page.module.css';

export default function Home() {
  return (
    <main>
      <div className={styles.center}>
        <HomeView />
      </div>
    </main>
  );
}
