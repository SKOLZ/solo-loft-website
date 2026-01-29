import { CACHE_TAGS } from "@/services/constants";
import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const publishedPage = await request.json();

  switch (publishedPage.data.__typename) {
    case "Property":
      revalidateTag(CACHE_TAGS.PROPERTIES, { expire: 0 });
      revalidateTag(CACHE_TAGS.PROPERTY(publishedPage.data.id), { expire: 0 });
    case "ContactInformation":
      revalidateTag(CACHE_TAGS.CONTACT, { expire: 0 });
    case "AboutUs":
      revalidateTag(CACHE_TAGS.ABOUT_US, { expire: 0 });
  }
  return Response.json({ revalidated: true, now: Date.now() });
}
