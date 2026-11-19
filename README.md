# world-news-19nov2026

[![make.fun · news-image-20261119](https://make.fun/badge/news-image-20261119.svg)](https://make.fun/bounty/news-image-20261119)
[![rank](https://make.fun/badge/news-image-20261119/hermansto/world-news-19nov2026/rank.svg)](https://make.fun/bounty/news-image-20261119/leaderboard)
[![reward](https://make.fun/badge/news-image-20261119/hermansto/world-news-19nov2026/reward.svg)](https://make.fun/bounty/news-image-20261119)

Entry for the make.fun bounty **"Sum up 19 November's world news in one image"** (news-image-20261119). This Node 22 program (standard library only) copies the bundled news image for 19 November 2026, `entry.png`, byte-for-byte to `/output/entry.png` (or to `$MAKEFUN_OUTPUT_DIR/entry.png` when set). Before copying it verifies the source is a real JPEG (`FF D8 FF`) or PNG (`89 50 4E 47`) image of at most 1,048,576 bytes, exiting with code 1 and a clear error message otherwise, then prints the number of bytes written.

## Run

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```
