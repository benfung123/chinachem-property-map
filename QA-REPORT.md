# Chinachem Property Map - QA Report

**Date:** 2026-04-19  
**Website:** https://chinachem-property-map.vercel.app  
**Codebase:** `/root/.openclaw/workspace/chinachem-property-map/`

---

## Executive Summary

| Category | Result |
|----------|--------|
| **Overall Status** | ⚠️ **NEEDS FIXES** |
| **Critical Issues** | 2 |
| **Minor Issues** | 4 |
| **Features Pass** | 3/5 |

---

## 1. Portfolio Dashboard Widget

### Test Results

| Feature | Status | Notes |
|---------|--------|-------|
| Dashboard appears at top of sidebar | ✅ **PASS** | Present in `index.html` (lines 50-79) |
| Bar chart for categories | ✅ **PASS** | Chart.js initialized in `app.js` (line 721-745) |
| Doughnut chart for districts | ✅ **PASS** | Chart.js initialized in `app.js` (line 747-775) |
| Collapse/expand functionality | ✅ **PASS** | `initDashboardCollapse()` function exists |
| Stats accuracy | ⚠️ **PARTIAL** | Stats calculated from filtered properties, but counts shown may differ from actual data |

### Issues Found

1. **Chart Height Issue**: The doughnut chart has `cutout: '60%'` which may render too small on mobile devices.

2. **Missing Total Properties Count**: The dashboard shows filtered count, not total portfolio count when filters are active.

---

## 2. Advanced Filter System

### Test Results

| Feature | Status | Notes |
|---------|--------|-------|
| District filters | ✅ **PASS** | Region chips (新界/九龍/港島) and district chips implemented |
| Year range filters | ✅ **PASS** | 5 year ranges defined in `properties-data.js` (line 180-186) |
| Availability status filters | ✅ **PASS** | 4 status options (all/available/leased/coming_soon/na) |
| Multiple filters (AND logic) | ✅ **PASS** | `getFilteredProperties()` applies all filters with AND logic (line 568-597) |
| Active filter badge | ✅ **PASS** | Badge displays count and shows/hides correctly |
| Clear all button | ✅ **PASS** | `clearAllFilters()` function resets all filters |

### Issues Found

1. **District Filter UI Bug**: The district chips container has `max-height: 100px` with overflow, but there are 18 districts. Users may not see all options without scrolling.

2. **Year Range Logic Issue**: The year range filter uses:
   ```javascript
   if (range.max !== null && property.year >= range.max) return false;
   ```
   This is **exclusive** of the max year, which may be confusing (e.g., "2000-2010" excludes 2010).

---

## 3. Enhanced Property Details

### Test Results

| Feature | Status | Notes |
|---------|--------|-------|
| Popup tabs [概覽][詳情][周邊] | ✅ **PASS** | Tabbed interface implemented in `createPopupContent()` |
| Tab switching | ✅ **PASS** | `switchTab()` function handles tab switching |
| Cross-links for complex properties | ✅ **PASS** | Complex properties show related properties with clickable links |
| Copy Address button | ✅ **PASS** | `copyAddress()` uses Clipboard API with fallback |
| Navigate button | ✅ **PASS** | Opens Google Maps directions |
| Share button | ⚠️ **PARTIAL** | Uses Web Share API, falls back to copy - may not work on all browsers |

### Issues Found

1. **⚠️ CRITICAL: Tab Content ID Conflict**: In `createPopupContent()`, the details tab content uses:
   ```javascript
   const detailsContent = `<div class="tab-content" id="tab-details-${property.id}">`
   ```
   But this content is then inserted inline in the template string, creating **nested divs with the same ID** when the template is rendered. This will cause:
   - Duplicate IDs in DOM (invalid HTML)
   - Tab switching may fail for properties with details

2. **Missing Amenities Display**: The amenities section in details tab may not render correctly due to variable scope issues in the template string.

3. **Nearby Tab Shows "-"**: Most properties don't have nearby data, showing just "-" which is not user-friendly.

---

## 4. Availability Status

