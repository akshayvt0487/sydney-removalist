"use client";

import Link from 'next/link';
import QuoteModal from '@/components/QuoteModal';
import { BlogContent, BlogPost } from '@/data/blogs';
// Recharts requires "use client", which is why we isolated this component
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-AU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export default function BlogPostContent({ post }: { post: BlogPost }) {
  const renderContent = (block: BlogContent, index: number) => {
    switch (block.type) {
      case 'paragraph':
        return (
          <p key={index} className="text-lg text-muted-foreground leading-relaxed mb-6">
            {block.content}
          </p>
        );
      case 'heading':
        return (
          <h2 key={index} className="text-2xl md:text-3xl font-bold text-foreground mt-10 mb-4">
            {block.content}
          </h2>
        );
      case 'list':
        return (
          <ul key={index} className="space-y-3 mb-6 ml-4">
            {block.items?.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <svg className="w-6 h-6 text-secondary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        );
      case 'quote':
        return (
          <blockquote key={index} className="my-8 relative">
            <div className="bg-gradient-to-r from-secondary/10 to-accent/10 rounded-xl p-8 border-l-4 border-secondary">
              <p className="text-xl italic text-foreground mb-4">"{block.content}"</p>
              {block.author && (
                <cite className="text-secondary font-semibold not-italic">— {block.author}</cite>
              )}
            </div>
          </blockquote>
        );
      case 'chart':
        return (
          <div key={index} className="my-8 bg-card rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-foreground mb-6 text-center">{block.chartTitle}</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={block.chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="label" 
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {block.chartData?.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={entry.color || 'hsl(var(--secondary))'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      case 'tip':
        return (
          <div key={index} className="my-8 bg-accent/10 border border-accent/30 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xl">💡</span>
              </div>
              <div>
                <h4 className="font-bold text-foreground mb-1">Pro Tip</h4>
                <p className="text-muted-foreground">{block.content}</p>
              </div>
            </div>
          </div>
        );
      case 'cta':
        return (
          <div key={index} className="my-10 bg-gradient-to-br from-primary to-secondary rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">Ready to Get Started?</h3>
            <p className="text-white/90 mb-6">Get your free, no-obligation moving quote today.</p>
            <QuoteModal>
              <button className="px-8 py-4 bg-accent text-accent-foreground font-bold rounded-lg hover:bg-accent/90 transition-all hover:scale-105 shadow-lg">
                Get Free Quote
              </button>
            </QuoteModal>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/85 to-secondary/80"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-white/70 text-sm mb-8">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
              <span>/</span>
              <span className="text-white">{post.category}</span>
            </nav>

            <div className="mb-6">
              <span className="px-4 py-2 bg-accent text-accent-foreground text-sm font-semibold rounded-full">
                {post.category}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>

            <p className="text-xl text-white/90 mb-8">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>{formatDate(post.publishDate)}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {post.content.map((block, index) => renderContent(block, index))}

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-border">
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">TAGS</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="px-4 py-2 bg-muted text-muted-foreground rounded-full text-sm hover:bg-secondary hover:text-secondary-foreground transition-colors cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}