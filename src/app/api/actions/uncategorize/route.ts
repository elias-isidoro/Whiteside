import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { UncategorizerValidator } from "@/lib/validators/categorizer";

export async function PUT (req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 });
    }

    const body = await req.json();

    const { selectedProducts } = UncategorizerValidator.parse(body);

    await db.product.updateMany({
      where: { id: { in: selectedProducts } },
      data: { categoryId: null }
    });

    return new Response('Products have been successfully categorized');

  } catch (error) {
    return new Response('Error', { status: 500 });
  }
}