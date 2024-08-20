"use client"

import { deleteData } from "@/actions/file";

export function DeleteRecord({id}) {
    
    const handleDelete = async () => {
        const res = await deleteData(id);
    }

    return (
        <p onClick={handleDelete} className="ring-1 p-2 w-[70px] cursor-pointer ">Delete</p>
    )
}