
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '../common/logo';
import { Separator } from '../ui/separator';
import {
  Car,
  History,
  LayoutDashboard,
  LucideIcon,
  User,
  Send,
  Settings,
  Bell,
  Route,
  PlusCircle,
  Search,
  LogOut,
  PackageSearch,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { useAuth, useCollection, useUser, useFirestore, useMemoFirebase } from '@/firebase';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import { collection, query, where } from 'firebase/firestore';
import { Conversation, WithId } from '@/lib/mock-data';
import { useMemo } from 'react';

const baseMenuItems = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Ride History',
    href: '/ride-history',
    icon: History,
  },
  {
    label: 'Inbox',
    href: '/inbox',
    icon: Bell,
  },
];

const driverMenuItems = [
  {
    label: 'Plan Route',
    href: '/plan-route',
    icon: Route,
  },
];

const riderMenuItems = [
  {
    label: 'Find Ride',
    href: '/search',
    icon: Search,
  },
  {
    label: 'Find Delivery',
    href: '/find-delivery',
    icon: PackageSearch,
  },
  {
    label: 'Request Ride',
    href: '/request-ride',
    icon: PlusCircle,
  },
  {
    label: 'Request Delivery',
    href: '/request-delivery',
    icon: Send,
  },
];

type MenuItemProps = {
  href: string;
  label: string;
  icon: LucideIcon;
  pathname: string;
  badge?: number;
};

function MenuItem({ href, label, icon: Icon, pathname, badge }: MenuItemProps) {
  const isActive =
    pathname === href || (href !== '/dashboard' && pathname.startsWith(href));
  return (
    <li>
      <Link
        href={href}
        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 transition-colors hover:bg-gray-200/50 hover:text-primary ${
          isActive ? 'bg-gray-200/70 text-primary font-semibold' : 'font-medium'
        }`}
      >
        <Icon className="h-5 w-5" />
        <span>{label}</span>
        {badge && badge > 0 && (
          <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
            {badge}
          </Badge>
        )}
      </Link>
    </li>
  );
}

export function AppSidebar() {
  const pathname = usePathname();
  const { user } = useUser();
  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();

  const conversationsQuery = useMemoFirebase(() => {
    if (!user) return null;
    return query(collection(firestore, 'conversations'), where('participantIds', 'array-contains', user.uid));
  }, [user, firestore]);

  const { data: conversations } = useCollection<Conversation>(conversationsQuery);

  const unreadCount = useMemo(() => {
    if (!conversations || !user) return 0;
    return conversations.reduce((acc, conv) => {
      return acc + (conv.unreadCounts?.[user.uid] || 0);
    }, 0);
  }, [conversations, user]);

  const menuItems = useMemo(() => {
    return baseMenuItems.map(item => {
      if (item.href === '/inbox') {
        return { ...item, badge: unreadCount };
      }
      return item;
    });
  }, [unreadCount]);

  const handleLogout = () => {
    if (auth) {
      auth.signOut();
      router.push('/login');
    }
  };

  return (
    <div className="hidden md:block h-screen sticky top-0 overflow-y-auto w-64 border-r border-gray-100 bg-white flex-col">
      <div className="flex h-20 items-center border-b px-6 shrink-0">
        <Logo />
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="grid items-start px-4 text-sm font-medium">
          <ul className="space-y-1">
            {menuItems.map(item => (
              <MenuItem {...item} pathname={pathname} key={item.href} />
            ))}
          </ul>
          <Separator className="my-4" />
          <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Driver Mode
          </h3>
          <ul className="space-y-1">
            {driverMenuItems.map(item => (
              <MenuItem {...item} pathname={pathname} key={item.href} />
            ))}
          </ul>
          <Separator className="my-4" />
          <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Rider & Sender
          </h3>
          <ul className="space-y-1">
            {riderMenuItems.map(item => (
              <MenuItem {...item} pathname={pathname} key={item.href} />
            ))}
          </ul>
        </nav>
      </div>
      <div className="mt-auto border-t p-4 shrink-0">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex w-full items-center gap-3 rounded-md p-2 text-left hover:bg-gray-100">
            <Avatar className="h-10 w-10 border">
              <AvatarImage
                src={
                  user?.photoURL ||
                  'https://picsum.photos/seed/user-profile-2/100/100'
                }
                alt={user?.displayName || 'User'}
                data-ai-hint="person face"
              />
              <AvatarFallback>
                {user?.displayName?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 truncate">
              <p className="font-semibold text-sm">{user?.displayName || 'Guest'}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mb-2" side="top" align="start">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/profile">
                <User className="mr-2" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings">
                <Settings className="mr-2" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
