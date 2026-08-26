# Birthday Storybook Town

## Mini Game Sinh Nhật — Option A

### Phong cách: Storybook Birthday Map / 2D Hand-Drawn / Cute + Ấm Áp + Lung Linh

---

# 1. Mục tiêu dự án

Tạo một **mini game sinh nhật** theo kiểu:

* map 2D storybook
* người chơi điều khiển nhân vật đi khám phá
* mỗi khu vực mở ra một kỷ niệm hoặc lời chúc
* gameplay nhẹ, không áp lực, không thua
* phù hợp xem/chơi trên điện thoại
* art style dễ thương, ấm áp, đúng chất sinh nhật
* toàn bộ **asset có thể dùng AI để tự tạo**

Game này không đi theo hướng game phức tạp, mà là một **hành trình chúc mừng sinh nhật có tương tác**.

Mục tiêu cảm xúc:

> người được tặng không chỉ “xem” lời chúc, mà sẽ “đi qua” một thế giới nhỏ được tạo riêng cho mình.

---

# 2. Concept chính

## Birthday Storybook Town

Một thị trấn truyện tranh nhỏ được trang trí cho ngày sinh nhật.

Người chơi bắt đầu từ một căn nhà nhỏ, đi qua những khu vực mang ý nghĩa khác nhau:

* khởi đầu hành trình
* cầu lời chúc
* vườn kỷ niệm
* quảng trường quà tặng
* con đường ánh sáng
* sân khấu / lâu đài sinh nhật cuối

Mỗi nơi người chơi tới sẽ mở ra:

* một lời chúc
* một ảnh kỷ niệm
* một câu chuyện ngắn
* một mảnh ký ức
* hoặc một món quà tinh thần nhỏ

---

# 3. Định hướng tổng thể

## Vibe chính

* cute nhưng không quá con nít
* ấm áp
* sinh nhật
* storybook
* mềm mại
* có chút lung linh
* có cảm giác “được chuẩn bị riêng”

## Từ khóa hình ảnh

* storybook town
* birthday village
* hand-drawn
* paper cutout
* pastel
* ribbon
* gift box
* balloons
* memory frames
* string lights
* sparkles
* fairy dust
* warm glow

---

# 4. Art style

## Phong cách minh họa

* 2D hand-drawn
* paper cutout / sticker-like
* nét mềm
* hình khối đơn giản
* màu pastel
* cảm giác như một thế giới thủ công / truyện tranh giấy

## Góc nhìn

* top-down nhẹ hoặc isometric nhẹ
* giống mẫu tham khảo ở tinh thần gameplay
* nhưng visual phải “birthday” hơn, mềm hơn, đáng yêu hơn

## Chất liệu

* nền giấy / texture nhẹ
* viền cắt giấy
* bóng đổ nhẹ
* tone màu sáng, ấm
* điểm nhấn bằng ánh sáng mềm và particle nhẹ

---

# 5. Màu sắc đề xuất

## Màu chính

* Cream: `#FFF6E9`
* Peach: `#F9D7C4`
* Blush Pink: `#F6C1D1`
* Lavender: `#CDBBFF`
* Butter Yellow: `#F7E38A`
* Mint: `#CDEEDC`

## Màu phụ

* Soft Sky: `#BFE3FF`
* Warm Coral: `#F6AFA1`
* Light Gold: `#F4D67C`

## Màu nhấn

* Warm Glow: `#FFDFA3`
* Sparkle White: `#FFF9F3`
* Storybook Purple Shadow: `#8E7CC3`

## Cảm giác màu

Không dùng quá nhiều xanh lá đồng quê như mẫu tham khảo.
Ưu tiên:

* kem
* hồng đào
* tím nhạt
* vàng nhạt
* mint nhẹ

để nhìn đúng tinh thần sinh nhật hơn.

---

# 6. Luồng gameplay tổng thể

```text
Starting House
↓
Wish Bridge
↓
Memory Garden
↓
Gift Plaza
↓
Light Path
↓
Birthday Castle / Cake Stage
↓
Happy Birthday Ending
↓
Secret Message
```

