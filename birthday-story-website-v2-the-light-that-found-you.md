# Birthday Story Website V2
## The Light That Found You
### Mobile-First Cinematic Birthday Experience

---

# 1. Mục tiêu mới của V2

Phiên bản này thay đổi hoàn toàn cách tiếp cận visual.

Không còn:

- Mỗi section là một scene riêng biệt.
- Mỗi scene có một effect riêng.
- Object 3D bay lơ lửng kiểu demo.
- Particle chỉ để lấp đầy màn hình.
- Planet / icon / vật phẩm 3D giả.
- Glow áp dụng cho mọi thứ.
- Animation loop lặp đi lặp lại.

Thay vào đó:

> Toàn bộ website là một câu chuyện liên tục được dẫn dắt bởi một sợi ánh sáng.

Tên concept:

# **The Light That Found You**

Một tia sáng xuất hiện từ bóng tối, đi xuyên qua các ký ức, trở thành ngôi sao, trở thành đường ký ức, trở thành những hạt sáng, trở thành ngọn nến, rồi cuối cùng bùng nổ thành pháo hoa sinh nhật.

Mục tiêu chính:

- Lung linh nhưng không giả.
- Ảo diệu nhưng không game-like.
- Cinematic hơn Three.js demo.
- Có chiều sâu.
- Có cao trào.
- Có khoảng lặng.
- Chuyển cảnh không đứt gãy.
- Tối ưu cho mobile.

---

# 2. Nguyên tắc visual quan trọng nhất

## Story First

Hiệu ứng không tồn tại chỉ để đẹp.

Mỗi hiệu ứng phải phục vụ một mục đích kể chuyện.

Ví dụ:

```text
Light
↓
Star
↓
Constellation
↓
Memory
↓
Light Trail
↓
Wish Particles
↓
Candle Flame
↓
Fireworks
↓
Final Message
```

Không có cảnh nào reset hoàn toàn.

Không fade-out tất cả rồi mở section mới.

Một vật thể từ cảnh trước phải được tiếp tục hoặc biến đổi sang cảnh sau.

---

# 3. Visual Philosophy

## Không gian phải có chiều sâu thật

Không dùng:

```text
background
+ 1000 white dots
+ blur
```

Thay vào đó xây theo nhiều lớp.

## Layer Structure

```text
Foreground Bokeh
↓
Foreground Light Leak
↓
Hero Content / Photo
↓
Mid-depth Dust
↓
Light Trail
↓
Fog / Aurora
↓
Far Stars
↓
Deep Gradient Background
```

Mỗi layer có:

- Depth khác nhau.
- Tốc độ parallax khác nhau.
- Blur khác nhau.
- Opacity khác nhau.
- Scale khác nhau.

Khi scroll, các layer không di chuyển đồng tốc.

Nhờ vậy tạo cảm giác camera thật sự đang đi xuyên không gian.

---

# 4. Tỉ lệ visual

Không để mọi thứ đều phát sáng.

Quy tắc:

```text
90% darkness / softness
10% light / highlight
```

Phần lớn màn hình cần:

- Tối.
- Dịu.
- Có sương.
- Có khoảng trống.

Ánh sáng chỉ tập trung vào:

- Tia sáng chính.
- Ảnh chính.
- Một vài sparkle.
- Nến.
- Firework ending.

Nếu tất cả cùng glow thì không còn gì nổi bật.

---

# 5. Main Story Object — The Light

Đây là vật thể xuyên suốt toàn bộ website.

Nó luôn tồn tại.

Nó chỉ thay đổi hình dạng.

## Các trạng thái

```text
Tiny Light
↓
Shooting Star
↓
Constellation Line
↓
Memory Highlight
↓
Light Trail
↓
Floating Dust
↓
Letter Spark
↓
Candle Flame
↓
Explosion Core
↓
Firework Trail
↓
Final Star Dust
```

The Light là cầu nối của mọi scene.

