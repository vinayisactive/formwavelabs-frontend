"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import {
  ChevronDown,
  Loader2,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { MdArrowOutward } from "react-icons/md";


const NAV_ITEMS = [{ label: "Home", routeTo: "/" }];
const NAME_MAX_LENGTH = 8;

const truncateName = (name: string) => name.length > NAME_MAX_LENGTH ? `${name.slice(0, NAME_MAX_LENGTH)}...` : name;

const NavItems = ({ isAuthenticated }: { isAuthenticated: boolean }) => (
  <div className="flex items-center gap-2">
    {NAV_ITEMS.map((item) => (
      <Link
        key={item.label}
        href={item.routeTo}
        className="text-sm font-medium text-black hover:text-blue-600 transition-colors px-2 py-1 rounded-lg hover:bg-blue-50/50"
      >
        {item.label}
      </Link>
    ))}

    {isAuthenticated && (
      <Link
        href="/workspaces"
        className="hidden md:flex text-sm font-medium text-black hover:text-blue-600 transition-colors px-2 py-1 rounded-lg hover:bg-blue-50/50"
      >
        Workspaces
      </Link>
    )}
  </div>
);


const SignInButton = () => (
  <Link
    href="/sign-in"
    className="flex items-center gap-1 text-black text-sm font-bold hover:text-blue-500"
    aria-label="Sign in"
  >
    <span>Sign-In</span>
    <MdArrowOutward />
  </Link>
);

const LogoutButton = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
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
      onClick={handleLogout}
      disabled={isLoading || isPending}
      className="w-full py-2 px-4 text-sm bg-black text-white rounded-md transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      aria-label="Log out"
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

const UserProfile = ({ name, isOpen, onToggle }: { name: string; isOpen: boolean, onToggle: () => void}) => (
  <div
    className="relative flex items-center gap-2 bg-white cursor-pointer px-2 py-1 group"
    onClick={onToggle}
    role="button"
    aria-expanded={isOpen}
  >
    <span className="text-sm font-bold text-black group-hover:text-gray-500">
      {truncateName(name)}
    </span>
    <ChevronDown className="w-4 h-4 text-black" />

    {isOpen && (
      <div
        className="w-[240px] absolute top-12 right-0 rounded-xl bg-white border border-gray-200 shadow-2xl z-50 p-3 flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <h3 className="text-sm font-semibold text-gray-900">{name}</h3>
          <p className="text-xs text-gray-500 mt-1">
            Hope we get to see you again!
          </p>
        </div>
        <LogoutButton />
      </div>
    )}
  </div>
);

const Navbar = () => {
  const { data: session, status } = useSession();
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);
  const isAuthenticated = status === "authenticated";

  return (
    <nav className="w-full min-h-[50px] h-[6vh] flex items-center justify-between px-8">
      <Link 
        href="/" 
        className="flex items-center gap-2"
        aria-label="Home"
      >

      </Link>

      <div className="flex items-center gap-2">
        <NavItems isAuthenticated={isAuthenticated} />

        {isAuthenticated && session?.user?.name ? (
          <UserProfile
            name={session.user.name}
            isOpen={isUserProfileOpen}
            onToggle={() => setIsUserProfileOpen(!isUserProfileOpen)}
          />
        ) : (
          <SignInButton />
        )}
      </div>
    </nav>
  );
};

export default Navbar;














































// const Notification = ({setIsOpen, isOpen}: {
//   setIsOpen: () => void;
//   isOpen: boolean
// }) => {
//   const currentUserData = useSession().data;
//   const queryClient = useQueryClient();

//   const [processingToken, setProcessingToken] = useState<string | null>(null);

//   const userNotificationToggle = () => {
//     setIsOpen()
//   };

//   const {data, isLoading} = useQuery({
//     queryKey: ["invite"],
//     queryFn: async() => {
//         const res = await fetch(`https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/users/invitations`, {
//           headers: {
//             Authorization: `Bearer ${currentUserData?.accessToken}`
//           }
//         });

//         if(!res.ok){
//           throw new Error("Failed to fetch user invitations.")
//         }

