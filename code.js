function parachecker() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  if(urlParams.has("pg")){
    if (urlParams.has("po")) {
      post(pg,po);
    }else{
      page(pg)
    }
  }else{
    main()
  }
}

function main(){

}

function page(pg){

}

function post(pg,po){

}

parachecker();

// function post(Title, Date, Desc) {
//   var post_area = document.getElementById("post_area");
//   var div = document.createElement("div");
//   div.classList.add("post");
//   var div2 = document.createElement("div");
//   div2.style = "front-weight: bold";
//   div2.innerHTML = Date;
//   div.appendChild(div2);
//   var div3 = document.createElement("div");
//   div3.style = "word-wrap: break-word;font-size: x-large;font-weight: bold";
//   div3.innerHTML = "<u>" + Title + "</u>";
//   div.appendChild(div3);
//   var div4 = document.createElement("div");
//   div4.style =
//     "border-left: 6px solid rgb(255, 174, 0);padding: 10px;word-wrap: break-word;text-align: left;font-size: large";
//   div4.innerHTML = Desc;
//   div.appendChild(div4);
//   post_area.appendChild(div);
// }

// function fetchPosts() {
//   firebase
//     .database()
//     .ref("post")
//     .orderByChild("rid")
//     .once("value", function (snapshot) {
//       snapshot.forEach(function (Childsnapshot) {
//         let Date = Childsnapshot.val().date;
//         let Title = Childsnapshot.val().title;
//         let Desc = Childsnapshot.val().desc;
//         post(Title, Date, Desc);
//       });
//     });
// }

// fetchPosts()
