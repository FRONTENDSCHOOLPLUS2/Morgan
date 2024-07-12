import { useCallback, useRef, useState } from 'react';
import Button from "@components/Button";
import Submit from "@components/Submit";
import { useNavigate } from "react-router-dom";
import signup from '@api/signup';
import upload from '@api/upload';

function Signup() {
    const navigator = useNavigate();
    const inputRefMap = useRef(new Map());
    const [isWarning, setIsWarning] = useState(false);
    const [warningMessage, setWarningMessage] = useState("");
    
    const setInputRef = useCallback((node) => {
        if (node !== null) inputRefMap.current.set(node.name, node);
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        for (const [name, value] of formData) {
            if(value === "") return inputRefMap.current.get(name)?.focus();
        }

        const info = Object.fromEntries(formData.entries());
        info.type = "user";
        // console.log(info.profileImage);
        if (!info.profileImage) {
            info.profileImage = {
                originalname: "user-apeach.webp",
                name: "5HEAo-PF2.webp",
                path: "/files/00-ins/5HEAo-PF2.webp",
            };
        } else {
            const uploadForm = new FormData();
            uploadForm.append('attach', Object.fromEntries(formData.entries()).profileImage);
            const uploadResponse = await upload(uploadForm);
            info.profileImage = uploadResponse[0];
        }
        // console.log(info);

        let res = '';
        try {
            res = await signup(info);

            if (res.ok === 1) {
                console.log("Signup Sucess!!!");
                setIsWarning(false);
                navigator('/');
            } else {
                setIsWarning(true);
                setWarningMessage(res.message);
            }
        } catch (err) {
            console.error(err);
            setIsWarning(true);
            setWarningMessage(res.message);
        }
    }


    return (
    <main className="min-w-80 flex-grow flex items-center justify-center">
        <div className="p-8  border border-gray-200 rounded-lg w-full max-w-md dark:bg-gray-600 dark:border-0">
            <div className="text-center py-4">
                <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">회원 가입</h2>
            </div>

            <form onSubmit={onSubmit}>
                <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-200 mb-2" htmlFor="name">이름</label>
                <input
                    ref={setInputRef}
                    type="text"
                    id="name"
                    placeholder="이름을 입력하세요"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
                    name="name"
                    required
                />
                {/* 입력값 검증 에러 출력 */}
                { isWarning
                    ? (
                        <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">{warningMessage}</p>
                    ) : null
                }
                </div>
                <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-200 mb-2" htmlFor="email">이메일</label>
                <input
                    ref={setInputRef}
                    type="email"
                    id="email"
                    placeholder="이메일을 입력하세요"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
                    name="email"
                    required
                />
                {/* 입력값 검증 에러 출력 */}
                { isWarning
                    ? (
                        <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">{warningMessage}</p>
                    ) : null
                }
                </div>
                <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-200 mb-2" htmlFor="password">비밀번호</label>
                <input
                    ref={setInputRef}
                    type="password"
                    id="password"
                    placeholder="비밀번호를 입력하세요"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
                    name="password"
                    required
                />
                {/* 입력값 검증 에러 출력 */}
                { isWarning
                    ? (<p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">{warningMessage}</p>)
                    : null
                }
                </div>

                <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-200 mb-2" htmlFor="profileImage">프로필 이미지</label>
                <input
                    ref={setInputRef}
                    type="file"
                    id="profileImage"
                    accept="image/*"
                    placeholder="이미지를 선택하세요"
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
                    name="profileImage"
                />
                </div>

                <div className="mt-10 flex justify-center items-center">
                <Submit>회원가입</Submit>
                <Button type="reset" bgColor="gray" onClick={ () => history.back() }>취소</Button>
                </div>
            </form>
        </div>
    </main>
    );
}

export default Signup;