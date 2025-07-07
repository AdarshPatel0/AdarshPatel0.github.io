function run(){
    fetch("/header.html")
    .then(response => response.text())
    .then(html => {
        document.getElementById("header-placeholder").innerHTML = html
    })
}

document.addEventListener("DOMContentLoaded",run)