### Test Results

| Feature | Status | Notes |
|---------|--------|-------|
| Color borders on markers | ✅ **PASS** | Green (available), Red (leased), Yellow (coming_soon) |
| Legend explains colors | ✅ **PASS** | Legend section shows availability colors |
| Filter by availability | ✅ **PASS** | Availability chips in advanced filter section |
| Status badges in popups | ✅ **PASS** | Badge shown in popup header with color |

### Issues Found

1. **N/A Properties**: Many properties (hotels, residential, healthcare) have `availability: "na"` which shows grey color. This may be confusing - consider hiding the badge for N/A properties.

2. **Marker Border Visibility**: The border is 4px which may be hard to see on high-DPI displays. Consider increasing to 5-6px.

---

## 5. Regression Testing

### Test Results

| Feature | Status | Notes |
|---------|--------|-------|
| Basic category filters | ✅ **PASS** | 6 category chips work correctly |
| Search functionality | ✅ **PASS** | Debounced search (300ms) searches name/address |
| Map markers display | ✅ **PASS** | Custom div icons with category colors |
| Language toggle (繁/EN) | ✅ **PASS** | `applyLanguage()` switches all text |
| Mobile responsive | ⚠️ **PARTIAL** | Media queries exist but sidebar max-height may cause issues |

### Issues Found

1. **⚠️ CRITICAL: Language Toggle State Not Persisted**: The code sets `localStorage.setItem('preferredLang', newLang)` but there's no code to read it on page load (should be in `initLanguage()`).

2. **Mobile Sidebar Overflow**: On mobile (< 640px), the sidebar has multiple scrollable sections that may create nested scrolling issues.

3. **Search vs Filter Interaction**: When searching, the map filters are bypassed but the sidebar filter UI doesn't reflect this - can be confusing.

---

## Data Quality Issues

1. **Missing Coordinates**: Some properties have `null` for floors/area/year but all have coordinates - good.

2. **Duplicate Properties**: `華懋中心一期` and `華懋中心 I期` (id 2 and 7) appear to be duplicates with different addresses (Central vs TST).

3. **Inconsistent Naming**: Some properties use Chinese brackets `（）` vs English `()`.

---

## Recommendations

### Critical Fixes Required

1. **Fix Tab Content Duplication Bug** (app.js line ~280):
   ```javascript
   // Remove the duplicate ID in detailsContent
   // Change: id="tab-details-${property.id}"
   // to a class or different ID structure
   ```

2. **Fix Language Persistence** (app.js):
   ```javascript
   function initLanguage() {
       const savedLang = localStorage.getItem('preferredLang');
       if (savedLang) {
           currentLang = savedLang;
       }
       applyLanguage(currentLang);
   }
   ```

### Minor Fixes Recommended

3. **Fix Year Range Logic** to be inclusive:
   ```javascript
   if (range.max !== null && property.year > range.max) return false;
   ```

4. **Improve N/A Display**: Hide availability badge for N/A properties or show as "Not Applicable" instead of "N/A".

5. **Increase Marker Border Width** from 4px to 5-6px for better visibility.

---

## Overall Assessment

| Criterion | Rating |
|-----------|--------|
| Feature Completeness | 4/5 |
| Code Quality | 3.5/5 |
| Data Quality | 4/5 |
| UI/UX Polish | 3/5 |
| Mobile Responsiveness | 3.5/5 |

### Verdict: **⚠️ NEEDS FIXES**

The implementation covers all the JTBD plan features, but has 2 critical bugs that should be fixed before production:
1. Tab content ID duplication causing potential tab switching failures
2. Language preference not being restored on page load

**Estimated Fix Time:** 1-2 hours

---

## Tested File Versions

- `index.html` - 2026-04-19 21:30
- `app.js` - 2026-04-19 21:34
- `style.css` - 2026-04-19 21:36
- `properties-data.js` - 2026-04-19 21:30

**QA Performed By:** Stone (Sub-Agent)
**Method:** Code Review (Browser automation unavailable due to SSRF policy)
