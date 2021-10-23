var page_post_position_right = true;
var page_current_col = 0;
var page_post_area = document.createElement("div");

function page_default(pageN) {
    var area = document.getElementById("area");
    page_post_area.style = "padding: 20px";
    var h1 = document.createElement("h1");
    h1.style = "padding-left: 50px;padding-right: 50px;text-align: center"
    firebase
        .database()
        .ref("pages/" + pageN + "/title")
        .on('value', (snapshot) => {
            const title = snapshot.val();
            h1.innerHTML = "<u>" + title + "</u>";
        });
    page_post_area.appendChild(h1)
    var h5 = document.createElement("h5");
    h5.style = "padding-left: 50px;padding-right: 50px;text-align: center"
    firebase
        .database()
        .ref("pages/" + pageN + "/desc")
        .on('value', (snapshot) => {
            const desc = snapshot.val();
            h5.innerHTML = desc;
        });
    page_post_area.appendChild(h5)
    page_post_area.appendChild(document.createElement("br"))
    var p = document.createElement("p");
    p.style = "text-align: center;font-size: x-large";
    p.innerHTML = "<i class=\"fas fa-pencil-alt\"></i><b>Posts</b>";
    page_post_area.appendChild(p);
    var br = document.createElement("br");
    page_post_area.appendChild(br);
    area.appendChild(page_post_area);
}

function page_addpost(Title, Date, Desc) {
    if (page_post_position_right) {
        var new_area_col = page_new_area_col();
        var page = page_post(Title, Date, Desc);
        new_area_col.appendChild(page);
        page_post_area.appendChild(new_area_col);
        page_post_position_right = false;
        page_post_area.appendChild(new_area_col);
    } else {
        var cur_area_col = document.getElementById(
            "c" + page_current_col.toString()
        );
        var page = page_post(Title, Date, Desc);
        cur_area_col.appendChild(page);
        page_post_position_right = true;
    }
}

function page_post(Title, Date, Desc) {
    var divn = document.createElement("div");
    divn.style = "flex-grow: 1; display: flex; justify-content: center"
    var div = document.createElement("div");
    div.classList.add("page_post");
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
    divn.appendChild(div)
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
                page_addpost(Title, Date, Desc);
            });
        });
}
