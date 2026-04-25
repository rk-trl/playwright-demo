import styles from './PageLayout.module.css'

export function AboutPage() {
  return (
    <section className={styles.page}>
      <h1 data-testid="page-title" className={styles.title}>
        About
      </h1>
      <p className={styles.text}>
        This demo focuses on test-friendly UI patterns and stable selectors.
      </p>
      <p className={styles.text}>
        Every route provides a unique heading and deterministic content for E2E
        assertions.
      </p>
    </section>
  )
}
