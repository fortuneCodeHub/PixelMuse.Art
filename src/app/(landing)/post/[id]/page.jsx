import PostPageContent from "@/components/ui/PostPageContent";
import Head from "next/head";
// import Script from "next/script";
import { headers } from "next/headers";

export async function generateMetadata({ params }) {
  const postId = await params;
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const baseUrl = `${protocol}://${host}`;

  const response = await fetch(`https://www.yieldnvest.com/api/auth/posts/${postId.id}`);
  const data = await response.json();
  const { post } = data
  // console.log(post);
  

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords || [
      "art and design blog",
      "creative inspiration",
      "modern art trends",
      "digital art tutorials",
      "graphic design tips",
      "UI UX design ideas",
      "visual storytelling",
      "illustration techniques",
      "contemporary artists",
      "minimalist design style",
      "brand identity design",
      "color theory guide",
      "design psychology",
      "creative process insights",
      "photography inspiration",
      "art portfolio tips",
      "aesthetic design trends",
      "creative lifestyle blog",
      "art techniques for beginners",
      "how to become a digital artist",
      "creative workflow tools",
      "design resources for creators",
      "inspiration for designers",
      "creative entrepreneurship",
      "art & design tutorials",
      "digital illustration workflow"
    ],
    openGraph: {
      images: [
        { 
          url: post.thumbnail,
        }
      ],
    },
  };
}


const PostPage = async ({ params }) => {

  // Fetch post data again (you could also pass it from generateMetadata)
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const baseUrl = `${protocol}://${host}`;

  const { id } = await params

  const response = await fetch(`https://www.yieldnvest.com/api/auth/posts/${id}`);
  const data = await response.json();
  const { post } = data;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.thumbnail,
    datePublished: post.createdAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Developer",
      "name": "Fortune",
      url: "https://www.pixelmuse.art/",
    },
    publisher: {
      "@type": "Self-employed",
      "name": "PixelMuseArt",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.pixelmuse.art/opengraph-image.png",
      },
    },
    url: `https://www.pixelmuse.art/post/${post._id}`,
  };

  return (
    <>
      {/* <Head> */}
        {/* ✅ JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      {/* </Head> */}
      <PostPageContent />
    </>
  );
};

export default PostPage;