---

# 6. Overall Flow

```text
Darkness
↓
A Light Appears
↓
The Light Becomes A Star
↓
The Star Draws A Birthday Constellation
↓
The Star Falls Into A Memory
↓
Memories Wake Up
↓
The Light Leads Through The Story
↓
The Story Slows Down
↓
The Light Becomes Wishes
↓
The Wishes Become A Flame
↓
The Flame Goes Out
↓
Darkness
↓
Explosion
↓
Happy Birthday
↓
The Light Returns
↓
Secret Ending
```

---

# 7. Scene 00 — Darkness

## Mục tiêu cảm xúc

Im lặng.

Tò mò.

Không show hết ngay.

## Visual

Full screen gần như đen.

Không dùng background galaxy ngay lập tức.

Chỉ có:

- Vignette nhẹ.
- Grain rất nhẹ.
- Fog tối.
- 2–5 star dust mờ.

## Nội dung

Chưa hiện text ngay.

Sau một nhịp:

```text
There is something waiting for you.
```

Text rất nhỏ.

Không glow mạnh.

## Animation

```text
Dark screen
↓
One tiny light flickers
↓
Light disappears
↓
Appears again slightly closer
```

Tạo cảm giác thứ gì đó đang tiến về phía người xem.

---

# 8. Scene 01 — A Light Appears

## Visual

Tia sáng nhỏ từ xa.

Không dùng ngôi sao 3D rõ hình.

Chỉ dùng:

- Core sáng.
- Bloom rất nhỏ.
- Tail mảnh.
- Volumetric feel giả bằng layered sprite.

## Interaction

Text:

```text
Touch the light
```

User tap.

## Transition

Không zoom camera vào một object cứng.

Thay vào đó:

```text
Tap
↓
Light pulse
↓
Tail stretches
↓
Light sweeps across screen
↓
Light leaves a glowing path
↓
Glowing path draws next scene
```

---

# 9. Scene 02 — The Day You Arrived

## Ý tưởng

Sợi sáng vừa tạo ra sẽ vẽ ngày sinh.

Không cần constellation 3D phức tạp.

## Visual

Background vẫn tối.

Light trail đi qua màn hình.

Khi nó đi:

```text
dot
↓
line
↓
date
↓
constellation-like structure
```

Ví dụ:

```text
24 • 08 • 2000
```

Các số không xuất hiện trực tiếp.

Chúng được tạo từ:

- Star points.
- Thin light lines.
- Soft glow.

## Text

```text
Then one day...
you arrived.
```

## Transition sang Memories

Một điểm sáng trong constellation sáng mạnh hơn.

Nó rung nhẹ.

Sau đó:

```text
Star detaches
↓
falls downward
↓
camera follows
↓
background turns into blur
↓
star lands on first photo
```

Không cắt scene.

---

# 10. Scene 03 — The First Memory

## Mục tiêu

Đây là lần đầu ảnh thật xuất hiện.

## Visual

Không show gallery ngay.

Chỉ show một ảnh duy nhất.

Ảnh:

- Có blur nhẹ khi ở xa.
- Có depth.
- Không cần border cứng.
- Có grain.
- Có soft light leak.

## Animation

```text
Star touches photo
↓
Photo edge lights up
↓
Photo slowly comes into focus
↓
Caption appears
```

Text nhỏ.

Không dùng card popup.

## Kỹ thuật

Ảnh dùng HTML / next/image.

Depth tạo bằng:

- CSS transform.
- GSAP.
- Perspective.
- Blur.
- Scale.
- Z translation giả lập.

Không cần Three.js texture.

---

# 11. Scene 04 — Memories Wake Up

## Mục tiêu

Từ một ảnh, mở ra cả không gian kỷ niệm.

## Bố cục

Không xếp đều.

Không grid.

Không carousel tiêu chuẩn.

## Composition

