import { useNavigate } from "react-router-dom";
import { usePostItemStore } from "@zustand/usePostItem";

const ListItem = ({ index, post }) => {
    const { updatePostItem } = usePostItemStore();
    const navigate = useNavigate();

    const onDetail = () => {
        updatePostItem(post);
        navigate('/info/' + post._id);
    }

    return(
        <>
            <tr className="border-b border-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300 ease-in-out">
                <td className="p-2 text-center">{index}</td>
                <td className="p-2 truncate indent-4 cursor-pointer" onClick={onDetail}>{post.title}</td>
                <td className="p-2 text-center truncate">{post.user.name}</td>
                <td className="p-2 text-center hidden sm:table-cell">{post.views}</td>
                <td className="p-2 text-center hidden sm:table-cell">{post.repliesCount}</td>
                <td className="p-2 truncate text-center hidden sm:table-cell">{post.createdAt}</td>
            </tr>
        </>
    );
};

export default ListItem;