"use server";

import { prisma } from "@/lib/prisma";
import { getUserId } from "./user.action";
import { Prisma } from "@/src/generated/client";

export async function getPlants(searchTerm?: string) {
  try {
    const currentUserId = await getUserId();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const whereClause: any = {
      userId: currentUserId,
    };

    if (searchTerm) {
      whereClause.name = {
        contains: searchTerm,
        mode: "insensitive",
      };
    }

    const userPlants = await prisma.plants.findMany({
      where: whereClause,
    });

    // revalidatePath("/");
    return { success: true, userPlants };
  } catch (error) {
    console.log("Error in getPlants", error);
  }
}

export async function getPlantById(id: string) {
  // Example using Prisma; adjust based on your data layer
  return await prisma.plants.findUnique({
    where: { id },
  });
}

export async function createPlant(data: Prisma.PlantsCreateInput) {
  console.log("creating plant");
  console.log(data);
  try {
    const currentUserId = await getUserId();
    if (!currentUserId) return;

    const newPlant = await prisma.plants.create({
      data: {
        ...data,
        userId: currentUserId,
      },
    });
    // revalidatePath("/plants");
    return newPlant;
  } catch (error) {
    console.error("Error Creating Plant:", error);
    throw error;
  }
}
