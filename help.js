function post(Title, Date, Desc) {
  var area = document.getElementById("area");
  var post_area = document.createElement("div");
  post_area.style =
    "display: flex;flex-direction: column;align-items: center;padding: 20px;";
  var div = document.createElement("div");
  div.classList.add("post");
  var div2 = document.createElement("div");
  div2.style = "front-weight: bold";
  div2.innerHTML = Date;
  div.appendChild(div2);
  var div3 = document.createElement("div");
  div3.style = "word-wrap: break-word;font-size: x-large;font-weight: bold";
  div3.innerHTML = "<u>" + Title + "</u>";
  div.appendChild(div3);
  var div4 = document.createElement("div");
  div4.style =
    "border-left: 6px solid rgb(255, 174, 0);padding: 10px;word-wrap: break-word;text-align: left;font-size: large";
  div4.innerHTML = Desc;
  div.appendChild(div4);
  post_area.appendChild(div);
  area.appendChild(post_area);
}
{
  /* <div style="padding: 20px">
              <h1 style="text-align: center">
                <i class="fas fa-edit"></i> <u>Pages</u>
              </h1>
              <br />
              <div class="area_cols_page">
                <div style="flex-grow: 1; display: flex; justify-content: center">
                  <div class="card page shadow">
                    <div class="card-body">
                      <h5
                        class="card-title"
                        style="font-size: xx-large;"
                      >
                        <span style="text-decoration: underline;">Home</span> <span style="font-size: large;">(5)</span>
                      </h5>
                      <br />
                      <p class="card-text" style="font-size: larger">
                        Nearly Everything
                      </p>
                      <a
                        href="#"
                        class="btn btn-outline-warning"
                        style="border-radius: 50px"
                      >
                        View Posts <i class="fa fa-external-link"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div> */
}
function fetchPosts() {
  firebase
    .database()
    .ref("pages")
    .orderByChild("rid")
    .once("value", function (snapshot) {
      snapshot.forEach(function (Childsnapshot) {
        let Date = Childsnapshot.val().date;
        let Title = Childsnapshot.val().title;
        let Desc = Childsnapshot.val().desc;
        post(Title, Date, Desc);
      });
    });
}

// fetchPosts()