---

# 7. Cấu trúc map

## 7.1 Starting House

### Vai trò

Điểm bắt đầu hành trình.

### Nội dung

Người chơi xuất hiện trước một căn nhà nhỏ xinh có trang trí sinh nhật.

### Visual

* nhà mái màu pastel
* dây cờ nhỏ
* vài quả bóng bay
* hộp thư / bảng gỗ
* đèn ngôi sao treo trước nhà

### Tương tác

Khi bắt đầu game, hộp thoại xuất hiện:

> “Hôm nay có một hành trình nhỏ dành riêng cho bạn...”

Sau đó một đốm sáng hoặc mũi tên nhẹ dẫn người chơi đi tiếp.

---

## 7.2 Wish Bridge

### Vai trò

Mở đầu phần “đi vào thế giới sinh nhật”.

### Visual

* cây cầu nhỏ xinh
* hai bên có dây ruy băng
* đèn sao treo dọc cầu
* vài mảnh confetti nhỏ
* biển chỉ dẫn “Make a wish”

### Tương tác

Người chơi đi qua cầu và nhặt **Wish Star đầu tiên**.

### Nội dung

Mở câu thoại ngắn:

> “Mỗi ngôi sao là một điều đẹp dành cho bạn hôm nay.”

---

## 7.3 Memory Garden

### Vai trò

Khu vực chứa ảnh và kỷ niệm.

### Visual

* khu vườn mềm mại
* cây treo ảnh
* khung ảnh nhỏ cắm trên cỏ
* hoa pastel
* ghế gỗ
* dây đèn nhẹ
* bảng “Our Memories”

### Tương tác

Người chơi chạm vào:

* khung ảnh
* cây kỷ niệm
* bụi hoa có ánh sáng
* photobooth frame nhỏ

Mỗi điểm chạm sẽ mở:

* 1 ảnh
* 1 câu ngắn
* 1 kỷ niệm

### Ví dụ nội dung

* “Có những ngày rất bình thường, nhưng lại thành điều mình nhớ mãi.”
* “Bức ảnh này luôn làm mình thấy vui.”
* “Một kỷ niệm nhỏ nhưng thật đáng yêu.”

---

## 7.4 Gift Plaza

### Vai trò

Khu vui nhất của bản đồ.

### Visual

* quảng trường nhỏ
* nhiều hộp quà
* bàn tiệc mini
* cờ tam giác
* bóng bay
* hộp quà khổng lồ
* confetti nhẹ dưới đất
* quầy quà / booth nhỏ

### Tương tác

Người chơi mở từng hộp quà.

Mỗi hộp quà có thể chứa:

* một lời chúc ngắn
* một sticker
* một icon đại diện cho sở thích
* một món quà tinh thần
* một câu trêu đùa dễ thương

### Ví dụ nội dung

* “Mong bạn luôn vui vẻ.”
* “Mong mọi điều bạn chờ đợi đều tới đúng lúc.”
* “Món quà này là một chiếc ôm online :))”

---

## 7.5 Light Path

### Vai trò

Kết nối cảm xúc trước đoạn kết.

### Visual

* con đường sáng mềm
* đèn nhỏ dọc lối đi
* bụi sáng / fairy dust
* những ngôi sao nhỏ bay rất nhẹ
* vài biển gỗ nhỏ có quote

### Tương tác

Người chơi đi qua từng mốc nhỏ trên đường.

Mỗi mốc có thể hiện:

* một câu ngắn
* một mẩu suy nghĩ
* một wish fragment
* một biểu tượng trái tim / ngôi sao / nơ

### Mục đích

Làm nhịp game dịu lại trước đoạn sinh nhật chính.

---

## 7.6 Birthday Castle / Cake Stage

### Vai trò

Điểm cuối map, nơi diễn ra khoảnh khắc chính.

### Visual hướng 1

* lâu đài mini dễ thương
* đèn sáng
* banner “Happy Birthday”
* cờ / ruy băng
* lối vào phát sáng

