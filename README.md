# Gmail Filter Manager Button

Adds a **“Filters”** button to the Gmail toolbar. Click it to jump straight to **`#settings/filters`** (“Filters and blocked addresses”). 

---

## Repository

**GitHub:** https://github.com/firedfly2/gmail-filter-manager-button

Clone with Git:
```bash
git clone https://github.com/firedfly2/gmail-filter-manager-button.git
cd gmail-filter-manager-button
```

Or with GitHub CLI:
```bash
gh repo clone firedfly2/gmail-filter-manager-button
cd gmail-filter-manager-button
```

- **Issues:** use the repo’s Issues tab to report bugs or request features.  
- **Pull Requests:** welcome! Please keep changes minimal and include a short description and screenshots/GIFs where helpful.

---

## Install (Local / Unpacked)

1. Download or clone this repository (see **Repository** above).  
2. Open `chrome://extensions` in Chrome or Arc.  
3. Turn on **Developer mode** (top right).  
4. Click **Load unpacked** and select the project folder.  
5. Reload Gmail—you’ll see the icon in the toolbar.

> After making changes, click **Reload** on the extension in `chrome://extensions`.

---

## Usage

- Available anywhere the Gmail toolbar is shown (inbox, search results, etc.).  

---

## How It Works

- A content script watches the toolbar (`div[gh="mtb"]`) and inserts the button **right before** the “More” (︙) control.  
- Clicking updates only the **URL hash** to `#settings/filters`, letting Gmail’s SPA handle the view change.

---

## Troubleshooting

- **Icon not visible:** reload Gmail; ensure you’re on a view with the toolbar; temporarily disable other UI-tweaking extensions.  
- **Position/hover looks off:** update to the latest version (alignment and sizing are auto-corrected).  
- Still stuck? Please share the current `div[gh="mtb"]` subtree (copy from DevTools Elements panel).

---

## Permissions & Privacy

- No additional permissions requested.  
- No external network requests.

---

## License

MIT