import { useEffect, useRef, useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import { FetchHandler } from "@/HelperFunctions/FetchHandler";
import AuthenticatedLayout from "../Layouts/AuthenticatedLayout.jsx";
import React from "react";

export default function Feed(props) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const init = async () => {
            const response = await FetchHandler("GET", "posts", "getUserPosts");
            setPosts(response);
        };
        init();
    }, []);

    return (
        <AuthenticatedLayout
            auth={props.auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="User Feed" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="p-6 text-gray-900 dark:text-gray-100">
                                User Posts
                            </div>
                            {posts.length > 0 &&
                                posts.map((post, index) => {
                                    post.created_at = new Date()
                                        .toISOString()
                                        .slice(0, 10);
                                    return (
                                        <div
                                            className="p-9 mb-4 bg-white dark:bg-gray-900 overflow-hidden shadow-sm sm:rounded-xl  "
                                            key={post?.updated_at}
                                        >
                                            <h2
                                                className="text-gray-100 dark:text-gray-200 text-xl"
                                                key={index}
                                            >
                                                {post.title}
                                            </h2>
                                            <p
                                                className="pt-6 text-indigo-300"
                                                key={post.key}
                                            >
                                                {post.body}
                                            </p>
                                            <p
                                                className="pt-6 text-indigo-300"
                                                key={post.key}
                                            >
                                                {post.created_at}
                                            </p>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </div>
            </div>
            <hr />
        </AuthenticatedLayout>
    );
}
