import React from "react";
import { useGetRandomPlaces } from "../hooks/useGetRandomPlaces";
import type { Order } from "../types/commonTypes";



interface CitiesByPopulationProps {
    title?: string;
    orderBy?: Order;
}

const CitiesByPopulation: React.FC<CitiesByPopulationProps> = ({
    title = "Cities by population",
    orderBy = "DESC",
}) => {
    const { data, isLoading, isError, } = useGetRandomPlaces(orderBy);

    if (isLoading) {
        return (
            <section>
                <h3>{title}</h3>
                <p>Loading...</p>
            </section>
        );
    }

    if (isError) {
        const message = "Something went wrong while fetching places.";
        return (
            <section>
                <h3>{title}</h3>
                <p style={{ color: "var(--color-danger, #b00020)" }}>Error: {message}</p>
            </section>
        );
    }

    const places = data?.data ?? [];


    return (
        <section>
            <h3>{title}</h3>
            {places.length === 0 ? (
                <p>No cities found</p>
            ) : (
                <ul>
                    {places.map((p) => (
                        <li key={p.id}>{p.name}</li>
                    ))}
                </ul>
            )}
        </section>
    );
};

export default CitiesByPopulation;
