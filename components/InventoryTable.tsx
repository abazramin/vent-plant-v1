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
    <div className="w-full min-h-screen bg-muted/20">
      <div className="w-full h-screen flex flex-col bg-background p-6">
        {/* Filters */}
        <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              placeholder="Filter plants..."
              className="pl-10 h-12 rounded-xl"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="w-full md:w-62.5">
            <Combobox
              value={selectedCategory}
              onChange={(val) => setSelectedCategory(val)}
            />
          </div>
          <CreateDialog />
        </div>

        {/* Table */}
        <div className="flex-1 overflow-hidden rounded-2xl border bg-background shadow-sm">
          <Table>
            <TableCaption className="py-5 text-muted-foreground">
              A list of your recent invoices.
            </TableCaption>

            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="font-semibold">Name</TableHead>
                <TableHead className="font-semibold">Category</TableHead>
                <TableHead className="font-semibold">Price</TableHead>
                <TableHead className="font-semibold">Stock</TableHead>
                <TableHead className="font-semibold">Action</TableHead>
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
                    className="transition-colors hover:bg-muted/40"
                  >
                    <TableCell>{plant.name}</TableCell>
                    <TableCell>{plant.category}</TableCell>
                    <TableCell>{plant.price}</TableCell>
                    <TableCell>{plant.stock}</TableCell>{" "}
                    <TableCell className="text-right">
                      <div
                        className="flex justify-end space-x-4"
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

            <TableFooter className="bg-muted/30">
              <TableRow>
                <TableCell colSpan={3} className="font-semibold">
                  Total
                </TableCell>
                <TableCell className="font-semibold">$2,500.00</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    </div>
  );
}
