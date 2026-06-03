// ── Firebase Realtime Database setup ────────────────────────────────────────
//
// This app uses ONLY Firebase Realtime Database for cross-device Comms.
// No `firebase init` or Firebase CLI is required — only fill in the config below.
//
// HOW TO FIND YOUR databaseURL (not included in the standard SDK snippet):
//   1. console.firebase.google.com → your project
//   2. Left sidebar → Build → Realtime Database → Create database
//      (pick a region; use Test mode during development)
//   3. After creation the URL appears at the top of the Data tab, e.g.:
//        https://unmatrixrpg-101-default-rtdb.firebaseio.com        (US)
//        https://unmatrixrpg-101-default-rtdb.europe-west1.firebasedatabase.app
//   NOTE: This is NOT the Hosting URL (unmatrixrpg-101.web.app).
//         It must end in .firebaseio.com or .firebasedatabase.app.
//
// Leave apiKey empty ('') to run in local-only mode with no cross-device sync.
//
// SECURITY: apiKey here is NOT a secret — it's a public identifier and is safe
// to commit. Access is controlled by Realtime Database security rules + (below)
// Anonymous Auth and App Check. See README → "Securing your database".
//
// recaptchaSiteKey enables Firebase App Check (reCAPTCHA v3), which ensures only
// your real deployed app can talk to the database. Leave it '' to skip App Check
// (Anonymous Auth still works). Get a v3 site key at the reCAPTCHA admin console
// and register it under Firebase → App Check. See README for the full walkthrough.

export const firebaseConfig = {
  apiKey: 'AIzaSyDqcgJnjZGri2lr-9hYYqjEFcXu0m4o3OA',
  authDomain: 'unmatrixrpg-101.firebaseapp.com',
  databaseURL: 'https://unmatrixrpg-101-default-rtdb.firebaseio.com/', // ← paste your Realtime Database URL here (see instructions above)
  projectId: 'unmatrixrpg-101',
  storageBucket: 'unmatrixrpg-101.firebasestorage.app',
  messagingSenderId: '279940726263',
  appId: '1:279940726263:web:b1b1c4353b4f4323ccc2f2',
  measurementId: 'G-8DZ3ZY25WG',
  recaptchaSiteKey: '', // ← optional: reCAPTCHA v3 site key to enable App Check
}
