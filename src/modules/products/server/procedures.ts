import { Category } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import type { Where } from "payload";
import { z } from "zod";
export const productsRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        category: z.string().nullable().optional(),
        minPrize :z.string().nullable().optional(),
        maxPrize :z.string().nullable().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const where: Where = {};
      if(input.minPrize){
        where.price = {
          greater_than_equal : input.minPrize
        }
      }
      if(input.maxPrize){
        where.price = {
          greater_than_equal : input.maxPrize
        }
      }
      if (input.category) {
        const categoriesData = await ctx.db.find({
          collection: "categories",
          limit: 1,
          depth: 1, //populate subcategories
          pagination: false,
          where: { slug: { equals: input.category } },
        });

        const formattedData = categoriesData.docs.map((doc) => ({
          ...doc,
          subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
            //Because of "depth :  1"  we are confident "doc" wiil be  a type of "Category"
            ...(doc as Category),
            subcategories: undefined,
          })),
        }));
        const subCategoriesslug = [];
        const parentCategory = formattedData[0];
        if (parentCategory) {
          subCategoriesslug.push(...parentCategory.subcategories.map((subcategory) => subcategory.slug))
          where["category.slug"] = {
            in : [parentCategory.slug ,...subCategoriesslug]
          }
        }
      }
      const data = await ctx.db.find({
        collection: "products",
        depth: 0, //popilate category and image
        where,
      });

      return data;
    }),
});
