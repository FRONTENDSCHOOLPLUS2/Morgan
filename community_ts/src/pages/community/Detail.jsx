import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import CommentList from "./CommentList";

function Detail() {
    const navigate = useNavigate();
    const [isActivate, setIsActivate] = useState();
    const savedData = sessionStorage.getItem('postItem');
    const postItem = JSON.parse(savedData).state.postItem;

    useEffect(() => {
        const postItemId = JSON.parse(savedData).state.postItem.user._id;
        const savedProfile = sessionStorage.getItem('profile');
        const profileId = JSON.parse(savedProfile).state.profile._id;
        if (profileId === postItemId) setIsActivate(true);
    }, [savedData]);


    return (
    <main className="container mx-auto mt-4 px-4">
        <section className="mb-8 p-4">
            <div className="font-semibold text-xl">제목 : {postItem.title}</div>
            <div className="text-right text-gray-400">작성자 : {postItem.user.name}</div>
            <div className="mb-4">
                <div>
                <pre className="font-roboto w-full p-2 whitespace-pre-wrap">{postItem.content}</pre>
                </div>
                <hr/>
            </div>
            <div className="flex justify-end my-4">
                <Button onClick={ () => navigate(-1)}>목록</Button>
                { isActivate
                    ? (
                        <>
                            <Button bgColor="gray" onClick={ () => navigate('/info/1/edit')}>수정</Button>
                            <Button bgColor="red" onClick={()=> navigate('/info')}>삭제</Button>
                        </>
                    ) : null
                }
            </div>
        </section>
        <CommentList
            postId={postItem._id}
        />
    </main>
    );
}

export default Detail;