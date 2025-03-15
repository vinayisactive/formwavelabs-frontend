"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import {
  ArrowUpRight,
  Bell,
  ChevronDown,
  Loader2,
  LogIn,
  User,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction, useState, useTransition } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TiTickOutline } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { useRouter } from "next/navigation";

const navItems = [
  { label: "Home", routeTo: "/" },
];

const NavItems = ({ isAuth }: { isAuth: boolean }) => {
  return (
    <div className="flex items-center gap-2">
      {navItems.map((item) => (
        <Link
          key={item.label}
          href={item.routeTo}
          className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors px-2 py-1 rounded-lg hover:bg-blue-50/50"
        >
          {item.label}
        </Link>
      ))}

      {isAuth && (
        <Link
          href={"/workspaces"}
          className=" hidden md:flex text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors px-2 py-1 rounded-lg hover:bg-blue-50/50"
        >
          Workspaces
        </Link>
      )}
    </div>
  );
};

const LogoutButton = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);

  const logoutHandler = async () => {
    try {
      setIsLoading(true);
      await signOut({ callbackUrl: "/", redirect: false });
      
      startTransition(() => {
        router.push("/");
        router.refresh(); 
      });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        logoutHandler();
      }}
      disabled={isLoading || isPending}
      className="w-full py-2 px-4 text-sm bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading || isPending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Logging out...
        </>
      ) : (
        <span>Logout</span>
      )}
    </button>
  );
};

const SignIn = () => {
  return (
    <Link
      href="/sign-in"
      className="flex items-center gap-2 px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:shadow-md hover:shadow-blue-100 transition-all"
    >
      <LogIn className="w-4 h-4" />
      <span>Login</span>
    </Link>
  );
};

const AccountDetails = () => {
  return (
    <button className="w-full pt-1 text-sm rounded-md text-gray-700 hover:text-black flex justify-center items-center">
      <span className="flex items-center gap-1 ">
        Account <ArrowUpRight size={15} />
      </span>
    </button>
  );
};

const WorkspacesBtn = () => {
  return (
    <Link  href="/workspaces" className="md:hidden w-full py-1 text-sm rounded-md text-gray-700 hover:text-black flex justify-center items-center">
      Workspaces
    </Link>
  );
};

