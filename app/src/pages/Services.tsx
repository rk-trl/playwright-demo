import styles from './PageLayout.module.css'

export function ServicesPage() {
  return (
    <section className={styles.page}>
      <h1 data-testid="page-title" className={styles.title}>
        Services
      </h1>
      <p className={styles.text}>
        We provide UI automation strategy, test architecture, and quality
        enablement.
      </p>
      <p className={styles.text}>
        This page exists as a stable target for navigation and traversal tests.
      </p>
    </section>
  )
}
