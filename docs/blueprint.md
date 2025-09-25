# **App Name**: LearnVerse

## Core Features:

- Subject Panel: Display a list of subjects added by the user, fetched from Firestore. If no subjects exist, show a blank state with an 'Add a Subject' button.
- Add Subject: A modal/popup to allow the child to input a subject name, which is then saved to Firestore under the user's profile.
- Topic Generation: Auto-generate an age-appropriate, grade-level topic list for a selected subject using a prompt. Includes logic for tailoring to strengths, weaknesses, and completed topics. The LLM acts as a tool in this feature by generating dynamic recommendations for learning.
- Topic Display: Display each topic as a card or block with a playful icon and effects. Clicking a topic triggers content generation.
- Learning Module Generation: Generate a personalized learning module and prerequisite analysis report for a selected topic, tailored to the child's profile. The LLM acts as a tool in this feature by providing personalized content for learning.
- Quiz Generation: Generate a personalized quiz based on the learning content. The LLM acts as a tool in this feature by adjusting to a mix of difficulty levels and by including an encouraging, age-appropriate tone.
- Performance Tracking: Store quiz answers, results, and performance data in a JSON structure (`child_performance_matrix.json`) tied to the user's Firestore record.

## Style Guidelines:

- Primary color: Vibrant orange (#FF9933) to represent energy and creativity.
- Background color: Light gray (#F0F0F0), almost white, to keep the UI clean and uncluttered.
- Accent color: Dark gray (#333333) to provide contrast and focus.
- Body and headline font: 'PT Sans' (sans-serif) for a modern, readable style.
- Note: currently only Google Fonts are supported.
- Use playful, accessible anime illustrations and icons alongside content and badges, sourced from open/public anime/illustration APIs.
- Employ shaadcn/ui components to ensure a clear, accessible, and responsive design across different devices.
- Incorporate bouncy and playful UI interactions with button smash, hover, glowing shadow, card pop-in, and confetti effects.