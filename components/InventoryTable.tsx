"use client";

import { Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Input } from "./ui/input";
import { Combobox } from "./ui/combo-box";
import { useState } from "react";
import { getPlants } from "@/actions/plantAction";
import { useRouter } from "next/navigation";
import { Skeleton } from "./ui/skeleton";
import { isMapIterator } from "util/types";
import CreateDialog from "./CreateDialog";
import EditDialog from "./EditDialog";
import DeleteDialog from "./DeleteDialog";

type Plants = Awaited<ReturnType<typeof getPlants>>;

interface InventoryTableProps {
  plants: Plants;
}

export default function InventoryTable({ plants }: InventoryTableProps) {
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPlants = plants?.userPlants?.filter(
    (plant) =>
      plant.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "" || plant.category === selectedCategory),
  );

  if (!plants) {
    return (
      <div className="w-full space-y-4">
        <div className="flex items-center gap-2 py-4">
          <Skeleton className="h-10 w-full max-w-sm" />
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Skeleton className="w-full h-4" />
              </TableHead>
              <TableHead>
                <Skeleton className="w-full h-4" />
              </TableHead>
              <TableHead>
                <Skeleton className="w-full h-4" />
              </TableHead>
              <TableHead>
                <Skeleton className="w-full h-4" />
              </TableHead>
              <TableHead>
                <Skeleton className="w-full h-4" />
              </TableHead>
              <TableHead className="text-right">
                <Skeleton className="w-full h-4" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className="w-full h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full h-4" />
                </TableCell>
                <TableCell className="text-right">
                  <Skeleton className="w-full h-4" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20">
      <div className="container mx-auto px-4 py-6">
        {/* Filters */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              placeholder="Filter plants..."
              className="h-11 rounded-xl pl-10 shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="w-full lg:w-64">
            <Combobox
              value={selectedCategory}
              onChange={(val) => setSelectedCategory(val)}
            />
          </div>

          <CreateDialog />
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border bg-background shadow-sm">
          <div className="overflow-x-auto">
            <Table>
              <TableCaption className="py-4 text-muted-foreground">
                Manage your plant inventory.
              </TableCaption>

              <TableHeader className="sticky top-0 bg-muted/50 backdrop-blur">
                <TableRow>
                  <TableHead className="font-semibold">Name</TableHead>
                  <TableHead className="font-semibold">Category</TableHead>
                  <TableHead className="font-semibold">Price</TableHead>
                  <TableHead className="font-semibold">Stock</TableHead>
                  <TableHead className="text-right font-semibold">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredPlants?.map((plant) => {
                  const slugifiedName = plant.name
                    .toLowerCase()
                    .replace(/\s+/g, "-");

                  const slug = `${plant.id}--${slugifiedName}`;
                  const planturl = `/plants/${slug}`;

                  return (
                    <TableRow
                      key={plant.id}
                      onClick={() => router.push(planturl)}
                      className="cursor-pointer transition-all hover:bg-muted/40"
                    >
                      <TableCell className="font-medium">
                        {plant.name}
                      </TableCell>

                      <TableCell>{plant.category}</TableCell>

                      <TableCell>${Number(plant.price).toFixed(2)}</TableCell>

                      <TableCell>{plant.stock}</TableCell>

                      <TableCell className="text-right">
                        <div
                          className="flex justify-end gap-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <EditDialog plant={plant} />
                          <DeleteDialog plant={plant} />
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>

              <TableFooter className="bg-muted/30"></TableFooter>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
