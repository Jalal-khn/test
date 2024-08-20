"use server";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function Data({ province, city, population }) {
    if (!province || !city) {
        return { error: "Please select both options" };
    }

    try {
        // Ensure the fields and model match your Prisma schema
        await prisma.user.create({
            data: {
                province,
                city,
                population
            }
        });
        return { success: "Data stored successfully" };
    } catch (error) {
        // Handle errors, for example, if there are issues with the database or Prisma
        console.error("Error storing data:", error);
        return { error: "An error occurred while storing data" };
    }
}


export async function getData() {
    try {
        const data = await prisma.user.findMany();
        return data;
    } catch (error) {
        return null;
    }
}

export async function deleteData(id) {
    try {
        const res = await prisma.user.delete({
            where:{id}
        });
        revalidatePath("/country")
    } catch (error) {
        return null;
    }
}

export async function getSingleDate(id) {
    try {
        const data = await prisma.user.findUnique({
            where:{id}
        });
        return data;
    } catch (error) {
        return null;
    }
}

export async function updateRecord({ id, province, city, population }) {
        const response = await prisma.user.update({
            where:{id},
            data:{
                province,
                city,
                population
            }
        })
        redirect("/country")
}