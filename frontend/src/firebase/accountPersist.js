import { onAuthStateChanged, setPersistence, browserLocalPersistence, signOut, signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebase";

const authListener = (callback) => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in
            callback(user);
        } else {
            // User is signed out
            callback(null);
        };
    });
};

const login = () =>{
    signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log("Logged in as:", user.displayName);
    })
    .catch((error) => {
      console.error("Error signing in with Google:", error);
    });
};

const logout = () =>{
    signOut(auth)
    .then(() => {
      console.log("User has signed out");
    })
    .catch((error) => {
      console.error("Error signing out:", error);
    });
};

export {authListener, login, logout}; 
