# Installation

## How to set up

1. Download the ***Source code (zip)*** below and extract `HTML-Alarm-Clock-1.0-release.zip`.
2. Go to the extracted folder, then open `home.html`. This will open the home page for the alarm.
3. Enter your desired time. (See the Format for more details)
4. Click **Start**.
5. Click anywhere on the screen to activate the alarm.*
6. ???
7. The alarm sound will play when the target time has been reached. PROFIT!

*This step is necessary because Chromium browsers no longer allow autoplaying video/audio unless any user input (like clicks) has been registered, which contradicts the purpose of this project. If the user of this alarm program does not interact with the screen before, say, going to sleep, the alarm will trigger but not make any sounds. There are ways to go around this, but it tends to either be a janky solution or breaks some kind of TOS.

## Format
The input does not strictly follow the `HH:MM(AM/PM)` format. Instead, it will automatically parse the user input by following a few rules:

- Any number **before** the colon ( : ) is marked as the **hour**.
    - If this number exceeds 2 digits, the 3rd and 4th digit are marked as **minute**, even without the colon.
    - If this number's value is **13 or higher**, the time will automatically be marked **post-meridiem (PM)**.
    - If this number's value is **24 or higher**, the time will automatically be set as `12:XXAM`. `X` is still dependent on the 3rd and 4th digit.
- Any number **after** the colon ( : ) is marked as the **minute**.
    - If this digit's value is **59 or higher**, the minute will automatically be set to `00`.
    - 5th and further digits are ignored.

- Letters `A` and `P` are used to mark use of **ante-meridiem (AM)** and **post-meridiem (PM)** respectively. The `M` in `AM` or `PM` is not necessary.

- Time will be set to `12:00AM` by default if no other rule state otherwise.

This means you can enter different inputs and still achieve the same effect. See this non-exhaustive list for some examples:
- `12pm` -> `12:00PM`
- `13` -> `01:00PM`
- `24` -> `12:00AM`
- `2321` -> `11:21PM`
- `110`* -> `11:00AM`
- `6p` -> `06:00PM`
- `5` -> `05:00AM`
- `15:00` -> `03:00PM`
- `1:30pM` -> `01:30PM`

*3-digit inputs without the use of colons always use the first 2 digits as **hour**, then ignores the 3rd digit. This means the same rules apply, like `733` will parse to `12:00AM` instead of `07:33AM` because *73 > 23* -> 12:00AM.
