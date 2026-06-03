# The Unofficial Matrix RPG Character Sheet

Local-first web app for creating and saving player character sheets for The Unofficial Matrix RPG. Includes a real-time in-game Comms system so the Operator can send messages to crew members across devices during a session.

## Features

- Matrix-themed landing page with Learn and Play paths
- Character sheet with identity, attributes, damage, skills, Matrix feats, equipment, and notes
- Autocomplete pick lists for skills, feats, gear, paths, affiliations, origins, and hovership types
- Browser localStorage persistence — no account required
- JSON export and import for backups or moving sheets between devices
- Matrix Avatar NFT viewer (OpenSea API — Red Pill, Blue Pill, Base collections)
- In-game Comms system: Operator console + crew field phones, scoped per hovership
- Operator image gallery: stage images (saved locally on the device) and project any one full-screen for the table
- Live image presentation: the Operator can share an image with crew in real time — sent as a small copy and **never stored on the server** (auto-deleted when sharing stops)
- Real-time cross-device messaging via Firebase Realtime Database (optional)
- Matrix-themed sci-fi animations with Motion.js (entrance effects, glitch reveals, connection flashes)

---

## Animations

The app features cinematic Matrix-themed animations built with [motion.dev](https://motion.dev):

| Animation | Trigger | Effect |
|-----------|---------|--------|
| **H1 Glitch** | Every view load | All main headings (h1 tags) briefly flicker with horizontal displacement — corrupted digital text effect |
| **Text Scramble** | Page/view load | Headings cycle through random katakana + symbols before revealing real text — classic Matrix decode effect |
| **Glitch Reveal** | Tab switch, jack-in view load | Sheet cards sweep in from top via a dramatic horizontal scanline wipe with green border flash |
| **Phone Boot Flicker** | Crew powers on field phone (⏻) | Phone screen brightness spikes and stutters like a CRT powering up |
| **Zion Mesh Flash** | Firebase first connects | Connection banner pulses bright green then fades to normal |
| **New Message Slide** | Message sent (operator or crew) | Newest log entry slides in from the left with a brief green highlight flash |
| **Red/Blue Pill Glow** | Hover red or blue pill button | Buttons glow with red or blue box-shadow, scale slightly larger |
| **Entrance Fades** | View/route change | Hero elements, timeline cards, roster cards, and sheet tabs fade in with staggered timing |
| **Button Hover Scale** | Hover any button | All interactive buttons scale up 1.05× on hover |
| **Card Border Pulse** | Hover cards | Card borders brighten on hover for interactive feedback |

---

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

---

## Real-time Comms — Firebase setup

The Comms tab works in **local mode** out of the box (messages stay in the same browser). To enable real-time cross-device play — so the Operator on one machine can message crew members on other machines — connect a Firebase Realtime Database.

### Do you need `firebase init` or the Firebase CLI?

**No.** This app uses the Firebase JavaScript SDK directly in the browser. You do not need to install the Firebase CLI, run `firebase init`, or deploy anything to Firebase Hosting. Just fill in the config file described below.

### Step-by-step

#### 1 — Create a Firebase project

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Click **Add project**, give it a name, and finish the wizard

#### 2 — Add a Web App to the project

1. In your project, click the **</>** (Web) icon on the overview page
2. Register the app (any nickname is fine)
3. Firebase shows you a `firebaseConfig` object — **copy it**

#### 3 — Enable Realtime Database

1. Left sidebar → **Build → Realtime Database → Create database**
2. Choose a region (US is fine for most groups)
3. Select **Start in test mode** (open read/write — fine for a gaming table; see Security Rules below)
4. After creation, the **database URL** appears at the top of the Data tab:
   - US region: `https://your-project-default-rtdb.firebaseio.com`
   - Other regions: `https://your-project-default-rtdb.REGION.firebasedatabase.app`
   > **Note:** This is NOT the same as the Hosting URL (`your-project.web.app`). It must end in `.firebaseio.com` or `.firebasedatabase.app`.

#### 4 — Fill in `src/firebase-config.ts`

Open `src/firebase-config.ts` and paste your values:

```ts
export const firebaseConfig = {
  apiKey: 'AIzaSy...',
  authDomain: 'your-project.firebaseapp.com',
  databaseURL: 'https://your-project-default-rtdb.firebaseio.com', // ← from step 3
  projectId: 'your-project',
  storageBucket: 'your-project.firebasestorage.app',
  messagingSenderId: '...',
  appId: '...',
}
```

#### 5 — Rebuild and run

```bash
npm run build
npm run dev
```

The Comms tab will show **◉ ZION MESH ONLINE** when Firebase is connected. Messages sent by the Operator are received in real time by all crew members on any device.

---

### How Comms works

| Role | View | Can do |
|------|------|--------|
| **Operator** | Full monitor wall + crew roster + compose form | Send to all crew or one individual; see crew replies |
| **Crew (all other roles)** | Nokia 8110-style field phone | Power on to receive messages; send replies to Operator |

- Messages are **scoped per hovership** — crew on the *Nebuchadnezzar* never see messages meant for crew on the *Logos*. Both the Operator and the crew member must have the same **Hovership / Crew** value in their Identity tab.
- The Operator's character role must be set to **Operator** in the Identity tab.
- Crew members must **power on their phone** (press ⏻) to see incoming messages and mark them as read.

---

### Operator image gallery & live presentation

The Operator gets an extra **Gallery** tab (only visible when the character's role is **Operator**) for showing visuals at the table — art, maps, NPC portraits, Matrix code stills.

| Step | Who | What happens |
|------|-----|--------------|
| Upload | Operator | Images are downscaled and **saved in this browser's local storage only** — they are never uploaded anywhere, and never bloat the exported character JSON. |
| Project | Operator | Click any thumbnail (or **Present**) for a full-screen view with a thematic Matrix reveal. ← / → navigate, **Esc** closes. |
| Share with crew | Operator | The **📡 Share with crew** toggle in the projector pushes the current image live to crew on the same hovership. Navigating while live updates what crew see. |
| Tap to view | Crew | A floating *"<Operator> is sharing an image — tap to view"* notice appears on any tab. Tapping opens it full-screen; it updates live and closes automatically when the Operator stops. |

**The shared image is ephemeral.** It's sent as a small (~150 KB) copy to a self-deleting Realtime Database node and is removed the instant the Operator stops sharing, closes the projector, or disconnects. Nothing is stored long-term, so this stays comfortably within Firebase's free tier and never uses Firebase Storage. Sharing requires Firebase to be configured; without it, the projector still works locally (it shows *offline · local only*).

---

### Securing your database (do this before deploying publicly)

> ⚠️ **Do not deploy a public site with open (`".read": true, ".write": true`) rules.** Your `databaseURL` ships in the public JS bundle, and open Firebase databases are actively scanned by bots. With open write access, anyone could inject chat messages, **push arbitrary images onto your players' screens via the live presentation feature**, or write huge payloads to run up your bill. The ephemeral nature of presentations does **not** prevent this — it only controls how long data persists, not who can write it.
>
> Your `apiKey` being public is fine — it's an identifier, not a secret. Access is controlled by the three layers below.

#### Layer 1 — Anonymous Authentication (**required**)

The app signs every player in anonymously (no login screen) so the rules can require `auth != null`. **You must enable this provider or Comms will not connect:**

1. Firebase console → **Build → Authentication → Get started**
2. **Sign-in method** tab → enable **Anonymous**

If this is off, the app shows *"Comms sign-in failed — enable Anonymous Authentication…"* and no messages or presentations sync.

#### Layer 2 — Locked security rules with size limits

In **Realtime Database → Rules**, replace the open test-mode rules with these. They require authentication and cap payload sizes (which is what actually defends against giant-payload / denial-of-wallet abuse):

```json
{
  "rules": {
    "matrix-rpg": {
      "messages": {
        ".read": "auth != null",
        "$msgId": {
          ".write": "auth != null",
          ".validate": "newData.child('body').isString() && newData.child('body').val().length <= 600"
        }
      },
      "sessions": {
        ".read": "auth != null",
        "$charId": { ".write": "auth != null" }
      },
      "presentations": {
        ".read": "auth != null",
        "$charId": {
          ".write": "auth != null",
          ".validate": "newData.child('dataUrl').isString() && newData.child('dataUrl').val().length <= 400000"
        }
      }
    }
  }
}
```

> **All three paths must be present.**
> - `sessions` is how the Operator's console discovers crew on other devices — if missing, the crew list stays empty.
> - `presentations` is how the live image share reaches crew — if missing, the "tap to view" notice never appears.
> - The `dataUrl` length cap (~400 KB) bounds how big a shared image can be, so nobody can write a multi-megabyte payload. The app also re-compresses shared images to ~150 KB and **only renders genuine `data:image/...` URLs**, ignoring any spoofed node.

#### Layer 3 — App Check (recommended)

App Check (reCAPTCHA v3) attests that requests come from *your* real deployed app, not a script hitting the database directly — the strongest anti-abuse short of per-user accounts.

1. Create a **reCAPTCHA v3** key at the [reCAPTCHA admin console](https://www.google.com/recaptcha/admin) for your domain
2. Firebase console → **Build → App Check** → register your Web app with the reCAPTCHA v3 provider (paste the **secret** here)
3. Put the reCAPTCHA **site key** in `src/firebase-config.ts` → `recaptchaSiteKey`, then rebuild
4. Once it's reporting verified requests, turn on **Enforce** for Realtime Database in the App Check console

> Leave `recaptchaSiteKey` empty to skip App Check — Layers 1 and 2 still apply. For local `npm run dev`, you can set `self.FIREBASE_APPCHECK_DEBUG_TOKEN = true` in the console and register the printed debug token, or just leave the site key empty during development.

#### Layer 4 — Set a billing cap

Even with the above, set a **budget alert** (and ideally a hard cap) in [Google Cloud Billing](https://console.cloud.google.com/billing) → **Budgets & alerts** so an unexpected spike can never surprise you. For a small group this app stays comfortably within the **free Spark tier** regardless.

See the [Firebase Security Rules docs](https://firebase.google.com/docs/database/security) for going further (e.g. per-user / per-game scoping with real accounts).

---

### Data stored in Firebase

Only three paths are ever written to Firebase:

- `matrix-rpg/messages` — chat between Operator and crew
- `matrix-rpg/sessions` — active character presence (so the Operator's console can list crew)
- `matrix-rpg/presentations` — the **currently shared** gallery image, as a small temporary copy. This node auto-deletes the moment the Operator stops sharing or disconnects, so it is never persisted.

Character sheets, the image gallery itself, NFT bookmarks, and all other data remain in the player's local browser storage and are never sent to any server.
