# Regression Test Plan — ESLint / TypeScript Cleanup

Scope: the lint cleanup that took `npm run lint` from 1200 problems to 35 warnings / 0 errors,
plus the 9 follow-up `tsc` errors. Ordered by risk — P0 items changed logic or structure,
P1 changed markup, P2 is cosmetic verification.

---

## P0 — Logic and structure changed. Test these first.

### 1. Worship Videos & Sermons reorder (Admin → Resources)  -- DONE
**File:** `src/components/admin/ResourceManager.tsx`
**Change:** `useSortable` was called inside `if (sortable)`, a Rules of Hooks violation that
could crash React on toggle. `SortableVideoCard` and `SortableSermonCard` were each split into
a draggable wrapper + a shared card body (`VideoCardBody` / `SermonCardBody`). The card JSX
itself is unchanged.

- [ ] Worship Videos tab: cards render correctly with reorder **off**
- [ ] Enable Reorder → cards still render, drag handle (grip icon) appears
- [ ] Drag a card to a new position; order updates visually
- [ ] Save the new order; reload and confirm it persisted
- [ ] Toggle reorder on/off several times — watch console for "Rendered more hooks than during the previous render"
- [ ] Repeat all of the above on the Sermons tab
- [ ] As a **Viewer** role: drag handle is non-interactive, no reorder possible

### 2. Share popup (event share dialog)
**Files:** `src/components/SharePopup.tsx`, `src/components/SharePopupNew.tsx`
**Change:** `role="dialog"` moved from the backdrop onto the modal container. Backdrop is now
`role="presentation"` and closes via `e.target === e.currentTarget` instead of the modal
calling `stopPropagation()`.

- [ ] Open share popup from an event
- [ ] Click the dark backdrop → closes
- [ ] Click **inside** the modal (title, icons, URL row) → does **not** close
- [ ] Copy-link button still copies
- [ ] Each share icon still opens the right target
- [ ] Close (X) button still closes

### 3. Home hero fullscreen overlay  -- DONE
**File:** `src/components/Home.tsx`
**Change:** overlay close switched to a target check; the `onClick={stopPropagation}` on the
`<img>` was removed (now redundant).

- [ ] Open hero image fullscreen
- [ ] Click the black area around the image → closes
- [ ] Click **on the image** → does **not** close
- [ ] Prev / Next arrows navigate and do **not** close the overlay
- [ ] Close (X) button works

### 4. Session expiry warning (Admin)  -- DONE
**File:** `src/components/admin/SessionWarning.tsx`
**Change:** `let interval` (declared at the top of the effect) became `const interval` at the
assignment site. The cleanup closure still captures it.

- [ ] Log into admin, leave idle until the warning appears
- [ ] Countdown ticks every second
- [ ] "Extend session" works and the warning clears
- [ ] Navigate away / unmount → confirm no runaway timer (no repeated ticks in console)
- [ ] Let it fully expire → auto-logout still fires

### 5. HMS Student Form — non-JSON error path  -- DONE
**File:** `src/components/HMSStudentForm.tsx`
**Change:** fixed a genuine bug I introduced earlier — an assignment to an undeclared `_txt`
in the JSON-parse `catch`. The dead diagnostic variable was removed; `await resp.text()` still runs.

- [ ] Force the submit endpoint to return non-JSON (e.g. an HTML error page)
- [ ] Confirm the generic error message shows and no exception is thrown in console

### 6. Component prop signatures
**Files:** `src/components/admin/ImageUpload.tsx`, `src/components/HMSStudentForm.tsx`,
`src/components/ui/date-input.tsx`, `src/components/figma/ImageWithFallback.tsx`
**Change:** unused props re-aliased (`bucket: _bucket`, `showPreviewNotice: _showPreviewNotice`,
`onClose: _onClose`); `DateInput` gained an optional `id` passthrough; the internal function
behind `ImageWithFallback` was renamed (both exports keep their original names).

- [ ] Any image upload widget still uploads (gallery, hero, about, resources)
- [ ] Images with fallback still render, and the fallback shows on a broken URL
- [ ] Date pickers (Events → Date, Resources → Publish Date) open, select, clear, and save

---

## P1 — Markup changed. Verify appearance and interaction.

### 7. Footer quick links — behaviour change, please confirm intent  -- DONE
**File:** `src/components/Footer.tsx`
**Change:** 7 placeholder `<a href="#">` links became `<button type="button">`. They had no
click handler before, so `href="#"` merely **jumped the page to the top**. They are now inert.

- [ ] Donate, Children's Ministry, Youth Ministry, Women's Fellowship, Men's Group, Senior Ministry, Music Ministry
- [ ] Confirm styling is unchanged (they share the classes of the existing Contact button)
- [ ] **Decide:** should these navigate somewhere? They currently do nothing.

