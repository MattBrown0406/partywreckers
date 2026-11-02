export declare const slugifyEpisodeTitle: (title?: string) => string;
export declare const assignEpisodeSlugs: (
  episodes: ReadonlyArray<{ id: string; title: string; pubDate: string }>,
) => Map<string, string>;
export declare const episodePath: (slug: string) => string;
