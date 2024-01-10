import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from "./useFetch";

const BlogDetails = () => {
    const { id } = useParams();
    const { data: blog, isPending, error } = useFetch("http://192.168.1.2:8000/blogs/" + id);

    return (
        <div className="blog-details">
            {isPending && <h2>loading...</h2>}
            {error && <h2>{error}</h2>}
            {blog &&
                <>
                    <h2>{blog.title}</h2>
                    <p>Written by: {blog.author}</p>
                    <p>{blog.body}</p>
                </>}
        </div>
    );
}

export default BlogDetails;
