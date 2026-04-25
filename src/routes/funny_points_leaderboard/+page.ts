import type { Point } from "$lib/interfaces/funny_points_leaderboard/Point";
import type { PageLoad } from "./$types";

const points: Point[] = [
  {
    username: "pinkfluffyseal",
    date: new Date("2025-12-20T05:17:21.439Z"),
    diff: 1,
    message: {
      hasImage: true,
      src: "https://c.tenor.com/0PnZLeWJPE8AAAAd/tenor.gif",
      alt: "Fight Knock Out GIF",
      messageList: ["pov ur jake paul"],
    },
    context: "Watching Jake Paul fight Anthony Joshua",
  },
  {
    username: "NotTooSwift",
    date: new Date("2026-01-01T01:15:52.905Z"),
    diff: 1,
    message: {
      hasImage: false,
      src: "",
      alt: "",
      messageList: ["WubDub: How much xp if Eleven dies?", "NotTooSwift: 11."],
    },
    context: "Watching Stranger Things finale",
  },
  {
    username: "victoriaskyetv",
    date: new Date("2026-01-11T01:42:40.722Z"),
    diff: -1,
    message: {
      hasImage: false,
      src: "",
      alt: "",
      messageList: [
        "Peeta (Movie): It's huge, it's incredible.",
        "victoriaskyetv: That's what she said.",
      ],
    },
    context: "Watching Hunger Games",
  },
  {
    username: "Chandiggitydog",
    date: new Date("2026-02-15T22:13:48.190Z"),
    diff: 1,
    message: {
      hasImage: false,
      src: "",
      alt: "",
      messageList: [
        "WubDub_: At least I'm not the quiet and dumb kid.",
        "Chandiggitydog: Did somebody say my name?",
      ],
    },
    context: "None",
  },
  {
    username: "TheFox580",
    date: new Date("2026-02-23T02:17:06.605Z"),
    diff: 1,
    message: {
      hasImage: false,
      src: "",
      alt: "",
      messageList: [
        "victoriaskyetv: Yeah when I worked at Panera...",
        "TheFox580: Where did you not work?",
      ],
    },
    context: "Talking about free drink",
  },
  {
    username: "dolphinman_rl",
    date: new Date("2026-03-07T06:30:47.546Z"),
    diff: 1,
    message: {
      hasImage: false,
      src: "",
      alt: "",
      messageList: [
        "dolphinman_rl: How does MCC Island have a better economic system then real life?!",
      ],
    },
    context: "None",
  },
  {
    username: "TheFox580",
    date: new Date("2026-04-18T00:25:34.629Z"),
    diff: 1,
    message: {
      hasImage: false,
      src: "",
      alt: "",
      messageList: [
        "TheFox580: I actually built the whole server by hand. It's been really hard, you guys keep loading chunks.",
      ],
    },
    context: "Talking about TheFox580 working on the Goofy SMP",
  },
];

export const load: PageLoad = () => {
  return { points };
};
