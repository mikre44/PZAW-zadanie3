import express from "express";
import categories from "./models/categories.js";


const port = 8000;

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded());




app.get("/sites", (req, res) => {
  const category = categories.getCategory('sites');
  if (category != null) {
    res.render("cards", {
      id: category.id,
      title: category.title,
      category,
    });
  } else {
    res.sendStatus(404);
  }
});

app.get("/games", (req, res) => {
  const category = categories.getCategory('games');
  if (category != null) {
    res.render("cards", {
      title: category.title,
      category,
    });
  } else {
    res.sendStatus(404);
  }
});

app.post("/:category_id/new", (req, res) => {
  

  const category_id = req.params.category_id;
  if (!categories.hasCategory(category_id)) {
    res.sendStatus(404);
  } else {
    categories.addComponent(category_id, {
      name: req.body.name,
      link: req.body.link,
    });
    res.redirect(`/${category_id}`);
  }
});
app.get("/:card_link", (req, res) => {
    const card_link = req.params.card_link;
  if (card_link) {
    res.redirect(`/`); // Oh damn that works, kinda crazy
  } 
});


app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});