import Login from "@/components/Login";
import SignUp from "@/components/SignUpForm";

export default function Home() {
    return (
        <section className="bg-light h-full w-full center-content flex-col">
            <h1 className="w-1/3 border-2 text-center font-bold font-heading lg:text-7xl text-dark">
                Event Register
            </h1>
            <SignUp />
            <Login />
        </section>
    );
}
