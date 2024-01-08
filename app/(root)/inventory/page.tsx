import IngredientTable from '@/components/shared/IngredientTable';
import React from 'react';
import { Toaster } from 'react-hot-toast';

const InventoryPage = () => {
    return (
        <>
            <Toaster />
            <div>
                <section className=" bg-orange-100 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
                    <h3 className="wrapper h3-bold text-center">
                        Manage Inventory
                    </h3>
                </section>
                <div className="wrapper my-8 flex justify-center">
                    <IngredientTable />
                </div>
            </div>
        </>
    );
};

export default InventoryPage;
