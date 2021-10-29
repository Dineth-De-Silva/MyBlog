function post_default(PageN, PostN, cyear) {
  var area = document.getElementById("area");
  var post_area = document.createElement("div");
  post_area.style =
    "padding: 10px;display:flex;align-items: center;justify-content: center;";
  post_area.appendChild(document.createElement("br"));
  var div = document.createElement("div");
  div.style =
    "width: 800px;font-family:OpenSans;background-color: #f3efee;padding:20px;border-radius: 20px;";
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
    .ref("pages/" + PageN + "/posts/" + cyear + "/posts/" + PostN + "/")
    .on("value", (snapshot) => {
      let Date = snapshot.val().date;
      let Title = snapshot.val().title;
      let Desc = snapshot.val().desc;
      div2.innerHTML = Title;
      p.innerHTML = Desc;
      window.scrollTo(0, 415);
    });
}
