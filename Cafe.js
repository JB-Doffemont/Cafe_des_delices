// Création fonction principale
function cafeDelice() {
  // Récupération du DOM
  let buttonSubmit = document.querySelector(".buttonSubmit");
  let formProduit = document.querySelector("#formProduit");
  let tBody = document.querySelector(".tBody");
  let divInventaire = document.querySelector(".divInventaire");

  // Création de la variable du local storage pour récupérer les données sauvegardées
  let tableau = JSON.parse(localStorage.getItem("produit"));
  // let buttonSave = document.createElement("button");
  // buttonSave.innerHTML = "SAUVEGARDER";

  // divInventaire.appendChild(buttonSave);
  // Si le local storage a du contenu alors on affiche les produits sinon affichage tableau vide
  if (tableau) {
    showProduit();
  } else {
    tableau = [];
  }
  // Création de l'évènement au moment du clique
  formProduit.addEventListener("submit", function (e) {
    // Methode permettant de prévenir du rafraîchissement de la page et de conserver les données
    e.preventDefault();

    // Création de la valeur permettant de récupérer les valeurs du formulaire
    let data = new FormData(formProduit);
    let choixProduit;
    console.log(formProduit);

    // Création des conditions en fonction du choix du sélecteur
    if (data.get("selectProduit") == "BA") {
      choixProduit = new CaracteristiqueAlcool(
        (type = "BA"),
        data.get("nom"),
        data.get("quantite"),
        data.get("achatHT"),
        data.get("venteHT"),
        data.get("degresAlcool")
      );
    } else if (data.get("selectProduit") == "BNA") {
      choixProduit = new CaracteristiquesGenerales(
        (type = "BNA"),
        data.get("nom"),
        data.get("quantite"),
        data.get("achatHT"),
        data.get("venteHT")
      );
    } else {
      choixProduit = new CaracteristiquesGenerales(
        (type = "AUTRE"),
        data.get("nom"),
        data.get("quantite"),
        data.get("achatHT"),
        data.get("venteHT")
      );
    }

    // Fonction permettant d'ajouter les valeurs au tableau
    tableau.push(choixProduit);
    console.log(choixProduit);
    showProduit();
    save();

    formProduit.reset();
  });

  // Creation du prototype generale
  function CaracteristiquesGenerales(type, nom, quantite, achatHT, venteHT) {
    this.type = type;
    this.nom = nom;
    this.quantite = quantite;
    this.achatHT = achatHT;
    this.venteHT = venteHT;
  }
  // Création de fonction héritière alcool
  function CaracteristiqueAlcool(
    type,
    nom,
    quantite,
    achatHT,
    venteHT,
    degres
  ) {
    CaracteristiquesGenerales.call(this, type, nom, quantite, achatHT, venteHT);
    this.degres = degres;
  }

  // Création de la fonction qui permet d'afficher les produits
  function showProduit() {
    let content = "";
    let etat = document.querySelectorAll(".etat");
    console.log(etat);

    // Création de la fonction qui permet d'afficher les valeurs unique de chaques éléments
    tableau.forEach((element) => {
      if (element.type == "BA") {
        console.log(element);
        content += `<tr>
          
              <td> ${element.type}</td><td>${
          element.nom
        }</td><td><input class="quantite" type="number" min="0" value="${
          element.quantite
        }"></td><td>${element.achatHT}</td><td>${element.venteHT}</td><td>${
          element.degres
        }</td><td>${element.venteHT - element.achatHT}</td><td>${(
          element.venteHT * 1.2
        ).toFixed(
          2
        )}</td><td class="etat"></td><td><button class="deleteButton">\u00D7</button></td>
        <td><button class="saveButton">MODIFIER</button></td>
        </tr>`;
      } else if (element.type == "BNA") {
        console.log(element);
        content += `<tr>
        <td> ${element.type}</td><td>${
          element.nom
        }</td><td><input type="number" min="0" value="${element.quantite}">
        </td><td>${element.achatHT}</td><td>${
          element.venteHT
        }</td><td>${(element.degres = 0)}</td><td>${
          element.venteHT - element.achatHT
        }</td><td>${(element.venteHT * 1.2).toFixed(
          2
        )}</td><td class="etat"></td><td><button class="deleteButton">\u00D7</button></td>
        <td><button class="saveButton">MODIFIER</button></td> 
        </tr>`;
      } else {
        content += `<tr>
              <td> ${element.type}</td><td>${
          element.nom
        }</td><td><input type="number" min="0" value="${
          element.quantite
        }"></td><td>${element.achatHT}</td><td>${
          element.venteHT
        }</td><td>${(element.degres = 0)}</td><td>${
          element.venteHT - element.achatHT
        }</td><td>${(element.venteHT * 1.2).toFixed(
          2
        )}</td><td class="etat"></td><td><button class="deleteButton">\u00D7</button></td>
        <td><button class="saveButton">MODIFIER</button></td>
              </tr>`;
      }
      // Affichage du javascript dans la page HTML
      tBody.innerHTML = content;

      //  Création du bouton permettant de modifier une valeur d'un produit:
      let saveButton = document.querySelectorAll(".saveButton");

      saveButton.forEach(function (button, index) {
        button.addEventListener("click", function (e) {
          e.preventDefault();
          document.querySelector(".name").value = element.nom;
          document.querySelector(".quantite").value = element.quantite;
          document.querySelector(".achatHT").value = element.achatHT;
          document.querySelector(".venteHT").value = element.venteHT;
          document.querySelector(".degres").value = element.degres;
          tableau.splice(index, 1);
          save();
          showProduit();
        });
      });
    });
    let formModif = document.querySelector("#formModif");
    // Création du boutton supprimer
    let deleteButton = document.querySelectorAll(".deleteButton");
    //Création de la fonction qui permet de selectionner tous les boutons
    deleteButton.forEach(function (button, index) {
      // Création de l'évènement sur le bouton au moment du clique
      button.addEventListener("click", function () {
        // Suppression de l'élément du tableau
        tableau.splice(index, 1);
        //Nouvelle sauvegarde du tableau une fois les élément supprimés
        save();
        // Affichage du nouveau tableau modifié
        showProduit();
        console.log(tableau);
      });
    });
  }

  // Création de la fonction qui permet de sauvegardé les données du tableau
  function save() {
    const stringProduit = JSON.stringify(tableau);
    localStorage.setItem("produit", stringProduit);
  }

  // Les fonctions ci-dessous sont inutilisées:

  // // Création de la fonction pour calculer la marge
  // function calculMarge(achatHT, venteHT) {
  //   marge = venteHT - achatHT;

  //   return marge;
  // }

  // calculMarge();

  // // Création de la fonction pour calculer le prix de vente TTC
  // function calculTTC(venteHT) {
  //   venteTTC = venteHT * 1.2; // 1.2 Correspond à une TVA de 20%
  //   return venteTTC;
  // }

  // calculTTC();
}
cafeDelice();
