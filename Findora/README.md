# Findora - upgraded campus Lost & Found

Findora is now a Firebase-powered, responsive lost-and-found web app rather than a localStorage-only prototype.

## Included features
- Beautiful responsive landing page
- Firebase Email/Password authentication
- Persistent login using browserLocalPersistence: users do not need to log in again on the same browser/device until they log out
- Forgot-password email flow
- Protected report pages
- Firestore live item database
- Firebase Storage image uploads
- Browse/search/filter/sort live reports
- Item details page with view counter and contact action
- Favorite/save items with browser storage
- Personal dashboard with the user's reports and statistics
- Dynamic home-page statistics from Firestore
- Mobile navigation and responsive layout
- Firestore + Storage security rules templates

## Run locally
Use VS Code Live Server or another local HTTP server. Do not open the HTML files directly with `file://` because Firebase ES modules and authentication require an HTTP origin.

Example:
1. Open `Findora/client` in VS Code.
2. Right-click `index.html` -> Open with Live Server.
3. In Firebase Console, enable Authentication -> Email/Password.
4. Create/enable Firestore Database.
5. Create/enable Storage.
6. Publish the rules in `firebase/firestore.rules` and `firebase/storage.rules`.

## Important
The Firebase web configuration in `client/js/firebase.js` is intended to be public client configuration. Real security comes from Firebase Authentication and Firestore/Storage Security Rules. Review the rules before production deployment and restrict reads/writes further if your institution needs private campus access.
