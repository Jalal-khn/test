import { getData } from "@/actions/file"
import { DeleteRecord } from "@/components/DeleteRecord";
import Link from "next/link";

export default async function OutPut() {
    const data = await getData();

    return(
        <div className="flex flex-col items-center mt-4">
            <p className="text-center my-4 text-3xl font-bold ">Country Data</p>
            <div className="flex items-center font-bold">
                <p className="ring-1 p-2 w-[200px] bg-red-600 text-white">Province</p>
                <p className="ring-1 p-2 w-[200px] bg-red-600 text-white">City</p>
                <p className="ring-1 p-2 w-[200px] bg-red-600 text-white">Population</p>
                <p className="ring-1 p-2 w-[70px] bg-green-600 text-white">Update</p>
                <p className="ring-1 p-2 w-[70px] bg-blue-700 text-white">Delete</p>
            </div>
            {data.map((item) => 
            <div key={item.id} className="flex items-center">
                <p className="ring-1 p-2 w-[200px]">{item.province}</p>
                <p className="ring-1 p-2 w-[200px]">{item.city}</p>
                <p className="ring-1 p-2 w-[200px]">{item.population}</p>
                <Link href={`/update/${item.id}`} className="ring-1 p-2 w-[70px]">Update</Link>
                <DeleteRecord id={item.id} />
            </div>
        )}
            
        </div>
    )
}