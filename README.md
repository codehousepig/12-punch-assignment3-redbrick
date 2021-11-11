# [Assignment 3] 레드브릭
원티드x위코드 백엔드 프리온보딩 과제3
- 과제 출제 기업 정보
  - 기업명 : 레드브릭
  - [레드브릭 사이트](https://wizlab.net/)
  - [채용공고 링크](https://wizschool.notion.site/22564a15d2da40ab9d5812c68dd7ff3d)

## Members
|이름   |github                   |담당 기능|
|-------|-------------------------|--------------------|
|김남형 |[42seouler](https://github.com/)   | 게임 제작   |
|김서경 |[riley909](https://github.com/riley909) | 게임 제작하기 Schema, CRUD, DB diagram, Realtime Architecture   |
|김요셉 |[kim-jos](https://github.com/kim-jos)     | 게임 제작, Socket.io 실시간 저장 기능 구현   |
|정천우 |[codehousepig](https://github.com/codehousepig)   | 게임 출시하기 CRUD, 조회수/좋아요, 게임 검색, Deployment   |
|최유진 |[n12seconds](https://github.com/n12seconds) | 회원가입, 로그인, user CRUD, postman api 작성   |


## 과제 내용
1. 회원가입
2. 게임 제작하기 - 제작 중 단계의 게임을 '프로젝트'라고 합니다
3. 게임 출시(퍼블리싱)하기

각 단계의 요구사항은 다음과 같습니다

- 회원가입
- 게임 제작
    - 프로젝트는 **'실시간'**으로 반영이 되어야 합니다
        - 예를 들어, 프로젝트 수정 중 의도치 않은 사이트 종료 시에도 **작업 내역은 보존**되어야 합니다
- 게임 출시하기
    - **프로젝트 당 퍼블리싱 할 수 있는 개수는 하나**입니다. 퍼블리싱한 게임은 수정할 수 있어야 하며, 수정 후 재출시시 기존에 퍼블리싱된 게임도 수정됩니다
    - 출시하는 게임은 다른 사용자들도 볼 수 있으며, 사용자들의 **조회수 / 좋아요 등을 기록**할 수 있어야 합니다
    - '게임 혹은 사용자 **검색**'을 통해서 찾을 수 있어야 합니다

### [필수 포함 사항]
- READ.ME 작성
    - 프로젝트 빌드, 자세한 실행 방법 명시
    - 구현 방법과 이유에 대한 간략한 설명
    - 완료된 시스템이 배포된 서버의 주소
    - Swagger나 Postman을 통한 API 테스트할때 필요한 상세 방법
    - 해당 과제를 진행하면서 회고 내용 블로그 포스팅
- Swagger나 Postman을 이용하여 API 테스트 가능하도록 구현

### [개발 요구사항]
문제 1. '회원가입'부터 '게임 출시'까지 필요한 테이블을 설계하세요

문제 2. 다음에 필요한 API를 설계하세요

	1. 게임 제작하기에 필요한 API
	3. 조회수 수정, 좋아요 API
	4. 게임 혹은 사용자로 검색 API

- option -
문제 3. 
 (1) 프로젝트 실시간 반영을 위한 Architecture를 설계하세요 ( 그림이 있다면 좋습니다 )
 (2) 위의 Architecture를 토대로 기능을 구현하세요


## 사용 기술 및 tools
> - Back-End :  ![ExpressJS](https://img.shields.io/badge/express-%23000000.svg?style=for-the-badge&logo=express&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=white) ![MongoDB](https://img.shields.io/badge/mongodb-%2347A248.svg?style=for-the-badge&logo=mongodb&logoColor=white)
> - Deploy : <img src="https://img.shields.io/badge/AWS_EC2-232F3E?style=for-the-badge&logo=Amazon&logoColor=white"/>
> - ETC :  <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white"/>&nbsp;<img src="https://img.shields.io/badge/Github-181717?style=for-the-badge&logo=Github&logoColor=white"/>&nbsp;<img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white"/>

<img src="https://user-images.githubusercontent.com/42341135/140942645-b2f4dfe1-efdb-4103-b83f-bd8c400c567d.png" width=700/>


## DB Schema
<img src="https://user-images.githubusercontent.com/42341135/140942818-656c2fa2-3705-4b4a-a255-0903f5c59c66.png" width=700>

## Realtime Architecture
<img src="https://user-images.githubusercontent.com/67426853/140968650-c8ce377a-76a3-49f8-a045-ac76ca3b7973.png" width="700"/>

## API
[링크-postman document](https://documenter.getpostman.com/view/8136495/UVC5DSPt)


## 구현 기능
### 회원가입, 로그인
- 회원가입시 password 같은 민감정보는 해쉬 알고리즘인 bcrypt를 사용해 암호화 하여 database에 저장했습니다
- 로그인이 성공적으로 완료되면 JWT 토큰이 반환됩니다
- JWT 토큰 유효성을 검사하는 미들웨어를 추가하여 회원가입, 로그인 이외의 api 호출 시 토큰 유효성 여부를 검사합니다. 

### 게임 제작
- 게임 제작은 user가 코드를 작성하여 게임을 제작한다고 가정하고 text 형식으로 코드를 작성하도록 하였습니다. 
- 실시간으로 코드를 저장하기 위해 Socket.io 사용했습니다. 게임 코드 작성시 spacebar를 누를 때마다 이벤트가 발생하여 코드가 데이터베이스에 저장됩니다.
- 실시간 저장 기능을 표현하기 위한 Client side 화면이 필요할 것 같아 간단한 html를 추가했습니다.
  1. [Login page](http://13.125.0.161:3012/users/login)에서 체험할 수 있습니다.
  2. 체험 아이디 testwork@test.com 비밀번호 test 로 로그인합니다.
  3. [GameDev page](http://13.125.0.161:3012/gameDev)로 이동합니다.
  * 쿠키로 로그인 유지 기능을 구현하려고 했으나 왠지 모르게 쿠키에 토큰이 저장되었다가 경로에 따라 사라짐을 반복하는 문제가 있습니다.
    이를 해결하기 위해 새벽동안 이야기를 나누면서 했지만 뚜렷한 해결책을 찾지 못했습니다.
    평가를 위해 테스트를 진행하신다면 번거롭더라도 여러번 로그인과 편집창을 이동하면서 접속해주시면 감사하겠습니다.

### 게임 출시, 검색
- 로그인 이후 게임 프로젝트를 만들어 출시하기(POST)를 하면 첫 프로젝트일 경우 새로운 출시가 되고 기존에 있던 프로젝트였다면 수정일이 바뀌어 재출시된다.
- 출시되어 있는 목록을 보는 URL에서 'name' or 'game'으로 검색하여 원하는 검색 결과를 찾을 수 있다.
- 한 페이지에 출시된 게임의 수는 5개이며 limit로 한 화면의 게임의 개수를 조절할 수 있고, offset으로 페이지를 조절할 수 있습니다.

### 조회수, 좋아요
- 로그인 상태로 모든 서비스에 접근한다는 것을 생각하여 사람들이 자주 찾고 인기 있는 게임의 차별성을 두기 위해 조회 수는 중복이 가능하게 하였습니다.
- 좋아요는 한 명의 회원이 중복으로 등록하는 것을 방지하기 위해서 처음 호출 시 좋아요 추가, 두번째 호출 시 좋아요 취소가 되도록 구현했습니다. 

## API TEST 방법
1. 다음 링크로 이동합니다. [postman 링크](https://www.postman.com/restless-escape-500858/workspace/12-punch-assignment-redbrick/collection/8136495-858c0e1c-e5f5-41c7-9650-02353ceed314)
2. user폴더 안의 회원가입, 로그인 요청을 통하여 accessToken을 획득합니다.
3. 권한이 필요한 api 요청 시 header의 Authorization 항목에 accessToken을 입력하여 요청할 수 있습니다. 
- 로그인, 회원가입을 제외한 api 호출시 accessToken이 필요합니다.

## 설치 및 실행 방법



## Installation

```bash
$ npm install
$ npm run build
$ npm start
```


## TIL정리 (Blog)
- 김남형 : [3번째 회고 이번에 내가 구멍](https://velog.io/@42seouler/%ED%94%84%EB%A6%AC%EC%98%A8%EB%B3%B4%EB%94%A9-%EB%A0%88%EB%93%9C%EB%B8%8C%EB%A6%AD-2%EC%A3%BC%EC%B0%A8-%ED%9A%8C%EA%B3%A0)
- 김서경 : [레드브릭 기술과제 회고](https://yummy-error-929.notion.site/Pre-Onboarding-0147ddcc0bc04947a986d37a70d651d8)
- 김요셉 :
- 정천우 : [codehousepig](https://blog.naver.com/codehouse9/222562017040)
- 최유진 :

# Reference
이 프로젝트는 원티드x위코드 백엔드 프리온보딩 과제 일환으로 REDBRICK에서 출제한 과제를 기반으로 만들었습니다.


