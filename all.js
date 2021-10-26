var all_post_position_right = true;
var all_current_col = 0;
var all_post_area = document.createElement("div");

function all_default() {
    var area = document.getElementById("area");
    all_post_area.style = "padding: 20px";
    all_post_area.appendChild(document.createElement("br"))
    var h1 = document.createElement("h1");
    h1.style = "padding-left: 50px;padding-right: 50px;text-align: center;font-family:Pacifico"
    h1.innerHTML = "All Posts"
    all_post_area.appendChild(h1)
    var h5 = document.createElement("h5");
    h5.style = "padding-left: 50px;padding-right: 50px;text-align: center"
    h5.innerHTML = "To see all pages "
    var a = document.createElement("a");
    a.href = "https://dineth-de-silva.github.io/MyBlog/";
    a.classList.add("btn");
    a.classList.add("btn-info");
    a.innerHTML = "Pages <i class='fa fa-external-link'></i>";
    h5.appendChild(a)
    all_post_area.appendChild(h5)
    all_post_area.appendChild(document.createElement("br"))
    var p = document.createElement("p");
    p.style = "text-align: center;font-size: x-large";
    p.innerHTML = "<i class=\"fas fa-pencil-alt\"></i><b>Posts</b>";
    all_post_area.appendChild(p);
    var br = document.createElement("br");
    all_post_area.appendChild(br);
    area.appendChild(all_post_area);
}

function all_addpost(Title, Date, Desc, Pageid) {
    if (all_post_position_right) {
        var new_area_col = all_new_area_col();
        var page = all_post(Title, Date, Desc, Pageid);
        new_area_col.appendChild(page);
        all_post_area.appendChild(new_area_col);
        all_post_position_right = false;
        all_post_area.appendChild(new_area_col);
    } else {
        var cur_area_col = document.getElementById(
            "c" + all_current_col.toString()
        );
        var page = all_post(Title, Date, Desc, Pageid);
        cur_area_col.appendChild(page);
        all_post_position_right = true;
    }
}

function all_post(Title, Date, Desc, Pageid) {
    var max_desc_width = 170;
    if (Desc.length > max_desc_width) {
        Desc = Desc.substring(0, 170) + "... <a href='go' style='font-size: medium'>Read More</a>"
    }
    var divn = document.createElement("div");
    divn.style = "flex-grow: 1; display: flex; justify-content: center"
    var div = document.createElement("div");
    div.classList.add("all_post");
    div.classList.add("shadow")
    var div2 = document.createElement("div");
    div2.style = "front-weight: bold";
    div2.innerHTML = Date;
    div.appendChild(div2);
    var a = document.createElement("a");
    a.style = "word-wrap: break-word;font-size: x-large;font-weight: bold;color: black";
    a.href = "hello"
    a.innerHTML = "<u>" + Title + "</u>";
    div.appendChild(a);
    var div4 = document.createElement("div");
    div4.style =
        "border-left: 6px solid rgb(255, 174, 0);padding: 10px;word-wrap: break-word;text-align: left;font-size: large";
    div4.innerHTML = Desc;
    div.appendChild(div4);
    var div5 = document.createElement("div");
    div5.innerHTML = "Go to relevant page "
    var a = document.createElement("a");
    a.href = "https://dineth-de-silva.github.io/MyBlog/?pg=" + Pageid;
    a.classList.add("btn");
    a.classList.add("btn-info");
    a.style = "border-radius: 50px";
    a.innerHTML = "Page <i class='fa fa-external-link'></i>";
    div5.appendChild(a);
    div.appendChild(div5)
    divn.appendChild(div)
    return divn;
}

function all_new_area_col() {
    var div = document.createElement("div");
    div.classList.add("all_area_col");
    all_current_col++;
    div.id = "c" + all_current_col.toString();
    return div;
}

function all_fetchposts(cyear) {
    firebase
        .database()
        .ref("all/posts/" + cyear + "/posts")
        .orderByChild("rid")
        .once("value", function (snapshot) {
            snapshot.forEach(function (Childsnapshot) {
                let Date = Childsnapshot.val().date;
                let Title = Childsnapshot.val().title;
                let Desc = Childsnapshot.val().desc;
                let Pageid = Childsnapshot.val().pageid;
                all_addpost(Title, Date, Desc, Pageid);
            });
        });
}
