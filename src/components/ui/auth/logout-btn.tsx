"use client"
import { useRouter } from "next/navigation";

const LogoutButton = () => {
    const router = useRouter(); 

    const handleLogout = async () => {
        try {
            const response = await fetch('https://formwavelabs-backend.alfreed-ashwry.workers.dev/api/v1/auth/logout', {
                method: 'POST',
                credentials: 'include', 
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            if (data?.status === "success") {
                router.push("/");
                setTimeout(() => window.location.reload(), 500);
            }
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <button
            onClick={handleLogout}
            className="border px-3 py-1 flex justify-center items-center"
        >
            Logout
        </button>
    );
};

export default LogoutButton;
