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

const Plants = [
  {
    id: 1,
    name: "Rose",
    category: "Flowering",
    price: "$10.00",
    stock: 50,
  },
];

export default function TableDemo() {
  const [selectedCategory, setSelectedCategory] = useState("");

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
            />
          </div>

          <div className="w-full md:w-62.5">
            <Combobox
              value={selectedCategory}
              onChange={(val) => setSelectedCategory(val)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-hidden rounded-2xl border bg-background shadow-sm">
          <Table>
            <TableCaption className="py-5 text-muted-foreground">
              A list of your recent invoices.
            </TableCaption>

            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="font-semibold h-14">Plant ID</TableHead>
                <TableHead className="font-semibold">Name</TableHead>
                <TableHead className="font-semibold">Category</TableHead>
                <TableHead className="font-semibold">Price</TableHead>
                <TableHead className="font-semibold">Stock</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {Plants.map((plant) => (
                <TableRow
                  key={plant.id}
                  className="transition-colors hover:bg-muted/40"
                >
                  <TableCell className="font-medium py-5">{plant.id}</TableCell>
                  <TableCell>{plant.name}</TableCell>
                  <TableCell>{plant.category}</TableCell>
                  <TableCell>{plant.price}</TableCell>
                  <TableCell>{plant.stock}</TableCell>
                </TableRow>
              ))}
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
