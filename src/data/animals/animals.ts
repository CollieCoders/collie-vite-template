export type Species = "dog" | "cat";

export type BreedGuess = {
  /** Breed name. Use "Unknown" when applicable. */
  name: string;
  /**
   * How confident the shelter/rescue is about this breed.
   * - "primary": clearly dominant / strongly identified
   * - "secondary": visible mix component
   * - "suspected": possible but not confirmed
   * - "unknown": explicitly unknown/undetermined
   */
  confidence: "primary" | "secondary" | "suspected" | "unknown";
};

export type Animal = {
  id: number;
  species: Species;

  name: string;
  image: string; // leave empty; you’ll provide actual image paths/URLs later

  breeds: BreedGuess[];

  /** Total age in months for easy filtering/sorting. */
  ageMonths: number;

  /** Friendly display label (useful for UI without formatting logic). */
  ageLabel: string;

  tagline: string;

  /** Longer description; UI can truncate + expand. */
  bio: string;

  /**
   * Positive traits (“pros”) — called “highlights” so it reads better in UI.
   * Keep these consistent for filtering chips later if you want.
   */
  highlights: string[];

  /**
   * Constraints/notes (“cons”) — called “considerations” so it stays empathetic.
   * These should not contradict highlights (e.g., don’t include both good with kids + not good with kids).
   */
  considerations: string[];
};

