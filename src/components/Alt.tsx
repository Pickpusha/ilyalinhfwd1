import React from 'react';

interface BioProps {
    alt: string;
}

const Bio: React.FC<BioProps> = ({ alt }) => {
    return (
        <div>
            <p>Alternative Text: {alt}</p>
        </div>
    );
};

export default Bio;
