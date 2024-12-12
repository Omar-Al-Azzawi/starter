'use client'

import { Button } from "@/components/ui/button";
import { signOutAction } from "./action";

const SignOut = () => {

    return (
        <form action={signOutAction}>
            <Button type='submit'>Sign Out</Button>
        </form>
    )
}

export default SignOut; 