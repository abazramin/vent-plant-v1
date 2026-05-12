import InventoryTable from "@/components/InventoryTable";
import { stackServerApp, syncUser } from "@/stack/server";
import { SignUp } from "@stackframe/stack";

async function page() {
  const user = await stackServerApp.getUser();
  // const app = stackServerApp.urls;
  await syncUser();
  return (
    <>
      {user ? (
        <div className="mt-7 w-full mx-auto px-4 grid grid-cols-1 lg:grid-cols-10 gap-6">
          <div className="lg:col-span-full">
            <InventoryTable />
          </div>
        </div>
      ) : (
        <>
          <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-md">
              <SignUp />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default page;
