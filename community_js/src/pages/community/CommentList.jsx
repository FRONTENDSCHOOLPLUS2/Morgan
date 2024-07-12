import { useState, useEffect } from "react";
import Button from "@components/Button";
import CommentNew from "./CommentNew";
import { Link } from "react-router-dom";
import { getReply } from "@api/reply";

const CommentList = ({ postId }) => {
    const [replies, setReplies] = useState([]);
    const [isActivate, setIsActivate] = useState(false);
    const profileToken = JSON.parse(sessionStorage.getItem('profile')).state.profile.token.accessToken;
    const [commentValue, setCommentValue] = useState('');

    
    const fetchReply = async (id) => {
        try {
            const res = await getReply(id);
            const items = res.item;
            return items;
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        (async () => {
            const items = await fetchReply(postId);
            setReplies([...items]);
        })();

        const storagedProfile = sessionStorage.getItem('profile');
        const profileId = JSON.parse(storagedProfile).state.profile._id;
        const storagedPostItem = sessionStorage.getItem('postItem');
        const postItemId = JSON.parse(storagedPostItem).state.postItem.user._id;
        if (profileId === postItemId) setIsActivate(true);
    }, [postId]);

    // console.log(replies);

    return(
        <section className="mb-8">
            <h4 className="mt-8 mb-4 ml-2">댓글 {replies.length}개</h4>

            {/* 댓글 */}
            {replies.map((reply) => (
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
            ))}
            <CommentNew
                postId={postId}
                token={profileToken}
                commentValue={commentValue}
                setCommentValue={setCommentValue}
            />
        </section>
    );
};

export default CommentList;