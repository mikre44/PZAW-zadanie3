import { DatabaseSync } from "node:sqlite";
import { title } from "process";

const db_path = "./db.sqlite";
const db = new DatabaseSync(db_path);


const categories = {
  "games": {
    title: "games",
    link: [
      { name: "Slope", link: "https://slopegame.io" },
      { name: "super mario bros", link: "https://supermarioplay.com" },
      { name: "Geoguessr", link: "https://www.geoguessr.com" },
      { name: "Little Alchemy 2", link: "https://littlealchemy2.com" },

    ],
  },
  "sites": {
    title: "sites",
    link: [ 
      { name: "W3Schools", link: "https://www.w3schools.com" },
      { name: "FreeCodeCamp", link: "https://www.freecodecamp.org" },
      { name: "MDN Web Docs", link: "https://developer.mozilla.org" },
      { name: "Codewars", link: "https://www.codewars.com" },
    ],
  },
};

db.exec(
  `CREATE TABLE IF NOT EXISTS cards (
    id INTEGER PRIMARY KEY,
    name        TEXT NOT NULL,
    link        TEXT NOT NULL,
    type        TEXT NOT NULL
  ) STRICT;`
);

// process.env.POPULATE_DB = "1";
// ^^^ na windowsie działa

if (process.env.POPULATE_DB) {
  console.log("Populating db...");

  Object.values(categories).forEach((category) => {
    category.link.forEach((item) => {
      const result = db
        .prepare(
          `INSERT INTO cards (name, link, type)
           VALUES (?, ?, ?);`
        )
        .run(item.name, item.link, category.title);

      console.log("Inserted:", {
        id: result.lastInsertRowid,
        name: item.name,
        link: item.link,
        type: category.title
      });
    });
  });
}


const db_ops = {
  insert_card: db.prepare(
    `INSERT INTO cards (name, link, type)
        VALUES (?, ?, ?) RETURNING id, name, link, type;`
  ),
  delete_card: db.prepare(
    "DELETE FROM cards WHERE id = ?;"
  ),

  get_card_by_id: db.prepare(
  "SELECT * FROM cards WHERE id = ?;"
  ),
  get_cards_by_type: db.prepare(
    "SELECT * FROM cards WHERE type = ?;"
  ),
  get_categories: db.prepare(
    "SELECT DISTINCT type FROM cards;"
  ),
};



export function getCategorySummaries() {
  var categories = db_ops.get_categories.all();
  return categories;
}//will be used in near future

export function hasCard(type) {
  const cards = db_ops.get_cards_by_type.all(type);
    if (cards.length === 0) {
    return null;
  }
  return 1;
}
export function getCards(categoryId) {
const cards = db_ops.get_cards_by_type.all(categoryId);

  if (cards.length === 0) {
    return null;
  }
  return {
    title: categoryId,
    link: cards.map(card => ({
      id: card.id, 
      name: card.name,
      link: card.link
    }))
  };
}

export function addComponent(type, card) {
  if (hasCategory(type)) db_ops.insert_card.get(card.name, card.link, categoryId);
}
export function deleteComponent(cardId){
  db_ops.delete_card.run(cardId);
}


export default {
  getCategorySummaries,
  hasCard,
  getCards,
  addComponent,
  deleteComponent,
};