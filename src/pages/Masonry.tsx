import './Masonry.css'
import { useState, useEffect, useCallback } from 'react';
import Card from './Card';
import { CardItem, ScreenWidth } from './types';

type MasonryProps = {
    items: CardItem[];
    removeElement: (id: string) => void;
};

const Masonry = ({ items, removeElement }: MasonryProps) => {
    const [columnCount, setColumnCount] = useState<number>(4);
    const [columns, setColumns] = useState<Array<CardItem[]>>([]);

    const getColumnCount = useCallback(() => {
        const width = window.innerWidth;
        if (width >= ScreenWidth.DESKTOP) {
            return 4;
        } else if (width >= ScreenWidth.TABLET) {
            return 3;
        } else if (width >= ScreenWidth.MOBILE) {
            return 2;
        } else {
            return 1;
        }
    }, []);

    const handleResize = useCallback(() => {
        setColumnCount(getColumnCount());
    }, [getColumnCount]);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [handleResize]);

    const organizeItemsIntoColumns = useCallback(() => {
        const newColumns: Array<CardItem[]> = Array.from({ length: columnCount }, () => []);
        items.forEach((item, index) => {
            const columnIndex = index % columnCount;
            newColumns[columnIndex].push(item);
        });
        setColumns(newColumns);
    }, [items, columnCount]);

    useEffect(() => {
        organizeItemsIntoColumns();
    }, [items, columnCount, organizeItemsIntoColumns]);

    return (
        <div className="masonry-container">
            {columns.map((column, index) => (
                <div key={index} className="column">
                    {column.map((item) => (
                        <Card key={item.id} item={item} removeElement={removeElement} />
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Masonry;
