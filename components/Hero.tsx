import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, CirclePlay, Leaf, Sprout, ScanLine } from "lucide-react";
import React from "react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-green-500/20 blur-3xl" />
        <div className="absolute bottom-20 right-10 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 lg:px-10 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <Badge className="rounded-full px-4 py-2 backdrop-blur-md border border-border shadow-sm">
              🌱 Plantventory v1.0 is live
            </Badge>

            <h1 className="mt-8 text-4xl md:text-6xl font-bold tracking-tight leading-tight">
              Smart Plant Inventory
              <span className="block bg-linear-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
                Management Made Easy
              </span>
            </h1>

            <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
              Organize, track, and manage your plant collection with ease.
              Monitor stock, health status, and growth stages all in one place.
            </p>

            {/* CTA */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-full text-base px-6">
                Start Managing
                <ArrowUpRight className="h-5 w-5 ml-2" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="rounded-full text-base px-6"
              >
                <CirclePlay className="h-5 w-5 mr-2" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-14 grid grid-cols-3 gap-6 border-t pt-8">
              <div>
                <h3 className="text-2xl font-bold">500+</h3>
                <p className="text-sm text-muted-foreground">Plants Tracked</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold">99%</h3>
                <p className="text-sm text-muted-foreground">
                  Inventory Accuracy
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold">24/7</h3>
                <p className="text-sm text-muted-foreground">
                  Smart Monitoring
                </p>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative">
            <div className="relative rounded-[2rem] border bg-white/70 backdrop-blur-xl shadow-2xl p-6 lg:p-8">
              <div className="grid gap-4">
                <div className="flex items-center justify-between rounded-2xl border p-4">
                  <div className="flex items-center gap-3">
                    <Leaf className="h-5 w-5 text-green-600" />
                    <span className="font-medium">Monstera Deliciosa</span>
                  </div>
                  <Badge>Healthy</Badge>
                </div>

                <div className="flex items-center justify-between rounded-2xl border p-4">
                  <div className="flex items-center gap-3">
                    <Sprout className="h-5 w-5 text-emerald-600" />
                    <span className="font-medium">Snake Plant</span>
                  </div>
                  <Badge variant="secondary">Growing</Badge>
                </div>

                <div className="flex items-center justify-between rounded-2xl border p-4">
                  <div className="flex items-center gap-3">
                    <ScanLine className="h-5 w-5 text-green-700" />
                    <span className="font-medium">Inventory Scan</span>
                  </div>
                  <Badge variant="outline">Updated</Badge>
                </div>
              </div>
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-6 -left-6 rounded-2xl border bg-background shadow-xl px-5 py-4 hidden md:block">
              <p className="text-sm text-muted-foreground">Total Plants</p>
              <h3 className="text-2xl font-bold">1,284</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
