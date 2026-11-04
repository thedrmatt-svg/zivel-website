import { SignUp } from "@clerk/nextjs";

export default function EditorSignUp() {
  return <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-5 py-12">
    <h1 className="font-serif text-3xl text-white">Create your editor account</h1>
    <p className="max-w-sm text-center text-sm text-white/60">Use your approved email and complete verification. Creating an account does not grant editor access.</p>
    <SignUp routing="path" path="/admin/sign-up" />
  </main>;
}
