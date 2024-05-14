import { PostProps } from "@/interfaces/postInterface";

export const data: PostProps[] = [
  {
    id: 1,
    title: "용사의 최종 적은 용사의 아버지?",
    author: "치지직",
    desc: "좋아하는 것과 잘하는 것",
    body: `침착맨이 한 게임을 보았는데 생각보다 게임이 게임다워서 놀란
          게임이었다. 오히려 열받았던 침착맨의 거지 같은 더빙이었다. 오랜
          구독자는 그것도 재미 포인트로 봤겠지만 나는 엿 같았다. 하지만 보던
          거라서 끝까지 보기로 결정했고 결말이 궁금했으며 굳이 다른 스트리머
          것을 찾아보고 싶진 않았다. 이것의 대형 유튜버의 힘!?`,
    createdAt: new Date().toLocaleDateString("ko", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
  },
  {
    id: 2,
    title: "불효자",
    author: "개쿤",
    desc: "좋아하는 것과 잘하는 것",
    body: `스스로 불효자라고 생각한다. 불효자가 아니라고 해도, 나는 일반적인 자식이 아니었지. 
    내가 어느 정도 잘 돼서 맛있는 것도 사드리고 여행도 보내드리고 이런 걸로 효도를 좀 하고 싶다.`,
    createdAt: new Date().toLocaleDateString("ko", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
  },
];
