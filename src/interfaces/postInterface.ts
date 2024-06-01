export interface PostProps {
  id: number;
  title: string;
  author: string;
  description: string;
  body: string;
  createdAt: string;
  like: boolean;
}

export interface PostBoxProps {
  post?: PostProps;
}
