import type { BlogPost } from "@/types/blog";
import { parseBlogMarkdown } from "@/lib/blog-markdown";

const body = `## It's Not the Meal. It's the Thirty Days Around It.

Thanksgiving dinner won't change your body. Neither will Christmas Eve, or the office party, or the one night you had three desserts. A single meal is a rounding error.

What changes your body is the pattern that runs in the background from mid-November to New Year's: the leftovers for a week, the cookie tray at work, the "I already blew it today" that turns one meal into a bad month. The big days are fine. The strategy is for the ordinary days in between.

That's good news, because ordinary days are easy to control. You don't need to white-knuckle through dinner with your family. You need a plan for the Tuesday after.

## The Plate Strategy

The simplest tool we know for the holidays is a plate you can picture.

- **Half the plate:** vegetables or salad, the stuff that fills you up for very few calories
- **A quarter:** protein, eaten first
- **A quarter:** whatever you actually want, the stuffing, the mashed potatoes, the roll

On a holiday, you don't have to follow it. On every other day, it keeps you full, keeps protein high, and leaves room for the things you enjoy without needing to count anything. The plate does the thinking for you.

## Seven Choices That Add Up

None of these is dramatic. All of them are repeatable, which is the only thing that matters over six weeks.

1. **Eat protein first.** Before the bread, before the sides, eat the turkey or the chicken or the eggs. You'll naturally eat less of everything else.
2. **Don't arrive starving.** Skipping lunch to "save room" almost always backfires. Eat a normal, protein-forward meal earlier in the day and you'll make better choices at the table.
3. **Walk after the big meal.** Ten to fifteen minutes. It helps with how you feel after a heavy plate and it keeps your step floor alive on the days it's easiest to drop.
4. **Drink water before the second helping.** Then decide if you still want it. Often you won't.
5. **Pick your indulgence.** Pie or the extra roll or the eggnog, not all three. Choosing one on purpose feels better than drifting through all of them.
6. **Send the leftovers home with someone else.** The meal is one day. The leftovers are a week. Keep what you'll enjoy and let the rest go.
7. **Never let one meal become a bad day.** One big dinner is normal. The next meal is just the next meal. The "I already blew it" story is the single most expensive thought of the season.

## Recover Between the Big Days

The days between holidays are where the season is won. That's where sleep, movement, and recovery either hold or fall apart.

Many of our clients use a weekly recovery appointment as the reset button. Whole-body cryotherapy and compression are often used by people who want to keep moving through the season without feeling heavy or run down. Red light therapy is a lie-down session that pairs well with the kind of quiet most people don't get in December.

For clients working on body composition, cryo body contouring sessions are frequently scheduled through November and December so any change has time to show before the New Year. That weekly visit also does something less obvious: it's a standing reminder that you're still in the game, even in the week after Thanksgiving.

## Make It a Habit, Not a Hack

Hacks get you through one party. Habits get you through the season, and then they're still there in February when everyone else has quit.

Pick two choices from the list above and the plate strategy for your ordinary days. Book a weekly session so there's a time and a place attached to the plan. Then enjoy the holidays, all of them, knowing you'll walk into January trimmer than you walked into November.`;

const post: BlogPost = {
  slug: "holiday-plate-strategy",
  title: "The Holiday Plate Strategy: Small Choices That Keep the Weight Off",
  seoTitle: "The Holiday Plate Strategy: Better Choices Without Missing Out | Zivel",
  description: "You can enjoy every holiday meal and still trim up by January. Seven small, repeatable choices that add up, plus how to recover between the big days.",
  publishDate: "2026-11-20",
  status: "scheduled",
  publishAt: "2026-11-20T08:00:00-06:00",
  tocBelowTitle: true,
  author: "Zivel Team",
  category: "Recovery & Wellness",
  readingTime: "5 min read",
  featured: true,
  content: parseBlogMarkdown(body),
};

export default post;
