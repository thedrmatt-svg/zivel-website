import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import { isBlogEditor } from "@/lib/blog-editor-auth";
import LocalBlogEditor from "@/components/blog/LocalBlogEditor";

export default async function BlogEditorPage() {
  const user = await currentUser();
  if (!user) return <main className="mx-auto max-w-xl px-6 py-24">
    <p className="zv-tagline">Private editor</p>
    <h1 className="mt-5 font-serif text-4xl">Zivel Blog Editor</h1>
    <p className="mt-5 text-white/65">Create and edit individually written local versions of main blog posts. Sign in with your approved editor email to continue.</p>
    <Link href="/admin/sign-in" className="zv-btn-luxury zv-btn-gold mt-8">Sign in</Link>
    <Link href="/" className="ml-5 text-sm underline">Return to Zivel</Link>
  </main>;
  if (!await isBlogEditor()) return <main className="mx-auto max-w-xl px-6 py-24">
    <h1 className="font-serif text-3xl">Editor access required</h1>
    <p className="mt-5 text-white/65">This account does not have a verified, approved editor email.</p>
    <div className="mt-6"><UserButton /></div>
  </main>;
  return <><div className="absolute right-6 top-6 z-20"><UserButton /></div><LocalBlogEditor /></>;
}
