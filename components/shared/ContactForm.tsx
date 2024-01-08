'use client';
import React from 'react';
import * as z from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Button, Input, Textarea } from '@nextui-org/react';

const formSchema = z.object({
    email: z.string().email('Invalid email address'),
    name: z.string().min(1, { message: 'Name is required' }),
    message: z.string().min(1, { message: 'Message is required' }),
});

const ContactForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            name: '',
            message: '',
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
    }
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 w-3/4 sm:w-1/2 flex flex-col items-center justify-center"
            >
                <div className="w-full">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                {/* <FormLabel>Email</FormLabel> */}
                                <FormControl>
                                    <Input
                                        variant="underlined"
                                        placeholder="Name"
                                        className="w-full"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="w-full">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                {/* <FormLabel>Email</FormLabel> */}
                                <FormControl>
                                    <Input
                                        type="email"
                                        variant="underlined"
                                        placeholder="Email"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="w-full">
                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                                {/* <FormLabel>Email</FormLabel> */}
                                <FormControl>
                                    <Textarea
                                        label="Message"
                                        variant="bordered"
                                        placeholder="Enter your message"
                                        disableAnimation
                                        disableAutosize
                                        {...field}
                                        classNames={{
                                            // base: 'max-w-xs',
                                            input: 'resize-y min-h-[100px]',
                                        }}
                                        className="w-full"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Button color="primary" className="w-full" size='lg' type="submit">Submit</Button>
            </form>
        </Form>
    );
};

export default ContactForm;
