import express from 'express';
import Vocabulaire from './models/Vocabulaire.js';

const app = express();
app.use(express.urlencoded({ extended: true }));

app.get("/", async function (req, res) {
  const listemots = await Vocabulaire.loadMany();
  res.render('mots.ejs', { listemots: listemots});
  res.render('vocabulaire.ejs', {listemots: listemots})
});

app.post("/add", async function (req, res) {
  const mots = new Vocabulaire();
  mots.translation = req.body.translation
  mots.word = "";
  await mots.save();
  res.redirect('/');
});

app.get("/delete/:id", async function (req, res) {
  await Vocabulaire.delete({ idmots: req.params.id });
  res.redirect('/otherpage');
});

app.post('/otherpage', async function(req, res) {
  const listemots = await Vocabulaire.loadMany();
  res.render('vocabulaire.ejs', {listemots: listemots});
});

app.get('/otherpage', async function(req, res) {
  const listemots = await Vocabulaire.loadMany();
  res.render('vocabulaire.ejs', {listemots: listemots})

})

app.post("/vocabulaire", async function(req, res) {
  const vocabulaire = new Vocabulaire ();
  vocabulaire.word = req.body.NewWord;
  vocabulaire.translation = req.body.NewTranslation;
  await vocabulaire.save();
  res.redirect('/otherpage');
});

app.post('/comeback', async function(req, res){
  res.redirect('/');
});

// Ajouter une image
app.use(express.static('public'));


app.listen(4000);
