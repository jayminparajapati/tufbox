# Tufbox — Cricket Booking Demo

This is a small demo website for Tufbox cricket pitch booking. It is a static site with a simple client-side booking form that stores bookings in your browser's localStorage.

Files:
- `index.html` — main page with header, booking form, prices, and contact.
- `styles.css` — site styles.
- `app.js` — client-side logic to save and list bookings in localStorage.

To run locally:

1. Open the folder in your file explorer.
2. Double-click `index.html` or run this in PowerShell from the project directory:

```powershell
Start-Process .\index.html
```

Notes:
- This demo uses localStorage only (no server). Bookings are stored locally in the browser.
- I can add a booking calendar, timezone handling, or backend integration next.
# tufbox