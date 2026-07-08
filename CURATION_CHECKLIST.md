# Toolcade Curation Checklist

AI든 사람이든, 툴/카테고리를 추가·수정한 뒤 **전부 통과**해야 merge 또는 배포합니다.

## A. 데이터 무결성

- [ ] `data/meeting-notes.json`(또는 해당 카테고리 JSON)만 수정하고, HTML에 툴 정보를 하드코딩하지 않았다
- [ ] 비교표 필드(`comparison.*`)와 카드 내용(highlights/cons/bestFor)이 **모순되지 않는다**
- [ ] `decisionTree[].recommend` slug가 `tools[].slug`에 존재한다
- [ ] `rank`가 중복되지 않는다
- [ ] `affiliate.url`이 플레이스홀더(`여기에_…`)가 아니다
- [ ] CTA 문구(`ctaLabel`)가 실제 혜택과 일치한다 (예: “첫 달 무료” 허위 표기 금지)

## B. 큐레이션 품질

- [ ] 장점(highlights)만 있지 않고 **단점(cons)** 이 1개 이상 있다
- [ ] **이런 분께는 비추천(notFor)** 이 1개 이상 있다
- [ ] `bestFor`가 한 문장으로 구체적이다 (모호한 “모두에게 좋음” 금지)
- [ ] 과장 표현(‘압도적’, ‘현존 최고’ 등)은 가능하면 조건(언어·플랜)을 붙였다
- [ ] `updatedAt`를 오늘 날짜로 갱신했다

## C. 전환·트래킹

- [ ] CTA에 UTM이 붙는다 (`utm_source=toolcade`)
- [ ] CTA에 `rel="noopener noreferrer sponsored"` 가 있다
- [ ] 제휴 고지(footer disclosure)가 페이지에 있다
- [ ] 클릭 시 `tool_click` 이벤트가 발생한다 (콘솔/`toolcade:track`)

## D. UX / SEO

- [ ] 모바일에서 비교가 읽힌다 (카드 또는 스택 UI)
- [ ] FAQ에 보안/봇/언어 관련 질문이 있다
- [ ] `seo.title` / `seo.description`이 카테고리 내용과 맞다
- [ ] 홈 `data/categories.json`에 카테고리 상태가 맞다 (`published` vs `coming-soon`)

## E. 자동 검증

배포 전:

```bash
node scripts/validate-curation.mjs
```

exit code 0이어야 한다.
