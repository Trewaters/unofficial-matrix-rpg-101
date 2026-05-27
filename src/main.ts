import './styles.css'
import '@shoelace-style/shoelace/dist/themes/dark.css'
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js'
import { animateCurrentView, setupInteractiveAnimations } from './animations.js'
import { SKILLS, CATEGORY_ORDER } from './skills.js'
import { FEATS } from './feats.js'
import { REAL_WORLD_GEAR, MATRIX_GEAR, VEHICLES_ALL, CONTACT_ROLES, GearCategory } from './gear.js'
import { PATHS, AFFILIATIONS, ORIGINS, SHIP_TYPES } from './identityData.js'
import { firebaseConfig } from './firebase-config.js'
import { initializeApp } from 'firebase/app'
import { getDatabase, ref as fbRef, set as fbSet, remove as fbRemove, onDisconnect, onChildAdded, onChildChanged, onChildRemoved, onValue } from 'firebase/database'

setBasePath('./shoelace/assets')

// ── Firebase init ────────────────────────────────────────────────────────────
const FIREBASE_ENABLED = Boolean(firebaseConfig.apiKey && firebaseConfig.databaseURL)
let fbDb: ReturnType<typeof getDatabase> | null = null

if (FIREBASE_ENABLED) {
  const app = initializeApp(firebaseConfig)
  fbDb = getDatabase(app)
}

const STORAGE_KEY = 'matrix-rpg-characters-v1'
const validRoutes = ['home', 'learn', 'jack-in'];
const sheetTabs = ['identity', 'abilities', 'skills', 'loadout', 'notes', 'comms'];

const attributeOptions = ['Common Sense', 'Focus', 'Agility', 'Strength', 'Endurance', 'CyberZen'];
const damageLevels = ['None', 'Light', 'Moderate', 'Serious', 'Critical', 'Incapacitated', 'Dead'];
const roleOptions = ['RSI Hacker', 'Operator', 'Pilot', 'Captain', 'Crew', 'Nomad', 'Surface Human'];
const downloadOptions = ['None', 'Temporary', 'Permanent'];

const NFT_API_KEY_STORE = 'matrix-rpg-opensea-key-v1'

interface NftItem {
  identifier: string
  contract?: string
  name?: string
  image_url?: string
  display_image_url?: string
  opensea_url?: string
  _filter: 'red' | 'blue' | 'base' | 'contract'
  _chain?: string
}

interface BookmarkedNft extends NftItem {
  bookmarkedAt: string
}

const NFT_COLLECTIONS = [
  { slug: 'the-matrix-avatars-red-polygon', chain: 'polygon', filter: 'red' as const, label: 'Red Pill' },
  { slug: 'the-matrix-avatars-blue-polygon', chain: 'polygon', filter: 'blue' as const, label: 'Blue Pill' },
  { slug: 'the-matrix-avatars', chain: 'ethereum', filter: 'base' as const, label: 'Base Avatar' },
]

const CONTRACT_TO_FILTER: Record<string, NftItem['_filter']> = {
  '0xc37d61ad831dbc979469dc48a7f55141e2e27f03': 'red',
  '0xcc16d5f112d2d6b7d4572eb191a59f22aaf87d02': 'blue',
  '0x495f947276749ce646f68ac8c248420045cb7b5e': 'base',
}

const NFT_BOOKMARKS_KEY = 'matrix-rpg-nft-bookmarks-v1'
const MESSAGES_KEY = 'matrix-rpg-messages-v1'

interface PhoneMessage {
  id: string
  from: string          // display handle
  fromCharId?: string   // character id of sender (for crew reply tracking)
  to: string            // characterId | '__all__' | '__operator__'
  shipName: string      // homeShip of sender — scopes message to that ship's crew
  body: string
  sentAt: string
  readBy: string[]      // characterIds that have read it
}

interface SessionChar {
  id: string
  profileName: string
  callSign: string
  role: string
  homeShip: string
  phoneOn: boolean
  lastSeen: number  // Date.now() ms
}

function loadNftApiKey(): string {
  return localStorage.getItem(NFT_API_KEY_STORE) || ''
}

function saveNftApiKey(key: string): void {
  if (key) localStorage.setItem(NFT_API_KEY_STORE, key)
  else localStorage.removeItem(NFT_API_KEY_STORE)
}

function loadBookmarks(): BookmarkedNft[] {
  try { return JSON.parse(localStorage.getItem(NFT_BOOKMARKS_KEY) || '[]') } catch { return [] }
}

function saveBookmarks(): void {
  localStorage.setItem(NFT_BOOKMARKS_KEY, JSON.stringify(state.nftBookmarks))
}

function loadMessages(): PhoneMessage[] {
  try { return JSON.parse(localStorage.getItem(MESSAGES_KEY) || '[]') } catch { return [] }
}

function saveMessages(): void {
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(state.messages))
  syncCharacterLogs()
}

function syncCharacterLogs(): void {
  let changed = false
  state.characters = state.characters.map(char => {
    const ship = char.homeShip || ''
    const relevant = state.messages.filter(msg => {
      if ((msg.shipName || '') !== ship) return false
      if (char.role === 'Operator') return true
      return msg.to === '__all__' || msg.to === char.id || msg.fromCharId === char.id
    })
    const log: PhoneMessage[] = char.messageLog || []
    const newMsgs = relevant.filter(msg => !log.find(m => m.id === msg.id))
    if (!newMsgs.length) return char
    changed = true
    return { ...char, messageLog: [...log, ...newMsgs] }
  })
  if (changed) persistCharacters(state.characters)
}

function nftKey(nft: NftItem): string {
  return `${nft.contract || ''}:${nft.identifier}`
}

function isBookmarked(nft: NftItem): boolean {
  return state.nftBookmarks.some(b => nftKey(b) === nftKey(nft))
}

function isOperatorChar(charId: string): boolean {
  return state.characters.find(c => c.id === charId)?.role === 'Operator'
}

function getMessagesForCharacter(charId: string): PhoneMessage[] {
  const char = state.characters.find(c => c.id === charId)
  const ship = char?.homeShip || ''
  if (isOperatorChar(charId)) {
    return state.messages.filter(m =>
      (m.to === '__operator__' || m.to === charId) && (m.shipName || '') === ship
    )
  }
  return state.messages.filter(m =>
    (m.to === '__all__' || m.to === charId) && (m.shipName || '') === ship
  )
}

function getUnreadCount(charId: string): number {
  return getMessagesForCharacter(charId).filter(m => !m.readBy.includes(charId)).length
}

function markMessagesRead(charId: string): void {
  let changed = false
  const isOp = isOperatorChar(charId)
  state.messages = state.messages.map(m => {
    const relevant = isOp
      ? (m.to === '__operator__' || m.to === charId)
      : (m.to === '__all__' || m.to === charId)
    if (relevant && !m.readBy.includes(charId)) {
      changed = true
      return { ...m, readBy: [...m.readBy, charId] }
    }
    return m
  })
  if (changed) saveMessages()
}

function sendMessage(from: string, fromCharId: string | undefined, to: string, body: string, shipName = ''): void {
  const msg: PhoneMessage = {
    id: `msg-${Date.now()}-${Math.random().toString(16).slice(2, 6)}`,
    from,
    fromCharId,
    to,
    shipName,
    body,
    sentAt: new Date().toISOString(),
    readBy: [],
  }

  if (FIREBASE_ENABLED && fbDb) {
    // Optimistically add to local state so the sender sees it immediately
    state.messages = [...state.messages, msg]
    render()
    // Write to Firebase — all connected clients receive it via onChildAdded
    fbSet(fbRef(fbDb, `matrix-rpg/messages/${msg.id}`), {
      ...msg,
      readBy: {},   // Firebase stores readBy as an object, not an array
    }).catch((err: any) => {
      console.error('Firebase write failed:', err)
      state.status = 'Transmission failed — check your connection.'
      render()
    })
    saveMessages() // cache locally too
  } else {
    // Local-only fallback
    state.messages = [...state.messages, msg]
    saveMessages()
    render()
  }
}

function registerSession(character: any): void {
  if (!FIREBASE_ENABLED || !fbDb) return
  const session: SessionChar = {
    id: character.id,
    profileName: character.profileName || 'Unknown',
    callSign: character.callSign || '',
    role: character.role || '',
    homeShip: character.homeShip || '',
    phoneOn: state.phoneOn,
    lastSeen: Date.now(),
  }
  const sessionRef = fbRef(fbDb, `matrix-rpg/sessions/${character.id}`)
  // Remove this session from Firebase automatically when the browser disconnects
  onDisconnect(sessionRef).remove()
  fbSet(sessionRef, session)
    .catch((err: any) => {
      console.error('Session register failed:', err)
      if (String(err).includes('PERMISSION_DENIED')) {
        state.status = 'Firebase rules block sessions — add "sessions" to your Realtime Database rules (see README).'
        render()
      }
    })
}

function toggleBookmark(nft: NftItem): void {
  const key = nftKey(nft)
  const idx = state.nftBookmarks.findIndex(b => nftKey(b) === key)
  if (idx >= 0) {
    state.nftBookmarks = [...state.nftBookmarks.slice(0, idx), ...state.nftBookmarks.slice(idx + 1)]
  } else {
    state.nftBookmarks = [...state.nftBookmarks, { ...nft, bookmarkedAt: new Date().toISOString() }]
  }
  saveBookmarks()
  render()
}

