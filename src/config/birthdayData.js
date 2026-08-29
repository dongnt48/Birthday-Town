/**
 * ==========================================================================
 * Birthday Storybook Town — Config & Customization Data
 * ==========================================================================
 * Bạn có thể dễ dàng thay đổi tên, hình ảnh, lời chúc, kỷ niệm và thư bí mật
 * tại file này để cá nhân hóa cho người nhận.
 */

export const birthdayConfig = {
  // Tên & Thông tin người nhận
  recipientName: "Vyan",
  title: "Vyan's Birthday Town",
  subtitle: "Hành trình nhỏ chúc mừng sinh nhật tuổi mới của Vyan",
  
  // Nhạc nền (Tùy chọn: Để trống để dùng nhạc hộp nhạc Ghibli có sẵn, hoặc điền đường dẫn file mp3 như '/bgm.mp3')
  bgmUrl: "",

  // Nhân vật đại diện (Nữ - Vyan)
  character: {
    name: "Vyan",
    avatarEmoji: "👧",
    speed: 6.5
  },

  // 6 Khu Vực Chính Trên Bản Đồ
  zones: [
    {
      id: "house",
      index: 1,
      name: "Starting House",
      title: "Ngôi Nhà Nhỏ Xinh",
      icon: "🏡",
      dialogues: [
        {
          speaker: "DonDon",
          text: "Hôm nay là một ngày thật đặc biệt! Một hành trình nhỏ trong Vyan's Birthday Town đã được mình chuẩn bị riêng cho Vyan...",
          avatar: "👦"
        },
        {
          speaker: "DonDon",
          text: "Bây giờ, bạn hãy dạo bước khám phá thị trấn, thu thập đủ 5 ngôi sao điều ước và mở những món quà bất ngờ nhé! ✨",
          avatar: "👦"
        }
      ],
      nextHint: "Đi qua cây cầu phía trước để thu thập Wish Star đầu tiên 🌉"
    },
    {
      id: "bridge",
      index: 2,
      name: "Wish Bridge",
      title: "Cầu Lời Chúc",
      icon: "🌉",
      dialogues: [
        {
          speaker: "Ngôi Sao Lời Chúc",
          text: "Bạn đã nhặt được Wish Star đầu tiên! 🌟\n'Mỗi ngôi sao là một điều tốt lành và an yên gửi đến bạn hôm nay.'",
          avatar: "⭐"
        }
      ],
      nextHint: "Tiếp tục đi tới Vườn Kỷ Niệm bên trái 🌸"
    },
    {
      id: "garden",
      index: 3,
      name: "Memory Garden",
      title: "Vườn Kỷ Niệm",
      icon: "🌸",
      dialogues: [
        {
          speaker: "Khu Vườn Kỷ Niệm",
          text: "Chào mừng bạn đến với Vườn Kỷ Niệm! Nơi đây lưu giữ những khoảnh khắc thật đẹp mà chúng ta đã từng đi qua...",
          avatar: "📷"
        }
      ],
      nextHint: "Chạm vào các khung ảnh polaroid trong vườn để xem lại ký ức, rồi đến Quảng Trường Quà Tặng 🎁"
    },
    {
      id: "plaza",
      index: 4,
      name: "Gift Plaza",
      title: "Quảng Trường Quà Tặng",
      icon: "🎁",
      dialogues: [
        {
          speaker: "Quảng Trường Quà",
          text: "Tada! Quảng trường ngập tràn bóng bay và những hộp quà bất ngờ đang chờ bạn mở đấy! 🎉",
          avatar: "🎈"
        }
      ],
      nextHint: "Mở các hộp quà rồi bước vào Con Đường Ánh Sáng lung linh ✨"
    },
    {
      id: "lightpath",
      index: 5,
      name: "Light Path",
      title: "Con Đường Ánh Sáng",
      icon: "✨",
      dialogues: [
        {
          speaker: "Con Đường Ánh Sáng",
          text: "Những ngọn đèn lung linh thắp sáng lối đi, đưa bạn đến đích đến ý nghĩa nhất của hành trình...",
          avatar: "🏮"
        }
      ],
      nextHint: "Tiến thẳng về Lâu Đài Bánh Kem để thực hiện điều ước sinh nhật! 🎂"
    },
    {
      id: "castle",
      index: 6,
      name: "Cake Stage & Castle",
      title: "Sân Khấu Bánh Kem & Lâu Đài",
      icon: "🎂",
      dialogues: [
        {
          speaker: "Sân Khấu Sinh Nhật",
          text: "Bạn đã thu thập đủ tất cả những ngôi sao điều ước! Chiếc bánh kem khổng lồ đã thắp sáng ngọn nến lung linh...",
          avatar: "👑"
        }
      ],
      nextHint: "Nhấn giữ màn hình để thổi nến và gửi điều ước vào vũ trụ ✨"
    }
  ],

  // Danh Sách Ảnh Kỷ Niệm Polaroid trong Khu Vườn
  memories: [
    {
      id: "mem1",
      title: "Cô gái nhỏ hạnh phúc",
      date: "Mỗi ngày bình yên",
      icon: "🌻",
      image: "./images/photo1.jpg",
      objectPosition: "center top", // Vị trí căn chỉnh ảnh: "center top", "center center", "center 15%"
      caption: "Chúc cho cô gái nhỏ này luôn được cưng chiều, vui vẻ và ngập tràn hạnh phúc mỗi ngày! ✨"
    },
    {
      id: "mem2",
      title: "Chuyến đi ngập tràn tiếng cười",
      date: "Một ngày cuối tuần",
      icon: "🏖️",
      image: "./images/photo2.jpg",
      objectPosition: "center top",
      caption: "Dù là đi đâu, chỉ cần có nụ cười của Vyan thì mọi cảnh vật đều trở nên rực rỡ hơn rất nhiều."
    },
    {
      id: "mem3",
      title: "Bên ngoài lạnh lùng",
      date: "Một ngày bất ổn",
      icon: "🕶️",
      image: "./images/photo3.jpg",
      objectPosition: "center top",
      caption: "Bên ngoài tỏ vẻ lạnh lùng sang chảnh, bên trong thì 'hâm hâm' có tiếng trong giang hồ! 🤪🕶️"
    },
    {
      id: "mem4",
      title: "Khoảnh khắc đáng yêu",
      date: "Mỗi ngày trôi qua",
      icon: "✨",
      image: "./images/photo4.jpg",
      objectPosition: "center top",
      caption: "Mong Vyan luôn giữ được sự hồn nhiên, đáng yêu và trái tim nhân hậu này nhé!"
    }
  ],

  // Danh Sách Hộp Quà trong Quảng Trường Quà Tặng
  gifts: [
    {
      id: "gift1",
      boxColor: "#FFAAA5",
      title: "Hộp Quà: Nụ Cười Rạng Rỡ",
      icon: "😊",
      message: "Chúc bạn tuổi mới ngập tràn nụ cười, mỗi ngày thức dậy đều có thêm một lý do để thấy cuộc đời thật đáng yêu!"
    },
    {
      id: "gift2",
      boxColor: "#CDBBFF",
      title: "Hộp Quà: Bình Yên & May Mắn",
      icon: "🍀",
      message: "Mong mọi điều bạn đang ấp ủ và nỗ lực đều sẽ nở hoa vào đúng thời điểm rực rỡ nhất."
    },
    {
      id: "gift3",
      boxColor: "#FFEAA7",
      title: "Hộp Quà: Một Chiếc Ôm Ấm Áp",
      icon: "🫂",
      message: "Một chiếc 'ôm online' siêu to khổng lồ dành cho người tuyệt vời nhất! Dù có chuyện gì, vẫn luôn được yêu thương thật nhiều."
    }
  ],

  // Bảng Quote khắc dọc Con Đường Ánh Sáng
  quotes: [
    "“Mỗi tuổi mới là một trang sách mới đầy ắp những điều kỳ diệu.”",
    "“Hãy luôn tự tin tỏa sáng theo cách riêng của bạn.”",
    "“Hạnh phúc không ở đâu xa, nó luôn ở ngay trong những điều nhỏ bé quanh bạn.”"
  ],

  // Bức Thư Bí Mật Sau Màn Thổi Nến
  secretMessage: {
    title: "Gửi đến Vyan nhân ngày sinh nhật 🌸",
    letterText: `Gửi Vyan thân mến,

Chúc mừng sinh nhật bạn! Chúc bạn bước sang tuổi mới với thật nhiều niềm vui, sức khỏe dồi dào và luôn giữ được nụ cười rạng rỡ trên môi.

Cảm ơn bạn vì đã xuất hiện và đem lại rất nhiều khoảnh khắc ấm áp, tích cực cho mọi người xung quanh. 

Thế giới nhỏ Vyan's Birthday Town này được tạo nên từ những nét vẽ và những lời chúc chân thành nhất mà DonDon dành tặng riêng cho Vyan trong ngày hôm nay.

Website này có thể khép lại ở đây, nhưng mình hy vọng những điều đẹp đẽ, hạnh phúc và may mắn nhất dành cho bạn thì sẽ không bao giờ kết thúc.

Chúc bạn có một ngày sinh nhật thật trọn vẹn và tuổi mới ngập tràn yêu thương! 🎂✨`,
    sender: "— DonDon",
    footerNote: "Happy Birthday Vyan! Have a truly wonderful journey ahead 🌸"
  }
};
