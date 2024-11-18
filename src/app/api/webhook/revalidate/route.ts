import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  // const publishedPage = await request.json();

  // if (publishedPage.data.url) {
  // revalidatePath(publishedPage.data.url);
  revalidatePath("/properties/[slug]");
  return Response.json({ revalidated: true, now: Date.now() });
  // }

  // return Response.json({
  //   revalidated: false,
  //   now: Date.now(),
  //   message: "Missing path to revalidate",
  // });
}
