"use client";
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { createJob } from "../../../lib/api";
import { useState } from "react";

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

export default function NewJobPage() {
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await createJob(values);
      setSuccessMessage("Job created successfully!");
      setTimeout(() => {
        router.push("/jobs");
      }, 2000);
    } catch (error) {
      console.error('Error adding job:', error);
    }
  }

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/jobs">
            <Button>
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-primary">Add New Job</h1>
        </div>

        <div className="rounded-lg border bg-card p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField control={form.control} name="title" render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Senior Frontend Developer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter job description..." className="min-h-[150px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="location" render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. San Francisco, CA" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

                <FormField
                  control={form.control}
                  name="salary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Salary Range</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="e.g. 120000.00"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              <FormField control={form.control} name="jobType" render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Type</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Full-time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="industry" render={({ field }) => (
                <FormItem>
                  <FormLabel>Industry</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. IT" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="applicationDeadline" render={({ field }) => (
                <FormItem>
                  <FormLabel>Application Deadline</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="status" render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Open" {...field} />
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
                <Button type="submit">Create Job</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
