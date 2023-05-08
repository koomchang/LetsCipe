import { onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"
import { appFireStore } from "../firebase/config"
import { collection } from "firebase/firestore"

// 컬렉션을 사용하는 커스텀 훅
export const useCollection = (transaction) => {
    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // 컬렉션의 데이터를 실시간으로 가져오기
        const unsubscribe = onSnapshot(collection(appFireStore, transaction), (snapshot) => {

            let result = [];
            snapshot.docs.forEach((doc) => {
                result.push({ ...doc.data(), id: doc.id })
            })

            setDocuments(result);
            setError(null);
        },
            (error) => {
                setError(error.message)
            })
        return unsubscribe;
    }, [collection])
    return { documents, error }
}
