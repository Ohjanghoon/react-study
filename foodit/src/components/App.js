import FoodList from './FoodList';
// import mockItems from '../mock.json';
import { getFoods } from '../api.js';
import { useState } from'react';

function App() {
    const [items, setItems] = useState([]);
    const [order, setOrder] = useState('createdAt');

    const sortedItems = items.sort((a, b) => b[order] - a[order]);

    const handleNewestClick = () => setOrder('createdAt');
    const handleCalorieClick = () => setOrder('calorie');

    const handleDelete = (id) => {
        const nextItems = items.filter((item) => item.id !== id);
        setItems(nextItems);
    }

    const handleLoadClock = async () => {
        const { foods } = await getFoods();
        setItems(foods);
    }
    return (
        <div>
            <div>
                <button onClick={handleNewestClick}>최신순</button>
                <button onClick={handleCalorieClick}>칼로리순</button>
            </div>
            <FoodList items={sortedItems} onDelete={handleDelete}/>
            <button onClick={ handleLoadClock }>불러오기</button>
        </div>
    )
}

export default App;