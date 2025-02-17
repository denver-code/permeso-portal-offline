"use client"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
// import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod"
import { ChevronDownIcon } from "@radix-ui/react-icons"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {getAuth, updateProfile} from "firebase/auth";

 
const formSchema = z.object({
  fullname: z.string().min(4).max(50),
})

export function AccountInfo(): JSX.Element {
  const [profile, setProfile] = useState<ProfileResponse | null>(null);
  const [isLoading, setLoading] = useState(true)
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
    },
  })


   useEffect(() => {
    Promise.all([
      fetch('/sample-data/account.json').then(res => res.json()),

    ])
      .then(([profileData]) => {
        setProfile(profileData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading dashboard data:', error);
        setLoading(false);
      });
  }, []);


  function onSubmit(values: z.infer<typeof formSchema>) {
  }

 
if (isLoading) return <>
    <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white" />
    </div>
</>;


  const requestChange = (field: string) => {
    toast({
      title: `Request a Change of ${field}`,
      description: "This feature is not available yet. Please contact Technical Support for assistance.",
    })
  }

  return (
   <> <div className="space-y-8">
     <div>
        <h2 className="text-lg font-semibold mb-2">Full Name</h2>
        <h3 className="text-lg font-medium">{profile?.data.name}</h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-2"
          onClick={() => requestChange("Name")}
        >
          Request Change
        </Button>
        <p className="text-sm text-gray-500 mt-2">
          This is your legal full name. You can change it only via Technical Support request with a valid reason and valid ID proof.
        </p>
      </div>
        </div>
      <div>
        <h2 className="text-lg font-semibold mb-2">Email</h2>
        <h3 className="text-lg font-medium">example@mail.com</h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-2"
        >
          Request Change
        </Button>
        <p className="text-sm text-gray-500 mt-2">
          This is your email address. You can change it only via Technical Support request with a valid reason.
        </p>
      </div>
      </>
  )
}