### Visual hướng 2

* sân khấu bánh kem khổng lồ
* nến lớn
* vòng đèn
* background như quảng trường tiệc

### Đề xuất

Nên kết hợp cả hai:

* bên ngoài là **Birthday Castle**
* bên trong / trung tâm là **Cake Stage**

### Tương tác

Khi người chơi đến đây và đã thu đủ item chính:

* các Wish Star bay lên
* khu vực sáng dần
* bánh kem xuất hiện
* hiện hướng dẫn:

  > “Press and hold to make a wish ✨”

Người chơi giữ màn hình → nến tắt → màn hình tối → pháo hoa → hiện lời chúc chính.

---

# 8. Core gameplay

Game không cần phức tạp.

## Vòng lặp chính

* đi bộ / di chuyển
* khám phá điểm tương tác
* chạm để mở nội dung
* nhặt Wish Star / Memory Star
* mở dần các khu vực
* đến điểm cuối để kích hoạt ending

## Không cần

* combat
* tính điểm
* game over
* timer
* puzzle khó
* nhiệm vụ rối

## Mục tiêu chính

Khám phá và cảm nhận.

---

# 9. Loại tương tác trong game

## 9.1 Chạm object

Ví dụ:

* chạm khung ảnh
* chạm hộp quà
* chạm cây treo lời chúc
* chạm bảng gỗ

## 9.2 Đi vào vùng kích hoạt

Ví dụ:

* đi lên cầu
* đi vào vườn kỷ niệm
* tiến đến sân khấu cuối

## 9.3 Nhặt item

Ví dụ:

* Wish Star
* Memory Star
* Ribbon Token
* Gift Token

## 9.4 Hold interaction

Dùng ở cuối game:

* giữ để thổi nến / make a wish

---

# 10. Các item chính

## Wish Star

Ngôi sao lời chúc.

Vai trò:

* đại diện cho lời chúc
* thu thập xuyên suốt map
* kích hoạt ending

## Memory Star

Ngôi sao ký ức.

Vai trò:

* mở ảnh / kỷ niệm
* làm sáng map dần

## Gift Token

Biểu tượng món quà nhỏ.

Vai trò:

* nhặt trong Gift Plaza
* tăng cảm giác progression nhẹ

## Ribbon Mark

Dấu ruy băng / nơ.

Vai trò:

* dùng làm điểm trang trí hành trình
* có thể là collectible phụ

---

# 11. Hệ thống nội dung

## 11.1 Memories

Dạng:

* ảnh + caption
* hoặc ảnh + 1 câu ngắn

## 11.2 Wishes

Dạng:

* lời chúc ngắn
* ấm áp
* dễ thương
* chân thành

## 11.3 Funny notes

Dạng:

* câu trêu nhẹ
* đáng yêu
* vui

## 11.4 Secret ending message

Dạng:

* lời nhắn cuối
* có thể cảm xúc hơn
* có thể là “One more thing...”

---

# 12. UI phong cách

UI không nên giống game fantasy cổ điển nặng nề.

## Giao diện nên là

* postcard style
* greeting card style
* bo góc mềm
* viền mảnh
* họa tiết nơ / sao nhỏ
* màu kem / hồng / vàng nhạt

## Thành phần UI chính

* hộp thoại nội dung
* nút pause
* nút next
* icon thu thập sao
* hint nhẹ khi tới gần vật thể

## Hộp thoại

Nên nằm dưới màn hình, mềm mại, sạch và dễ đọc.

Có thể giống:

* một tờ thiệp
* một mảnh giấy note đẹp
* một khung lời nhắn sinh nhật

---

# 13. Hiệu ứng hình ảnh

## Nên có

* sparkle nhẹ khi mở nội dung
* fairy dust theo bước chân hoặc quanh điểm tương tác
* bokeh rất nhẹ foreground
* đèn sao nhấp nháy chậm
* confetti nhỏ khi mở quà
* glow mềm quanh vật thể quan trọng
* pháo hoa ở ending

