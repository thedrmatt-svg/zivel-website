# Approved location-specific FAQs

The eight standard FAQs are generated from existing site data, preserving their existing omission rules. Approved structured local FAQs now follow the standard questions; any approved manual `localFaqs` follow the structured entries. Manual entries below are still empty.

Use plain text, approximately 40–70 words per answer, with a direct first sentence and the location/city named. Include only verified local facts. Do not add outcome claims, named individuals, urgency, or specific membership prices or terms.

Approved manual additions belong in `localFaqs: [{ question, answer }]` in the corresponding active location data file under `src/content/locations/`. Do not use the legacy `faqs` field. Blank entries are not published. Editing this document alone does not publish content.

### Structured local fields

These optional fields live in each registered location's active content record:
- `county`: full county/parish label; absent means empty.
- `nearbyCommunities`: approved community names; absent means an empty list.
- `partnerApps`: approved app names; absent means an empty list.
- `siteName`: the larger venue/shopping-center name; absent means empty.
- `venueVisitors`: absent means false; true only for Fieldhouse in the approved data.

Do not infer or enrich any field. The current address-first city helper provides the municipality, not the route/neighborhood name. A community equal to that municipality is removed before checking the minimum list length, except for the owner's explicit Windermere exception: its service-area FAQ includes Alpharetta, Johns Creek, and Cumming. Fieldhouse keeps the business name **Zivel Fieldhouse**; Hernando is the address municipality, not its business name. Identify the venue as the Gatorade Fieldhouse near Hernando, MS.

Structured entries, in order:
- **L1, service area:** needs county, state abbreviation and at least two other nearby communities.
- **L2, other state studios:** computed from registered locations and existing location URLs, never a stored hardcoded list. Excludes the current studio, Brecksville and any studio explicitly marked not yet open/coming soon. A coming-soon service does not exclude an otherwise open studio.
- **L3a, partner apps:** needs at least one app; one/two-app wording follows the approved templates.
- **L3b, venue:** needs siteName and the stored street address.
- **L4, venue visitors:** needs siteName and venueVisitors=true. Online booking wording uses the existing booking helper; without an online destination, the approved call/text wording requires a phone.

If a required field is empty, omit the entire question from both visible FAQ and FAQPage JSON-LD. The same generated entries supply the visible text and schema. Standard FAQ copy currently uses English on both locale routes, so these entries use the same English fallback; the existing Spanish membership sentence is unchanged.

### Approved populated values

An em dash means empty/unset. All unlisted optional values remain empty; do not populate Brecksville.

| Location | County/parish | Nearby communities | Partner apps | Site / venue visitors | Local entries |
| --- | --- | --- | --- | --- | --- |
| Belmont | Gaston County | Mount Holly; Gastonia; Charlotte | — | — | L1 |
| Bentonville | Benton County | Rogers; Bella Vista; Springdale | — | — | L1, L2 |
| Atlanta (Buckhead) | Fulton County | Sandy Springs; Brookhaven; Midtown Atlanta | ClassPass | — | L1, L2, L3a |
| Colorado Springs (Briargate) | El Paso County | Monument; Black Forest; the Air Force Academy area | Wellhub; ClassPass | — | L1, L2, L3a |
| Coral Gables | Miami-Dade County | Miami; South Miami; Coconut Grove | ClassPass | — | L1, L2, L3a |
| Fayetteville | Washington County | Springdale; Johnson; Farmington | — | — | L1, L2 |
| Hernando (Fieldhouse) | DeSoto County | Olive Branch; Southaven; Horn Lake | — | Gatorade Fieldhouse; true | L1, L3b, L4 |
| Franklin (Cool Springs) | Williamson County | Brentwood; Spring Hill; Nolensville | — | — | L1, L2 |
| Highlands Ranch | Douglas County | Lone Tree; Littleton; Centennial | — | — | L1, L2 |
| Hollywood | Broward County | Hallandale Beach; Dania Beach; Pembroke Pines; Miramar | — | — | L1, L2 |
| Metairie | Jefferson Parish | New Orleans; Kenner; Harahan | — | — | L1 |
| Murfreesboro | Rutherford County | Smyrna; La Vergne; Christiana | — | — | L1, L2 |
| Newport | Campbell County | Covington; Fort Thomas; Cincinnati | — | — | L1 |
| Palm Coast | Flagler County | Flagler Beach; Bunnell; Ormond Beach | — | — | L1, L2 |
| Parker | Douglas County | Lone Tree; Aurora; Castle Rock | — | Crossing at Stonegate | L1, L2, L3b |
| Riverton | Salt Lake County | South Jordan; Herriman; Bluffdale | Wellhub | — | L1, L3a |
| Rogers | Benton County | Bentonville; Lowell; Springdale | — | — | L1, L2 |
| Cumming (Windermere) | Forsyth County | Alpharetta; Johns Creek; Cumming | — | — | L1, L2 |

