import Submit from "@components/Submit";
import Button from "@components/Button";
import { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useProfileStore from "../../zustand/useProfile";
import { newPost } from "../../api/post";

function New() {
    const inputRefMap = useRef(new Map());
    const navigator = useNavigate();
    const { profile } = useProfileStore();
    const [isWarning, setIsWaring] = useState();
    const [warningMessage, setWarningMessage] = useState('');
    
    const setInputRef = useCallback((node) => {
        if (node !== null) inputRefMap.current.set(node.name, node);
    }, []);

    
    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        for (const [name, value] of formData) {
            if (value === "") return inputRefMap.current.get(name).focus();
        }
        const info = Object.fromEntries(formData.entries());

        info.type = "post";
        // info.type = profile.type;
        // console.log(profile);
        const token = profile.token.accessToken;

        try {
            const res = await newPost(token, info);

            if (res.ok === 1 ) {
                setIsWaring(false)
                console.log("Posting Success!!!");
                console.log(res);

                navigator('/info');
            } else {
                setIsWaring(true);
                setWarningMessage(res.errors ? res.erros[0].msg : res.message);
                console.log(res);
                console.log("Fail Posting");
            }

        } catch (err) {
            console.error(err);
        }

        
    }

    return (
    <main className="min-w-[320px] p-4">
        <div className="text-center py-4">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">게시글 등록</h2>
        </div>
        <section className="mb-8 p-4">
        <form onSubmit={onSubmit}>
            <div className="my-4">
            <label className="block text-lg content-center" htmlFor="title">제목</label>
            <input
                ref={setInputRef}
                id="title"
                type="text"
                placeholder="제목을 입력하세요." 
                className="w-full py-2 px-4 border rounded-md dark:bg-gray-700 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                name="title"
                required
            />
            {/* 입력값 검증 에러 출력 */}
            { isWarning 
            ? (
                <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">{warningMessage}</p>
            ) : null
            }
            </div>
            <div className="my-4">
            <label className="block text-lg content-center" htmlFor="content">내용</label>
            <textarea
                ref={setInputRef}
                id="content"
                rows="15" 
                placeholder="내용을 입력하세요."
                className="w-full p-4 text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                name="content"
                required
            ></textarea>
            {/* 입력값 검증 에러 출력 */}
            {/* <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">에러 메세지</p> */}
            </div>
            <hr />
            <div className="flex justify-end my-6">
            <Submit
            >
                등록
            </Submit>
            <Button type="reset" bgColor="gray" onClick={() => navigator(-1)}>취소</Button>
            </div>
        </form>
        </section>
    </main>
    );
}

export default New;