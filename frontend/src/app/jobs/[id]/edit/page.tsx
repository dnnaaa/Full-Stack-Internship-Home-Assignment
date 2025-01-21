'use client';

import React, { useEffect, useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../../../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form";
import { Input } from "../../../../components/ui/input";
import { Textarea } from "../../../../components/ui/textarea";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { updateJob, fetchJob } from '../../../../lib/api';

const formSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  location: z.string().min(2, { message: "Location must be at least 2 characters." }),
  salary: z.number().positive({ message: "Salary must be a positive number." }),
  jobType: z.string().min(2, { message: "Job type is required." }),
  industry: z.string().min(2, { message: "Industry is required." }),
  applicationDeadline: z.string().min(1, { message: "Application deadline is required." }),
  status: z.string().min(2, { message: "Status is required." }),
  isRemote: z.boolean(),
});



export default function EditJobPage() {
  const router = useRouter();
  const params = useParams();
  
  const [jobData, setJobData] = useState(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      salary: 0,
      jobType: "",
      industry: "",
      applicationDeadline: "",
      status: "",
      isRemote: false,
    },
  });

  const id = Array.isArray(params.id) ? params.id[0] : params.id; // Si id est un tableau, prendre le premier élément

  useEffect(() => {
    async function loadJob() {
      if (id) {
        try {
          const data = await fetchJob(id);
          console.log("Fetched job data:", data); // Vérifiez les données récupérées
          setJobData(data);
          form.reset({
            title: data.title,
            description: data.description,
            location: data.location,
            salary: data.salary,
            jobType: data.jobType,
            industry: data.industry,
            applicationDeadline: data.applicationDeadline,
            status: data.status,
            isRemote: data.isRemote,
          });
        } catch (error) {
          console.error("Error fetching job:", error);
        }
      }
    }
  
    loadJob();
  }, [id, form]);


  
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log('Updating job...', id, values); // Log des données envoyées
      await updateJob(id, values);
      router.push("/jobs");
    } catch (error) {
      console.error('Error updating job:', error);
    }
  }
  

  if (!jobData) return <p>Loading...</p>; // Affichage d'un message de chargement jusqu'à ce que les données soient récupérées

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/jobs">
            <Button>
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-primary">Edit Job</h1>
        </div>

        <div className="rounded-lg border bg-card p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField control={form.control} name="title" render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea className="min-h-[150px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="location" render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="salary" render={({ field }) => (
                <FormItem>
                  <FormLabel>Salary Range</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="jobType" render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Type</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="industry" render={({ field }) => (
                <FormItem>
                  <FormLabel>Industry</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="applicationDeadline" render={({ field }) => (
                <FormItem>
                  <FormLabel>Application Deadline</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="status" render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="isRemote" render={({ field }) => (
                <FormItem>
                  <FormLabel>Remote Job</FormLabel>
                  <FormControl>
                    <input type="checkbox" checked={field.value} onChange={field.onChange} ref={field.ref} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <div className="flex justify-end">
                <Button type="submit">Update Job</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
