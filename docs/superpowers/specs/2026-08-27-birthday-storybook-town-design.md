# Birthday Storybook Town — 2.5D Paper Pop-up Diorama Design

## 1. Overview & Vision
Birthday Storybook Town là một web mini-game / thiệp chúc mừng sinh nhật tương tác 2.5D phong cách **Sách Nổi Thủ Công (Paper Pop-up Diorama)**.
Lấy cảm hứng trực tiếp từ tài liệu `docs.md` và hình ảnh phong cách thiết kế sách tranh vẽ sáp màu (crayon / hand-drawn cutouts):
- Không gian là một sân khấu sách nổi (Pop-up book stage) nằm trên mặt bàn gỗ ấm áp.
- Các nhân vật, nhà cửa, cối xay gió, cầu gỗ, cây cối, hộp quà, lâu đài đều là các **tấm bìa cắt giấy dập nổi (paper cutouts / die-cut stickers)** cắm đứng với viền trắng và bóng đổ giấy chân thực.
- Người chơi điều khiển nhân vật khám phá tuần tự 6 khu vực, thu thập các ngôi sao điều ước (Wish Stars), mở các khung ảnh kỷ niệm (Memories), khui các hộp quà bí mật (Gifts), và hoàn thành nghi thức thổi nến chúc mừng sinh nhật (Cake Ceremony) + mở thư mật (Secret Message).

---

## 2. Visual & Art Direction (Phong cách mỹ thuật)

### 2.1 Bảng màu chủ đạo (Pastel Storybook Palette)
- **Nền & Giấy (Base / Paper)**: `#FFF8F0` (Cream paper), `#FAF0E6` (Linen texture).
- **Mặt cỏ & Thiên nhiên (Terrain)**: `#A8E6CF` (Mint pastel), `#C5E8B7` (Soft crayon green).
- **Đường đi & Cầu (Path & Wood)**: `#F7D69E` (Warm Sand Crayon), `#D4A373` (Storybook Wood).
- **Sắc thái Sinh nhật (Accent)**:
  - Peach Pink: `#FFAAA5`
  - Blush Rose: `#FF8B94`
  - Lavender Dream: `#CDBBFF`
  - Butter Glow: `#FFEAA7`
  - Sparkle Gold: `#FFD166`
- **Viền & Bóng đổ (Cutout & Shadows)**:
  - White Die-cut Border: `#FFFFFF` (2px - 4px viền giấy sắc nét quanh từng đối tượng).
  - Soft Paper Drop Shadow: `rgba(80, 50, 90, 0.18)` ngả tím/nâu ấm dịu mắt.

### 2.2 Hiệu ứng Paper Pop-up 2.5D
- Camera nhìn nghiêng góc 35°–45° với phối cảnh Isometric / Orthographic perspective mượt mà.
- Các đối tượng (nhà, cây, cối xay gió quay nhẹ, nhân vật chibi, biển báo) đều là các mặt cắt 2D dựng đứng (Billboard/Cutout Cardboard) cắm trên mặt map.
- Hiệu ứng chuyển động nảy nhẹ (gentle paper wobble/bobbing) khi di chuyển và tương tác.

---

## 3. Kiến trúc hệ thống (System Architecture)

### 3.1 Tech Stack
- **Build Tool**: Vite (Vanilla JS + Modern ES Modules + CSS3 / PostCSS).
- **Graphics Engine**: Three.js (quản lý Scene 2.5D, Isometric Camera, Lighting, Billboard Sprites với Alpha & Paper Shadow, Texture Canvas) + 2D Overlay FX Canvas (Pháo hoa, Confetti, Fairy Dust).
- **Audio Engine**: Web Audio API Sound Synthesizer + BGM Manager (nhạc lofi/music box nhẹ nhàng, sound effects: chimes, pops, candle blow, applause/fireworks).
- **Control Support**:
  - Desktop: Phím WASD / Mũi tên / Click chuột để di chuyển tới điểm chỉ định.
  - Mobile: Chạm vào màn hình để di chuyển (Tap-to-move) + Virtual Floating Joystick ảo khi chạm giữ.

