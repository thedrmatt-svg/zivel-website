export type SocialLinks = {
  facebook?: string;
  instagram?: string;
};

const socialLinks: Record<string, SocialLinks> = {
  bentonville: {
    facebook: "https://www.facebook.com/zivelbentonville",
    instagram: "https://www.instagram.com/zivel_bentonville/",
  },
  belmont: {
    facebook: "https://www.facebook.com/zivelbelmont",
    instagram: "https://www.instagram.com/zivel_belmont/",
  },
  brecksville: {
    facebook: "https://www.facebook.com/zivelbrecksville",
    instagram: "https://www.instagram.com/zivel_brecksville/",
  },
  buckhead: {
    facebook: "https://www.facebook.com/zivelbuckhead",
    instagram: "https://www.instagram.com/zivel_buckhead/",
  },
  briargate: {
    facebook: "https://www.facebook.com/zivelbriargate",
    instagram: "https://www.instagram.com/zivel_briargate/",
  },
  "coral-gables": {
    facebook: "https://www.facebook.com/profile.php?id=61566557044968",
    instagram: "https://www.instagram.com/zivel_coralgables",
  },
  // location slug is "windermere"
  windermere: {
    facebook: "https://www.facebook.com/ZivelWindermere",
    instagram: "https://www.instagram.com/zivelcummingwindermere",
  },
  fayetteville: {
    facebook: "https://www.facebook.com/ZivelFayetteville",
    instagram: "https://www.instagram.com/zivelfayetteville/",
  },
  fieldhouse: {
    facebook: "https://www.facebook.com/zivelfieldhouse",
    instagram: "https://www.instagram.com/zivelfieldhouse/",
  },
  // location slug is "cool-springs"
  "cool-springs": {
    facebook: "https://www.facebook.com/profile.php?id=61566746609568",
    instagram: "https://www.instagram.com/zivel_franklincs/",
  },
  "highlands-ranch": {
    facebook: "https://www.facebook.com/zivelhighlandsranch",
    instagram: "https://www.instagram.com/zivel_highlandsranch/",
  },
  hollywood: {
    facebook: "https://www.facebook.com/zivelhollywood",
    instagram: "https://www.instagram.com/zivelhollywood/",
  },
  metairie: {
    facebook: "https://www.facebook.com/zivelmetairie",
    instagram: "https://www.instagram.com/zivel_metairie/",
  },
  murfreesboro: {
    facebook: "https://www.facebook.com/zivelmurfreesboro",
    instagram: "https://www.instagram.com/zivel_murfreesboro/",
  },
  newport: {
    facebook: "https://www.facebook.com/profile.php?id=61571332508257",
    instagram: "https://www.instagram.com/zivel_newport/",
  },
  "palm-coast": {
    facebook: "https://www.facebook.com/zivelpalmcoast",
    instagram: "https://www.instagram.com/zivel_palmcoast/",
  },
  parker: {
    facebook: "https://www.facebook.com/zivelparker",
    instagram: "https://www.instagram.com/zivel_parker/",
  },
  riverton: {
    facebook: "https://www.facebook.com/zivelriverton",
    instagram: "https://www.instagram.com/zivel_riverton/",
  },
  rogers: {
    facebook: "https://www.facebook.com/profile.php?id=61564191196804",
    instagram: "https://www.instagram.com/zivelrogers/",
  },
};

export function getLocationSocial(slug: string): SocialLinks {
  return socialLinks[slug] ?? {};
}
