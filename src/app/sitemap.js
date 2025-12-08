import { headers } from "next/headers";

export default async function sitemap() {
    const headersList = await headers();
    const host = headersList.get("host");
    const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
    const baseUrl = `${protocol}://${host}`;

    const response = await fetch(`${baseUrl}/api/auth/posts`);
    const data = await response.json();
    const { posts } = data

    const postEntries = posts.map((post) => ({
        url: `https://pixelmuseart.vercel.app/post/${post.slug}`,
        lastModified: new Date(post.updatedAt),
        // changeFrequency: ,
        // priority: ,
    }))

    return [
        {
            url: `https://pixelmuseart.vercel.app/`,
            lastModified: new Date()
        },
        {
            url: `https://pixelmuseart.vercel.app/about-us`,
            lastModified: new Date()
        },
        {
            url: `https://pixelmuseart.vercel.app/contact-us`,
            lastModified: new Date()
        },
        {
            url: `https://pixelmuseart.vercel.app/privacy-policy`,
            lastModified: new Date()
        },
        {
            url: `https://pixelmuseart.vercel.app/terms-of-use`,
            lastModified: new Date()
        },
        ...postEntries,
    ]
}