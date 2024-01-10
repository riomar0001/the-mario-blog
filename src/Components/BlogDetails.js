import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from "../useFetch";

const BlogDetails = () => {
    const { id } = useParams();
    const { data: blog, isPending, error } = useFetch("http://192.168.1.2:8000/blogs/" + id);
    const history = useHistory();
    
    const handClick = () => {
        fetch("http://192.168.1.2:8000/blogs/" + blog.id, {
            method: "DELETE"
        }).then(() => {
            history.push("/")
        })
    }

    return (
        <div className="blog-details">
            {isPending && <h2>loading...</h2>}
            {error && <h2>{error}</h2>}
            {blog &&
                <>
                    <h2>{blog.title}</h2>
                    <p>Written by: {blog.author}</p>
                    <p>{blog.body}</p>
                    <button onClick={handClick}>Delete</button>
                </>}
        </div>
    );
}

export default BlogDetails;
