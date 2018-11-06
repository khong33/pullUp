const routeToProfile = () => {
    if (typeof(Storage) !== "undefined") {
        window.location.replace("/user/sample");
    }
    let email = sessionStorage.getItem("email")
    if (!email) {
        window.location.replace("/user/sample");
    } else {
        window.location.replace("/user/" + email);
    }
}
