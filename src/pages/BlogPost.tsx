import { useParams } from "react-router-dom";
import { lazy, Suspense, type ComponentType } from "react";
import { findArticleBySlug } from "@/data/blogData";
import NotFound from "./NotFound";

// SSR must render complete articles synchronously; browsers load only the selected article.
const serverModules = import.meta.env.SSR
  ? import.meta.glob("./blog/*.tsx", { eager: true }) as Record<string, { default: ComponentType }>
  : {};
const clientModules = import.meta.env.SSR ? {} : import.meta.glob<{ default: ComponentType }>("./blog/*.tsx");
const lazyModules = Object.fromEntries(
  Object.entries(clientModules).map(([key, load]) => [key, lazy(load)]),
);

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  if (!slug || !findArticleBySlug(slug)) return <NotFound />;
  const key = `./blog/${slug}.tsx`;
  const Component = import.meta.env.SSR ? serverModules[key]?.default : lazyModules[key];
  if (!Component) return <NotFound />;
  return <Suspense fallback={<main className="container pt-24" aria-busy="true">Loading article…</main>}><Component /></Suspense>;
};

export default BlogPost;
