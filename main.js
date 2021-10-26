var main_page_position_right = true;
var main_current_col = 0;
var main_page_area = document.createElement("div");

function main_default() {
    var area = document.getElementById("area");
    main_page_area.style = "padding: 20px";
    main_page_area.appendChild(document.createElement("br"))
    var h1 = document.createElement("h1");
    h1.style = "text-align: center;font-family:Pacifico";
    h1.innerHTML = "All Pages";
    main_page_area.appendChild(h1);
    main_page_area.appendChild(document.createElement("br"))
    var br = document.createElement("br");
    main_page_area.appendChild(br);
    area.appendChild(main_page_area);
}

function main_addpage(Noml, Id, Title, Nposts, Desc) {
    if (main_page_position_right) {
        var new_area_col = main_new_area_col();
        var page = main_page(Noml, Id, Title, Nposts, Desc);
        new_area_col.appendChild(page);
        main_page_area.appendChild(new_area_col);
        main_page_position_right = false;
        main_page_area.appendChild(new_area_col);
    } else {
        var cur_area_col = document.getElementById(
            "c" + main_current_col.toString()
        );
        var page = main_page(Noml, Id, Title, Nposts, Desc);
        cur_area_col.appendChild(page);
        main_page_position_right = true;
    }
}

function main_page(Noml, Id, Title, Nposts, Desc) {
    if (Noml) {
        var div = document.createElement("div");
        div.style = "flex-grow: 1; display: flex; justify-content: center";
        var div2 = document.createElement("div");
        div2.classList.add("card");
        div2.classList.add("main_page");
        div2.classList.add("shadow");
        var div3 = document.createElement("div");
        div3.classList.add("card-body");
        var h5 = document.createElement("h5");
        h5.classList.add("card-title");
        h5.style = "font-size: xx-large;";
        h5.innerHTML =
            "<span style='text-decoration: underline;'>" +
            Title +
            "</span> <span style='font-size: large;'>" +
            "(" +
            Nposts +
            ")</span>";
        div3.appendChild(h5);
        div3.appendChild(document.createElement("br"));
        var p = document.createElement("p");
        p.classList.add("card-text");
        p.style = "font-size: larger";
        p.innerHTML = Desc;
        div3.appendChild(p);
        var a = document.createElement("a");
        a.href = window.location.href + "?pg=" + Id;
        a.classList.add("btn");
        a.classList.add("btn-outline-warning");
        a.style = "border-radius: 50px";
        a.innerHTML = "Posts <i class='fa fa-external-link'></i>";
        div3.appendChild(a);
        div2.appendChild(div3);
        div.appendChild(div2);
        return div;
    } else {
        var div = document.createElement("div");
        div.style = "flex-grow: 1; display: flex; justify-content: center";
        var div2 = document.createElement("div");
        div2.classList.add("card");
        div2.classList.add("main_page");
        div2.classList.add("shadow");
        div2.style = "background-color: rgb(255,0,-2, 0.92);width:250px;height:246"
        var div3 = document.createElement("div");
        div3.classList.add("card-body");
        var h5 = document.createElement("h5");
        h5.classList.add("card-title");
        h5.style = "font-size: xx-large;";
        h5.innerHTML =
            "<span>All Posts</span> <span style='font-size: large;'>" +
            "(" +
            Nposts +
            ")</span>";
        div3.appendChild(h5);
        div3.appendChild(document.createElement("br"));
        var a = document.createElement("a");
        a.href = "https://dineth-de-silva.github.io/MyBlog/?ap=true";
        a.classList.add("btn");
        a.classList.add("btn-dark");
        a.style = "border-radius: 50px";
        a.innerHTML = "View <i class='fa fa-external-link'></i>";
        div3.appendChild(a);
        div2.appendChild(div3);
        div.appendChild(div2);
        return div;
    }
}

function main_new_area_col() {
    var div = document.createElement("div");
    div.classList.add("main_area_col");
    main_current_col++;
    div.id = "c" + main_current_col.toString();
    return div;
}

function main_fetchpages() {
    firebase
        .database()
        .ref("all/")
        .on('value', (snapshot) => {
            const Nposts = snapshot.val().nposts;
            main_addpage(false, null, null, Nposts, null);
        });
    firebase
        .database()
        .ref("pages")
        .orderByChild("rid")
        .once("value", function (snapshot) {
            snapshot.forEach(function (Childsnapshot) {
                let Id = Childsnapshot.val().id;
                let Nposts = Childsnapshot.val().nposts;
                let Title = Childsnapshot.val().title;
                let Desc = Childsnapshot.val().desc;
                main_addpage(true, Id, Title, Nposts, Desc);
            });
        });
}
