
## Introduction
Tons of people have creative goals like writing, art, or music, but they often find it difficult to pursue those goals. Work, school, and everything else in life easily leaves little time for creative pursuits, especially without external pressures, which is often the case for up and coming creatives. It often ends up a rather lonely experience working towards creative goals.

Being part of a community can make an enourmous difference. The motivation and encouragement that come from being surrounded by individuals striving towards similar goals are invaluable. Members can exchange advice, fostering a shared understanding of the creative journey. Unfortunately, these communities are pretty inaccessible, there's often a geographic/finanical/skill barrier making it difficult for the vast majority of creatives to integrate into these types of groups.

I wanted to build a tool to tackle this problem.

This is Kojo - a social virtual coworking platform designed to help creatives focus on their projects and connect with other creatives.

## How it works

There are two primary needs of creatives that Kojo is designed to fufill: 1. the need to create and 2. the need to connect

### 1. Create
1. Users can join timed virtual co-working sessions
2. These co-working sessions will match the user with others in the same subject area
3. Each user is prompted to share their goals by the end of the session
4. When the work session starts, everyone works on their tasks
5. When the work session ends, each user is prompted to review their work

**Why it works**
- *Precommitment*: Setting deadlines in advance (by the end of the session) significantly reduces procrastination.
- *Implementation intentions*: Specifying task significantly enhances goal achievement.
- *Social accountability*: Public committment significantly improves rates of task completion.

### 2. Connect
- People can make (social media) posts to their connections
- After each coworking session, users are encouraged to connect with the people they worked with
- Connecting with others allows the user to see their connection's posts on the homepage

**Why it works**
- Seeing posts of work by people you personally know and have worked with can be a good form of encouragement and motivation towards your own work
- Only seeing posts by connections make each interaction a more personal experience (similar to BeReal) and limit the amount of content on the platform, curbing the addictive potential of most social platforms

## Inspiration
I'm interested in exploring ways we can use technology to connect with new people. Most social media platforms are designed for staying connected with people we already know (Facebook, Instagram, Snapchat), and even the ones that aren't are designed to be addictive to keep us on the platform for as long as possible (Reddit, Tiktok).

I'm also interested in seeing how we can design technology to promote healthier habits. Recently, I have been observing Strava, a fitness tracking social app, and how it's designed to use social rewards to promote exercise. I wanted to take this concept and use it to help creatives to encourage each other to work towards their goals.

## Technologies
- React (Typescript): Frontend framework
- MUI: React UI component library
- Supabase: User authentication, database
- Daily.co: Real-time video communication API
