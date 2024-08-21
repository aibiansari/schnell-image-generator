const phrases = [
  "Loading your magic...",
  "Pixels are dusting...",
  "Pixels are aligning...",
  "Magic in the works...",
  "Creativity brewing...",
  "Working on your vision...",
  "Magic in progress...",
  "Creating masterpiece...",
  "Just wait a moment...",
  "Cooking up pixels...",
  "Crafting your magic...",
  "Vision unfolding...",
  "Conjuring brilliance...",
  "Sketching your idea...",
  "Imagining the magic...",
];

const getRandomPhrase = () => {
  const randomIndex = Math.floor(Math.random() * phrases.length);
  return phrases[randomIndex];
};

export default getRandomPhrase;
