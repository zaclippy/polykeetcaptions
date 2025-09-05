# PolyKeet Captions

A Chromium extension that converts Hindi subtitles on YouTube into Hinglish and
shows English translations via tooltips. Translations are powered by the
[OpenRouter](https://openrouter.ai) API.

## Development

1. Save an OpenRouter API key from the options page.
2. Load the extension in Chrome/Edge:
   - Open `chrome://extensions`
   - Enable **Developer mode**
   - Click **Load unpacked** and select this folder
3. Open a YouTube video with Hindi captions to see Hinglish subtitles with
   English translations on hover.

## Testing

```
npm test
```
