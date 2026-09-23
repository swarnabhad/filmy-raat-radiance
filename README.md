# Filmi Raat Radio

Build a complete, production-ready, responsive web application called:



FILMI RAAT



Tagline:



"पुरानी रातें। पुराने नग़मे। वही जादू।"



English tagline:



"Press play. Close your eyes. Go back in time."



The website is a premium immersive retro-Bollywood music experience inspired by the simplicity and interaction model of this reference website:



https://deluxsalon.in/busdriver/



IMPORTANT:

Use the reference only as inspiration for the overall EXPERIENCE and interaction philosophy.



Do NOT copy its:



- Branding

- Logo

- Text

- Images

- Artwork

- Exact visual design

- Code

- Copyrighted assets



Create a completely original product called FILMI RAAT.



==================================================



1. PRODUCT CONCEPT

   ==================================================



Filmi Raat is a digital retro-Bollywood radio experience.



The user visits the website and immediately sees an immersive Bollywood-retro cinema environment.



The primary action is:



▶ ENTER FILMI RAAT



After the user clicks it:



- Music starts

- The current song is detected automatically

- The exact song title is displayed

- A vintage vinyl begins rotating

- "ON AIR" becomes active

- The user can browse/control the playlist



The experience should feel like entering an old Bollywood cinema late at night.



Think:



1970s Bollywood cinema

+

1980s cassette culture

+

1990s Hindi music

+

old radio

+

film reels

+

modern premium web design.



Do NOT make this look like Spotify.



Do NOT make this look like a generic music streaming website.



It should feel like a fictional Bollywood radio station.



==================================================

2. MUSIC SOURCE — VERY IMPORTANT



The ONLY music source for the MVP is this exact YouTube Music playlist:



https://music.youtube.com/playlist?list=PLLounUW9rgqGDmPxbZBerszf0dBq_M93b&si=Wfo7Ob3uOU0TPLPN



Playlist ID:



PLLounUW9rgqGDmPxbZBerszf0dBq_M93b



YouTube/YouTube Music is the source of truth for the music.



Do NOT manually create the playlist in the application.



Do NOT hard-code song names.



Do NOT download any songs.



Do NOT host audio files.



Do NOT scrape YouTube HTML.



Do NOT use unofficial YouTube scraping libraries.



Use official YouTube embedding/API mechanisms.



==================================================

3. YOUTUBE PLAYER



Use the official YouTube IFrame Player API.



Load the playlist using the playlist ID:



PLLounUW9rgqGDmPxbZBerszf0dBq_M93b



The application must be able to:



- Play

- Pause

- Next

- Previous

- Seek

- Change volume

- Mute/unmute

- Detect playback state

- Detect current video

- Detect playlist index

- Detect song changes

- Detect when a song ends



Use:



playsinline=1



for mobile compatibility.



The custom Filmi Raat UI should control the embedded YouTube player through the official API.



Do not create a separate audio player.



==================================================

4. EXACT SONG NAME DISPLAY — CRITICAL



The website MUST automatically detect the exact song currently playing.



The user must NEVER see a manually entered or fabricated song name.



When YouTube changes to another video:



1. Detect the new video ID.

2. Determine the current playlist index.

3. Retrieve metadata for that video.

4. Read the exact YouTube title.

5. Display that exact title in the Filmi Raat interface.



The title should come from YouTube metadata.



For example, if YouTube returns:



"Pal Pal Dil Ke Paas | Kishore Kumar | Blackmail"



display:



"Pal Pal Dil Ke Paas | Kishore Kumar | Blackmail"



Do NOT change it to:



"Pal Pal Dil Ke Paas"



Do NOT translate it.



Do NOT shorten it.



Do NOT add marketing text.



Do NOT creatively rewrite it.



The "NOW PLAYING" title must exactly match the source metadata.



==================================================

5. YOUTUBE DATA API



Use the YouTube Data API v3 where required for metadata.



Use playlist/video metadata to obtain:



- videoId

- title

- channelTitle

- thumbnail

- playlistIndex

- duration where available



Use the YouTube Data API to synchronize the playlist metadata.



Create a reusable service such as:



youtubeService.ts



