import pageStyles from './PageLayout.module.css'
import styles from './Dashboard.module.css'

const rows = [
  { id: 'Q1-001', owner: 'Ava', status: 'Completed' },
  { id: 'Q1-002', owner: 'Noah', status: 'In Progress' },
  { id: 'Q1-003', owner: 'Mia', status: 'Pending Review' },
]

export function DashboardPage() {
  return (
    <section className={pageStyles.page}>
      <h1 data-testid="page-title" className={pageStyles.title}>
        Dashboard
      </h1>
      <p className={pageStyles.text}>
        Static dashboard table for deterministic E2E assertions.
      </p>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Task ID</th>
            <th>Owner</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.owner}</td>
              <td>{row.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
