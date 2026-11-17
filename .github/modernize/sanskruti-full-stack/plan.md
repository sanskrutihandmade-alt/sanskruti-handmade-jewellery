# Implementation Plan: Sanskruti Full-Stack Storefront

**Project**: Sanskruti Handmade Jewellery
**Assessment**: `.github/modernize/assessment/reports/report-20261117085211/js-assessment-report.md`
**Scope**: Build the requested local-first full-stack storefront; do not deploy or provision cloud infrastructure in this phase.

## Technical Framework

- **Current application**: Static HTML, CSS, and JavaScript; no package manifest, server, database, test suite, or build workflow.
- **Target frontend**: Next.js and React.
- **Target backend**: Node.js and Express.
- **Data store**: MongoDB for products, orders, customers, and inventory records. Inventory must not store or track stock quantities.
- **Media and payments**: Cloudinary for product images and Razorpay for checkout, both configured only through server-side environment variables.
- **Current catalogue**: 12 product records, local product and brand imagery, product copy, category filters, WhatsApp enquiries, and “Enquire for price” presentation.

## Overview

The existing static catalogue will become the foundation of a locally runnable full-stack application. The work preserves Sanskruti’s existing catalogue, copy, visual styling, and supplied brand assets wherever practical, while adding server-owned catalogue management, single-owner administration, order/customer records, image upload, and online checkout.

The implementation proceeds from the application foundation through persisted data and authenticated administration, then media and payment integrations, and finally a security and dependency review. Local use must remain honest about integration availability: an unconfigured database, Cloudinary account, or Razorpay account is unavailable—not a successful or simulated persistence, upload, or payment. Razorpay orders may be marked paid only after server-side verification of the provider signature and payment status. No secrets or default production credentials are committed or delivered to the browser.

## Architecture and Scope Constraints

- Run the application locally first, with documented setup and environment configuration.
- Keep public storefront behavior and branding recognizable; retain the catalogue, image assets, product descriptions, category browsing, and WhatsApp enquiry path. Do not invent product prices.
- Keep privileged operations and credentials on the server. Provide single-owner admin access without a shared demo password or client-side authorization.
- MongoDB records cover products, orders, customers, and inventory. Inventory records must not include stock counts, quantities, decrements, or quantity-based availability assumptions.
- Disable or clearly identify unavailable integrations when their configuration is absent. Never claim database writes, image uploads, or payments succeeded unless the corresponding real operation completed.
- Add focused tests for the changed storefront, server/API behavior, authorization, configuration failure states, and payment trust boundary. Do not broaden validation to unrelated legacy behavior.
- Do not add Azure infrastructure, cloud deployment, or containerization tasks; none were requested.

## Migration Impact Summary

| Area | Current state | Target state | Impact |
|---|---|---|---|
| Storefront | Static HTML/CSS/JS | Next.js and React | Preserve catalogue and brand |
| Server | None | Node.js and Express | Add server-owned APIs |
| Data | Browser-hardcoded products | MongoDB records | Add products, orders, customers, inventory |
| Admin | None | Single-owner secure admin | Server-side authentication |
| Images | Local assets | Cloudinary integration | Server-authorized upload |
| Checkout | WhatsApp enquiry only | Razorpay online checkout | Verify payment on server |

## Execution Phases

1. Establish the local Next.js/Express application foundation and migrate the current catalogue experience without changing its business copy or inventing prices.
2. Add MongoDB-backed product, order, customer, and non-quantity inventory records, plus authenticated single-owner administration.
3. Add Cloudinary image management and Razorpay checkout behind server-side integration boundaries, with truthful disabled/unconfigured states.
4. Review dependencies and security controls, then run focused local build and test validation.

Task-level requirements, dependencies, and pass criteria are recorded in `.metadata/tasks.json`.

## Local Operation and Configuration

Document the local start and test commands, required runtime configuration, and how to provide local MongoDB and external service settings. Keep secrets in ignored environment files and provide a safe environment-variable example containing placeholders only. Do not put credentials in `config.js`, browser bundles, committed files, or task artifacts. When an integration is not configured, expose an explicit unavailable/local-only state and avoid recording success.

## Open Questions & Questionnaire

- [x] Environment: local-first implementation; no infrastructure provisioning requested.
- [x] Deployment: no deployment target requested; keep deployment out of scope.
- [x] Security: include dependency/CVE review and the explicitly requested admin and payment safeguards.
- [x] Testing: focused local build and automated tests are in scope; no separate Azure integration-test task was requested.
- [ ] Before production ordering: confirm delivery, cancellation/refund, and customer-data retention policies.
- [ ] Before production admin use: provide a secure owner-account bootstrap approach and production secret configuration.
- [ ] Before enabling external integrations: supply MongoDB, Cloudinary, and Razorpay configuration through secure environment settings. No credentials were provided for this plan.

## Blockers and Assumptions

There is no blocker to writing or beginning the local application foundation. Production database persistence, uploads, owner account setup, and real payments cannot be enabled or verified until the respective configuration and policies are supplied. The assessment also found no package manifest or automated test suite; dependency review and test setup therefore begin after the application foundation exists.

The inventory requirement is interpreted as product-linked inventory records without stock quantities. This plan does not assume quantity-based availability or introduce stock tracking.

## Completion Criteria

- The local application builds, starts, and retains the existing catalogue content, imagery, brand presentation, filters, and WhatsApp enquiry behavior.
- MongoDB-backed product, order, customer, and non-quantity inventory behavior is covered by focused tests.
- Admin routes enforce single-owner authentication server-side; secrets remain outside browser-delivered code.
- Cloudinary uploads and Razorpay payments are reported successful only after the actual operation and server-side verification complete.
- Missing external configuration produces a clear unavailable/local-only state, never a false success.
- Focused build, unit/API tests, payment verification tests, and dependency/security checks pass, with production-only prerequisites documented.