### 3.2 Cấu trúc thư mục
```text
SN/
├── index.html
├── package.json
├── vite.config.js
├── public/
│   ├── assets/
│   │   ├── textures/ (paper, grass, path, water)
│   │   ├── sprites/ (houses, trees, windmill, bridge, characters, gifts, castle, cake)
│   │   └── audio/ (bgm, sound effects)
│   └── favicon.ico
└── src/
    ├── main.js                     # Entry point khởi tạo game & UI
    ├── config/
    │   └── birthdayData.js         # Dữ liệu tùy biến: Tên người nhận, kỷ niệm, quà, lời chúc, thư mật
    ├── game/
    │   ├── DioramaEngine.js        # Three.js Scene, Camera, Renderer, Resize Handler
    │   ├── PopUpStage.js           # Dựng sàn sách gỗ, map cỏ, đường đi, sông suối
    │   ├── WorldObjects.js         # Khởi tạo và quản lý các landmark cắt giấy 2.5D
    │   ├── PlayerCharacter.js      # Nhân vật chibi cắt giấy, di chuyển, animation bobbing
    │   ├── NavigationSystem.js     # Pathfinding / Di chuyển theo click & Joystick
    │   └── TriggerSystem.js        # Quản lý vùng kích hoạt tương tác (Proximity zones)
    ├── ui/
    │   ├── DialogueOverlay.js      # Hộp thoại thiệp thư ở cạnh dưới màn hình
    │   ├── MemoryModal.js          # Modal xem ảnh polaroid + caption kỷ niệm
    │   ├── GiftModal.js            # Modal khui hộp quà bất ngờ
    │   ├── EndingCeremony.js       # Màn hình thổi nến, ước nguyện, pháo hoa & Secret Message
    │   ├── HUD.js                  # Thanh trạng thái: Sao thu thập, nút Pause/Sound, Quest Hint
    │   └── VirtualJoystick.js      # Nút điều hướng cảm ứng trên điện thoại
    ├── fx/
    │   ├── ParticleSystem.js       # Bụi sao fairy dust, vệt sáng theo chân
    │   ├── FireworksFX.js          # Pháo hoa rực rỡ màn Happy Birthday
    │   └── ConfettiFX.js           # Mảnh giấy màu rơi khi mở quà và ending
    ├── audio/
    │   └── AudioManager.js         # Phát BGM thư giãn và SFX sinh nhật ấm áp
    └── styles/
        ├── main.css                # Reset, font chữ, bố cục khung gỗ sách
        ├── storybook-ui.css        # Style hộp thoại, thiệp, modal polaroid, nút bấm
        └── ending.css              # Style màn hình sinh nhật rực rỡ
```

---

## 4. Chi tiết 6 khu vực trên bản đồ (Map Progression Flow)

```text
[1. Starting House]  -->  [2. Wish Bridge]  -->  [3. Memory Garden]
                                                        |
                                                        v
[6. Cake Castle]     <--  [5. Light Path]   <--  [4. Gift Plaza]
        |
        v
[Grand Birthday Finale & Secret Letter]
```

1. **Khu 1: Starting House (Ngôi nhà khởi hành)**:
   - Nhà mái ngói sáp màu đỏ pastel, hàng rào gỗ, hộp thư nhỏ, dây cờ tam giác.
   - Nhân vật xuất hiện, hộp thoại mở ra: *“Hôm nay có một hành trình nhỏ được chuẩn bị riêng cho bạn... Hãy cùng dạo bước nhé! ✨”*
2. **Khu 2: Wish Bridge (Cầu Lời Chúc)**:
   - Cầu gỗ bắc qua con suối trong vắt, đèn ngôi sao lấp lánh, biển chỉ dẫn “Make a Wish”.
   - Đi qua cầu và thu thập **Wish Star #1**: *“Mỗi ngôi sao là một điều tốt lành gửi đến bạn hôm nay.”*
3. **Khu 3: Memory Garden (Vườn Kỷ Niệm)**:
   - Cây cổ thụ treo dây ảnh polaroid, bồn hoa lung linh, ghế băng gỗ, biển “Our Memories”.
   - Tương tác với 3-4 khung ảnh kỷ niệm: mở modal polaroid kèm dòng tâm sự ấm áp.
