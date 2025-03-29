'use client';

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import AuthHeader from "./AuthHeader";
import AuthFooter from "./AuthFooter";
import StaticCard from "./StaticCard";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import { useRouter } from "next/navigation";


const AuthPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const viewParam = searchParams.get("view");
  const [view, setView] = useState<"login" | "signup">("login");

  useEffect(() => {
    if (viewParam === "signup" || viewParam === "login") {
      setView(viewParam);
    }
  }, [viewParam]);

  const handleToggle = (view: "login" | "signup") => {
    router.replace(`/auth?view=${view}`);
    setView(view);
  };

  return (
    <div className="flex items-center bg-c-white-150">
      <StaticCard />

      <div className="w-1/2 flex flex-col items-center justify-center p-8">
        <AuthHeader current={view} onChange={handleToggle} />
        {view === "login" && <LoginForm />}
        {view === "signup" && <SignUpForm />}
        <AuthFooter />
      </div>
    </div>
  );
};

export default AuthPage;
