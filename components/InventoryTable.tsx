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
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-muted/20">
      <div className="w-full max-w-4xl rounded-xl border shadow-lg overflow-hidden bg-background">
        <Table>
          <TableCaption className="py-4 text-muted-foreground">
            A list of your recent invoices.
          </TableCaption>

          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="font-semibold">Plant ID</TableHead>
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
                className="hover:bg-muted/30 transition-colors"
              >
                <TableCell className="font-medium">{plant.id}</TableCell>
                <TableCell>{plant.name}</TableCell>
                <TableCell>{plant.category}</TableCell>
                <TableCell>{plant.price}</TableCell>
                <TableCell>{plant.stock}</TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter className="bg-muted/30">
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell>$2,500.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}
