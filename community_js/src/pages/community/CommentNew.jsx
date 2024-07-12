import { useRef, useState, useCallback } from "react";
import { newReply } from "@api/reply";
import Submit from "@components/Submit";

const CommentNew = ({token, postId, CommentValue, setCommentValue}) => {
    const [isWarning, setIsWarning] = useState(false);
    const inputRefMap = useRef(new Map());
    const newCommentHandler = (e) => {
        setCommentValue(e.target.value);
    }

    const setInputRef = useCallback((node) => {
        if (node !== null) inputRefMap.current.set(node.name, node);
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        // formData.append('content', e.target);
        const [name, value] = formData;
        if (value === "") {
            return inputRefMap.current.get(name).focus();
        }
        const info = Object.fromEntries(formData.entries());
        // console.log(info);
        const content = {content: info.comment};

        try {
            const res = await newReply(token, postId, content);

            if(res.ok === 1) {
                setCommentValue('');
                setIsWarning(false);
                console.log("Commenting Sucess!!!");
                // console.log(res);
            } else {
                setIsWarning(true);
                console.log("Fail Commenting");
                console.log(res);
            }

        } catch (err) {
            setIsWarning(true);
            console.err(err);
        }
    }



    return (
        <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="mb-4">새로운 댓글을 추가하세요.</h4>
            <form onSubmit={onSubmit}>
                <div className="mb-4">
                    <textarea
                        ref={setInputRef}
                        rows="3"
                        cols="40"
                        className="block p-2 w-full text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        placeholder="내용을 입력하세요."
                        name="comment"
                        value={CommentValue}
                        onChange={newCommentHandler}
                    >
                    </textarea>

                    {/* 에러 메세지 출력 */}
                    { isWarning
                        ? (
                            <p className="ml-2 mt-1 text-sm text-red-500">
                            에러 메세지
                            </p>
                        ) : null
                    }
                    
                </div>
                <Submit>댓글 등록</Submit>
            </form>
        </div>
    );
}

export default CommentNew;