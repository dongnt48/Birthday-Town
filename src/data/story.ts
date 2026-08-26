import { StoryConfig } from "@/types/story";

export const defaultStoryData: StoryConfig = {
  recipient: {
    name: "Ngọc Hân",
    nickname: "Hân Hân",
    birthDate: {
      day: 24,
      month: 8,
      year: 2000,
    },
  },
  intro: {
    mysteriousPrompt: "Có một điều đặc biệt đang chờ bạn...",
    touchPrompt: "Chạm nhẹ vào tia sáng",
    arrivedMessage: "Và rồi vào một ngày thật dịu dàng... bạn đã xuất hiện.",
  },
  memories: [
    {
      id: "memory-1",
      image: "/photos/memory-1.svg",
      dateText: "Khởi đầu",
      title: "Lần đầu gặp gỡ",
      caption: "Ánh mắt trong veo và nụ cười rạng rỡ làm sáng bừng cả một ngày u ám.",
      accentColor: "#f5d77f",
    },
    {
      id: "memory-2",
      image: "/photos/memory-2.svg",
      dateText: "Mùa thu",
      title: "Những buổi chiều êm ả",
      caption: "Cùng nhau dạo qua những con phố quen, nghe gió thổi nhẹ qua tán lá vàng.",
      accentColor: "#fba94b",
    },
    {
      id: "memory-3",
      image: "/photos/memory-3.svg",
      dateText: "Hoàng hôn",
      title: "Những chuyến đi xa",
      caption: "Đứng trước biển trời bao la, nhận ra thế giới này tuyệt đẹp khi có bạn đồng hành.",
      accentColor: "#89c4f4",
    },
    {
      id: "memory-4",
      image: "/photos/memory-4.svg",
      dateText: "Ngày mưa",
      title: "Góc quán nhỏ quen",
      caption: "Ly trà thơm, giai điệu êm dịu và những câu chuyện không bao giờ dứt.",
      accentColor: "#a8c087",
    },
    {
      id: "memory-5",
      image: "/photos/memory-5.svg",
      dateText: "Bình yên",
      title: "Từng khoảnh khắc giản đơn",
      caption: "Không cần hoa lệ, chỉ cần mỗi ngày đều thấy bạn an vui và mỉm cười.",
      accentColor: "#f8b4b4",
    },
  ],
  fragments: [
    {
      id: "fragment-matcha",
      type: "matcha",
      title: "Vị Matcha ngọt lành",
      caption: "Một chút đắng nhẹ ban đầu, để rồi đọng lại hậu vị ngọt thanh êm ái.",
      image: "/cutouts/matcha.svg",
      details: "Hương vị của sự bình yên và tĩnh tại",
    },
    {
      id: "fragment-flower",
      type: "flower",
      title: "Những đóa hoa nhỏ",
      caption: "Dịu dàng tỏa hương mà chẳng cần ồn ào, như chính con người bạn vậy.",
      image: "/cutouts/flower.svg",
      details: "Nở rộ theo cách riêng của chính mình",
    },
    {
      id: "fragment-book",
      type: "coffee",
      title: "Trang sách & Tách trà",
      caption: "Khoảng lặng dành cho tâm hồn giữa những xô bồ vội vã ngoài kia.",
      image: "/cutouts/book.svg",
      details: "Nơi lưu giữ những điều trong trẻo nhất",
    },
  ],
  storyPath: [
    {
      id: "path-1",
      chapter: "Chương I",
      title: "Sợi dây vô hình",
      quote: "Mỗi bước chân bạn đi qua đều để lại những vệt sáng lấp lánh.",
    },
    {
      id: "path-2",
      chapter: "Chương II",
      title: "Những ngày tháng quý giá",
      quote: "Cảm ơn vì đã luôn kiên cường, dịu dàng và không ngừng cố gắng.",
    },
    {
      id: "path-3",
      chapter: "Chương III",
      title: "Khoảnh khắc lắng đọng",
      quote: "Có những điều sẽ luôn ở lại, dẫu thời gian cứ thế trôi đi.",
    },
  ],
  wishes: [
    "Mong bạn vẫn luôn mỉm cười thật nhiều, vì nụ cười của bạn rất đẹp.",
    "Mong những điều bạn thầm nỗ lực đều sẽ sớm nhận được câu trả lời xứng đáng.",
    "Mong tuổi mới sẽ đối xử với bạn bằng sự dịu dàng và bao dung nhất.",
    "Và mong bạn luôn gặp được những người biết trân trọng sự chân thành nơi bạn.",
  ],
  candle: {
    instruction: "Hãy nhắm mắt, nghĩ về một điều ước thật đẹp...",
    buttonText: "Nhấn & Giữ để thổi nến",
    promptAfterBlow: "Điều ước của bạn đã được gửi tới các vì sao.",
  },
  explosion: {
    title: "HAPPY BIRTHDAY",
    subtitle: "Chúc mừng sinh nhật tuổi mới rạng rỡ!",
  },
  secretEnding: {
    triggerText: "Còn một điều nữa dành riêng cho bạn...",
    letterTitle: "Gửi người đặc biệt...",
    letterContent: [
      "Chào bạn, một năm nữa lại trôi qua với biết bao buồn vui và trải nghiệm.",
      "Cảm ơn bạn vì đã xuất hiện trên thế giới này, mang theo sự ấm áp và năng lượng tích cực đến cho mọi người xung quanh.",
      "Tuổi mới, chúc bạn có đủ dũng khí để theo đuổi những ước mơ, đủ bình yên để vượt qua những ngày giông bão, và luôn có thật nhiều sức khỏe, niềm vui.",
      "Dù ngoài kia có thế nào, hãy nhớ rằng bạn luôn xứng đáng được yêu thương và nâng niu.",
    ],
    closing: "Mừng ngày sinh nhật của bạn!",
    signature: "From someone who always cares ✦",
    giftPrompt: "Mở món quà bí mật",
  },
  finalMessage: {
    lines: [
      "Trang web này rồi cũng sẽ khép lại...",
      "Nhưng mình tin rằng,",
      "những điều kỳ diệu và hạnh phúc nhất",
      "đang chờ bạn phía trước thì không bao giờ kết thúc.",
    ],
  },
};
