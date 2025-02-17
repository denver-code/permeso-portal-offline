'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { appConfig } from "@/app/config";
import { Navbar } from "@/components/common/navbar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface Plan {
  id: string;
  title: string;
  description: string;
  price: number;
  interval: string;
  total_uses: number;
  max_councils: number;
}

function Page(): JSX.Element {
  const router = useRouter();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setLoading] = useState(true);



  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="mr-2 h-16 w-16 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <div className="flex-1 p-6 mx-auto container">
        <h1 className="text-3xl font-bold text-foreground pb-6">Choose a Plan</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card key={plan.id}>
              <CardHeader>
                <CardTitle>{plan.title}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">£{plan.price} <span className="text-sm font-normal">per {plan.interval}</span></p>
                <ul className="mt-4 space-y-2">
                  <li>{plan.total_uses} collections per week</li>
                  <li>Up to {plan.max_councils} Councils</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  Subscribe
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page;