and a centralized music state/context such as:



MusicContext.tsx



==================================================

6. API KEY SECURITY



NEVER expose a privileged YouTube API key directly in the frontend.



If a YouTube Data API key is required:



Use a Firebase Cloud Function / secure backend endpoint.



Store the key as a Firebase secret/environment variable.



Frontend:



Filmi Raat

↓

Firebase Function

↓

YouTube Data API

↓

Metadata

↓

Filmi Raat UI



Never commit API credentials to the repository.



==================================================

7. PLAYLIST SYNCHRONIZATION



The YouTube playlist is the source of truth.



The application should dynamically retrieve its contents.



If I add a new song to the YouTube playlist later, the website should automatically pick it up after the next metadata refresh.



I should NOT have to modify React code.



I should NOT have to manually add song titles.



Create a metadata cache to avoid unnecessary API calls.



Suggested Firebase structure:



youtubePlaylist

playlistId

lastSynced

videos[]



Each video:



{

videoId,

title,

channelTitle,

thumbnailUrl,

playlistIndex,

duration

}



For MVP, refresh the playlist metadata every 6–24 hours.



==================================================

8. AUTOPLAY



Do not rely on browser autoplay.



The first screen should have:



▶ ENTER FILMI RAAT



When the user clicks:



- Initialize YouTube player

- Start the playlist

- Start music

- Detect current song

- Display exact song title

- Start vinyl animation

- Activate ON AIR

- Reveal player controls



This interaction should feel cinematic.



==================================================

9. HERO SCREEN



The hero should occupy approximately 100vh.



The first impression should be extremely strong.



Background:



A dark retro Bollywood cinema environment.



Colour palette:



Deep burgundy

Vintage red

Black

Warm cream

Old gold

Muted orange



Avoid excessive neon.



Visual elements:



- Cinema curtains

- Film reels

- Film strips

- Vintage projector light

- Dust particles

- Subtle film grain

- Light leaks

- Vignette

- Analog imperfections

- Faint theatre ambience



Keep everything subtle and premium.



Do not make it look like a Halloween website or gaming interface.



==================================================

10. HERO TYPOGRAPHY



Main title:



फ़िल्मी रात



Secondary:



RETRO BOLLYWOOD RADIO



Tagline:



पुरानी रातें। पुराने नग़मे। वही जादू।



Supporting text:



"Press play. Close your eyes. Go back in time."



Status:



● ON AIR



The title should feel like a classic Bollywood movie poster.



Use an elegant Devanagari display font combined with a vintage serif font.



Use a clean sans-serif for UI elements.



==================================================

11. VINYL RECORD



Create a large central vintage vinyl record.



Center label:



FILMI RAAT



The record should slowly rotate while music is playing.



Player state:



PLAYING

→ vinyl rotates



PAUSED

→ vinyl stops



BUFFERING

→ vinyl slows/pulses subtly



ENDED

→ vinyl stops until next track begins



The animation MUST be tied to the real YouTube player state.



Do not continuously animate it regardless of playback.



Add:



- realistic grooves

- subtle reflection

- warm light sweep

- vintage center label



==================================================

12. NOW PLAYING



Create a prominent:



● ON AIR



NOW PLAYING



component.



Example:



NOW PLAYING



"Exact YouTube Song Title"



Below:



"Retro Bollywood Radio"



The exact title must automatically update whenever the current YouTube song changes.



Add a smooth transition:



old title fades out

↓

new title fades in



Do not cause layout jumping when long song titles appear.



Use line clamping or controlled wrapping elegantly.



==================================================

13. CUSTOM MUSIC PLAYER



Create a custom premium music player styled like a vintage radio/cassette deck.



Controls:



◀ Previous



▶ / ❚❚ Play/Pause



Next ▶



Volume



Mute



Progress bar



Time elapsed



Duration



The controls must operate the actual YouTube player.



Previous:



player.previousVideo()



Next:



player.nextVideo()



Play:



player.playVideo()



Pause:



player.pauseVideo()



Seek:



player.seekTo()



Do not create fake controls.



==================================================

14. PROGRESS BAR



Synchronize the progress bar with the actual YouTube player.



Use:



player.getCurrentTime()



