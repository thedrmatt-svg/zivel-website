import { SignIn } from "@clerk/nextjs";

export default function EditorSignIn() {
  return <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-5 py-12">
    <h1 className="font-serif text-3xl text-white">Zivel Blog Editor</h1>
    <p className="max-w-sm text-center text-sm text-white/60">Sign in with your approved editor email. Other accounts cannot view or edit drafts.</p>
    <SignIn routing="path" path="/admin/sign-in" />
  </main>;
}
