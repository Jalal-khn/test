import { getSingleDate } from "@/actions/file";
import UpdateRecord from "@/components/UpdateRecord";


export default async function UpdateRecordPage({params}) {
    if (!params.id) {
        return (
            <div>Id is required</div>
        )
    }
    const data = await getSingleDate(params.id);
    if (!data) {
        return (
            <div>No Record found</div>
        )
    }

  return (
   <UpdateRecord data={data} />
  );
}
