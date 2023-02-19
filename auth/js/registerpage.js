// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-analytics.js";
import { getDatabase, ref, child, get, set } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD0X_femAURn9g2LMP99dV13WaXU22W0ks",
    authDomain: "mini-mini-markt.firebaseapp.com",
    projectId: "mini-mini-markt",
    storageBucket: "mini-mini-markt.appspot.com",
    messagingSenderId: "1001531893883",
    appId: "1:1001531893883:web:deabd99888ce9acdb91ade",
    measurementId: "G-QPY0DW5MJ4",
    databaseURL: "https://mini-mini-markt-default-rtdb.europe-west1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//the actual Code!

var isloggedin = false;
var user = "null";

localStorage.setItem("user", null);
localStorage.setItem("loggedin", false);



function checkIfUsernameIsFree(userName, password) {

    console.log("performing check for user: " + userName);
    const dbRef = ref(getDatabase());
    get(child(dbRef, `logins/${userName}`)).then((snapshot) => {
        if (snapshot.exists()) {
            document.getElementById("wrongPassword").innerHTML = "Dieser Account ist bereits belegt!";
        } else {
            console.log("No data available");
            //write the user into the DB
            const db = getDatabase();
            set(ref(db, "logins/" + document.getElementById("usernameInput").value), {
                password: document.getElementById("passwordInput").value

            });
            isloggedin = true;
            
            localStorage.setItem("user", document.getElementById("usernameInput").value);
            localStorage.setItem("loggedin", true);
            window.location.href = "./mini-mini-markt/markt.html";
        }
    }).catch((error) => {
        console.error(error);
        document.getElementById("wrongPassword").innerHTML = "Ein Error ist passiert!";
    });

}


document.getElementById("fertigButton").onclick = function () {

    checkIfUsernameIsFree(document.getElementById("usernameInput").value, document.getElementById("passwordInput").value)





}