```text
         blurred photo far away

      photo tilted slightly

 light leak            dust

          HERO PHOTO

 foreground bokeh
```

Một ảnh có thể rất gần camera.

Một ảnh chỉ thấy một phần.

Một ảnh bị fog che nhẹ.

## Scroll

Khi user scroll:

```text
Hero photo moves behind
↓
Next photo comes closer
↓
Previous photo blurs
↓
Light passes to next photo
```

Sợi ánh sáng luôn là thứ kích hoạt ảnh tiếp theo.

---

# 12. Memory Transition Rules

Không dùng:

```text
fade out
fade in
```

Ưu tiên:

```text
light pass
focus shift
depth shift
camera drift
foreground occlusion
blur transition
```

Ví dụ:

Ảnh A đang chiếm màn hình.

Một foreground bokeh đi ngang camera.

Trong lúc màn hình bị che một phần:

```text
Photo A → move backward
Photo B → move forward
```

Khi bokeh đi khỏi:

Photo B đã trở thành ảnh chính.

Transition sẽ mềm hơn nhiều.

---

# 13. Scene 05 — Little Things About You

## Bỏ Planet System

Không dùng:

- Planet.
- 3D icon.
- Floating sphere.
- Emoji card.
- Object loop.

Thay bằng:

# Dream Fragments

Mỗi sở thích / tính cách là một composition.

Ví dụ Matcha.

## Visual

```text
real matcha cutout
+
leaf texture
+
small type
+
light reflection
+
soft green glow
+
memory fragment
```

Không cần object 3D.

## Animation

Ban đầu các fragment rời nhau.

Scroll:

```text
fragment 1
fragment 2
fragment 3
↓
move together
↓
form composition
↓
caption appears
↓
light passes through
↓
fragments dissolve
```

Sau đó chuyển sang sở thích tiếp theo.

---

# 14. Asset Strategy cho Dream Fragments

Ưu tiên:

- Ảnh thật.
- PNG cutout.
- Transparent WEBP.
- Texture đẹp.
- Light leak.
- Real shadows baked in.
- Soft grain.

Không dựng object nhân tạo nếu ảnh thật đẹp hơn.

---

# 15. Scene 06 — The Story Path

Đây là phần kết nối lớn nhất.

## Ý tưởng

Sợi ánh sáng kéo dài thành một con đường.

Không phải đường line UI.

Nó giống:

- Light ribbon.
- Soft glowing thread.
- Thin nebula trail.

## Camera

User scroll.

Camera cảm giác đang đi theo con đường.

## Timeline

```text
Light Trail
   │
   ● Memory
   │
   ● Moment
   │
   ● Quote
   │
   ● Photo
```

Nhưng không hiển thị node UI rõ ràng.

Mỗi node chỉ được cảm nhận qua:

- Light pulse.
- Photo reveal.
- Small sound.
- Focus shift.

---

# 16. Scene 07 — Emotional Slowdown

Sau nhiều visual, phải có đoạn nghỉ.

## Visual

Giảm particle.

Giảm movement.

Background tối hơn.

Light trail chậm lại.

Camera gần như dừng.

## Nội dung

```text
Some moments stay.
Even when everything else moves on.
```

Sau đó lời chúc bắt đầu xuất hiện.

---

# 17. Scene 08 — Wishes

## Không show text bằng fade thông thường

Text nên được tạo từ ánh sáng.

## Animation

```text
Light trail breaks apart
↓
thousands of tiny dust particles
↓
particles gather
↓
form a sentence
```

Sau vài giây:

```text
sentence dissolves
↓
particles move downward
↓
form next sentence
```

## Nội dung

Ví dụ:

```text
Mong bạn vẫn luôn cười thật nhiều.

Mong những điều bạn cố gắng
đều sẽ có câu trả lời.

Mong năm mới của bạn
dịu dàng hơn với bạn một chút.

Và mong...
bạn luôn gặp được những điều
xứng đáng với mình.
```

