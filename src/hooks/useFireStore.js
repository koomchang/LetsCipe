import { addDoc, collection, deleteDoc, doc } from "firebase/firestore"
import { useReducer } from "react"
import { appFireStore, timestamp } from "../firebase/config"

// 초기 상태 설정
const initState = {
    document: null,
    isPending: false,
    error: null,
    success: false
}

// 
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

// 문서를 추가하고 문서 추가 요청에 대한 상태 관리
export const useFireStore = (transaction) => {

    // 초기 상태 설정
    const [response, dispatch] = useReducer(storeReducer, initState);
    const colRef = collection(appFireStore, transaction);

    const addDocument = async (doc) => {
        dispatch({ type: "isPending" });
        try {
            const createdTime = timestamp.fromDate(new Date());
            const docRef = await addDoc(colRef, { ...doc, createdTime });
            // 요청 성공 시 문서 ID를 나타내는 docRef값을 payload로 포함하여 addDoc 액션 발생
            dispatch({ type: 'addDoc', payload: docRef });
        } catch (e) {
            dispatch({ type: 'error', payload: e.message });
        }
    }

    return { addDocument, response }
}
