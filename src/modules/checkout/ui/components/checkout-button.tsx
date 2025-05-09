import { Button } from "@/components/ui/button";
import { useCart } from "../../hooks/use-cart";
import { cn, generateTenantUrl } from "@/lib/utils";
import Link from "next/link";
import { ShoppingCartIcon } from "lucide-react";

interface CheckoutButtonProps {
  className?: string;
  hideIfEmpty?: boolean;
  tenantSlug: string;
}

export const CheckoutButton = ({
  tenantSlug,
  className,
  hideIfEmpty,
}: CheckoutButtonProps) => {
  const { totalItems } = useCart(tenantSlug);

  return <Button variant={"elevated"} asChild className={cn("bg-white" , className)}>
    <Link href={`${generateTenantUrl(tenantSlug)}/checkout`}>
        <ShoppingCartIcon className=""/>{totalItems> 0  ? totalItems : ""}
    </Link>
  </Button>;
};
