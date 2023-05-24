import XMLHttpRequest from "xmlhttprequest"

var formElement = document.querySelector("form")
var request = new XMLHttpRequest()
request.open("POST", "../views/inscription.pug")
request.send(new FormData(formElement))

document.addEventListener("load", () => {
  function sendData() {
    const XHR = new XMLHttpRequest()

    // on crée l'objet FormData en le rattachant
    // à l'élément de formulaire
    const FD = new FormData(form)

    // On définit ce qui se produit lorsque
    // les données sont bien envoyées
    XHR.addEventListener("load", (event) => {
      alert(event.target.responseText)
    })

    // On définit ce qui se produit en cas
    // d'erreur
    XHR.addEventListener("error", (event) => {
      alert("Une erreur est survenue.")
    })

    // On prépare la requête
    XHR.open("POST", "https://example.com/cors.php")

    // On envoie les données avec ce qui a été
    // fourni dans le formulaire
    XHR.send(FD)
  }

  // On récupère une référence au formulaire HTML
  const form = document.getElementById("formulaireInscription")

  // On ajoute un gestionnaire d'évènement 'submit'
  form.addEventListener("submit", (event) => {
    event.preventDefault()

    sendData()
  })
})
