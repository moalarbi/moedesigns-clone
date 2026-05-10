# 🚀 دليل البدء السريع

## 1️⃣ التثبيت الأولي

```bash
# الدخول للمشروع
cd moedesigns-clone-master

# تثبيت التبعيات
npm install

# تشغيل الخادم
npm run dev
```

**اضغط على**: http://localhost:3000

---

## 2️⃣ المجلدات الرئيسية

| المجلد | الوصف | الملفات |
|--------|-------|--------|
| `src/components/sections/` | أقسام الصفحة الكبيرة | Hero.tsx, Navigation.tsx, Portfolio.tsx, ... |
| `src/components/ui/` | مكونات واجهة المستخدم | Button.tsx, Card.tsx, Carousel.tsx, ... |
| `src/styles/` | الأنماط والتصاميم | globals.css, variables.css, animations.css |
| `src/types/` | تعريفات TypeScript | index.ts, models.ts |
| `src/hooks/` | React Hooks مخصصة | useIntersection.ts, useMediaQuery.ts |
| `src/utils/` | دوال مساعدة | cn.ts, helpers.ts |
| `public/fonts/` | ملفات الخطوط | itf-huwiya-arabic/ |
| `public/images/` | الصور | portfolio/, testimonials/ |
| `docs/research/` | التوثيق والمواصفات | PAGE_TOPOLOGY.md, DESIGN_TOKENS.md, ... |

---

## 3️⃣ الملفات المهمة

### 📖 للقراءة أولاً:

1. **README.md** ← اقرأ هذا أولاً
2. **STRUCTURE.md** ← شرح كل مجلد
3. **docs/research/README.md** ← التوثيق الكاملة
4. **docs/research/DESIGN_TOKENS.md** ← الألوان والخطوط

### 🎨 للتصميم:

- **src/styles/globals.css** ← الأنماط العامة
- **src/styles/variables.css** ← متغيرات CSS
- **docs/research/DESIGN_TOKENS.md** ← جميع الألوان والمسافات

### 🎬 للحركات:

- **src/styles/animations.css** ← جميع الحركات
- **docs/research/BEHAVIORS.md** ← شرح كل حركة

---

## 4️⃣ الأوامر الأساسية

```bash
# تشغيل خادم التطوير
npm run dev

# بناء المشروع
npm run build

# تشغيل النسخة المبنية
npm start

# التحقق من الأخطاء
npm run lint

# التحقق من TypeScript
npm run type-check
```

---

## 5️⃣ البدء في الترميز

### أضف مكون جديد:

1. انسخ مثال من `src/components/ui/Button.tsx`
2. عدّل الاسم والتصميم
3. استورده في الملف الذي تريده

```typescript
// src/components/ui/MyComponent.tsx
export default function MyComponent() {
  return <div className="p-4">مكون جديد</div>
}
```

### استخدم الألوان:

```css
/* من variables.css */
color: var(--text-primary);
background: var(--bg-primary);
border-color: var(--accent-blue);
```

### أضف حركة:

```css
/* من animations.css */
animation: fadeIn 0.6s ease-out;
animation: slideUp 0.8s cubic-bezier(0.4, 0, 0.2, 1);
```

---

## 6️⃣ مراجع سريعة

### الألوان
```
خلفيات: #0f0f0f, #1a1a1a, #171717
نصوص: #ebebeb, #d9d9d9
لهجات: #2151ff (أزرق), #ff7b0f (برتقالي), #3ecf5c (أخضر)
```

### الخط
```
العائلة: "itf Huwiya Arabic"
الأحجام: H1: 36-62px, H2: 24-40px, P: 14-18px
الأوزان: 300, 400, 500, 600, 700
```

### المسافات
```
XS: 8px | SM: 12px | MD: 16px | LG: 24px | XL: 32px
```

### الحركات
```
السرعة: 150ms (سريع), 300ms (عادي), 500ms (بطيء), 800ms (أبطأ)
الإيقاع: cubic-bezier(0.4, 0, 0.2, 1) (الأكثر استخداماً)
```

---

## 7️⃣ نصائح للتطوير

✅ **افعل:**
- استخدم متغيرات CSS من `variables.css`
- اتبع نمط الملفات الموجودة
- اختبر على الهاتف والكمبيوتر
- اقرأ التوثيق قبل البدء

❌ **لا تفعل:**
- لا تضيف ألوان مباشرة في الكود
- لا تنسخ الكود بدون فهمه
- لا تشغل الحركات بدون `60fps`
- لا تنسى اختبار RTL

---

## 8️⃣ استكشاف الأخطاء

### المشروع لا يشتغل
```bash
# تأكد من تثبيت Node.js
node --version  # يجب أن تكون 18+

# أعد تثبيت التبعيات
rm -rf node_modules package-lock.json
npm install
```

### الصور لا تظهر
```bash
# تأكد من المسار الصحيح
# استخدم /images/filename.jpg (يبدأ من public/)
```

### الخط لا يظهر
```bash
# تأكد من تثبيت الخط في layout.tsx
# تحقق من اسم الخط في variables.css
```

---

## 9️⃣ الخطوات التالية

- [ ] شغّل المشروع بـ `npm run dev`
- [ ] اقرأ `docs/research/README.md`
- [ ] افهم `DESIGN_TOKENS.md`
- [ ] انسخ مكون وعدّله
- [ ] أضف قسم جديد
- [ ] اختبر على الهاتف
- [ ] انشر على Vercel

---

## 🔗 روابط مهمة

- 🌐 **الموقع الأصلي**: https://moedesigns.io/
- 📚 **التوثيق**: اقرأ `docs/research/`
- 🎨 **التصميم**: اقرأ `DESIGN_TOKENS.md`
- 🎬 **الحركات**: اقرأ `BEHAVIORS.md`

---

## 📞 اسأل نفسك قبل البدء

- [ ] هل قرأت README.md؟
- [ ] هل فهمت بنية المشروع؟
- [ ] هل اطلعت على التوثيق؟
- [ ] هل تعرف أين توضع الملفات؟

**إذا أجبت "لا" على أي سؤال، اقرأ الملفات أولاً! 📖**

---

**استمتع بالترميز! 🎉**
