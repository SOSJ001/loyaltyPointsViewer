import { getServerSession } from "$lib/supabase/store";

export async function load() {
    getServerSession().then((data) => {
        console.log("getting server session", data)
        return {data}
    })
}