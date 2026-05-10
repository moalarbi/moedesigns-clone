# الفوتر (Footer) - Specification

## نظرة عامة
- **ملف الهدف:** `src/components/Footer.tsx`
- **نوع التفاعل:** روابط + نموذج الاشتراك
- **الاتجاه:** RTL

## هيكل DOM

```html
<footer class="footer">
  <div class="footer-container">
    <!-- اليسار: البودكاست -->
    <div class="footer-section">
      <h3>تعلّم بيع الخبرات</h3>
      <p>أحدث مقالاتي</p>
      <p>مباشرة في بريدك الالكتروني</p>
      <a href="./podcast" class="footer-link">جميع الحلقات</a>
    </div>
    
    <!-- المنتصف: نموذج الاشتراك -->
    <div class="footer-section">
      <form class="newsletter-form">
        <input type="email" placeholder="hala@moedesigns.io" required />
        <button type="submit">اشترك</button>
      </form>
      
      <!-- حقول مخفية -->
      <input type="hidden" name="field1" />
      <input type="hidden" name="field2" />
    </div>
    
    <!-- اليمين: المعلومات -->
    <div class="footer-section">
      <p>Bali / Dubai</p>
      <a href="mailto:hala@moedesigns.io" class="email-link">
        hala@moedesigns.io
      </a>
      <a href="https://nashra.ai" class="footer-link">نشــرة</a>
      <a href="./consulting" class="footer-link">احجز استشارة 💤</a>
    </div>
  </div>
</footer>
```

## الأنماط المحسوبة

### footer
- direction: rtl
- background: #0f0f0f
- border-top: 1px solid rgba(255, 255, 255, 0.05)
- padding: 80px 24px 40px
- text-align: right

### footer-container
- max-width: 1400px
- margin: 0 auto
- display: grid
- grid-template-columns: 1fr 1fr 1fr
- gap: 48px

### footer-section
- display: flex
- flex-direction: column
- gap: 16px
- direction: rtl

### footer-section > h3
- font-size: 18px
- font-weight: 700
- color: #ebebeb
- margin-bottom: 16px

### footer-section > p
- font-size: 14px
- color: #d9d9d9

### footer-link
- color: #d9d9d9
- text-decoration: none
- transition: color 300ms
- font-size: 14px

### footer-link:hover
- color: #2151ff

### email-link
- color: #2151ff
- text-decoration: none
- transition: color 300ms

### email-link:hover
- color: #ff7b0f

### newsletter-form
- display: flex
- gap: 8px
- direction: rtl

### newsletter-form > input[type="email"]
- flex: 1
- padding: 12px 16px
- background: rgba(33, 33, 33, 0.5)
- border: 1px solid #888888
- border-radius: 8px
- color: #ebebeb
- font-size: 14px
- transition: all 300ms

### newsletter-form > input[type="email"]:focus
- background: rgba(33, 33, 33, 0.8)
- border-color: #2151ff
- outline: none

### newsletter-form > input[type="email"]::placeholder
- color: #888888

### newsletter-form > button
- padding: 12px 24px
- background: #2151ff
- color: white
- border: none
- border-radius: 8px
- font-weight: 600
- cursor: pointer
- transition: all 300ms

### newsletter-form > button:hover
- background: #1938cc
- box-shadow: 0 0 20px rgba(33, 81, 255, 0.3)

## نص المحتوى (Content)

```javascript
{
  leftSection: {
    heading: "تعلّم بيع الخبرات",
    description1: "أحدث مقالاتي",
    description2: "مباشرة في بريدك الالكتروني",
    link: { text: "جميع الحلقات", href: "./podcast" }
  },
  rightSection: {
    location: "Bali / Dubai",
    email: "hala@moedesigns.io",
    newsletter: { text: "نشــرة", href: "https://nashra.ai" },
    cta: { text: "احجز استشارة 💤", href: "./consulting" }
  }
}
```

## السلوك

### نموذج الاشتراك
- التحقق من صيغة البريد الإلكتروني
- الحقول المخفية لـ Nashra API
- رسالة نجاح عند الإرسال

## الاستجابة

- **سطح المكتب:** 3 أعمدة
- **الجهاز اللوحي:** عمودين
- **الهاتف:** عمود واحد
- **اتجاه:** RTL في جميع الحالات