//         const data = await res.json();
//         return data;
//     },
//     refetchOnWindowFocus: true
//   });

//   const inviteAcceptMutation = useMutation({
//     mutationFn: async(token: string) => {
//       setProcessingToken(token)
//       const res = await fetch(`https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/users/accept-invite`, {
//         method: "POST",
//         body: JSON.stringify({token}),
//         headers: {
//           Authorization: `Bearer ${currentUserData?.accessToken}`
//         }
//       });

//       if(!res.ok){
//         throw new Error("Failed to accept invite.")
//       };

//       const data = await res.json();
//       console.log(data);
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({queryKey: ['invite']})
//       queryClient.invalidateQueries({queryKey: ['workspaces']})
//     },
//     onError:(err) => console.error(err)
//   });

//   const inviteRejectMutation = useMutation({
//     mutationFn: async(token: string) => {
//       setProcessingToken(token)
//       const res = await fetch(`https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/users/reject-invite`, {
//         method: "PATCH",
//         body: JSON.stringify({token}),
//         headers: {
//           Authorization: `Bearer ${currentUserData?.accessToken}`
//         }
//       });

//       if(!res.ok){
//         throw new Error("Failed to accept invite.")
//       };

//       const data = await res.json();
//       console.log(data);
//     },
//     onSuccess: () => queryClient.invalidateQueries({queryKey: ['invite']}),
//     onError:(err) => console.error(err)
//   })

//   return (
//     <div
//       className="relative flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-xl cursor-pointer shadow-sm hover:bg-gray-50 transition-colors"
//       onClick={userNotificationToggle}
//     >
//       <div className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center">
//         <Bell className="w-4 h-4 text-gray-600" />
//       </div>
//       <ChevronDown className="w-4 h-4 text-gray-600" />

//       {isOpen && (
//         <div className="min-w-[320px] h-[360px] absolute top-12 right-0 rounded-xl flex flex-col gap-2 border border-gray-200 bg-white shadow-2xl z-50">
//           <div className="p-4 border-b border-gray-200">
//             <h3 className="text-lg font-semibold text-gray-900">Invitations</h3>
//             <p className="text-sm text-gray-500 mt-1">
//               Manage your workspace invitations
//             </p>
//           </div>

//           {isLoading ? (
//             <div className="w-full h-full flex justify-center items-center">
//               <Loader2 className="animate-spin text-gray-400 h-6 w-6" />
//             </div>
//           ) : (
//             <div className="flex-1 flex flex-col p-2 overflow-y-auto">
//               {data?.data?.map((invite: {
//                 id: string,
//                 workspace: {
//                   name: string
//                 },
//                 role: 'EDITOR' | 'OWNER' | 'VIEWER' | 'ADMIN',
//                 token: string
//               }) => (
//                 <div
//                   key={invite.id}
//                   className="group flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
//                 >
//                   <div className="flex-1 min-w-0">
//                     <p className="text-sm font-medium text-gray-900 truncate">
//                       {invite.workspace.name}
//                     </p>
//                     <p className="text-sm text-gray-500 mt-1">
//                       Role: {invite.role.toLowerCase()}
//                     </p>
//                   </div>
//                   <div className="flex items-center gap-2 ml-2">
//                     <button className="p-1.5 hover:bg-green-100 rounded-md text-green-600 hover:text-green-700 transition-colors flex justify-center items-center gap-2">
//                       <TiTickOutline className="w-5 h-5" onClick={(e) => {
//                         e.stopPropagation()
//                         inviteAcceptMutation.mutate(invite.token)
//                         }} />

//                         {inviteAcceptMutation.isPending && processingToken === invite.token && <Loader2 className="animate-spin" size={15}  />}
//                     </button>
//                     <button className="p-1.5 hover:bg-red-100 rounded-md text-red-600 hover:text-red-700 transition-colors flex justify-center items-center gap-2">
//                       <RxCross2 className="w-5 h-5" onClick={(e) => {
//                         e.stopPropagation()
//                         inviteRejectMutation.mutate(invite.token);
//                       }} />

//                       {inviteRejectMutation.isPending && processingToken === invite.token && <Loader2 className="animate-spin" size={15}  />}
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };