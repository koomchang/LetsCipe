import { useEffect, useState } from "react"
import { useFireStore } from "../hooks/useFireStore";
import { useNavigate } from "react-router-dom";
import styles from "./RecipeForm.module.css";

export default function RecipeForm({ uid, displayName }) {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const { addDocument, response } = useFireStore('recipe');

    // 제목과 내용을 react에서 관리 하도록 설정
    const handleData = (event) => {
        if (event.target.id === 'tit') {
            setTitle(event.target.value);
        } else if (event.target.id === "txt") {
            setText(event.target.value);
        }
    }

    // 데이터가 성공적으로 저장되면 제목, 내용을 초기화 해줌
    useEffect(() => {
        if (response.success) {
            setTitle('');
            setText('');
        }
    }, [response.success])


    // form submit 이벤트 핸들링
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = { uid, title, text, displayName };
        addDocument(data);
        navigate("/my-recipe");
    }

    return (
        <>
            <form onSubmit={handleSubmit} className={styles["form-container"]}>
                <fieldset>
                    <legend>레시피 작성</legend>
                    <div className={styles["form-field"]}>
                        <label htmlFor="tit" className={styles["form-label"]}>제목 </label>
                        <input id="tit" type="text" value={title} required onChange={handleData} className={styles["form-input"]} />
                    </div>

                    <div className={styles["form-field"]}>
                        <label htmlFor="txt" className={styles["form-label"]}>내용 </label>
                        <textarea id="txt" type="text" value={text} required onChange={handleData} className={styles["form-textarea"]}></textarea>
                    </div>

                    <button type="submit" className={styles["form-button"]}>저장하기</button>
                </fieldset>
            </form>
        </>
    )
}
