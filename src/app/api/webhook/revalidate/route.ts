import { CACHE_TAGS } from "@/services/constants";
import { SITE_URL } from "@/utils/structuredData";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

const INDEXNOW_KEY = "6863c43f7cef30bbb9172e0958495a27";
const INDEXNOW_ENDPOINT =
  process.env.INDEXNOW_ENDPOINT ?? "https://api.indexnow.org/indexnow";

const absoluteUrl = (path: string) => new URL(path, SITE_URL).toString();

const submitToIndexNow = async (urls: string[]) => {
  if (urls.length === 0) return;

  try {
    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: new URL(SITE_URL).host,
        key: INDEXNOW_KEY,
        keyLocation: absoluteUrl(`${INDEXNOW_KEY}.txt`),
        urlList: urls,
      }),
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      console.error("IndexNow submission failed", response.status);
    }
  } catch (error) {
    console.error("IndexNow submission failed", error);
  }
};

export async function POST(request: NextRequest) {
  const publishedPage = await request.json();
  const urlsToSubmit: string[] = [];

  switch (publishedPage.data.__typename) {
    case "Property":
      revalidateTag(CACHE_TAGS.PROPERTIES, { expire: 0 });
      revalidateTag(CACHE_TAGS.PROPERTY(publishedPage.data.id), { expire: 0 });
      revalidatePath("/llms.txt");
      revalidatePath("/sitemap.xml");
      if (typeof publishedPage.data.slug === "string" && publishedPage.data.slug) {
        urlsToSubmit.push(absoluteUrl(`/properties/${publishedPage.data.slug}`));
      }
      urlsToSubmit.push(absoluteUrl("/properties"));
      break;
    case "ContactInformation":
      revalidateTag(CACHE_TAGS.CONTACT, { expire: 0 });
      revalidatePath("/llms.txt");
      urlsToSubmit.push(absoluteUrl("/contact"));
      break;
    case "AboutUs":
      revalidateTag(CACHE_TAGS.ABOUT_US, { expire: 0 });
      urlsToSubmit.push(absoluteUrl("/about-us"));
      break;
  }

  await submitToIndexNow(urlsToSubmit);

  return Response.json({ revalidated: true, now: Date.now() });
}
