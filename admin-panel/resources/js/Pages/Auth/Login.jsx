import { useEffect, useState } from "react";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import { ethers, getDefaultProvider } from "ethers";
import { FetchHandler } from "@/HelperFunctions/FetchHandler";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        username: "",
    });
    const [web3Data, setWeb3Data] = useState("");

    useEffect(() => {
        return () => {
            reset("username");
        };
    }, []);

    const handleOnChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };
    const web3Login = async (username) => {
        let provider;
        let signer;

        if (window.ethereum === null) {
            alert("Please install MetaMask first.");

            const provider = ethers.getDefaultProvider();
        } else {
            provider = new ethers.BrowserProvider(window.ethereum);
            let response = await fetch("/web3-login-message");

            const message = await response.text();
            await provider.send("eth_requestAccounts", []);
            const address = await (await provider.getSigner()).getAddress();
            const signature = await (
                await provider.getSigner()
            ).signMessage(message);

            console.log(address);

            try {
                response = await fetch("/web3-login-verify", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        address: address,
                        signature: signature,
                        username: username,
                        _token: "{{ csrf_token() }}",
                    }),
                });

                const data = await response;
                if (data.status === 200) {
                    window.location.href = "/dashboard";
                }
            } catch (e) {
                console.log(e);
            }

            // setWeb3Data(data);
        }
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}
            <div>
                <PrimaryButton onClick={() => web3Login(data.username)}>
                    Login with Web3
                </PrimaryButton>
            </div>

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="username" value="Username" />

                    <TextInput
                        id="username"
                        name="username"
                        value={data.username}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={handleOnChange}
                    />

                    <InputError message={errors.username} className="mt-2" />
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            value={data.remember}
                            onChange={handleOnChange}
                        />
                        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                            Remember me
                        </span>
                    </label>
                </div>

                <div className="flex items-center justify-end mt-4">
                    {canResetPassword && (
                        <Link
                            href={route("password.request")}
                            className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                        >
                            Forgot your password?
                        </Link>
                    )}

                    <PrimaryButton className="ml-4" disabled={processing}>
                        Log in
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
