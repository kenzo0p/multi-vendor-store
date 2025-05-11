import Link from "next/link"
import { Button } from "./ui/button"

export const StripeVerify = () => {
    return (
        <Link href="/stripe-verify">
            <Button>
                Verify Account
            </Button>
        </Link>
    )
}
