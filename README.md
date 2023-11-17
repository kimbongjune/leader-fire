# 코드인디자인 Frontend Template

- 프로젝트를 시작하기전에 이 Repository를 사용해주세요.

# 기술 스택

- React + Next + Redux Tool Kit + RTK Query

# 폴더링 구조

- `/src`
  - `index.tsx`: 메인페이지
  - `/app`: 프로젝트에 글로벌한 영향을 미치는 것들
    - `store.ts`: redux store 설정
    - `/models`: 프로젝트에서 관리하는 모델들을 정의 ex) PostModel.ts, CommentModel.ts
  - `/common`: 여러곳에서 재활용해야하는 것들 ex) hooks, generic components, utils, etc
  - `/features`: 기능별로 폴더링
    - `/posts`: 하나의 기능 폴더 (포스트와 관련된 모든것들을 이 폴더안에 넣음)
      - `/components`: 컴포넌트는 여러개의 작은 컴포넌트로 나뉠 수 있어서 한번 더 폴더링함
        - `Posts.tsx`: Dumb Component (단순 UI를 보여주는 역할만함, 비즈니스 로직이 포함되면 안됨)
      - `PostsContainer.tsx`: 컨테이너 컴포넌트는 비즈니스 로직을 다루며, API Fetch, 조건에 따른 UI 렌더링 분기 등을 처리한다.
      - `postsApi.ts`: 서버 데이터 비동기 처리를 위한 API 파일 (RTK Query)

# 네이밍

- 컴포넌트 파일명은 `PascalCase`로 작성 (Pokemon.ts)
- 모델명은 `PascalCase`로 작성 (PokemonModel.ts)
- 컨테이너 컴포넌트 파일명은 `PascalCase`로 작성 (PokemonContainer.tsx)
- 그 외는 `camelCase`가 기본 (pokemonsApi.ts)

# 주의사항

- 유지보수와 가독성을 위해서 하나의 파일이 100라인을 넘기지 않도록 한다.
  - 100라인을 넘긴다면 파일을 나눠서 작성한다.
- 컴포넌트 작성시 항상 재활용 가능성을 염두해두고 작성한다.

# 참고 레퍼런스

- https://javascript.plainenglish.io/redux-toolkit-the-standard-way-to-write-redux-dcfb372202b8
