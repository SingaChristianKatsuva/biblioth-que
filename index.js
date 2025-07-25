let btn_rechercher = document.getElementById("btn_rechercher");
let formulaire_recherche = document.getElementById("formulaire_recherche");
//let title_rechercher = document.getElementById("titre_cherche");
const template = document.getElementById("book-template");
const card_container = document.getElementById("card_container");
class Livre {
  constructor(titre, auteur, annee, statut) {
    this.titre = titre;
    this.auteur = auteur;
    this.annee = annee;
    this.statut = statut;
  }
}
let Books = [];
btn_rechercher.addEventListener("click", (event) => {
  event.preventDefault();

  let formData = new FormData(formulaire_recherche, btn_rechercher);

  //console.log(title_rechercher.textContent);

  async function fetchData() {
    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${formData.get(
          "titre_cherche"
        )}&limit=10`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data.docs);

      for (let book of data.docs) {
        let livre = new Livre(
          book.title,
          book.author_name[0],
          book.first_publish_year,
          book.ebook_access
        );
        Books.push(livre);
      }
      console.log(Books);

      Books.forEach((book) => {
        const clone = template.content.cloneNode(true);
        clone.getElementById("span_titre").textContent = book.titre;
        clone.getElementById("span_auteur").textContent = book.auteur;
        clone.getElementById("span_annee").textContent = book.annee;
        clone.getElementById("span_dispo").textContent = book.statut;
        card_container.appendChild(clone);
      });

     
    } catch (error) {
      console.error("Error:", error);
    }
  }

  fetchData();
});
