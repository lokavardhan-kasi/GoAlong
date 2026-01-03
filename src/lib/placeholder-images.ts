
const data = {
  "placeholderImages": [
    {
      "id": "user1",
      "description": "Avatar of a smiling man",
      "imageUrl": "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "imageHint": "person face"
    },
    {
      "id": "user2",
      "description": "Avatar of a woman with glasses",
      "imageUrl": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "imageHint": "person face"
    },
    {
      "id": "user3",
      "description": "Avatar of a person with short hair",
      "imageUrl": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "imageHint": "person face"
    },
    {
      "id": "user4",
      "description": "Avatar of a woman smiling",
      "imageUrl": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "imageHint": "person face"
    },
    {
      "id": "car1",
      "description": "A modern blue sedan on the road",
      "imageUrl": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "imageHint": "yellow car"
    },
    {
      "id": "car2",
      "description": "A white SUV parked in a city",
      "imageUrl": "https://images.unsplash.com/photo-1514316454349-7629a42da93d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "imageHint": "red car"
    },
    {
      "id": "car3",
      "description": "A red compact car driving on a highway",
      "imageUrl": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "imageHint": "black car"
    },
    {
      "id": "car4",
      "description": "A gray compact car",
      "imageUrl": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "imageHint": "gray car"
    },
    {
      "id": "hero",
      "description": "A group of friends in a car",
      "imageUrl": "https://images.unsplash.com/photo-1533613220915-609f661a6fe1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "imageHint": "people car"
    },
    {
      "id": "hero-dog",
      "description": "A happy dog in a car",
      "imageUrl": "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "imageHint": "person dog"
    },
    {
      "id": "hero-delivery",
      "description": "A person holding a delivery package",
      "imageUrl": "https://images.unsplash.com/photo-1618037238210-9ebd75467afd?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "imageHint": "delivery package"
    },
    {
      "id": "map",
      "description": "A map of a city showing routes",
      "imageUrl": "https://images.unsplash.com/photo-1528740561639-624a733c3a37?q=80&w=1991&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "imageHint": "route map"
    }
  ]
};

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

export const PlaceHolderImages: ImagePlaceholder[] = data.placeholderImages;
