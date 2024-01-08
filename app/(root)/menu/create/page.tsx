import DrinkForm from '@/components/shared/DrinkForm';
import React from 'react';

const CreateMenu = () => {
    return (
        <>
            <section className=" bg-orange-100 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
                <h3 className="wrapper h3-bold text-center sm:text-left">
                    Create Drink
                </h3>
            </section>
            <div className="wrapper my-8">
                <DrinkForm />
            </div>
        </>
    );
};

export default CreateMenu;