4. **Khu 4: Gift Plaza (Quảng Trường Quà Tặng)**:
   - Cụm bàn tiệc mini, chùm bóng bay pastel, các hộp quà rực rỡ đủ màu.
   - Tương tác mở từng hộp quà: nhận lời chúc dễ thương, huy hiệu may mắn, hoặc mini game mở bất ngờ.
5. **Khu 5: Light Path (Con Đường Ánh Sáng)**:
   - Con đường đá lát phát sáng lung linh, đèn lồng đom đóm, các biển gỗ khắc quote ý nghĩa.
   - Bước qua từng mốc đèn để tích lũy năng lượng ánh sáng và thu thập Wish Stars còn lại.
6. **Khu 6: Birthday Castle & Cake Stage (Lâu đài Sinh Nhật & Sân Khấu Bánh Kem)**:
   - Lâu đài cổ tích cắt giấy, cổng vòm hoa rực rỡ, chiếc bánh sinh nhật 3 tầng khổng lồ với ngọn nến lung linh.
   - Nghi thức: Nhấn giữ nút/màn hình *“Press & Hold to Make a Wish”* (3 giây) -> Nến tắt với làn khói mờ ảo -> Bầu trời bừng sáng với pháo hoa rực rỡ -> Banner **HAPPY BIRTHDAY [Tên]** -> Nút mở **Bức thư bí mật (Secret Message)**.

---

## 5. Dữ liệu tùy biến (`src/config/birthdayData.js`)
File cấu hình cực kỳ dễ chỉnh sửa:
```javascript
export const birthdayConfig = {
  recipientName: "Mimi",
  title: "Birthday Storybook Town",
  subtitle: "Món quà nhỏ dành riêng cho ngày đặc biệt của bạn",
  character: {
    name: "Mimi",
    avatar: "assets/sprites/chibi_avatar.png"
  },
  memories: [
    {
      id: 1,
      title: "Chuyến đi đáng nhớ",
      date: "Mùa hè năm ấy",
      image: "assets/memories/memory1.jpg",
      caption: "Có những ngày thật bình thường, nhưng ở cạnh bạn lại thành kỷ niệm khó quên."
    },
    // ...
  ],
  gifts: [
    {
      id: 1,
      boxColor: "pink",
      title: "Hộp quà Nụ Cười",
      icon: "🎁",
      message: "Chúc bạn tuổi mới luôn rạng rỡ và ngập tràn tiếng cười mỗi ngày!"
    },
    // ...
  ],
  secretMessage: {
    sender: "Người gửi gắm yêu thương",
    letterText: `Chúc mừng sinh nhật!\n\nWebsite này có thể kết thúc ở đây, nhưng mình hy vọng những điều đẹp đẽ và hạnh phúc nhất dành cho bạn thì sẽ luôn tiếp diễn mãi mãi...`,
    footerNote: "Happy Birthday & Have a wonderful year ahead! 🎂✨"
  }
};
```

---

## 6. Trải nghiệm người dùng (UX & Responsiveness)
- Tương thích 100% Mobile (cảm ứng mượt mà, hỗ trợ xoay ngang/dọc, nút bấm to rõ, không bị zoom ngoài ý muốn).
- Hỗ trợ nút bật/tắt âm thanh (Mute/Unmute) góc trên.
- Nút "Hướng dẫn / Gợi ý" giúp người chơi không bao giờ bị lạc.
- Lưu tiến trình (localStorage) để người chơi có thể mở lại xem các ảnh và quà đã thu thập.

---

## 7. Kế hoạch xác thực (Verification Plan)
1. **Kiểm tra đồ họa 2.5D**: Kiểm tra Scene Three.js hiển thị đúng góc nhìn diorama, các sprite có viền trắng dập nổi, không bị méo tỷ lệ.
2. **Kiểm tra điều khiển & tương tác**: Di chuyển bằng chạm (mobile) và phím/chuột (desktop) đến đúng 6 trạm tương tác.
3. **Kiểm tra các Modal**: Mở hộp thoại, xem ảnh kỷ niệm, mở hộp quà, đóng mở mượt mà.
4. **Kiểm tra Ending Ceremony**: Nghi thức giữ màn hình thổi nến, hiệu ứng pháo hoa và modal thư mật hoạt động trọn vẹn.
5. **Kiểm tra Responsive**: Chạy trên kích thước Mobile (375px - 430px) và Desktop (1080p+).