---

# 18. Scene 09 — From Wishes To Flame

Câu cuối cùng không biến mất hoàn toàn.

Một vài hạt sáng rơi xuống.

Camera follow.

```text
Wish particles
↓
fall
↓
gather
↓
small flame
```

Background dần xuất hiện chiếc bánh.

Nhờ vậy candle không xuất hiện đột ngột.

---

# 19. Scene 10 — Make A Wish

## Visual

Không cần bánh 3D phức tạp.

Ưu tiên:

- Ảnh thật.
- 2.5D cake asset.
- Simple geometry nếu cần.
- Realistic flame.
- Soft local light.

## Flame

Ngọn lửa chính là The Light.

Nó đã đi xuyên toàn bộ câu chuyện.

## UI

```text
Make a wish
```

Sau đó:

```text
Press and hold
```

## Interaction

```text
pointerdown
↓
flame reacts
↓
light contracts
↓
screen slowly darkens
↓
flame disappears
```

---

# 20. Scene 11 — Blackout

Đây là điểm quan trọng nhất của cao trào.

Không particle.

Không text.

Không glow.

Không sound lớn.

Chỉ:

```text
black screen
```

Khoảng một nhịp.

Sau đó một dot sáng xuất hiện rất nhanh.

---

# 21. Scene 12 — Birthday Explosion

Dot sáng chính là phần còn lại của The Light.

Nó nổ ra.

## Animation

```text
tiny light
↓
violent expansion
↓
firework trail
↓
multiple particles
↓
large glow burst
```

Lúc này mới được phép dùng:

- Bloom mạnh.
- Firework.
- Confetti.
- Lens flare.
- Particle explosion.
- Strong typography.

## Text

```text
HAPPY
BIRTHDAY

[NAME]
```

Không show một lần.

Nên:

```text
HAPPY
↓
BIRTHDAY
↓
NAME
```

Có delay rất nhỏ.

---

# 22. Scene 13 — After The Explosion

Sau cao trào, không kết thúc ngay.

Firework từ từ rơi xuống.

Particle giảm dần.

Ánh sáng quay lại trạng thái mềm.

```text
firework
↓
falling dust
↓
soft stars
↓
quiet ambience
```

---

# 23. Scene 14 — Secret Ending

Bụi sáng tụ lại.

Không cần card xuất hiện đột ngột.

Nó có thể tạo thành:

- Một dòng chữ.
- Một khung ảnh.
- Một envelope.
- Một portal nhẹ.

Text:

```text
One more thing...
```

Tap.

Mở:

- Letter.
- Voice.
- Video.
- Secret photo.
- Confession.
- Gift link.

---

# 24. Scene 15 — Final Message

Visual phải rất đơn giản.

Không cần effect lớn nữa.

Chỉ:

- Dark background.
- Soft dust.
- Một light line nhỏ.

Text:

```text
Website này rồi cũng sẽ kết thúc.

Nhưng mình hy vọng
những điều đẹp đẽ đang chờ bạn
thì không.
```

Sợi ánh sáng cuối cùng biến thành một chấm sao.

Sau đó tắt.

---

# 25. Realism Rules

## Cấm animation loop kiểu game

Không dùng:

```text
y: -10 → 10
rotate: -5 → 5
repeat: infinity
```

cho mọi object.

## Thay bằng cinematic motion

Object chỉ chuyển động khi:

- Camera đến gần.
- User scroll.
- Light đi qua.
- Transition xảy ra.

Mỗi object phải có lý do để chuyển động.

---

# 26. Depth Rules

Mỗi composition nên có tối thiểu 3 depth layers.

Ví dụ:

```text
Foreground
Midground
Background
```

Tốt hơn:

```text
Foreground Blur
Near Content
Hero Layer
Mid Depth
Far Depth
Atmosphere
Background
```

---

# 27. Particle System mới

Không dùng một particle system cho tất cả.

