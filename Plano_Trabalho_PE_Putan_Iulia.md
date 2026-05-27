# PE Work Plan - Puțan Iulia

## Main focus
Small but real front-end coding task connected to validation, accessibility, and security, without blocking the main implementation work.

## Objective
Implement client-side validation feedback for the authentication forms, especially the registration form, so users receive clear messages before submitting invalid data.

## Responsibilities
- Add validation logic to the registration and login forms.
- Show clear, accessible validation messages.
- Make sure required fields cannot be submitted empty.
- Check that the email has a valid format.
- Check that the password has a minimum length.
- Check that password and password confirmation match during registration.
- Keep the validation simple and easy to explain in the presentation.

## Suggested files
- `src/utils/authValidation.js` - validation helper functions.
- `src/components/auth/RegisterForm.jsx` - registration form validation.
- `src/components/auth/LoginForm.jsx` - login form validation.
- `src/styles/auth.css` - error message styling, if needed.

## Tasks
- [ ] Create a function `validateEmail(email)` that returns `true` only for valid email formats.
- [ ] Create a function `validateRegisterForm(formData)` that checks name, email, password, and password confirmation.
- [ ] Create a function `validateLoginForm(formData)` that checks email and password.
- [ ] Display validation messages under the corresponding fields.
- [ ] Add `aria-live="polite"` to the validation message area so screen readers can announce changes.
- [ ] Prevent form submission when validation fails.
- [ ] Test the form with empty fields, invalid email, short password, and different password confirmation.

## Example validation rules
- Name is required.
- Email is required and must have a valid format.
- Password is required.
- Password must have at least 8 characters.
- Password confirmation must match the password.

## Deliverables
- Working front-end validation for login and registration.
- Accessible error messages.
- A short explanation of the validation rules implemented.

## Why this fits the project statement
The project statement asks for good web development practices, input validation, accessibility, and security concerns. This task is small enough to be manageable but still clearly connected to the required work.

## Coordination with the team
- Use the forms created by David Cardoso.
- Follow the visual structure created by Adriano Arruda.
- Keep the validation rules aligned with the back-end rules implemented by Nelson Ponte.
