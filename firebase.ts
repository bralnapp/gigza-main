import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyB2omM25kscDLadQhyHDCny9hnyZrLsuOE",
	authDomain: "gigza-main-6fff5.firebaseapp.com",
	projectId: "gigza-main-6fff5",
	storageBucket: "gigza-main-6fff5.appspot.com",
	messagingSenderId: "87997245517",
	appId: "1:87997245517:web:e6a630a449bd10268d9404"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
export { db };

// const app = !firebase.apps.length
// 	? firebase.initializeApp(firebaseConfig)
// 	: firebase.app();
// const db = app.firestore();
// // const analytics = getAnalytics(app);

// export { db };
