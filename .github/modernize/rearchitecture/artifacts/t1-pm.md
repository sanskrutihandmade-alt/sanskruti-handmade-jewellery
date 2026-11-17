# t1 — Existing storefront feature and catalogue inventory

## Purpose and evidence

This is the source-based baseline for preserving the current Sanskruti catalogue and enquiry experience during the planned rewrite. It describes observable behavior, not an implementation design.

- **Discovery method:** Read `index.html`, `script.js`, `styles.css`, `config.js`, and `README.md`; listed all files in `assets/` and compared local asset references with the storefront source.
- **Total items discovered:** 1 single-page storefront, 12 catalogue products, and 18 supplied image assets.
- **Items in scope:** All observed storefront sections, interactions, product records, copy, and supplied assets relevant to the storefront.
- **Runtime verification:** Not performed; findings below are based on source inspection. The current root has no package manifest or test suite.

## Upstream Artifacts Consumed

- `.github/modernize/sanskruti-full-stack/plan.md` — used for the requested preservation boundary and the target scope of the rewrite.
- `.github/modernize/sanskruti-full-stack/.metadata/tasks.json` — used to align the inventory with the catalogue, copy, image, category-filter, and WhatsApp preservation acceptance criteria in task `001-transform-full-stack-foundation`.

## Evidence Mapping

- `plan.md#Technical Framework` and `plan.md#Architecture and Scope Constraints` → catalogue, imagery, styling, copy, pricing-display, and WhatsApp baseline below.
- `tasks.json#001-transform-full-stack-foundation.requirements` → the 12-record catalogue table, asset inventory, interaction inventory, and testable preservation requirements below.

## Existing product experience

The site is one responsive, anchor-navigated storefront page. It presents a brand header, hero, three collection cards, a featured-product grid, brand story, Instagram gallery, contact band, and footer. The featured grid initially shows all products. There is no product price display: each product CTA says **“Enquire for price”** and directs the customer to ask about the selected product.

### Product catalogue

The following 12 records are rendered from the current hardcoded catalogue. Names, categories, product image paths, tags, and descriptions are recorded as the current content baseline; product prices are not present.

| # | Product | Category | Image | Tag | Description |
|---:|---|---|---|---|---|
| 1 | Ruby Detail Long Haar | Necklaces | `assets/ruby-long-necklace-set.jpeg` | Traditional edit | Multi-layer gold-tone haar with ruby accents. |
| 2 | Pearl Blossom Earrings | Earrings | `assets/pearl-flower-earrings.jpeg` | Floral details | Pearl flower earrings with colourful stone centres. |
| 3 | Temple Pendant Necklace | Sets | `assets/temple-pendant-necklace.jpeg` | Heritage edit | Traditional gold-tone necklace with pendant details. |
| 4 | Antique Gold Choker | Necklaces | `assets/antique-gold-choker.jpeg` | Statement piece | Bold antique-finish choker design. |
| 5 | Floral Gold Necklace | Necklaces | `assets/floral-gold-necklace.jpeg` | Classic favourite | Gold-tone floral necklace with a traditional finish. |
| 6 | Ruby Floral Haar | Sets | `assets/floral-ruby-necklace.jpeg` | Festive favourite | Traditional necklace with ruby-colour accents. |
| 7 | Antique Bead Necklace | Sets | `assets/antique-bead-necklace.jpeg` | Traditional edit | Antique gold-tone beaded necklace and matching earrings. |
| 8 | Long Bead Necklace | Necklaces | `assets/long-bead-necklace.jpeg` | Everyday tradition | Long multi-strand gold-tone bead necklace. |
| 9 | Red Bead Long Mala | Necklaces | `assets/red-bead-necklace.jpeg` | Classic favourite | Long gold-tone beads with red accents. |
| 10 | Gold Bead Mala | Necklaces | `assets/gold-bead-necklace.jpeg` | Handpicked | Traditional multi-line gold-tone bead necklace. |
| 11 | Antique Necklace & Earrings | Sets | `assets/antique-necklace-earrings.jpeg` | Complete look | Coordinated traditional necklace and earrings. |
| 12 | Gold Spike Choker | Necklaces | `assets/gold-spike-choker.jpeg` | Statement piece | Gold-tone traditional choker with textured detailing. |

Category totals: **7 Necklaces, 1 Earrings, 4 Sets**.

### Storefront sections, copy, and visual identity

