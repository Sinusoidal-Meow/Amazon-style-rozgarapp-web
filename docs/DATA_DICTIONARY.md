# VanRozgar Dataset Data Dictionary

This document defines the entities, attributes, data types, validation constraints, and provenance for all data files in the VanRozgar repository.

---

## 1. Product Listings (`data/products.json`)

| Field | Type | Required | Description | Example |
|---|---|---|---|---|
| `id` | string | Yes | Unique identifier for product record | `"prod-showcase-01"` |
| `originalId` | string | Yes | Identifier from original source code | `"list-1"` |
| `itemCode` | string | Yes | 6-8 character shareable code used in app search (`VR-...`) | `"VR-SC01X"` |
| `title` | object | Yes | Multilingual product title (`en`, `mr`, `combined`) | `{ "en": "Wild Forest Raw Honey", "mr": "रान मध" }` |
| `categorySlug` | string | Yes | Taxonomy category slug | `"forest-produce"` |
| `webCategory` | string | Yes | Website category grouping | `"forest_produce"` |
| `productCode` | string | Yes | Identifier cross-linking with Livelihood module | `"honey"` |
| `description` | string | Yes | Product description and harvesting details | `"100% raw multi-flora forest honey..."` |
| `price` | number | Yes | Unit price in Indian Rupees (₹) | `550` |
| `pricePerUnitPaise` | integer | Yes | Unit price in paise (integer arithmetic) | `55000` |
| `mrp` | number | No | Maximum Retail Price in Rupees | `620` |
| `mrpPerUnitPaise` | integer | No | MRP in paise | `62000` |
| `fairPriceRange` | array[2] | Yes | [min, max] fair price estimate band | `[480, 620]` |
| `quantityAvailable` | number | Yes | Current stock available | `45` |
| `minOrderQuantity` | number | Yes | Minimum purchase threshold | `1` |
| `unit` | string | Yes | Measurement unit (`kg`, `piece`, `litre`, `quintal`) | `"kg"` |
| `mode` | enum | Yes | Trade mode: `sell`, `barter`, or `both` | `"both"` |
| `barterWants` | string | No | Preferred exchange produce if barter enabled | `"Bamboo baskets or Ashwagandha"` |
| `seller` | object | Yes | Seller profile: name, village, taluka, district | `{ "name": "Gram Sabha Jawhar", "district": "Palghar" }` |
| `provenance` | object | Yes | Forest canopy compartment, collection method | `{ "sourceArea": "Compartment 42", "isSustainable": true }` |
| `verification` | object | Yes | FRA / CFR verification status | `{ "isVerified": true, "status": "verified_seed" }` |
| `isGroupListing` | boolean | Yes | Whether multiple Gram Sabhas pool harvest | `false` |
| `groupContributors` | array | No | Breakdown of contributor villages if group listing | `[{ "village": "Jawhar", "sharePct": 40 }]` |
| `metrics` | object | Yes | User rating (0.0 - 5.0) and review count | `{ "rating": 4.9, "reviewCount": 28 }` |
| `assets` | object | Yes | Relative path to illustration, icon type, photo flag | `{ "illustration": "assets/products/honey.png" }` |
| `status` | enum | Yes | Listing state (`active`, `paused`, `sold_out`) | `"active"` |
| `isSample` | boolean | Yes | Transparency flag: `true` if illustrative demo | `true` |
| `source` | string | Yes | Originating module in source project | `"website_showcase"` |

---

## 2. Categories (`data/categories.json`)

| Field | Type | Description |
|---|---|---|
| `slug` | string | Unique category identifier (`handicrafts-bamboo`, `fruit`, `medicinal-plants`, etc.) |
| `order` | integer | UI display sort order (1 to 8) |
| `active` | boolean | Whether category is shown in shop navigation |
| `name` | object | Localized titles in English (`en`), Marathi (`mr`), and Hindi (`hi`) |
| `description` | object | Localized category descriptions |
| `webCategory` | string | Mapping to website tab/filter category |
| `defaultIcon` | string | Relative path to default asset icon |

---

## 3. Gram Sabhas & 14 Nashik Villages (`data/gram-sabhas.json` & `data/villages.json`)

Based on the verified Raah Foundation quarterly update on ecological restoration in the CFR areas of Nashik district (1 October 2026):

| Field | Type | Description |
|---|---|---|
| `id` | string | Unique Gram Sabha ID (`gs-dongargaon`, `gs-kachane`, etc.) |
| `taluka` | string | Administrative Block: **Deola**, **Dindori**, or **Trimbakeshwar** |
| `cfrAreaHa` | number | Community Forest Rights area in hectares (total across 14 villages: 2,019 ha) |
| `saplingsPlanted` | number | Indigenous saplings planted (total: 217,708 saplings) |
| `forestPonds` | number | Water conservation ponds built (total: 11 ponds) |
| `waterStorageCapacityLitres` | number | Water capacity in litres (total: 44,780,000 litres) |
| `looseBoulderStructures` | number | Erosion & watershed retention structures (total: 794 structures) |
| `labourDaysGenerated` | number | Employment days for local tribal communities (total: 12,710 days) |
| `cfrmcMeetings` | number | Community Forest Rights Management Committee meetings (total: 19) |
| `wildlifeSessions` | number | Wildlife conservation awareness sessions held (total: 4) |
| `speciesList` | array | Planted tree species with counts (Anjan, Chinch, Bel, Bor, Sagwan, etc.) |

---

## 4. Livelihood Interventions (`data/ideas.json`)

Draft idea library linking forest plot characteristics with sustainable livelihood options:
- **Livestock:** Small dairy, goat rearing, backyard poultry
- **Water / Well:** Drip vegetables, plant nursery
- **Farm land:** Millets and pulses, fruit trees on field bunds
- **Forest produce:** Beekeeping box on own land, Minor Forest Produce collection group (honey, bamboo, lac)
- **Community:** Fodder bank, fish culture in village pond, forest patrol and fire lines
- **Conservation Gates:** Prohibits commercial timber cutting, land alienation, and wildlife hunting

---

## 5. Welfare & Tribal Schemes (`data/schemes.json`)

Official government and tribal welfare programs with direct URLs:
- **PM-KISAN:** Income support for farmer families
- **MGNREGA:** Rural water and land development employment
- **PMMSY:** Fisheries development
- **PMFME:** Micro food processing enterprises
- **PM Vishwakarma:** Artisans and traditional tool support
- **MIDH:** Horticulture mission
- **NBHM:** National Beekeeping and Honey Mission
- **TRIFED:** Van Dhan Kendras and Minor Forest Produce support
- **MOTA / Maharashtra Tribal Dept:** Forest dwelling community support schemes
