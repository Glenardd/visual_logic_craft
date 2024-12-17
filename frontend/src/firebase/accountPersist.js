import { onAuthStateChanged, signOut, signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebase";
import { get, ref, set } from "firebase/database";
import { database } from "./firebase";

const authListener = (callback) => {
    onAuthStateChanged(auth, (user) => {
        if (user) {      
            //checks if the used account to login exist in the db
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

      const userId = user.uid;
      const userEmail = user.email;
      const userDisplayName = user.displayName;

      const reference = ref(database, "users/" + userId);
      const referenceId = ref(database, "users/"+ userId);

      get(referenceId).then((snapshot) =>{
        if(snapshot.exists()){
          console.log("account already exist, you may continue");
        }else{
          set(reference,{
            displayName: userDisplayName,
            email: userEmail,
            cards: ["Conditional Cobra", "Variable Vulture", "Array Antellope", "Function Falcon"],
          });
        };
      });
      
      console.log("Logged in as:", userEmail);
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
