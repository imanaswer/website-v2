# TODO

## Homepage hero (video background)

The hero shows a poster image for ~4-5s before the video starts — that's the
3.5 MB `public/hero.mp4` downloading over the network. Improvements:

- [ ] **Change the poster to a higher-quality image.** Replace the current
      poster (`IMG.campus` in `src/pages/HomePage.jsx`, the `<video poster=…>`)
      with a sharper, well-composed shot. Ideally use the video's exact first
      frame so the switch from poster → video is seamless (no visible jump).
- [ ] **Replace the hero video with a 1080p+ source (priority).** The current
      `public/hero.mp4` is only **640×360 (360p)**, so it's blurry when stretched
      across the full-width hero. Re-encoding can't fix it — needs a genuine HD
      source. Also: the current clip is generic North-American campus stock, not
      the actual school — swap in real Sri Gujarati Vidyalaya footage. Keep the
      1080p export reasonably compressed so it still starts within ~1-2s.
- [ ] **Fade the video in** when it actually starts playing (`onPlaying`
      handler in `HomePage.jsx`) to smooth the transition.
