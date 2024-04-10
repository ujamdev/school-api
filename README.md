# 뉴스피드기능

## 소개

학교 소식을 전달하고 받아보는 '학교소식 뉴스피드' 를 위한 백엔드 구현했습니다.

---

## 설치

```bash
# 해당 프로젝트를 클론합니다.
$ git clone https://github.com/ujamdev/school-api.git

# 프로젝트 디렉토리로 이동합니다.
$ cd school-api

# 패키지 설치합니다. (Yarn 사용 시)
$ yarn install
```

## 환경 설정

```javascript
# local.yml
# 로컬 환경 DB에 맞는 설정으로 변경

server:
  port: 8080

database:
  type: 'mysql'
  host: 'localhost'
  port: 3306
  username: 'root'
  password: '1234'
  database: 'school_notification'

```

[DB 스키마 등록](#문서)

```text
작성된 DB 스키마에 따라 스키마, 테이블 및 데이터 등록을 해줍니다.
```

## 앱 실행

```bash
# 로컬 환경 실행합니다. (Yarn 사용 시)
$ yarn run start
```

## 테스트

```bash
# 단위 테스트 실행합니다. (Yarn 사용 시)
$ yarn run test

# 테스트 커버리지 확인합니다. (Yarn 사용 시)
$ yarn run test:cov
```

---

## 기능 소개

| 학교 관리자가 학교 생성 | 학교 관리자가 학교 소식 생성 |
| :---------------------: | :--------------------------: |
|                         |                              |

| 학교 관리자가 학교 소식 수정 | 학교 관리자가 학교 소식 삭제 |
| :--------------------------: | :--------------------------: |
|                              |                              |

| 학생이 학교 구독 | 학생이 구독중인 학교 구독 취소 |
| :--------------: | :----------------------------: |
|                  |                                |

| 학생이 구독중인 학교 목록 조회 | 학생이 구독중인 학교별 소식 조회 |
| :----------------------------: | :------------------------------: |
|                                |

| 학생이 구독중인 학교 소식 조회 |
| :----------------------------: |
|                                |

---

## 문서

> [📜 DB 스키마](https://stream-hortensia-a2d.notion.site/DB-80496a7bacfc40d09415cf47115c4cb6?pvs=4)

> [📜 API 명세서](https://stream-hortensia-a2d.notion.site/API-d9b282fda3c94268bc0639130a53b906?pvs=4)

---
