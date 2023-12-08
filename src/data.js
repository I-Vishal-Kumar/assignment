import profile_img_1 from "./COMPONENTS/ASSETS/profile_img_1.png";
import profile_img_2 from "./COMPONENTS/ASSETS/profile_img_2.png";
import profile_img_3 from "./COMPONENTS/ASSETS/profile_img_3.png";
import profile_img_4 from "./COMPONENTS/ASSETS/profile_img_4.png";
import card_1_bg from "./COMPONENTS/ASSETS/card_1_bg.png";
import card_2_bg from "./COMPONENTS/ASSETS/card_2_bg.png";
import card_3_bg from "./COMPONENTS/ASSETS/card_3_bg.png";
let card_data = [
  {
    type: "card",
    image: card_1_bg,
    subheading: "I’ve worked in UX for the better part of a decade. F..",
    heading: "What if famous brands had regular fonts? Meet RegulaBrands!",
    profile_image: profile_img_1,
    genere: "✍️ Article",
    views: "1.4",
    name: "Sarthak Kamra",
  },
  {
    type: "card",
    image: card_2_bg,
    subheading: "I’ve worked in UX for the better part of a decade. F..",
    heading:
      "Tax Benefits for Investment under National Pension Scheme launched by Government",
    profile_image: profile_img_2,
    genere: "🔬️ Education",
    views: "4.8",
    name: "Sarah West",
  },
  {
    type: "meetup",
    image: card_3_bg,
    subheading: "I’ve worked in UX for the better part of a decade. F..",
    heading: "Finance & Investment Elite Social Mixer @Lujiazui!",
    profile_image: profile_img_3,
    genere: "🗓️ Meetup",
    views: "1.4",
    name: "Sarthak Kamra",
    button_text: "Visit Website",
  },
  {
    type: "job",
    subheading: "I’ve worked in UX for the better part of a decade. F..",
    heading: "Software Developer - II",
    profile_image: profile_img_4,
    genere: "💼️ Job",
    views: "1.7",
    name: "Joseph Gray",
    button_text: "Apply on Timejobs",
  },
];

export default card_data;
