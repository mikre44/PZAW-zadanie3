const categories = {
  "games": {
    title: "GAMES",
    link: [
      { name: "Slope", link: "https://slopegame.io" },
      { name: "super mario bros", link: "https://supermarioplay.com" },
      { name: "Geoguessr", link: "https://www.geoguessr.com" },
      { name: "Little Alchemy 2", link: "https://littlealchemy2.com" },

    ],
  },
  "sites": {
    title: "SITES",
    link: [
      { name: "W3Schools", link: "https://www.w3schools.com" },
      { name: "FreeCodeCamp", link: "https://www.freecodecamp.org" },
      { name: "MDN Web Docs", link: "https://developer.mozilla.org" },
      { name: "Codewars", link: "https://www.codewars.com" },
    ],
  },
};

export function getCategorySummaries() {
  return Object.entries(categories).map(([id, category]) => {
    return { id, title: category.title };
  });
}

export function hasCategory(categoryId) {
  return categories.hasOwnProperty(categoryId);
}

export function getCategory(categoryId) {
  if (hasCategory(categoryId))
    return { id: categoryId, ...categories[categoryId] };
  return null;
}

export function addComponent(categoryId, card) {
  if (hasCategory(categoryId)) categories[categoryId].link.push(card);
}

export default {
  getCategorySummaries,
  hasCategory,
  getCategory,
  addComponent,

};