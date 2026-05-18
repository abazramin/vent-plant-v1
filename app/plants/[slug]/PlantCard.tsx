/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Download } from "lucide-react";
import { getPlantById } from "@/actions/plantAction";
// import AddToCartButton from "@/components/AddtoCartButton";

type Plant = Awaited<ReturnType<typeof getPlantById>>;

interface PlantCardProps {
  Plant: Plant | null; // Allow plant to be null for error handling
}

export default function PlantCard({ Plant }: PlantCardProps) {
  if (!Plant) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <p className="text-muted-foreground">Plant data is not available.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Image */}
        <div className="order-1">
          <Card className="overflow-hidden border-0 shadow-lg">
            <CardHeader className="p-0">
              {Plant.imageUrl ? (
                <div className="aspect-video overflow-hidden bg-linear-to-br from-muted/50 to-muted">
                  <img
                    src={Plant.imageUrl}
                    alt={Plant.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              ) : (
                <div className="aspect-square bg-linear-to-br from-muted/50 to-muted flex items-center justify-center">
                  <Download className="h-16 w-16 text-muted-foreground" />
                </div>
              )}
            </CardHeader>
          </Card>
        </div>

        {/* Product Information */}
        <div className="order-2 flex flex-col justify-center space-y-6">
          <div className="space-y-4">
            <Badge variant="secondary" className="w-fit text-sm">
              {Plant.category}
            </Badge>

            <div className="space-y-3">
              <h1 className="text-3xl lg:text-4xl font-bold tracking-tight leading-tight">
                {Plant.name}
              </h1>

              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-primary">
                  ${Plant.price.toFixed(2)}
                </span>
                <span className="text-sm text-muted-foreground">
                  Digital Download
                </span>
              </div>
            </div>

            {Plant.description && (
              <p className="text-muted-foreground text-lg leading-relaxed">
                {Plant.description}
              </p>
            )}
          </div>

          {/* Purchase Section */}
          <div className="space-y-4 pt-4">
            {/* <AddToCartButton productId={product.id} /> */}

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                <span>Instant Download</span>
              </div>
              <div className="h-4 w-px bg-border" />
              <span>Digital Product</span>
            </div>
          </div>

          {/* Product Details */}
          <Card className="mt-8">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Product Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category</span>
                  <span className="font-medium">{Plant.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type</span>
                  <span className="font-medium">Digital Download</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className="font-medium">Instant</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Updated</span>
                  <span className="font-medium">
                    {Plant.updatedAt.toLocaleDateString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