player.getDuration()



Update approximately every 250–500ms.



Clicking/tapping the progress bar should seek to the selected position.



Display:



00:00 / 04:32



using actual player duration.



==================================================

15. PLAYLIST SECTION



Create a section:



FILMI RAAT PLAYLIST



Subtitle:



"Tonight's reel."



The playlist must be generated dynamically from the actual YouTube playlist.



Each item:



01

[Exact YouTube title]

[Channel / metadata if available]

▶



02

[Exact YouTube title]



etc.



Do not use fake songs.



Do not manually hard-code titles.



When a user clicks a playlist item:



Use the YouTube API to play that playlist index.



The clicked item becomes:



● NOW PLAYING



==================================================

16. ACTIVE PLAYLIST ITEM



The currently playing song should be visually highlighted.



Example:



● 07



Song title



NOW PLAYING



Use:



- subtle gold glow

- animated indicator

- vintage radio LED effect



Keep it elegant.



==================================================

17. SONG CHANGE



Whenever the YouTube player moves to another song:



Automatically update:



- Now Playing title

- Thumbnail

- Playlist active state

- Progress

- Duration

- Vinyl state

- Mini-player

- Any currently displayed song information



Everything must stay synchronized.



There should be ONE central music state.



==================================================

18. CURRENT THUMBNAIL



Use the current YouTube video's thumbnail when available.



Display it inside a vintage cinema frame.



Style:



- warm overlay

- subtle grain

- film border

- slight vignette



Do not claim ownership of the artwork.



If unavailable, use original Filmi Raat artwork.



==================================================

19. RETRO QUOTE COMPONENT



Create a section called:



"FILMI SOCH"



Display rotating nostalgic quotes.



Examples:



"कुछ गाने सुने नहीं जाते... महसूस किए जाते हैं।"



"हर रात की अपनी एक फिल्म होती है।"



"कुछ धुनें वक्त को वापस ले आती हैं।"



"कहानी पुरानी है। एहसास नया है।"



"Lights down. Volume up."



Quotes can rotate automatically.



Animation should be subtle.



==================================================

20. INTERACTIVE CINEMA BUTTON



Create a playful interaction inspired by the personality of the reference site, but completely original.



Button:



🎞️ REEL CHALAO



When clicked:



- play an original generic cinema UI sound if available

- animate the button

- display a random Filmi Raat message



Examples:



"Gaana badlega, yaadein nahi."



"Arre, volume thoda badhao!"



"Yeh raat... aur yeh gaane."



"Interval ke baad milte hain."



"Picture abhi baaki hai."



IMPORTANT:



Do not use copyrighted movie dialogue recordings.



Use only text or an original generic sound effect.



==================================================

21. GOLDEN ERA SECTION



Create:



THE GOLDEN ERA



Subtitle:



"Songs that refuse to grow old."



Show 4–6 original vintage cinema-style cards.



Do NOT use copyrighted movie posters.



Create original poster-inspired artwork using:



- CSS

- abstract graphics

- generated/original decorative artwork



Example fictional titles:



Raat Aur Radio

Chandni Express

Dil Ki Film

Safar

Mehfil

Ek Aur Shaam



These are visual mood cards, not claims about real films.



==================================================

22. DEDICATION SECTION



Create:



THIS ONE'S FOR...



Text:



"For everyone who grew up with songs playing from the radio, cassette player, TV, CD player, or a late-night cable channel."



Then:



"For the songs that became memories."



Use an emotional cinema-credit aesthetic.



==================================================

23. SUPPORT SECTION



Create:



❤️ KEEP FILMI RAAT ALIVE



When clicked, open a beautiful modal.



Title:



"Keep the Radio Playing"



Text:



"Filmi Raat is made for nostalgia, late nights and good music. If you enjoy the experience, you can support the project."



Include:



UPI ID placeholder:



support@filmiraat.example



Add:



- Copy UPI ID

- QR placeholder

- Close button



Do NOT implement actual payment processing yet.



Make it easy to replace the placeholder later.



==================================================

24. ABOUT



Title:



ABOUT FILMI RAAT



Copy:



"Filmi Raat is a digital radio experience built around the golden feeling of Bollywood nostalgia."



