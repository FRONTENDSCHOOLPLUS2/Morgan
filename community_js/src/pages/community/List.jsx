import { useNavigate } from "react-router-dom";
import Button from "@components/Button";
import Pagination from "@components/Pagination";
import Search from "@components/Search";
import ListItem from "./ListItem";
import useProfileStore from "@zustand/useProfile";
import { useState, useEffect } from "react";
import { getPost } from "@api/post";

function List() {
    const { profile } = useProfileStore();
    // console.log(profile);
    const navigate = useNavigate();
    const [isWaring, setIsWarning] = useState(false);
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const onGoNewPost = () => {
        if ('token' in profile) {
            navigate('/info/new');
        } else {
            setIsWarning(true);
        }
    }

    const fetchPost = async () => {
        try {
            const res = await getPost();
            const items = res.item;
            return items;
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        (async () => {
            const items = await fetchPost();
            setPosts([...items]);
            setIsLoading(false);
        })();
    }, []);

    // console.log(posts);

    return (
    <main className="min-w-80 p-10">
        <div className="text-center py-4">
        <h2 className="pb-4 text-2xl font-bold text-gray-700 dark:text-gray-200">정보 공유</h2>
        </div>
        <div className="flex justify-end mr-4">
        <Search />
        <Button onClick={onGoNewPost}>글작성</Button>
        </div>
        <section className="pt-10">
        <table className="border-collapse w-full table-fixed">
            <colgroup>
            <col className="w-[10%] sm:w-[10%]" />
            <col className="w-[60%] sm:w-[30%]" />
            <col className="w-[30%] sm:w-[15%]" />
            <col className="w-0 sm:w-[10%]" />
            <col className="w-0 sm:w-[10%]" />
            <col className="w-0 sm:w-[25%]" />
            </colgroup>
            <thead>
            <tr className="border-b border-solid border-gray-600">
                <th className="p-2 whitespace-nowrap font-semibold">번호</th>
                <th className="p-2 whitespace-nowrap font-semibold">제목</th>
                <th className="p-2 whitespace-nowrap font-semibold">글쓴이</th>
                <th className="p-2 whitespace-nowrap font-semibold hidden sm:table-cell">조회수</th>
                <th className="p-2 whitespace-nowrap font-semibold hidden sm:table-cell">댓글수</th>
                <th className="p-2 whitespace-nowrap font-semibold hidden sm:table-cell">작성일</th>
            </tr>
            </thead>
            <tbody>
            { isLoading // 로딩 상태 표시
                ? (
                    <tr>
                        <td colSpan="6" className="py-20 text-center">로딩중...</td>
                    </tr>
                ) : isWaring // 에러 메시지 출력
                ? (
                    <tr>
                        <td colSpan="6" className="py-20 font-bold text-center text-red-700">😅 로그인을 깜빡하셨어요 😳</td>
                    </tr>
                ) : posts.map((post, index) => 
                        <ListItem 
                            key={post._id}
                            index={index}
                            post={post}
                        />
                    )
            }

            </tbody>
        </table>
        <hr />
        
        <Pagination />

        </section>
    </main>
    );
}

export default List;