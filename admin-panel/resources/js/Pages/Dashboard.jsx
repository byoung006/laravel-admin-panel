import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { useRef, useState, useEffect } from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import { FetchHandler } from "@/HelperFunctions/FetchHandler";

export default function Dashboard(props) {
    const [posts, setPosts] = useState([]);
    const titleInput = useRef();
    const bodyInput = useRef();
    const { data, setData, errors, post, reset, processing, wasSuccessful } =
        useForm({
            post_title: "",
            post_body: "",
        });
    useEffect(() => {
        const init = async () => {
            const response = await FetchHandler("GET", "posts", "getUserPosts");
            setPosts(response.posts);
        };
        init();
    }, [wasSuccessful]);
    console.log(data, "the data");
    console.log(posts, "the posts");

    const submit = (e) => {
        e.preventDefault();
        console.log("submitting");

        post(route("posts.create", data));
        wasSuccessful && reset("post_body", "post_title");
    };
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="User Dashboard" />
            <form onSubmit={submit}>
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900 dark:text-gray-100">
                                Create New Post
                            </div>
                            <InputLabel className={"pl-6"}>
                                Post Title
                            </InputLabel>
                            <TextInput
                                ref={titleInput}
                                id="new_post_title"
                                value={data.post_title}
                                onChange={(e) =>
                                    setData("post_title", e.target.value)
                                }
                                type="text"
                                className="p-8 w-full "
                                autoComplete="post_title"
                            />
                            <InputLabel className={"pl-6"}>
                                Post Content
                            </InputLabel>
                            <TextInput
                                ref={bodyInput}
                                isMultiline={true}
                                id="new_post_body"
                                value={data.post_body}
                                onChange={(e) =>
                                    setData("post_body", e.target.value)
                                }
                                type="text"
                                className="mt-2 block w-full"
                                autoComplete="post_body"
                            />
                            <div className={"p-6"}>
                                <PrimaryButton>Submit Post</PrimaryButton>
                            </div>{" "}
                        </div>
                    </div>
                </div>
            </form>
            <hr />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="p-6 text-gray-900 dark:text-gray-100">
                                User Posts
                            </div>
                            {posts.map((post, index) => {
                                post.created_at = new Date()
                                    .toISOString()
                                    .slice(0, 10);
                                return (
                                    <div
                                        className="p-9 mb-4 bg-white dark:bg-gray-900 overflow-hidden shadow-sm sm:rounded-xl  "
                                        key={post.updated_at}
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
                            })}{" "}
                        </div>
                    </div>
                </div>
            </div>
            <hr />
        </AuthenticatedLayout>
    );
}
