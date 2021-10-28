var UserId = null;
window.addEventListener("load", (e) => {
  registerSW();
  registerUser();
});

async function registerSW() {
  if ("serviceWorker" in navigator) {
    try {
      await navigator.serviceWorker.register("./service-worker.js");
    } catch (e) {
      alert("ServiceWorker registration failed. Sorry about that.");
    }
  } else {
    document.querySelector(".alert").removeAttribute("hidden");
  }
}

function registerUser() {
  if (localStorage.getItem("UserId") === null) {
    var db = firebase.firestore();
    db.collection("users")
      .add({})
      .then((docRef) => {
        console.log("New user registered ", docRef.id);
        UserId = docRef.id;
        localStorage.setItem("UserId", UserId);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  } else {
    UserId = localStorage.getItem("UserId");
  }
}

function open_menu() {
  var menu = document.getElementById("menu");
  menu.classList.remove("close");
  menu.classList.add("open");
}

function close_menu() {
  var menu = document.getElementById("menu");
  menu.classList.remove("open");
  menu.classList.add("close");
}

var drop_list_status = false;

function dropper() {
  if (drop_list_status) {
    drop_list_close();
  } else {
    drop_list();
  }
}

function drop_list() {
  drop_list_status = true;
  var menu_drop_list = document.getElementById("menu_drop_list");
  menu_drop_list.classList.remove("drop_close");
  menu_drop_list.classList.add("drop");
}

function drop_list_close() {
  drop_list_status = false;
  var menu_drop_list = document.getElementById("menu_drop_list");
  menu_drop_list.classList.remove("drop");
  menu_drop_list.classList.add("drop_close");
}
