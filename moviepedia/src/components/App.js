import ReviewList from "./ReviewList";
import { getReviews } from "../api.js";
import { useState, useEffect } from 'react';

function App() {
    const [order, setOrder] = useState('createdAt');
    const [items, setItems] = useState([]);
    const sortedItems = items.sort((a, b) => b[order] - a[order]);

    const handleNewestClick = () => setOrder('createdAt');
    const handleBestClick = () => setOrder('rating');
    
    const handleDelete = (id) => {
        const nextItems = items.filter((item) => item.id !== id);
        setItems(nextItems);
    }

    const handleLoad = async () => {
        const { reviews } = await getReviews();
        setItems(reviews);
    }

    useEffect(() => {
        handleLoad();
    }, []);

    return (
        <div>
            <div>
                <button onClick={ handleNewestClick }>최신순</button>
                <button onClick={ handleBestClick }>베스트순</button>
            </div>
            <ReviewList items={sortedItems} onDelete={ handleDelete }/>
        </div>
    );
}

export default App;