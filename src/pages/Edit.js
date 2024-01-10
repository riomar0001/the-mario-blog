import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../useFetch";

const Edit = () => {
    const { id } = useParams();
    const { data: blog } = useFetch("http://192.168.1.2:8000/blogs/" + id);

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [author, setAuthor] = useState("Mario");
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();

    useEffect(() => {
        if (blog) {
            setTitle(blog.title);
            setBody(blog.body);
            setAuthor(blog.author);
        }
    }, [blog]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsPending(true);

        const editBlog = { title, body, author };

        setTimeout(() => {
            fetch(`http://192.168.1.2:8000/blogs/${id}`, {
                method: "PUT", 
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editBlog),
            })
                .then(() => {
                    console.log("Blog Updated");
                    setIsPending(false);
                    history.push("/blogs/" + id);
                })
                .catch((error) => {
                    console.error("Error updating blog:", error);
                    setIsPending(false);
                });
        }, 1000);
    };

    return (
        <div className="create">
            <h2>Edit Blog</h2>
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
                    onChange={(e) => setBody(e.target.value)}
                ></textarea>
                <label>Blog Author:* </label>
                <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />
                {!isPending && <button>Update Blog</button>}
                {isPending && <button disabled>Updating Blog...</button>}
            </form>
        </div>
    );
};

export default Edit;
