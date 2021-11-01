var page_post_position_right = true;
var page_current_col = 0;
var page_post_area = document.createElement("div");

function page_default(pageN) {
  var area = document.getElementById("area");
  page_post_area.style =
    "background-color:#f3efee;padding: 20px;border-top-left-radius: 25px;border-top-right-radius: 25px;";
  page_post_area.appendChild(document.createElement("br"));
  // var div = document.createElement("div");
  // div.style =
  //   "padding-left:10px;padding-right:10px;text-align: center;font-size: xx-large;font-weight: bold;font-family:OpenSans";
  // firebase
  //   .database()
  //   .ref("pages/" + pageN + "/title")
  //   .on("value", (snapshot) => {
  //     const title = snapshot.val();
  //     div.innerHTML = "<u>" + title + "</u>";
  //   });
  // page_post_area.appendChild(div);
  // page_post_area.appendChild(document.createElement("br"));
  // var div2 = document.createElement("div");
  // div2.style =
  //   "padding-left:20px;padding-right:20px;text-align: center;font-size: larger;font-weight: bold;font-family:OpenSans";
  // firebase
  //   .database()
  //   .ref("pages/" + pageN + "/desc")
  //   .on("value", (snapshot) => {
  //     const desc = snapshot.val();
  //     div2.innerHTML = desc;
  //   });
  // page_post_area.appendChild(div2);
  // page_post_area.appendChild(document.createElement("br"));
  var p = document.createElement("p");
  p.style = "text-align: center;font-size: x-large";
  p.innerHTML = '<i class="fas fa-pencil-alt"></i><b>Posts</b>';
  page_post_area.appendChild(p);
  var br = document.createElement("br");
  page_post_area.appendChild(br);
  area.appendChild(page_post_area);
  // var status_area = document.createElement("div")
  // status_area.style = "flex-grow: 1;background-color: #f3efee "
  // status_area.innerHTML = "<div style='width: 100%'>Hello</div>"
  // area.appendChild(status_area)
}

function page_addpost(Title, Date, Desc, Id, PageN, cyear) {
  if (page_post_position_right) {
    var new_area_col = page_new_area_col();
    var page = page_post(Title, Date, Desc, Id, PageN, cyear);
    new_area_col.appendChild(page);
    page_post_area.appendChild(new_area_col);
    page_post_position_right = false;
    page_post_area.appendChild(new_area_col);
  } else {
    var cur_area_col = document.getElementById(
      "c" + page_current_col.toString()
    );
    var page = page_post(Title, Date, Desc, Id, PageN, cyear);
    cur_area_col.appendChild(page);
    page_post_position_right = true;
  }
}

function page_post(Title, Date, Desc, Id, PageN, cyear) {
  var max_desc_width = 170;
  if (Desc.length > max_desc_width) {
    Desc =
      Desc.substring(0, 170) +
      "... <a href='go' style='font-size: medium'>Read More</a>";
  }
  var divn = document.createElement("div");
  divn.style = "flex-grow: 1; display: flex; justify-content: center";
  var div = document.createElement("div");
  div.classList.add("page_post");
  // div.classList.add("shadow-sm");
  var div2 = document.createElement("div");
  div2.style = "front-weight: bold";
  div2.innerHTML = Date;
  div.appendChild(div2);
  var a = document.createElement("a");
  a.style =
    "word-wrap: break-word;font-size: x-large;font-weight: bold;color: black;text-decoration:none";
  a.href =
    "https://dineth-de-silva.github.io/MyBlog/" + "?pg=" + PageN + "&po=" + Id;
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

function page_new_area_col() {
  var div = document.createElement("div");
  div.classList.add("page_area_col");
  page_current_col++;
  div.id = "c" + page_current_col.toString();
  return div;
}

function page_fetchposts(pageN, cyear) {
  firebase
    .database()
    .ref("pages/" + pageN + "/posts/" + cyear + "/posts")
    .orderByChild("rid")
    .once("value", function (snapshot) {
      snapshot.forEach(function (Childsnapshot) {
        let Date = Childsnapshot.val().date;
        let Title = Childsnapshot.val().title;
        let Desc = Childsnapshot.val().desc;
        let Id = Childsnapshot.val().id;
        page_addpost(Title, Date, Desc, Id, pageN, cyear);
      });
    });
}
