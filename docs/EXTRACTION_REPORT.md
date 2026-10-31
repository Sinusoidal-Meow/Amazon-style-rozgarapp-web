# VanRozgar Data Extraction Report

## 1. Source Audit Summary
- **Source Repository:** `https://github.com/VANMITRA/VanRojgar_final_module.git`
- **Inspected Local Path:** `d:\Project files\VanMitra\vanrozgar_final_module_for_app`
- **Source Branch & Commit:** `main` (commit `81fdf33` - Clean, up to date with origin/main)
- **Destination Repository:** `https://github.com/Sinusoidal-Meow/Amazon-style-rozgarapp-web.git`
- **Destination Local Working Tree:** `d:\Project files\VanMitra\Amazon-style-rozgarapp-web`

## 2. Extraction Scope & Metrics

| Entity Category | Source Files | Extracted Records | Output File | Status |
|---|---|---|---|---|
| **Products & Listings** | `website/src/data/mockData.ts` & `server/scripts/seed_sample_shop.js` | **34 records** (12 showcase + 22 village seed) | `data/products.json` | 100% Extracted |
| **Categories** | `server/src/seed/data/categories.json` & `website/src/types/index.ts` | **8 categories** (6 taxonomy + 2 web categories) | `data/categories.json` | 100% Extracted |
| **Villages (Raah Report)** | `server/src/seed/data/raah/raah_villages.json` | **14 villages** in 3 talukas (2,019 ha CFR) | `data/villages.json` | 100% Extracted |
| **Gram Sabhas** | `server/src/models/GramSabha.js` & Raah dataset | **14 Gram Sabhas** with restoration data | `data/gram-sabhas.json` | 100% Extracted |
| **Livelihood Ideas** | `livelihood_server/app/livelihood/seed/ideas.json` | **16 ideas** (13 viable + 3 conservation gates) | `data/ideas.json` | 100% Extracted |
| **Welfare Schemes** | `livelihood_server/app/livelihood/seed/schemes.json` | **12 schemes** (10 government + 2 NGO) | `data/schemes.json` | 100% Extracted |
| **Restricted Items** | `server/src/seed/data/restricted.json` | **3 restricted species** | `data/restricted-items.json` | 100% Extracted |
| **Demo Accounts** | `server/src/seed/data/demo_accounts.json` | **18 accounts** (14 GS, 2 villager, 1 buyer, 1 team) | `data/demo-accounts.json` | 100% Extracted |
| **Trade Requests** | `website/src/data/mockData.ts` | **2 buyer requests** (cash + barter counter-offer) | `data/trade-requests.json` | 100% Extracted |
| **Orders & Tracking** | `website/src/data/mockData.ts` | **2 orders** (in-transit & delivered) | `data/orders.json` | 100% Extracted |
| **Delivery Logistics** | `website/src/data/mockData.ts` | **1 driver + 3 delivery jobs** | `data/delivery-logistics.json` | 100% Extracted |
| **Geographic Points** | `livelihood_server/.../sample_resources.geojson` | **12 GeoJSON features** | `data/geographic-resources.geojson` | 100% Extracted |
| **Weather Norms** | `livelihood_server/.../sample_weather.json` | **12 months** temperature and rainfall | `data/weather-norms.json` | 100% Extracted |
| **Sample Plot Report** | `app/assets/livelihood/sample_report.json` | **1 complete report** | `data/sample-livelihood-report.json` | 100% Extracted |

## 3. Asset Extraction Metrics
- **Product Illustrations Copied:** 12 PNG files (`assets/products/`)
- **Brand Identity Asset:** 1 high-resolution logo (`assets/brand/`)
- **UI Reference Screenshots:** 18 mockups (`assets/ui-references/`)
- **Design Guidelines & Reference Dashboards:** 2 reference files (`assets/design-guides/`)
- **Missing or Broken Assets:** 0. Every referenced product illustration resolves to an existing PNG file.

## 4. Integrity & Validation Results
1. **Record Completeness:**
   - Source showcase listings: 12 | Extracted showcase listings: 12 (100% match)
   - Source sample listings: 22 | Extracted sample listings: 22 (100% match)
   - Total products: 34 records
   - All categories and subcategories preserved with Marathi, English, Hindi labels.
2. **Identifier Uniqueness:**
   - 0 duplicate product IDs.
   - 0 duplicate item codes.
   - 0 duplicate category slugs.
3. **Asset Resolution:**
   - Every product record in `data/products.json` points to a valid `illustration` path in `assets/products/`.
4. **Security & Secrets Scan:**
   - Scanned all JSON, TS, and Markdown files.
   - Zero private API keys, zero JWT secrets, zero passwords, zero MongoDB connection strings.
   - Only public demo phone numbers (`+9198220...`) from public demo files retained.

## 5. Source Safety Confirmation
- The original source repository at `d:\Project files\VanMitra\vanrozgar_final_module_for_app` was **never modified**.
- No files were created, edited, or deleted in the source directory.
- The destination repository was initialized in an independent directory `d:\Project files\VanMitra\Amazon-style-rozgarapp-web`.