## 27.1 Far Stars

Đặc điểm:

- Rất nhỏ.
- Hầu như đứng yên.
- Flicker rất nhẹ.

## 27.2 Atmospheric Dust

Đặc điểm:

- Nhỏ.
- Chậm.
- Drift nhẹ.
- Opacity thấp.

## 27.3 Magic Sparkles

Đặc điểm:

- Ít.
- Sáng.
- Có tail.
- Xuất hiện đúng khoảnh khắc.

Không spam.

## 27.4 Foreground Bokeh

Đặc điểm:

- Lớn.
- Blur mạnh.
- Đi qua camera.
- Dùng để che transition.

## 27.5 Light Fragments

Chỉ xuất hiện khi:

- Text dissolve.
- Wish transition.
- Firework.
- Secret ending.

---

# 28. Lighting Rules

Không để object tự phát sáng mọi lúc.

Mỗi scene nên có một primary light source.

Ví dụ:

```text
Opening → The Light
Memories → edge light
Little Things → product highlight
Story → Light Trail
Wishes → particle light
Candle → flame
Ending → firework
```

---

# 29. Bloom Rules

Bloom chỉ dùng ở:

- The Light.
- Shooting trail.
- Candle.
- Firework.
- Highlight moment.

Không bloom toàn bộ scene.

Không bloom text body.

---

# 30. Texture & Grain

Để tránh CGI sạch quá:

Thêm:

- Film grain nhẹ.
- Soft noise.
- Slight chromatic softness.
- Light leak.
- Fog texture.

Không làm hình ảnh quá sắc và quá sạch.

Cinematic thường cần một chút imperfections.

---

# 31. Photo Treatment

Ảnh thật là nhân vật chính.

## Không xử lý ảnh kiểu card UI

Tránh:

- Border radius quá nhiều.
- Drop shadow kiểu dashboard.
- White card.
- Button quanh ảnh.

## Nên dùng

- Mask tự nhiên.
- Frame nhẹ.
- Film edge.
- Soft vignette.
- Depth blur.
- Light reflection.
- Glass layer mỏng.

---

# 32. Three.js Role mới

Three.js không còn là visual chính.

Nó chỉ cung cấp:

- Depth.
- Atmosphere.
- Particle.
- Light trail.
- Fog.
- Camera.
- Firework.
- Background effects.

## Không dùng Three.js cho

- Icon 3D.
- Food model.
- Matcha model.
- Cartoon planets.
- Camera 3D.
- Object decoration vô nghĩa.

---

# 33. HTML / CSS / GSAP Role

Phần đẹp nhất của website nên chủ yếu từ:

```text
Real Photos
+
HTML
+
CSS
+
GSAP
+
Layered Compositing
```

Three.js chỉ đứng phía sau hỗ trợ.

---

# 34. Motion Responsibility

Motion chỉ dùng cho:

- Tap feedback.
- Button.
- Letter opening.
- Small UI.
- Modal.
- Micro interaction.

Không dùng Motion để điều khiển cinematic timeline chính.

---

# 35. GSAP Responsibility

GSAP là đạo diễn chính.

Dùng cho:

- Scroll timeline.
- Depth transitions.
- Photo focus.
- Light movement.
- Scene continuity.
- Blur transitions.
- Camera-like movement.
- Morph between visual states.

---

# 36. Scroll Strategy

Ưu tiên native scroll.

Không scroll hijacking quá mạnh.

## Cách dùng

```text
Native Scroll
↓
ScrollTrigger reads progress
↓
Timeline reacts
```

Có thể pin một vài scene quan trọng:

- Opening.
- Story Path.
- Wishes.
- Candle.

Không pin tất cả.

---

# 37. Transition Cheat Sheet

## Opening → Birthday

```text
Light streak
↓
draw constellation
```

## Birthday → Memories

```text
constellation star
↓
fall
↓
hit photo
```

