const routeToProfile = () => {
    if (typeof(Storage) !== "undefined") {
        window.location.replace("/error");
    }
    let email = sessionStorage.getItem("email")
    if (!email) {
        window.location.replace("/user/sample");
    } else {
        window.location.replace("/user/" + email);
    }
}


const routeToReservation = () => {
    if (typeof(Storage) !== "undefined") {
        window.location.replace("/error");
    }
    const P_UUID = sessionStorage.getItem("P_UUID")
    if (!email) {
        window.location.replace("/reservation/" + P_UUID);
    } else {
        window.location.replace("/user/sample");
    }
}