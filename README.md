# 토이 프로젝트 Wrtnrd의 프론트엔드
- `Wrtnrd`는 Write and read의 약자로 말 그대로 쓰고 읽는다는 의미

## 사용 기술과 사용 이유
### Next.js: 14.1.3
- 서버 컴포넌트가 기본인 환경과 app 라우팅에 대한 경험
### @tanstack/react-query: 5.28.4
- 많이 사용되는 데이터 페칭 라이브러리
- 단순한 페칭 넘어서 여러가지 편의 기능 제공
- `queryKey`를 사용해 편리하게 데이터 최신화 가능
- 무한 스크롤 구현이 비교적 간편([관련 블로그](https://literate-t.tistory.com/444))
### axios: 1.6.8
  - 많이 사용되는 데이터 페칭 라이브러리
  - `interceptor` 설정이 간편
### react-icons: 5.2.1
  - 편리한 `react` 전용 아이콘 사용
### react-toastify: 10.0.4
- 편리한 `toast` 사용
### recoil: 0.7.7
- 비교적 익숙한 상태 관리 라이브러리
- 공식적으로 유지보수가 중단되면 zotai, zustand 등으로 변경 가능
### formik: 2.4.5(입력 필드 관리 라이브러리)
- 입력 필드 검증 등의 편의 기능 제공

## 인증
- `JWT` 사용
- `JWT` 정보는 쿠키에 포함
  - `HttpOnly`, `Secure`
- 액세스 토큰이 만료되면 리프레시 토큰으로 재발급
  - 보안을 위해 리프레시 토큰도 재발급
## TODO
- 배포
  - `Vercel`
- 관리자 모드
  - 게시물 삭제
  - 토큰 무효화
