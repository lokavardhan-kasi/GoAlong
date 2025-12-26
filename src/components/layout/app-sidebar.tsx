'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Logo } from '../common/logo';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { Car, History, LayoutDashboard, LucideIcon, Package, PlusCircle, Route, User, Send } from 'lucide-react';

const menuItems = [
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        label: "Profile",
        href: "/profile",
        icon: User,
    },
    {
        label: "Ride History",
        href: "/ride-history",
        icon: History,
    }
]

const driverMenuItems = [
    {
        label: "Plan Route",
        href: "/plan-route",
        icon: Route,
    }
]

const riderMenuItems = [
    {
        label: "Find Ride",
        href: "/find-ride",
        icon: Car,
    },
    {
        label: "Request Ride",
        href: "/request-ride",
        icon: PlusCircle,
    },
    {
        label: "Request Delivery",
        href: "/request-delivery",
        icon: Send,
    }
]

type MenuItemProps = {
    href: string;
    label: string;
    icon: LucideIcon;
    pathname: string;
}

function MenuItem({ href, label, icon: Icon, pathname }: MenuItemProps) {
    const isActive = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
    return (
        <SidebarMenuItem>
            <SidebarMenuButton
                asChild
                isActive={isActive}
                tooltip={{ children: label, side: 'right' }}
            >
                <Link href={href}>
                    <Icon />
                    <span>{label}</span>
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    )
}

export function AppSidebar() {
  const pathname = usePathname();
  const isDeliveryMode = pathname.includes('delivery');

  return (
    <Sidebar>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      
        <SidebarMenu className="flex-1 p-2">
            {menuItems.map(item => <MenuItem {...item} pathname={pathname} key={item.href} />)}

            <SidebarGroup className="p-0 mt-4">
                <SidebarGroupLabel>Driver</SidebarGroupLabel>
                {driverMenuItems.map(item => <MenuItem {...item} pathname={pathname} key={item.href} />)}
            </SidebarGroup>

            <SidebarGroup className="p-0 mt-4">
                <SidebarGroupLabel>Rider & Sender</SidebarGroupLabel>
                {riderMenuItems.map(item => <MenuItem {...item} pathname={pathname} key={item.href} />)}
            </SidebarGroup>

        </SidebarMenu>
      <Separator className="my-2" />
      <SidebarFooter>
        <Button variant="ghost" asChild>
            <Link href={isDeliveryMode ? "/find-ride" : "/request-delivery"}>
                {isDeliveryMode ? <Car className="mr-2" /> : <Package className="mr-2" />}
                <span>{isDeliveryMode ? "Switch to Ride" : "Switch to Delivery"}</span>
            </Link>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
