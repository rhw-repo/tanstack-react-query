export interface NewPost {
  title: string;
  body: string;
  userId?: number;
}

export interface Post extends NewPost {
  id: number;
}