- **Announcement and header:** “A touch of tradition, handcrafted with love ✦ Discover Sanskruti”; brand label “Sanskruti / HANDMADE JEWELLERY”; links to Home, Collections, Best Sellers, Our Story, Contact; “Explore pieces” CTA.
- **Hero:** “ROOTED IN TRADITION · MADE WITH LOVE”; “Jewellery that carries a story.” Supporting copy: “Celebrate your roots with traditional-inspired handmade jewellery, thoughtfully chosen for your special moments and everyday elegance.” Actions: “Explore collection” and Instagram follow. The hero includes “THE HERITAGE EDIT”, “Tradition, beautifully worn.” and “HANDPICKED WITH LOVE”; the Hindi tagline is “परंपरा · सौंदर्य · संस्कार”.
- **Trust strip:** “Traditional-inspired designs”, “Thoughtful details”, and “Easy WhatsApp enquiries”.
- **Collections:** “FIND YOUR FAVOURITE”, “Shop by collection”, and “Pieces for celebrations, traditions and the little moments in between.” Three cards link to Necklaces (“01 / THE CLASSICS”), Earrings (“02 / LITTLE TREASURES”), and Jewellery Sets (“03 / MADE TO MATCH”).
- **Featured catalogue:** “A FEW CUSTOMER FAVOURITES”, “Featured pieces”, and “Browse the collection and message us for availability and pricing.” Filters are “All pieces”, “Necklaces”, “Earrings”, and “Jewellery sets”.
- **Story:** “A LITTLE ABOUT SANSKRUTI”; “Close to our roots. Made for your moments.” Copy: “Sanskruti celebrates the charm of traditional Indian adornment. From statement necklaces to delicate details, each design is selected to bring a little heritage and a lot of beauty to your look.” Follow-up: “Whether you are dressing for a celebration or adding a traditional touch to your day, find a piece that feels like you.”
- **Instagram panel:** “FOLLOW OUR JOURNEY”, “Little moments, on Instagram.”, and `@sanskruti__nath`; four image tiles link to the same Instagram profile.
- **Contact band:** “LET'S FIND YOUR PIECE”, “Something caught your eye?”, and “Ask us about product details, availability and pricing. We would love to help.” Displays the business email and a “Chat with us on WhatsApp” action.
- **Footer:** Brand name and Hindi tagline; Explore links (Collections, Featured pieces, Our story); Connect links (Instagram, WhatsApp, Product enquiries); customer-care text: “For pricing, availability, delivery and order support, please contact us directly.” Displays the business email and dynamic current year.
- **Style:** Warm cream/paper backgrounds, wine red and gold accents, Cormorant Garamond headings with DM Sans body text, traditional jewellery photography, logo/emblem, gold borders and small ornamental details. The stylesheet has responsive tablet/mobile layouts and a landscape hero-photo treatment.

## Observable behaviors and user journeys

### User Story 1 — Browse and filter the catalogue (Priority: P1)

As a customer, I want to browse jewellery by collection so I can quickly find pieces of interest.

**Why this priority:** Finding and viewing the catalogue is the primary purpose of the current website.

**Independent Test:** Open the storefront, confirm all 12 product cards are initially visible, then use each category card and filter button to view only the matching products.

**Acceptance Scenarios:**

1. **Given** the page has loaded, **When** the customer opens Featured pieces, **Then** all 12 products appear with their name, image, tag, description, and “Enquire for price” action.
2. **Given** all products are visible, **When** the customer selects Necklaces, Earrings, or Jewellery sets, **Then** only products in the selected category remain and the matching filter is active.
3. **Given** the customer selects a collection card, **When** the card is activated, **Then** the page navigates to Featured pieces and displays that collection.
4. **Given** a product image is displayed, **Then** it has alternative text and product images are eligible for lazy loading.

### User Story 2 — Ask about an individual product (Priority: P1)

As a customer, I want to enquire about the price and availability of a product through WhatsApp because the catalogue does not publish prices.

**Why this priority:** WhatsApp is the current product-enquiry and pricing path.

**Independent Test:** Activate a product’s enquiry link and inspect its destination and prefilled message; repeat with the WhatsApp number unset or invalid.

**Acceptance Scenarios:**

1. **Given** the configured WhatsApp number is valid, **When** the customer selects a product’s enquiry action, **Then** a WhatsApp click-to-chat link opens with a URL-encoded message naming that product and asking for price and availability.
2. **Given** the configured number is missing or invalid, **When** the customer selects a product enquiry action, **Then** the link falls back to the Contact section rather than generating a WhatsApp phone link.
3. **Given** no product price is configured, **Then** the catalogue continues to display “Enquire for price” and does not invent or imply a numeric price.

### User Story 3 — Contact the business or visit social profile (Priority: P2)

As a customer, I want to contact Sanskruti through its published business channels so I can ask general questions or find more product content.

**Why this priority:** Contact and social links support the catalogue’s enquiry-led experience.

**Independent Test:** Activate each contact action and verify the configured destination; with a valid WhatsApp number, verify the general collection-enquiry message.

**Acceptance Scenarios:**

