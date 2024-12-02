# 🎉 MEETUP - 지역기반 모임 플랫폼

<p align="center">
  <img src="/public/icons/icon-512.png" alt="Meetup Logo" width="200"/>
</p>

MEETUP은 다양한 **취미**와 **관심사**를 가진 사람들이 모여 열정을 공유하고 함께 즐길 수 있는 플랫폼입니다.  
새로운 사람들과의 만남을 통해 **사회적 네트워크**를 확장하고, **지식과 경험**을 나누며 성장할 수 있습니다.

> MEETUP은 **함께하는 즐거움**과 **공동체 형성**을 지향합니다.

---

### 🔎 소개
<blockquote>
<p>혼자 하면 지루한 취미도, 함께 하면 두 배로 즐거운 법 😃</p>
<p>동네에 숨겨진 다양한 소모임과 활동을 한눈에 확인하고 참여해보세요.</p>
<p>운동, 독서, 여행 등 다양한 모임을 발견하고, 같은 관심을 가진 이웃들을 만나보세요.</p>
</blockquote>
<br>

### 📍 지역 기반 모임의 장점

- 가까운 동네에서 쉽게 참여 가능한 **이벤트** 제공
- 지역 주민들이 자주 만나고 **소통할 수 있는 기회** 제공
- 일상 속 **커뮤니티 활성화**와 **교류의 장** 마련

함께 참여해보세요! 지역의 새로운 인연을 만나고 소중한 경험을 만들어보세요.

# How to Run Project

```bash
# install dependencies
yarn

# run code
yarn dev
```

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
