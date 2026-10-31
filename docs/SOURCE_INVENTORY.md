# VanRozgar Source Code Audit & Inventory

Comprehensive audit of the source repository `VANMITRA/VanRojgar_final_module` (local copy inspected at `d:\Project files\VanMitra\vanrozgar_final_module_for_app`).

## Repository Statistics
- **Total Files Inspected:** 813
- **Primary Modules:**
  1. `app/` (Flutter mobile client: 541 files)
  2. `server/` (Node.js/Express marketplace backend: 120 files)
  3. `livelihood_server/` (Python/FastAPI livelihood calculation engine: 65 files)
  4. `website/` (Vite/React legacy showcase website: 65 files)
  5. `componets/` (18 UI reference mockups)
  6. `docs/` (5 core architectural and deployment markdown guides)

---

## Detailed File-by-File Inventory

| Relative Path | File Type | Classification | Reusable Data / Assets | Copied? | Rationale |
|---|---|---|---|---|---|
| `server/src/seed/data/categories.json` | JSON | Data | Categories taxonomy | **Yes** | 6 official categories with multilingual names & icon keys |
| `server/src/seed/data/raah/raah_villages.json` | JSON | Data | 14 Nashik villages | **Yes** | Core CFR dataset (2,019 ha, 217,708 saplings, species lists) |
| `server/src/seed/data/demo_accounts.json` | JSON | Data | Demo account profiles | **Yes** | 18 test roles (Gram Sabhas, villagers, buyers) |
| `server/src/seed/data/restricted.json` | JSON | Data | Banned species | **Yes** | Legal compliance list (Red Sanders, Teak logs, Sarpagandha) |
| `server/scripts/seed_sample_shop.js` | JS Script | Data/Logic | 22 Village listings | **Yes (Extracted)** | 22 products linked to Nashik Gram Sabhas extracted to products.json |
| `website/src/data/mockData.ts` | TypeScript | Data/Mock | 12 Showcase listings | **Yes (Extracted)** | 12 rich product records, requests, orders, logistics extracted |
| `livelihood_server/.../ideas.json` | JSON | Data | 16 Livelihood ideas | **Yes** | Interventions and ecological gate check rules |
| `livelihood_server/.../schemes.json` | JSON | Data | 12 Welfare schemes | **Yes** | Central, state & tribal welfare schemes with verified URLs |
| `livelihood_server/.../sample_weather.json` | JSON | Data | Weather norms | **Yes** | Monthly temperature & rainfall patterns |
| `livelihood_server/.../sample_resources.geojson` | GeoJSON | Data | Geographic points | **Yes** | 12 CFR natural resource features (wells, dams, groves) |
| `app/assets/livelihood/sample_report.json` | JSON | Data | Plot report | **Yes** | Comprehensive sample livelihood output for UI reference |
| `app/assets/products/*.png` | PNG (12 files) | Assets | Product illustrations | **Yes** | 12 transparent PNG illustrations of forest produce |
| `componets/*.jpeg` | JPEG (18 files) | Assets | UI Reference mockups | **Yes** | 18 mobile/web e-commerce UI design inspiration screenshots |
| `website/public/brand/vanmitra-logo-original.jpg` | JPEG | Assets | Master Logo | **Yes** | High-res logo asset for website branding |
| `website/public/assets/aistudio/*.pdf, *.png` | PDF/PNG | Assets | Style guide & dash | **Yes** | Official UI style guide PDF and reference dashboard |
| `app/lib/.../*.dart` | Dart Code | App Logic | UI / Controllers | **No** | Mobile app Flutter implementation code not needed for web data repo |
| `server/src/.../*.js` | JS Code | Server Logic | Express API | **No** | Server controllers/routes not needed for standalone data repo |
| `livelihood_server/app/.../*.py` | Python Code | Engine Logic | FastAPI routes | **No** | Python scoring logic not needed for web frontend data layer |
| `website/src/components/*.tsx` | TSX Code | UI Code | Old website UI | **No** | Old UI components excluded as user will build new Amazon-style UI |
| `.env.example` | Config | Config | Template env | **No** | Excluded to prevent credential leakage |
| `CREDITS.md` | Markdown | Docs | Attribution & Terms | **Referenced** | Raah Foundation, OSM, Open-Meteo credited in README |
| `docs/WHAT_WE_BUILT.md` | Markdown | Docs | Specifications | **Referenced** | Incorporated into Data Dictionary & Extraction Report |
