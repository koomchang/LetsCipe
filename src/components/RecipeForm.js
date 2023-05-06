import { useEffect, useState } from "react"
import { useFireStore } from "../hooks/useFireStore";
import { useNavigate } from "react-router-dom";

export default function DiaryForm({ uid, displayName }) {

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const { addDocument, response } = useFireStore('recipe');

    const handleData = (event) => {
        if (event.target.id === 'tit') {
            setTitle(event.target.value);
        } else if (event.target.id === "txt") {
            setText(event.target.value);
        }
    }

    useEffect(() => {
        if (response.success) {
            setTitle('');
            setText('');
        }
    }, [response.success])

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(title, text);
        addDocument({ uid, title, text, displayName });
        navigate("/my-recipe");
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>레시피 작성</legend>
                    <label htmlFor="tit">제목 : </label>
                    <input id="tit" type="text" value={title} required onChange={handleData} />

                    <label htmlFor="txt">내용 : </label>
                    <textarea id="txt" type="text" value={text} required onChange={handleData}></textarea>

                    <button type="submit">저장하기</button>
                </fieldset>
            </form>
        </>
    )
}