## Không nên

* quá nhiều particle
* quá nhiều glow
* hiệu ứng giả kiểu game demo
* lạm dụng chuyển động làm rối mắt

## Quy tắc

Hiệu ứng chỉ để tăng cảm giác “được chuẩn bị riêng”, không phải để khoe kỹ thuật.

---

# 14. Âm thanh

## Nền nhạc

* nhẹ
* vui
* ấm
* có cảm giác sinh nhật / mộng mơ

## SFX

* nhặt sao: chime nhẹ
* mở quà: pop mềm
* mở ảnh: sparkle
* thắp / tắt nến: soft whoosh
* ending: pháo hoa nhẹ + nhạc cao trào hơn

## Lưu ý

Âm thanh cần dịu, không game-like quá mạnh.

---

# 15. Ending

Khi người chơi tới khu cuối và đã hoàn thành hành trình:

## Trình tự

1. Wish Star bay lên
2. khu vực cuối sáng dần
3. banner hoặc ánh sáng hiện “Make a wish”
4. người chơi giữ màn hình
5. nến tắt
6. màn hình tối một nhịp
7. pháo hoa + confetti + sparkles
8. hiện:

# HAPPY BIRTHDAY

**[Tên người được tặng]**

9. sau đó mở **Secret Message**

---

# 16. Secret Message

Sau ending chính, hiện một phần bí mật:

## Có thể là

* lời nhắn dài hơn
* một câu rất cảm xúc
* một ảnh đặc biệt
* một đoạn voice / video
* một câu troll đáng yêu

## Text ví dụ

> “Website này có thể kết thúc ở đây,
> nhưng mình hy vọng những điều đẹp nhất dành cho bạn thì không.”

---

# 17. Danh sách asset AI cần tạo

Toàn bộ asset có thể do AI tạo, sau đó chọn lọc và tinh chỉnh.

## 17.1 Map nền tổng

* 1 bản đồ tổng thể Birthday Storybook Town
* dạng top-down / isometric nhẹ
* phong cách 2D hand-drawn storybook
* màu pastel

## 17.2 Khu Starting House

* nhà nhỏ sinh nhật
* hàng rào
* biển gỗ
* dây cờ
* bóng bay
* đèn sao

## 17.3 Khu Wish Bridge

* cầu nhỏ
* cột cầu
* ruy băng
* dây đèn
* ngôi sao treo
* bảng chỉ dẫn

## 17.4 Khu Memory Garden

* cây treo ảnh
* khung ảnh
* bụi hoa
* ghế gỗ
* biển “memories”
* photobooth frame nhỏ

## 17.5 Khu Gift Plaza

* hộp quà nhiều kích thước
* bàn quà
* booth nhỏ
* cờ trang trí
* cụm bóng bay
* confetti decor

## 17.6 Khu Light Path

* lối đi phát sáng
* đèn nhỏ
* cọc biển quote
* ngôi sao đặt dọc đường
* cỏ trang trí

## 17.7 Khu Birthday Castle / Cake Stage

* lâu đài mini sinh nhật
* cổng chào
* sân khấu
* bánh kem lớn
* nến
* banner “Happy Birthday”
* dây đèn

## 17.8 Nature / Decor assets

* cây pastel
* bụi cây
* hoa nhỏ
* mây cutout
* hồ nước nhỏ
* ngôi sao trang trí
* đèn lồng / đèn sao
* nơ / ribbon decor

## 17.9 Character assets

* nhân vật chính chibi / dễ thương
* NPC dễ thương nếu cần
* animation cơ bản:

  * idle
  * walk
  * react / celebrate

## 17.10 UI assets

* hộp thoại
* nút pause
* nút next
* icon star
* icon gift
* icon memory
* bảng gỗ
* popup khung ảnh

## 17.11 Ending assets

* bánh kem
* nến
* pháo hoa 2D / FX
* confetti
* banner happy birthday
* frame secret message

---

# 18. Quy tắc tạo asset bằng AI