1. **Given** the WhatsApp number is valid, **When** the customer selects the contact-band, footer, or floating WhatsApp action, **Then** WhatsApp opens with a general collection-enquiry message.
2. **Given** the WhatsApp number is missing or invalid, **When** the customer selects a general WhatsApp action, **Then** it falls back to the Contact section without opening a new tab.
3. **Given** the customer selects the business email, **Then** the browser opens an email composition link addressed to the displayed business email.
4. **Given** the customer selects an Instagram link or gallery tile, **Then** the Sanskruti Instagram profile opens in a new tab.

### User Story 4 — Navigate on mobile (Priority: P2)

As a mobile visitor, I want to open and close the site navigation so I can move between storefront sections on a small screen.

**Why this priority:** The storefront explicitly provides a mobile menu and responsive layouts.

**Independent Test:** At a viewport no wider than 620 pixels, toggle the menu, follow a section link, and verify that the menu closes and its expanded state is reset.

**Acceptance Scenarios:**

1. **Given** the mobile navigation is closed, **When** the visitor presses the menu button, **Then** navigation links appear and the button reports an expanded state.
2. **Given** the mobile navigation is open, **When** the visitor selects a navigation link, **Then** the menu closes, its expanded state becomes false, and the selected anchor section is reached.

### Edge cases and current limitations

- When the WhatsApp number is a placeholder or fails the 10–15 digit check, general contact links use the Contact section; product enquiry links also use the Contact section as their `href` fallback.
- The site has no visible price, cart, online checkout, order tracking, customer account, inventory/stock display, product search, admin screen, or persisted product-management flow. These are not existing features; any such addition belongs to the approved target scope and must not be presented as legacy parity.
- The current source renders the catalogue from in-browser hardcoded data; persistence and product availability are not established by this page.
- If an external social site or mail application is unavailable, the site leaves the customer to the browser’s external-link behavior; it contains no custom recovery view for those destinations.

## Supplied image assets

There are 18 image files under `assets/`. Fourteen filenames are referenced by the current storefront source; the remaining four are supplied but not referenced by the current markup, script, or stylesheet.

**Referenced:** `antique-bead-necklace.jpeg`, `antique-gold-choker.jpeg`, `antique-necklace-earrings.jpeg`, `floral-gold-necklace.jpeg`, `floral-ruby-necklace.jpeg`, `gold-bead-necklace.jpeg`, `gold-spike-choker.jpeg`, `hero-cover.png`, `logo.jpeg`, `long-bead-necklace.jpeg`, `pearl-flower-earrings.jpeg`, `red-bead-necklace.jpeg`, `ruby-long-necklace-set.jpeg`, `temple-pendant-necklace.jpeg`.

**Supplied but not currently referenced:** `instagram-qr.jpeg`, `Logo Sanskruti.jpeg`, `long-gold-necklace.jpeg`, `Traditional Indian Jewellery Showcase.png`.

## Functional requirements for parity

- **REQ-001:** The storefront MUST retain all 12 listed products and their current names, categories, descriptions, tags, and corresponding product images.
- **REQ-002:** The storefront MUST initially show all products and allow selection of All pieces, Necklaces, Earrings, and Jewellery sets; collection cards MUST select their corresponding category.
- **REQ-003:** Each listed product MUST retain the “Enquire for price” action and send a product-specific WhatsApp message requesting price and availability when a valid business number is configured.
- **REQ-004:** Missing or invalid WhatsApp configuration MUST NOT produce a false WhatsApp destination; the current contact-section fallback behavior MUST remain available.
- **REQ-005:** The storefront MUST retain its visible page sections, brand story and marketing copy, logo and referenced supplied imagery, business email, and Instagram profile links.
- **REQ-006:** The storefront MUST retain a mobile navigation toggle that opens/closes the section menu and updates its expanded state.
- **REQ-007:** Product presentation MUST NOT invent prices or imply that enquiry-only catalogue content constitutes a completed purchase.

## Success criteria

- **SC-001:** A comparison against this inventory finds all 12 products, each with matching name, category, image association, tag, and description.
- **SC-002:** A customer can view all products and reduce the view to the 7 necklaces, 1 earrings product, or 4 sets using either the corresponding filter or collection card.
- **SC-003:** For each product, the enquiry action contains the correct product name and asks for price and availability; invalid/missing WhatsApp configuration falls back to Contact.
- **SC-004:** The current hero, collections, featured catalogue, story, Instagram, contact, and footer sections and their identifying copy remain present.
- **SC-005:** The mobile menu can be opened and closed, with its accessibility expanded state reflecting the visible menu state.

## Test Results

- **Command:** Source review and asset/reference comparison; no automated test command available in the current static project.
- **Passed:** 0 automated tests (not available); source inventory confirmed 12 product records and 18 supplied image files.
- **Failed:** 0.
- **Skipped:** Runtime interaction tests; no project test harness is present.
