export interface Post {
  _createdAt: string | number | Date;
  _id: string;
  _createAt: string;
  title: string;
  author: {
    name: string;
    image: string;
  };
  comments: Comment[];
  article: Article[];
  description: string;
  mainImage: {
    asset: {
      url: string;
    };
  };
  slug: {
    current: string;
  };
  body: [object];
}
export interface Cyberpost {
  _createdAt: string | number | Date;
  _id: string;
  _createAt: string;
  title: string;
  author: {
    name: string;
    image: string;
  };
  comments: Comment[];
  article: Article[];
  description: string;
  mainImage: {
    asset: {
      url: string;
    };
  };
  slug: {
    current: string;
  };
  body: [object];
}

export interface Comment {
  approved: boolean;
  comment: string;
  email: string;
  name: string;
  post: {
    _ref: string;
    _type: string;
  };
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
}
export interface Article {
  article: string;
  content: string;
  email: string;
  name: string;
  post: {
    _ref: string;
    _type: string;
  };
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
}
