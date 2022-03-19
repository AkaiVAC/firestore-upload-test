import { initializeApp } from 'firebase/app';
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import fetch from 'node-fetch';

import createGuid from './utils/createGuid.js';

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
};

initializeApp(firebaseConfig);
const db = getFirestore();
const posts = await (
    await fetch('https://jsonplaceholder.typicode.com/posts')
).json();

try {
    posts.forEach(async function (post) {
        await setDoc(doc(db, 'posts', createGuid()), post);
    });
} catch (e) {
    console.error('Error adding document: \n', e);
}
