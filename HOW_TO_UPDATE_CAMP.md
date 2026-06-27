# How To Update Camp Content

This app is designed so you can update camp information by editing simple JSON files.

You do not need to change React or TypeScript code.

All of the editable content lives in:

`src/content/`

## Before you start

Please keep these rules in mind:

1. Always keep quotation marks around text.
2. Keep commas between items.
3. Do not delete brackets `{ }` or `[ ]` unless you know exactly what they do.
4. After editing content, run `npm run dev` to preview changes.
5. Run `npm run build` before deploying.

## Which file controls each part of the app?

`src/content/camp.json`

- Camp name
- Camp theme
- Theme subtitle
- Theme verse
- Camp dates
- Camp location name
- Camp address
- Google Maps link

`src/content/schedule.json`

- Full camp schedule
- Home page `Happening Now`
- Home page `Up Next`
- Schedule tab

`src/content/playlist.json`

- Spotify embed link
- Spotify open link
- Songs & Meaning section

`src/content/contacts.json`

- Emergency contacts
- Camp leaders
- First aid
- Phone numbers
- Contact notes

`src/content/pre-camp.json`

- Pre-Camp countdown date
- Packing checklist
- Arrival information
- Departure information
- Camp address details used on the Pre-Camp page

`src/content/announcements.json`

- Pinned announcements
- Normal announcements

`src/content/prayer-wall.json`

- Sample prayer requests only

## How to update the camp theme

Open:

`src/content/camp.json`

Look for values like this:

```json
"theme": "Undivided",
"themeSubtitle": "Two Kings. One Crown.",
"themeVerseReference": "Galatians 2:20",
"themeVerseText": "I have been crucified with Christ..."
```

If you want to change them, edit the text on the right side only.

Example:

Before:

```json
"theme": "Undivided"
```

After:

```json
"theme": "Set Apart"
```

## How to update camp dates

Open:

`src/content/camp.json`

Update:

```json
"start": "2026-07-24T16:00:00+10:00",
"end": "2026-07-26T13:30:00+10:00"
```

Also open:

`src/content/pre-camp.json`

Update:

```json
"countdownDate": "2026-07-24T16:00:00+10:00"
```

And open:

`src/content/schedule.json`

Update the dates inside the `days` list and each schedule event.

## How to update the schedule

Open:

`src/content/schedule.json`

Each schedule item looks like this:

```json
{
  "id": "fri-arrival",
  "day": "friday",
  "date": "2026-07-24",
  "startTime": "16:00",
  "endTime": "17:30",
  "title": "Arrival and Cabin Check-In",
  "location": "Main Lodge",
  "description": "Collect your wristband, room key, and welcome pack.",
  "category": "arrival"
}
```

You can change:

- `date`
- `startTime`
- `endTime`
- `title`
- `location`
- `description`
- `speaker`

Example:

Before:

```json
"title": "Dinner"
```

After:

```json
"title": "Dinner and Table Groups"
```

## How to update the Spotify playlist

Open:

`src/content/playlist.json`

Look for:

```json
"spotifyEmbedUrl": "https://open.spotify.com/embed/playlist/...",
"spotifyOpenUrl": "https://open.spotify.com/playlist/..."
```

Replace those links with your new Spotify playlist links.

## How to update Songs & Meaning

Still in:

`src/content/playlist.json`

Each song looks like this:

```json
{
  "id": "song-1",
  "title": "Build My Life",
  "artist": "Pat Barrett",
  "meaning": "A simple prayer for a steady, undivided life..."
}
```

Change the title, artist, or meaning text as needed.

## How to update emergency contacts

Open:

`src/content/contacts.json`

Each contact looks like this:

```json
{
  "id": "director",
  "name": "Rachel Kim",
  "role": "Camp Director",
  "phone": "+61412345678",
  "notes": "Main point of contact for camp coordination and urgent issues."
}
```

You can add more contacts by copying one full block and changing the details.

## How to update the packing checklist

Open:

`src/content/pre-camp.json`

Look for:

```json
"packingChecklist": [
  {
    "id": "bible",
    "label": "Bible",
    "category": "Essentials"
  }
]
```

Add, remove, or edit checklist items here.

Example:

Before:

```json
{
  "id": "torch",
  "label": "Torch or phone torch",
  "category": "Gear"
}
```

After:

```json
{
  "id": "torch",
  "label": "Torch",
  "category": "Gear"
}
```

## How to update announcements

Open:

`src/content/announcements.json`

There are two sections:

- `pinned`
- `normal`

Each announcement looks like this:

```json
{
  "id": "ann-3",
  "title": "Workshop Selection Reminder",
  "message": "Please choose your breakout workshop by 10:30 AM...",
  "postedAt": "2026-07-25T08:10:00+10:00"
}
```

If you want an announcement to stay at the top, put it in the `pinned` section.

## How to update the camp address and Google Maps link

Open:

`src/content/camp.json`

Update these fields:

```json
"locationName": "Great Aussie Bush Camp, Lake Macquarie",
"address": "WEC Camp, 30 Nentoura Rd, Morisset NSW 2264",
"addressLines": [
  "WEC Camp",
  "30 Nentoura Rd",
  "Morisset NSW 2264"
],
"mapsLink": "https://www.google.com/maps/search/?api=1&query=WEC%20Camp%2C%2030%20Nentoura%20Rd%2C%20Morisset%20NSW%202264"
```

If the address changes, update both:

- `address`
- `addressLines`

And make sure the `mapsLink` matches the new address.

## Final checklist after editing

1. Save the JSON file.
2. Run `npm run dev` and check the app.
3. Run `npm run build`.
4. If build passes, your content update is ready.
