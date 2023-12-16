import { Outlet } from 'react-router-dom';

import Directory from '../../components/directory/directory.component';

const Home = () => {
  const categories = [
    {
      id: 1,
      title: 'hats',
      imageUrl: 'https://thumbs.dreamstime.com/b/handsome-confident-man-black-suit-hat-dark-background-man-beauty-concept-handsome-confident-man-black-suit-hat-145558291.jpg',
    },
    {
      id: 2,
      title: 'jackets',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStwBJ7StFgezVxxL4Gt5jFxXdJ--0QxQmAPQ&usqp=CAU',
    },
    {
      id: 3,
      title: 'sneakers',
      imageUrl: 'https://images.bestsellerclothing.in/data/JJ/16-jan-2023/284552702_g0.jpg?width=1080&height=1355&mode=fill&fill=blur&format=auto',
    },
    {
      id: 4,
      title: 'womens',
      imageUrl: 'https://www.theinspiringjournal.com/wp-content/uploads/2023/03/A-Step-by-Step-Guide-on-How-to-Plan-a-Photoshoot-for-Clothing-Brands.jpg',
    },
    {
      id: 5,
      title: 'mens',
      imageUrl: 'https://expertphotography.b-cdn.net/wp-content/uploads/2022/03/Male-Poses-Studio.jpg',
    },
  ];

  return (
    <div>
      <Outlet />
      <Directory categories={categories} />;
    </div>
  ) 
  
};

export default Home;
