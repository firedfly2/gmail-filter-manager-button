# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a minimal Chrome extension that adds a "Filters" button to Gmail's toolbar. The button provides direct access to Gmail's filter settings page (`#settings/filters`).

## Architecture

### Core Components

- **manifest.json**: Chrome extension manifest v3 with minimal permissions
- **content.js**: Main content script that injects the button into Gmail's toolbar
- **content.css**: Styles for the filter button to match Gmail's UI
- **_locales/**: i18n support for English and Japanese

### Key Technical Details

- Uses Chrome extension manifest v3
- Single content script injection at `document_idle` 
- No additional permissions required - operates purely through URL hash changes
- Targets Gmail toolbar (`div[gh="mtb"]`) and inserts before "More" button
- Handles multiple Gmail accounts via URL pattern `/mail/u/{account}/`
- Responsive button sizing with square aspect ratio maintenance
- Dark mode support via CSS media queries

### Button Injection Strategy

The extension uses a sophisticated approach to handle Gmail's dynamic UI:

1. **Toolbar Detection**: Searches for visible `div[gh="mtb"]` elements
2. **Insertion Point**: Attempts to insert before "More" button, falls back to last button group
3. **Persistence**: Uses MutationObserver to re-inject when Gmail UI changes
4. **Multi-account Support**: Detects current account from URL pattern

### Internationalization

- Chrome i18n API integration in content.js:2-3
- Fallback language detection via `document.documentElement.lang` attribute
- Locale files support English and Japanese

## Development Commands

This project has no build system - it's a simple Chrome extension with static files.

### Testing Changes

1. Load unpacked extension in Chrome via `chrome://extensions`
2. Enable Developer mode
3. After changes, click "Reload" on the extension card
4. Refresh Gmail to test

### Chrome Extension Store Deployment

The extension is published with version numbers in manifest.json. Current version is 0.2.7.

### File Structure

```
├── manifest.json          # Extension configuration
├── content.js            # Main injection logic
├── content.css           # Button styling
├── icons/               # Extension icons (16, 32, 48, 128px)
└── _locales/            # i18n message files
    ├── en/messages.json
    └── ja/messages.json
```

## Key Functions

- **`toFilters()`** (content.js:9): Navigates to filter settings, supports new tab with Ctrl/Cmd+click
- **`insert()`** (content.js:123): Main button injection logic with toolbar detection
- **`findMoreButton()`** (content.js:89): Locates Gmail's "More" button for insertion positioning
- **`getVisibleToolbar()`** (content.js:114): Finds active toolbar from multiple candidates