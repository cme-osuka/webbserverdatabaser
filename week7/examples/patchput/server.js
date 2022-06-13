const app = require("express")();
const PORT = 4000;

const posts = [
  {
    id: 1,
    title: "What is love?",
    author: "haddaway",
    post: "Baby don't hurt me, don't hurt me, no more",
  },
];

app.put("/:id", (req, res) => {
  const id = req.params.id;
  const foundIndex = posts.findIndex(p => p.id === id); // antingen index eller -1

  // Validering så de inte skickar in vad som helst

  // Ersätter hela
  posts[foundIndex] = req.body;

  // Om vi har en model
  //model.update(id, req.body)
});

app.patch("/:id", (req, res) => {
  const id = req.params.id;
  const foundIndex = posts.findIndex(p => p.id === id);

  const title = req.body.title || "";
  const author = req.body.author || "";
  const post = req.body.post || "";

  // Ersätter det du skickar in
  if (title) {
    posts[foundIndex].title = req.body.title;
  }

  if (author) {
    posts[foundIndex].author = req.body.author;
  }

  if (post) {
    posts[foundIndex].post = req.body.post;
  }

  // Om vi har en model
  /*model.update(id, {
    title,
    author,
    post
  })*/
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