"Put on your headphones, turn down the lights and let the songs take you somewhere familiar."



Keep it short.



==================================================

25. FAQ



Create an elegant FAQ section.



Questions:



What is Filmi Raat?



Is Filmi Raat free?



Where does the music come from?



Can I listen on my phone?



Can I suggest songs?



How can I support Filmi Raat?



Answers should be concise.



Be transparent that the music is played through YouTube's embedded platform.



Do not imply ownership of the music.



==================================================

26. FOOTER



Make the footer resemble classic movie end credits.



FILMI RAAT



पुरानी रातें। पुराने नग़मे। वही जादू।



"Made with ❤️ for Bollywood nostalgia."



Links:



Instagram

YouTube

Contact

Privacy

Terms



© 2026 Filmi Raat



==================================================

27. MOBILE EXPERIENCE



Mobile is extremely important.



Optimize specifically for:



360px

390px

414px



The hero should look beautiful without requiring excessive scrolling.



The vinyl should scale down.



Buttons should be thumb-friendly.



No horizontal scrolling.



Create a sticky mini-player after the user starts playback.



Example:



[thumbnail]



Exact Song Title



▶ / ❚❚



Clicking the mini-player opens the full player.



The mini-player must automatically update whenever the song changes.



==================================================

28. DESKTOP EXPERIENCE



Optimize for:



1024px

1280px

1440px

1920px



At large screen sizes:



Do not stretch content across the entire screen.



Use a controlled max-width.



Keep the experience cinematic and centered.



==================================================

29. HEADER



Desktop:



Left:



FILMI RAAT



Center:



RETRO BOLLYWOOD RADIO



Right:



About

Playlist

Support



Mobile:



FILMI RAAT



hamburger menu



The header should be transparent/floating over the hero.



==================================================

30. FILM GRAIN



Add a subtle global film-grain overlay.



Use CSS/noise techniques where possible.



It should resemble:



- 35mm film

- dust

- analog texture

- vintage projection



Keep opacity low.



It must not affect readability.



Respect:



prefers-reduced-motion.



==================================================

31. FILM STRIP



Add decorative film strips.



Use them around section transitions.



Film holes can move slowly.



Keep the effect subtle.



==================================================

32. LIGHT LEAKS



Add slow cinematic light leaks.



Use:



- warm orange

- muted red

- gold



Very subtle.



Avoid excessive glow.



==================================================

33. ANIMATION SYSTEM



Use smooth cinematic animations.



Good:



- fade

- slow parallax

- film grain

- vinyl rotation

- light movement

- soft scale

- title transitions



Avoid:



- excessive bouncing

- gaming effects

- excessive neon

- fast particle systems

- distracting animations



Use Framer Motion if useful.



Support:



prefers-reduced-motion.



==================================================

34. ACCESSIBILITY



Implement:



- keyboard navigation

- focus states

- ARIA labels

- semantic HTML

- accessible player controls

- sufficient colour contrast

- reduced-motion support



==================================================

35. PERFORMANCE



Prioritize excellent performance.



Avoid:



- huge background videos

- huge images

- unnecessary JavaScript

- excessive dependencies

- excessive animation loops



Use:



- CSS animations where possible

- lazy loading

- optimized assets

- responsive images

- code splitting where appropriate



==================================================

36. FIREBASE



The app should be Firebase-ready.



Use Firebase for:



- YouTube metadata caching

- future analytics

- future user accounts

- future song requests



For the MVP, users do NOT need accounts.



Do not build authentication yet.



Do not build social/community features yet.



==================================================

37. FUTURE FEATURES — ARCHITECTURE ONLY



Do NOT build these now.



But keep the architecture extensible for:



- User accounts

- User profiles

- Song requests

- Likes

- Comments

- User playlists

- Personalized radio

- AI DJ

- Community

- Social sharing

- Creator profiles

- Marketplace

- Creator monetization

- Gamification



The current MVP should remain focused.



==================================================

38. DATA ARCHITECTURE



Create editable configuration/data for:



site settings

quotes

FAQ

social links

support information



Music data should NOT be manually stored.



Music data comes from:



YouTube playlist

