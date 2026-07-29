import { useState } from 'react'
import { ArrowLeft, Gamepad2 } from 'lucide-react'

import './FrivPortal.css'

const GAMES = [
  // Cooking & restaurant
  {
    id: 'funny-cooking-camp',
    title: 'Funny Cooking Camp',
    thumbnailUrl: 'https://img.gamedistribution.com/492bf68e9e054b1da34b25e5cbc24a40-512x512.jpeg',
    iframeUrl: 'https://html5.gamedistribution.com/492bf68e9e054b1da34b25e5cbc24a40/',
  },
  {
    id: 'street-food-master-chef',
    title: 'Street Food Master Chef',
    thumbnailUrl: 'https://img.gamedistribution.com/e1c672d46252474d8a6555940ab9ff64-512x512.jpg',
    iframeUrl: 'https://html5.gamedistribution.com/e1c672d46252474d8a6555940ab9ff64/',
  },
  {
    id: 'chef-hero',
    title: 'Chef Hero',
    thumbnailUrl: 'https://img.gamedistribution.com/b249ed92f2b44c99a6cd8d04e0884b40-512x512.jpeg',
    iframeUrl: 'https://html5.gamedistribution.com/b249ed92f2b44c99a6cd8d04e0884b40/',
  },
  {
    id: 'open-restaurant',
    title: 'Open Restaurant',
    thumbnailUrl: 'https://img.gamedistribution.com/ff89ffcef7764c5aa0bf62846f871060-512x512.jpeg',
    iframeUrl: 'https://html5.gamedistribution.com/ff89ffcef7764c5aa0bf62846f871060/',
  },
  {
    id: 'cooking-festival',
    title: 'Cooking Festival',
    thumbnailUrl: 'https://imgs.crazygames.com/cooking-festival_16x9/20260217034438/cooking-festival_16x9-cover?metadata=none&quality=100&width=600&height=400&fit=crop',
    iframeUrl: 'https://www.crazygames.com/embed/cooking-festival',
  },
  {
    id: 'magic-kitchen-merge-game',
    title: 'Magic Kitchen: Merge Game',
    thumbnailUrl: 'https://imgs.crazygames.com/merge-cooking-game_16x9/20250131044303/merge-cooking-game_16x9-cover?metadata=none&quality=100&width=600&height=400&fit=crop',
    iframeUrl: 'https://www.crazygames.com/embed/merge-cooking-game',
  },
  {
    id: 'bakery-manager-store-simulator',
    title: 'Bakery Manager: Store Simulator',
    thumbnailUrl: 'https://imgs.crazygames.com/bakery-manage-store-simulator_16x9/20250708021331/bakery-manage-store-simulator_16x9-cover?metadata=none&quality=100&width=600&height=400&fit=crop',
    iframeUrl: 'https://www.crazygames.com/embed/bakery-manage-store-simulator',
  },
  // Baking & sweets
  {
    id: 'yummy-cupcake',
    title: 'Yummy Cupcake',
    thumbnailUrl: 'https://img.gamedistribution.com/c02cb358f1f147d8ba6469230a5e01b7-512x512.jpeg',
    iframeUrl: 'https://html5.gamedistribution.com/c02cb358f1f147d8ba6469230a5e01b7/',
  },
  {
    id: 'bakery-shop',
    title: 'Bakery Shop',
    thumbnailUrl: 'https://img.gamedistribution.com/2c0ad1dfed9a41fca68546e62282709b-512x512.jpeg',
    iframeUrl: 'https://html5.gamedistribution.com/2c0ad1dfed9a41fca68546e62282709b/',
  },
  {
    id: 'carrot-cake',
    title: 'Carrot Cake',
    thumbnailUrl: 'https://img.gamedistribution.com/7cba20d2789a4ae3b883dfd80bedaa46-512x512.jpeg',
    iframeUrl: 'https://html5.gamedistribution.com/7cba20d2789a4ae3b883dfd80bedaa46/',
  },
  {
    id: 'strawberry-shortcake',
    title: 'Strawberry Shortcake',
    thumbnailUrl: 'https://img.gamedistribution.com/822c7548934c460c8c06d7121f82545b-512x512.jpg',
    iframeUrl: 'https://html5.gamedistribution.com/822c7548934c460c8c06d7121f82545b/',
  },
  {
    id: 'piece-of-cake-merge-and-bake',
    title: 'Piece of Cake: Merge and Bake',
    thumbnailUrl: 'https://imgs.crazygames.com/piece-of-cake-merge-and-bake_16x9/20260311103150/piece-of-cake-merge-and-bake_16x9-cover?metadata=none&quality=100&width=600&height=400&fit=crop',
    iframeUrl: 'https://www.crazygames.com/embed/piece-of-cake-merge-and-bake',
  },
  {
    id: 'papas-cupcakeria',
    title: "Papa's Cupcakeria",
    thumbnailUrl: 'https://imgs.crazygames.com/games/papas-cupcakeria/cover-1676906717857.png?metadata=none&quality=100&width=600&height=400&fit=crop',
    iframeUrl: 'https://www.crazygames.com/embed/papas-cupcakeria',
  },
  {
    id: 'merge-cakes',
    title: 'Merge Cakes',
    thumbnailUrl: 'https://imgs.crazygames.com/games/merge-cakes/cover-1604566628681.png?metadata=none&quality=100&width=600&height=400&fit=crop',
    iframeUrl: 'https://www.crazygames.com/embed/merge-cakes',
  },
  // Dress-up & fashion
  {
    id: 'sery-shopping-day-dress-up',
    title: 'Sery Shopping Day Dress Up',
    thumbnailUrl: 'https://img.gamedistribution.com/a045f6e0a7a042f5bc5590894f537016.jpg',
    iframeUrl: 'https://html5.gamedistribution.com/a045f6e0a7a042f5bc5590894f537016/',
  },
  {
    id: 'arabian-princess-dress-up-game',
    title: 'Arabian Princess Dress Up',
    thumbnailUrl: 'https://img.gamedistribution.com/79f1003c6eed4541b0d8501b188a3b6a-512x512.jpeg',
    iframeUrl: 'https://html5.gamedistribution.com/79f1003c6eed4541b0d8501b188a3b6a/',
  },
  {
    id: 'mabel-dress-up-game',
    title: 'Mabel Dress Up',
    thumbnailUrl: 'https://img.gamedistribution.com/8eea12a0cccf461b8d71f5605631875d.jpg',
    iframeUrl: 'https://html5.gamedistribution.com/8eea12a0cccf461b8d71f5605631875d/',
  },
  {
    id: 'princess-dress-up-run',
    title: 'Princess Dress Up Run',
    thumbnailUrl: 'https://img.gamedistribution.com/cd175ea55efa4e83b6fd63bdbb7881a2-512x512.jpg',
    iframeUrl: 'https://html5.gamedistribution.com/cd175ea55efa4e83b6fd63bdbb7881a2/',
  },
  {
    id: 'dress-up-girls',
    title: 'Dress Up Girls',
    thumbnailUrl: 'https://img.gamedistribution.com/6b84c740171d458e86fa8c44095b2ac7-512x512.jpeg',
    iframeUrl: 'https://html5.gamedistribution.com/6b84c740171d458e86fa8c44095b2ac7/',
  },
  {
    id: 'girl-dress-up',
    title: 'Girl Dress Up',
    thumbnailUrl: 'https://imgs.crazygames.com/girl-dress-up-games-online/20230825112245/girl-dress-up-games-online-cover?metadata=none&quality=100&width=600&height=400&fit=crop',
    iframeUrl: 'https://www.crazygames.com/embed/girl-dress-up-games-online',
  },
  {
    id: 'anime-girls-dress-up-games',
    title: 'Anime Girls Dress Up',
    thumbnailUrl: 'https://imgs.crazygames.com/anime-girls-dress-up-games_16x9/20231120032514/anime-girls-dress-up-games_16x9-cover?metadata=none&quality=100&width=600&height=400&fit=crop',
    iframeUrl: 'https://www.crazygames.com/embed/anime-girls-dress-up-games',
  },
  {
    id: 'fashion-battle',
    title: 'Fashion Battle',
    thumbnailUrl: 'https://imgs.crazygames.com/fashion-battle_16x9/20250116042115/fashion-battle_16x9-cover?metadata=none&quality=100&width=600&height=400&fit=crop',
    iframeUrl: 'https://www.crazygames.com/embed/fashion-battle',
  },
  {
    id: 'fashion-week-2025',
    title: 'Fashion Week 2025',
    thumbnailUrl: 'https://imgs.crazygames.com/fashion-week-2025_16x9/20250320094425/fashion-week-2025_16x9-cover?metadata=none&quality=100&width=600&height=400&fit=crop',
    iframeUrl: 'https://www.crazygames.com/embed/fashion-week-2025',
  },
  {
    id: 'back-to-school-uniforms-edition',
    title: 'Back to School: Uniforms Edition',
    thumbnailUrl: 'https://imgs.crazygames.com/back-to-school-uniforms-edition_16x9/20240927072437/back-to-school-uniforms-edition_16x9-cover?metadata=none&quality=100&width=600&height=400&fit=crop',
    iframeUrl: 'https://www.crazygames.com/embed/back-to-school-uniforms-edition',
  },
  // Makeup & makeover
  {
    id: 'college-girls-team-makeover',
    title: 'College Girls Team Makeover',
    thumbnailUrl: 'https://img.gamedistribution.com/90159007fdbb4e20a3e56e326057d606-512x512.jpeg',
    iframeUrl: 'https://html5.gamedistribution.com/90159007fdbb4e20a3e56e326057d606/',
  },
  {
    id: 'prinxy-winterella',
    title: 'Prinxy Winterella',
    thumbnailUrl: 'https://img.gamedistribution.com/5d39f173927f4dee85d41d9ce6718aed-512x512.jpg',
    iframeUrl: 'https://html5.gamedistribution.com/5d39f173927f4dee85d41d9ce6718aed/',
  },
  {
    id: 'makeup-fruits',
    title: 'Makeup Fruits',
    thumbnailUrl: 'https://img.gamedistribution.com/42c3d8e051fd4ed191cdaef81a0ab339-512x512.jpg',
    iframeUrl: 'https://html5.gamedistribution.com/42c3d8e051fd4ed191cdaef81a0ab339/',
  },
  {
    id: 'makeup-trends-then-and-now',
    title: 'Makeup Trends: Then and Now',
    thumbnailUrl: 'https://imgs.crazygames.com/makeup-trends-then-and-now_16x9/20240509095606/makeup-trends-then-and-now_16x9-cover?metadata=none&quality=100&width=600&height=400&fit=crop',
    iframeUrl: 'https://www.crazygames.com/embed/makeup-trends-then-and-now',
  },
  {
    id: 'new-year-makeup-trends',
    title: 'New Year Makeup Trends',
    thumbnailUrl: 'https://imgs.crazygames.com/new-year-makeup-trends_16x9/20240117073918/new-year-makeup-trends_16x9-cover?metadata=none&quality=100&width=600&height=400&fit=crop',
    iframeUrl: 'https://www.crazygames.com/embed/new-year-makeup-trends',
  },
  {
    id: 'diy-makeup-salon-spa-makeover',
    title: 'DIY Makeup Salon: Spa Makeover',
    thumbnailUrl: 'https://imgs.crazygames.com/diy-makeup-salon-spa-makeover_16x9/20240829022500/diy-makeup-salon-spa-makeover_16x9-cover?metadata=none&quality=100&width=600&height=400&fit=crop',
    iframeUrl: 'https://www.crazygames.com/embed/diy-makeup-salon-spa-makeover',
  },
  // Salon & spa
  {
    id: 'pet-salon',
    title: 'Pet Salon',
    thumbnailUrl: 'https://img.gamedistribution.com/ca0dd2ea005944609eb4341ee98a9dfb-512x512.jpg',
    iframeUrl: 'https://html5.gamedistribution.com/ca0dd2ea005944609eb4341ee98a9dfb/',
  },
  {
    id: 'pet-salon-2',
    title: 'Pet Salon 2',
    thumbnailUrl: 'https://img.gamedistribution.com/58dbb84a1af142eb96003ca794cd6861-512x512.jpg',
    iframeUrl: 'https://html5.gamedistribution.com/58dbb84a1af142eb96003ca794cd6861/',
  },
  {
    id: 'nail-salon-3d',
    title: 'Nail Salon 3D',
    thumbnailUrl: 'https://img.gamedistribution.com/ac315891cc6e4c738744eb8071c016a4-512x512.jpeg',
    iframeUrl: 'https://html5.gamedistribution.com/ac315891cc6e4c738744eb8071c016a4/',
  },
  {
    id: 'my-nail-art-salon',
    title: 'My Nail Art Salon',
    thumbnailUrl: 'https://img.gamedistribution.com/9cabe9bc05db43d5a6d03c2a5bc93c1c.jpg',
    iframeUrl: 'https://html5.gamedistribution.com/9cabe9bc05db43d5a6d03c2a5bc93c1c/',
  },
  {
    id: 'nail-salon',
    title: "Girls' Nail Salon",
    thumbnailUrl: 'https://imgs.crazygames.com/girls-nail-salon---nail-games_16x9/20250319081243/girls-nail-salon---nail-games_16x9-cover?metadata=none&quality=100&width=600&height=400&fit=crop',
    iframeUrl: 'https://www.crazygames.com/embed/girls-nail-salon---nail-games',
  },
  // Home & room decoration
  {
    id: 'baby-room-designers',
    title: 'Baby Room Designers',
    thumbnailUrl: 'https://img.gamedistribution.com/b614fc310bb3437fab102a516a5f7fb5-512x384.jpeg',
    iframeUrl: 'https://html5.gamedistribution.com/b614fc310bb3437fab102a516a5f7fb5/',
  },
  {
    id: 'doll-house-games-design-and-decoration',
    title: 'Doll House: Design & Decoration',
    thumbnailUrl: 'https://img.gamedistribution.com/61fb942fc9e745b88f1feed1193f05ff-512x512.jpeg',
    iframeUrl: 'https://html5.gamedistribution.com/61fb942fc9e745b88f1feed1193f05ff/',
  },
  {
    id: 'home-design-decorate-house',
    title: 'Home Design: Decorate House',
    thumbnailUrl: 'https://imgs.crazygames.com/home-design---decorate-house_16x9/20251212022109/home-design---decorate-house_16x9-cover?metadata=none&quality=100&width=600&height=400&fit=crop',
    iframeUrl: 'https://www.crazygames.com/embed/home-design---decorate-house',
  },
  {
    id: 'interior-designer-unpacking-house',
    title: 'Interior Designer: Unpacking House',
    thumbnailUrl: 'https://imgs.crazygames.com/interior-designer-unpacking-house_16x9/20250919061757/interior-designer-unpacking-house_16x9-cover?metadata=none&quality=100&width=600&height=400&fit=crop',
    iframeUrl: 'https://www.crazygames.com/embed/interior-designer-unpacking-house',
  },
  {
    id: 'designville-merge-design',
    title: 'Designville: Merge & Design',
    thumbnailUrl: 'https://imgs.crazygames.com/designville-merge-design_16x9/20260710075651/designville-merge-design_16x9-cover?metadata=none&quality=100&width=600&height=400&fit=crop',
    iframeUrl: 'https://www.crazygames.com/embed/designville-merge-design',
  },
  // A little variety: puzzle & board games
  {
    id: 'bubble-shooter',
    title: 'Bubble Shooter',
    thumbnailUrl: 'https://cdn.htmlgames.com/BubbleShooter/img/icon/image-300x200.jpg',
    iframeUrl: 'https://cdn.htmlgames.com/BubbleShooter/',
  },
  {
    id: 'mahjong-classic',
    title: 'Mahjong Classic',
    thumbnailUrl: 'https://cdn.htmlgames.com/MahjongClassic/img/icon/image-300x200.jpg',
    iframeUrl: 'https://cdn.htmlgames.com/MahjongClassic/',
  },
  {
    id: 'sudoku',
    title: 'Sudoku',
    thumbnailUrl: 'https://cdn.htmlgames.com/Sudoku/img/icon/image-300x200.jpg',
    iframeUrl: 'https://cdn.htmlgames.com/Sudoku/',
  },
  {
    id: 'word-search',
    title: 'Word Search',
    thumbnailUrl: 'https://cdn.htmlgames.com/WordSearch/img/icon/image-300x200.jpg',
    iframeUrl: 'https://cdn.htmlgames.com/WordSearch/',
  },
  {
    id: 'connect-four',
    title: 'Connect Four',
    thumbnailUrl: 'https://cdn.htmlgames.com/ConnectFour/img/icon/image-300x200.jpg',
    iframeUrl: 'https://cdn.htmlgames.com/ConnectFour/',
  },
  {
    id: 'minesweeper',
    title: 'Minesweeper',
    thumbnailUrl: 'https://cdn.htmlgames.com/Minesweeper/img/icon/image-300x200.jpg',
    iframeUrl: 'https://cdn.htmlgames.com/Minesweeper/',
  },
  {
    id: 'tripeaks-solitaire',
    title: 'Tripeaks Solitaire',
    thumbnailUrl: 'https://cdn.htmlgames.com/TripeaksSolitaire/img/icon/image-300x200.jpg',
    iframeUrl: 'https://cdn.htmlgames.com/TripeaksSolitaire/',
  },
  {
    id: 'backgammon',
    title: 'Backgammon',
    thumbnailUrl: 'https://cdn.htmlgames.com/Backgammon/img/icon/image-300x200.jpg',
    iframeUrl: 'https://cdn.htmlgames.com/Backgammon/',
  },
]

