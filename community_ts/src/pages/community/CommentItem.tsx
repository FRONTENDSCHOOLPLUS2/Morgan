import Button from "@components/Button";
import { Link } from "react-router-dom";
import { IReply } from "#types/community";

interface ICommentItem {
    reply: IReply,
    isActivate: boolean, 
}

const CommentItem = ({ reply, isActivate }: ICommentItem) => {
    
    return(
        <div key={reply._id} 
            className="shadow-md rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
                <img
                    className="w-8 mr-2 rounded-full"
                    src="http://api.fesp.shop/files/00-sample/user-muzi.webp"
                    alt="프로필 이미지"
                />
                <Link to="" className="text-orange-400">{reply.user.name}</Link>
                <time className="ml-auto text-gray-500" dateTime="2024.07.02 14:11:22">{reply.updatedAt}</time>
            </div>
            <div className="flex justify-between items-center mb-2">
                <pre className="whitespace-pre-wrap text-sm">{reply.content}</pre>
                { isActivate
                    ? (
                        <Button bgColor="red" size="sm">삭제</Button>
                    ) : null
                }
            </div>
        </div>
    );

}

export default CommentItem;