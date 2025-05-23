import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function generateTenantUrl(tenantSlug: string) {

  //subdomain part 
  const isDevelopment = process.env.NODE_ENV === "development";
  const isSubdomainRoutingEnables = Boolean(process.env.NEXT_PUBLIC_ENABLE_SUBDOMAIN_ROUTING!)
  
  //development or subdomain disables routing
  if (isDevelopment || !isSubdomainRoutingEnables) {
    return `${process.env.NEXT_PUBLIC_APP_URL}/tenants/${tenantSlug}`;
  }

  const protocol = "https";
  const domain = process.env.NEXT_PUBLIC_ROOT_DOMAIN!;
  
  //production
  return `${protocol}://${tenantSlug}.${domain}`;

  //https://om.neurogum.com
}

export function formatCurrency(value: number | string) {
  return new Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number(value));
}
