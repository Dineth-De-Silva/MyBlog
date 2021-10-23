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
