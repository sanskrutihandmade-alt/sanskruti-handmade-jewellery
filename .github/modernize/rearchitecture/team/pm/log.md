## [t1] Inventory the existing Sanskruti storefront
- Codebase/domain discoveries: The current site is a single static catalogue page with 12 in-script product records and a WhatsApp-only pricing enquiry path; the plan’s full-stack capabilities are new scope, not existing parity.
- Non-obvious behavior: A missing/invalid WhatsApp number falls back to the Contact section; the mobile menu closes after anchor selection; four supplied image files are not referenced in the current page.
- Wrong assumptions/corrections: The modernized checkout/admin features should not be treated as legacy behaviors or as a reason to add prices to the current catalogue.
- Reusable technique: Compare asset-directory filenames against HTML, JS, and CSS references to distinguish product assets, other referenced imagery, and unused supplied assets.
- Learnings consumed: [(none)]
