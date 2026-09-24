# Contact form

The form uses @emailjs/browser with the supplied public service, template, and key in src/features/contact/email-config.ts. These identifiers are intentionally public; no private API key belongs in client code.

Name and message are required. Reply email is optional. The existing EmailJS template determines the recipient; the browser does not accept a recipient address.

## EmailJS setup

Confirm that service_y2ijfaj and template_h881z8n are enabled, the template has your fixed recipient, and the sending service is connected. Allow https://ankitkumar.fyi in your EmailJS account settings where applicable. Delivery is subject to your account quota.

The request preserves the old portfolio variables: firstName, lastName, subject, eMail, and message. It also supplies name, from_name, email, and reply_to for compatible templates. firstName contains the full submitted name and lastName is empty. Configure Reply-To using reply_to if desired; it may be empty.

The form disables repeat submission while pending and applies a 30-second client SDK throttle. Client controls are not server-side abuse protection. Failed requests retain the entered message; successful requests clear it.

Browser checks intercepted EmailJS requests to verify payloads and success/failure behavior without sending mail. Actual inbox delivery has not been verified. Send a deliberate message after checking the template to confirm delivery.
