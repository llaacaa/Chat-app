import { getProfile } from "@/utils/userActions";
import { cookies } from "next/headers";

async function page() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token');
        
    if (token) {
        const res: unknown = await getProfile(token?.value);
        const data = res?.data;   
        const status = res?.status;
        console.log(data);
        console.log(status);
        return (
          <div>Logged In</div>
        )
    } else {
        return <div>Not logged</div>
    }

}

export default page