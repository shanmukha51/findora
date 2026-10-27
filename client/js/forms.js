/* =====================================
   FINDORA FORMS - FIREBASE VERSION
===================================== */

import {
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import {
    ref,
    uploadBytes,
    getDownloadURL
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-storage.js";

import { db, storage, auth } from "./firebase.js";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";


/* =====================================
   REPORT LOST
===================================== */

const lostForm =
    document.getElementById("lostForm");


if (lostForm) {

    lostForm.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();

            const formData =
                new FormData(lostForm);

            const currentUser =
                auth.currentUser;


            try {

                const newItem = {

                    name:
                        formData.get("itemName"),

                    category:
                        formData.get("category"),

                    status:
                        "lost",

                    location:
                        formData.get("location"),

                    date:
                        formData.get("date"),

                    description:
                        formData.get("description"),

                    reporter:
                        formData.get("reporter"),

                    email:
                        formData.get("email"),

                    icon:
                        "📦",

                    reporterId:
                        currentUser
                            ? currentUser.uid
                            : null,

                    createdAt:
                        serverTimestamp()

                };


                await addDoc(
                    collection(db, "items"),
                    newItem
                );


                showToast(
                    "Lost item reported successfully!"
                );


                lostForm.reset();


                setTimeout(() => {

                    window.location.href =
                        "browse.html";

                }, 1200);


            } catch (error) {

                console.error(
                    "Lost item error:",
                    error
                );

                showToast(
                    "Failed to report lost item."
                );

            }

        }
    );

}


/* =====================================
   REPORT FOUND
===================================== */

const foundForm =
    document.getElementById("foundForm");


if (foundForm) {

    foundForm.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();

            const formData =
                new FormData(foundForm);

            const currentUser =
                auth.currentUser;


            try {

                const newItem = {

                    name:
                        formData.get("itemName"),

                    category:
                        formData.get("category"),

                    status:
                        "found",

                    location:
                        formData.get("location"),

                    date:
                        formData.get("date"),

                    description:
                        formData.get("description"),

                    reporter:
                        formData.get("reporter"),

                    email:
                        formData.get("email"),

                    icon:
                        "📦",

                    reporterId:
                        currentUser
                            ? currentUser.uid
                            : null,

                    createdAt:
                        serverTimestamp()

                };


                await addDoc(
                    collection(db, "items"),
                    newItem
                );


                showToast(
                    "Found item reported successfully!"
                );


                foundForm.reset();


                setTimeout(() => {

                    window.location.href =
                        "browse.html";

                }, 1200);


            } catch (error) {

                console.error(
                    "Found item error:",
                    error
                );

                showToast(
                    "Failed to report found item."
                );

            }

        }
    );

}


/* =====================================
   REGISTER
===================================== */

const registerForm =
    document.getElementById("registerForm");


if (registerForm) {

    registerForm.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();


            const formData =
                new FormData(registerForm);


            const name =
                formData.get("name").trim();

            const email =
                formData.get("email").trim();

            const password =
                formData.get("password");

            const confirmPassword =
                formData.get("confirmPassword");


            /* Password check */

            if (
                password !==
                confirmPassword
            ) {

                showToast(
                    "Passwords do not match."
                );

                return;
            }


            /* Password length */

            if (password.length < 6) {

                showToast(
                    "Password must contain at least 6 characters."
                );

                return;
            }


            try {

                /* Create Firebase account */

                const userCredential =
                    await createUserWithEmailAndPassword(
                        auth,
                        email,
                        password
                    );


                const user =
                    userCredential.user;


                /* Save display name */

                await updateProfile(
                    user,
                    {
                        displayName: name
                    }
                );


                console.log(
                    "Firebase user created:",
                    user
                );


                showToast(
                    "Account created successfully!"
                );


                registerForm.reset();


                setTimeout(() => {

                    window.location.href =
                        "login.html";

                }, 1200);


            } catch (error) {

                console.error(
                    "Registration error:",
                    error
                );


                if (
                    error.code ===
                    "auth/email-already-in-use"
                ) {

                    showToast(
                        "This email is already registered."
                    );

                }

                else if (
                    error.code ===
                    "auth/invalid-email"
                ) {

                    showToast(
                        "Please enter a valid email."
                    );

                }

                else if (
                    error.code ===
                    "auth/weak-password"
                ) {

                    showToast(
                        "Password is too weak."
                    );

                }

                else {

                    showToast(
                        "Registration failed."
                    );

                }

            }

        }
    );

}


/* =====================================
   LOGIN
===================================== */

const loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();


            const formData =
                new FormData(loginForm);


            const email =
                formData.get("email").trim();

            const password =
                formData.get("password");


            try {

                /* Firebase login */

                const userCredential =
                    await signInWithEmailAndPassword(
                        auth,
                        email,
                        password
                    );


                console.log(
                    "Logged in user:",
                    userCredential.user
                );


                showToast(
                    "Login successful!"
                );


                setTimeout(() => {

                    window.location.href =
                        "index.html";

                }, 1000);


            } catch (error) {

                console.error(
                    "Login error:",
                    error
                );


                if (
                    error.code ===
                    "auth/invalid-credential"
                ) {

                    showToast(
                        "Invalid email or password."
                    );

                }

                else if (
                    error.code ===
                    "auth/user-not-found"
                ) {

                    showToast(
                        "Account not found."
                    );

                }

                else if (
                    error.code ===
                    "auth/wrong-password"
                ) {

                    showToast(
                        "Incorrect password."
                    );

                }

                else {

                    showToast(
                        "Login failed."
                    );

                }

            }

        }
    );

}