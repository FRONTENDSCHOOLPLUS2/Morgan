import { useState, useEffect } from "react";
import CommentNew from "./CommentNew";
import { getReply } from "../../api/reply";
import { IReply } from "../../types/community";
import CommentItem from "./CommentItem";

interface ICommentListProps {
    postId: number
}

const CommentList = ({ postId }: ICommentListProps)  => {
    const [replies, setReplies] = useState<IReply[]>([]);
    const [isActivate, setIsActivate] = useState<boolean>(false);
    const sessionData = sessionStorage.getItem('profile');
    const profileToken = sessionData ? JSON.parse(sessionData).state.profile.token.accessToken : null;
    const [commentValue, setCommentValue] = useState<string>('');

    
    const fetchReply = async (id:number) => {
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
        const profileId = storagedProfile ? JSON.parse(storagedProfile).state.profile._id : null;
        const storagedPostItem = sessionStorage.getItem('postItem');
        const postItemId = storagedPostItem ? JSON.parse(storagedPostItem).state.postItem.user._id : null;
        if (profileId === postItemId) setIsActivate(true);
    }, [postId]);

    // console.log(replies);

    return(
        <section className="mb-8">
            <h4 className="mt-8 mb-4 ml-2">댓글 {replies.length}개</h4>

            {/* 댓글 */}
            {replies.map((reply) => (
                <CommentItem reply={reply} isActivate={isActivate} />
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