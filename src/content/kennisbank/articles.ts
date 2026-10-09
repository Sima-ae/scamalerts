import type { KennisbankArticle } from "./types";
import { articles as bankArticles } from "./articles/scams-bank";
import { articles as chatArticles } from "./articles/scams-chat";
import { articles as governmentArticles } from "./articles/scams-gov";
import { articles as investmentArticles } from "./articles/scams-invest";
import { articles as marketplaceArticles } from "./articles/scams-marktplaats";
import { articles as romanceArticles } from "./articles/scams-romance";
import { articles as shoppingArticles } from "./articles/scams-shopping";
import { articles as workArticles } from "./articles/scams-work";
import { articles as moreArticles } from "./articles/scams-more";
import { articles as trustScoreArticles } from "./articles/trust-score";

export const KENNISBANK_ARTICLES: KennisbankArticle[] = [
  ...shoppingArticles,
  ...bankArticles,
  ...governmentArticles,
  ...chatArticles,
  ...marketplaceArticles,
  ...investmentArticles,
  ...workArticles,
  ...romanceArticles,
  ...moreArticles,
  ...trustScoreArticles,
];
