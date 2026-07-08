# 툴케이드 (Toolcade)

지친 실무자를 위한 **업무 생산성 툴 큐레이션** 사이트입니다.  
JSON 데이터 기반으로 카테고리·리더보드·상세 리뷰를 렌더링합니다.

## 라이브 사이트

- **GitHub Pages:** https://jingyeo1209-lang.github.io/toolcade/
- **AI 미팅 노트:** https://jingyeo1209-lang.github.io/toolcade/categories/meeting-notes/

## 로컬 실행

```bash
npm start
```

브라우저에서 `http://localhost:4173` 을 엽니다.

## 콘텐츠 수정

1. `data/*.json` 수정 (진실의 원천)
2. `node scripts/build-data.mjs` — 번들 재생성
3. `node scripts/validate-curation.mjs` — 검증

자세한 규칙은 `AGENTS.md`, `CURATION_CHECKLIST.md` 참고.

## 배포

### GitHub Pages (기본)

`main` 브랜치 push 시 GitHub Actions가 자동 배포합니다.

### Vercel

1. [vercel.com](https://vercel.com) → Import Git Repository → `toolcade` 선택
2. Framework: Other / Build command: `node scripts/build-data.mjs`
3. Deploy

### Netlify

1. [netlify.com](https://netlify.com) → Add new site → Import from Git
2. Build command: `node scripts/build-data.mjs` · Publish directory: `.`
3. Deploy

## AdSense 신청 전 체크

- [ ] 실제 연락 이메일 (`data/categories.json` → `contactEmail`)
- [ ] 개인정보처리방침 URL 공개
- [ ] 충분한 콘텐츠 (카테고리 1개 이상 본문)

## 구조

```
data/           # JSON 콘텐츠
js/render.js    # UI 렌더러
css/            # 스타일
pages/          # 소개·약관·개인정보
categories/     # 카테고리 HTML 셸
```

## 라이선스

Private project — © Toolcade
