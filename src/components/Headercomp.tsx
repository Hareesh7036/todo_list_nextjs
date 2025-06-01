import FontAwesomeIconWrapper from "@/lib/utilities/font-awsom-wrapper";
import { ThemeToggle } from "@/lib/utilities/theme-toggle";
import {
  faFeather,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import React from "react";

const Headercomp = () => {
  const router = useRouter();

  async function handleLogout() {
    try {
      const res = await fetch("/api/authentication/logout", {
        method: "POST",
      });

      if (res.ok) {
        // Optionally show a toast or success message
        router.push("/auth/login");
      } else {
        const data = await res.json();
        console.error("Logout failed:", data.error);
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  }

  return (
    <div className=" fixed w-full flex items-center justify-center h-[80px] shadow-md shadow-green-600 z-[1000] bg-background">
      <div className="flex items-end gap-3">
        <div className=" font-bold text-[25px]">TodoNest</div>
        <FontAwesomeIconWrapper
          icon={faFeather}
          style={{ height: "40px" }}
          color="green"
        />
      </div>
      <div className="float-right flex gap-2 px-3 absolute right-0">
        <span title="Logout">
          <FontAwesomeIconWrapper
            className="p-2 border rounded bg-gray-200 dark:bg-gray-800 cursor-pointer"
            icon={faRightFromBracket}
            onClick={handleLogout}
          />
        </span>
        {process.env.NODE_ENV === "development" && (
          <div title="Theme change">
            <ThemeToggle />
          </div>
        )}
      </div>
    </div>
  );
};

export default Headercomp;
