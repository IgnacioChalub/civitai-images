import { useState } from 'react'
import './Card.css'
import { CardItem } from './types'

type CardProps = {
    item: CardItem,
    removeElement: (id: string) => void,
}

const Card = ({ item, removeElement }: CardProps) => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isImageLoaded, setImageLoaded] = useState(false);


    const hideImage = () => {
        toggleMenu()
        removeElement(item.id)
    }

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen)
    }

    const stats = [
        { emoji: '👍', value: item.stats.likeCount },
        { emoji: '😂', value: item.stats.laughCount }, 
        { emoji: '❤️', value: item.stats.laughCount }, 
        { emoji: '😢 ', value: item.stats.laughCount }, 
        { emoji: '⚡', value: item.stats.commentCount, className: 'special-stat'}, 
    ]

    const roundStat = (stat: number): string => {
        if (stat > 999) {
            return `${(stat / 1000).toFixed(1)}k`;
        } else {
            return stat.toString();
        }
    };
    
    return (
        <div className="card-container">
            {!isImageLoaded && <div className="loading-placeholder"></div>}
            <img
                className="image"
                src={item.url}
                alt={item.id}
                onLoad={() => setImageLoaded(true)}
                style={{ display: isImageLoaded ? 'block' : 'none' }}
            />
            <div className="top-right-menu">
                <button className="menu-button" onClick={toggleMenu}>
                    ⋮
                </button>
                {isMenuOpen && (
                    <ul className="menu">
                        <li onClick={hideImage}>Hide this image</li>
                        <li onClick={toggleMenu}>Close this menu</li>
                    </ul>
                )}
            </div>
            <div className="bottom-container">
            {stats.map((stat, _) => (
                <p className={stat.className}>
                    {stat.emoji} {roundStat(stat.value)}
                </p>
            ))}
            </div>
        </div>
    );
}

export default Card