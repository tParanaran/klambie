import HomeView from '@/views/home';
import styles from './page.module.css';
import Container from '@/components/container';

export default function Home() {
  return (
    <main>
      <Container>
        <div className={styles.center}>
          <HomeView />
        </div>
      </Container>
    </main>
  );
}
