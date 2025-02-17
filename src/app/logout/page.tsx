'use client'
import { useRouter } from 'next/navigation';
import {useEffect, useState} from "react";
// import {useAuthContext, userSignOut} from "@/context/AuthContext";

function Page(): JSX.Element {
    // const { user } = useAuthContext() as { user: any }; // Use 'as' to assert the type as { user: any }
    const router = useRouter();

    useEffect(() => {
            router.push("/");
    }, [router]);

    return (
       <>
       </>
    );
}

export default Page;
