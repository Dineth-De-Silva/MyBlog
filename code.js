function parachecker() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.has("pg")) {
        if (urlParams.has("po")) {
            var PageN = urlParams.get("pg");
            var PostN = urlParams.get("po");
            var cyear = moment().year();
            post_default(PageN, PostN, cyear)
        } else {
            var PageN = urlParams.get("pg");
            if (urlParams.has("y")) {

            } else {
                var cyear = moment().year();
                to_page(PageN, cyear)
            }
        }
    } else if (urlParams.has("ap")) {
        if (urlParams.has("y")) {

        } else {
            var cyear = moment().year();
            to_all(cyear)
        }
    } else {
        to_main();
    }
}

function to_main() {
    main_default();
    main_fetchpages();
}

function to_all(cyear) {
    all_default();
    all_fetchposts(cyear);
}

function to_page(pageN, cyear) {
    page_default(pageN);
    page_fetchposts(pageN, cyear);
}

parachecker();
