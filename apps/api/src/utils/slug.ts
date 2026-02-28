import slugify from 'slugify';
import { prisma } from 'lib/prisma';

export async function generateSlug(name: string): Promise<string> {
  const baseSlug = slugify(name, {
    lower: true,
    strict: true,
    trim: true,
  });

  const existing = await prisma.product.findMany({
    where: {
      slug: {
        startsWith: baseSlug,
      },
    },
    select: { slug: true },
  });

  if (existing.length === 0) {
    return baseSlug;
  }

  const numbers = existing.map((p) => {
    const match = p.slug.match(new RegExp(`^${baseSlug}-(\\d+)$`));
    return match ? parseInt(match[1]) : 0;
  });

  const maxNumber = Math.max(...numbers);

  return `${baseSlug}-${maxNumber + 1}`;
}
