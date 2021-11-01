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
        console.log("New user registered as ", docRef.id);
        UserId = docRef.id;
        localStorage.setItem("UserId", UserId);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  } else {
    UserId = localStorage.getItem("UserId");
    console.log("Identified the user as ", UserId);
  }
}

function parachecker() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  if (urlParams.has("po")) {
  } else {
    to_page();
  }
}

function to_page() {
  posts_initial();
  posts_fetchposts();
}

parachecker();

var posts_post_position_right = true;
var posts_current_col = 0;
var posts_post_area = document.createElement("div");

function posts_initial() {
  var area = document.getElementById("area");
  posts_post_area.style =
    "background-color:#f3efee;padding: 20px;border-top-left-radius: 25px;border-top-right-radius: 25px;";
  posts_post_area.appendChild(document.createElement("br"));
  var p = document.createElement("p");
  p.style = "text-align: center;font-size: x-large";
  p.innerHTML = '<i class="fas fa-pencil-alt"></i><b>Posts</b>';
  posts_post_area.appendChild(p);
  var br = document.createElement("br");
  posts_post_area.appendChild(br);
  area.appendChild(posts_post_area);
}

function posts_add(Title, Date, Desc, Id) {
  if (posts_post_position_right) {
    var new_area_col = posts_new_area_col();
    var page = posts_create(Title, Date, Desc, Id);
    new_area_col.appendChild(page);
    posts_post_area.appendChild(new_area_col);
    posts_post_position_right = false;
    posts_post_area.appendChild(new_area_col);
  } else {
    var cur_area_col = document.getElementById(
      "c" + posts_current_col.toString()
    );
    var page = posts_create(Title, Date, Desc, Id);
    cur_area_col.appendChild(page);
    posts_post_position_right = true;
  }
}

function posts_create(Title, Date, Desc, Id) {
  var max_desc_width = 85;
  if (Desc.length > max_desc_width) {
    Desc =
      Desc.substring(0, 85) +
      "... <a href='go' style='font-size: medium'>Read More</a>";
  }
  var divn = document.createElement("div");
  divn.style = "flex-grow: 1; display: flex; justify-content: center";
  var div = document.createElement("div");
  div.classList.add("page_post");
  var div2 = document.createElement("div");
  div2.style = "front-weight: bold";
  div2.innerHTML = Date;
  div.appendChild(div2);
  var a = document.createElement("a");
  a.style =
    "word-wrap: break-word;font-size: x-large;font-weight: bold;color: black;text-decoration:none";
  a.href = "https://dineth-de-silva.github.io/MyBlog/" + "?po=" + Id;
  a.innerHTML = Title;
  div.appendChild(a);
  div.appendChild(document.createElement("hr"));
  var div4 = document.createElement("div");
  div4.style =
    "border-left: 6px solid rgb(255, 174, 0);padding: 10px;word-wrap: break-word;text-align: left;font-size: large";
  div4.innerHTML = Desc;
  div.appendChild(div4);
  divn.appendChild(div);
  return divn;
}

function posts_new_area_col() {
  var div = document.createElement("div");
  div.classList.add("page_area_col");
  posts_current_col++;
  div.id = "c" + posts_current_col.toString();
  return div;
}

function posts_fetchposts() {
  firebase
    .database()
    .ref("posts/")
    .orderByChild("rid")
    .once("value", function (snapshot) {
      snapshot.forEach(function (Childsnapshot) {
        let Date = Childsnapshot.val().date;
        let Title = Childsnapshot.val().title;
        let Desc = Childsnapshot.val().desc;
        let Id = Childsnapshot.val().id;
        posts_add(Title, Date, Desc, Id);
      });
    });
}

function post(Id) {
  var area = document.getElementById("area");
  var post_area = document.createElement("div");
  post_area.style =
    "padding: 10px;display:flex;align-items: center;justify-content: center;";
  post_area.appendChild(document.createElement("br"));
  var div = document.createElement("div");
  div.style =
    "width: 100%;font-family:OpenSans;background-color: #f3efee;padding:20px;";
  var div2 = document.createElement("div");
  div2.style =
    "word-wrap: break-word;font-size: xx-large;font-weight: bold;text-align:center;text-decoration: underline;";
  div.appendChild(div2);
  div.appendChild(document.createElement("br"));
  var p = document.createElement("p");
  p.style =
    "border-left: 6px solid rgb(255, 174, 0);padding-left: 15px;word-wrap: break-word;font-size: larger";
  div.appendChild(p);
  post_area.appendChild(div);
  area.appendChild(post_area);
  firebase
    .database()
    .ref("posts/" + Id)
    .on("value", (snapshot) => {
      let Date = snapshot.val().date;
      let Title = snapshot.val().title;
      let Desc = snapshot.val().desc;
      div2.innerHTML = Title;
      p.innerHTML = Desc;
    });
}
