var UserId = null;
window.addEventListener("load", (e) => {
  registerSW();
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

function parachecker() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  if (urlParams.has("po")) {
    to_post_page(urlParams.get("po"));
  } else {
    to_posts_page();
  }
}

function navigation(Id) {
  if (Id === null) {
    to_posts_page();
  } else {
    to_post_page(Id);
  }
}

function clearCache() {
  var area = document.getElementById("area");
  area.innerHTML = null;
}

function to_posts_page() {
  var posts_post_position_right = true;
  var posts_current_col = 0;
  var posts_post_area = document.createElement("div");

  function posts_initial() {
    var area = document.getElementById("area");
    posts_post_area.style =
      "background-color:white;padding: 20px;border-bottom-right-radius:25%";
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
    var max_desc_width = 100;
    if (Desc.length > max_desc_width) {
      Desc = Desc.substring(0, 100) + "...";
    }
    var divn = document.createElement("div");
    divn.style = "flex-grow: 1; display: flex; justify-content: center";
    var div = document.createElement("div");
    div.classList.add("page_post");
    var div2 = document.createElement("div");
    if (moment().diff(Date, "days") <= 5) {
      div2.innerHTML = moment(Date).fromNow();
      div2.style = "front-weight: bold;color:green";
    } else {
      div2.innerHTML = moment(Date).format("LL");
      div2.style = "front-weight: bold";
    }
    div.appendChild(div2);
    var div5 = document.createElement("div");
    div5.style =
      "word-wrap: break-word;font-size: x-large;font-weight: bold;cursor: pointer;";
    div5.innerHTML = Title;
    div5.addEventListener("click", (event) => {
      window.history.pushState({ Id }, null, "?po=" + Id);
      navigation(Id);
    });
    div.appendChild(div5);
    div.appendChild(document.createElement("hr"));
    var div4 = document.createElement("div");
    div4.style =
      "border-left: 6px solid rgb(255, 174, 0);padding: 10px;word-wrap: break-word;text-align: left;font-size: large";
    div4.innerHTML = Desc;
    var span = document.createElement("span");
    span.style = "text-decoration: underline;color: #0d6efd;cursor: pointer";
    span.addEventListener("click", (event) => {
      window.history.pushState({ Id }, null, "?po=" + Id);
      navigation(Id);
    });
    span.innerHTML = "Read More";
    div4.appendChild(span);
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
          let Rid = Childsnapshot.val().rid;
          posts_add(Title, Date, Desc, Id);
        });
      });
  }
  clearCache();
  posts_initial();
  posts_fetchposts();
  window.addEventListener("popstate", (event) => {
    navigation(event.state.Id);
  });
  history.replaceState({ Id: null }, null, "");
}

function to_post_page(Id) {
  function post_page(Id) {
    var area = document.getElementById("area");
    var post_area = document.createElement("div");
    post_area.classList.add("post_area");
    var div = document.createElement("div");
    div.style = "padding: 20px; flex-shrink: 1;width: 100%;";
    var div2 = document.createElement("div");
    div2.style =
      "width: fit-content;word-wrap: break-word;font-size: xx-large;font-weight: bold;background-image:url(assets/background4.webp);background-size: contain;";
    div.appendChild(div2);
    div.appendChild(document.createElement("br"));
    var p = document.createElement("p");
    p.style =
      "border-left: 6px solid rgb(255, 174, 0);padding-left: 15px;word-wrap: break-word;font-size: larger";
    div.appendChild(p);
    post_area.appendChild(div);
    var div3 = document.createElement("div");
    div3.style =
      "padding: 10px;flex-shrink: 3;width:100%;font-family: Roboto Mono;";
    var div4 = document.createElement("div");
    div4.style =
      "padding: 10px;width: fit-content;margin: auto;border-width: 0.5px;";
    div3.appendChild(div4);
    post_area.appendChild(div3);
    area.appendChild(post_area);
    firebase
      .database()
      .ref("posts/" + Id)
      .on("value", (snapshot) => {
        let Title = snapshot.val().title;
        let Desc = snapshot.val().desc;
        let Date = snapshot.val().date;
        div2.innerHTML = Title;
        p.innerHTML = Desc;
        div4.innerHTML =
          "Date : " + moment(Date).format("LL") + "<br/> Author : Dineth";
      });
  }
  clearCache();
  post_page(Id);
}

parachecker();
