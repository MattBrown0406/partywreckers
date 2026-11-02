import { createContext, useContext } from "react";

export interface ArticleContextValue {
  slug: string;
  title: string;
}

/** Set by BlogPost around every article, so shared components know which article they're in. */
export const ArticleContext = createContext<ArticleContextValue | null>(null);

export const useCurrentArticle = () => useContext(ArticleContext);
