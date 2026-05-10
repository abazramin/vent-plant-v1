import InventoryTable from "@/components/InventoryTable";
import { stackServerApp } from "@/stack/server";
import { SignUp } from "@stackframe/stack";
import React from "react";

async function page() {
  const user = await stackServerApp.getUser();
  // const app = stackServerApp.urls;
  return (
    <>
      {user ? (
        <InventoryTable />
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
