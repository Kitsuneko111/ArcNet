# ArcNet public Developer notes
As ArcNet is intended to be a fully open source, secure bot network the primary directions and notes about the bot are to be made public in this document.

## Requirements
1. ArcNet must be open source and self-hostable to ensure security.

2. ArcNet must interface securely with the ArcNet API to ensure users may make their own bots using the ArcNet system and self host securely without false reports or violations.
    - Bots using this project that are not the original shall be known as workers and shall not directly interact with the systems, and shall require human verification.
    - The prime bot may have elevated permissions to change data

3. ArcNet must inclue an anti-nuke system that will detect a high quantity of damaging interactions and remove the roles from this user or bot.
    - This must include an owner-only bypass with a time limit to allow for normal admin work to occur
    - If this is run by a bot it must check (if possible) to see who triggered the bot, or who invited the bot and remove the permissions of this user too.
    - This ability must have the option to be disabled soley by the owner if they wish.

4. ArcNet must provide a simple but informative setup phase to ensure owners and admins are aware of what the bot does, how it does it and what steps they must take to ensure correct usage
    - This will include a verification system to ensure secure permissions and roles, with varying levels of priority
        - These priorities will range from issues that stop the bot from working effectively to issues that could lead to a small scale nuke.
    - The bot may ask the owner if they wish to correct any issues automatically, provided the bot is able to.

5. ArcNet shall include the ability to register, track and alert communities of raids. 
    - The information provided shall include the time, the raider, the raidee and the conclusion of the raid
        - Conclusion shall include "Investigation pending", "Raid lost", "Raid won", "Raid tied", "Threat ongoing", "No threat", "Negotions pending" and "Practise raid"
        - Tags must be provided by the raidee, with changes requiring human verification.

6. ArcNet shall register known milsims, the owner of these milsims and the high command of these milsims. ArcNet may also register members of milsims it is in to provide security to other servers. 
    - The data collected shall include milsim age; milsim reputation; historic names, historic owners and historic HC along with dates for such; and any past wars, raids, nukes or other key events.

7. ArcNet shall provide a security threshold system to alert the presence of or ban any members involved in communities that fall below this threshold.
    - The reputation system shall allow ways to appeal your value.
    - The system shall be customisable based on the following:
        - Server reputation
        - User reputation
        - Known raider
        - Known nuker
        - Known spy
    - The reputation system shall include the ability to temporarily or permanently be bypassed or permits given solely by the owner or anyone with an admin tag.

8. These interactions shall be loggable within communities with varying levels of publicity:
    - New milsims or milsim updates shall be logged to a central server
    - Reputation changes shall be logged to a central server
    - Raids shall be logged to any server subscribed, with options to only subscribe to certain servers
    - Nukes shall be logged to any server subscribed with options to only subscribe to certain servers
    - Wars shall be logged to any server subscribed with options to only subscribe to certain servers

9. ArcNet may include the ability to send formal diplomatic messages to other milsims, provided there is sufficient backing for this functionality.

10. Any interactions with the bot shall primarily be restricted to the owner, and the owner may select whether or not admins may interact too.
    - The exception to this shall be anyone registered as an ArcNet developer. These developers shall be publicly known and shall lose their exception status if it is abused.

11. Any reputation changes or raid logs shall vary from "High Trust" in the case of multiple sources of proof to "Low Trust" in the case of hearsay.


### Requirements - Summarised
1. ArcNet must be open source and self-hostable to ensure security.
2. ArcNet must interface securely with the ArcNet API
3. ArcNet must inclue an anti-nuke system
4. ArcNet must provide a simple but informative setup phase
5. ArcNet shall include the ability to register, track and alert communities of raids. 
6. ArcNet shall register known milsims, the owner of these milsims and the high command of these milsims.
7. ArcNet shall provide a security threshold system to alert the presence of or ban any members involved in communities that fall below this threshold.
8. These interactions shall be loggable within communities with varying levels of publicity.
9. ArcNet may include the ability to send formal diplomatic messages to other milsims.
10. Any interactions with the bot shall primarily be restricted to the owner, and the owner may select whether or not admins may interact too.
11. Any reputation changes or raid logs shall vary from "High Trust" in the case of multiple sources of proof to "Low Trust" in the case of hearsay.

## Goals
1. ArcNet sets out to provide security to milsims and their owners by pre-emptively preventing nukes and raids.
2. ArcNet sets out to inform communities of vulnerabilities their communities may include
3. ArcNet sets out to be open and transparent about its activity and goals to ensure the developers do not create the issue they are trying to solve.

# Disclaimer
The requirements and goals in this file are subject to change, however any changes must be documented at the end of this file.

## Changelog
Format: `YYYY/MM/DD - UTC HH/MM`
```diff
+ 2032/06/05 - 21:22: Added requirement 11