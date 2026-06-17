---
name: Local service page template
description: Architecture and conventions for /locations/[state]/[city]/[service] pages
---

## Rule
Every local service page renders `LOCAL_CONTENT[key] ?? generateLocalContent(location, svc, state, city)`.
Hand-crafted overrides go in `LOCAL_CONTENT` keyed by `"state/city/service"`.
New pages auto-generate from service + location data.

**Why:** Scales to any location×service combo without per-page boilerplate. Existing hand-crafted Riverton pages are preserved exactly via the override map.

**How to apply:**
- Add a new combo to `LOCAL_SERVICE_COMBOS` to statically generate the page.
- Optionally add a `META_MAP` entry for a custom title/description.
- Optionally add a `LOCAL_CONTENT` entry for fully custom copy.
- If no LOCAL_CONTENT entry exists, the generator runs automatically.

## Trust bar data flow
- `location.google?.placeId` is merged in by `locations.ts` from `PLACE_ID_BY_LOCATION_PATH`.
- Trust bar generator looks up that placeId in `src/data/places-cache.json`.
- Run `npm run fetch-places` to refresh real rating/review counts; commit the JSON.

## Key types
- `LocalServiceContent` — typed shape used by both LOCAL_CONTENT and generator return value.
- `openedYear?: number` added to `Location` type — used for "Since XXXX" trust bar stat.
