import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Create = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [author, setAuthor] = useState("Mario");
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();

        setIsPending(true)

        const newUUID = uuidv4();
        const blog = { title, body, author, id: newUUID};
        setTimeout(() => {
            fetch("http://192.168.1.2:8000/blogs", {
            method: "POST",
            headers: {"Content-Type":"Application/json"},
            body: JSON.stringify(blog)
        }).then(()=>{
            console.log("new Blog Added")
            setIsPending(false)
            history.push("/blogs/"+newUUID);
        })
        }, 1000);
    };

    return (
        <div className="create">
            <h2>Add a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog Title:* </label>
                <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label>Blog Body:* </label>
                <textarea
                    cols="30"
                    rows="10"
                    required
                    value={body}
                    onChange={(e) => setBody(e.target.value)}></textarea>
                <label>Blog Author:* </label>
                <select
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                >
                    <option value="Mario" >Mario</option>
                    <option value="Yoshi" >Yoshi</option>
                </select>
                {!isPending && <button>Add Blog</button>}
                {isPending && <button disabled>Adding Blog...</button>}
            </form>
        </div>
    );
}

export default Create;
