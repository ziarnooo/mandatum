# Cloudflare launch — what is needed

The contact form is implemented. Sending stays disabled until the accounts and domain are configured. No email has been sent by the agent.

1. **Cloudflare account owned by the Foundation.** Deploy Astro's `dist/` through the Worker in `wrangler.jsonc`; connect the approved GitHub repository. Start on a preview address before changing the production domain.
2. **Domain/DNS access.** Needed to attach the website domain and verify the sending domain. Preserve existing mail/MX records.
3. **Cloudflare Email Service.** Configure a sending domain/subdomain in Cloudflare DNS. The native `EMAIL` binding in `wrangler.jsonc` replaces a third-party mail provider; no mail API key is required. Preserve existing production MX records and use a dedicated sending subdomain if needed.
4. **Recipient address.** Confirm where enquiries should arrive (proposed: `info@themandatum.org`). Verify the destination address in Cloudflare Email Service, then set `CONTACT_TO` on the Worker. Sending to this verified address is free on Workers Free; arbitrary recipients require a paid plan. Set `CONTACT_FROM` to an address on the configured sending domain. Restrict the binding with `allowed_destination_addresses` to the approved recipient before production. The browser cannot select or override recipients.
5. **Turnstile widget.** Create a widget for the deployed website hostnames. Put its public site key in build variable `PUBLIC_TURNSTILE_SITE_KEY`; put its secret in Worker secret `TURNSTILE_SECRET_KEY`. Do not reuse Webflow's widget credentials. The server checks hostname and action `contact`.
6. **Secrets/configuration.** Store `TURNSTILE_SECRET_KEY` as a Cloudflare secret, never in Git. `CONTACT_FROM`, `CONTACT_TO` and `PREVIEW` are Worker configuration. `.dev.vars*` and `.env*` are ignored.
7. **Activation after approved preview.** Rebuild with the public Turnstile site key and set `PREVIEW=false` only in the intended live environment. Preview always refuses email sending. Verify CSP/Turnstile, then have the owner send one real enquiry and confirm receipt and Reply-To. Provider acceptance does not prove mailbox delivery.

## Behaviour

Name, email and message; native browser and server validation; bounded body size; same-origin submission; honeypot; mandatory server-side Turnstile; fixed destination; plain-text email; no database or message logging. Error states retain entered content. Submit is disabled while a request is pending. Success is shown only after Cloudflare accepts the message. If a network timeout leaves delivery uncertain, the UI says so; users should check before repeatedly resubmitting.

The static preview uses a clearly labeled local form check, not email delivery. Real form submissions require the Cloudflare Worker: GitHub Pages alone cannot run `/api/contact`. The current form submits to the same origin: deploy the site and Worker together on Cloudflare. Keeping the form on GitHub Pages with a separate Worker would require an explicit endpoint and CORS implementation, which is not configured.

## Performance

Only the contact page adds a small local script. The Turnstile script loads only when a public site key is configured. Local Lighthouse results without real Turnstile are not evidence of live performance; remeasure after integration. The original production pages remain mostly static; the Design V2 review adds local animation scripts.

## References

- https://developers.cloudflare.com/email-service/api/send-emails/workers-api/
- https://developers.cloudflare.com/email-service/platform/pricing/
- https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