Expected: 38 local entries across 18 studio templates per locale, unless explicit not-open flags change L2 eligibility. No registered studio currently has such a studio-level flag; Highlands Ranch's Red Light coming-soon flag is service-level only. Report any future differences rather than changing data to force these counts.

Brecksville is exiting the brand and remains untouched. Belmont and Palm Coast's English mains redirect to external sites; local template coverage is not a change to those external websites.

### Manual local FAQ entries

The blank slots below are for separately approved manual question/answer pairs, not replacements for the structured fields above. Keep them empty until the owner supplies approved content.

## Bentonville, Arkansas — `/locations/arkansas/bentonville`
1. Question:
   Answer:
2. Question:
   Answer:
3. Question:
   Answer:

## Belmont, North Carolina — `/locations/north-carolina/belmont`
1. Question:
   Answer:
2. Question:
   Answer:
3. Question:
   Answer:

## Brecksville, Ohio — `/locations/ohio/brecksville`
1. Question:
   Answer:
2. Question:
   Answer:
3. Question:
   Answer:

## Buckhead, Georgia — `/locations/georgia/buckhead`
1. Question:
   Answer:
2. Question:
   Answer:
3. Question:
   Answer:

## Briargate, Colorado — `/locations/colorado/briargate`
1. Question:
   Answer:
2. Question:
   Answer:
3. Question:
   Answer:

## Coral Gables, Florida — `/locations/florida/coral-gables`
1. Question:
   Answer:
2. Question:
   Answer:
3. Question:
   Answer:

## Windermere, Georgia — `/locations/georgia/windermere`
1. Question:
   Answer:
2. Question:
   Answer:
3. Question:
   Answer:

## Fayetteville, Arkansas — `/locations/arkansas/fayetteville`
1. Question:
   Answer:
2. Question:
   Answer:
3. Question:
   Answer:

## Fieldhouse, Mississippi — `/locations/mississippi/fieldhouse`
1. Question:
   Answer:
2. Question:
   Answer:
3. Question:
   Answer:

## Cool Springs, Tennessee — `/locations/tennessee/cool-springs`
1. Question:
   Answer:
2. Question:
   Answer:
3. Question:
   Answer:

## Highlands Ranch, Colorado — `/locations/colorado/highlands-ranch`
1. Question:
   Answer:
2. Question:
   Answer:
3. Question:
   Answer:

## Hollywood, Florida — `/locations/florida/hollywood`
1. Question:
   Answer:
2. Question:
   Answer:
3. Question:
   Answer:

## Metairie, Louisiana — `/locations/louisiana/metairie`
1. Question:
   Answer:
2. Question:
   Answer:
3. Question:
   Answer:

## Murfreesboro, Tennessee — `/locations/tennessee/murfreesboro`
1. Question:
   Answer:
2. Question:
   Answer:
3. Question:
   Answer:

## Newport, Kentucky — `/locations/kentucky/newport`
1. Question:
   Answer:
2. Question:
   Answer:
3. Question:
   Answer:

## Palm Coast, Florida — `/locations/florida/palm-coast`
1. Question:
   Answer:
2. Question:
   Answer:
3. Question:
   Answer:

## Parker, Colorado — `/locations/colorado/parker`
1. Question:
   Answer:
2. Question:
   Answer:
3. Question:
   Answer:

## Riverton, Utah — `/locations/utah/riverton`
1. Question:
   Answer:
2. Question:
   Answer:
3. Question:
   Answer:

## Rogers, Arkansas — `/locations/arkansas/rogers`
1. Question:
   Answer:
2. Question:
   Answer:
3. Question:
   Answer:
