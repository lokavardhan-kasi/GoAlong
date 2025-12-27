
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '../common/logo';
import { Separator } from '../ui/separator';
import { Car, History, LayoutDashboard, LucideIcon, User, Send, Settings, Bell, Route, PlusCircle, Search } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { useUser } from '@/firebase';

const menuItems = [
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        label: "Ride History",
        href: "/ride-history",
        icon: History,
    },
    {
        label: "Inbox",
        href: "/inbox",
        icon: Bell,
        badge: 3,
    },
    {
        label: "Profile",
        href: "/profile",
        icon: User,
    },
    {
        label: "Settings",
        href: "/settings",
        icon: Settings
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
        href: "/search",
        icon: Search,
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
    badge?: number;
}

function MenuItem({ href, label, icon: Icon, pathname, badge }: MenuItemProps) {
    const isActive = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
    return (
        <li>
            <Link 
                href={href} 
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 transition-colors hover:bg-gray-200/50 hover:text-primary ${isActive ? "bg-gray-200/70 text-primary font-semibold" : "font-medium"}`}
            >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
                {badge && <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">{badge}</Badge>}
            </Link>
        </li>
    )
}

export function AppSidebar() {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <div className="hidden border-r bg-white md:block w-64">
        <div className="flex h-full max-h-screen flex-col">
            <div className="flex h-20 items-center border-b px-6">
                <Logo />
            </div>
            <div className="flex-1 overflow-auto py-4">
                <nav className="grid items-start px-4 text-sm font-medium">
                    <ul className="space-y-1">
                        {menuItems.map(item => <MenuItem {...item} pathname={pathname} key={item.href} />)}
                    </ul>
                    <Separator className="my-4" />
                    <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Driver Mode</h3>
                     <ul className="space-y-1">
                        {driverMenuItems.map(item => <MenuItem {...item} pathname={pathname} key={item.href} />)}
                    </ul>
                     <Separator className="my-4" />
                    <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Rider & Sender</h3>
                     <ul className="space-y-1">
                        {riderMenuItems.map(item => <MenuItem {...item} pathname={pathname} key={item.href} />)}
                    </ul>
                </nav>
            </div>
            <div className="mt-auto border-t p-4">
                <div className="flex items-center gap-3">
                     <Avatar className="h-10 w-10 border">
                        <AvatarImage src={user?.photoURL || "https://picsum.photos/seed/user-profile-2/100/100"} alt={user?.displayName || 'User'} data-ai-hint="person face"/>
                        <AvatarFallback>{user?.displayName?.charAt(0) || 'U'}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold text-sm">{user?.displayName || 'Guest'}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