export const animals: Animal[] = [
  {
    id: 1,
    species: "dog",
    name: "Milo",
    image: new URL("../../assets/animals/dog_placeholder.png", import.meta.url).href,
    breeds: [
      { name: "Labrador Retriever", confidence: "primary" },
      { name: "Mixed (Unknown)", confidence: "suspected" },
    ],
    ageMonths: 26,
    ageLabel: "2 years, 2 months",
    tagline: "Your future hiking buddy with a soft spot for belly rubs.",
    bio:
      "Milo is an easygoing, people-loving goofball who’s happiest when he’s included. He walks nicely once he settles in, checks in frequently, and seems to take comfort from routine. Milo knows a few basics and is food-motivated, which makes training feel like a fun game rather than work. He’s affectionate without being clingy and has the kind of face that convinces you to share snacks you absolutely did not plan to share.",
    highlights: ["Good with kids", "Dog-friendly", "House-trained", "Loves car rides", "Food-motivated"],
    considerations: ["Can get mouthy when excited (training helps)", "Needs daily exercise"],
  },
  {
    id: 2,
    species: "dog",
    name: "Juniper",
    image: new URL("../../assets/animals/dog_placeholder.png", import.meta.url).href,
    breeds: [
      { name: "Australian Cattle Dog", confidence: "primary" },
      { name: "Border Collie", confidence: "secondary" },
    ],
    ageMonths: 18,
    ageLabel: "1 year, 6 months",
    tagline: "Tiny athlete. Big brain. Even bigger joy.",
    bio:
      "Juniper is the kind of dog who learns patterns fast—sometimes faster than you intended. She loves interactive play (tug, fetch, puzzle toys) and thrives with a human who finds training satisfying. Juniper bonds tightly, offers excellent eye contact, and is eager to work for treats or praise. She’s silly in the house once her energy needs are met, and she’s happiest when she has a job: scent games, agility basics, or even learning fun tricks.",
    highlights: ["Very trainable", "Loves puzzles", "Great running partner", "Affectionate with her people"],
    considerations: ["High energy", "May herd small children (redirect + training)"],
  },
  {
    id: 3,
    species: "dog",
    name: "Rufus",
    image: new URL("../../assets/animals/dog_placeholder.png", import.meta.url).href,
    breeds: [
      { name: "German Shepherd Dog", confidence: "primary" },
      { name: "Mixed (Unknown)", confidence: "secondary" },
    ],
    ageMonths: 42,
    ageLabel: "3 years, 6 months",
    tagline: "Loyal guardian vibes, couch potato execution.",
    bio:
      "Rufus has that classic shepherd presence—aware, thoughtful, and loyal—without being a constant motion machine. He likes calm greetings, gentle structure, and clear expectations. Once he trusts you, he becomes your shadow in the best way. He’s smart, responsive to training, and enjoys routine walks where he can sniff and observe the world. Rufus would love an adopter who values a steady companion and will continue confidence-building and polite leash manners.",
    highlights: ["Very loyal", "Learns quickly", "Knows basic cues", "Calm in the home"],
    considerations: ["Prefers slow introductions to new dogs", "Can be wary of strangers at first"],
  },
  {
    id: 4,
    species: "dog",
    name: "Waffles",
    image: new URL("../../assets/animals/dog_placeholder.png", import.meta.url).href,
    breeds: [
      { name: "Beagle", confidence: "primary" },
      { name: "Basset Hound", confidence: "secondary" },
    ],
    ageMonths: 36,
    ageLabel: "3 years",
    tagline: "Nose to the ground, heart in your hands.",
    bio:
      "Waffles is a scent-driven sweetheart who believes every walk should be a full investigative documentary. He’s social, silly, and has the kind of expressive face that makes you forgive his occasional stubborn streak. He does best with patient, upbeat training and a secure yard or leash skills—because when a beagle nose decides to go, it goes. Indoors, Waffles is cozy and cuddly, especially after a good sniffari.",
    highlights: ["Dog-friendly", "Cuddly", "Great on routine walks", "Gentle demeanor"],
    considerations: ["Can be vocal", "Strong prey/scent drive (leash + secure doors)"],
  },
  {
    id: 5,
    species: "dog",
    name: "Nova",
    image: new URL("../../assets/animals/dog_placeholder.png", import.meta.url).href,
    breeds: [
      { name: "Siberian Husky", confidence: "primary" },
      { name: "Alaskan Malamute", confidence: "suspected" },
    ],
    ageMonths: 22,
    ageLabel: "1 year, 10 months",
    tagline: "A snow-dog spirit in need of a daily adventure.",
    bio:
      "Nova is bright-eyed, athletic, and always ready to turn your living room into a stage for interpretive dance. She’s playful with other dogs, thrives with enrichment, and would love a home that enjoys being active. Nova is affectionate, but independent—she’ll check in for cuddles, then go investigate something fascinating (like a leaf). She’s smart and benefits from training that’s short, fun, and consistent.",
    highlights: ["Dog-friendly", "Playful", "Great stamina", "Loves enrichment toys"],
    considerations: ["High energy", "Can be an escape artist (secure fencing)", "Seasonal shedding"],
  },
  {
    id: 6,
    species: "dog",
    name: "Otis",
    image: new URL("../../assets/animals/dog_placeholder.png", import.meta.url).href,
    breeds: [
      { name: "Boxer", confidence: "primary" },
      { name: "Mixed (Unknown)", confidence: "secondary" },
    ],
    ageMonths: 14,
    ageLabel: "1 year, 2 months",
    tagline: "Built like a tank, acts like a cartoon.",
    bio:
      "Otis is all joyful wiggles and enthusiastic friendship. He’s young, bouncy, and loves learning—especially if treats are involved. Otis will thrive with someone who can channel his energy into training, structured play, and good manners. He’s the kind of dog who greets the world like it’s his birthday, which is adorable… and also why he needs a little guidance with jumping and excitement.",
    highlights: ["Good with kids", "Very social", "Loves training games", "Goofy personality"],
    considerations: ["Still learning leash manners", "Jumps when excited"],
  },
  {
    id: 7,
    species: "dog",
    name: "Sage",
    image: new URL("../../assets/animals/dog_placeholder.png", import.meta.url).href,
    breeds: [
      { name: "Golden Retriever", confidence: "primary" },
      { name: "Mixed (Unknown)", confidence: "suspected" },
    ],
    ageMonths: 60,
    ageLabel: "5 years",
    tagline: "Sunshine on four paws, with excellent listening skills.",
    bio:
      "Sage is the steady, classic ‘family dog’ energy—soft, friendly, and easy to love. She enjoys being near her people, happily snoozes at your feet, and is content with daily walks and occasional zoomies. She’s gentle with handling and seems to enjoy calm companionship more than chaos. If you want a dog who feels like home, Sage is your girl.",
    highlights: ["Good with kids", "House-trained", "Easygoing", "Enjoys cuddles", "Polite indoors"],
    considerations: ["Needs regular grooming", "Prefers calmer dog friends"],
  },
  {
    id: 8,
    species: "dog",
    name: "Biscuit",
    image: new URL("../../assets/animals/dog_placeholder.png", import.meta.url).href,
    breeds: [
      { name: "Chihuahua", confidence: "primary" },
      { name: "Dachshund", confidence: "secondary" },
    ],
    ageMonths: 44,
    ageLabel: "3 years, 8 months",
    tagline: "Pocket-sized confidence with a cozy blanket obsession.",
    bio:
      "Biscuit is a tiny dog with a big personality. He’s affectionate once he warms up and loves being carried like royalty. Biscuit does best with respectful handling and a home that understands small-dog boundaries—he’s not trying to be dramatic, he’s just communicating. With consistency and gentle training, he’s an incredible companion and a champion lap-warmer.",
    highlights: ["Very cuddly", "Loves being near his person", "Good apartment candidate", "Smart and curious"],
    considerations: ["Shy with strangers at first", "Prefers older kids who respect boundaries"],
  },
  {
    id: 9,
    species: "dog",
    name: "Koda",
    image: new URL("../../assets/animals/dog_placeholder.png", import.meta.url).href,
    breeds: [
      { name: "Corgi", confidence: "suspected" },
      { name: "Terrier (Unknown)", confidence: "secondary" },
      { name: "Mixed (Unknown)", confidence: "primary" },
    ],
    ageMonths: 30,
    ageLabel: "2 years, 6 months",
    tagline: "Short legs, long comedic timing.",
    bio:
      "Koda is delightfully quirky—half comedian, half tiny athlete. He loves to play, chase toys, and investigate anything new. Koda is affectionate but not clingy; he’ll do a check-in cuddle and then go do important business (like staring at squirrels). He’s eager to learn, and training gives him a great outlet for his curiosity. If you like dogs with personality and a little mischief, Koda will make you laugh daily.",
    highlights: ["Playful", "Very food-motivated", "Learns quickly", "Good with kids"],
    considerations: ["Can be vocal when bored", "Needs structured play/exercise"],
  },
  {
    id: 10,
    species: "dog",
    name: "Luna",
    image: new URL("../../assets/animals/dog_placeholder.png", import.meta.url).href,
    breeds: [
      { name: "Pit Bull Terrier", confidence: "primary" },
      { name: "American Bulldog", confidence: "secondary" },
    ],
    ageMonths: 28,
    ageLabel: "2 years, 4 months",
    tagline: "The cuddle champion who thinks she’s a tiny lap dog.",
    bio:
      "Luna is affectionate, people-oriented, and happiest when she can lean into you like a warm weighted blanket. She enjoys play sessions, but her true superpower is relaxing with her person. Luna responds well to positive reinforcement and loves praise. She’s the kind of dog who makes eye contact like she’s trying to understand your soul, then flops over for belly rubs.",
    highlights: ["Very affectionate", "Good with kids", "House-trained", "Loves cuddles", "Eager to please"],
    considerations: ["Prefers being the only dog", "Needs slow introductions to new environments"],
  },
  {
    id: 11,
    species: "dog",
    name: "Scout",
    image: new URL("../../assets/animals/dog_placeholder.png", import.meta.url).href,
    breeds: [
      { name: "Border Collie", confidence: "primary" },
      { name: "Australian Shepherd", confidence: "secondary" },
    ],
    ageMonths: 16,
    ageLabel: "1 year, 4 months",
    tagline: "A smart cookie who wants to learn everything you know.",
    bio:
      "Scout is bright, attentive, and built for partnership. He loves clicker-style training, picks up patterns quickly, and thrives with structure. Scout is affectionate and will happily chill once he’s had his mental workout—training, sniff games, and interactive play go a long way. He’d do best in a home that enjoys ongoing training and can provide daily brain work, not just a backyard.",
    highlights: ["Extremely trainable", "Great focus", "Athletic", "Loves learning tricks"],
    considerations: ["High mental energy", "Can become restless without enrichment"],
  },
  {
    id: 12,
    species: "dog",
    name: "Hazel",
    image: new URL("../../assets/animals/dog_placeholder.png", import.meta.url).href,
    breeds: [
      { name: "Shih Tzu", confidence: "primary" },
      { name: "Poodle (Toy/Mini)", confidence: "suspected" },
    ],
    ageMonths: 84,
    ageLabel: "7 years",
    tagline: "Soft, sweet, and ready for slow mornings.",
    bio:
      "Hazel is a calm companion who loves cozy routines. She’s polite indoors, enjoys gentle strolls, and is happiest when she can nap near you. Hazel would be perfect for someone who wants a lower-energy buddy that still enjoys connection. She’s affectionate without being demanding and has the gentle vibe of a dog who’s seen enough chaos and is choosing peace.",
    highlights: ["Low energy", "Good apartment candidate", "Loves cuddles", "Calm demeanor"],
    considerations: ["Needs regular grooming", "Prefers a quiet home"],
  },
  {
    id: 13,
    species: "dog",
    name: "Diesel",
    image: new URL("../../assets/animals/dog_placeholder.png", import.meta.url).href,
    breeds: [
      { name: "Rottweiler", confidence: "primary" },
      { name: "Mixed (Unknown)", confidence: "secondary" },
    ],
    ageMonths: 50,
    ageLabel: "4 years, 2 months",
    tagline: "Big gentle bear energy with a loyal heart.",
    bio:
      "Diesel is a sturdy, affectionate dog who bonds deeply with his people. He enjoys calm leadership, consistent routines, and is happiest when he knows what’s expected. Diesel walks well with a little warm-up time, likes lounging near you, and can be quite goofy when he relaxes. He’d do best with adopters who enjoy a larger companion and will keep up basic training and confidence-building.",
    highlights: ["Very loyal", "Calm indoors", "Learns routines quickly", "Affectionate with family"],
    considerations: ["Slow introductions to strangers", "Prefers calm dog friends"],
  },
  {
    id: 14,
    species: "dog",
    name: "Poppy",
    image: new URL("../../assets/animals/dog_placeholder.png", import.meta.url).href,
    breeds: [
      { name: "Poodle (Standard)", confidence: "primary" },
      { name: "Labrador Retriever", confidence: "secondary" },
    ],
    ageMonths: 20,
    ageLabel: "1 year, 8 months",
    tagline: "Curly-haired joy who loves games and compliments.",
    bio:
      "Poppy is playful, smart, and has the kind of ‘let’s do something fun’ attitude that makes every day better. She loves learning tricks, enjoys fetch, and is social with people. Poppy’s a great candidate for continued training—she’s quick, engaged, and motivated. She would thrive in an active home that enjoys both walks and brain games.",
    highlights: ["Very trainable", "Good with kids", "Loves fetch", "Social and friendly"],
    considerations: ["Needs regular grooming", "High energy in short bursts (young + excited)"],
  },
  {
    id: 15,
    species: "dog",
    name: "Atlas",
    image: new URL("../../assets/animals/dog_placeholder.png", import.meta.url).href,
    breeds: [
      { name: "Great Dane", confidence: "primary" },
      { name: "Mixed (Unknown)", confidence: "unknown" },
    ],
    ageMonths: 34,
    ageLabel: "2 years, 10 months",
    tagline: "A gentle giant who believes couches are for everyone.",
    bio:
      "Atlas is tall, sweet, and surprisingly mellow. He enjoys leisurely walks, long naps, and being close to his people. He can be a little awkward in small spaces (he’s still learning where all his legs are), but he’s polite and responsive. Atlas is affectionate and calm—an excellent choice if you want a big dog who’s more ‘roommate’ than ‘tornado.’",
    highlights: ["Calm demeanor", "Good with kids", "Gentle with handling", "Easygoing"],
    considerations: ["Needs space to turn around (big body)", "Some leash practice for size/strength"],
  },
  {
    id: 16,
    species: "dog",
    name: "Pebble",
    image: new URL("../../assets/animals/dog_placeholder.png", import.meta.url).href,
    breeds: [
      { name: "Terrier (Unknown)", confidence: "primary" },
      { name: "Mixed (Unknown)", confidence: "secondary" },
    ],
    ageMonths: 12,
    ageLabel: "1 year",
    tagline: "A curious little explorer with bright eyes.",
    bio:
      "Pebble is young, upbeat, and always ready to investigate. She loves toys, sniffing around the yard, and learning new things. Pebble can be a bit wiggly and excited, but she’s responsive and improves quickly with consistent boundaries. She’ll thrive in a home that enjoys training basics and providing a healthy outlet for her curiosity.",
    highlights: ["Playful", "Great with enrichment", "Learns fast", "Friendly with people"],
    considerations: ["Still learning house manners", "Can be distractible on walks"],
  },
  {
    id: 17,
    species: "dog",
    name: "Remy",
    image: new URL("../../assets/animals/dog_placeholder.png", import.meta.url).href,
    breeds: [
      { name: "Greyhound", confidence: "primary" },
      { name: "Whippet", confidence: "suspected" },
    ],
    ageMonths: 48,
    ageLabel: "4 years",
    tagline: "Fast outside, nap champion inside.",
    bio:
      "Remy is a sleek, gentle soul who loves short bursts of speed followed by luxurious lounging. He’s polite, quiet, and often prefers soft bedding and calm company. Remy can be sensitive in new environments, but he warms up with patient, gentle handling. If you want a graceful dog who doesn’t demand constant activity, Remy is a dream.",
    highlights: ["Low energy indoors", "Quiet", "Polite manners", "Affectionate in a calm way"],
    considerations: ["Sensitive to loud/chaotic environments", "Prey drive (leash + awareness)"],
  },
  {
    id: 18,
    species: "dog",
    name: "Teddy",
    image: new URL("../../assets/animals/dog_placeholder.png", import.meta.url).href,
    breeds: [
      { name: "Cavalier King Charles Spaniel", confidence: "suspected" },
      { name: "Pomeranian", confidence: "secondary" },
      { name: "Mixed (Unknown)", confidence: "primary" },
    ],
    ageMonths: 40,
    ageLabel: "3 years, 4 months",
    tagline: "Fluffy charm with serious lap-dog credentials.",
    bio:
      "Teddy is affectionate, sweet, and loves being close to his person. He enjoys gentle play and will happily follow you around the house. Teddy is a great candidate for someone who wants a smaller companion and can provide calm consistency. He’s friendly once he gets to know you and tends to bond strongly with his chosen people.",
    highlights: ["Very cuddly", "Good apartment candidate", "Gentle play style", "People-oriented"],
    considerations: ["Can be timid with strangers", "Regular brushing needed"],
  },
  {
    id: 19,
    species: "dog",
    name: "Maple",
    image: new URL("../../assets/animals/dog_placeholder.png", import.meta.url).href,
    breeds: [
      { name: "Bernese Mountain Dog", confidence: "suspected" },
      { name: "Golden Retriever", confidence: "secondary" },
      { name: "Mixed (Unknown)", confidence: "primary" },
    ],
    ageMonths: 32,
    ageLabel: "2 years, 8 months",
    tagline: "A big softie who brings ‘cozy’ to your whole house.",
    bio:
      "Maple is warm, friendly, and loves gentle affection. She’s happiest when she can be near the family and would love a home that enjoys casual walks and plenty of lounging. Maple has a calm, soothing presence and tends to be polite with new people once she understands the vibe. She’s the type to rest her head on your knee and make you feel like everything’s fine.",
    highlights: ["Good with kids", "Dog-friendly", "Calm demeanor", "Affectionate", "Polite indoors"],
    considerations: ["Needs regular grooming", "Can be heat-sensitive (summer walks early/late)"],
  },
  {
    id: 20,
    species: "dog",
    name: "Ziggy",
    image: new URL("../../assets/animals/dog_placeholder.png", import.meta.url).href,
    breeds: [
      { name: "Jack Russell Terrier", confidence: "primary" },
      { name: "Mixed (Unknown)", confidence: "secondary" },
    ],
    ageMonths: 24,
    ageLabel: "2 years",
    tagline: "A pocket rocket with a heart of gold.",
    bio:
      "Ziggy is energetic, hilarious, and always ready for the next game. He’s a great match for someone who likes training and structured play—he’s smart, quick, and loves interactive toys. Ziggy will happily learn tricks all day, then curl up when he’s finally tired. He’s not a ‘set it and forget it’ dog, but he *is* a dog who will keep you smiling.",
    highlights: ["Very smart", "Loves training", "Playful", "Great hiking companion"],
    considerations: ["High energy", "Can get overstimulated (needs calm decompression time)"],
  },
  {
    id: 21,
    species: "cat",
    name: "Cleo",
    image: new URL("../../assets/animals/cat_placeholder.png", import.meta.url).href,
    breeds: [
      { name: "Domestic Shorthair", confidence: "primary" },
      { name: "Unknown", confidence: "unknown" },
    ],
    ageMonths: 30,
    ageLabel: "2 years, 6 months",
    tagline: "Elegant roommate energy with surprise affection.",
    bio:
      "Cleo is confident, curious, and loves being involved from a dignified distance. She’ll supervise your chores, investigate every new box, and then quietly choose your lap when you’re not paying attention. Cleo enjoys play with wand toys and will happily chase a spring across the floor. She’s affectionate on her own terms and rewards patience with sweet, steady companionship.",
    highlights: ["Playful", "Confident", "Enjoys interactive toys", "Affectionate once comfortable"],
    considerations: ["Prefers slow introductions to other pets", "Not a fan of being picked up too much"],
  },
  {
    id: 22,
    species: "cat",
    name: "Mochi",
    image: new URL("../../assets/animals/cat_placeholder.png", import.meta.url).href,
    breeds: [
      { name: "Domestic Longhair", confidence: "primary" },
      { name: "Unknown", confidence: "unknown" },
    ],
    ageMonths: 18,
    ageLabel: "1 year, 6 months",
    tagline: "A fluffy cloud who purrs like a little engine.",
    bio:
      "Mochi is sweet, social, and loves being near people. She’s curious but gentle—more ‘walk beside you’ than ‘climb the curtains.’ Mochi adores chin scratches and will chirp politely for attention. She’s a great match for someone who wants a friendly cat who actually enjoys hanging out in the same room as you.",
    highlights: ["Very affectionate", "Social", "Gentle play style", "Loves being brushed"],
    considerations: ["Needs regular grooming", "Can be shy in loud environments"],
  },
  {
    id: 23,
    species: "cat",
    name: "Gizmo",
    image: new URL("../../assets/animals/cat_placeholder.png", import.meta.url).href,
    breeds: [
      { name: "Domestic Shorthair", confidence: "primary" },
      { name: "Unknown", confidence: "unknown" },
    ],
    ageMonths: 9,
    ageLabel: "9 months",
    tagline: "Tiny chaos goblin with immaculate vibes.",
    bio:
      "Gizmo is a kitten-ish whirlwind: playful, curious, and full of comedic timing. He loves wand toys, ping-pong balls, and any object that was absolutely not intended to be a toy. After a good play session, he turns into a purring cuddle puddle. Gizmo would do great with someone who enjoys active play and doesn’t mind a little kitten mischief.",
    highlights: ["Very playful", "Affectionate after play", "Curious", "Great with enrichment"],
    considerations: ["Needs lots of playtime", "Will investigate counters (cat-proofing helps)"],
  },
  {
    id: 24,
    species: "cat",
    name: "Saffron",
    image: new URL("../../assets/animals/cat_placeholder.png", import.meta.url).href,
    breeds: [
      { name: "Domestic Shorthair", confidence: "primary" },
      { name: "Siamese", confidence: "suspected" },
    ],
    ageMonths: 40,
    ageLabel: "3 years, 4 months",
    tagline: "Talkative, clever, and emotionally invested in your schedule.",
    bio:
      "Saffron is the kind of cat who will hold a full conversation with you about dinner, about dinner being late, and about dinner being disrespectful. She’s smart, interactive, and loves routine. Saffron enjoys puzzle feeders and will happily follow you from room to room to make sure you’re not lonely. She’s affectionate and engaged, and she thrives with a human who enjoys a chatty companion.",
    highlights: ["Very social", "Smart", "Loves puzzle feeders", "Affectionate", "Engaged with people"],
    considerations: ["Vocal (especially around meals)", "Prefers being the only cat"],
  },
  {
    id: 25,
    species: "cat",
    name: "Pippin",
    image: new URL("../../assets/animals/cat_placeholder.png", import.meta.url).href,
    breeds: [
      { name: "Domestic Mediumhair", confidence: "primary" },
      { name: "Unknown", confidence: "unknown" },
    ],
    ageMonths: 66,
    ageLabel: "5 years, 6 months",
    tagline: "Quiet comfort and the softest headbutts.",
    bio:
      "Pippin is calm, gentle, and loves quiet companionship. He’s not demanding—more the type to appear nearby when you’re reading or watching TV and settle in like he’s always belonged there. Pippin enjoys calm petting sessions and will purr steadily once he trusts you. He’s a great choice if you want a low-drama cat who brings a peaceful vibe.",
    highlights: ["Calm demeanor", "Affectionate", "Quiet", "Great nap buddy"],
    considerations: ["Shy at first", "Prefers a calm home"],
  },
  {
    id: 26,
    species: "cat",
    name: "Nyx",
    image: new URL("../../assets/animals/cat_placeholder.png", import.meta.url).href,
    breeds: [
      { name: "Domestic Shorthair", confidence: "primary" },
      { name: "Unknown", confidence: "unknown" },
    ],
    ageMonths: 24,
    ageLabel: "2 years",
    tagline: "Midnight fur, bright eyes, and a brave little heart.",
    bio:
      "Nyx is curious and confident once she feels safe. She loves climbing cat trees and watching the world from a high perch. Nyx is playful and athletic—laser toys are her personal favorite sport. She’s affectionate, but not clingy, and she does best when introductions are slow and respectful. Once she bonds, she’s deeply loyal.",
    highlights: ["Playful", "Athletic", "Enjoys climbing", "Affectionate once settled"],
    considerations: ["Needs slow introductions to new people", "Prefers predictable routines"],
  },
  {
    id: 27,
    species: "cat",
    name: "Basil",
    image: new URL("../../assets/animals/cat_placeholder.png", import.meta.url).href,
    breeds: [
      { name: "Domestic Shorthair", confidence: "primary" },
      { name: "Unknown", confidence: "unknown" },
    ],
    ageMonths: 12,
    ageLabel: "1 year",
    tagline: "A purr machine disguised as a cat.",
    bio:
      "Basil is friendly, affectionate, and loves attention. He’ll greet you at the door, flop dramatically for belly rubs (supervised, of course), and curl up beside you at night. Basil is playful and social, and he’s a great fit for someone who wants a cat that feels like a little buddy rather than a mysterious roommate.",
    highlights: ["Very affectionate", "Social", "Enjoys playtime", "People-oriented"],
    considerations: ["Can get underfoot (he wants to be included)", "Needs daily play"],
  },
  {
    id: 28,
    species: "cat",
    name: "Opal",
    image: new URL("../../assets/animals/cat_placeholder.png", import.meta.url).href,
    breeds: [
      { name: "Domestic Longhair", confidence: "primary" },
      { name: "Unknown", confidence: "unknown" },
    ],
    ageMonths: 90,
    ageLabel: "7 years, 6 months",
    tagline: "Graceful senior who believes in soft blankets and respect.",
    bio:
      "Opal is a mellow, affectionate cat who enjoys quiet company and calm routines. She likes gentle petting, sunny windows, and slow blinks. Opal is content to nap nearby and occasionally request attention with a polite little meow. She’s a wonderful match for someone who wants a calm companion and understands that trust is built gently.",
    highlights: ["Low energy", "Calm demeanor", "Affectionate", "Great companion for quiet homes"],
    considerations: ["Prefers a peaceful environment", "Needs regular grooming"],
  },
  {
    id: 29,
    species: "cat",
    name: "Tuna",
    image: new URL("../../assets/animals/cat_placeholder.png", import.meta.url).href,
    breeds: [
      { name: "Domestic Shorthair", confidence: "primary" },
      { name: "Unknown", confidence: "unknown" },
    ],
    ageMonths: 36,
    ageLabel: "3 years",
    tagline: "Snack-driven genius with excellent comedic timing.",
    bio:
      "Tuna is playful, clever, and extremely motivated by treats. He loves puzzle feeders and will absolutely figure out how to open a cabinet if you let him. Tuna enjoys interactive play and will reward you with big purrs when you hang out with him. He’s friendly and curious and tends to adapt quickly once he understands the house rules.",
    highlights: ["Very playful", "Smart", "Loves puzzle feeders", "Friendly"],
    considerations: ["Will try to steal food (secure storage helps)", "Needs enrichment to avoid boredom"],
  },
  {
    id: 30,
    species: "cat",
    name: "Marbles",
    image: new URL("../../assets/animals/cat_placeholder.png", import.meta.url).href,
    breeds: [
      { name: "Domestic Mediumhair", confidence: "primary" },
      { name: "Unknown", confidence: "unknown" },
    ],
    ageMonths: 28,
    ageLabel: "2 years, 4 months",
    tagline: "Sweet, gentle, and happiest right next to you.",
    bio:
      "Marbles is a soft-hearted cuddle cat who loves being close. She’ll sit beside you on the couch, follow you around the house, and politely request attention with little chirps. Marbles enjoys wand toys and gentle play but mostly wants consistent companionship. She’s an excellent choice if you want a cat who acts like a tiny emotional support buddy.",
    highlights: ["Very affectionate", "Gentle", "Social", "Enjoys calm play"],
    considerations: ["May get lonely if left alone too long", "Prefers slow introductions to new pets"],
  },
];
