import './styles.css'
import '@shoelace-style/shoelace/dist/themes/dark.css'
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js'
import { animateCurrentView, setupInteractiveAnimations } from './animations.js'
import { SKILLS, CATEGORY_ORDER } from './skills.js'

setBasePath('./shoelace/assets')

const STORAGE_KEY = 'matrix-rpg-characters-v1'
const validRoutes = ['home', 'learn', 'jack-in'];
const sheetTabs = ['identity', 'abilities', 'skills', 'loadout', 'notes'];

const attributeOptions = ['Common Sense', 'Focus', 'Agility', 'Strength', 'Endurance', 'CyberZen'];
const damageLevels = ['None', 'Light', 'Moderate', 'Serious', 'Critical', 'Incapacitated', 'Dead'];
const roleOptions = ['RSI Hacker', 'Operator', 'Pilot', 'Captain', 'Crew', 'Nomad', 'Surface Human'];
const downloadOptions = ['None', 'Temporary', 'Permanent'];

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
  selectedId: null,
  status: 'Local storage ready.',
  route: getRouteFromHash(),
  sheetTab: 'identity',
};

state.selectedId = state.characters[0]?.id ?? null;

window.addEventListener('hashchange', () => {
  const route = getRouteFromHash();
  if (route !== state.route) {
    state.route = route;
    render();
  }
});

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
  const tabLabels = {
    identity: 'Identity',
    abilities: 'Abilities',
    skills: 'Skills',
    loadout: 'Loadout',
    notes: 'Notes',
  };

  return sheetTabs
    .map(
      (tab) => `<button class="sheet-tab ${state.sheetTab === tab ? 'is-active' : ''}" data-sheet-tab="${tab}">${tabLabels[tab]}</button>`,
    )
    .join('');
}

function renderIdentityTab(character) {
  return `
    <section class="sheet-card sheet-card-wide">
      <h3>Identity</h3>
      <div class="field-grid two-up">
        ${createLabeledInput({ label: 'Profile Name', name: 'profileName', value: character.profileName, placeholder: 'Neo, Switch, Ghost...' })}
        ${createLabeledInput({ label: 'Call Sign', name: 'callSign', value: character.callSign, placeholder: 'Operator tag or street handle' })}
        ${createLabeledInput({ label: 'Real Name', name: 'realName', value: character.realName })}
        ${createLabeledInput({ label: 'Path', name: 'path', value: character.path, placeholder: 'Chosen path or archetype' })}
        ${createLabeledSelect({ label: 'Role', name: 'role', value: character.role, options: roleOptions })}
        ${createLabeledInput({ label: 'Affiliation', name: 'affiliation', value: character.affiliation })}
        ${createLabeledInput({ label: 'Home Ship / Crew', name: 'homeShip', value: character.homeShip, placeholder: 'Nebuchadnezzar style crew name' })}
        ${createLabeledInput({ label: 'Origin', name: 'origin', value: character.origin, placeholder: 'Pod-born, surface-born, nomad...' })}
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
            (feat, index) => `
              <article class="repeatable-card">
                <div class="repeatable-head">
                  <strong>Feat ${index + 1}</strong>
                  <button class="mini-button" data-remove-feat="${feat.id}">Remove</button>
                </div>
                <div class="field-grid two-up compact-grid">
                  ${createLabeledInput({ label: 'Feat Name', name: `feat.name.${feat.id}`, value: feat.name, placeholder: 'Bullet Time, Heal, Sonic Blast...' })}
                  ${createLabeledInput({ label: 'Rating', name: `feat.rating.${feat.id}`, value: feat.rating, type: 'number', min: 0, max: 6 })}
                </div>
                ${createLabeledTextarea({ label: 'Feat Notes', name: `feat.notes.${feat.id}`, value: feat.notes, rows: 2, placeholder: 'Rule-bending or rule-breaking effects' })}
              </article>
            `,
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
        ${createLabeledTextarea({ label: 'Real World Gear', name: 'gear.realWorld', value: character.gear.realWorld, rows: 4, placeholder: 'Weapons, medkits, tools, hovercraft assets...' })}
        ${createLabeledTextarea({ label: 'Matrix Loadout', name: 'gear.matrixLoadout', value: character.gear.matrixLoadout, rows: 4, placeholder: 'Downloaded weapons, fake IDs, clothes, vehicles...' })}
        ${createLabeledTextarea({ label: 'Contacts', name: 'gear.contacts', value: character.gear.contacts, rows: 3, placeholder: 'Fixers, captains, operators, informants...' })}
        ${createLabeledTextarea({ label: 'Vehicles / Frames', name: 'gear.vehicles', value: character.gear.vehicles, rows: 3, placeholder: 'Hovercraft, bikes, APCs, sentinels...' })}
      </div>
      ${createLabeledTextarea({ label: 'Hardline Notes', name: 'gear.hardlineNotes', value: character.gear.hardlineNotes, rows: 4, placeholder: 'Exit points, backups, dangerous zones...' })}
    </section>
  `;
}

function renderNotesTab(character) {
  return `
    <section class="sheet-card sheet-card-wide">
      <h3>Campaign Notes And Future NFT Viewer</h3>
      <div class="field-grid two-up">
        ${createLabeledTextarea({ label: 'Session Notes', name: 'notes', value: character.notes, rows: 7, placeholder: 'Mission goals, betrayals, unresolved hooks...' })}
        <div class="nft-card">
          <p class="eyebrow">Future ETH Hook</p>
          <h4>Matrix NFT viewing placeholder</h4>
          <p class="nft-copy">The app already reserves character-level wallet and collection metadata so a later update can plug in wallet connect and read-only NFT display without changing the saved character format.</p>
          ${createLabeledInput({ label: 'Wallet Address', name: 'nft.walletAddress', value: character.nft.walletAddress, placeholder: '0x...' })}
          ${createLabeledTextarea({ label: 'Collection Notes', name: 'nft.collectionNotes', value: character.nft.collectionNotes, rows: 3, placeholder: 'Collection name, token IDs, display preferences...' })}
          <button class="ghost-button" type="button" data-action="nft-placeholder">Prepare NFT Viewer Later</button>
        </div>
      </div>
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

  document.querySelector('[data-action="nft-placeholder"]')?.addEventListener('click', () => {
    setStatus('NFT viewer placeholder saved. Wallet connect can be wired into this character schema later.');
    render();
  });
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
