# US005 - Contact Whitespace Validation

## Overview
Validate that whitespace-only values are treated as invalid input in the Contact form.

## Steps
- Open the Contact page
- Enter whitespace-only values in Name, Email, and Message fields
- Submit the form
- Validate field-level errors are shown
- Validate success message is not shown

## Screenshots
- contact-whitespace-filled.png
- contact-whitespace-submit.png

## Assertions
- Form displays three validation errors after submit
- Success message remains hidden for invalid submission
