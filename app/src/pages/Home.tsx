import styles from './PageLayout.module.css'

export function HomePage() {
  return (
    <section className={styles.page}>
      <h1 data-testid="page-title" className={styles.title}>
        Home
      </h1>
      <p className={styles.text}>
        Welcome to the demo application used for Playwright route and flow
        validation.
      </p>
      <p className={styles.text}>
        Use the navigation links above to move through each route.
      </p>
    </section>
  )
}