function uid() {
  return `char-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

function createSkill() {
  return {
    id: uid(),
    name: '',
    rating: 0,
    attribute: 'Agility',
    specialization: '',
    downloadType: 'None',
    notes: '',
  };
}

function createFeat() {
  return {
    id: uid(),
    name: '',
    rating: 0,
    notes: '',
  };
}

function createCharacter() {
  return {
    id: uid(),
    profileName: 'New Redpill',
    callSign: '',
    realName: '',
    path: '',
    role: 'RSI Hacker',
    affiliation: 'Zion Resistance',
    homeShip: '',
    origin: '',
    redPillChoice: 'Red Pill',
    background: '',
    motivation: '',
    appearance: '',
    notes: '',
    attributes: {
      commonSense: 1,
      focus: 1,
      agility: 1,
      strength: 1,
      endurance: 1,
      cyberZen: 0,
      giftUnlocked: false,
    },
    damage: 'None',
    experience: 0,
    karma: 0,
    hardlines: 1,
    matrixFeats: [createFeat()],
    skills: Array.from({ length: 6 }, () => createSkill()),
    gear: {
      realWorld: '',
      matrixLoadout: '',
      contacts: '',
      vehicles: '',
      hardlineNotes: '',
    },
    nft: {
      walletAddress: '',
      collectionNotes: '',
    },
    messageLog: [] as PhoneMessage[],
    updatedAt: new Date().toISOString(),
  };
}

function hydrateCharacter(raw = {}) {
  const base = createCharacter();

  return {
    ...base,
    ...raw,
    id: raw.id || base.id,
    profileName: raw.profileName || base.profileName,
    attributes: {
      ...base.attributes,
      ...raw.attributes,
    },
    gear: {
      ...base.gear,
      ...raw.gear,
    },
    nft: {
      ...base.nft,
      ...raw.nft,
    },
    skills: Array.isArray(raw.skills) && raw.skills.length
      ? raw.skills.map((skill) => ({ ...createSkill(), ...skill, id: skill.id || uid() }))
      : base.skills,
    matrixFeats: Array.isArray(raw.matrixFeats) && raw.matrixFeats.length
      ? raw.matrixFeats.map((feat) => ({ ...createFeat(), ...feat, id: feat.id || uid() }))
      : base.matrixFeats,
    messageLog: Array.isArray(raw.messageLog) ? raw.messageLog : [],
    updatedAt: raw.updatedAt || base.updatedAt,
  };
}

function getRouteFromHash() {
  const route = window.location.hash.replace('#', '') || 'home';
  return validRoutes.includes(route) ? route : 'home';
}

function loadCharacters() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const starter = createCharacter();
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify([starter]));
      return [starter];
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || !parsed.length) {
      return [createCharacter()];
    }

    return parsed.map((entry) => hydrateCharacter(entry));
  } catch {
    return [createCharacter()];
  }
}

function persistCharacters(characters) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(characters));
}

const state = {
  characters: loadCharacters(),
  selectedId: null as string | null,
  status: 'Local storage ready.',
  route: getRouteFromHash(),
  sheetTab: 'identity',
  nftLoading: false,
  nftItems: [] as NftItem[],
  nftError: null as string | null,
  nftFilter: 'all',
  nftMode: 'wallet' as 'wallet' | 'contract' | 'bookmarks',
  nftContractItems: [] as NftItem[],
  nftContractNext: null as string | null,
  nftContractAddress: '',
  nftBookmarks: loadBookmarks(),
  phoneOn: false,
  messages: loadMessages(),
  firebaseConnected: false,
  sessionChars: {} as Record<string, SessionChar>,
};

state.selectedId = state.characters[0]?.id ?? null;

window.addEventListener('hashchange', () => {
  const route = getRouteFromHash();
  if (route !== state.route) {
    state.route = route;
    render();
  }
});

// Batch rapid Firebase callbacks into one render frame
let _fbRenderScheduled = false
function scheduleRender(scrollPhone = false) {
  if (!_fbRenderScheduled) {
    _fbRenderScheduled = true
    requestAnimationFrame(() => {
      _fbRenderScheduled = false
      render()
      if (scrollPhone && state.phoneOn) {
        const screen = document.getElementById('phone-screen')
        if (screen) screen.scrollTop = screen.scrollHeight
      }
    })
  }
}

if (FIREBASE_ENABLED && fbDb) {
  // Watch connection state
  onValue(fbRef(fbDb, '.info/connected'), (snap) => {
    state.firebaseConnected = snap.val() === true
    render()
  })

  // Listen for all messages — fires for existing ones on connect, then new ones live
  onChildAdded(fbRef(fbDb, 'matrix-rpg/messages'), (snap) => {
    const data = snap.val()
    if (!data) return
    const readBy: string[] = data.readBy ? Object.keys(data.readBy) : []
    const msg: PhoneMessage = { ...data, id: snap.key!, readBy }
    if (!state.messages.find(m => m.id === msg.id)) {
      state.messages = [...state.messages, msg]
      saveMessages() // keep a local cache so offline reads still work
      scheduleRender(state.sheetTab === 'comms')
    }
  })

  // Track which characters are active across browsers (for Operator crew list)
  const sessionErrorCallback = (err: Error) => {
    console.error('Sessions listener denied:', err)
    state.status = 'Firebase rules block sessions — add "sessions" to your Realtime Database rules (see README).'
    render()
  }
  onChildAdded(fbRef(fbDb, 'matrix-rpg/sessions'), (snap) => {
    if (snap.key && snap.val()) {
      state.sessionChars[snap.key] = snap.val() as SessionChar
      scheduleRender()
    }
  }, sessionErrorCallback)
  onChildChanged(fbRef(fbDb, 'matrix-rpg/sessions'), (snap) => {
    if (snap.key && snap.val()) {
      state.sessionChars[snap.key] = snap.val() as SessionChar
      scheduleRender()
    }
  }, sessionErrorCallback)
  onChildRemoved(fbRef(fbDb, 'matrix-rpg/sessions'), (snap) => {
    if (snap.key) {
      delete state.sessionChars[snap.key]
      scheduleRender()
    }
  }, sessionErrorCallback)
} else {
  // Same-browser-tab fallback (no Firebase configured)
  window.addEventListener('storage', (e) => {
    if (e.key === MESSAGES_KEY) {
      state.messages = loadMessages()
      scheduleRender(state.sheetTab === 'comms')
    }
    if (e.key === STORAGE_KEY) {
      state.characters = loadCharacters()
      render()
    }
  })
}

function getSelectedCharacter() {
  return state.characters.find((character) => character.id === state.selectedId) ?? state.characters[0];
}

function setStatus(message) {
  state.status = message;
}

function setRoute(route, options = {}) {
  if (!validRoutes.includes(route)) {
    return;
  }

  state.route = route;

  if (options.sheetTab && sheetTabs.includes(options.sheetTab)) {
    state.sheetTab = options.sheetTab;
  }

  if (window.location.hash !== `#${route}`) {
    window.location.hash = route;
  }

  render();
}

function setSheetTab(tab) {
  if (!sheetTabs.includes(tab)) {
    return;
  }

  state.sheetTab = tab;

  if (tab === 'comms') {
    registerSession(getSelectedCharacter())
  }

  render();
}

function updateSelectedCharacter(updater, shouldRender = true) {
  state.characters = state.characters.map((character) => {
    if (character.id !== state.selectedId) {
      return character;
    }

    const nextCharacter = updater(structuredClone(character));
    nextCharacter.updatedAt = new Date().toISOString();
    return hydrateCharacter(nextCharacter);
  });

  persistCharacters(state.characters);
  
  if (shouldRender) {
    render();
  }
}

function createLabeledInput({ label, name, value, type = 'text', placeholder = '', min = 0, max = 99 }) {
  return `
    <label class="field">
      <span>${label}</span>
      <input data-field="${name}" type="${type}" value="${escapeHtml(String(value ?? ''))}" placeholder="${escapeHtml(placeholder)}" ${type === 'number' ? `min="${min}" max="${max}"` : ''} />
    </label>
  `;
}

function createFeatNameField(featId: string, value: string): string {
  return `
    <div class="skill-name-wrapper">
      <label class="field">
        <span>Feat Name</span>
        <input data-field="feat.name.${featId}" type="text" value="${escapeHtml(value)}" placeholder="Flight, Telepathy, Heal..." autocomplete="off" />
      </label>
      <div class="skill-suggestions" hidden data-feat-suggestions="${featId}"></div>
    </div>
  `
}

function createSkillNameField(skillId: string, value: string): string {
  return `
    <div class="skill-name-wrapper">
      <label class="field">
        <span>Skill Name</span>
        <input data-field="skill.name.${skillId}" type="text" value="${escapeHtml(value)}" placeholder="Martial Arts, Programming..." autocomplete="off" />
      </label>
      <div class="skill-suggestions" hidden data-skill-suggestions="${skillId}"></div>
    </div>
  `;
}

function createSimpleSuggestField(
  { label, name, value, placeholder = '' }:
  { label: string; name: string; value: string; placeholder?: string }
): string {
  return `
    <div class="skill-name-wrapper">
      <label class="field">
        <span>${label}</span>
        <input data-field="${name}" type="text" value="${escapeHtml(value)}" placeholder="${escapeHtml(placeholder)}" autocomplete="off" />
      </label>
      <div class="skill-suggestions" hidden data-simple-suggestions="${name}"></div>
    </div>
  `
}

function createGearTextareaField(
  { label, name, value, placeholder = '', rows = 4 }:
  { label: string; name: string; value: string; placeholder?: string; rows?: number }
): string {
  const panelKey = name.split('.').pop()!
  return `
    <div class="gear-picker-wrapper">
      <label class="field field-textarea">
        <span>${label}</span>
        <textarea data-field="${name}" rows="${rows}" placeholder="${escapeHtml(placeholder)}">${escapeHtml(value ?? '')}</textarea>
      </label>
      <div class="gear-picker-bar">
        <button class="gear-add-btn" type="button" data-gear-add="${panelKey}">+ Add from list</button>
        <div class="skill-suggestions" hidden data-gear-panel="${panelKey}"></div>
      </div>
    </div>
  `
}

function createLabeledTextarea({ label, name, value, placeholder = '', rows = 4 }) {
  return `
    <label class="field field-textarea">
      <span>${label}</span>
      <textarea data-field="${name}" rows="${rows}" placeholder="${escapeHtml(placeholder)}">${escapeHtml(value ?? '')}</textarea>
    </label>
  `;
}

