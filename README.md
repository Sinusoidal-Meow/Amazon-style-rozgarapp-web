# VanRozgar Marketplace & Ecological Dataset

> **Clean Data Layer & Asset Repository for Google AI Studio Web Development**  
> Source Origin: [VANMITRA/VanRojgar_final_module](https://github.com/VANMITRA/VanRojgar_final_module.git)  
> Destination: [Sinusoidal-Meow/Amazon-style-rozgarapp-web](https://github.com/Sinusoidal-Meow/Amazon-style-rozgarapp-web.git)

---

## 1. What is VanRozgar?
**VanRozgar (वनरोजगार)** is a community forest resource marketplace and livelihood platform for forest-dwelling communities (specifically Community Forest Resource / CFR title holders) in Nashik district, Maharashtra. It connects:
1. **Community Forest Producers:** Gram Sabhas and tribal families who harvest sustainable minor forest produce (raw forest honey, bamboo, mahua flowers, wild amla, medicinal herbs, seeds, and river-reed handicrafts).
2. **Ethical Buyers & Processing Collectives:** Bulk buyers, Ayurvedic dispensaries, and retail consumers looking for verified, direct-from-forest sustainable produce.
3. **Local Transport & Barter Collectives:** Local pickup drivers and intra-village barter exchange networks.

This repository extracts the complete data models, structured datasets, product catalogs, ecological restoration metrics, and graphic assets needed to develop a new **Amazon-style e-commerce web application** using **Google AI Studio** and **Gemini**.

---

## 2. Repository Layout

```text
Amazon-style-rozgarapp-web/
├── README.md                           # Master repository documentation
├── .gitignore                          # Standard gitignore (node_modules, build, secrets)
│
├── data/                               # Clean, validated JSON & GeoJSON datasets
│   ├── products.json                   # All 34 products (12 showcase + 22 Nashik seed listings)
│   ├── showcase-products.json          # 12 rich showcase listings with reviews & barter terms
│   ├── village-sample-products.json    # 22 Nashik village CFR listings across 14 Gram Sabhas
│   ├── categories.json                 # 8 resource categories with multilingual translations
│   ├── gram-sabhas.json                # 14 Nashik Gram Sabhas with CFR rights & restoration figures
│   ├── villages.json                   # Detailed 14-village Raah Foundation ecological report
│   ├── ideas.json                      # 16 livelihood interventions & conservation gates
│   ├── schemes.json                    # 12 government, tribal welfare & livelihood schemes
│   ├── restricted-items.json           # 3 statutory restricted/banned forest items
│   ├── demo-accounts.json              # 18 demo role accounts (secretaries, villagers, buyers)
│   ├── trade-requests.json             # Sample buyer requests with barter counter-offers
│   ├── orders.json                     # Sample order fulfillment states & tracking
│   ├── delivery-logistics.json         # Delivery partner profile & dispatch jobs
│   ├── geographic-resources.geojson    # 12 GeoJSON resource points around CFR areas
│   ├── weather-norms.json              # 12-month historical temperature and rainfall norms
│   └── sample-livelihood-report.json   # Full sample plot livelihood assessment output
│
├── assets/                             # Reusable production images, icons & UI references
│   ├── products/                       # 12 transparent PNG product illustrations
│   │   ├── basket.png, dfruit.png, forest.png, herb.png, honey.png, leaf.png,
│   │   └── planter.png, preserve.png, rope.png, seed.png, stake.png, tamarind.png
│   ├── brand/                          # Master brand logo (vanmitra-logo-original.jpg)
│   ├── ui-references/                  # 18 UI layout reference mockups (1.jpeg - 18.jpeg)
│   └── design-guides/                  # UI style guide PDF & reference dashboard
│
├── schemas/                            # JSON Schemas (Draft 2020-12) for validation
│   ├── product.schema.json             # Schema for product listings
│   ├── category.schema.json            # Schema for resource categories
│   ├── gram-sabha.schema.json          # Schema for Gram Sabha & restoration data
│   ├── livelihood-idea.schema.json     # Schema for livelihood ideas
│   └── scheme.schema.json              # Schema for welfare schemes
│
├── types/                              # Technology-neutral TypeScript definitions
│   └── marketplace.ts                  # Comprehensive data interfaces
│
├── docs/                               # In-depth technical documentation
│   ├── DATA_DICTIONARY.md              # Full attribute dictionary with types & examples
│   ├── SOURCE_INVENTORY.md             # Complete source code audit & file classifications
│   ├── ASSET_MAPPING.md                # Mapping matrix linking products to asset images
│   └── EXTRACTION_REPORT.md            # Detailed validation checks and extraction audit
│
└── examples/                           # Ready-to-run web integration code
    └── web-integration.tsx             # React / TypeScript e-commerce catalog component
```

---

## 3. Quick Start: Loading Data in React / TypeScript

```typescript
import products from './data/products.json';
import categories from './data/categories.json';
import { ProductListing, Category } from './types/marketplace';

// Typed access
const catalog: ProductListing[] = products as ProductListing[];
const categoryList: Category[] = categories as Category[];

// Filter active honey listings
const honeyItems = catalog.filter((p) => p.categorySlug === 'forest-produce' && p.productCode === 'honey');
console.log(`Found ${honeyItems.length} forest honey products`);
```

See [`examples/web-integration.tsx`](examples/web-integration.tsx) for a complete working e-commerce catalog implementation with search, category filtering, dual pricing, and product detail modals.

---

## 4. Google AI Studio Prompting Instructions

When importing this repository into Google AI Studio, provide the following prompt to Gemini:

> "Build a modern, high-performance Amazon-style e-commerce website for VanRozgar using the extracted datasets.  
> 1. Use `data/products.json` as the primary catalog source.  
> 2. Use `data/categories.json` for the category navigation pills and filter tabs.  
> 3. Reference images from `assets/products/` using the `assets.illustration` field on each product record.  
> 4. Display both direct purchase (₹ price) and barter exchange terms where `mode === 'both'` or `'barter'`.  
> 5. Incorporate the 14 Nashik Gram Sabha village profiles from `data/gram-sabhas.json` to show provenance badges.  
> 6. Refer to `assets/ui-references/` for UI styling inspiration (modern card layouts, clean badges, floating cart)."

---

## 5. Data Transparency & Honesty Rules
1. **Actual vs Sample Data:** All demo products are clearly marked with `isSample: true`.
2. **Raah Foundation Dataset:** The 14 villages in Nashik district (Deola, Dindori, Trimbakeshwar) reflect the exact ecological restoration figures reported by the Raah Foundation (dated 1 October 2026): 2,019 ha CFR area, 217,708 saplings, 11 ponds, 794 boulder structures, and 12,710 labour days.
3. **Government Schemes:** All 10 government scheme rows point strictly to official government portals without claiming eligibility guarantees.
4. **No Placeholders:** All 12 product illustrations exist and are bundled directly in `assets/products/`.
