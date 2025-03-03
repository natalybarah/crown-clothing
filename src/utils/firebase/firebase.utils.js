// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//we are able to create google signin wih these:
import{getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs} from 'firebase/firestore'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkfYtQ-WhjldI7ELdSM1Evho3h1ThPFrs",
  authDomain: "crown-clothing-db-48f8f.firebaseapp.com",
  projectId: "crown-clothing-db-48f8f",
  storageBucket: "crown-clothing-db-48f8f.appspot.com",
  messagingSenderId: "354662302015",
  appId: "1:354662302015:web:d00465b7c63d47e065538a"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);


//in order to use google authentication, we need to initialize a provider
//using this google auth provider class that we received

const googleProvider= new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: 'select_account'
})// how we want this googleAuthProvider to behave! which means everytime somone interatcs with our provider,
//we want to force the person to select an account. this is specific to google interface, config that google wants.

export const auth= getAuth();
export const signInWithGooglePopup= ()=>signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect= ()=> signInWithRedirect(auth, googleProvider);


//Initialize firestore and instantiate
export const db= getFirestore(); //now that we have instantiated it we can use it in order to access our database
//this directly points to our database inside of the console

//What we want is to get the data from authentication and store that inside of our firestore

export const addCollectionAndDocuments= async (collectionKey, objectsToAdd) =>{
  const collectionRef= collection(db, collectionKey);
  const batch= writeBatch(db);

  objectsToAdd.forEach((object)=>{
    const docRef= doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  })
  
    await batch.commit();
    console.log('done')

};

export const getCategoriesAndDocuments= async () => {
  const collectionRef= collection(db, 'categories');
  const q= query(collectionRef);

  const querySnapshot= await getDocs(q);
  return querySnapshot.docs.map(docSnapshot=> docSnapshot.data());

  /*reduce((acc, docSnapshot)=>{
    const {title, items} = docSnapshot.data();
    acc[title.toLowerCase()]=items;
    return acc;
*/
  //}, {});
  //return categoryMap;
  
}


export const createUserDocumentFromAuth= async(userAuth, additionalInformation={})=>{
  if(!userAuth) return;

  const userDocRef= doc(db, 'users', userAuth.uid);

  // console.log(userDocRef)

  const userSnapshot= await getDoc(userDocRef)
  /* console.log(userSnapshot)
     console.log(userSnapshot.exists())
  */

  if(!userSnapshot.exists()){
    const {displayName, email}= userAuth;
    const createdAt = new Date();

      try{
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
          ...additionalInformation, //because you don't receive the displayName from the userauth /user object, but rather from the form. 
        })
      }catch(error){
        console.log('There was an error creating the user', error.message)

      }
  }
  console.log(userSnapshot, 'este es el snapshot de utils')
  return userSnapshot;
}


export const createAuthUserWithEmailAndPassword= async(email, password)=>{
  if(!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
  //algo para poder crear el documento de referencia 

}

export const signInAuthUserWithEmailAndPassword= async(email, password)=>{
  if(!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);

}


// if user data does not exist 
// create / set the document with the data from userAuth in my collection

// if user data exists 
//return userDocRef

export const signOutUser = async () => {
  //if user is signed in, then sign ougt
  //if user clicks sign out then sign out
  await signOut(auth);

}

/*export const onAuthStateChangedListener= (callback) =>{
  onAuthStateChanged(auth, callback)
}*/

export const getCurrentUser= ()=>{
  return new Promise((resolve, reject)=>{
    const unsubscribe= onAuthStateChanged(
      auth,
      (userAuth)=>{
        unsubscribe();
        resolve(userAuth);
      }, 
      reject

    )
    })
  }
