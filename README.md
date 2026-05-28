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

### Firebase Security Rules (before going public)

Test mode allows anyone with your database URL to read and write. For a private game group, restrict access by switching to these rules in the Firebase console under **Realtime Database → Rules**:

```json
{
  "rules": {
    "matrix-rpg": {
      "messages": {
        ".read": true,
        ".write": true
      },
      "sessions": {
        ".read": true,
        ".write": true
      }
    }
  }
}
```

> **Important:** both `messages` and `sessions` must be in the rules. `sessions` is how the Operator's console discovers crew members on other devices. If `sessions` is missing, the Operator's crew list stays empty.

For production, add authentication and restrict by user. See the [Firebase Security Rules docs](https://firebase.google.com/docs/database/security) for details.

---

### Data stored in Firebase

Only `matrix-rpg/messages` (chat) and `matrix-rpg/sessions` (active character presence) are written to Firebase. Character sheets, NFT bookmarks, and all other data remain in the player's local browser storage and are never sent to any server.
