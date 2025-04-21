import { initializeApp } from "firebase/app";
import { 
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword, 
    signOut} from "firebase/auth";
import { 
        addDoc,
        collection, 
        getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyBwqB6D6GDLdLNVmbujG0E1eyxiPnZWy9g",
  authDomain: "netflix-clone-e7ab9.firebaseapp.com",
  projectId: "netflix-clone-e7ab9",
  storageBucket: "netflix-clone-e7ab9.firebasestorage.app",
  messagingSenderId: "741058459712",
  appId: "1:741058459712:web:fc2eafdb87b110f88a87a5"
};



const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email
    });
} catch (error) {
    console.error(error);
    toast.error(error.code.split("/")[1].split('-').join(" "));
}
}

const login = async (email, password)=>{
    try {
        await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
        console.error(error);
        toast.error(error.code.split("/")[1].split('-').join(" "));
        }
    }
const logout = ()=>{
signOut(auth);
}

export { auth, db, signup, login, logout };