// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: 'freelancer-finding-system.firebaseapp.com',
    projectId: 'freelancer-finding-system',
    storageBucket: 'freelancer-finding-system.appspot.com',
    messagingSenderId: '204633353469',
    appId: '1:204633353469:web:467a6c1dfc48cf51902294',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);

export const upLoadFile = async (userId, type, file) => {
    const userRef = ref(storage, `${userId}/${type}/${file.name}`);
    const mess = await uploadBytes(userRef, file).then(() => {
        return 'Uploaded done';
    });
    return mess;
};

export const downloadFile = async (userId, type, img) => {
    const userRef = ref(storage, `${userId}/${type}/issue_18_10.png`);
    await getDownloadURL(userRef).then((url) => {
        console.log(url);
        img = url;
    });
    //return urlFile;
};
