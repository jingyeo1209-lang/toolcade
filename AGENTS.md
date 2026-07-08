# Toolcade Agent Guide

이 레포는 **데이터 드리븐 큐레이션 하네스**입니다. UI는 렌더러가 그리고, 콘텐츠는 JSON이 진실의 원천입니다.

## 원칙

1. 툴/카테고리 문구·요금·링크는 HTML에 직접 쓰지 말고 `data/*.json`을 수정한다.
2. 새 툴을 넣으면 `pros`만 넣지 말고 **cons / notFor / bestFor / affiliate** 를 항상 채운다.
3. CTA 혜택 문구는 팩트체크한다. 불확실하면 중립 문구(“알아보기”)로 낮춘다.
4. 작업 후 `node scripts/validate-curation.mjs` 를 돌린다.
5. `CURATION_CHECKLIST.md` 항목을 통과한 듯 보이게만 하지 말고, 실제 모순을 제거한다.

## 구조

```
data/categories.json          # 홈 카테고리 목록
data/meeting-notes.json       # 미팅 노트 카테고리 콘텐츠
js/analytics.js               # UTM + 이벤트
js/render.js                  # JSON → DOM
categories/<slug>/index.html  # 카테고리 셸
scripts/validate-curation.mjs # 스키마/일관성 검증
```

## 새 카테고리 추가 절차

1. `data/<slug>.json` 생성 (meeting-notes.json 스키마 복제)
2. `categories/<slug>/index.html` 생성 (dataUrl만 변경)
3. `data/categories.json`에 `published`로 등록
4. validate 스크립트에 새 JSON 경로 추가
5. 체크리스트 통과

## 로컬 실행

`file://`에서는 `fetch`가 막힐 수 있습니다.

```bash
npm start
```

브라우저에서 안내된 localhost 주소를 엽니다.
