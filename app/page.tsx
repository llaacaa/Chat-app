import { getLoginData } from "./layout";


async function Page() {
  const loginInfo = await getLoginData();

  if (loginInfo.isLoggedIn) {
    return <div>Logged In</div>
  } else {
    return <div>{loginInfo.message}</div>
  }
}

export default Page;
