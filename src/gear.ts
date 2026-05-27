export interface GearCategory {
  readonly category: string
  readonly items: readonly string[]
}

export const REAL_WORLD_GEAR: readonly GearCategory[] = [
  {
    category: 'Equipment',
    items: [
      'Desert Suit', 'Battle Suit (APU)', 'Thermal Wear (Light)', 'Thermal Wear (Medium)',
      'Thermal Wear (Heavy)', 'Dig Dug', 'Canteen', 'Desert Tents', 'Nomad Stick',
      'Climbing Gear', 'Land Mine', 'Plastic Explosive', 'TNT', 'Ration Packs',
      'Infrared (IR) Goggles', 'Dark Particle Goggles', 'First Aid Gear', 'Punksmith Tools',
    ],
  },
  {
    category: 'Hardware',
    items: [
      'Neural Interface', 'Skill Chips', 'Cyber Limbs', 'Skill Chip Processor',
      "Operator's Broadcast Control Deck", 'Wifi Decoy',
    ],
  },
  {
    category: 'Weapons',
    items: [
      'Bow', 'Crossbow', 'Chain Knife', 'Survival Knife', 'Chain Axe', 'Acid Gun',
      'EMP Cannon', 'Laser Rifle', 'Net Gun', 'Plasma Cannon', 'Plasma Gun',
      'Chain Sword', 'Cutter Sword', 'EMP Grenades', 'Throwing Knives', 'Gun Scopes',
      'Handgun "Fizbang"', 'Handgun "Gorilla Gun"', 'Handgun "Popper"', 'Handgun "Mini Grinder"',
      'Rifle "Copperfield"', 'Rifle "Dragon Shroud II"',
      'Shotgun "Peabody"', 'Shotgun "Xtrema"', 'Shotgun "Jackhammer"',
      'SMG "Kommando"', 'SMG "Uzi"',
      'Machine Gun "Skoda"', 'Machine Gun "Mauser Mini Gun"',
      'Assault Rifle "AR-G3"', 'Assault Rifle "Chow Chat"', 'Assault Rifle "HK"',
    ],
  },
  {
    category: 'Vehicles',
    items: [
      'Speeder Hovercraft', 'Zion Military Hovercraft', 'Nomad Hovercraft',
      'Torpedo Hovercraft', 'Squidi (Sentinel Frame)',
    ],
  },
]

export const MATRIX_GEAR: readonly GearCategory[] = [
  {
    category: 'Equipment',
    items: [
      'Cash & Credit Cards', 'Clothes', 'Phone', 'Fake IDs', 'Sunglasses',
      'Extraction Apparatus', 'Bug Removal Tool', 'Beacon',
    ],
  },
  {
    category: 'Weapons',
    items: [
      'Desert Eagle .50 cal', 'Beretta 92fs 9mm', 'S&W Revolver .38',
      'H&K MP5', 'M-16', 'Mossberg Shotgun', 'Glock .45',
      'Hand Grenade', 'RPG', 'M72 LAW Rocket', 'APS Machine Pistol',
      '7mm Remington Sniper Rifle', 'Browning Hunting Rifle',
      'Tanto Survival Knife', 'Throwing Knives', 'Ruger .22', 'Katana', 'Rapier',
    ],
  },
  {
    category: 'Vehicles',
    items: [
      'Ducati Motorcycle', 'Harley Davidson Hog', 'Ferrari Sports Car',
      'Subaru Sedan', 'Ford Compact Car', 'Mercedes Luxury Sedan',
      'Jeep SUV', 'Toyota Mini Van', "U-Move Small Truck (20')", "Mac Truck (30')",
    ],
  },
]

export const VEHICLES_ALL: readonly GearCategory[] = [
  {
    category: 'Real World Vehicles',
    items: [
      'Speeder Hovercraft', 'Zion Military Hovercraft', 'Nomad Hovercraft',
      'Torpedo Hovercraft', 'Squidi (Sentinel Frame)',
    ],
  },
  {
    category: 'Simulacra Vehicles',
    items: [
      'Ducati Motorcycle', 'Harley Davidson Hog', 'Ferrari Sports Car',
      'Subaru Sedan', 'Ford Compact Car', 'Mercedes Luxury Sedan',
      'Jeep SUV', 'Toyota Mini Van', "U-Move Small Truck (20')", "Mac Truck (30')",
    ],
  },
]

export const CONTACT_ROLES: readonly string[] = [
  'Captain', 'Operator', 'Fixer', 'Informant', 'Analyst', 'Smuggler', 'Medic',
  'Mechanic', 'Resistance Fighter', 'Zion Council Member', 'Black Market Dealer',
  'Bluepill Informant', 'Underground Hacker', 'Former Agent',
]
