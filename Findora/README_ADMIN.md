# Findora Admin Setup

The project now includes `client/admin.html` with an admin dashboard.

## Make yourself an admin
1. Register/login normally.
2. Open Firebase Console -> Firestore Database -> `users`.
3. Find your user document (the document ID is your Firebase Authentication UID).
4. Add/edit the field:
   - `role`: `admin`
5. Save.
6. Open `admin.html` (or the Admin link).

New accounts are automatically created with `role: user` and cannot promote themselves through the client.

## Deploy rules
Replace your Firestore rules with `firebase/firestore.rules` before using the admin dashboard in production.

## Admin features
- Live report statistics
- Search/filter reports
- Mark reports resolved/reopen
- Delete reports
- User count
- Quick actions and public-site links

For a production deployment, consider moving privileged operations to a trusted backend/Cloud Functions layer and adding Firebase App Check.
