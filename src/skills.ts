/**
 * Official skill lists sourced from:
 *   docs/matrix_skills.md          — General skills
 *   docs/matrix_operator_skills.md — Operator skills
 *
 * Attribute values match the character sheet's attributeOptions array.
 * Dual-attribute skills (e.g. Agility/Focus) use the first listed attribute.
 */

export interface Skill {
  readonly name: string
  readonly attribute: string
  readonly category: string
  readonly source: 'general' | 'operator'
  readonly description: string
}

export const CATEGORY_ORDER = [
  'Combat', 'Weapons', 'Vehicles', 'Infiltration', 'Social',
  'Investigative', 'Physical', 'Technical', 'Knowledge', 'Medical',
  'Survival', 'Operator',
] as const

export const SKILLS: readonly Skill[] = [
  // ── Agility ──────────────────────────────────────────────────────────────
  {
    name: 'Aircraft Piloting', attribute: 'Agility', category: 'Vehicles', source: 'general',
    description: 'Piloting a hovercraft and other vehicles that stay airborne during operation. This includes landing, stopping, combat maneuvers, high speed control, etc.',
  },
  {
    name: 'Ambidextrous', attribute: 'Agility', category: 'Physical', source: 'general',
    description: 'Ability to use both hands equally well for anything.',
  },
  {
    name: 'Archery', attribute: 'Agility', category: 'Weapons', source: 'general',
    description: 'Propelling arrows with the use of a bow or crossbow. This will also allow the character to do fletching.',
  },
  {
    name: 'Balancing Feats', attribute: 'Agility', category: 'Physical', source: 'general',
    description: 'Walk tight ropes, juggle, stack plates, etc.',
  },
  {
    name: 'Dancing', attribute: 'Agility', category: 'Physical', source: 'general',
    description: 'Ballroom dancing, club dancing, ballet, stage performance, etc.',
  },
  {
    name: 'Driving', attribute: 'Agility', category: 'Vehicles', source: 'general',
    description: 'See Ground Craft Piloting.',
  },
  {
    name: 'Ground Craft Piloting', attribute: 'Agility', category: 'Vehicles', source: 'general',
    description: 'There are still some wheeled and tracked vehicles in use. This skill represents the ability to control and pilot such craft.',
  },
  {
    name: 'Gun Fighting', attribute: 'Agility', category: 'Combat', source: 'general',
    description: 'Weapons that use gunpowder, or explosives, to propel a metal slug at your target. Examples include Handguns, Rifles, Shotguns, Submachine Guns, Assault Rifles, Artillery Guns, and Machine Guns.',
  },
  {
    name: 'Knife Fighting', attribute: 'Agility', category: 'Combat', source: 'general',
    description: 'Fighting with knives using martial fighting skills like Eskrima, Esgrima Criolla, The Andalusian legacy, or Scherma di Stiletto Siciliano. This is an athletic, close combat form of fighting.',
  },
  {
    name: 'Martial Arts', attribute: 'Agility', category: 'Combat', source: 'general',
    description: 'Formal hand to hand combat techniques — Aikido, Karate, Ju Jitsu, Kendo, etc. Please pick individual styles as each of your fighting skills.',
  },
  {
    name: 'Polearm fighting', attribute: 'Agility', category: 'Combat', source: 'general',
    description: 'Fighting with close combat weapons in which the main fighting part of the weapon is on the end of a long shaft. Axes, maces, and morning stars are considered polearms.',
  },
  {
    name: 'Sleight of hand', attribute: 'Agility', category: 'Infiltration', source: 'general',
    description: 'Tricking the eye to see or not see a hand gesture through deception, magic tricks.',
  },
  {
    name: 'Blade Fighting', attribute: 'Agility', category: 'Combat', source: 'general',
    description: 'Using bladed weapons. Swords are very popular weapons against the Machines in the Real World, because they have been developed to cut through metal.',
  },
  {
    name: 'Thai Boxing', attribute: 'Agility', category: 'Combat', source: 'general',
    description: 'Thai boxing, a form of hand to hand combat.',
  },
  {
    name: 'Throwing Weapons', attribute: 'Agility', category: 'Weapons', source: 'general',
    description: 'The skill to aim, balance, and throw a weapon with deadly effectiveness. Throwing weapons include knives, spears, shurikens, and rocks.',
  },
  {
    name: 'Escape Bonds', attribute: 'Agility', category: 'Infiltration', source: 'general', // Agility/Common Sense
    description: 'The ability to get out of handcuffs, ropes, and avoid being held.',
  },
  {
    name: 'Sci Fi Weapons', attribute: 'Agility', category: 'Weapons', source: 'general', // Agility/Focus
    description: 'This skill is specific to the weapon the character is using, such as a Plasma Cannon or Laser Rifle. These types of weapons are so unique that a person has to learn each one individually.',
  },
  {
    name: 'Acrobatics', attribute: 'Agility', category: 'Physical', source: 'general', // Agility/Strength
    description: 'Flips, vaults, rolls, and tumbling.',
  },

  // ── Common Sense ─────────────────────────────────────────────────────────
  {
    name: 'Acting', attribute: 'Common Sense', category: 'Social', source: 'general',
    description: 'Pretending to be someone else, creating emotions at will.',
  },
  {
    name: 'Animal Training/Handling', attribute: 'Common Sense', category: 'Survival', source: 'general',
    description: 'Training animals to listen to commands, domesticating animals.',
  },
  {
    name: 'Bartering', attribute: 'Common Sense', category: 'Social', source: 'general',
    description: 'Used to levy better deals in trades. General knowledge of an item\'s value.',
  },
  {
    name: 'Blackmarket', attribute: 'Common Sense', category: 'Social', source: 'general',
    description: 'Locating and bargaining in the black market. The character knows who to talk to and what to say to find or sell on the black market.',
  },
  {
    name: 'Coercion', attribute: 'Common Sense', category: 'Social', source: 'general',
    description: 'Seduction, manipulation, scamming, intimidation, bluffing to get what they want.',
  },
  {
    name: 'Conceal', attribute: 'Common Sense', category: 'Infiltration', source: 'general',
    description: 'Hiding objects and self.',
  },
  {
    name: 'Diplomacy', attribute: 'Common Sense', category: 'Social', source: 'general',
    description: 'The ability to convince others of seeing another point of view, and to cut through red tape easier than others.',
  },
  {
    name: 'Disguises', attribute: 'Common Sense', category: 'Infiltration', source: 'general',
    description: 'Concealing identity with makeup, clothes, change of appearance.',
  },
  {
    name: 'Gambling', attribute: 'Common Sense', category: 'Social', source: 'general',
    description: 'Statistically improve chances of winning games.',
  },
  {
    name: 'Gather Information', attribute: 'Common Sense', category: 'Social', source: 'general',
    description: 'Conversing with others to collect information without notice.',
  },
  {
    name: 'Guerrilla Tactics', attribute: 'Common Sense', category: 'Knowledge', source: 'general',
    description: 'Irregular warfare with small groups of fighters who use tactics like ambushes, sabotage, element of surprise, and raids.',
  },
  {
    name: 'History of Zion', attribute: 'Common Sense', category: 'Knowledge', source: 'general',
    description: 'A general knowledge of the human history of Zion, or any city or area of choice.',
  },
  {
    name: 'Interrogate', attribute: 'Common Sense', category: 'Social', source: 'general',
    description: 'Using force and/or manipulation to obtain information.',
  },
  {
    name: 'Nomad Clan Customs', attribute: 'Common Sense', category: 'Knowledge', source: 'general',
    description: 'Every nomad clan has special customs and ways of doing things, rituals they must perform, etc. This is a knowledge every clansman must have for her clan.',
  },
  {
    name: 'Philosophy', attribute: 'Common Sense', category: 'Knowledge', source: 'general',
    description: 'Study of problems in the fields of knowledge, reality, values, morals, mind, and existence. Philosophers address these problems using critical thinking and logic.',
  },
  {
    name: 'Photography', attribute: 'Common Sense', category: 'Knowledge', source: 'general',
    description: 'Digital or film, journalistic, art, sports, picture composition, and modeling.',
  },
  {
    name: 'Religion', attribute: 'Common Sense', category: 'Knowledge', source: 'general',
    description: 'Study of religious beliefs, behaviors, holidays, traditions, and religious institutions of a specific religion.',
  },
  {
    name: 'Remote Piloting', attribute: 'Common Sense', category: 'Vehicles', source: 'general',
    description: 'Controlling anything mechanized with remote access controls. Vehicles can have remotes, sentinel frames can be augmented to have remote control capability also. Must have the skills for the vehicle type that is being piloted.',
  },
  {
    name: 'Snooping', attribute: 'Common Sense', category: 'Infiltration', source: 'general',
    description: 'Knowledge of how to set up bugging devices, detect hidden microphones, video cameras, etc.',
  },
  {
    name: 'Stalk', attribute: 'Common Sense', category: 'Investigative', source: 'general',
    description: 'To follow someone unnoticed, shadowing.',
  },
  {
    name: 'Stealth', attribute: 'Common Sense', category: 'Infiltration', source: 'general',
    description: 'Knowledge of how not to be detected. General camouflage and silence techniques. Hide while moving.',
  },
  {
    name: 'Surveillance', attribute: 'Common Sense', category: 'Investigative', source: 'general',
    description: 'Build and use security with cameras, motion sensors.',
  },
  {
    name: 'Thieving', attribute: 'Common Sense', category: 'Infiltration', source: 'general',
    description: 'Stealing, pickpocketing.',
  },
  {
    name: 'Track', attribute: 'Common Sense', category: 'Investigative', source: 'general',
    description: 'To follow someone who cannot be seen by following a trail or clues of his/her passage.',
  },
  {
    name: 'Linguist', attribute: 'Common Sense', category: 'Knowledge', source: 'general', // Common Sense/Focus
    description: 'Understand basic structure of languages, figure out words and phrases from similarly familiar languages.',
  },
  {
    name: 'Perception', attribute: 'Common Sense', category: 'Investigative', source: 'general', // Common Sense/Focus
    description: 'The ability to notice the common things, and pick out the details and the unexpected. Used by the GM to check whether a character notices something — as simple as seeing a canyon off in the distance, or as critical as noticing an ambush ahead.',
  },
  {
    name: 'PunkSmithing', attribute: 'Common Sense', category: 'Technical', source: 'general', // Common Sense/Strength
    description: 'Designing technology from other scavenged bits of machines and broken things.',
  },
  {
    name: 'Salvage', attribute: 'Common Sense', category: 'Survival', source: 'general', // Common Sense/Strength
    description: 'The ability to, with the right tools, remove and collect things of value from where they are. For example, a character who understands sentinel hardware can remove parts from the frame in a way that preserves their trade value.',
  },

  // ── Endurance ────────────────────────────────────────────────────────────
  {
    name: 'Running', attribute: 'Endurance', category: 'Physical', source: 'general',
    description: 'The knowledge of how to pace oneself and increase running endurance. Most Desert clansmen can run for days with little to no rest.',
  },
  {
    name: 'Survival', attribute: 'Endurance', category: 'Survival', source: 'general',
    description: 'Knowledge of how to survive in a harsh environment such as the wilderness, jungle, mountains, plains, or desert.',
  },
  {
    name: 'Ice Desert Survival', attribute: 'Endurance', category: 'Survival', source: 'general', // Endurance/Focus
    description: 'A general knowledge of surface arctic survival, foraging skills, flora & fauna, dangerous weather conditions, ice climbing, and other cold climate knowledge.',
  },
  {
    name: 'Rock climbing', attribute: 'Endurance', category: 'Physical', source: 'general', // Endurance/Strength
    description: 'The knowledge of things like how to belay, climbing techniques, climbing cracks, lead climbing, placing gear, setting anchors, top rope climbing, climbing communication, self rescue and other essential skills.',
  },

  // ── Focus ────────────────────────────────────────────────────────────────
  {
    name: 'Aiming', attribute: 'Focus', category: 'Combat', source: 'general',
    description: 'Aiming is done in game so the character can have a special effect. On a successful aiming task the PC can have a special roleplay event happen — something the player describes to add to the story.',
  },
  {
    name: 'Art', attribute: 'Focus', category: 'Knowledge', source: 'general',
    description: 'Creating works of art, drawing and painting, sculptures, airbrushing.',
  },
  {
    name: 'Biology', attribute: 'Focus', category: 'Knowledge', source: 'general',
    description: 'Knowledge of the science of biology and life forms. Covers genetics to ecosystems.',
  },
  {
    name: 'Chemistry', attribute: 'Focus', category: 'Knowledge', source: 'general',
    description: 'Knowledge of the science of understanding and mixing chemical elements.',
  },
  {
    name: 'City Speak', attribute: 'Focus', category: 'Knowledge', source: 'general',
    description: 'The knowledge of the tones, inflections, and general jargon that will get you around in the city. Specify the city that you can use City Speak in.',
  },
  {
    name: 'Demolitions', attribute: 'Focus', category: 'Technical', source: 'general',
    description: 'Knowledge of how to use demolitions, analyze and disarm bombs, set explosives, and make explosives.',
  },
  {
    name: 'Electronics', attribute: 'Focus', category: 'Technical', source: 'general',
    description: 'Knowledge of how to operate, analyze, repair, and build electronic devices. The character knows how to mess with do-dads and usually keeps things in general working order.',
  },
  {
    name: 'Encryption', attribute: 'Focus', category: 'Technical', source: 'general',
    description: 'Encode cryptographic information, crack codes.',
  },
  {
    name: 'First Aid', attribute: 'Focus', category: 'Medical', source: 'general',
    description: 'Stabilizing wounds, treating minor burns and cuts, CPR.',
  },
  {
    name: 'Forgery', attribute: 'Focus', category: 'Infiltration', source: 'general',
    description: 'Create duplicates of documents, fake IDs, counterfeiting, etc.',
  },
  {
    name: 'Geology', attribute: 'Focus', category: 'Knowledge', source: 'general',
    description: 'Science of studying solid earth. Geology gives humans insight into what makes up the earth around them and its origins.',
  },
  {
    name: 'Gunsmith', attribute: 'Focus', category: 'Weapons', source: 'general',
    description: 'A person who repairs, modifies, designs, or builds guns.',
  },
  {
    name: 'Hand signals', attribute: 'Focus', category: 'Knowledge', source: 'general',
    description: 'This skill is very specific to small groups. It is used in clans for communicating when the conversation is supposed to be private. Each group has its own set of hand signals.',
  },
  {
    name: 'Hypnotize', attribute: 'Focus', category: 'Social', source: 'general',
    description: 'Getting people into a mental state that makes them more susceptible to suggestions.',
  },
  {
    name: 'Law', attribute: 'Focus', category: 'Knowledge', source: 'general',
    description: 'Knowledge of the local laws and legal organizations.',
  },
  {
    name: 'Leadership', attribute: 'Focus', category: 'Social', source: 'general',
    description: 'Ability to gain the respect of a group of people and make them susceptible to influence.',
  },
  {
    name: 'Locksmithing', attribute: 'Focus', category: 'Infiltration', source: 'general',
    description: 'Understand locking mechanisms, ability to unlock doors, safes, combination, key, and electronic pads.',
  },
  {
    name: 'Medical Knowledge', attribute: 'Focus', category: 'Medical', source: 'general',
    description: 'Knowledge of how to stitch people up. An understanding of first aid, battlefield surgery, and proper sterilization techniques. At the teacher level, the character can perform surgery on people.',
  },
  {
    name: 'Navigate', attribute: 'Focus', category: 'Knowledge', source: 'general',
    description: 'Ability to use navigation equipment to plot and hold a course.',
  },
  {
    name: 'System Operations', attribute: 'Focus', category: 'Knowledge', source: 'general',
    description: 'The physical and theoretical knowledge of the Machines, sentinels, and frames. The understanding of how they tick, what they do, etc.',
  },
  {
    name: 'Vehicle Repair (by piloting type)', attribute: 'Focus', category: 'Vehicles', source: 'general',
    description: 'The character can rebuild an engine, set a hovercraft\'s anti-grav controls. Depending on what it is and the type of equipment one has, the character can fix whatever is in front of them.',
  },
  {
    name: 'Writing', attribute: 'Focus', category: 'Knowledge', source: 'general',
    description: 'The ability to write down spoken words in one\'s own language, to organize thoughts into written forms like poetry, prose, fiction, and non-fiction.',
  },
  {
    name: 'Blacksmith', attribute: 'Focus', category: 'Technical', source: 'general', // Focus/Strength
    description: 'Metallurgy, melting, and casting new objects from various metals and scraps.',
  },

  // ── Strength ─────────────────────────────────────────────────────────────
  {
    name: 'Boxing', attribute: 'Strength', category: 'Combat', source: 'general',
    description: 'Trained fist fighting.',
  },
  {
    name: 'Brawling', attribute: 'Strength', category: 'Combat', source: 'general',
    description: 'Untrained street fighting.',
  },
  {
    name: 'Fitness', attribute: 'Strength', category: 'Physical', source: 'general',
    description: 'Ability to work out and keep physically active to improve health.',
  },
  {
    name: 'Parkor', attribute: 'Strength', category: 'Physical', source: 'general',
    description: 'A physical discipline which focuses on efficient movement around obstacles.',
  },
  {
    name: 'Swimming', attribute: 'Strength', category: 'Physical', source: 'general',
    description: 'Studying the mechanics of swimming for extra speed and strength. The knowledge of different swim strokes like freestyle, backstroke, breaststroke, and butterfly.',
  },

  // ── Operator (matrix_operator_skills.md) ─────────────────────────────────
  {
    name: 'Programming', attribute: 'Focus', category: 'Operator', source: 'operator',
    description: 'Being able to read the Matrix code. Use Programming to create simulacra equipment for the Matrix. Operators use Programming Hacks to see the construct for what it is and help RSIs navigate the system.',
  },
  {
    name: 'Matrix Power Plant Hardware', attribute: 'Focus', category: 'Operator', source: 'operator',
    description: 'Understanding the actual hardware and tech that makes up any construct based technology.',
  },
]
