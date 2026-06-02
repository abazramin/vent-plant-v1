import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { EditIcon, Sprout } from "lucide-react";
import { Combobox } from "./ui/combo-box";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { editPlant, getPlantById } from "@/actions/plantAction";
import toast from "react-hot-toast";
import ImageUpload from "./ImageUpload";
// import ImageUpload from "./ImageUpload";

type Plant = NonNullable<Awaited<ReturnType<typeof getPlantById>>>;

interface EditDialogProps {
  plant: Plant;
}

export default function EditDialog({ plant }: EditDialogProps) {
  const [formData, setFormData] = useState(() => ({
    name: plant.name.trim(),
    description: (plant.description || "").trim(),
    stock: plant.stock,
    price: plant.price,
    category: plant.category.trim(),
    userId: plant.userId.trim(),
    imageUrl: plant.imageUrl || "",
  }));

  const handleChange = (field: string, value: string | number) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newPlant = await editPlant(plant.id, formData);
      console.log("plant edited: ", newPlant);
      toast.success("Plant edited successfully");
    } catch (error) {
      console.error("error creating plant", error);
      toast.error("Failed to edit plant");
    }
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="secondary"
            className="ml-auto flex items-center gap-2 rounded-lg shadow-sm hover:shadow-md transition-all"
            asChild
          >
            <span>
              <EditIcon className="w-4 h-4" />
              Edit Plant
            </span>
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl">
          <AlertDialogHeader className="space-y-2">
            <AlertDialogTitle className="flex items-center gap-2 text-2xl font-bold">
              <Sprout className="h-5 w-5 text-primary" />
              Add a Plant
            </AlertDialogTitle>

            <AlertDialogDescription>
              Fill out the form below to add a new plant to your inventory.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name & Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  className="h-11"
                  placeholder="Enter name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Combobox
                  value={formData.category}
                  onChange={(val) => handleChange("category", val)}
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                rows={5}
                className="resize-none min-h-30"
                placeholder="Type your message here."
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </div>

            {/* Stock & Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  type="number"
                  className="h-11"
                  placeholder="Enter stock quantity"
                  value={formData.stock}
                  onChange={(e) =>
                    handleChange("stock", Number(e.target.value))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  className="h-11"
                  placeholder="Enter price"
                  value={formData.price}
                  onChange={(e) =>
                    handleChange("price", Number(e.target.value))
                  }
                />
              </div>
            </div>

            {/* Image Upload */}
            <div className="w-full rounded-xl border bg-muted/30 p-4">
              <Label className="mb-3 block">Plant Image</Label>

              <ImageUpload
                endpoint="postImage"
                value={formData.imageUrl}
                onChange={(url) => {
                  handleChange("imageUrl", url);
                }}
              />
            </div>

            <AlertDialogFooter className="gap-2">
              <AlertDialogCancel className="w-full sm:w-auto">
                Cancel
              </AlertDialogCancel>

              <AlertDialogAction type="submit" className="w-full sm:w-auto">
                Submit
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
