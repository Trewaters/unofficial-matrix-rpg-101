export interface Feat {
  readonly name: string
  readonly attribute: string
  readonly ruleBender: string
  readonly ruleBreaker: string
}

export const FEATS: readonly Feat[] = [
  {
    name: 'Acute Hearing',
    attribute: 'CyberZen',
    ruleBender: 'The ability to hear sounds that would normally be too low or too far off to hear with normal hearing.',
    ruleBreaker: 'Character can hear any frequency even those that are normally inaudible to human ears.',
  },
  {
    name: 'Atmospheric Adaptation',
    attribute: 'CyberZen',
    ruleBender: 'Character can breathe noxious gases without any adverse effects. Even though characters can inhale noxious gases they are unable to breathe underwater.',
    ruleBreaker: 'Character can breathe water, noxious fumes/gases, or go without oxygen completely.',
  },
  {
    name: 'Blindness',
    attribute: 'CyberZen',
    ruleBender: 'The characters must be able to touch their target. With a simple touch the character can make a RSI blind. They can affect a number of targets equal to their Matrix feat rating.',
    ruleBreaker: 'Character can make a redpill RSI blind while they are plugged into the Matrix. The effect lasts as long as the targets stay in the Matrix.',
  },
  {
    name: 'Change Material',
    attribute: 'CyberZen',
    ruleBender: 'The character has the ability to change the weight, size, and the color of an item temporarily. The item retains its shape and possibly its original function depending on how it is altered (GM\'s discretion). The character can only affect one item at a time. The objects affected must be smaller than the character.',
    ruleBreaker: 'The character has the ability to alter an object\'s molecular structure in the Matrix — changing a gun to butter, concrete to water, water to wine, etc. A single object of any size can be changed in this way.',
  },
  {
    name: 'Control Animal(s)',
    attribute: 'CyberZen',
    ruleBender: 'The character has the ability to lock gazes with an animal and make that particular animal follow his commands.',
    ruleBreaker: 'The character can control more than one animal at a time. Characters are only able to control as many animals as their Matrix feat rating.',
  },
  {
    name: 'Control Gravity',
    attribute: 'CyberZen',
    ruleBender: 'Character can control how gravity works by increasing or decreasing it on one person or object. They have to touch the object.',
    ruleBreaker: 'Character can control gravity in an area that they can see, equal to their Matrix feat rating in meters.',
  },
  {
    name: 'Control Plant(s)',
    attribute: 'CyberZen',
    ruleBender: 'Character can touch a plant and make it grow rapidly in a certain direction — like a plant reaching toward the sun, but instant.',
    ruleBreaker: 'Character can make multiple plants grow or wither at will. GM discretion as to whether the character could affect an entire acre or farm of crops.',
  },
  {
    name: 'Control Weather',
    attribute: 'CyberZen',
    ruleBender: 'Make a rainstorm on a sunny day. The more abnormal or extreme the weather change the more difficult the task roll.',
    ruleBreaker: 'Without changing the entire weather pattern the character can call lightning to strike any spot of their choosing, or call a tornado on a calm day.',
  },
  {
    name: 'Create Simple Objects',
    attribute: 'CyberZen',
    ruleBender: 'The character can restore simple objects that have been destroyed — for example restoring a burnt candle to its original state. They must touch the item.',
    ruleBreaker: 'The character has the ability to make small simple objects from nothing. Simple objects don\'t have any moving parts. The character must touch the item being made.',
  },
  {
    name: 'Disguise',
    attribute: 'CyberZen',
    ruleBender: 'A player can disguise herself to agents and other people within the Matrix. RSI\'s don\'t see the character as she is, but rather as she would like to be seen.',
    ruleBreaker: 'Player can change their height and weight, alter appendages, and mimic someone specifically down to the DNA — indiscernible from the original. Characters must stay human.',
  },
  {
    name: 'Dodging Bullets',
    attribute: 'CyberZen',
    ruleBender: 'Character has an uncanny ability to dodge non-ballistic speed objects. Character can easily dodge bows and arrows.',
    ruleBreaker: 'The character can dodge ballistics and projectiles in the Matrix. When a character uses dodge they cannot perform any other actions that turn.',
  },
  {
    name: 'Eagle Eyes',
    attribute: 'CyberZen',
    ruleBender: 'Character can see long distances as though they were closer — reading a newspaper a block away as if held in hand. This feat gives extreme tunnel vision while active.',
    ruleBreaker: 'Character\'s eyes can vary their magnification from normal to the power of an electron microscope. Tunnel vision still applies when using this feat.',
  },
  {
    name: 'Enhanced Smell',
    attribute: 'CyberZen',
    ruleBender: 'Character smells scents like a bloodhound. They can use this ability to track a person or object by its scent.',
    ruleBreaker: 'A character can use smell to identify anyone they have smelled before, even in disguise. The character is so sensitive they can pick up pheromones similar to how ants follow each other.',
  },
  {
    name: 'Firestarter',
    attribute: 'CyberZen',
    ruleBender: 'Character is able to increase or decrease the intensity of fire that is already burning. Cannot create flame from nothing.',
    ruleBreaker: 'Character can create fire from nothing. It is easier if they have something to set on fire.',
  },
  {
    name: 'Flight',
    attribute: 'CyberZen',
    ruleBender: 'Character can glide on air currents without the aid of wings. Gliders are not propelled so they don\'t move fast unless diving. The character can also turn off this feat to fall normally.',
    ruleBreaker: 'The character can fly like superman.',
  },
  {
    name: 'Forcefield',
    attribute: 'CyberZen',
    ruleBender: 'The character can create a forcefield around their body that can repel objects, gases, or forces from touching the character. This field is on the surface of the character\'s body.',
    ruleBreaker: 'Extend this forcefield to others or around a certain area. They only control one forcefield — if using it to protect someone else they are not protected themselves.',
  },
  {
    name: 'Grow Claws',
    attribute: 'CyberZen',
    ruleBender: 'Alter nails and teeth so they have a razor sharp edge. They can also make them hard as diamonds.',
    ruleBreaker: 'Grow fingernails and toenails longer and stronger like cat claws. Character could even make bone poke through skin in desired areas.',
  },
  {
    name: 'Heal',
    attribute: 'CyberZen',
    ruleBender: 'Character can roll Endurance to reduce damage up to their CyberZen rating, once per day.',
    ruleBreaker: 'Character can lay hands on another character and allow them to roll their Endurance score to reduce damage even if they have already rolled once in that 24-hour period.',
  },
  {
    name: 'Increased Attribute',
    attribute: 'CyberZen',
    ruleBender: 'Make a task roll. For each success increase that attribute\'s dice pool by one die for the remainder of the scene. Cannot increase CyberZen. Total adjustable points equal Matrix Feat rating, split across multiple attributes.',
    ruleBreaker: 'Can also increase CyberZen. No limit to the amount of Attribute points the character can increase.',
  },
  {
    name: 'Increased Skill',
    attribute: 'CyberZen',
    ruleBender: 'Make a task roll. For each success increase that skill\'s dice pool by one die for the remainder of the scene. The amount of points that can be adjusted equals the feat\'s rating.',
    ruleBreaker: 'No limit to the amount of Skill points that the character can increase.',
  },
  {
    name: 'Invisibility',
    attribute: 'CyberZen',
    ruleBender: 'The character becomes harder for people to see — they can only be spotted if someone is staring directly at them and focusing.',
    ruleBreaker: 'A character can become completely translucent; light travels through them. Clothes and other items the character is wearing are unaffected by this feat.',
  },
  {
    name: 'Jump',
    attribute: 'CyberZen',
    ruleBender: 'Soften a deadly fall of twenty stories, or jump across extreme distances. You could jump across the Grand Canyon with this feat.',
    ruleBreaker: 'They can jump as far as they want — even for miles — as long as they are moving up and down, not side to side. The difference from flying is they cannot move horizontally through the air.',
  },
  {
    name: 'Mimic',
    attribute: 'CyberZen',
    ruleBender: 'Character can turn their body into an element they have come in contact with. The body can move like normal but has all the other characteristics of the element copied.',
    ruleBreaker: 'By touching an object, person, animal, or bug the character can become a copy of that thing down to the smallest detail. The character does not have to stay human.',
  },
  {
    name: 'Mind Control',
    attribute: 'CyberZen',
    ruleBender: 'Character can plant small one-word suggestions into a RSI\'s mind. Upon a successful roll the bluepill RSI will carry out that suggestion until its completion. The RSI will only follow suggestions that don\'t hurt them.',
    ruleBreaker: 'The character can possess bluepill RSIs with a psychic link and tell them to do what they want. The character also has the ability to manipulate memories.',
  },
  {
    name: 'Negate Matrix Feats',
    attribute: 'CyberZen',
    ruleBender: 'Character can temporarily negate the Matrix Feat ability and effects of other RSI\'s or programs.',
    ruleBreaker: 'The character can permanently negate the Matrix Feat ability and effects of other RSI\'s or programs.',
  },
  {
    name: 'Night Vision',
    attribute: 'CyberZen',
    ruleBender: 'Characters determine how night vision works for them: sonar, low light, or heat (infra-red).',
    ruleBreaker: 'Character doesn\'t need to see. They are completely aware of what is around them as though it were daylight. The character can turn the feat off if they want.',
  },
  {
    name: 'Pass Through Objects',
    attribute: 'CyberZen',
    ruleBender: 'Character can pass through thick liquids and objects as though they were made of air. Using this in water allows the character to run and move as though on land.',
    ruleBreaker: 'The character can walk through walls and pass through solid objects as though they were made of air.',
  },
  {
    name: 'Prehensile',
    attribute: 'CyberZen',
    ruleBender: 'Character can use their tongue, feet and ears to grab things as though they were using their hands. The character could use their feet to fire a handgun without difficulty.',
    ruleBreaker: 'Character can grow extra prehensile appendages they can use just like hands — they could even grow an extra arm.',
  },
  {
    name: 'Psychometry',
    attribute: 'CyberZen',
    ruleBender: 'A character can learn about the past of an object, place, or person by touching it.',
    ruleBreaker: 'A character can learn about the future of an object, place, or person by touching it.',
  },
  {
    name: 'Shapeshifting',
    attribute: 'CyberZen',
    ruleBender: 'A character can turn into an animal of their choice if they see it while they are shifting.',
    ruleBreaker: 'Character can shapeshift into any animal it has ever seen before, even without the animal present while the character is shifting.',
  },
  {
    name: 'Sonic Blast',
    attribute: 'CyberZen',
    ruleBender: 'Create a sonic blast that can shatter brittle materials like glass. It can also damage human eardrums or be used to stun an opponent.',
    ruleBreaker: 'Character can use their sonic blast to knock people over and hit things with force. A character could use the sonic blast to lift them up in the air or propel them along in the air.',
  },
  {
    name: 'Spatial Manipulation (Spatiokinesis)',
    attribute: 'CyberZen',
    ruleBender: 'Character can design a fixed area in the Matrix that allows them to control reality. This area does not change until it is destroyed or reformatted.',
    ruleBreaker: 'Character can manipulate the spatial reality of their immediate area — warp, bend, flip, crush, and otherwise manipulate all physical aspects of space within an area of their choosing, wherever they are.',
  },
  {
    name: 'Telekinesis',
    attribute: 'CyberZen',
    ruleBender: 'Character has the ability to lift objects up to their own weight if they focus on it. They must see the object.',
    ruleBreaker: 'Character has the ability to lift objects that weigh more than them with their minds, but they must be able to see it.',
  },
  {
    name: 'Telepathy',
    attribute: 'CyberZen',
    ruleBender: 'Character can read surface thoughts of other RSI\'s. People can notice when someone is reading their thoughts — it feels like someone is holding your head. Limited to one RSI at a time.',
    ruleBreaker: 'Characters can read any thoughts, even those the RSI tries to hide. This is limited to as many RSIs as their Matrix Feat rating.',
  },
  {
    name: 'Teleportation',
    attribute: 'CyberZen',
    ruleBender: 'A character can teleport very limited distances. Basically if they can see it they can teleport there.',
    ruleBreaker: 'Can teleport to any destination in the Matrix. Period.',
  },
  {
    name: 'Time Slow',
    attribute: 'CyberZen',
    ruleBender: 'For limited periods the character can slow down one object or person in the area. The object is slowed down for everyone, not just to the RSI with the Matrix Feat.',
    ruleBreaker: 'The character can slow down the actions of everyone else around them, making the player appear to move faster. Limited to a number of objects not to exceed the Matrix Feat rating.',
  },
  {
    name: 'True Sight',
    attribute: 'CyberZen',
    ruleBender: 'The character can see random snippets of code. It is up to the GM as to what the character sees — it should be small bits of information.',
    ruleBreaker: 'The character can see all of the simulacrum as Matrix code from within the Matrix.',
  },
  {
    name: 'Truth Sayer',
    attribute: 'CyberZen',
    ruleBender: 'The character can tell when someone is lying about anything, or when that person thinks they are lying about something.',
    ruleBreaker: 'The character can force a RSI to only tell the truth as far as they know. They don\'t feel compelled to talk, but anything they say is true and they don\'t know why.',
  },
  {
    name: 'Wall Crawling',
    attribute: 'CyberZen',
    ruleBender: 'The character can cling to walls with hands and/or feet like a spider or climbing insect. Smooth or wet surfaces are more difficult. Being completely upside down requires concentration.',
    ruleBreaker: 'The character can cling to ceilings and walls made of any material with any type of surface, slippery or not.',
  },
  {
    name: 'X-Ray Vision',
    attribute: 'CyberZen',
    ruleBender: 'Not literally using X-Rays. Character can see through thin walls and clothes as though they weren\'t there.',
    ruleBreaker: 'Character can see through lead and thick concrete as though it were not there.',
  },
]