const UserProfile = ({ name }: { name: string }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const userProfileToggle = () => {
    setIsOpen(!isOpen)
  };

  return (
    <div
      className="relative flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-xl cursor-pointer shadow-sm hover:bg-gray-50 transition-colors"
      onClick={userProfileToggle}
    >
      <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
        <User className="w-4 h-4 text-gray-600" />
      </div>
      <span className="text-sm font-medium text-gray-700">
        {name.length > 8 ? `${name.slice(0, 8)}...` : name}
      </span>
      <ChevronDown className="w-4 h-4 text-gray-600" />

      {isOpen && (
        <div className="w-[240px] absolute top-12 right-0 rounded-xl bg-white border border-gray-200 shadow-2xl z-50" 
        onClick={(e) => e.stopPropagation()}>
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900">Account</h3>
            <p className="text-xs text-gray-500 mt-1">Manage your profile</p>
          </div>
          
          <div className="flex flex-col p-2">
            <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <AccountDetails />
            </div>
            <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <WorkspacesBtn />
            </div>
            <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors text-red-600 hover:text-red-700">
              <LogoutButton />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


const Notification = ({setIsOpen, isOpen}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>; 
  isOpen: boolean
}) => {
  const currentUserData = useSession().data;
  const queryClient = useQueryClient();

  const [processingToken, setProcessingToken] = useState<string | null>(null);

  const userNotificationToggle = () => {
    setIsOpen(!isOpen);
  };

  const {data, isLoading} = useQuery({
    queryKey: ["invite"],
    queryFn: async() => {
        const res = await fetch(`https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/users/invitations`, {
          headers: {
            Authorization: `Bearer ${currentUserData?.accessToken}`
          }
        }); 

        if(!res.ok){
          throw new Error("Failed to fetch user invitations.")
        }

        const data = await res.json(); 
        return data; 
    },
    refetchOnWindowFocus: true
  });

  const inviteAcceptMutation = useMutation({
    mutationFn: async(token: string) => {
      setProcessingToken(token)
      const res = await fetch(`https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/users/accept-invite`, {
        method: "POST",
        body: JSON.stringify({token}),
        headers: {
          Authorization: `Bearer ${currentUserData?.accessToken}`
        }
      }); 

      if(!res.ok){
        throw new Error("Failed to accept invite.")
      }; 

      const data = await res.json(); 
      console.log(data);
    }, 
    onSuccess: () => queryClient.invalidateQueries({queryKey: ['invite']}),
    onError:(err) => console.error(err)
  }); 

  const inviteRejectMutation = useMutation({
    mutationFn: async(token: string) => {
      setProcessingToken(token)
      const res = await fetch(`https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/users/reject-invite`, {
        method: "PATCH",
        body: JSON.stringify({token}),
        headers: {
          Authorization: `Bearer ${currentUserData?.accessToken}`
        }
      }); 

      if(!res.ok){
        throw new Error("Failed to accept invite.")
      }; 

      const data = await res.json(); 
      console.log(data);
    }, 
    onSuccess: () => queryClient.invalidateQueries({queryKey: ['invite']}),
    onError:(err) => console.error(err)
  })


  return (
    <div
      className="relative flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-xl cursor-pointer shadow-sm hover:bg-gray-50 transition-colors"
      onClick={userNotificationToggle}
    >
      <div className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center">
        <Bell className="w-4 h-4 text-gray-600" />
      </div>
      <ChevronDown className="w-4 h-4 text-gray-600" />

      {isOpen && (
        <div className="min-w-[320px] h-[360px] absolute top-12 right-0 rounded-xl flex flex-col gap-2 border border-gray-200 bg-white shadow-2xl z-50">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Invitations</h3>
            <p className="text-sm text-gray-500 mt-1">
              Manage your workspace invitations
            </p>
          </div>
          
          {isLoading ? (
            <div className="w-full h-full flex justify-center items-center">
              <Loader2 className="animate-spin text-gray-400 h-6 w-6" />
            </div>
          ) : (
            <div className="flex-1 flex flex-col p-2 overflow-y-auto">
              {data?.data?.map((invite: {
                id: string,
                workspace: {
                  name: string
                },
                role: 'EDITOR' | 'OWNER' | 'VIEWER' | 'ADMIN',
                token: string
              }) => (
                <div 
                  key={invite.id} 
                  className="group flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {invite.workspace.name}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Role: {invite.role.toLowerCase()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ml-2">
                    <button className="p-1.5 hover:bg-green-100 rounded-md text-green-600 hover:text-green-700 transition-colors flex justify-center items-center gap-2">
                      <TiTickOutline className="w-5 h-5" onClick={(e) => {
                        e.stopPropagation()
                        inviteAcceptMutation.mutate(invite.token)
                        }} />

                        {inviteAcceptMutation.isPending && processingToken === invite.token && <Loader2 className="animate-spin" size={15}  />}
                    </button>
                    <button className="p-1.5 hover:bg-red-100 rounded-md text-red-600 hover:text-red-700 transition-colors flex justify-center items-center gap-2">
                      <RxCross2 className="w-5 h-5" onClick={(e) => {
                        e.stopPropagation()
                        inviteRejectMutation.mutate(invite.token);
                      }} />

                      {inviteRejectMutation.isPending && processingToken === invite.token && <Loader2 className="animate-spin" size={15}  />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};



const Navbar = () => {
  const { data: session, status } = useSession();
  const isAuth = status === "authenticated";
  const name = session?.user?.name || null;

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <nav className="w-full h-[6vh] flex items-center justify-between px-4">
      <Link href="/" className="flex items-center gap-2">
        <span className="text-xl font-bold text-black/50 hidden md:flex">Formwavelabs</span>
        <span className="text-xl font-bold text-black/50 flex md:hidden">FWLabs</span>
      </Link>

      <div className="flex items-center gap-4">
        <NavItems isAuth={isAuth} />

        {isAuth && name ? (
          <div className="flex items-center gap-2">
            <UserProfile name={name} />
            <Notification  setIsOpen={setIsOpen} isOpen={isOpen}/>
          </div>
        ) : (
          <SignIn />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
