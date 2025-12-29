export function createRandomPost() {
  const adjectives = [
    "innovative",
    "dynamic",
    "secure",
    "scalable",
    "intelligent",
  ];
  const nouns = ["system", "protocol", "interface", "module", "network"];
  const phrases = [
    "Reboot the system to apply changes.",
    "It's not a bug, it's a feature.",
    "Works on my machine.",
    "The cloud is someone else's computer.",
  ];

  const getRandomItem = (array) =>
    array[Math.floor(Math.random() * array.length)];

  return {
    title: `${getRandomItem(adjectives)} ${getRandomItem(nouns)}`,
    body: getRandomItem(phrases),
  };
}
