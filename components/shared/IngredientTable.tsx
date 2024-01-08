'use client';
import React, { useEffect, useState } from 'react';
import {
    Button,
    CircularProgress,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    cn,
    useDisclosure,
} from '@nextui-org/react';
import CreateIngredientModal from './CreateIngredientModal';
import { IIngredient } from '@/lib/database/models/Ingredient.model';
import {
    deleteIngredient,
    getAllIngredients,
} from '@/lib/actions/Ingredient.actions';

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

import { MoreHorizontal } from 'lucide-react';
import { Button as ButtonShadCN } from '@/components/ui/button';

import { DeleteIcon } from '../icons/DeleteIcon';
import { EditIcon } from '../icons/EditIcon';

import toast from 'react-hot-toast';

const iconClasses =
    'text-xl text-default-500 pointer-events-none flex-shrink-0';

const getColumns = (fetchIngredients: () => void): ColumnDef<IIngredient>[] => [
    {
        accessorKey: 'name',
        header: 'Ingredient Name',
    },
    {
        accessorKey: 'amount',
        header: () => <div className="text-right">Amount</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue('amount'));
            return <div className="text-right font-medium">{amount}</div>;
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const ingredient = row.original;
            const { isOpen, onOpen, onOpenChange } = useDisclosure();
            return (
                <div className="flex justify-end">
                    <CreateIngredientModal
                        isOpen={isOpen}
                        onOpenChange={onOpenChange}
                        type="Update"
                        ingredient={ingredient}
                        ingredientId={ingredient._id}
                        refreshIngredient={fetchIngredients}
                    />
                    <Dropdown>
                        <DropdownTrigger>
                            <ButtonShadCN
                                variant="ghost"
                                className="h-8 w-8 p-0"
                            >
                                <span className="sr-only">Open Menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </ButtonShadCN>
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="Dynamic actions"
                            variant="flat"
                        >
                            <DropdownItem
                                key="edit"
                                startContent={
                                    <EditIcon className={cn(iconClasses)} />
                                }
                                onPress={onOpen}
                            >
                                Edit
                            </DropdownItem>
                            <DropdownItem
                                key="delete"
                                className="text-danger"
                                color="danger"
                                startContent={
                                    <DeleteIcon
                                        className={cn(
                                            iconClasses,
                                            'text-danger'
                                        )}
                                    />
                                }
                                onClick={async () => {
                                    if (!ingredient._id) {
                                        toast.error(
                                            'Unable to find the ingredient id'
                                        );
                                        return;
                                    }
                                    toast.promise(
                                        deleteIngredient(ingredient._id),
                                        {
                                            loading: 'Deleting...',
                                            success: (response) => {
                                                fetchIngredients();
                                                return response.message;
                                            },
                                            error: (err) => {
                                                console.log(err);
                                                return 'Unable to delete ingredient';
                                            },
                                        }
                                    );
                                }}
                            >
                                Delete
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            );
        },
    },
];

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    refreshIngredient: () => void;
    isLoading: boolean;
}

function DataTable<TData, TValue>({
    columns,
    data,
    refreshIngredient,
    isLoading,
}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });
    return (
        <div className="rounded-md border w-full">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext()
                                              )}
                                    </TableHead>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="w-full"
                            >
                                <CircularProgress
                                    size="sm"
                                    aria-label="Loading..."
                                    label="Loading..."
                                    color="warning"
                                />
                            </TableCell>
                        </TableRow>
                    ) : data.length > 0 ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && 'selected'}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="text-center"
                            >
                                No ingredients available. Click "Add New
                                Ingredient" to start adding.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

const IngredientTable = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isLoading, setIsLoading] = useState(true);
    const [ingredients, setIngredients] = useState<IIngredient[]>([]);

    const fetchIngredients = async () => {
        setIsLoading(true);
        const ingredientsList = await getAllIngredients();
        ingredientsList && setIngredients(ingredientsList as IIngredient[]);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchIngredients();
    }, []);
    const columns = getColumns(fetchIngredients);
    return (
        <>
            <div className="flex flex-col gap-5 items-center w-[90%] sm:w-[60%]">
                <DataTable
                    columns={columns}
                    data={ingredients}
                    refreshIngredient={fetchIngredients}
                    isLoading={isLoading}
                />
                <section className="flex w-full">
                    <Button onPress={onOpen} radius="sm">
                        Add New Ingreident
                    </Button>
                    <CreateIngredientModal
                        isOpen={isOpen}
                        onOpenChange={onOpenChange}
                        type="Create"
                        refreshIngredient={fetchIngredients}
                    />
                </section>
            </div>
        </>
    );
};

export default IngredientTable;
