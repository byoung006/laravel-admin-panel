import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { FetchHandler } from "@/HelperFunctions/FetchHandler";

export default function AdminDashboard(props) {
    const [users, setUsers] = useState([]);
    console.log(users, "users");
    const getUsers = async () => {
        const users = await FetchHandler("POST", "/api/users", "getUsers");
        setUsers(users);
    };
    useEffect(() => {
        getUsers();
    }, []);

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Admin Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            You're logged in as admin!
                            <TableContainer component={Paper}>
                                <Table
                                    sx={{ minWidth: 650 }}
                                    aria-label="simple table"
                                >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>ID</TableCell>
                                            <TableCell align="right">
                                                Name
                                            </TableCell>
                                            <TableCell align="right">
                                                Email
                                            </TableCell>
                                            <TableCell align="right">
                                                Created At
                                            </TableCell>
                                            <TableCell align="right">
                                                Updated At
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {users.map((row) => {
                                            return (
                                                <TableRow
                                                    key={row.name}
                                                    sx={{
                                                        "&:last-child td, &:last-child th":
                                                            { border: 0 },
                                                    }}
                                                >
                                                    <TableCell
                                                        component="th"
                                                        scope="row"
                                                    >
                                                        {row.id}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {row.name}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {row.email}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {row.created_at}
                                                    </TableCell>
                                                    {/*<TableCell align="right">*/}
                                                    {/*    {row.updated_at}*/}
                                                    {/*</TableCell>*/}
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