## Mục tiêu

Tất cả asset phải **đồng bộ cùng một art style**.

## Nguyên tắc

* cùng tông màu
* cùng độ mềm
* cùng hướng nhìn
* cùng mức chi tiết
* cùng chất liệu storybook / cutout

## Tránh

* asset này kiểu hoạt hình, asset kia kiểu semi-realistic
* chênh tỷ lệ
* phối màu quá lệch
* một số object quá 3D, số khác quá phẳng

## Workflow đề xuất

1. chốt art style trước
2. tạo key visual tổng
3. tạo map tổng
4. tạo bộ object theo từng khu
5. tạo nhân vật
6. tạo UI
7. tạo FX / ending assets
8. đồng bộ lại bằng tinh chỉnh cuối

---

# 19. Nguyên tắc thiết kế nhân vật

## Hướng đề xuất

* chibi nhẹ
* dễ thương
* đơn giản
* hợp thế giới storybook
* không quá nhiều chi tiết

## Có thể chọn 1 trong 2 hướng

### Hướng A — Nhân vật người

* tóc, quần áo dễ thương
* phong cách truyện tranh
* đại diện người chơi

### Hướng B — Mascot / avatar

* cute hơn
* có thể cá nhân hóa cho người được tặng

## Đề xuất hiện tại

Dùng **nhân vật người/chibi** trước để dễ triển khai.

---

# 20. Camera và bố cục

## Camera

* góc nhìn từ trên xuống nhẹ
* không quá nghiêng
* rõ đường đi
* rõ vùng tương tác

## Màn hình mobile

* bố cục phải thoáng
* object không quá dày
* khoảng cách đủ để người chơi dễ nhìn

## Quy tắc

Map nên xinh nhưng không được rối.

---

# 21. Công nghệ gợi ý

Nếu sau này triển khai game thật, có thể đi theo hướng:

## Frontend / Game

* Phaser
* hoặc PixiJS
* hoặc Godot Web nếu muốn mạnh hơn

## Nếu cần web wrapper

* Next.js để bọc landing / intro / share page

## Asset

* AI generated illustrations
* AI assisted icons / decorations
* chỉnh sửa hậu kỳ bằng design tool

---

# 22. MVP đề xuất

Phiên bản đầu chỉ cần:

* 1 map tổng
* 1 nhân vật chính
* 6 khu vực chính
* 4–6 memory points
* 3–5 gift boxes
* 1 ending thổi nến
* 1 màn Happy Birthday
* 1 secret message

Không cần làm quá nhiều hệ thống.

Điểm quan trọng nhất của MVP:

* đẹp
* rõ
* ấm áp
* đúng chất sinh nhật

---

# 23. Tư tưởng cốt lõi

Game này không phải để “chơi giỏi”.

Nó là một **món quà tương tác**.

Người được tặng sẽ:

* đi qua thế giới nhỏ
* mở từng điều bất ngờ
* nhìn thấy ký ức
* đọc lời chúc
* cảm nhận sự chuẩn bị
* và kết thúc bằng một khoảnh khắc sinh nhật dành riêng cho họ

---

# 24. Câu chốt định hướng

> Đây không phải một game thông thường.

Mà là:

> một thị trấn sinh nhật nhỏ, nơi từng con đường, từng món quà và từng ngôi sao đều được tạo ra chỉ để chúc mừng một người đặc biệt.

---

# 25. Tóm tắt chốt cuối

## Concept

**Birthday Storybook Town**

## Vibe

* cute
* ấm áp
* sinh nhật
* storybook
* lung linh nhẹ

## Gameplay

* đi khám phá
* mở ảnh / quà / lời chúc
* thu thập sao
* tới sân khấu cuối
* make a wish
* happy birthday ending

## Asset

* toàn bộ có thể **AI tự tạo**
* cần đồng bộ art style ngay từ đầu

## Điểm mạnh

* dễ thương
* rõ chất sinh nhật
* hợp mobile
* dễ cá nhân hóa
* đủ cảm xúc
