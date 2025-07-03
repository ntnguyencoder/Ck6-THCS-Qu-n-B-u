function randomChibi() {
  const links = [
    "https://api.dicebear.com/6.x/bottts/svg?seed=" + Math.random(),
    "https://api.dicebear.com/6.x/pixel-art/svg?seed=" + Math.random(),
    "https://api.dicebear.com/6.x/adventurer/svg?seed=" + Math.random()
  ];
  return links[Math.floor(Math.random() * links.length)];
}
