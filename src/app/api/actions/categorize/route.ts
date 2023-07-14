import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { CategorizerValidator } from "@/lib/validators/categorizer";

export async function PUT (req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 });
    }

    const body = await req.json();
    const { selectedProducts, categoryId } = CategorizerValidator.parse(body);

    const category = await db.category.findFirst({ where: { id: categoryId } });

    if (!category) {
      return new Response('Category does not exist.', { status: 400 });
    }

    await db.product.updateMany({
      where: { id: { in: selectedProducts } },
      data: { categoryId }
    });

    return new Response('Products have been successfully categorized');

  } catch (error) {
    return new Response('Error', { status: 500 });
  }
}