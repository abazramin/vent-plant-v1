import React from "react";
import PlantCard from "./PlantCard";
import { stackServerApp } from "@/stack/server";
import { getPlantById } from "@/actions/plantAction";
import { SignIn } from "@stackframe/stack";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [id] = slug.split("--");

  const plant = await getPlantById(id);

  return {
    title: plant ? plant.name : "Plant Details",
    description: plant ? plant.description : "Plant details page",
  };
}

async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const user = await stackServerApp.getUser();

  const [id] = slug.split("--");

  const plant = await getPlantById(id);

  if (!user) {
    return <SignIn />;
  }

  if (!plant) {
    return <div>Plant not found</div>;
  }

  return (
    <div className="mt-7 w-full mx-auto px-4 grid grid-cols-1 lg:grid-cols-10 gap-6">
      <div className="lg:col-span-full">
        <PlantCard Plant={plant} />
      </div>
    </div>
  );
}

export default Page;
