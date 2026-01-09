import { getPostById } from "@/components/helpers/getPost";
import PostPageContent from "@/components/ui/PostPageContent";
import Head from "next/head";
// import Script from "next/script";
import { headers } from "next/headers";

export async function generateMetadata({ params }) {
  try {
    const postId = await params;
    
    const post = await getPostById(postId.id)

    // console.log("this is the post data", post)

    if (!post) throw new Error("Post not found");

    return {
      title: post.title,
      description: post.excerpt,
      keywords: post.keywords || [
        "PixelMuse",
        "photography and art blog",
        "art and design inspiration",
        "creative photography",
        "visual storytelling",
        "digital art tutorials",
        "graphic design ideas",
        "UI UX design inspiration",
        "illustration techniques",
        "contemporary art trends",
        "artist spotlights",
        "creative process",
        "aesthetic design",
        "visual culture",
        "design principles",
        "color theory in design",
        "composition techniques",
        "photography tips",
        "art portfolio guidance",
        "creative workflows",
        "design resources for creatives",
        "inspiration for artists",
        "modern design trends",
        "creative tools",
        "art and design tutorials",
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
    
  } catch (err) {
    console.error("Metadata error:", err);

    return {
      title: "Post not found | PixelMuse",
      description: "This post is unavailable.",
    };
  }
  
}


const PostPage = async ({ params }) => {

  const { id } = await params

  const post = await getPostById(id)

  // console.log(post);
  

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
      <PostPageContent pagePost={post} />
    </>
  );
};

export default PostPage;
