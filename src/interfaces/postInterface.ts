export interface PostProps {
  id: number;
  title: string;
  author: string;
  description: string;
  body: string;
  createdAt: string;
}

export interface PostBoxProps {
  post?: PostProps;
}