## Memories → Little Things

```text
photo edge light
↓
light escapes
↓
fragment composition
```

## Little Things → Story

```text
fragments dissolve
↓
light thread
↓
story trail
```

## Story → Wishes

```text
trail breaks
↓
particles
↓
words
```

## Wishes → Candle

```text
words dissolve
↓
particles fall
↓
flame
```

## Candle → Ending

```text
flame out
↓
black
↓
firework
```

## Firework → Secret

```text
falling dust
↓
secret message
```

---

# 38. Mobile-First Performance

Mobile là trải nghiệm chính.

## One Canvas

Chỉ một WebGL canvas.

## Canvas chạy nền

```text
position: fixed
inset: 0
```

HTML content nằm phía trên.

## Device Quality

```text
low
medium
high
```

---

# 39. Adaptive Quality

## Low

- DPR 1.
- Far stars ít.
- Không DOF.
- Bloom nhẹ.
- Particle ít.
- Không expensive shader.

## Medium

- DPR 1–1.5.
- Particle vừa.
- Bloom nhẹ.
- Fog.
- Light trail quality medium.

## High

- DPR 1.5–2.
- Particle nhiều hơn.
- Better trail.
- Extra atmospheric effects.
- Selective post-processing.

---

# 40. Mobile Composition Rules

Vì màn hình dọc:

Không show quá nhiều object ngang.

Ưu tiên:

```text
center focus
vertical movement
diagonal light trail
foreground overlap
deep layers
```

Ảnh chính nên chiếm:

```text
60–90% viewport width
```

tùy scene.

---

# 41. Scene Duration

Không kéo quá dài.

Mỗi emotional beat nên ngắn.

Ví dụ:

```text
Opening: 5–10s
Birthday: 8–15s
Memories: tùy số ảnh
Little Things: 3–5s/item
Story Trail: 15–30s
Wishes: 15–25s
Candle: 5–10s
Ending: 10–20s
```

Không cần chính xác theo giây.

Scroll progress mới là trigger chính.

---

# 42. Content Density

Không để quá nhiều chữ.

## Rule

Một màn hình:

```text
1 main message
hoặc
1 image
hoặc
1 emotional beat
```

Không nhồi:

```text
image + title + paragraph + 3 button + icon
```

---

# 43. Audio Direction

Audio cũng phải có continuity.

## Một soundtrack xuyên suốt

Không đổi bài mỗi section.

Soundtrack có thể tăng giảm intensity.

## Layer

```text
BGM
Ambient
SFX
```

## SFX dùng ít

- Light spark.
- Soft whoosh.
- Photo wake-up.
- Candle.
- Firework.

Không spam sound.

---

# 44. Asset Types

Ưu tiên:

```text
real photos
transparent WEBP cutouts
soft PNG textures
light leak texture
grain texture
fog texture
audio
optional video
```

Hạn chế:

```text
GLB
large 3D models
4K texture
decorative 3D objects
```

---

# 45. Suggested Folder Structure

```text
public/
│
├── photos/
│   ├── memory-01.avif
│   ├── memory-02.avif
│   └── ...
│
├── cutouts/
│   ├── matcha.webp
│   ├── flower.webp
│   └── ...
│
├── textures/
│   ├── grain.webp
│   ├── fog.webp
│   ├── bokeh.webp
│   ├── light-leak.webp
│   └── particle.webp
│
└── audio/
    ├── bgm.mp3
    ├── sparkle.mp3
    ├── transition.mp3
    └── firework.mp3
```

---

# 46. Component Structure

