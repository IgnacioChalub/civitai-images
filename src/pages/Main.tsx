
import './Main.css'
import { useRef, useEffect, useCallback, useMemo } from 'react';
import { useInfiniteQuery, useQueryClient } from 'react-query';
import Masonry from './Masonry';
import Spinner from './Spinner';
import { CardReq, CardItem } from './types';
import { fetchImages } from './api';


const Main = () => {
    const queryClient = useQueryClient();
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery<CardReq>(
        ['images'],
        fetchImages,
        {
            getNextPageParam: (lastPage) => lastPage.metadata.nextPage,
        }
    );

    const sentinelRef = useRef<HTMLDivElement>(null);

    const handleIntersection = useCallback((entries: any[]) => {
        const entry = entries[0];
        if (entry.isIntersecting && hasNextPage) {
            fetchNextPage();
        }
    }, [fetchNextPage, hasNextPage]);

    const removeElement = (id: string) => {
        const updatedPages = data?.pages.map(page => {
            const updatedItems = page.items.filter(item => item.id !== id);
            return {
                ...page,
                items: updatedItems,
            };
        });
        
        queryClient.setQueryData(['images'], (oldData: any) => ({
            ...oldData,
            pages: updatedPages,
        }));
    };

    const allItems = useMemo(() => {
        return data?.pages.reduce((acc, page) => acc.concat(page.items), [] as CardItem[]) || [];
    }, [data]);

    useEffect(() => {
        const observer = new IntersectionObserver(handleIntersection, {
            root: null,
            rootMargin: '0px',
            threshold: 0.25,
        });
        const currentSentinel = sentinelRef.current;
        if (currentSentinel) {
            observer.observe(currentSentinel);
        }
        return () => {
            if (currentSentinel) {
                observer.unobserve(currentSentinel);
            }
            observer.disconnect();
        };
    }, [handleIntersection, sentinelRef]);
    

    if (status === 'loading') {
        return (
            <div className='main-container'>
                <div className='spinner-wrapper'>
                    <Spinner />;
                </div>
            </div>
        )
    }

    return (
        <div className='main-container'>
            <Masonry
                items={allItems}
                removeElement={removeElement}
            />
            {hasNextPage && (
                <div ref={sentinelRef} className='refetch-spinner-wrapper'>
                    {isFetchingNextPage ? <Spinner /> : '' }
                </div>
            )}
        </div>
    );
};

export default Main;
