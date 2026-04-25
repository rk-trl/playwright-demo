import { useState } from 'react'
import type { FormEvent } from 'react'
import pageStyles from './PageLayout.module.css'
import styles from './Contact.module.css'

type FormValues = {
  name: string
  email: string
  message: string
}

type FormErrors = Partial<FormValues>

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const defaultValues: FormValues = {
  name: '',
  email: '',
  message: '',
}

export function ContactPage() {
  const [formValues, setFormValues] = useState<FormValues>(defaultValues)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const validate = (values: FormValues): FormErrors => {
    const nextErrors: FormErrors = {}

    if (!values.name.trim()) {
      nextErrors.name = 'Name is required.'
    }
    if (!values.email.trim()) {
      nextErrors.email = 'Email is required.'
    } else if (!emailRegex.test(values.email)) {
      nextErrors.email = 'Enter a valid email address.'
    }
    if (!values.message.trim()) {
      nextErrors.message = 'Message is required.'
    }

    return nextErrors
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setShowSuccess(false)

    const nextErrors = validate(formValues)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      return
    }

    setSubmitting(true)
    window.setTimeout(() => {
      setSubmitting(false)
      setShowSuccess(true)
      setFormValues(defaultValues)
    }, 400)
  }

  return (
    <section className={pageStyles.page}>
      <h1 data-testid="page-title" className={pageStyles.title}>
        Contact
      </h1>
      <p className={pageStyles.text}>
        Submit the form below to validate the multi-step Playwright flow.
      </p>

      <form className={styles.form} onSubmit={onSubmit} noValidate>
        <div className={styles.field}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            data-testid="name-input"
            required
            value={formValues.name}
            onChange={(event) =>
              setFormValues((current) => ({ ...current, name: event.target.value }))
            }
          />
          {errors.name ? (
            <p data-testid="form-error" className={styles.error}>
              {errors.name}
            </p>
          ) : null}
        </div>

        <div className={styles.field}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            data-testid="email-input"
            type="email"
            required
            value={formValues.email}
            onChange={(event) =>
              setFormValues((current) => ({ ...current, email: event.target.value }))
            }
          />
          {errors.email ? (
            <p data-testid="form-error" className={styles.error}>
              {errors.email}
            </p>
          ) : null}
        </div>

        <div className={styles.field}>
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            data-testid="message-input"
            required
            value={formValues.message}
            onChange={(event) =>
              setFormValues((current) => ({
                ...current,
                message: event.target.value,
              }))
            }
            rows={4}
          />
          {errors.message ? (
            <p data-testid="form-error" className={styles.error}>
              {errors.message}
            </p>
          ) : null}
        </div>

        <button
          type="submit"
          data-testid="submit-button"
          className={styles.button}
          disabled={submitting}
        >
          {submitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      {showSuccess ? (
        <p data-testid="success-message" className={styles.success}>
          Message sent successfully
        </p>
      ) : null}
    </section>
  )
}