export default function FrivPortal() {
  const [activeGame, setActiveGame] = useState(null)

  return (
    <div className="friv-portal">
      {activeGame ? (
        <div className="friv-play">
          <div className="friv-play-bar">
            <button
              type="button"
              className="friv-back-button"
              onClick={() => setActiveGame(null)}
            >
              <ArrowLeft size={16} />
              Kembali ke Daftar Game
            </button>
            <span className="friv-play-title">{activeGame.title}</span>
          </div>

          <div className="friv-iframe-wrapper">
            <iframe
              key={activeGame.id}
              src={activeGame.iframeUrl}
              title={activeGame.title}
              className="friv-iframe"
              allow="fullscreen; autoplay"
              allowFullScreen
            />
          </div>
        </div>
      ) : (
        <div className="friv-grid">
          {GAMES.map((game) => (
            <button
              key={game.id}
              type="button"
              className="friv-card"
              onClick={() => setActiveGame(game)}
            >
              <span className="friv-thumb-wrap">
                <img
                  src={game.thumbnailUrl}
                  alt={game.title}
                  className="friv-thumb"
                  loading="lazy"
                />
                <span className="friv-thumb-overlay">
                  <Gamepad2 size={22} />
                </span>
              </span>
              <span className="friv-card-title">{game.title}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