↓

YouTube API

↓

Firebase cache

↓

Application



==================================================

39. COMPONENT ARCHITECTURE



Use a clean component structure:



App

│

├── Header

│

├── Hero

│   ├── CinemaBackground

│   ├── VinylRecord

│   ├── HeroCopy

│   ├── NowPlaying

│   └── EnterFilmiRaat

│

├── MusicPlayer

│

├── MobileMiniPlayer

│

├── FilmiSoch

│

├── GoldenEra

│

├── Playlist

│

├── Dedication

│

├── Support

│

├── About

│

├── FAQ

│

└── Footer



Music state:



MusicContext



YouTube logic:



YouTubePlayerService



Metadata:



YouTubeMetadataService



==================================================

40. CENTRAL MUSIC STATE



Create one centralized state:



{

isReady,

isPlaying,

isPaused,

isBuffering,

currentVideoId,

currentPlaylistIndex,

currentTitle,

currentThumbnail,

duration,

currentTime,

volume,

isMuted

}



Every component should consume this centralized state.



Do not create independent player states.



==================================================

41. ERROR HANDLING



Handle gracefully:



- YouTube unavailable

- Playlist unavailable

- Video unavailable

- Deleted video

- Private video

- API quota exceeded

- Network failure

- Autoplay blocked

- Metadata unavailable



Use friendly messages.



Example:



"Filmi Raat is having a little projector trouble. Try again."



Never show raw API errors to users.



==================================================

42. SEO



Page title:



Filmi Raat — Retro Bollywood Radio



Meta description:



"Filmi Raat is a nostalgic Bollywood retro radio experience featuring timeless Hindi music, vintage cinema vibes and late-night listening."



Open Graph title:



Filmi Raat — Retro Bollywood Radio



Open Graph description:



"Press play. Close your eyes. Go back in time."



Add:



- favicon

- semantic HTML

- proper metadata

- social sharing metadata



==================================================

43. LEGAL / CONTENT TRANSPARENCY



The website must clearly use YouTube as the music source.



Do not imply Filmi Raat owns the music.



Do not download or re-host music.



Do not scrape YouTube.



Use official YouTube embedding/API mechanisms.



Respect YouTube player and branding requirements.



==================================================

44. VISUAL QUALITY BAR



This is NOT a coding demo.



Make it feel like a real startup/product launch.



The visual quality should resemble a premium creative studio website.



The design should communicate:



Nostalgia

Cinema

Music

Indian culture

Late-night atmosphere

Premium craftsmanship



The user should land on the page and immediately think:



"This feels like Bollywood."



Then:



"I want to press play."



==================================================

45. FINAL USER JOURNEY



User opens website.



↓



Sees:



फ़िल्मी रात



पुरानी रातें। पुराने नग़मे। वही जादू।



● ON AIR



▶ ENTER FILMI RAAT



↓



Clicks ENTER FILMI RAAT.



↓



Music starts from the specified YouTube playlist.



↓



YouTube player reports the current video.



↓



Application retrieves exact metadata.



↓



NOW PLAYING displays the exact YouTube title.



↓



Vinyl begins rotating.



↓



User sees the custom player.



↓



User can:



Pause

Play

Next

Previous

Seek

Change volume



↓



User can open:



FILMI RAAT PLAYLIST



↓



Click any song.



↓



YouTube jumps to that playlist item.



↓



NOW PLAYING updates automatically.



↓



User continues listening.



==================================================

46. ABSOLUTE FINAL REQUIREMENT



The following playlist is the ONLY music source:



PLLounUW9rgqGDmPxbZBerszf0dBq_M93b



The application must dynamically synchronize with it.



The application must automatically detect the currently playing song.



The application must display the exact YouTube title of the currently playing song.



No manually hard-coded song names.



No fake metadata.



No fake playback state.



No separate audio source.



No downloaded music.



No YouTube scraping.



Build the complete working application now.



Do not stop at a mockup.



Do not create placeholder functionality for the core music experience.



The result must be a functioning, shareable MVP that I can deploy and send to friends for validation.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://filmy-raat-radiance.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/ae782630-1bb4-471a-b95c-64ecd1afd956).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
