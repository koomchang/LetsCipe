import { addDoc, collection, deleteDoc, doc } from "firebase/firestore"
import { useReducer } from "react"
import { appFireStore, timestamp } from "../firebase/config"

const initState = {
    document: null,
    isPending: false,
    error: null,
    success: false
}

const storeReducer = (state, action) => {
    switch (action.type) {
        case 'isPending':
            return { isPending: true, document: null, success: false, error: null }
        case 'addDoc':
            return { isPending: false, document: action.payload, success: true, error: null }
        case 'error':
            return { isPending: false, document: null, success: false, error: action.payload }
        default:
            return state
    }
}

export const useFireStore = (transaction) => {
    const [response, dispatch] = useReducer(storeReducer, initState);

    const colRef = collection(appFireStore, transaction);

    const addDocument = async (doc) => {
        dispatch({ type: "isPending" });
        try {
            const createdTime = timestamp.fromDate(new Date());
            const docRef = await addDoc(colRef, { ...doc, createdTime });
            console.log(docRef);
            dispatch({ type: 'addDoc', payload: docRef });
        } catch (e) {
            dispatch({ type: 'error', payload: e.message });
        }
    }

    return { addDocument, response }
}