```text
src/
│
├── app/
│
├── components/
│   ├── story/
│   │   ├── DarknessScene.tsx
│   │   ├── LightScene.tsx
│   │   ├── BirthdayScene.tsx
│   │   ├── MemoryScene.tsx
│   │   ├── DreamFragments.tsx
│   │   ├── StoryTrail.tsx
│   │   ├── WishesScene.tsx
│   │   ├── CandleScene.tsx
│   │   ├── BirthdayExplosion.tsx
│   │   └── SecretEnding.tsx
│   │
│   ├── three/
│   │   ├── ExperienceCanvas.tsx
│   │   ├── LightTrail.tsx
│   │   ├── AtmosphericDust.tsx
│   │   ├── FarStars.tsx
│   │   ├── BokehLayer.tsx
│   │   ├── FogLayer.tsx
│   │   └── Fireworks.tsx
│   │
│   └── ui/
│
├── timeline/
│   ├── openingTimeline.ts
│   ├── memoriesTimeline.ts
│   ├── storyTimeline.ts
│   ├── wishesTimeline.ts
│   └── endingTimeline.ts
│
├── data/
│
├── hooks/
│
└── lib/
```

---

# 47. Data Structure

Story content tách khỏi component.

Ví dụ:

```ts
export const story = {
  name: "Tên người nhận",
  birthday: "24/08/2000",

  memories: [
    {
      image: "/photos/memory-01.avif",
      caption: "..."
    }
  ],

  fragments: [
    {
      type: "matcha",
      asset: "/cutouts/matcha.webp",
      message: "..."
    }
  ],

  wishes: [
    "...",
    "...",
    "..."
  ]
}
```

---

# 48. Những thứ phải tránh

## Không làm

- Mỗi section một canvas.
- Object 3D float vô nghĩa.
- Icon 3D.
- Planet system.
- Particle trắng random toàn màn hình.
- Bloom mọi thứ.
- Text glow tất cả.
- Fade in / fade out liên tục.
- Card UI kiểu dashboard.
- Ảnh xếp grid.
- Animation loop giống game idle.
- Scene reset cứng.
- Scroll hijack nặng.
- Nhạc đổi liên tục.
- Quá nhiều text.

---

# 49. Những thứ cần ưu tiên

- Một light system xuyên suốt.
- Ảnh thật.
- Depth.
- Focus.
- Foreground occlusion.
- Soft camera movement.
- Light leak.
- Atmosphere.
- Blur transition.
- Grain.
- Sound continuity.
- Strong climax.
- Quiet ending.

---

# 50. MVP V2

MVP nên có:

1. Darkness intro.
2. Main light.
3. Birthday constellation.
4. 4–6 memories.
5. 2–3 Dream Fragments.
6. Story Trail.
7. 3–5 wishes.
8. Candle.
9. Blackout.
10. Firework.
11. Happy Birthday.
12. Secret ending.

Không cần nhiều feature.

Quan trọng là visual continuity.

---

# 51. Final Story Experience

```text
Darkness

    ✦

A tiny light appears.

The light gets closer.

You touch it.

It moves.

It draws a date in the sky.

A star falls.

It lands on a photograph.

The photograph wakes up.

More memories appear.

The same light travels between them.

It breaks into fragments.

The fragments become moments.

The moments become a path.

You follow the path.

The path slows down.

It breaks into words.

The words become wishes.

The wishes fall.

They become a flame.

You make a wish.

The flame goes out.

Darkness.

Silence.

...

BOOM.

HAPPY BIRTHDAY.

The fireworks disappear.

One small light remains.

One more thing...
```

---

# 52. Stack chốt

```text
Next.js
React
TypeScript
Tailwind CSS

GSAP
GSAP ScrollTrigger
Motion

Three.js
React Three Fiber
Drei
React Three Postprocessing

next/image
HTMLAudioElement
Web Audio API

Vercel
```

---

# 53. Tư tưởng cuối cùng

Website này không được có cảm giác:

> "Đây là một trang web có nhiều section đẹp."

Mà phải có cảm giác:

> "Mình vừa đi xuyên qua một giấc mơ được tạo riêng cho mình."

Và xuyên suốt toàn bộ giấc mơ đó:

> luôn có một tia sáng dẫn đường.
