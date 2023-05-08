import { onSnapshot, orderBy, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { appFireStore } from "../firebase/config"
import { collection } from "firebase/firestore"

export const useMyRecipeCollection = (transaction, myQuery) => {
    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);

    // useCollection 함수에서 query를 넣어 collection에서 나의 글만 가져옴
    useEffect(() => {
        let q;
        if (myQuery) { // orderBy를 통해 createdTime 을 기준으로 정렬
            q = query(collection(appFireStore, transaction), where(...myQuery), orderBy("createdTime", "desc"));
        }

        const unsubscribe = onSnapshot((myQuery ? q : collection(appFireStore, transaction)), (snapshot) => {

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