function createLabeledSelect({ label, name, value, options }) {
  return `
    <label class="field">
      <span>${label}</span>
      <select data-field="${name}">
        ${options
          .map((option) => `<option value="${escapeHtml(option)}" ${option === value ? 'selected' : ''}>${escapeHtml(option)}</option>`)
          .join('')}
      </select>
    </label>
  `;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function computeDownloadSlots(character) {
  const cyberZen = Number(character.attributes.cyberZen) || 0;
  const maxSlots = cyberZen * 3;
  const permanentSlots = Math.floor(maxSlots / 3);
  const temporarySlots = maxSlots - permanentSlots;
  const permanentUsed = character.skills.filter((skill) => skill.downloadType === 'Permanent').length;
  const temporaryUsed = character.skills.filter((skill) => skill.downloadType === 'Temporary').length;

  return {
    maxSlots,
    permanentSlots,
    temporarySlots,
    permanentUsed,
    temporaryUsed,
  };
}

function exportCharacter(character) {
  const blob = new Blob([JSON.stringify(character, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${(character.profileName || 'matrix-character').replace(/\s+/g, '-').toLowerCase()}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

function renderRouteLinks() {
  return validRoutes
    .map((route) => {
      const label = route === 'jack-in' ? 'Jack In' : route[0].toUpperCase() + route.slice(1);
      return `<button class="route-link ${state.route === route ? 'is-active' : ''}" data-route="${route}">${label}</button>`;
    })
    .join('');
}

function renderHomeView(character) {
  return `
    <section class="hero-panel hero-view">
      <div class="hero-grid hero-grid-home">
        <section class="hero-copy">
          <p class="eyebrow">Wake up. Choose your path.</p>
          <h1>Start in the construct. Learn the world. Then jack in.</h1>
          <div class="hero-cta-row">
            <button class="pill-button red-pill" data-route="jack-in" data-sheet-tab="identity">Take The Red Pill</button>
            <button class="pill-button blue-pill" data-route="learn">Take The Blue Pill</button>
          </div>
        </section>

        <aside class="choice-panel">
          <article class="choice-card choice-card-red interactive-card">
            <p class="eyebrow">Play</p>
            <h2>Build your operative</h2>
            <p>Split the character sheet into guided tabs: identity, abilities, skills, loadout, and mission notes.</p>
            <button class="ghost-button" data-route="jack-in" data-sheet-tab="identity">Open Character Builder</button>
          </article>
          <article class="choice-card choice-card-blue interactive-card">
            <p class="eyebrow">Learn</p>
            <h2>Read the signal</h2>
            <p>Players can read the fast-start summary before they start filling fields or making choices.</p>
            <button class="ghost-button" data-route="learn">Open Learn View</button>
          </article>
        </aside>
      </div>
    </section>

    <section class="summary-grid">
      <article class="summary-card">
        <p class="eyebrow">Current Operative</p>
        <h3>${escapeHtml(character.profileName || 'Unnamed Character')}</h3>
        <p>${escapeHtml(character.role)} aligned with ${escapeHtml(character.affiliation || 'no faction yet')}.</p>
      </article>
      <article class="summary-card">
        <p class="eyebrow">Local Save</p>
        <h3>${state.characters.length} stored sheet${state.characters.length === 1 ? '' : 's'}</h3>
        <p>Characters persist on this device and can be exported as JSON when you need backups or transfers.</p>
      </article>
      <article class="summary-card">
        <p class="eyebrow">Future Hook</p>
        <h3>ETH NFT ready later</h3>
        <p>The saved character schema still carries wallet and collection notes for a future read-only Matrix NFT viewer.</p>
      </article>
    </section>

    <section class="mission-grid">
      <article class="mission-card">
        <p class="eyebrow">Step 1</p>
        <h3>Choose the pill</h3>
        <p>Guide new players to Learn or Jack In instead of forcing them through the entire site immediately.</p>
      </article>
      <article class="mission-card">
        <p class="eyebrow">Step 2</p>
        <h3>Build in stages</h3>
        <p>Identity and attributes happen first, then Matrix powers, then equipment and session notes.</p>
      </article>
      <article class="mission-card">
        <p class="eyebrow">Step 3</p>
        <h3>Save and return</h3>
        <p>Players can keep updating the same operative across sessions without needing a separate account system.</p>
      </article>
    </section>
  `;
}

function renderLearnView() {
  return `
    <section class="view-heading">
      <div>
        <p class="eyebrow">Learn The Rules</p>
        <h1>Fast table reference for players</h1>
      </div>
      <p class="status-line">${escapeHtml(state.status)}</p>
    </section>

    <section class="learn-grid">
      <article class="learn-card">
        <h3>Core Premise</h3>
        <p>Your crew moves between the real world and the Matrix, identifies people ready to question reality, and offers them a choice to wake up.</p>
      </article>
      <article class="learn-card">
        <h3>Attributes</h3>
        <p>Common Sense, Focus, Agility, Strength, and Endurance drive human action. RSI hackers may also grow CyberZen and eventually awaken the Gift.</p>
      </article>
      <article class="learn-card">
        <h3>Skills And Feats</h3>
        <p>Standard skills pair with an attribute. Matrix feats sit apart and let characters bend or break simulation rules through CyberZen.</p>
      </article>
      <article class="learn-card">
        <h3>Damage</h3>
        <p>Wounds escalate from None to Dead, and each wound tier makes actions harder. That is why the builder keeps damage visible in the abilities tab.</p>
      </article>
      <article class="learn-card">
        <h3>Downloaded Skills</h3>
        <p>CyberZen defines how many temporary and permanent downloads an RSI can carry, so the builder calculates those slot totals for the player.</p>
      </article>
      <article class="learn-card">
        <h3>Hardlines</h3>
        <p>Operators secure exit points into and out of the Matrix. Those mission-critical notes sit with the loadout tab instead of being buried in the full sheet.</p>
      </article>
    </section>

    <section class="timeline-card">
      <div class="timeline-step">
        <strong>Find the target</strong>
        <p>Use signals, traps, and intuition to locate people who are ready to see the world for what it is.</p>
      </div>
      <div class="timeline-step">
        <strong>Offer the choice</strong>
        <p>Red pill or blue pill is part of the fiction, and now also part of the onboarding structure in the app.</p>
      </div>
      <div class="timeline-step">
        <strong>Prepare the mission</strong>
        <p>Secure hardlines, assign downloaded skills, pack loadouts, and move the crew into the construct.</p>
      </div>
      <div class="timeline-step">
        <strong>Track the fallout</strong>
        <p>Damage, experience, karma, and session notes all stay with the operative for the next game.</p>
      </div>
    </section>

    <section class="action-banner">
      <div>
        <p class="eyebrow">Next Move</p>
        <h2>Ready to build an operative?</h2>
      </div>
      <button class="pill-button red-pill" data-route="jack-in" data-sheet-tab="identity">Open The Builder</button>
    </section>
  `;
}

function renderRoster(character) {
  return `
    <aside class="save-rail">
      <div class="save-rail-header">
        <div>
          <p class="eyebrow">Crew Roster</p>
          <h2>Saved Characters</h2>
        </div>
        <button class="ghost-button" data-action="new-character">New Sheet</button>
      </div>

      <div class="roster-list">
        ${state.characters
          .map(
            (entry) => `
              <button class="roster-card ${entry.id === character.id ? 'is-active' : ''}" data-character-id="${entry.id}">
                <strong>${escapeHtml(entry.profileName || 'Unnamed Character')}</strong>
                <span>${escapeHtml(entry.role || 'Unassigned')}</span>
                <small>${new Date(entry.updatedAt).toLocaleString()}</small>
              </button>
            `,
          )
          .join('')}
      </div>

      <div class="save-actions">
        <button class="solid-button" data-action="save-status">Save Locally</button>
        <button class="ghost-button" data-action="export-character">Export JSON</button>
        <label class="ghost-button import-label">
          <input type="file" id="import-json" accept="application/json" hidden />
          Import JSON
        </label>
        <button class="danger-button" data-action="delete-character">Delete</button>
      </div>
    </aside>
  `;
}

function renderSheetTabs() {
  const character = getSelectedCharacter()
  const unread = getUnreadCount(character.id)
  const tabLabels: Record<string, string> = {
    identity: 'Identity',
    abilities: 'Abilities',
    skills: 'Skills',
    loadout: 'Loadout',
    notes: 'Notes',
    comms: `Comms${!state.phoneOn && unread > 0 ? ` <span class="tab-badge">${unread}</span>` : ''}`,
  }

  return sheetTabs
    .map(
      (tab) => `<button class="sheet-tab ${state.sheetTab === tab ? 'is-active' : ''}" data-sheet-tab="${tab}">${tabLabels[tab]}</button>`,
    )
    .join('')
}

function renderIdentityTab(character) {
  return `
    <section class="sheet-card sheet-card-wide">
      <h3>Identity</h3>
      <div class="field-grid two-up">
        ${createLabeledInput({ label: 'Profile Name', name: 'profileName', value: character.profileName, placeholder: 'Neo, Switch, Ghost...' })}
        ${createLabeledInput({ label: 'Call Sign', name: 'callSign', value: character.callSign, placeholder: 'Operator tag or street handle' })}
        ${createLabeledInput({ label: 'Real Name', name: 'realName', value: character.realName })}
        ${createSimpleSuggestField({ label: 'Path', name: 'path', value: character.path, placeholder: 'RSI Hacker, Mercenary, Punksmith...' })}
        ${createLabeledSelect({ label: 'Role', name: 'role', value: character.role, options: roleOptions })}
        ${createSimpleSuggestField({ label: 'Affiliation', name: 'affiliation', value: character.affiliation, placeholder: 'Zion Resistance, Crystal Shard...' })}
        ${createSimpleSuggestField({ label: 'Hovership / Crew', name: 'homeShip', value: character.homeShip, placeholder: 'Speeder Hovercraft, Nomad Hovercraft...' })}
        ${createSimpleSuggestField({ label: 'Origin', name: 'origin', value: character.origin, placeholder: 'Pod-born, Surface-born, Freeborn...' })}
        ${createLabeledSelect({ label: 'Choice', name: 'redPillChoice', value: character.redPillChoice, options: ['Red Pill', 'Blue Pill', 'Still Deciding'] })}
        ${createLabeledInput({ label: 'Motivation', name: 'motivation', value: character.motivation, placeholder: 'Why do they keep fighting?' })}
      </div>
      <div class="field-grid">
        ${createLabeledTextarea({ label: 'Background', name: 'background', value: character.background, rows: 5, placeholder: 'How did this character end up here?' })}
        ${createLabeledTextarea({ label: 'Appearance / RSI Notes', name: 'appearance', value: character.appearance, rows: 4, placeholder: 'Residual self image, style, tells...' })}
      </div>
    </section>
  `;
}

function renderAbilitiesTab(character, slots) {
  return `
    <section class="summary-grid builder-summary-grid">
      <article class="summary-card">
        <p class="eyebrow">Damage</p>
        <h3>${escapeHtml(character.damage)}</h3>
        <p>Current wound state for threshold tracking at the table.</p>
      </article>
      <article class="summary-card">
        <p class="eyebrow">Downloads</p>
        <h3>${slots.maxSlots} total slots</h3>
        <p>${slots.permanentUsed}/${slots.permanentSlots} permanent and ${slots.temporaryUsed}/${slots.temporarySlots} temporary slots in use.</p>
      </article>
      <article class="summary-card">
        <p class="eyebrow">Hardlines</p>
        <h3>${character.hardlines}</h3>
        <p>Secured connections ready for extraction, equipment, or emergency exit.</p>
      </article>
    </section>

    <section class="sheet-card sheet-card-wide">
      <h3>Attributes And Tracks</h3>
      <div class="attribute-grid">
        ${[
          ['commonSense', 'Common Sense'],
          ['focus', 'Focus'],
          ['agility', 'Agility'],
          ['strength', 'Strength'],
          ['endurance', 'Endurance'],
          ['cyberZen', 'CyberZen'],
        ]
          .map(
            ([key, label]) => `
              <label class="attribute-tile">
                <span>${label}</span>
                <input data-attribute="${key}" type="number" min="0" max="6" value="${character.attributes[key]}" />
              </label>
            `,
          )
          .join('')}
      </div>

      <div class="field-grid four-up compact-grid">
        ${createLabeledSelect({ label: 'Damage', name: 'damage', value: character.damage, options: damageLevels })}
        ${createLabeledInput({ label: 'Experience', name: 'experience', value: character.experience, type: 'number', min: 0, max: 999 })}
        ${createLabeledInput({ label: 'Karma', name: 'karma', value: character.karma, type: 'number', min: 0, max: 999 })}
        ${createLabeledInput({ label: 'Secured Hardlines', name: 'hardlines', value: character.hardlines, type: 'number', min: 0, max: 20 })}
      </div>

      <label class="toggle-row">
        <input data-attribute-toggle="giftUnlocked" type="checkbox" ${character.attributes.giftUnlocked ? 'checked' : ''} />
        <span>The Gift is unlocked</span>
      </label>
    </section>
  `;
}

function renderSkillsTab(character) {
  return `
    <section class="sheet-card sheet-card-wide">
      <div class="section-heading-with-action">
        <h3>Skills</h3>
        <button class="ghost-button" data-action="add-skill">Add Skill</button>
      </div>
      <div class="repeatable-list">
        ${character.skills
          .map(
            (skill, index) => {
              const knownDescription = SKILLS.find(s => s.name === skill.name)?.description ?? ''
              return `
              <article class="repeatable-card">
                <div class="repeatable-head">
                  <strong>Skill ${index + 1}</strong>
                  <button class="mini-button" data-remove-skill="${skill.id}">Remove</button>
                </div>
                <div class="field-grid four-up compact-grid">
                  ${createSkillNameField(skill.id, skill.name)}
                  ${createLabeledInput({ label: 'Rating', name: `skill.rating.${skill.id}`, value: skill.rating, type: 'number', min: 0, max: 6 })}
                  ${createLabeledSelect({ label: 'Default Attribute', name: `skill.attribute.${skill.id}`, value: skill.attribute, options: attributeOptions })}
                  ${createLabeledInput({ label: 'Specialization', name: `skill.specialization.${skill.id}`, value: skill.specialization, placeholder: 'Aikido, Handguns, Stealth...' })}
                  ${createLabeledSelect({ label: 'Download Type', name: `skill.downloadType.${skill.id}`, value: skill.downloadType, options: downloadOptions })}
                </div>
                <p class="skill-description" data-skill-description="${skill.id}"${knownDescription ? '' : ' hidden'}>${escapeHtml(knownDescription)}</p>
                ${createLabeledTextarea({ label: 'Skill Notes', name: `skill.notes.${skill.id}`, value: skill.notes, rows: 2, placeholder: 'Table reminders or source of training' })}
              </article>
            `
            },
          )
          .join('')}
      </div>
    </section>

    <section class="sheet-card sheet-card-wide">
      <div class="section-heading-with-action">
        <h3>Matrix Feats</h3>
        <button class="ghost-button" data-action="add-feat">Add Feat</button>
      </div>
      <div class="repeatable-list">
        ${character.matrixFeats
          .map(
            (feat, index) => {
              const knownFeat = FEATS.find(f => f.name === feat.name)
              const featDescHtml = knownFeat
                ? `<strong>Rule Bender:</strong> ${escapeHtml(knownFeat.ruleBender)}<br><strong>Rule Breaker:</strong> ${escapeHtml(knownFeat.ruleBreaker)}`
                : ''
              return `
              <article class="repeatable-card">
                <div class="repeatable-head">
                  <strong>Feat ${index + 1}</strong>
                  <button class="mini-button" data-remove-feat="${feat.id}">Remove</button>
                </div>
                <div class="field-grid two-up compact-grid">
                  ${createFeatNameField(feat.id, feat.name)}
                  ${createLabeledInput({ label: 'Rating', name: `feat.rating.${feat.id}`, value: feat.rating, type: 'number', min: 0, max: 6 })}
                </div>
                <div class="skill-description" data-feat-description="${feat.id}"${!knownFeat ? ' hidden' : ''}>${featDescHtml}</div>
                ${createLabeledTextarea({ label: 'Feat Notes', name: `feat.notes.${feat.id}`, value: feat.notes, rows: 2, placeholder: 'Rule-bending or rule-breaking effects' })}
              </article>
            `
            },
          )
          .join('')}
      </div>
    </section>
  `;
}

function renderLoadoutTab(character) {
  return `
    <section class="sheet-card sheet-card-wide">
      <h3>Loadout And Contacts</h3>
      <div class="field-grid two-up">
        ${createGearTextareaField({ label: 'Real World Gear', name: 'gear.realWorld', value: character.gear.realWorld, rows: 4, placeholder: 'Weapons, medkits, tools, hovercraft assets...' })}
        ${createGearTextareaField({ label: 'Matrix Loadout', name: 'gear.matrixLoadout', value: character.gear.matrixLoadout, rows: 4, placeholder: 'Downloaded weapons, fake IDs, clothes, vehicles...' })}
        ${createGearTextareaField({ label: 'Contacts', name: 'gear.contacts', value: character.gear.contacts, rows: 3, placeholder: 'Fixers, captains, operators, informants...' })}
        ${createGearTextareaField({ label: 'Vehicles / Frames', name: 'gear.vehicles', value: character.gear.vehicles, rows: 3, placeholder: 'Hovercraft, bikes, APCs, sentinels...' })}
      </div>
      ${createLabeledTextarea({ label: 'Hardline Notes', name: 'gear.hardlineNotes', value: character.gear.hardlineNotes, rows: 4, placeholder: 'Exit points, backups, dangerous zones...' })}
    </section>
  `;
}

function renderNotesTab(character) {
  return `
    <section class="sheet-card sheet-card-wide">
      <h3>Campaign Notes</h3>
      ${createLabeledTextarea({ label: 'Session Notes', name: 'notes', value: character.notes, rows: 7, placeholder: 'Mission goals, betrayals, unresolved hooks...' })}
    </section>

    <section class="sheet-card sheet-card-wide nft-viewer-section">
      <div class="nft-viewer-head">
        <div>
          <p class="eyebrow">Ethereum + Polygon · Warner Bros × Nifty's</p>
          <h3>Matrix Avatar NFT Viewer</h3>
        </div>
        <div class="nft-viewer-links">
          <a class="ghost-button nft-link-btn" href="https://opensea.io/collection/the-matrix-avatars-red-polygon" target="_blank" rel="noopener">Red Pill ↗</a>
          <a class="ghost-button nft-link-btn" href="https://opensea.io/collection/the-matrix-avatars-blue-polygon" target="_blank" rel="noopener">Blue Pill ↗</a>
          <a class="ghost-button nft-link-btn" href="https://opensea.io/collection/the-matrix-avatars" target="_blank" rel="noopener">Base ↗</a>
        </div>
      </div>

      <div class="nft-mode-tabs">
        <button class="nft-mode-btn${state.nftMode === 'wallet' ? ' is-active' : ''}" data-nft-mode="wallet">My Wallet</button>
        <button class="nft-mode-btn${state.nftMode === 'contract' ? ' is-active' : ''}" data-nft-mode="contract">Browse Contract</button>
        <button class="nft-mode-btn${state.nftMode === 'bookmarks' ? ' is-active' : ''}" data-nft-mode="bookmarks">Bookmarks${state.nftBookmarks.length ? ` (${state.nftBookmarks.length})` : ''}</button>
      </div>

      ${state.nftMode === 'wallet' ? `
        <div class="field-grid two-up nft-viewer-inputs">
          ${createLabeledInput({ label: 'Wallet Address', name: 'nft.walletAddress', value: character.nft.walletAddress, placeholder: '0x...' })}
          <label class="field">
            <span>OpenSea API Key</span>
            <input id="nft-api-key" type="password" value="${escapeHtml(loadNftApiKey())}" placeholder="Free key at opensea.io/developers" autocomplete="off" />
          </label>
        </div>
        <div class="nft-controls-row">
          <div class="nft-filter-bar">
            ${(['all', 'red', 'blue', 'base'] as const).map(f => `
              <button class="nft-filter-btn${state.nftFilter === f ? ' is-active' : ''}" data-nft-filter="${f}">
                ${f === 'all' ? 'All' : f === 'red' ? 'Red Pill' : f === 'blue' ? 'Blue Pill' : 'Base'}
              </button>
            `).join('')}
          </div>
          <button class="solid-button" data-action="load-nfts"${state.nftLoading ? ' disabled' : ''}>
            ${state.nftLoading ? 'Loading…' : 'Load NFTs'}
          </button>
        </div>
      ` : ''}

      ${state.nftMode === 'contract' ? `
        <div class="field-grid two-up nft-viewer-inputs">
          <label class="field">
            <span>Contract Address</span>
            <input id="nft-contract-address" type="text" value="${escapeHtml(state.nftContractAddress)}" placeholder="0x..." autocomplete="off" />
          </label>
          <label class="field">
            <span>OpenSea API Key</span>
            <input id="nft-api-key" type="password" value="${escapeHtml(loadNftApiKey())}" placeholder="Free key at opensea.io/developers" autocomplete="off" />
          </label>
        </div>
        <div class="nft-controls-row">
          <button class="solid-button" data-action="browse-contract"${state.nftLoading ? ' disabled' : ''}>
            ${state.nftLoading ? 'Loading…' : 'Browse Contract'}
          </button>
        </div>
      ` : ''}

      ${renderNftContent()}

      ${createLabeledTextarea({ label: 'Collection Notes', name: 'nft.collectionNotes', value: character.nft.collectionNotes, rows: 3, placeholder: 'Token IDs, display preferences, trades...' })}
    </section>
  `;
}

function renderSheetContent(character, slots) {
  if (state.sheetTab === 'identity') {
    return renderIdentityTab(character);
  }

  if (state.sheetTab === 'abilities') {
    return renderAbilitiesTab(character, slots);
  }

  if (state.sheetTab === 'skills') {
    return renderSkillsTab(character);
  }

  if (state.sheetTab === 'loadout') {
    return renderLoadoutTab(character);
  }

  if (state.sheetTab === 'comms') {
    return renderCommsTab(character);
  }

  return renderNotesTab(character);
}

function renderJackInView(character, slots) {
  return `
    <section class="builder-hero">
      <div>
        <p class="eyebrow">Jack In</p>
        <h1>${escapeHtml(character.profileName || 'Unnamed Character')}</h1>
        <p class="hero-text">Build the operative in stages instead of working through one giant page. Each tab focuses on one slice of the sheet.</p>
      </div>
      <div class="download-summary">
        <span>Download slots: ${slots.maxSlots}</span>
        <span>Permanent: ${slots.permanentUsed}/${slots.permanentSlots}</span>
        <span>Temporary: ${slots.temporaryUsed}/${slots.temporarySlots}</span>
      </div>
    </section>

    <section class="builder-layout">
      ${renderRoster(character)}

      <section class="sheet-panel">
        <div class="sheet-toolbar">
          <div class="sheet-tab-bar">${renderSheetTabs()}</div>
          <p class="status-line">${escapeHtml(state.status)}</p>
        </div>
        ${renderSheetContent(character, slots)}
      </section>
    </section>
  `;
}

function setupSimpleSuggestions(
  input: HTMLInputElement,
  groups: { category: string; items: readonly string[] }[]
): void {
  const panel = input.closest('.skill-name-wrapper')?.querySelector<HTMLElement>('.skill-suggestions')
  if (!panel) return

  const itemBtn = (name: string): string =>
    `<button class="skill-suggestion" data-suggest-value="${escapeHtml(name)}">
      <span class="skill-suggestion-name">${escapeHtml(name)}</span>
    </button>`

  const showBrowse = (): void => {
    const html: string[] = []
    for (const group of groups) {
      html.push(`<div class="skill-suggestion-header">${escapeHtml(group.category)}</div>`)
      group.items.forEach(name => html.push(itemBtn(name)))
    }
    panel.innerHTML = html.join('')
    panel.hidden = false
  }

  const showMatches = (term: string): void => {
    if (!term) { showBrowse(); return }
    const lower = term.toLowerCase()
    const allItems = groups.flatMap(g => [...g.items])
    const matches = allItems.filter(name => name.toLowerCase().includes(lower)).slice(0, 14)
    if (matches.length === 0) { panel.hidden = true; return }
    panel.innerHTML = matches.map(itemBtn).join('')
    panel.hidden = false
  }

  input.addEventListener('input', () => showMatches(input.value.trim()))
  input.addEventListener('focus', () => showMatches(input.value.trim()))
  input.addEventListener('blur', () => { panel.hidden = true })
  input.addEventListener('keydown', (e) => { if (e.key === 'Escape') panel.hidden = true })

  panel.addEventListener('mousedown', (e) => {
    const btn = (e.target as Element).closest<HTMLElement>('.skill-suggestion')
    if (!btn) return
    e.preventDefault()
    input.value = btn.dataset.suggestValue!
    handleFieldUpdate(input)
    panel.hidden = true
  })
}

function setupGearPicker(
  button: HTMLButtonElement,
  textarea: HTMLTextAreaElement,
  categories: GearCategory[]
): void {
  const panelKey = button.dataset.gearAdd!
  const bar = button.parentElement
  const panel = bar?.querySelector<HTMLElement>(`[data-gear-panel="${panelKey}"]`)
  if (!panel || !bar) return

  const itemBtn = (name: string): string =>
    `<button class="skill-suggestion" data-gear-item="${escapeHtml(name)}">
      <span class="skill-suggestion-name">${escapeHtml(name)}</span>
    </button>`

  const buildPanel = (): void => {
    const html: string[] = []
    for (const cat of categories) {
      html.push(`<div class="skill-suggestion-header">${escapeHtml(cat.category)}</div>`)
      cat.items.forEach(name => html.push(itemBtn(name)))
    }
    panel.innerHTML = html.join('')
  }

  button.addEventListener('click', () => {
    if (!panel.hidden) { panel.hidden = true; return }
    buildPanel()
    panel.hidden = false
  })

  button.addEventListener('blur', () => { panel.hidden = true })

  panel.addEventListener('mousedown', (e) => {
    const btn = (e.target as Element).closest<HTMLElement>('.skill-suggestion')
    if (!btn) return
    e.preventDefault()
    const item = btn.dataset.gearItem!
    const current = textarea.value
    textarea.value = current ? `${current}\n${item}` : item
    handleFieldUpdate(textarea)
    panel.hidden = true
    button.focus()
  })
}

function setupSkillInputSuggestions(input: HTMLInputElement, skillId: string): void {
  const panel = input.closest('.skill-name-wrapper')?.querySelector<HTMLElement>('[data-skill-suggestions]')
  if (!panel) return

  const descEl = document.querySelector<HTMLElement>(`[data-skill-description="${skillId}"]`)

  const skillBtn = (s: { name: string; attribute: string; category: string; description: string }): string =>
    `<button class="skill-suggestion"
      data-skill-name="${escapeHtml(s.name)}"
      data-skill-attr="${escapeHtml(s.attribute)}"
      data-skill-desc="${escapeHtml(s.description)}">
      <span class="skill-suggestion-name">${escapeHtml(s.name)}</span>
      <span class="skill-suggestion-meta">${escapeHtml(s.attribute)} · ${escapeHtml(s.category)}</span>
    </button>`

  const showBrowse = (): void => {
    const html: string[] = []
    for (const category of CATEGORY_ORDER) {
      const inCat = SKILLS.filter(s => s.category === category)
      if (inCat.length === 0) continue
      html.push(`<div class="skill-suggestion-header">${escapeHtml(category)}</div>`)
      inCat.forEach(s => html.push(skillBtn(s)))
    }
    panel.innerHTML = html.join('')
    panel.hidden = false
  }

  const showMatches = (term: string): void => {
    if (!term) { showBrowse(); return }
    const lower = term.toLowerCase()
    const matches = SKILLS.filter(s =>
      s.name.toLowerCase().includes(lower) || s.category.toLowerCase().includes(lower)
    ).slice(0, 12)
    if (matches.length === 0) { panel.hidden = true; return }
    const exact = SKILLS.find(s => s.name.toLowerCase() === lower)
    if (exact && descEl) { descEl.textContent = exact.description; descEl.hidden = false }
    panel.innerHTML = matches.map(skillBtn).join('')
    panel.hidden = false
  }

  input.addEventListener('input', () => showMatches(input.value.trim()))
  input.addEventListener('focus', () => showMatches(input.value.trim()))
  input.addEventListener('blur', () => { panel.hidden = true })
  input.addEventListener('keydown', (e) => { if (e.key === 'Escape') panel.hidden = true })

  panel.addEventListener('mousedown', (e) => {
    const btn = (e.target as Element).closest<HTMLElement>('.skill-suggestion')
    if (!btn) return
    e.preventDefault()

    input.value = btn.dataset.skillName!
    handleFieldUpdate(input)

    const attrSelect = document.querySelector<HTMLSelectElement>(`[data-field="skill.attribute.${skillId}"]`)
    if (attrSelect && btn.dataset.skillAttr) {
      attrSelect.value = btn.dataset.skillAttr
      handleFieldUpdate(attrSelect)
    }

    if (descEl && btn.dataset.skillDesc) {
      descEl.textContent = btn.dataset.skillDesc
      descEl.hidden = false
    }

    panel.hidden = true
  })
}

function setupFeatInputSuggestions(input: HTMLInputElement, featId: string): void {
  const panel = input.closest('.skill-name-wrapper')?.querySelector<HTMLElement>('[data-feat-suggestions]')
  if (!panel) return

  const descEl = document.querySelector<HTMLElement>(`[data-feat-description="${featId}"]`)

  const featBtn = (f: { name: string }): string =>
    `<button class="skill-suggestion" data-feat-name="${escapeHtml(f.name)}">
      <span class="skill-suggestion-name">${escapeHtml(f.name)}</span>
      <span class="skill-suggestion-meta">CyberZen</span>
    </button>`

  const setDesc = (f: { ruleBender: string; ruleBreaker: string }): void => {
    if (!descEl) return
    descEl.innerHTML = `<strong>Rule Bender:</strong> ${escapeHtml(f.ruleBender)}<br><strong>Rule Breaker:</strong> ${escapeHtml(f.ruleBreaker)}`
    descEl.hidden = false
  }

  const showBrowse = (): void => {
    panel.innerHTML = '<div class="skill-suggestion-header">Matrix Feats</div>' + FEATS.map(featBtn).join('')
    panel.hidden = false
  }

  const showMatches = (term: string): void => {
    if (!term) { showBrowse(); return }
    const lower = term.toLowerCase()
    const matches = FEATS.filter(f => f.name.toLowerCase().includes(lower)).slice(0, 12)
    if (matches.length === 0) { panel.hidden = true; return }
    const exact = FEATS.find(f => f.name.toLowerCase() === lower)
    if (exact) setDesc(exact)
    panel.innerHTML = matches.map(featBtn).join('')
    panel.hidden = false
  }

  input.addEventListener('input', () => showMatches(input.value.trim()))
  input.addEventListener('focus', () => showMatches(input.value.trim()))
  input.addEventListener('blur', () => { panel.hidden = true })
  input.addEventListener('keydown', (e) => { if (e.key === 'Escape') panel.hidden = true })

  panel.addEventListener('mousedown', (e) => {
    const btn = (e.target as Element).closest<HTMLElement>('.skill-suggestion')
    if (!btn) return
    e.preventDefault()

    const featName = btn.dataset.featName!
    input.value = featName
    handleFieldUpdate(input)

    const found = FEATS.find(f => f.name === featName)
    if (found) setDesc(found)

    panel.hidden = true
  })
}

async function fetchNFTs(wallet: string, apiKey: string): Promise<void> {
  state.nftLoading = true
  state.nftError = null
  state.nftItems = []
  render()

  try {
    const fetches = NFT_COLLECTIONS.map(({ slug, chain, filter }) =>
      fetch(
        `https://api.opensea.io/api/v2/chain/${chain}/account/${encodeURIComponent(wallet)}/nfts?collection=${slug}&limit=50`,
        { headers: { 'x-api-key': apiKey, 'accept': 'application/json' } }
      )
        .then(r => {
          if (r.status === 401) throw new Error('Invalid API key — get a free key at opensea.io/developers')
          if (r.status === 400) throw new Error('Invalid wallet address format')
          return r.ok ? r.json() : Promise.reject(new Error(`OpenSea error ${r.status}`))
        })
        .then((data: any): NftItem[] =>
          (data.nfts || []).map((n: any): NftItem => ({ ...n, _filter: filter }))
        )
        .catch((e: Error) => { state.nftError = e.message; return [] as NftItem[] })
    )

    const results = await Promise.all(fetches)
    state.nftItems = results.flat()
    if (state.nftItems.length === 0 && !state.nftError) {
      state.nftError = 'No Matrix Avatar NFTs found for this wallet.'
    }
  } catch (e: any) {
    state.nftError = e?.message ?? 'Failed to load. Check API key and wallet address.'
  }

  state.nftLoading = false
  render()
}

async function fetchNftsByContract(address: string, apiKey: string, cursor?: string): Promise<void> {
  state.nftLoading = true
  state.nftError = null
  if (!cursor) { state.nftContractItems = []; state.nftContractNext = null }
  render()

  const knownFilter = CONTRACT_TO_FILTER[address.toLowerCase()]
  let resolvedChain = ''

  try {
    for (const chain of ['polygon', 'ethereum']) {
      const probe = await fetch(
        `https://api.opensea.io/api/v2/chain/${chain}/contract/${address}`,
        { headers: { 'x-api-key': apiKey, 'accept': 'application/json' } }
      )
      if (probe.ok) { resolvedChain = chain; break }
    }
    if (!resolvedChain) throw new Error('Contract not found on Polygon or Ethereum.')

    const url = new URL(`https://api.opensea.io/api/v2/chain/${resolvedChain}/contract/${address}/nfts`)
    url.searchParams.set('limit', '50')
    if (cursor) url.searchParams.set('next', cursor)

    const r = await fetch(url.toString(), {
      headers: { 'x-api-key': apiKey, 'accept': 'application/json' }
    })
    if (r.status === 401) throw new Error('Invalid API key')
    if (!r.ok) throw new Error(`OpenSea error ${r.status}`)

    const data = await r.json()
    const items: NftItem[] = (data.nfts || []).map((n: any): NftItem => ({
      ...n,
      contract: address,
      _filter: knownFilter ?? 'contract',
      _chain: resolvedChain,
    }))

    state.nftContractItems = cursor ? [...state.nftContractItems, ...items] : items
    state.nftContractNext = data.next || null
    state.nftContractAddress = address

    if (state.nftContractItems.length === 0) {
      state.nftError = `No NFTs found for that contract on ${resolvedChain}.`
    }
  } catch (e: any) {
    state.nftError = e?.message ?? 'Failed to load contract NFTs.'
  }

  state.nftLoading = false
  render()
}

function renderCollectionBadge(filter: NftItem['_filter']): string {
  if (filter === 'red') return '<span class="nft-badge nft-badge-red">Red Pill</span>'
  if (filter === 'blue') return '<span class="nft-badge nft-badge-blue">Blue Pill</span>'
  if (filter === 'base') return '<span class="nft-badge nft-badge-base">Base</span>'
  return ''
}

function fullPortraitUrl(url: string | undefined): string | undefined {
  if (!url) return url
  return url.includes('seadn.io') ? `${url}?w=600` : url
}

function renderNftCard(nft: NftItem): string {
  const name = escapeHtml(nft.name || `#${nft.identifier}`)
  const img = fullPortraitUrl(nft.display_image_url || nft.image_url)
  const bookmarked = isBookmarked(nft)
  const bookmarkKey = escapeHtml(nftKey(nft))
  return `
    <div class="nft-token-card">
      <a class="nft-token-link" href="${escapeHtml(nft.opensea_url || 'https://opensea.io')}" target="_blank" rel="noopener noreferrer">
        <div class="nft-token-img">
          ${img
            ? `<img src="${escapeHtml(img)}" alt="${name}" loading="lazy" />`
            : `<span class="nft-no-img">No Image</span>`}
        </div>
      </a>
      <div class="nft-token-meta">
        <span class="nft-token-name">${name}</span>
        <div class="nft-token-foot">
          ${renderCollectionBadge(nft._filter)}
          <button class="nft-bookmark-btn${bookmarked ? ' is-bookmarked' : ''}"
            data-bookmark-key="${bookmarkKey}"
            title="${bookmarked ? 'Remove bookmark' : 'Bookmark'}">
            ${bookmarked ? '★' : '☆'}
          </button>
        </div>
      </div>
    </div>
  `
}

function renderNftStatusOrGrid(items: NftItem[], emptyMsg: string): string {
  if (state.nftLoading) return `<div class="nft-status-msg">Fetching from OpenSea…</div>`
  if (state.nftError && !items.length) return `<div class="nft-status-msg nft-status-error">${escapeHtml(state.nftError)}</div>`
  if (!items.length) return `<div class="nft-status-msg">${escapeHtml(emptyMsg)}</div>`
  return `<div class="nft-token-grid">${items.map(renderNftCard).join('')}</div>`
}

function renderNftContent(): string {
  if (state.nftMode === 'bookmarks') {
    if (!state.nftBookmarks.length) {
      return `<div class="nft-status-msg">No bookmarks yet. Browse your wallet or a contract and click ☆ to save NFTs here.</div>`
    }
    return `<div class="nft-token-grid">${state.nftBookmarks.map(renderNftCard).join('')}</div>`
  }

  if (state.nftMode === 'contract') {
    const content = renderNftStatusOrGrid(state.nftContractItems, 'Enter a contract address and click Browse.')
    const loadMore = state.nftContractNext && !state.nftLoading
      ? `<div class="nft-load-more-row">
           <button class="ghost-button" data-action="load-more-nfts">Load 50 more</button>
           <span class="nft-count">${state.nftContractItems.length} loaded</span>
         </div>`
      : state.nftContractItems.length > 0
        ? `<div class="nft-count-row"><span class="nft-count">${state.nftContractItems.length} NFTs loaded</span></div>`
        : ''
    return content + loadMore
  }

  // Wallet mode
  const filtered = state.nftFilter === 'all'
    ? state.nftItems
    : state.nftItems.filter(n => n._filter === state.nftFilter)

  if (state.nftLoading) return `<div class="nft-status-msg">Fetching wallet NFTs from OpenSea…</div>`
  if (state.nftError && !state.nftItems.length) return `<div class="nft-status-msg nft-status-error">${escapeHtml(state.nftError)}</div>`
  if (!state.nftItems.length) return ''
  if (!filtered.length) {
    const label = NFT_COLLECTIONS.find(c => c.filter === state.nftFilter)?.label ?? 'this collection'
    return `<div class="nft-status-msg">No ${label} NFTs in this wallet.</div>`
  }
  return `<div class="nft-token-grid">${filtered.map(renderNftCard).join('')}</div>`
}

// ── COMMS TAB ──────────────────────────────────────────────────────────────

function renderPhoneScreenOff(charId: string): string {
  const unread = getUnreadCount(charId)
  return `
    <div class="phone-screen-off">
      <span class="phone-power-icon">⏻</span>
      <span class="phone-off-label">POWERED OFF</span>
      ${unread > 0 ? `<span class="phone-unread-badge">${unread} MSG WAITING</span>` : ''}
    </div>
  `
}

function renderPhoneScreenOn(charId: string): string {
  const msgs = getMessagesForCharacter(charId)
  if (msgs.length === 0) {
    return `
      <div class="phone-screen-on-empty">
        <span>NO MESSAGES</span>
        <span>STANDING BY</span>
      </div>
    `
  }
  return msgs.map((m, i) => {
    const time = new Date(m.sentAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
    const isNew = !m.readBy.includes(charId)
    const divider = i > 0 ? `<div class="phone-msg-divider">───────────</div>` : ''
    return `${divider}
      <div class="phone-msg${isNew ? ' phone-msg-new' : ''}">
        <div class="phone-msg-from">FROM:${escapeHtml(m.from.toUpperCase())}<span class="phone-msg-time">${time}</span></div>
        <div class="phone-msg-body">&gt;${escapeHtml(m.body)}</div>
      </div>`
  }).join('')
}

const PHONE_KEYS = [
  { top: '1', sub: '' },   { top: '2', sub: 'ABC' }, { top: '3', sub: 'DEF' },
  { top: '4', sub: 'GHI' }, { top: '5', sub: 'JKL' }, { top: '6', sub: 'MNO' },
  { top: '7', sub: 'PRS' }, { top: '8', sub: 'TUV' }, { top: '9', sub: 'WXY' },
  { top: '*', sub: '' },   { top: '0', sub: '+' },   { top: '#', sub: '' },
]

function renderPhoneDevice(character: any): string {
  const on = state.phoneOn
  const screenContent = on
    ? renderPhoneScreenOn(character.id)
    : renderPhoneScreenOff(character.id)
  return `
    <div class="phone-wrap">
      <div class="phone-device${on ? ' phone-is-on' : ''}">
        <div class="phone-antenna"></div>
        <div class="phone-earpiece"></div>
        <div class="phone-screen-bezel">
          <div class="phone-screen">
            <div class="phone-screen-content" id="phone-screen">
              ${screenContent}
            </div>
          </div>
        </div>
        <div class="phone-brand">Z · I · O · N</div>
        <div class="phone-nav-row">
          <div class="phone-softkey"></div>
          <div class="phone-nav-center"><div class="phone-nav-dot"></div></div>
          <div class="phone-softkey"></div>
        </div>
        <div class="phone-keypad">
          ${PHONE_KEYS.map(k =>
            `<button class="phone-key" tabindex="-1">${k.top}${k.sub ? `<span class="phone-key-sub">${k.sub}</span>` : ''}</button>`
          ).join('')}
        </div>
        <div class="phone-bottom-row">
          <button class="phone-power-btn" data-action="phone-toggle" title="${on ? 'Power off' : 'Power on'}">⏻</button>
        </div>
      </div>
      <p class="phone-status-label">${on ? 'ONLINE · ZION MESH' : 'PRESS ⏻ TO POWER ON'}</p>
    </div>
  `
}

// ── Operator Monitor (shown when character role === 'Operator') ──────────

function renderOperatorRig(): string {
  const screens = [
    // back row — 7 small
    { size: 'sm', type: 'orange' }, { size: 'sm', type: 'blue' }, { size: 'sm', type: 'green' },
    { size: 'sm', type: 'red' },   { size: 'sm', type: 'blue' }, { size: 'sm', type: 'green' },
    { size: 'sm', type: 'orange' },
    // front row — 5 larger
    { size: 'md', type: 'blue' }, { size: 'lg', type: 'green' }, { size: 'xl', type: 'orange' },
    { size: 'lg', type: 'green' }, { size: 'md', type: 'teal' },
  ]
  const backRow  = screens.slice(0, 7)
  const frontRow = screens.slice(7)
  const mon = ({ size, type }: { size: string; type: string }) =>
    `<div class="op-mon ${size}"><div class="op-mon-screen op-scr-${type}"></div></div>`
  return `
    <div class="op-rig-display" aria-hidden="true">
      <div class="op-rig-monitor-wall">
        <div class="op-rig-row">${backRow.map(mon).join('')}</div>
        <div class="op-rig-row">${frontRow.map(mon).join('')}</div>
      </div>
    </div>
    <p class="op-rig-caption">OPERATOR STATION · ZION BROADCAST SYSTEM</p>
  `
}

function renderOperatorMonitor(character: any): string {
  const ship = character.homeShip || ''
  // Use Firebase session data when available so crew on other browsers appear
  const crew: SessionChar[] = FIREBASE_ENABLED
    ? Object.values(state.sessionChars).filter(c => c.role !== 'Operator' && (c.homeShip || '') === ship)
    : state.characters.filter(c => c.role !== 'Operator' && (c.homeShip || '') === ship)
  const defaultFrom = escapeHtml(character.callSign || character.profileName || 'Operator')

  // Unread replies sent to __operator__ from a specific crew member
  const unreadFrom = (charId: string) =>
    state.messages.filter(m => m.to === '__operator__' && m.fromCharId === charId && !m.readBy.includes(character.id)).length

  // Messages Operator sent that the crew member hasn't read yet
  const unreadSentTo = (charId: string) =>
    state.messages.filter(m => (m.to === charId || m.to === '__all__') && !m.readBy.includes(charId)).length

  const log = [...(character.messageLog || [])].reverse().slice(0, 30)

  const shipLabel = ship ? escapeHtml(ship) : 'unassigned hovership'

  return `
    <div class="op-monitor">
      ${renderOperatorRig()}
      <div class="op-monitor-head">
        <p class="eyebrow">Operator · Mission Control</p>
        <h3>Operator's Console</h3>
        <p class="comms-phone-desc">Broadcasting on <strong>${shipLabel}</strong>. Only crew assigned to the same hovership will receive your transmissions.</p>
      </div>

      <div class="op-monitor-body">
        <div class="op-crew-panel">
          <p class="op-section-label">Crew Status</p>
          ${crew.length === 0
            ? `<p class="op-no-crew">No crew on <em>${shipLabel}</em>. ${FIREBASE_ENABLED ? 'Crew members must open their Comms tab to appear here.' : 'Create characters with a matching Hovership name to connect them to this console.'}</p>`
            : crew.map(c => {
                const replies = unreadFrom(c.id)
                const pending = unreadSentTo(c.id)
                const online = (c as SessionChar).phoneOn
                return `
                  <div class="op-crew-row">
                    <div class="op-crew-info">
                      <span class="op-crew-online ${online ? 'is-online' : 'is-offline'}" title="${online ? 'Phone on' : 'Phone off'}">${online ? '◉' : '○'}</span>
                      <span class="op-crew-name">${escapeHtml(c.profileName || 'Unnamed')}</span>
                      <span class="op-crew-role">${escapeHtml(c.role || '')}</span>
                    </div>
                    <div class="op-crew-status">
                      ${replies > 0
                        ? `<span class="op-crew-badge op-crew-badge-reply" title="${replies} unread repl${replies === 1 ? 'y' : 'ies'}">${replies} ←</span>`
                        : ''}
                      ${pending > 0
                        ? `<span class="op-crew-badge op-crew-badge-pending" title="${pending} message${pending === 1 ? '' : 's'} unread">${pending} !</span>`
                        : ''}
                      ${replies === 0 && pending === 0 ? `<span class="op-crew-idle">—</span>` : ''}
                    </div>
                  </div>`
              }).join('')
          }
        </div>

        <div class="op-compose-panel">
          <p class="op-section-label">Compose Transmission</p>
          <div class="field-grid two-up">
            <label class="field">
              <span>From (Handle)</span>
              <input id="op-from" type="text" value="${defaultFrom}" placeholder="Tank, Morpheus…" maxlength="24" />
            </label>
            <label class="field">
              <span>To</span>
              <select id="op-recipient">
                <option value="__all__">— ALL CREW —</option>
                ${crew.map(c =>
                  `<option value="${c.id}">${escapeHtml(c.profileName || 'Unnamed')}${c.callSign ? ` · ${escapeHtml(c.callSign)}` : ''}</option>`
                ).join('')}
              </select>
            </label>
          </div>
          <label class="field">
            <span>Message <span class="op-char-count" id="op-count">0 / 501</span></span>
            <textarea id="op-message" rows="3" maxlength="501" placeholder="Transmit a message to connected operatives…"></textarea>
          </label>
          <div class="operator-form-actions">
            <button class="solid-button" data-action="send-operator-message">▶ TRANSMIT</button>
            ${log.length ? `<button class="ghost-button" data-action="clear-message-log">Clear Log</button>` : ''}
          </div>
        </div>
      </div>

      ${log.length ? `
        <div class="op-log">
          <p class="op-section-label">Full Transmission Log</p>
          ${log.map(m => {
            const time = new Date(m.sentAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
            const isIncoming = m.to === '__operator__'
            const toLabel = isIncoming
              ? '→ OPERATOR'
              : m.to === '__all__'
                ? '→ ALL CREW'
                : `→ ${escapeHtml(String(state.characters.find(c => c.id === m.to)?.profileName ?? m.to))}`
            return `<div class="op-log-entry${isIncoming ? ' op-log-incoming' : ''}">
              <div class="op-log-header">
                <span class="op-log-from">[${escapeHtml(m.from)}]</span>
                <span class="op-log-meta">${time} ${toLabel}</span>
              </div>
              <span class="op-log-body">${escapeHtml(m.body)}</span>
            </div>`
          }).join('')}
        </div>
      ` : ''}
    </div>
  `
}

// ── Crew reply panel (shown for non-Operator characters) ─────────────────

function renderCrewReplyPanel(character: any): string {
  return `
    <div class="crew-reply-panel">
      <p class="op-section-label">Reply to Operator</p>
      <p class="comms-phone-desc">Send a message directly to your Operator. They will see it on their console.</p>
      <label class="field">
        <span>Message <span class="op-char-count" id="crew-reply-count">0 / 501</span></span>
        <textarea id="crew-reply-msg" rows="3" maxlength="501" placeholder="Operator, I'm at the hardline…"></textarea>
      </label>
      <button class="solid-button" data-action="send-crew-reply" data-char-id="${character.id}">▶ SEND TO OPERATOR</button>
    </div>
  `
}

function renderCrewLog(character: any): string {
  const msgs = [...(character.messageLog || [])].reverse().slice(0, 30)
  if (!msgs.length) return ''

  return `
    <div class="op-log crew-log">
      <div class="crew-log-header">
        <p class="op-section-label">Transmission Log</p>
        <button class="ghost-button ghost-button-sm" data-action="clear-crew-log">Clear Log</button>
      </div>
      ${msgs.map(m => {
        const time = new Date(m.sentAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
        const isMine = m.fromCharId === character.id
        const dirLabel = isMine
          ? '→ OPERATOR'
          : m.to === '__all__' ? '← ALL CREW' : '← YOU'
        return `<div class="op-log-entry${!isMine ? ' op-log-incoming' : ''}">
          <div class="op-log-header">
            <span class="op-log-from">[${escapeHtml(m.from)}]</span>
            <span class="op-log-meta">${time} ${dirLabel}</span>
          </div>
          <span class="op-log-body">${escapeHtml(m.body)}</span>
        </div>`
      }).join('')}
    </div>
  `
}

function renderCommsConnectionBanner(): string {
  if (FIREBASE_ENABLED) {
    return state.firebaseConnected
      ? `<div class="comms-conn-banner comms-conn-online">◉ ZION MESH ONLINE — real-time sync active</div>`
      : `<div class="comms-conn-banner comms-conn-connecting">◎ Connecting to Zion Mesh…</div>`
  }
  return `<div class="comms-conn-banner comms-conn-local">
    ◌ LOCAL MODE — messages stay in this browser only.
    <a href="https://console.firebase.google.com" target="_blank" rel="noopener" class="comms-conn-link">Set up Firebase</a> and fill in <code>src/firebase-config.ts</code> to enable cross-device play.
  </div>`
}

function renderCommsTab(character: any): string {
  const isOperator = character.role === 'Operator'

  if (isOperator) {
    return `
      <section class="sheet-card">
        ${renderCommsConnectionBanner()}
        ${renderOperatorMonitor(character)}
      </section>`
  }

  return `
    <section class="sheet-card">
      ${renderCommsConnectionBanner()}
      <div class="comms-layout">
        <div class="comms-phone-col">
          <p class="eyebrow">Hardline Communications</p>
          <h3>Field Phone</h3>
          <p class="comms-phone-desc">Your connection to the Operator. Power on to receive transmissions.</p>
          ${renderPhoneDevice(character)}
        </div>
        <div class="comms-operator-col">
          ${renderCrewReplyPanel(character)}
          ${renderCrewLog(character)}
        </div>
      </div>
    </section>
  `
}

function render() {
  const character = getSelectedCharacter();
  const slots = computeDownloadSlots(character);

  let viewMarkup = renderHomeView(character);
  let viewClass = 'hero-view';
  if (state.route === 'learn') {
    viewMarkup = renderLearnView();
    viewClass = 'learn-view';
  }
  if (state.route === 'jack-in') {
    viewMarkup = renderJackInView(character, slots);
    viewClass = 'jack-in-view';
  }

  document.querySelector('#app').innerHTML = `
    <div class="page-shell">
      <header class="site-header">
        <a href="#home" class="brand">The Unofficial Matrix RPG</a>
        <nav class="route-nav">${renderRouteLinks()}</nav>
      </header>
      <main class="view-shell" data-view="${viewClass}">
        ${viewMarkup}
      </main>
    </div>
  `;

  bindEvents();
  
  // Trigger animations after DOM is rendered
  animateCurrentView();
  setupInteractiveAnimations();
}

function bindEvents() {
  document.querySelectorAll('[data-route]').forEach((button) => {
    button.addEventListener('click', () => {
      setRoute(button.dataset.route, { sheetTab: button.dataset.sheetTab });
    });
  });

  document.querySelectorAll('[data-sheet-tab]').forEach((button) => {
    button.addEventListener('click', () => setSheetTab(button.dataset.sheetTab));
  });

  document.querySelectorAll('[data-character-id]').forEach((button) => {
    button.addEventListener('click', () => {
      state.selectedId = button.dataset.characterId;
      setStatus('Character loaded from local storage.');
      setRoute('jack-in');
    });
  });

  document.querySelectorAll('[data-field]').forEach((element) => {
    element.addEventListener('input', (event) => handleFieldUpdate(event.currentTarget));
  });

  document.querySelectorAll('[data-attribute]').forEach((element) => {
    element.addEventListener('input', (event) => {
      const target = event.currentTarget;
      updateSelectedCharacter((character) => {
        character.attributes[target.dataset.attribute] = Number(target.value) || 0;
        return character;
      });
    });
  });

  document.querySelectorAll('[data-attribute-toggle]').forEach((element) => {
    element.addEventListener('change', (event) => {
      const target = event.currentTarget;
      updateSelectedCharacter((character) => {
        character.attributes[target.dataset.attributeToggle] = target.checked;
        return character;
      });
    });
  });

  document.querySelector('[data-action="new-character"]')?.addEventListener('click', () => {
    const character = createCharacter();
    state.characters = [character, ...state.characters];
    state.selectedId = character.id;
    persistCharacters(state.characters);
    state.sheetTab = 'identity';
    setStatus('New blank sheet created locally.');
    setRoute('jack-in');
  });

  document.querySelector('[data-action="save-status"]')?.addEventListener('click', () => {
    persistCharacters(state.characters);
    setStatus('All character data saved to this browser on this device.');
    render();
  });

  document.querySelector('[data-action="export-character"]')?.addEventListener('click', () => {
    exportCharacter(getSelectedCharacter());
    setStatus('Character exported as JSON.');
    render();
  });

  document.querySelector('[data-action="delete-character"]')?.addEventListener('click', () => {
    if (state.characters.length === 1) {
      state.characters = [createCharacter()];
      state.selectedId = state.characters[0].id;
    } else {
      state.characters = state.characters.filter((character) => character.id !== state.selectedId);
      state.selectedId = state.characters[0].id;
    }

    persistCharacters(state.characters);
    setStatus('Character deleted from local storage.');
    render();
  });

  document.querySelector('[data-action="add-skill"]')?.addEventListener('click', () => {
    updateSelectedCharacter((character) => {
      character.skills.push(createSkill());
      return character;
    });
  });

  document.querySelectorAll<HTMLInputElement>('input[data-field*="skill.name"]').forEach((input) => {
    const skillId = input.dataset.field!.split('.')[2]
    setupSkillInputSuggestions(input, skillId)
  });

  document.querySelectorAll<HTMLInputElement>('input[data-field*="feat.name"]').forEach((input) => {
    const featId = input.dataset.field!.split('.')[2]
    setupFeatInputSuggestions(input, featId)
  });

  const pathInput = document.querySelector<HTMLInputElement>('[data-field="path"]')
  if (pathInput) setupSimpleSuggestions(pathInput, [{ category: 'Paths', items: PATHS }])

  const affiliationInput = document.querySelector<HTMLInputElement>('[data-field="affiliation"]')
  if (affiliationInput) setupSimpleSuggestions(affiliationInput, [{ category: 'Affiliations', items: AFFILIATIONS }])

  const originInput = document.querySelector<HTMLInputElement>('[data-field="origin"]')
  if (originInput) setupSimpleSuggestions(originInput, [{ category: 'Origins', items: ORIGINS }])

  const homeShipInput = document.querySelector<HTMLInputElement>('[data-field="homeShip"]')
  if (homeShipInput) setupSimpleSuggestions(homeShipInput, [{ category: 'Ship Types', items: SHIP_TYPES }])

  const gearPickerMap: Record<string, GearCategory[]> = {
    realWorld: [...REAL_WORLD_GEAR],
    matrixLoadout: [...MATRIX_GEAR],
    vehicles: [...VEHICLES_ALL],
    contacts: [{ category: 'Contact Types', items: CONTACT_ROLES }],
  }

  document.querySelectorAll<HTMLButtonElement>('[data-gear-add]').forEach((button) => {
    const panelKey = button.dataset.gearAdd!
    const wrapper = button.closest('.gear-picker-wrapper')
    const textarea = wrapper?.querySelector<HTMLTextAreaElement>(`[data-field="gear.${panelKey}"]`)
    const categories = gearPickerMap[panelKey]
    if (textarea && categories) setupGearPicker(button, textarea, categories)
  })

  document.querySelector('[data-action="add-feat"]')?.addEventListener('click', () => {
    updateSelectedCharacter((character) => {
      character.matrixFeats.push(createFeat());
      return character;
    });
  });

  document.querySelectorAll('[data-remove-skill]').forEach((button) => {
    button.addEventListener('click', () => {
      updateSelectedCharacter((character) => {
        character.skills = character.skills.filter((skill) => skill.id !== button.dataset.removeSkill);
        return character;
      });
    });
  });

  document.querySelectorAll('[data-remove-feat]').forEach((button) => {
    button.addEventListener('click', () => {
      updateSelectedCharacter((character) => {
        character.matrixFeats = character.matrixFeats.filter((feat) => feat.id !== button.dataset.removeFeat);
        return character;
      });
    });
  });

  document.querySelector('#import-json')?.addEventListener('change', async (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      const imported = hydrateCharacter(JSON.parse(await file.text()));
      imported.updatedAt = new Date().toISOString();
      state.characters = [imported, ...state.characters.filter((entry) => entry.id !== imported.id)];
      state.selectedId = imported.id;
      persistCharacters(state.characters);
      setStatus('Character imported successfully.');
      setRoute('jack-in');
    } catch {
      setStatus('Import failed. Please use a valid exported JSON character file.');
      render();
    }
  });

  document.querySelectorAll<HTMLButtonElement>('[data-nft-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.nftFilter = btn.dataset.nftFilter!
      render()
    })
  })

  document.querySelectorAll<HTMLButtonElement>('[data-nft-mode]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.nftMode = btn.dataset.nftMode as 'wallet' | 'contract' | 'bookmarks'
      render()
    })
  })

  document.querySelector('[data-action="load-nfts"]')?.addEventListener('click', async () => {
    const walletEl = document.querySelector<HTMLInputElement>('[data-field="nft.walletAddress"]')
    const apiKeyEl = document.getElementById('nft-api-key') as HTMLInputElement | null
    const wallet = walletEl?.value.trim() ?? ''
    const apiKey = apiKeyEl?.value.trim() ?? ''

    if (!wallet) {
      state.nftError = 'Enter a Polygon wallet address first.'
      render()
      return
    }
    if (!apiKey) {
      state.nftError = 'Enter your OpenSea API key. Get a free one at opensea.io/developers.'
      render()
      return
    }

    saveNftApiKey(apiKey)
    await fetchNFTs(wallet, apiKey)
  })

  document.querySelector('[data-action="browse-contract"]')?.addEventListener('click', async () => {
    const addrEl = document.getElementById('nft-contract-address') as HTMLInputElement | null
    const apiKeyEl = document.getElementById('nft-api-key') as HTMLInputElement | null
    const address = addrEl?.value.trim() ?? ''
    const apiKey = apiKeyEl?.value.trim() ?? ''

    if (!address) {
      state.nftError = 'Enter a contract address first.'
      render()
      return
    }
    if (!apiKey) {
      state.nftError = 'Enter your OpenSea API key. Get a free one at opensea.io/developers.'
      render()
      return
    }

    saveNftApiKey(apiKey)
    await fetchNftsByContract(address, apiKey)
  })

  document.querySelector('[data-action="load-more-nfts"]')?.addEventListener('click', async () => {
    const apiKey = loadNftApiKey()
    if (!apiKey || !state.nftContractAddress || !state.nftContractNext) return
    await fetchNftsByContract(state.nftContractAddress, apiKey, state.nftContractNext)
  })

  document.querySelectorAll<HTMLButtonElement>('[data-bookmark-key]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault()
      e.stopPropagation()
      const key = btn.dataset.bookmarkKey!
      const allNfts = [...state.nftItems, ...state.nftContractItems, ...state.nftBookmarks]
      const nft = allNfts.find(n => nftKey(n) === key)
      if (nft) toggleBookmark(nft)
    })
  })

  // ── Comms / Phone events ──────────────────────────────────────────────────

  document.querySelector('[data-action="phone-toggle"]')?.addEventListener('click', () => {
    const character = getSelectedCharacter()
    state.phoneOn = !state.phoneOn
    if (state.phoneOn) markMessagesRead(character.id)
    registerSession(character)
    render()
    if (state.phoneOn) {
      const screen = document.getElementById('phone-screen')
      if (screen) screen.scrollTop = screen.scrollHeight
    }
  })

  document.querySelector('[data-action="send-operator-message"]')?.addEventListener('click', () => {
    const fromEl = document.getElementById('op-from') as HTMLInputElement | null
    const recipEl = document.getElementById('op-recipient') as HTMLSelectElement | null
    const msgEl = document.getElementById('op-message') as HTMLTextAreaElement | null
    const from = fromEl?.value.trim() || 'Operator'
    const to = recipEl?.value || '__all__'
    const body = msgEl?.value.trim() || ''
    if (!body) return
    const character = getSelectedCharacter()
    sendMessage(from, character.id, to, body, character.homeShip || '')
    if (msgEl) msgEl.value = ''
    const countEl = document.getElementById('op-count')
    if (countEl) countEl.textContent = '0 / 501'
  })

  document.querySelector('[data-action="send-crew-reply"]')?.addEventListener('click', () => {
    const character = getSelectedCharacter()
    const msgEl = document.getElementById('crew-reply-msg') as HTMLTextAreaElement | null
    const body = msgEl?.value.trim() || ''
    if (!body) return
    const handle = character.callSign || character.profileName || 'Unknown'
    sendMessage(handle, character.id, '__operator__', body, character.homeShip || '')
    if (msgEl) msgEl.value = ''
    const countEl = document.getElementById('crew-reply-count')
    if (countEl) countEl.textContent = '0 / 501'
  })

  document.querySelector('[data-action="clear-message-log"]')?.addEventListener('click', () => {
    if (!confirm('Delete all transmissions from the Operator log?')) return
    state.messages = []
    saveMessages()
    updateSelectedCharacter(c => ({ ...c, messageLog: [] }))
  })

  document.querySelector('[data-action="clear-crew-log"]')?.addEventListener('click', () => {
    if (!confirm('Clear your transmission log?')) return
    updateSelectedCharacter(c => ({ ...c, messageLog: [] }))
  })

  const msgTextarea = document.getElementById('op-message') as HTMLTextAreaElement | null
  const charCount = document.getElementById('op-count')
  if (msgTextarea && charCount) {
    msgTextarea.addEventListener('input', () => {
      charCount.textContent = `${msgTextarea.value.length} / 501`
    })
  }

  const crewMsgTextarea = document.getElementById('crew-reply-msg') as HTMLTextAreaElement | null
  const crewCharCount = document.getElementById('crew-reply-count')
  if (crewMsgTextarea && crewCharCount) {
    crewMsgTextarea.addEventListener('input', () => {
      crewCharCount.textContent = `${crewMsgTextarea.value.length} / 501`
    })
  }

  const phoneScreen = document.getElementById('phone-screen')
  if (phoneScreen && state.phoneOn) phoneScreen.scrollTop = phoneScreen.scrollHeight
}

function handleFieldUpdate(element) {
  const field = element.dataset.field;
  const value = element.value;

  // Update state and persist without rendering on every keystroke
  updateSelectedCharacter((character) => {
    const [scope, property, id] = field.split('.');

    if (!property) {
      character[field] = element.type === 'number' ? Number(value) || 0 : value;
      return character;
    }

    if (scope === 'gear' || scope === 'nft') {
      character[scope][property] = value;
      return character;
    }

    if (scope === 'skill') {
      character.skills = character.skills.map((skill) => {
        if (skill.id !== id) {
          return skill;
        }

        return {
          ...skill,
          [property]: property === 'rating' ? Number(value) || 0 : value,
        };
      });
      return character;
    }

    if (scope === 'feat') {
      character.matrixFeats = character.matrixFeats.map((feat) => {
        if (feat.id !== id) {
          return feat;
        }

        return {
          ...feat,
          [property]: property === 'rating' ? Number(value) || 0 : value,
        };
      });
      return character;
    }

    return character;
  }, false); // Don't re-render on every keystroke — data is persisted
}

// Initialize the app
render();
