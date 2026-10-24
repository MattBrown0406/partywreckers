import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent } from "@/components/ui/card";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { blogArticles } from "@/data/blogData";
import NewsletterSignup from "@/components/NewsletterSignup";
import BlogConversionPanel from "@/components/BlogConversionPanel";
import SourcePageLinks from "@/components/SourcePageLinks";

const BlogIndex = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Blog — Addiction, Families & Recovery | Party Wreckers"
        description="Articles on addiction, intervention, family recovery, and the stories behind the podcast. Written by Matt Brown, professional interventionist."
        canonical="/blog"
        keywords="addiction blog, family support, enabling vs helping, boundaries, recovery resources, intervention"
      />
      
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" }
        ]}
      />

      <Navbar />
      
      <main className="container px-4 pt-24 sm:pt-32 pb-12 sm:pb-16">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="font-script text-3xl sm:text-4xl md:text-5xl text-primary mb-4">
            Blog
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Practical insights on addiction, family dynamics, and recovery. 
            Real advice for real families navigating complex challenges.
          </p>
        </div>

        <div className="mb-12">
          <SourcePageLinks
            compact
            sponsor={false}
            title="Start with the source guides"
            description="Looking for a starting point? Explore these guides to family support, intervention readiness, and recovery resources."
          />
        </div>
        
        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto mb-12">
          {blogArticles.map((article) => (
            <Link 
              key={article.id}
              to={`/blog/${article.id}`}
              className="group block h-full"
            >
              <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02]">
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
                <CardContent className="p-4 sm:p-6 flex-1 flex flex-col">
                  <div className="flex-1">
                    <p className="text-xs sm:text-sm text-muted-foreground mb-2">{article.date}</p>
                    <h2 className="font-semibold text-base sm:text-lg text-foreground mb-2 sm:mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-200">
                      {article.title}
                    </h2>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center text-primary text-sm font-medium">
                    Read More 
                    <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="max-w-5xl mx-auto mb-12">
          <BlogConversionPanel
            eyebrow="Read enough to know this is serious?"
            title="Use the blog for education, then move to the page built for action."
            description="If one of these articles sounds uncomfortably familiar, do not just keep reading in circles. Use Help Now for triage or Next Step for direction."
          />
        </div>

        {/* Newsletter Signup */}
        <div className="max-w-2xl mx-auto">
          <NewsletterSignup />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogIndex;