### 8. Admin form labels — `htmlFor` / `id` pairs added  -- DONE
**Files:** accept-invite, change-password, `AdminLogin`, `ContactDetail`, `EventsManager`,
`HMSStudentFormAdmin`, `ManageSlots`, `NewsManager`, `PresignUploader`, `ResourceManager`,
`SetupHelper`, `StoriesManager`, `UserManager`
**Change:** 59 labels wired to their control. Inside list rows the id includes the row key
(e.g. `` `event-title-${event.id}` ``) so it stays unique per row.

- [ ] Clicking a field's label focuses **that row's** field — critical on Events and Resources, where many rows render at once
- [ ] No visual shift in any of these forms
- [ ] Forms still submit and validate: accept invite, change password, admin login, user create/edit, event create/edit, resource create/edit, news report, story reject, contact detail

### 9. Labels converted to `<span>` (group captions, not field labels)  -- DONE
- [ ] Events → "Enable 24 Hours Worship Form" caption
- [ ] Manage Slots → "Select month" caption
- [ ] Resources → "Cover Image", "Additional Images (Gallery)", "File URL or Upload"
- [ ] HMS Student Form (Admin) → Program Applying For, Instrument Specialization, Preferred Class Type, Preferred Schedule, Performance Experience, Volunteer Details
- [ ] All should look identical (same classes, still block-level). The radio/checkbox labels **inside** these groups are untouched and should still toggle on click.

### 10. Keyboard support added to clickable `<div>`s   -- DONE
**Change:** `role="button"`, `tabIndex={0}` and an Enter/Space handler were added. These
elements are now in the tab order — verify the tab sequence still feels sane.

- [ ] Donate → UPI QR code: click and Enter/Space both open fullscreen
- [ ] Home Content Manager → flash-news video, video file, thumbnail pickers
- [ ] Events Manager → event image and event video upload dropzones
- [ ] Gallery Manager and About Hero Image Manager → upload dropzones
- [ ] Resources → image select
- [ ] Gallery → image card opens the lightbox
- [ ] Newsroom → "view details" card
- [ ] Confirm dropzones stay inert for the **Viewer** role (the `isViewer` guard is inside the handler)

### 11. Overlays marked `role="presentation"` (no behaviour change expected)  -- DONE
- [ ] Donate → fullscreen QR overlay: backdrop closes, inner card does not
- [ ] Image lightbox backdrop closes
- [ ] Stories Manager → edit modal backdrop closes
- [ ] Gallery lightbox: backdrop closes, clicking the image does not; arrow keys still navigate

### 12. Shared UI primitives   -- DONE
**Files:** `src/components/ui/card.tsx`, `src/components/ui/pagination.tsx`
**Change:** both now render `{children}` explicitly instead of spreading into a self-closing tag.

- [ ] Any `CardTitle` still shows its text (used widely — spot-check a few dashboards)
- [ ] Pagination controls still render numbers and prev/next labels

### 13. Removed `tabIndex` from headings  -- DONE
**File:** `src/components/ministries/HallelChurch.tsx`
- [ ] Page renders unchanged; headings are simply no longer tab stops

### 14. `<track>` added to videos --  DONE
**Files:** `Home.tsx`, `admin/GalleryManager.tsx`, `admin/HomeContentManager.tsx`, `newsroom/NewsPage.tsx`
- [ ] Each video still loads and plays; no stray caption/subtitle button behaviour

---

## P2 — Cosmetic. A quick visual pass is enough.

### 15. Text escaping (`'` → `&apos;`, `"` → `&quot;`)
- [ ] Footer ministry names, Events/News/Resources empty-state messages ("No events yet. Click "Add Event"…"), Ministries Manager help text, Setup Helper note, Hallel Conferences quotes — all should read normally with no literal `&apos;` visible

### 16. Alt text reworded (screen readers only)
- [ ] `AwardsPage`, `Home`, `HMSPage` broken-image fallback; `ImageLightbox`; `HomeContentManager` hero; `HomeManager` preview

### 17. Unused imports removed (16 statements)
- [ ] Smoke-test that every page still loads — a wrongly removed import would surface as a build error or blank page. `tsc` is already clean, so this is low risk.

---

## P3 — Node scripts (not part of the app runtime)

Unused variables and catch bindings were cleaned up. Only worth running if you use them.

- [ ] `check-november.js`, `scripts/inspect_constraint.js`, `scripts/post_test.js`,
      `scripts/process_hero_queue.js`, `scripts/send-test-email.js`, `scripts/test-invite.js`,
      `scripts/upgrade-next-check.js`, `scripts/fuzz-app-router.js`

---

## Not changed (no test needed)

- `BibleStudiesManager` in ResourceManager — dead code, name restored, still not rendered
- `src/lib/validateEmail.ts`, `MinistriesPage.tsx`, HMS number clamp — `let` → `const` only,
  no reassignment existed
- ESLint config and `.eslintignore` — tooling only

## Known remaining

- 35 `react-hooks/exhaustive-deps` warnings, deliberately left alone. Each needs individual
  judgement; blanket-fixing them is a common source of infinite render loops.
- `eslint.config.cjs` is dead weight — the lint script forces legacy config mode, and that file
  isn't valid flat config anyway. Worth deleting or fixing before any ESLint 9 upgrade.
