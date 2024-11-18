import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const publishedPage = await request.json();

  switch (publishedPage.data.__typename) {
    case "Property":
      revalidatePath("/properties");
      revalidatePath(`/properties/${publishedPage.data.slug}`);
    case "ContactInformation":
      revalidatePath("/contact");
  }
  return Response.json({ revalidated: true, now: Date.now() });
}
