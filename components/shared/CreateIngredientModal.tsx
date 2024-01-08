'use client';
import React from 'react';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
} from '@nextui-org/react';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import toast from 'react-hot-toast';

import {
    Form,
    FormControl,
    // FormDescription,
    FormField,
    FormItem,
    // FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    createIngredient,
    updateIngredient,
} from '@/lib/actions/Ingredient.actions';
import { IIngredient } from '@/lib/database/models/Ingredient.model';
// import { useRouter } from 'next/navigation';

const ingredientSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    amount: z
        .number()
        .nonnegative({ message: 'Amount must be a valid number' }),
});

type IngredientModalProps = {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    type: 'Create' | 'Update';
    ingredient?: IIngredient;
    ingredientId?: string;
    refreshIngredient: () => void;
};

const CreateIngredientModal = ({
    isOpen,
    onOpenChange,
    type,
    ingredient,
    ingredientId,
    refreshIngredient,
}: IngredientModalProps) => {
    const initialValues =
        ingredient && type === 'Update'
            ? {
                  ...ingredient,
              }
            : {
                  name: '',
                  amount: 0,
              };

    // const router = useRouter();

    const ingredientForm = useForm<z.infer<typeof ingredientSchema>>({
        resolver: zodResolver(ingredientSchema),
        defaultValues: initialValues,
    });

    /**
     * Submit the form with the ingredient name and initial amount
     * @param values Form values
     */
    async function onSubmit(values: z.infer<typeof ingredientSchema>) {
        console.log(values);
        if (type === 'Create') {
            toast.promise(createIngredient(values.name.trim(), values.amount), {
                loading: 'Adding ingredient...',
                success: (newIngredient) => {
                    ingredientForm.reset();
                    refreshIngredient();
                    return `Added ${newIngredient.name}`;
                },
                error: (err) => {
                    console.log(err);
                    return 'Failed to add ingredient';
                },
            });
        } else if (type === 'Update') {
            if (!ingredientId) {
                toast.error('Unable to find the ingredient id');
                return;
            }
            toast.promise(
                updateIngredient(
                    ingredientId,
                    values.name.trim(),
                    values.amount
                ),
                {
                    loading: 'Updating ingredient...',
                    success: (updatedIngredient) => {
                        ingredientForm.reset();
                        refreshIngredient();
                        return `Updated ${updatedIngredient.name}`;
                    },
                    error: (err) => {
                        console.log(err);
                        return 'Failed to update ingredient';
                    },
                }
            );
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="center"
            isDismissable={false}
        >
            <Form {...ingredientForm}>
                <form onSubmit={ingredientForm.handleSubmit(onSubmit)}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">
                                    {type === 'Create'
                                        ? 'Add a new ingredient'
                                        : 'Update ingredient'}
                                </ModalHeader>
                                <ModalBody>
                                    <FormField
                                        control={ingredientForm.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                {/* <FormLabel>Email</FormLabel> */}
                                                <FormControl>
                                                    <Input
                                                        autoFocus
                                                        label="Ingredient Name"
                                                        placeholder="Enter name"
                                                        variant="bordered"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={ingredientForm.control}
                                        name="amount"
                                        render={({ field }) => (
                                            <FormItem>
                                                {/* <FormLabel>Email</FormLabel> */}
                                                <FormControl>
                                                    <Controller
                                                        name="amount"
                                                        control={
                                                            ingredientForm.control
                                                        }
                                                        render={({
                                                            field: {
                                                                onChange,
                                                                onBlur,
                                                                value,
                                                                ref,
                                                            },
                                                        }) => (
                                                            <Input
                                                                type="number"
                                                                autoFocus
                                                                label="Amount"
                                                                placeholder="0"
                                                                variant="bordered"
                                                                value={
                                                                    value === 0
                                                                        ? ''
                                                                        : value.toString()
                                                                }
                                                                onChange={(e) =>
                                                                    onChange(
                                                                        Number(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    )
                                                                }
                                                                onBlur={onBlur}
                                                                ref={ref}
                                                            />
                                                        )}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </ModalBody>
                                <ModalFooter>
                                    <Button
                                        color="danger"
                                        variant="flat"
                                        onPress={onClose}
                                    >
                                        Close
                                    </Button>
                                    <Button
                                        color="primary"
                                        // onPress={onClose}
                                        type="submit"
                                    >
                                        Submit
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </form>
            </Form>
        </Modal>
    );
};

export default CreateIngredientModal;
